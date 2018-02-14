import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RampaPage } from './../rampa/rampa';
import { ProduzirPage } from './../produzir/produzir';
import { AlertController, LoadingController } from 'ionic-angular';

import { Receita, ReceitaId } from './../../models/receitas';
import { Rampa, RampaId } from './../../models/rampas';
import { Producao, ProducaoId } from './../../models/producoes';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {

  private receitasCollection: AngularFirestoreCollection<Receita>;
  receitas: Observable<ReceitaId[]>;

  private novaProducao: Producao;
  private producaoCollection: AngularFirestoreCollection<Producao>;
  private producaoRampaCollection: AngularFirestoreCollection<Rampa>;

  private rampaCollection: AngularFirestoreCollection<Rampa>;
  rampaSubscription: Subscription;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private afs: AngularFirestore, public alertCtrl: AlertController) {
    this.receitasCollection = afs.collection<Receita>('Receitas');
    this.receitas = this.receitasCollection.snapshotChanges().map(actions => {
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

  add(data) {
    console.log(data);
    this.receitasCollection.add(data);
  }

  editReceita(item) {
    console.log(item);
    this.navCtrl.push(RampaPage, item);
  }


  produzirReceita(item) {
    let confirm = this.alertCtrl.create({
      title: item.Nome,
      message: 'Partiu produzir uma?',
      buttons: [
        {
          text: 'Agora não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Bora lá',
          handler: () => {
            console.log('Agree clicked');
            this.produzirReceitaSubmit(item);
          }
        }
      ]
    });
    confirm.present();
  }

  produzirReceitaSubmit(item) {
    this.showLoading()
    console.log(item);

    this.rampaCollection = this.afs.collection<Rampa>('Receitas/' + item.id + "/Rampas/", ref => ref.orderBy('Sequencia'));
    this.novaProducao = {
      Receita: item.Nome,
      Criado: new Date(),
      Status: "Em Preparação"
    };

    this.producaoCollection = this.afs.collection('Producoes');
    this.producaoCollection.add(this.novaProducao).then(ref => {
      console.log(ref.id);
      this.producaoRampaCollection = this.afs.collection('Producoes/' + ref.id + '/RampasPlanejado');
      this.rampaSubscription = this.rampaCollection.valueChanges()
        .finally(() => {
          this.hideLoading();
          this.navCtrl.push(ProduzirPage, ref.id);
        }).subscribe(
        i => {
          i.forEach(r => { this.producaoRampaCollection.add(r); });
          this.rampaSubscription.unsubscribe();
        },
        erro => { console.log(erro) }
        );
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Pofavor aguarde...'
    });

    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }
}