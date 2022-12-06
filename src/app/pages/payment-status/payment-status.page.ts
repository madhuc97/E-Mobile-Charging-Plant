import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.page.html',
  styleUrls: ['./payment-status.page.scss'],
})
export class PaymentStatusPage implements OnInit, OnDestroy {
  public paymentState: Subscription = new Subscription();
  public paymentStatus: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private plantService: PlantService,
    private nav: NavController) { 
    console.log(this.paymentStatus);
    
  }

  ngOnInit() {
    this.paymentDetails();
  }

  paymentDetails() {
    let id: any;
    this.route.params.subscribe(pid => id = pid.id);
    this.paymentState =  interval(30 * 1000)
      .pipe(
        mergeMap(() => this.plantService.goToHome(id)),
      )
      .subscribe(data => {
        if (data.body.data.payment.paid == true) {
          this.paymentStatus = true;
          console.log(data.body.data.payment.paid);
        }
      });
      return this.paymentState;
  }

  pushToNextScreenWithParams(params: any = true) {
    this.nav.navigateForward('/home', { state: params });
  }

  done(): void {
    this.plantService.setIsPlantBookked(true);
  }

  ngOnDestroy() {
    this.paymentState.unsubscribe();
  }

}
