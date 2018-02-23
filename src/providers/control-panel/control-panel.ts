import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { RegistroPanel } from './../../models/registro-panel'
import { Rampa, RampaId } from './../../models/rampas'
import { Producao, ProducaoId } from './../../models/producoes'
import { Observable } from 'rxjs/Observable';
import { updateDate } from 'ionic-angular/util/datetime-util';

@Injectable()
export class ControlPanelProvider {

  private margemTemperatura: number = 0.5;

  private itemsCollection: AngularFirestoreCollection<RegistroPanel>;

  public producaoId: String;

  public ultimaAtualizacao: Date;
  public ultimaTemperatura: number;
  public aquecedorLigado: boolean;

  public ultimaRegistroSalvo: Date;

  public temperaturaDesejada: number;

  public rampaAtual: RampaId;
  public rampaEmSubida: boolean;
  public rampaDataFinal: Date;

  private rampaCollection: AngularFirestoreCollection<Rampa>;
  rampas: Observable<RampaId[]>;
  //Ultima atualização das rampas
  rampasArray: RampaId[];

  private rampaAtualDocRef: AngularFirestoreDocument<Rampa>;
  rampaAtualDocObj: Observable<Rampa>;

  private producaoDoc: AngularFirestoreDocument<Producao>;
  producao: Observable<Producao>;
  //Utiliza atualização da produção
  producaoObj: Producao;


  constructor(private afs: AngularFirestore, ) {
    this.ultimaAtualizacao = new Date();
    this.ultimaTemperatura = 20;
    this.ultimaRegistroSalvo = new Date();
    this.aquecedorLigado = false;
    this.temperaturaDesejada = 0;


    var _this = this;
    setInterval(function () { _this.atualizaDados(); }, 1000);
  }

  getRandomArbitrary() {
    if (this.aquecedorLigado) {
      return Math.random() * ((this.ultimaTemperatura + 1) - (this.ultimaTemperatura)) + (this.ultimaTemperatura);
    } else {
      return Math.random() * ((this.ultimaTemperatura) - (this.ultimaTemperatura - 0.05)) + (this.ultimaTemperatura - 0.05);
    }
  }

  setAquecedorLigado(status: boolean) {
    this.aquecedorLigado = status;
  }

  getTemperaturaPlanejada() {
    if (this.rampaEmSubida) {
      //TODO contole de subida
      return this.rampaAtual.Temperatura;
    } else {
      return this.rampaAtual.Temperatura;
    }
  }

  atualizaDados() {
    console.log("update")
    this.ultimaAtualizacao = new Date();
    this.ultimaTemperatura = this.getRandomArbitrary();
    if (this.producaoId != null) {

      //Verifica final da rampa atual
      if (this.rampaEmSubida) {
        //Para rampa em subida o final é determinado pela temperatura
        //TODO So funciona para rampa de subida
        if (this.ultimaTemperatura >= this.rampaAtual.Temperatura) {
          console.log("Rampa finalizou por temperatura");
          this.atualizaInicioRealRampa();
        }
      } else {
        //Verifica se o tempo acabou        
        if (this.rampaDataFinal < new Date()) {
          console.log("Rampa finalizou por tempo");
          this.atualizarStatusRampa();
        }
      }

      //atualiza status do aquecedor
      if (this.rampaAtual != null) {
        if (this.aquecedorLigado) {
          //Temperatura subindo        
          if (this.ultimaTemperatura > this.getTemperaturaPlanejada() + this.margemTemperatura) {
            this.setAquecedorLigado(false);
          }
        } else {
          //Temperatura baixando
          if (this.ultimaTemperatura < this.getTemperaturaPlanejada() - this.margemTemperatura) {
            this.setAquecedorLigado(true);
          }
        }
      }

      //registra a cada 30 segundos
      if ((this.ultimaAtualizacao.getTime() - this.ultimaRegistroSalvo.getTime()) > 30000) {
        this.ultimaRegistroSalvo = this.ultimaAtualizacao;
        let out = {
          Temperatura: this.ultimaTemperatura,
          Data: this.ultimaAtualizacao,
          AquecedorLigado: this.aquecedorLigado
        }
        this.itemsCollection.add(out);
      }

    }
  }

  conectar(id) {
    this.producaoId = id;
    this.itemsCollection = this.afs.collection<RegistroPanel>('Producoes/' + id + "/RampasExecutada/");

    this.rampaCollection = this.afs.collection<Rampa>('Producoes/' + id + "/RampasPlanejado/", ref => ref.orderBy('Sequencia'));
    this.rampas = this.rampaCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Rampa;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });

    //Obtem a rampa planejada
    this.rampas.subscribe(
      i => {
        this.rampasArray = i;
        this.atualizarStatusRampa();
      },
      erro => { console.log(erro) }
    );

    //Obtem Produção 
    this.producaoDoc = this.afs.doc<Producao>('Producoes/' + id);
    this.producao = this.producaoDoc.valueChanges();
    this.producao.subscribe(
      i => {
        this.producaoObj = i;
        this.atualizarStatusRampa();
      },
      erro => { console.log(erro) }
    );
  }

  atualizarStatusRampa() {

    if (this.rampasArray == null) {
      //Metodo asyn não carregou ainda
      return false;
    }

    //Se não iniciar ainda utilizar a data agora
    if (this.producaoObj == null) {
      //Metodo asyn não carregou ainda
      return false;
    }

    var velocidadeSubida = 1; //graus por minuto;
    var auxData = new Date(this.producaoObj.Inicio);
    var auxTemperatura = 0;
    var auxMinutos = 0;
    for (var i = 0; i < this.rampasArray.length; i++) {

      //Caso não tenha iniciado calcula a subida
      if (this.rampasArray[i].Inicio == null) {
        //Rampa de alteração de temperatura         
        auxMinutos = (this.rampasArray[i].Temperatura - auxTemperatura) * velocidadeSubida;
        //Trata tempo negativo em caso de descida
        auxMinutos = auxMinutos < 0 ? auxMinutos * -1 : auxMinutos;
        auxData.setMinutes(auxData.getMinutes() + auxMinutos);
        if (this.ultimaAtualizacao < auxData) {
          this.rampaAtual = this.rampasArray[i];
          this.rampaEmSubida = true;
          this.rampaDataFinal = new Date(auxData);
          return true;
        }
      } else {
        auxData = this.rampasArray[i].Inicio;
      }

      //Tempo na temperatura da rampa
      auxData.setMinutes(auxData.getMinutes() + this.rampasArray[i].Tempo);
      auxTemperatura = this.rampasArray[i].Temperatura;
      if (this.ultimaAtualizacao < auxData) {
        this.rampaAtual = this.rampasArray[i];
        this.rampaEmSubida = false;
        this.rampaDataFinal = new Date(auxData);
        return true;
      }

    }
  }

  atualizaInicioRealRampa() {
    this.rampaAtualDocRef = this.afs.doc<Rampa>('Producoes/' + this.producaoId + "/RampasPlanejado/" + this.rampaAtual.id);
    this.rampaAtualDocRef.update({ Inicio: new Date() });
  }

}
