import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.page.html',
  styleUrls: ['./otp-validation.page.scss'],
})
export class OtpValidationPage implements OnInit {
  form: FormGroup;
  formValue = {phoneNumber: {}};

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      phoneNumber: new FormControl({
        value: this.formValue.phoneNumber,
        disabled: false
      })
    });
  }

  get phoneNumber() { return this.form.get('phoneNumber'); }

  onSubmit() {
    console.log(this.phoneNumber.value);
  }

}
