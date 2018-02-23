import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Rampa, RampaId} from './rampas'
import { Observable } from 'rxjs/Observable';

export interface Producao { Receita: string;  Inicio: Date; Criado: Date; Status: String; }
export interface ProducaoId extends Producao { id: string; }