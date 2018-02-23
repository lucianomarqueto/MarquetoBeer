import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

import * as HighCharts from 'highcharts';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Rampa, RampaId } from './../../models/rampas'
import { Producao, ProducaoId } from './../../models/producoes'
import { RegistroPanel, RegistroPanelId } from './../../models/registro-panel'

import { Console } from '@angular/core/src/console';
import { updateDate } from 'ionic-angular/util/datetime-util';

import { ControlPanelProvider } from '../../providers/control-panel/control-panel';

@IonicPage()
@Component({
  selector: 'page-produzir',
  templateUrl: 'produzir.html',
})
export class ProduzirPage {

  producaoId: String;

  private rampaCollection: AngularFirestoreCollection<Rampa>;
  rampas: Observable<RampaId[]>;
  //Ultima atualização das rampas
  rampasArray: RampaId[];

  private registroPanelCollection: AngularFirestoreCollection<RegistroPanel>;
  registroPanel: Observable<RegistroPanelId[]>;
  //Ultima atualização das rampas

  private producaoDoc: AngularFirestoreDocument<Producao>;
  producao: Observable<Producao>;
  //Utiliza atualização da produção
  producaoObj: Producao;

  //Variavel para exibir ou esconder botão de iniciar
  public buttonIniciar: boolean = false;

  //Series do grafico
  data = [];
  //Objeto do Grafico
  chart: any;

  //Tempo total da producão em minutos
  TempoTotal: number;
  //Date final da produção
  HoraFinal: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    public controlPanelProvider: ControlPanelProvider) {

    this.producaoId = this.navParams.data;
    this.rampaCollection = afs.collection<Rampa>('Producoes/' + this.navParams.data + "/RampasPlanejado/", ref => ref.orderBy('Sequencia'));
    this.rampas = this.rampaCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Rampa;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });

    this.registroPanelCollection = afs.collection<RegistroPanel>('Producoes/' + this.navParams.data + "/RampasExecutada/", ref => ref.orderBy('Data'));
    this.registroPanel = this.registroPanelCollection.stateChanges(['added'])
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as RegistroPanel;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });

    this.producaoDoc = afs.doc<Producao>('Producoes/' + this.navParams.data);
    this.producao = this.producaoDoc.valueChanges();
    this.producao.subscribe(
      i => {
        console.log("Obtem objeto ");
        console.log(i);
        this.producaoObj = i;
        this.updateChart();
      },
      erro => { console.log(erro) }
    );

  }

  ionViewDidLoad() {   
    HighCharts.setOptions({
      global: {
        timezoneOffset: 3 * 60
      }
    });
    //Configuração do grafico
    this.chart = HighCharts.chart('container', {
      chart: {
        type: 'line',
        zoomType: 'x'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          minute: '%H:%M'
        },
        title: {
          Text: 'Tempo'
        }
      },
      yAxis: {
        title: {
          text: 'Temperatura'
        }
      },
      series: [{
        name: 'Planejado'
      }, {
        name: 'Executado'
      }]
    });

    //Obtem a rampa planejada
    this.rampas.subscribe(
      i => {
        this.rampasArray = i;
        this.updateChart();
      },
      erro => { console.log(erro) }
    );


    //Obtem rampa executada
    this.registroPanel.subscribe(
      i => {
        i.forEach(r => {
          this.chart.series[1].addPoint([r.Data.valueOf(), r.Temperatura]);
        });
      },
      erro => { console.log(erro) }
    );
  }

  //Iniciar processo de brassagem
  iniciar() {        
    this.producaoDoc.update({ Status: "Em Brassagem", Inicio: new Date() });
    this.conectarPainelControle();
  }

  //Atualiza Grafico
  updateChart() {
    if (this.rampasArray == null) {
      //Metodo asyn não carregou ainda
      return;
    }

    //Se não iniciar ainda utilizar a data agora
    if (this.producaoObj == null) {
      //Metodo asyn não carregou ainda
      return;      
    } 
    
    if (this.producaoObj.Inicio == null){
      //Só renderiza o grafico após o inicio
      return; 
    }
    console.log(this.producaoObj);

    var inicio =  new Date(this.producaoObj.Inicio);
    console.log(inicio);
    var velocidadeSubida = 1; //graus por minuto;
    var auxData = new Date(inicio);
    var auxTemperatura = 0;
    var auxMinutos = 0;
    var data = [];
    this.TempoTotal = 0;
    console.log(auxData);
    //Adicionar ponto 0    
    data.push([inicio.valueOf(), 0]);
    this.rampasArray.forEach(r => {
      if (r.Inicio == null) {
        //Rampa de alteração de temperatura         
        auxMinutos = (r.Temperatura - auxTemperatura) * velocidadeSubida;
        //Trata tempo negativo em caso de descida
        auxMinutos = auxMinutos < 0 ? auxMinutos * -1 : auxMinutos;
        this.TempoTotal = this.TempoTotal + auxMinutos     
        auxData.setMinutes(auxData.getMinutes() + auxMinutos);
      } else {               
       auxData = r.Inicio;
      }     
      data.push([auxData.valueOf(), r.Temperatura]);

      //Tempo na temperatura da rampa
      auxData.setMinutes(auxData.getMinutes() + r.Tempo);
      data.push([auxData.valueOf(), r.Temperatura]);
      this.TempoTotal = this.TempoTotal + r.Tempo;
      auxTemperatura = r.Temperatura;

    });
    this.HoraFinal = inicio;
    this.HoraFinal.setMinutes(inicio.getMinutes() + this.TempoTotal);
    this.chart.series[0].setData(data);       
  }

  conectarPainelControle() {
    this.controlPanelProvider.conectar(this.navParams.data);
  }

}
