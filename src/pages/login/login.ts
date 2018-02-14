import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { HomePage } from './../home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,
    private platform: Platform, private googlePlus: GooglePlus) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        //Usuario esta logado        
        this.navCtrl.setRoot(HomePage);
      } else {
        console.log('Usuário não esta logado');
        //Usuário não esta logado
        //this.navCtrl.push(LoginPage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if (this.platform.is('cordova')) {
      this.googlePlus.login({
        'webClientId': '108728226334-d6ff9drlb74f610u9ktiipi685i03jrg.apps.googleusercontent.com',
        'offline': true
      }).then((obj) => {
        if (!firebase.auth().currentUser) {
          firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
            .then((success) => {
              this.navCtrl.setRoot(HomePage);
            })
            .catch((gplusErr) => {
              alert("GooglePlus failed");

            });
        }
      }).catch((msg) => {
        alert(msg + "Gplus signin failed 2")
      });


    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => console.log(res));
    }
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
