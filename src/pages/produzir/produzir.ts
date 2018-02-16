import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import * as HighCharts from 'highcharts';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Rampa, RampaId } from './../../models/rampas'
import { Producao, ProducaoId } from './../../models/producoes'

import { Console } from '@angular/core/src/console';



@IonicPage()
@Component({
  selector: 'page-produzir',
  templateUrl: 'produzir.html',
})
export class ProduzirPage {

  private rampaCollection: AngularFirestoreCollection<Rampa>;
  rampas: Observable<RampaId[]>;
  data = [];
  chart: any;

  //Tempo total da producão em minutos
  TempoTotal: number;
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
        var inicio = new Date();
        var velocidadeSubida = 1; //graus por minuto;
        var auxData = inicio;
        var auxTemperatura = 0;
        var auxMinutos = 0;
        var data = [];  
        this.TempoTotal = 0;

        //Adicionando ponto 0
        data.push([inicio.valueOf(), 0]);
        i.forEach(r => { 
          //Rampa de alteração de temperatura         
          auxMinutos = (r.Temperatura-auxTemperatura)*velocidadeSubida;
          //Trata tempo negativo em caso de descida
          auxMinutos = auxMinutos<0?auxMinutos*-1:auxMinutos;

          this.TempoTotal = this.TempoTotal + auxMinutos
          auxData.setMinutes(auxData.getMinutes()+auxMinutos);  
          data.push([auxData.valueOf(),r.Temperatura]); 

          //Tempo na temperatura da rampa
          auxData.setMinutes(auxData.getMinutes()+r.Tempo);  
          data.push([auxData.valueOf(),r.Temperatura]);                     
          this.TempoTotal = this.TempoTotal + r.Tempo;
          auxTemperatura = r.Temperatura;

        });
        this.HoraFinal = inicio;
        this.HoraFinal.setMinutes(inicio.getMinutes()+this.TempoTotal);
        this.chart.series[0].setData(data);
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

}
