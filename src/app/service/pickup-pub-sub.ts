import {Injectable} from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PickupPubSub {
  
  public pickup$: Observable<any>;
  private _observer: Observer<any>;
  
  public EVENTS = {
    PICKUP: 'pickup',
    DROPOFF: 'dropoff',
    ARRIVAL_TIME: 'arrival-time'
  };

  constructor() {
    this.pickup$ = new Observable<any>(observer => {
      this._observer = observer;
    }).pipe(share()); // share() allows multiple subscribers
  }
  
  watch() {
    return this.pickup$;
  }
  
  emitArrivalTime(time) {
    this._observer.next({
      event: this.EVENTS.ARRIVAL_TIME,
      data: time
    })
  }
  
  emitPickUp() {
    this._observer.next({
      event: this.EVENTS.PICKUP,
      data: null
    })
  }
  
  emitDropOff() {
    this._observer.next({
      event: this.EVENTS.DROPOFF,
      data: null
    })
  }

}

