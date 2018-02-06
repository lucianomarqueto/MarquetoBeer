import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceitasPage } from './receitas';

@NgModule({
  declarations: [
    ReceitasPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceitasPage),
  ],
})
export class ReceitasPageModule {}
