import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  
  username: string;
  
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        //Usuario esta logado
        alert("Usuario logado")
        this.username = res.displayName;
      } else {
        //Usuário não esta logado
        alert("Usuario não logado")
        this.username = null;
      }
    });
  }

}
