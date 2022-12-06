import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  public baseUrl: string = 'http://localhost:3000';
  public locationEnabled = new BehaviorSubject<boolean>(true);
  public isPlantBooked = new BehaviorSubject<boolean>(false);
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*'
    })
  };
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

  constructor(
    private http: HttpClient
  ) { }

  getPlants(): Observable<Plant[]> {
    let plantData = this.plants;
    return new Observable(
      observer => observer.next(plantData)
    );
  }

  getLocationEnabled(): Observable<boolean> {
    return this.locationEnabled;
  }

  setLocationEnabled(location) {
    return this.locationEnabled.next(location);
  }

  getIsPlantBookked(): Observable<boolean> {
    return this.isPlantBooked;
  }

  setIsPlantBookked(PlantBooked): void {
    return this.isPlantBooked.next(PlantBooked);
  }

  getCheckout(body): Observable<any> {
   return this.http.post(this.baseUrl + '/checkout', this.httpOptions, body).pipe(
    map(res => {
      return res;
   }), catchError(err => {
      return throwError(err) 
    
   }));
  }

  goToHome(id): Observable<any> {
    return this.http.get(this.baseUrl + '/retrievecheckout/' + id);
  }
}
