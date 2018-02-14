import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { LoginPage } from './../login/login';

import { Producao, ProducaoId } from './../../models/producoes'

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  
  private producoesCollection: AngularFirestoreCollection<Producao>;
  producoes: Observable<ProducaoId[]>;

  username: string;
  
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        //Usuario esta logado
        console.log("Usuario logado");
        this.username = res.displayName;
      } else {
        //Usuário não esta logado
        console.log("Usuario não logado");
        this.username = null;
        this.navCtrl.setRoot(LoginPage);        
      }
    });
  }

}
