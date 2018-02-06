import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RampaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rampa',
  templateUrl: 'rampa.html',
})
export class RampaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RampaPage');
  }

}
