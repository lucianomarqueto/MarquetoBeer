import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Rampa { Sequencia: number; Temperatura: number; Tempo: number;}
export interface RampaId extends Rampa { id: string; }

@IonicPage()
@Component({
  selector: 'page-rampa',
  templateUrl: 'rampa.html',
})
export class RampaPage {

  private itemsCollection: AngularFirestoreCollection<Rampa>;
  rampas: Observable<RampaId[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, public alertCtrl: AlertController) {
    console.log(this.navParams);
    this.itemsCollection = afs.collection<Rampa>('Receitas/'+this.navParams.data.id+"/Rampas/", ref => ref.orderBy('Sequencia'));
    this.rampas = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Rampa;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RampaPage');
  }

  showAdd() {
    console.log("Click to add");
    let prompt = this.alertCtrl.create({
      title: 'Rampa',
      message: "Adicione uma nova etapa na rampa:",
      inputs: [
        {
          name: 'Sequencia',
          placeholder: 'Sequencia'
        },
        {
          name: 'Temperatura',
          placeholder: 'Temperatura em °C'
        },
        {
          name: 'Tempo',
          placeholder: 'Tempo em minutos'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            this.add(data);
          }
        }
      ]
    });
    prompt.present();
  }

  add(data){
    this.itemsCollection.add(data);
  }
  deleteItem(data){
    this.itemsCollection.doc(data.id).delete();
  }
}
