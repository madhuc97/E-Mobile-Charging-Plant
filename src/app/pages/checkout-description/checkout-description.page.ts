import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/service/plant.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-checkout-description',
  templateUrl: './checkout-description.page.html',
  styleUrls: ['./checkout-description.page.scss'],
})
export class CheckoutDescriptionPage implements OnInit {
  public ratingRange = [1, 2, 3, 4, 5];
  public rating: string = '4';
  public checkoutUrl: string = '';
  constructor(private plantService: PlantService, private inAppBrower: InAppBrowser) { }

  ngOnInit() {
    this.checkout();
  }

  checkout() {
    const body = {
      amount:145,
      complete_payment_url:"http://example.com/complete",
      country:"SG",
      currency:"SGD",
      error_payment_url:"http://example.com/error",
      merchant_reference_id:"950ae8c6-78",
      cardholder_preferred_currency:true,
      language:"en",
      metadata:{
          "merchant_defined":true
      },
      payment_method_types_include:["sg_grabpay_ewallet"],
      expiration:"1671532380",
  };
    this.plantService.getCheckout(body).subscribe(res => {
      this.checkoutUrl = res.body.data.redirect_url;
      return res;
    }, err => {
      console.log(err);
      
    })
    
  }

  goToCheckoutUrl() {
    const browser = this.inAppBrower.create(this.checkoutUrl, '_self')
    //window.open(this.checkoutUrl, '_self');
  }

}
