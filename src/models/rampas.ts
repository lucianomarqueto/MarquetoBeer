export interface Rampa {Nome: String, Sequencia: number; Temperatura: number; Tempo: number; Inicio: Date}
export interface RampaId extends Rampa { id: string; }