import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpValidationPageRoutingModule } from './otp-validation-routing.module';

import { OtpValidationPage } from './otp-validation.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpValidationPageRoutingModule,
    ReactiveFormsModule,
    IonIntlTelInputModule,
  ],
  declarations: [OtpValidationPage]
})
export class OtpValidationPageModule {}
