import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MapComponent } from '../../components/map/map.component';
import { PlantsComponent } from '../../components/plants/plants.component'
import { PlantService } from '../../service/plant.service';
import { PickupPubSub } from '../../service/pickup-pub-sub';
import { SimulateService } from 'src/app/service/simulate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    MapComponent,
    PlantsComponent
  ],
  providers: [
    PlantService,
    PickupPubSub,
    SimulateService
  ]
})
export class HomePageModule {}
