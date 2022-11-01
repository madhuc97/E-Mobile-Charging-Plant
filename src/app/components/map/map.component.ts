import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { } from 'google-maps';
import { Geolocation } from '@awesome-cordova-plugins/geolocation';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Plant, PlantService } from 'src/app/service/plant.service';
import { SimulateService } from 'src/app/service/simulate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit, OnChanges {
  public map: any;
  public location = new google.maps.LatLng(14.949798, 74.576435);
  public marker: google.maps.Marker;
  public plantMarker: google.maps.Marker;
  public plantMarkers: Array<google.maps.Marker> = [];
  public plantData: Plant[] = [];
  public distances: number[] = [];
  @Input() isPlantRequested: boolean;
  @Input() destination: string;

  constructor(private loadingCtrl: LoadingController, private plantService: PlantService,
    private simulate: SimulateService, private router: Router) { }

  ngOnInit() {
    this.map = this.createMap(this.location);
    this.getCurrentLocation().subscribe(location => {
      this.createMap(location);
    });
  }

  ngOnChanges(): void {
    this.requestPlant(this.map);
  }

  createMap(location: google.maps.LatLng): Observable<google.maps.Map> {
    let mapOptions = {
      center: location,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    let mapEl = document.getElementById('map');
    let map: any = new google.maps.Map(mapEl, mapOptions);
    this.map = map;
    this.setCurrentLocationMarker(map, location)
    this.fetchAndRefreshPlants(map);
    let bounds = new google.maps.LatLngBounds();
    this.plantMarkers.forEach(element => {
      bounds.extend(element.getPosition());
    });
    map.fitBounds(bounds);
    return map;
  }

  setCurrentLocationMarker(map: google.maps.Map, location: google.maps.LatLng) {
    this.marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'You are here',
      icon: '../../../assets/locator.png'
    });
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
        return this.setPlantMarker(map, plantLocations);
      });
    })
  }

  setPlantMarker(map: google.maps.Map, location: google.maps.LatLng) {
    this.plantMarker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'You are here',
      icon: '../../../assets/plant.png'
    });
    this.plantMarkers.push(this.plantMarker);
    let distance = this.findDistance(this.marker, this.plantMarker);
    this.distances.push(distance);
  }

  requestPlant(map) {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    if (this.isPlantRequested) {
      console.log(this.isPlantRequested);
      let sortPlants = this.distances.sort((a, b) => a - b);
      let nearestPlant = sortPlants[0].toFixed(2);
      this.plantMarkers.forEach(plantMkr => {
        plantMkr.setMap(null);
        if (nearestPlant === this.findDistance(this.marker, plantMkr).toFixed(2)) {
          console.log(plantMkr);
          //let nearestPlant = new google.maps.LatLng(plantMkr.position.lat(), plantMkr.position.lng());
          //this.plantMarker.setPosition(nearestPlant);
          this.plantMarkers.push(plantMkr);
          this.plantMarker.setMap(this.map);
          this.plantMarker = new google.maps.Marker({
            position: plantMkr.getPosition(),
            map: map,
            icon: '../../../assets/plant.png'
          });
          //directionsRenderer.setMap(map);
          //this.calculateAndDisplayRoute(directionsService, directionsRenderer, plantMkr);
          //this.simulate.simulateRoute(this.marker.getPosition(), this.plantMarker.getPosition());
          console.log(this.plantMarkers);
          this.router.navigateByUrl('home');
          return plantMkr;
        }
      });
    }
  }

  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    plant: google.maps.Marker
  ) {
    console.log(new google.maps.LatLng(this.marker.getPosition()));
    console.log(new google.maps.LatLng(plant.getPosition()));
    directionsService
      .route({
        origin: new google.maps.LatLng(this.marker.getPosition()),
        destination: new google.maps.LatLng(plant.getPosition()),
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => {
        console.log(e);
        //window.alert("Directions request failed due to " + e)
      });
  }

  findDistance(mk1, mk2) {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    const rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians

    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d
  }

  // directionService(): void {
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   directionsRenderer.setMap(this.map);

  //   const onChangeHandler = function () {
  //     calculateAndDisplayRoute(directionsService, directionsRenderer);
  //   };

  //   (document.getElementById("start") as HTMLElement).addEventListener(
  //     "change",
  //     onChangeHandler
  //   );
  //   (document.getElementById("end") as HTMLElement).addEventListener(
  //     "change",
  //     onChangeHandler
  //   );
  // }

}