import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Rampa, RampaId} from './rampas'
import { Observable } from 'rxjs/Observable';

export interface Producao { Receita: string; Criado: Date; Status: String; Inicio: Date; }
export interface ProducaoId extends Producao { id: string; }