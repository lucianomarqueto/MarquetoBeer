import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item { name: string; }

@IonicPage()
@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('Receitas');
    this.items = this.itemsCollection.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitasPage');
  }

}
