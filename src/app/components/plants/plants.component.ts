import { Component, Input, OnInit } from '@angular/core';
import { Plant, PlantService,  } from 'src/app/service/plant.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss'],
})
export class PlantsComponent implements OnInit {
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  public plantMarkers: Array<google.maps.Marker> = [];
  public plantData: Plant[] = [];

  constructor(private plantService: PlantService) {
  }

  ngOnInit() {
    this.fetchAndRefreshCars();
  }

  addCarMarker(car: Plant) {
    let carMarker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: '../../../assets/plant.png'
    });
    carMarker.set('id', car.id);
    this.plantMarkers.push(carMarker);
    console.log(carMarker); 
  }

  updateCarMarker(car: Plant) {
    let numOfCars = this.plantMarkers.length;
    for (var i = 0;  i < numOfCars; i++) {
      // find car and update it
      if ((<any>this.plantMarkers[i]).id === car.id) {
        this.plantMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
        return;
      }
    }
    // car does not exist in carMarkers
    this.addCarMarker(car);
  }

  fetchAndRefreshCars() {
    this.plantService.getPlants()
      .subscribe(data => {
       this.plantData = data;
       console.log(this.plantData);
       this.plantData.forEach(plant => {
         this.updateCarMarker(plant);
       });
      })
  }

}
