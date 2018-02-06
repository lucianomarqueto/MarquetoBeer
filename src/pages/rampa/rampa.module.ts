import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RampaPage } from './rampa';

@NgModule({
  declarations: [
    RampaPage,
  ],
  imports: [
    IonicPageModule.forChild(RampaPage),
  ],
})
export class RampaPageModule {}
