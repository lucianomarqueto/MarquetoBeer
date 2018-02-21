import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import * as HighCharts from 'highcharts';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Rampa, RampaId } from './../../models/rampas'
import { Producao, ProducaoId } from './../../models/producoes'

import { Console } from '@angular/core/src/console';
import { updateDate } from 'ionic-angular/util/datetime-util';



@IonicPage()
@Component({
  selector: 'page-produzir',
  templateUrl: 'produzir.html',
})
export class ProduzirPage {

  private rampaCollection: AngularFirestoreCollection<Rampa>;
  rampas: Observable<RampaId[]>;
  //Ultima atualização das rampas
  rampasArray: RampaId[];

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore) {
    console.log('parans:' + this.navParams.data);
    this.rampaCollection = afs.collection<Rampa>('Producoes/' + this.navParams.data + "/RampasPlanejado/", ref => ref.orderBy('Sequencia'));
    this.rampas = this.rampaCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Rampa;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });

    this.producaoDoc = afs.doc<Producao>('Producoes/' + this.navParams.data);
    this.producao = this.producaoDoc.valueChanges();
    this.producao.subscribe(
      i => {
        this.producaoObj = i;
        this.updateChart();
      },
      erro => { console.log(erro) }
    );
    /*
    EXECUCAO
    this.rampaCollection = afs.collection<Rampa>('Producoes/' + this.navParams.data + "/RampasPlanejado/", ref => ref.orderBy('Sequencia'));
    this.rampas = this.rampaCollection.stateChanges(['added'])
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Rampa;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProduzirPage');

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

    /*
    EXECUTADO
    this.rampas.subscribe(
      i => {
        i.forEach(r => {
          this.chart.series[0].addPoint(r.Temperatura);
          console.log(r);
        });
      },
      erro => { console.log(erro) }
    );*/
  }

  //Iniciar processo de brassagem
  iniciar() {
    this.producaoDoc.update({ Status: "Em Brassagem", Inicio: new Date() });
  }

  updateChart() {
    console.log("UpdateChat");
    console.log("Rampa Array "+this.rampasArray);
    if(this.rampasArray == null){
      console.log("Rampa Array null");
      return;
    }
    console.log("Producao obj "+this.producaoObj);
    if(this.producaoObj.Inicio != null){
      console.log("Producao inicio  "+this.producaoObj.Inicio);
      console.log("Producao data  "+new Date());
      var inicio = this.producaoObj.Inicio
    }else{
      console.log("Producao inicio  null");
      var inicio = new Date();
    }
    

    var velocidadeSubida = 1; //graus por minuto;
    var auxData = inicio;
    var auxTemperatura = 0;
    var auxMinutos = 0;
    var data = [];
    this.TempoTotal = 0;

    //Adicionando ponto 0
    data.push([inicio.valueOf(), 0]);
    this.rampasArray.forEach(r => {
      //Rampa de alteração de temperatura         
      auxMinutos = (r.Temperatura - auxTemperatura) * velocidadeSubida;
      //Trata tempo negativo em caso de descida
      auxMinutos = auxMinutos < 0 ? auxMinutos * -1 : auxMinutos;

      this.TempoTotal = this.TempoTotal + auxMinutos
      auxData.setMinutes(auxData.getMinutes() + auxMinutos);
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
}
