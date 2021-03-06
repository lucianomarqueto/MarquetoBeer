webpackJsonp([4],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__produzir_produzir__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__ = __webpack_require__(47);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, afAuth, afs) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.afs = afs;
        this.afAuth.authState.subscribe(function (res) {
            if (res && res.uid) {
                //Usuario esta logado
                console.log("Usuario logado");
                _this.username = res.displayName;
                _this.producoesCollection = afs.collection('Producoes/', function (ref) { return ref.orderBy('Criado', 'desc'); });
                _this.producoes = _this.producoesCollection.snapshotChanges().map(function (actions) {
                    return actions.map(function (a) {
                        var data = a.payload.doc.data();
                        var id = a.payload.doc.id;
                        return __assign({ id: id }, data);
                    });
                });
            }
            else {
                //Usuário não esta logado
                console.log("Usuario não logado");
                _this.username = null;
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
            }
        });
    }
    HomePage.prototype.selectItem = function (producao) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__produzir_produzir__["a" /* ProduzirPage */], producao.id);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Marqueto Beer</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Olá {{ username }}</h3>\n\n  <ion-list ion-item *ngFor="let producao of producoes | async">\n    <ion-card tappable (click)="selectItem(producao)">\n      <ion-card-header>\n        {{ producao.Receita }}\n      </ion-card-header>\n      <ion-card-content>\n        {{ producao.Status }}\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n  \n</ion-content>'/*ion-inline-end:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPanelProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(47);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ControlPanelProvider = (function () {
    function ControlPanelProvider(afs) {
        this.afs = afs;
        this.margemTemperatura = 0.5;
        this.ultimaAtualizacao = new Date();
        this.ultimaTemperatura = 20;
        this.ultimaRegistroSalvo = new Date();
        this.aquecedorLigado = false;
        var _this = this;
        setInterval(function () { _this.atualizaDados(); }, 1000);
    }
    ControlPanelProvider.prototype.getRandomArbitrary = function () {
        if (this.aquecedorLigado) {
            return Math.random() * ((this.ultimaTemperatura + 1) - (this.ultimaTemperatura)) + (this.ultimaTemperatura);
        }
        else {
            return Math.random() * ((this.ultimaTemperatura) - (this.ultimaTemperatura - 0.05)) + (this.ultimaTemperatura - 0.05);
        }
    };
    ControlPanelProvider.prototype.setAquecedorLigado = function (status) {
        this.aquecedorLigado = status;
    };
    ControlPanelProvider.prototype.getTemperaturaPlanejada = function () {
        if (this.rampaEmSubida) {
            //TODO contole de subida
            return this.rampaAtual.Temperatura;
        }
        else {
            return this.rampaAtual.Temperatura;
        }
    };
    ControlPanelProvider.prototype.atualizaDados = function () {
        console.log("update");
        this.ultimaAtualizacao = new Date();
        this.ultimaTemperatura = this.getRandomArbitrary();
        if (this.producaoId != null) {
            //Verifica final da rampa atual
            if (this.rampaEmSubida) {
                //Para rampa em subida o final é determinado pela temperatura
                //TODO So funciona para rampa de subida
                if (this.ultimaTemperatura >= this.rampaAtual.Temperatura) {
                    console.log("Rampa finalizou por temperatura");
                    this.atualizaInicioRealRampa();
                }
            }
            else {
                //Verifica se o tempo acabou        
                if (this.rampaDataFinal < new Date()) {
                    console.log("Rampa finalizou por tempo");
                    this.atualizarStatusRampa();
                }
            }
            //atualiza status do aquecedor
            if (this.rampaAtual != null) {
                if (this.aquecedorLigado) {
                    //Temperatura subindo        
                    if (this.ultimaTemperatura > this.getTemperaturaPlanejada() + this.margemTemperatura) {
                        this.setAquecedorLigado(false);
                    }
                }
                else {
                    //Temperatura baixando
                    if (this.ultimaTemperatura < this.getTemperaturaPlanejada() - this.margemTemperatura) {
                        this.setAquecedorLigado(true);
                    }
                }
            }
            //registra a cada 30 segundos
            if ((this.ultimaAtualizacao.getTime() - this.ultimaRegistroSalvo.getTime()) > 30000) {
                this.ultimaRegistroSalvo = this.ultimaAtualizacao;
                var out = {
                    Temperatura: this.ultimaTemperatura,
                    Data: this.ultimaAtualizacao,
                    AquecedorLigado: this.aquecedorLigado
                };
                this.itemsCollection.add(out);
            }
        }
    };
    ControlPanelProvider.prototype.conectar = function (id) {
        var _this = this;
        this.producaoId = id;
        this.itemsCollection = this.afs.collection('Producoes/' + id + "/RampasExecutada/");
        this.rampaCollection = this.afs.collection('Producoes/' + id + "/RampasPlanejado/", function (ref) { return ref.orderBy('Sequencia'); });
        this.rampas = this.rampaCollection.snapshotChanges()
            .map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        });
        //Obtem a rampa planejada
        this.rampas.subscribe(function (i) {
            _this.rampasArray = i;
            _this.atualizarStatusRampa();
        }, function (erro) { console.log(erro); });
        //Obtem Produção 
        this.producaoDoc = this.afs.doc('Producoes/' + id);
        this.producao = this.producaoDoc.valueChanges();
        this.producao.subscribe(function (i) {
            _this.producaoObj = i;
            _this.atualizarStatusRampa();
        }, function (erro) { console.log(erro); });
    };
    ControlPanelProvider.prototype.atualizarStatusRampa = function () {
        console.log("Atualizando status da rampa");
        if (this.rampasArray == null) {
            //Metodo asyn não carregou ainda
            return false;
        }
        //Se não iniciar ainda utilizar a data agora
        if (this.producaoObj == null) {
            //Metodo asyn não carregou ainda
            return false;
        }
        var velocidadeSubida = 1; //graus por minuto;
        var auxData = new Date(this.producaoObj.Inicio);
        var auxTemperatura = 0;
        var auxMinutos = 0;
        for (var i = 0; i < this.rampasArray.length; i++) {
            console.log("Data Inicio");
            console.log(auxData);
            console.log(this.ultimaAtualizacao);
            console.log(auxData);
            console.log("Rampa " + i);
            console.log(this.rampasArray[i]);
            //Caso não tenha iniciado calcula a subida
            if (this.rampasArray[i].Inicio == null) {
                console.log("Inicio null");
                //Rampa de alteração de temperatura         
                auxMinutos = (this.rampasArray[i].Temperatura - auxTemperatura) * velocidadeSubida;
                //Trata tempo negativo em caso de descida
                auxMinutos = auxMinutos < 0 ? auxMinutos * -1 : auxMinutos;
                auxData.setMinutes(auxData.getMinutes() + auxMinutos);
                console.log("Data de final da subida" + auxData);
                if (this.ultimaAtualizacao < auxData) {
                    this.rampaAtual = this.rampasArray[i];
                    this.rampaEmSubida = true;
                    this.rampaDataFinal = new Date(auxData);
                    console.log("Defido que é essa rampa em subida");
                    return true;
                }
            }
            else {
                console.log("Inicio != null");
                auxData = new Date(this.rampasArray[i].Inicio);
            }
            //Tempo na temperatura da rampa
            auxData.setMinutes(auxData.getMinutes() + this.rampasArray[i].Tempo);
            auxTemperatura = this.rampasArray[i].Temperatura;
            console.log("Data de final da rampa" + auxData);
            if (this.ultimaAtualizacao < auxData) {
                console.log("Definido que é essa rampa em andamento");
                this.rampaAtual = this.rampasArray[i];
                this.rampaEmSubida = false;
                this.rampaDataFinal = new Date(auxData);
                return true;
            }
        }
    };
    ControlPanelProvider.prototype.atualizaInicioRealRampa = function () {
        console.log('Atualiza data de inicio');
        this.rampaAtualDocRef = this.afs.doc('Producoes/' + this.producaoId + "/RampasPlanejado/" + this.rampaAtual.id);
        this.rampaAtualDocRef.update({ Inicio: new Date() });
    };
    ControlPanelProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], ControlPanelProvider);
    return ControlPanelProvider;
}());

//# sourceMappingURL=control-panel.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RampaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(47);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RampaPage = (function () {
    function RampaPage(navCtrl, navParams, afs, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.alertCtrl = alertCtrl;
        console.log(this.navParams);
        this.itemsCollection = afs.collection('Receitas/' + this.navParams.data.id + "/Rampas/", function (ref) { return ref.orderBy('Sequencia'); });
        this.rampas = this.itemsCollection.snapshotChanges().map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        });
    }
    RampaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RampaPage');
    };
    RampaPage.prototype.showAdd = function () {
        var _this = this;
        console.log("Click to add");
        var prompt = this.alertCtrl.create({
            title: 'Rampa',
            message: "Adicione uma nova etapa na rampa:",
            inputs: [
                {
                    name: 'Nome',
                    placeholder: 'Nome',
                },
                {
                    name: 'Sequencia',
                    placeholder: 'Sequencia',
                    type: 'Number',
                },
                {
                    name: 'Temperatura',
                    placeholder: 'Temperatura em °C',
                    type: 'Number',
                },
                {
                    name: 'Tempo',
                    placeholder: 'Tempo em minutos',
                    type: 'Number',
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                        _this.add(data);
                    }
                }
            ]
        });
        prompt.present();
    };
    RampaPage.prototype.add = function (data) {
        console.log(data);
        var out = {
            Nome: data.Nome,
            Sequencia: Number(data.Sequencia),
            Temperatura: Number(data.Temperatura),
            Tempo: Number(data.Tempo),
            Inicio: null
        };
        this.itemsCollection.add(out);
    };
    RampaPage.prototype.deleteItem = function (data) {
        this.itemsCollection.doc(data.id).delete();
    };
    RampaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rampa',template:/*ion-inline-start:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\rampa\rampa.html"*/'<!--\n  Generated template for the RampaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Configuração das Rampas</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-fab top right edge>\n    <button ion-fab mini tappable (click)="showAdd()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n  <ion-list>\n    <ion-grid>\n      <ion-row>\n        <ion-col col></ion-col>\n        <ion-col col></ion-col>\n        <ion-col col>\n          <ion-icon name="thermometer"></ion-icon>\n        </ion-col>\n        <ion-col col>\n          <ion-icon name="time"></ion-icon>\n        </ion-col>\n        <ion-col col></ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n  <ion-list ion-item *ngFor="let rampa of rampas | async">\n    <ion-grid>\n      <ion-row>\n        <ion-col col>{{ rampa.Nome }}</ion-col>\n        <ion-col col>{{ rampa.Sequencia }}</ion-col>\n        <ion-col col>{{ rampa.Temperatura }}°C</ion-col>\n        <ion-col col>{{ rampa.Tempo }} min</ion-col>\n        <ion-col col>\n          <button (click)="deleteItem(rampa)">\n            <ion-icon name="trash"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\rampa\rampa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RampaPage);
    return RampaPage;
}());

//# sourceMappingURL=rampa.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReceitasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rampa_rampa__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__produzir_produzir__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReceitasPage = (function () {
    function ReceitasPage(navCtrl, navParams, loadingCtrl, afs, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.afs = afs;
        this.alertCtrl = alertCtrl;
        this.receitasCollection = afs.collection('Receitas');
        this.receitas = this.receitasCollection.snapshotChanges().map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        });
    }
    ReceitasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReceitasPage');
    };
    ReceitasPage.prototype.showAdd = function () {
        var _this = this;
        console.log("Click to add");
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                        _this.add(data);
                    }
                }
            ]
        });
        prompt.present();
    };
    ReceitasPage.prototype.add = function (data) {
        console.log(data);
        this.receitasCollection.add(data);
    };
    ReceitasPage.prototype.editReceita = function (item) {
        console.log(item);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__rampa_rampa__["a" /* RampaPage */], item);
    };
    ReceitasPage.prototype.produzirReceita = function (item) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: item.Nome,
            message: 'Partiu produzir uma?',
            buttons: [
                {
                    text: 'Agora não',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Bora lá',
                    handler: function () {
                        console.log('Agree clicked');
                        _this.produzirReceitaSubmit(item);
                    }
                }
            ]
        });
        confirm.present();
    };
    ReceitasPage.prototype.produzirReceitaSubmit = function (item) {
        var _this = this;
        this.showLoading();
        console.log(item);
        this.rampaCollection = this.afs.collection('Receitas/' + item.id + "/Rampas/", function (ref) { return ref.orderBy('Sequencia'); });
        this.novaProducao = {
            Receita: item.Nome,
            Criado: new Date(),
            Status: "Em Preparação",
            Inicio: null
        };
        this.producaoCollection = this.afs.collection('Producoes');
        this.producaoCollection.add(this.novaProducao).then(function (ref) {
            console.log(ref.id);
            _this.producaoRampaCollection = _this.afs.collection('Producoes/' + ref.id + '/RampasPlanejado');
            _this.rampaSubscription = _this.rampaCollection.valueChanges()
                .finally(function () {
                _this.hideLoading();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__produzir_produzir__["a" /* ProduzirPage */], ref.id);
            }).subscribe(function (i) {
                i.forEach(function (r) { _this.producaoRampaCollection.add(r); });
                _this.rampaSubscription.unsubscribe();
            }, function (erro) { console.log(erro); });
        });
    };
    ReceitasPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Pofavor aguarde...'
        });
        this.loading.present();
    };
    ReceitasPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    ReceitasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-receitas',template:/*ion-inline-start:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\receitas\receitas.html"*/'<!--\n  Generated template for the ReceitasPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Receitas</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-fab top right edge>\n    <button ion-fab mini tappable (click)="showAdd()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-list>\n    <ion-item *ngFor="let receita of receitas | async">\n      <p>{{ receita.Nome }}\n        <button tappable (click)="editReceita(receita)">\n          <ion-icon name="create"></ion-icon>\n        </button>\n        <button tappable (click)="produzirReceita(receita)">\n          <ion-icon name="beer"></ion-icon>\n        </button>\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\receitas\receitas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ReceitasPage);
    return ReceitasPage;
}());

//# sourceMappingURL=receitas.js.map

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 170;

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		440,
		3
	],
	"../pages/produzir/produzir.module": [
		441,
		2
	],
	"../pages/rampa/rampa.module": [
		442,
		1
	],
	"../pages/receitas/receitas.module": [
		443,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 214;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(295);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_receitas_receitas__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_rampa_rampa__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_produzir_produzir__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__environments_environment__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_firestore__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_google_plus__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_control_panel_control_panel__ = __webpack_require__(134);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_receitas_receitas__["a" /* ReceitasPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_rampa_rampa__["a" /* RampaPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_produzir_produzir__["a" /* ProduzirPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/produzir/produzir.module#ProduzirPageModule', name: 'ProduzirPage', segment: 'produzir', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rampa/rampa.module#RampaPageModule', name: 'RampaPage', segment: 'rampa', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/receitas/receitas.module#ReceitasPageModule', name: 'ReceitasPage', segment: 'receitas', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_12_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_13__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2_firestore__["b" /* AngularFirestoreModule */].enablePersistence()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_receitas_receitas__["a" /* ReceitasPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_rampa_rampa__["a" /* RampaPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_produzir_produzir__["a" /* ProduzirPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_17__providers_control_panel_control_panel__["a" /* ControlPanelProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_receitas_receitas__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_control_panel_control_panel__ = __webpack_require__(134);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, controlPanelProvider) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this.controlPanelProvider = controlPanelProvider;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Receitas', component: __WEBPACK_IMPORTED_MODULE_6__pages_receitas_receitas__["a" /* ReceitasPage */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        switch (true) {
            case ((page.title == 'Logout')):
                {
                    console.log('Clicked Logout button');
                    this.afAuth.auth.signOut();
                    this.nav.setRoot(page.component);
                }
                break;
            default:
                {
                    this.nav.push(page.component);
                }
                break;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Node\MarquetoBeer\MarquetoBeer\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Node\MarquetoBeer\MarquetoBeer\src\app\app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_8__providers_control_panel_control_panel__["a" /* ControlPanelProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_8__providers_control_panel_control_panel__["a" /* ControlPanelProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBg_vqCB3j86aHrm-Ku1px2zdzTl0xFsIo",
        authDomain: "marquetobeer.firebaseapp.com",
        databaseURL: "https://marquetobeer.firebaseio.com",
        projectId: "marquetobeer",
        storageBucket: "marquetobeer.appspot.com",
        messagingSenderId: "108728226334"
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, afAuth, platform, googlePlus) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.platform = platform;
        this.googlePlus = googlePlus;
        this.afAuth.authState.subscribe(function (res) {
            if (res && res.uid) {
                //Usuario esta logado        
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            }
            else {
                console.log('Usuário não esta logado');
                //Usuário não esta logado
                //this.navCtrl.push(LoginPage);
            }
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.googlePlus.login({
                'webClientId': '108728226334-d6ff9drlb74f610u9ktiipi685i03jrg.apps.googleusercontent.com',
                'offline': true
            }).then(function (obj) {
                if (!__WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().currentUser) {
                    __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithCredential(__WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider.credential(obj.idToken))
                        .then(function (success) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                    })
                        .catch(function (gplusErr) {
                        alert("GooglePlus failed");
                    });
                }
            }).catch(function (msg) {
                alert(msg + "Gplus signin failed 2");
            });
        }
        else {
            return this.afAuth.auth
                .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider())
                .then(function (res) { return console.log(res); });
        }
    };
    LoginPage.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>  \n  <div *ngIf="afAuth.authState | async; let user; else showLogin">\n    <h1>Olá {{ user.displayName }}!</h1>\n    <button (click)="logout()">Logout</button>\n  </div>\n  <ng-template #showLogin>\n    <p>Clique para login com o Google.</p>\n    <button (click)="login()"><ion-icon name="logo-google"></ion-icon></button>\n  </ng-template>\n</ion-content>\n'/*ion-inline-end:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProduzirPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_highcharts__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_control_panel_control_panel__ = __webpack_require__(134);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProduzirPage = (function () {
    function ProduzirPage(navCtrl, navParams, afs, controlPanelProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.controlPanelProvider = controlPanelProvider;
        //Variavel para exibir ou esconder botão de iniciar
        this.buttonIniciar = false;
        //Series do grafico
        this.data = [];
        this.producaoId = this.navParams.data;
        this.rampaCollection = afs.collection('Producoes/' + this.navParams.data + "/RampasPlanejado/", function (ref) { return ref.orderBy('Sequencia'); });
        this.rampas = this.rampaCollection.snapshotChanges()
            .map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        });
        this.registroPanelCollection = afs.collection('Producoes/' + this.navParams.data + "/RampasExecutada/", function (ref) { return ref.orderBy('Data'); });
        this.registroPanel = this.registroPanelCollection.stateChanges(['added'])
            .map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        });
        this.producaoDoc = afs.doc('Producoes/' + this.navParams.data);
        this.producao = this.producaoDoc.valueChanges();
        this.producao.subscribe(function (i) {
            console.log("Obtem objeto ");
            console.log(i);
            _this.producaoObj = i;
            _this.updateChart();
        }, function (erro) { console.log(erro); });
    }
    ProduzirPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_highcharts__["setOptions"]({
            global: {
                timezoneOffset: 3 * 60
            }
        });
        //Configuração do grafico
        this.chart = __WEBPACK_IMPORTED_MODULE_2_highcharts__["chart"]('container', {
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
        this.rampas.subscribe(function (i) {
            _this.rampasArray = i;
            _this.updateChart();
        }, function (erro) { console.log(erro); });
        //Obtem rampa executada
        this.registroPanel.subscribe(function (i) {
            i.forEach(function (r) {
                _this.chart.series[1].addPoint([r.Data.valueOf(), r.Temperatura]);
            });
        }, function (erro) { console.log(erro); });
    };
    //Iniciar processo de brassagem
    ProduzirPage.prototype.iniciar = function () {
        this.producaoDoc.update({ Status: "Em Brassagem", Inicio: new Date() });
        this.conectarPainelControle();
    };
    //Atualiza Grafico
    ProduzirPage.prototype.updateChart = function () {
        var _this = this;
        if (this.rampasArray == null) {
            //Metodo asyn não carregou ainda
            return;
        }
        //Se não iniciar ainda utilizar a data agora
        if (this.producaoObj == null) {
            //Metodo asyn não carregou ainda
            return;
        }
        if (this.producaoObj.Inicio == null) {
            //Só renderiza o grafico após o inicio
            return;
        }
        console.log(this.producaoObj);
        var inicio = new Date(this.producaoObj.Inicio);
        console.log(inicio);
        var velocidadeSubida = 1; //graus por minuto;
        var auxData = new Date(inicio);
        var auxTemperatura = 0;
        var auxMinutos = 0;
        var data = [];
        this.TempoTotal = 0;
        console.log(auxData);
        //Adicionar ponto 0    
        data.push([inicio.valueOf(), 0]);
        this.rampasArray.forEach(function (r) {
            if (r.Inicio == null) {
                //Rampa de alteração de temperatura         
                auxMinutos = (r.Temperatura - auxTemperatura) * velocidadeSubida;
                //Trata tempo negativo em caso de descida
                auxMinutos = auxMinutos < 0 ? auxMinutos * -1 : auxMinutos;
                _this.TempoTotal = _this.TempoTotal + auxMinutos;
                auxData.setMinutes(auxData.getMinutes() + auxMinutos);
            }
            else {
                auxData = r.Inicio;
            }
            data.push([auxData.valueOf(), r.Temperatura]);
            //Tempo na temperatura da rampa
            auxData.setMinutes(auxData.getMinutes() + r.Tempo);
            data.push([auxData.valueOf(), r.Temperatura]);
            _this.TempoTotal = _this.TempoTotal + r.Tempo;
            auxTemperatura = r.Temperatura;
        });
        this.HoraFinal = inicio;
        this.HoraFinal.setMinutes(inicio.getMinutes() + this.TempoTotal);
        this.chart.series[0].setData(data);
    };
    ProduzirPage.prototype.conectarPainelControle = function () {
        this.controlPanelProvider.conectar(this.navParams.data);
    };
    ProduzirPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-produzir',template:/*ion-inline-start:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\produzir\produzir.html"*/'<!--\n  Generated template for the ProduzirPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Produção {{ (producao | async)?.Receita }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12>\n        <ion-card>\n\n          <ion-card-header>\n            {{ (producao | async)?.Status }}\n          </ion-card-header>\n          <ion-card-content>\n            <button *ngIf="(producao | async)?.Status == \'Em Preparação\'" ion-button (click)="iniciar()">Iniciar</button>\n          </ion-card-content>\n\n        </ion-card>\n\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-12>\n        <ion-card>\n          <ion-card-header>\n            Estimativa: {{ TempoTotal }} Minutos\n          </ion-card-header>\n          <ion-card-content>\n            Final da etapa quente as {{ HoraFinal | date:\'dd/MM/yyyy HH:mm\'}}\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-12>\n        <ion-card>\n          <ion-card-header>\n            Panel de controle\n          </ion-card-header>\n          <ion-card-content>\n            <p *ngIf="(controlPanelProvider.producaoId!=producaoId)">O sistema não esta salvando os dados do Painel nessa produção</p>\n            <button *ngIf="(controlPanelProvider.producaoId!=producaoId)" ion-button (click)="conectarPainelControle()">Reconectar a essa produção</button>\n            <p>Ultima atulização: {{ controlPanelProvider.ultimaAtualizacao | date:\'HH:mm:ss\'}}</p>\n            <p>Ultima temperatura: {{ controlPanelProvider.ultimaTemperatura | number}} °C</p>\n            <p>Arquecedor:\n              <ion-icon name="flame" *ngIf="(controlPanelProvider.aquecedorLigado)"> Ligado</ion-icon>\n              <ion-icon name="snow" *ngIf="(!controlPanelProvider.aquecedorLigado)"> Desligado</ion-icon>\n            </p>\n\n\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <div id="container" style="display: block;"></div>\n</ion-content>'/*ion-inline-end:"C:\Node\MarquetoBeer\MarquetoBeer\src\pages\produzir\produzir.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_4__providers_control_panel_control_panel__["a" /* ControlPanelProvider */]])
    ], ProduzirPage);
    return ProduzirPage;
}());

//# sourceMappingURL=produzir.js.map

/***/ })

},[277]);
//# sourceMappingURL=main.js.map