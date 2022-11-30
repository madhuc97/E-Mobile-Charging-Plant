import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/service/plant.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-description',
  templateUrl: './checkout-description.page.html',
  styleUrls: ['./checkout-description.page.scss'],
})
export class CheckoutDescriptionPage implements OnInit {
  public ratingRange = [1, 2, 3, 4, 5];
  public rating: string = '4';
  public checkoutUrl: string = '';
  constructor(private plantService: PlantService, private inAppBrower: InAppBrowser, private router: Router) { }

  ngOnInit() {
    //this.checkout();
    //console.log(this.checkoutUrl);
    
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
      if (res.body.status.status === 'SUCCESS') {
        this.checkoutUrl = res.body.data.redirect_url;

        setTimeout(() => {
          console.log(res.body.data.redirect_url);
          this.inAppBrower.create(res.body.data.redirect_url, '_self').show();
        }, 500);

        this.plantService.goToHome(res.body.data.id).subscribe(data => {
          if (data.body.data.payment.paid == true)
          this.router.navigateByUrl('/home');  
        });
      }
      return res;
    }, err => {
      console.log(err);
      
    })
    
  }

  goToCheckoutUrl() {
    console.log(this.checkoutUrl);
    
    setTimeout(() => {
      this.inAppBrower.create(this.checkoutUrl, '_self').show();
    }, 300);
  }

}
