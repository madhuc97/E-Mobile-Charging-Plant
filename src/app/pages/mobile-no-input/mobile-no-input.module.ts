import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileNoInputPageRoutingModule } from './mobile-no-input-routing.module';

import { MobileNoInputPage } from './mobile-no-input.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileNoInputPageRoutingModule,
    ReactiveFormsModule,
    IonIntlTelInputModule,
  ],
  declarations: [MobileNoInputPage]
})
export class MobileNoInputPageModule {}
