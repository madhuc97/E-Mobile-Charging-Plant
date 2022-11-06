import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpValidationPageRoutingModule } from './otp-validation-routing.module';

import { OtpValidationPage } from './otp-validation.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgOtpInputModule,
    OtpValidationPageRoutingModule
  ],
  declarations: [OtpValidationPage]
})
export class OtpValidationPageModule {}
