import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.page.html',
  styleUrls: ['./otp-validation.page.scss'],
})
export class OtpValidationPage implements OnInit {
  public otp: string = '';

  constructor() { }

  ngOnInit() {
  }

  onOtpChange(otpNo) {
    this.otp = otpNo;
    console.log(this.otp);
  }

}
