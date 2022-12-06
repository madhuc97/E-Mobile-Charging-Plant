import { LocationStrategy } from '@angular/common';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.page.html',
  styleUrls: ['./otp-validation.page.scss'],
})
export class OtpValidationPage implements OnInit, OnChanges {
  public otp: string = '';

  constructor(private locationStrategy: LocationStrategy) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.preventBackButton();
  }

  ngOnInit() {
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  onOtpChange(otpNo) {
    this.otp = otpNo;
    console.log(this.otp);
  }

}
