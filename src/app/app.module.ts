import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { PlantService } from './service/plant.service';

@NgModule({
  declarations: [AppComponent],
  imports: [ReactiveFormsModule, HttpClientModule,
    IonIntlTelInputModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions, LocationAccuracy, PlantService],
  bootstrap: [AppComponent],
})
export class AppModule {}
