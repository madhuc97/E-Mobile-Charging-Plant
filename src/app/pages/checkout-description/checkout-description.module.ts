import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutDescriptionPageRoutingModule } from './checkout-description-routing.module';

import { CheckoutDescriptionPage } from './checkout-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutDescriptionPageRoutingModule
  ],
  declarations: [CheckoutDescriptionPage]
})
export class CheckoutDescriptionPageModule {}
