import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MapComponent } from '../../components/map/map.component';
import { PlantService } from '../../service/plant.service';
import { SimulateService } from 'src/app/service/simulate';
//import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
//import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    //AndroidPermissions,
    //LocationAccuracy
  ],
  declarations: [
    HomePage,
    MapComponent
  ],
  providers: [
    PlantService,
    SimulateService
  ]
})
export class HomePageModule {}
