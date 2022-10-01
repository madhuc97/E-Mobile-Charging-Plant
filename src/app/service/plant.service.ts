import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Plant {
  id: number;
  coord: {
    lat: number,
    lng: number
  }
}

@Injectable({
  providedIn: 'root'
})

export class PlantService {
  public plants: Plant[] = [
    {
      id: 1,
      coord: {
        lat: 13.949798,
        lng: 75.576435
      }
    },
    {
      id: 2,
      coord: {
        lat: 13.934304,
        lng: 75.545169
      }
    },
    {
      id: 3,
      coord: {
        lat: 13.904304,
        lng: 75.545069
      }
    },
    {
      id: 4,
      coord: {
        lat: 13.914304,
        lng: 75.582969
      }
    }
  ];
  private carIndex: number = 0;

  constructor(
    
  ) { }

  getPlants(): Observable<Plant[]> {
    let plantData = this.plants;
    
    return Observable.create(
      observer => observer.next(plantData)
    );
  }

}
