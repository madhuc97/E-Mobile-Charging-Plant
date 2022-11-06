import { Component, OnInit } from '@angular/core';

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
