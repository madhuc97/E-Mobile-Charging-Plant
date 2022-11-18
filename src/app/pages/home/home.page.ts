import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from 'src/app/service/plant.service';
import { PickupPubSub } from '../../service/pickup-pub-sub';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  public isPlantRequested: boolean = false;
  public locationEnabled: boolean = true;
  public isRiderPickedUp: boolean;
  public pickupSubscription: any;
  public destination: string;
  public timeTillArrival: string = '5';
  public distance: string = '10 KM' 

  constructor(private pickupPubSub: PickupPubSub, private router: Router, private plantService: PlantService) {
    this.isPlantRequested = false;
      this.isRiderPickedUp = false;
      this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
        this.processPickupSubscription(e);
      })
  }

  ngOnInit(): void {
    this.plantService.getLocationEnabled().subscribe(data =>
      this.locationEnabled = data
    );
    console.log(this.isPlantRequested);
  }

  processPickupSubscription(e) {
    switch(e.event) {
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
        this.updateArrivalTime(e.data);
        break;
      case this.pickupPubSub.EVENTS.PICKUP:
        this.riderPickedUp();
        break;
      case this.pickupPubSub.EVENTS.DROPOFF:
        this.riderDroppedOff();
        break;
    }
  }
  
  setDestination(destination) {
    this.destination = destination;
  }
  
  riderPickedUp() {
    this.isRiderPickedUp = true;
  }

  riderDroppedOff() {
    this.isRiderPickedUp = false;
    this.isPlantRequested = false;
    this.destination = null;
    this.timeTillArrival = '5';
  }
  
  updateArrivalTime(seconds) {
    let minutes = Math.floor(seconds/60);
    this.timeTillArrival = String(minutes);
  }

  confirmPlantRequest() {
    this.isPlantRequested = true;
  }

  cancelPlantRequest() {
    this.isPlantRequested = false;
    this.router.navigateByUrl('mobile-no-input');
  }

}
