import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { MapComponent } from 'src/app/components/map/map.component';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnChanges{
  public isPlantRequested: boolean = false;
  public isPlantBooked: boolean = false;
  public locationEnabled: boolean = true;
  public isRiderPickedUp: boolean;
  public pickupSubscription: any;
  public destination: string;
  public timeTillArrival: string = '5';
  public distance: string = '10 KM';
  public locatorHeight: string;
  public subscription = new Subscription();
  @ViewChild('map') locator: MapComponent;

  constructor(private route: ActivatedRoute, private router: Router, private renderer: Renderer2, private locationStrategy: LocationStrategy, 
    private plantService: PlantService, private platform: Platform) {
  }

  ngOnInit(): void {
    this.plantService.getLocationEnabled().subscribe(data =>
      this.locationEnabled = data
    );
    this.preventBackButton();
    console.log(this.isPlantBooked);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.preventBackButton();
    this.plantService.getIsPlantBookked().subscribe(data =>
      this.isPlantBooked = data
    );
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state
      this.isPlantBooked = navParams.item;
    })
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }
  
  ionViewWillLeave() {
    this.subscription.unsubscribe();
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
    this.isPlantBooked = false;
    //const el = this.locator.nativeElement;
    //this.locator.nativeElement.style.marginBottom = '120px';
    //this.renderer.setStyle(el, 'color', '#fff');
    this.locatorHeight = '80px'
  }

  cancelPlantRequest(): void {
    window.location.reload();
  }

  bookPlant() {
    this.isPlantRequested = true;
    this.isPlantBooked = true;
    // this.locationEnabled = false;
    this.locatorHeight = '60px'
    this.router.navigateByUrl('mobile-no-input');
  }

  preventBackButton() {
    history.pushState(null, '', window.location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', window.location.href);
    })
  }

  refresh(): void {
      this.locator.centerLocation();
  }
}
