import { Component } from '@angular/core';
import { PickupPubSub } from '../../service/pickup-pub-sub';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public isPlantRequested: boolean = false;
  public isRiderPickedUp: boolean;
  public pickupSubscription: any;
  public destination: string;
  public timeTillArrival: string = '5';
  public distance: string = '10 KM' 

  constructor(private pickupPubSub: PickupPubSub) {
    this.isPlantRequested = false;
      this.isRiderPickedUp = false;
      this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
        this.processPickupSubscription(e);
      })
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
  }
}
