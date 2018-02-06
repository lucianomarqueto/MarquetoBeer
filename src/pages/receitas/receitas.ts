import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RampaPage } from './../rampa/rampa';
import { AlertController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Receita { Nome: string; }
export interface ReceitaId extends Receita { id: string; }

@IonicPage()
@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {

  private itemsCollection: AngularFirestoreCollection<Receita>;
  receitas: Observable<ReceitaId[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.itemsCollection = afs.collection<Receita>('Receitas');
    this.receitas = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Receita;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitasPage');
  }

  showAdd() {
    console.log("Click to add");
    let prompt = this.alertCtrl.create({
      title: 'Nova Receita',
      message: "Qual é o nome da nova receita?",
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Nome'
        },
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

  itemSelected(item){
    console.log(item);    
    this.navCtrl.push(RampaPage,item);
  }
}
