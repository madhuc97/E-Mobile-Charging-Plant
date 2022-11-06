import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './mobile-no-input.page.html',
  styleUrls: ['./mobile-no-input.page.scss'],
})
export class MobileNoInputPage implements OnInit {
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
