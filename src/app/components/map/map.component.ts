import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { } from 'google-maps';
import { Geolocation } from '@awesome-cordova-plugins/geolocation';
import { LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Plant, PlantServiceService } from 'src/app/service/plant-service.service';
import { SimulateService } from 'src/app/service/simulate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit,OnChanges {
  public map: google.maps.Map;
  public location = new google.maps.LatLng(14.949798, 74.576435);
  public marker: google.maps.Marker;
  public plantMarker: google.maps.Marker;
  public plantMarkers: Array<any> = [];
  public plantData: Plant[] = [];
  public distances: number[] = [];
  @Input() isPlantRequested: boolean;
  @Input() destination: string;

  constructor(private loadingCtrl: LoadingController, private plantService: PlantServiceService,
    private simulate: SimulateService) { }

  ngOnInit() {
    this.map = this.createMap(this.location);
    this.getCurrentLocation().subscribe(location => {
      this.createMap(location);
    });
  }

  ngOnChanges(): void {
    this.requestPlant(this.location);
  }

  createMap(location: google.maps.LatLng): google.maps.Map {
    let mapOptions = {
      center: location,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);
    this.map = map;
    this.fetchAndRefreshPlants(map);
    this.marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'You are here',
      icon: '../../../assets/locator.png'
    });
    return map;
  }

  getCurrentLocation(): Observable<google.maps.LatLng> {
    let loading = this.loadingCtrl.create({
      message: 'Locating...'
    });
    let options = { timeout: 10000, enableHighAccuracy: true };
    let location: Observable<google.maps.LatLng> = Observable.create(async observable => {
      (await loading).present();
      Geolocation.getCurrentPosition(options)
        .then(async resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          let location = new google.maps.LatLng(lat, lng);
          observable.next(location);
          (await loading).dismiss();
        },
          async (err) => {
            (await loading).dismiss();
          })
    })
    return location;
  }

  fetchAndRefreshPlants(map: google.maps.Map) {
    let plantLocations: google.maps.LatLng;
    this.plantService.getPlants().subscribe(data => {
        this.plantData = data;
        this.plantData.forEach(plant => {
          plantLocations = new google.maps.LatLng(plant.coord.lat, plant.coord.lng);
          return this.setMarker(map, plantLocations);
        });
      })
  }

  setMarker(map: google.maps.Map, location: google.maps.LatLng) {
    let plantMarker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'You are here',
      icon: '../../../assets/plant.png'
    });
    this.plantMarkers.push(plantMarker);
    let distance = this.findDistance(this.marker, plantMarker);
    this.distances.push(distance);
  }

  findDistance(mk1, mk2) {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    const rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
    
    const difflat = rlat2-rlat1; // Radian difference (latitudes)
    const difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d
  }
  
  requestPlant(location) {
    if(this.isPlantRequested) {
      console.log(this.isPlantRequested);   
      let sortPlants = this.distances.sort((a,b) => a-b);
      let nearestPlant = sortPlants[0];
      console.log(nearestPlant);
      this.plantMarkers.forEach(plantMkr => {
        console.log(this.findDistance(this.marker, plantMkr).toFixed(2));
        
        if(nearestPlant === this.findDistance(this.marker, plantMkr)) {
          console.log(plantMkr.id);
          return plantMkr.id;
        }
      });
      this.simulate.findPickupCar(location)
    } else {

    }
  }

}




