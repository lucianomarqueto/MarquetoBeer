import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProduzirPage } from './produzir';

@NgModule({
  declarations: [
    ProduzirPage,
  ],
  imports: [
    IonicPageModule.forChild(ProduzirPage)
  ],
})
export class ProduzirPageModule {}
