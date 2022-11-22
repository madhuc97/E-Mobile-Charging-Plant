import { Component, ElementRef, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MapComponent } from 'src/app/components/map/map.component';
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
  public distance: string = '10 KM';
  public locatorHeight: string;
  @ViewChild('map') locator: MapComponent;

  constructor(private pickupPubSub: PickupPubSub, private router: Router, private renderer: Renderer2, private plantService: PlantService) {
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
    //const el = this.locator.nativeElement;
    //this.locator.nativeElement.style.marginBottom = '120px';
    //this.renderer.setStyle(el, 'color', '#fff');
    this.locatorHeight = '100px'
  }

  cancelPlantRequest() {
    this.isPlantRequested = false;
    this.router.navigateByUrl('mobile-no-input');
  }

  refresh(): void {
      this.locator.centerLocation();
  }
}
