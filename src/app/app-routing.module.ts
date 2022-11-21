import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'mobile-no-input',
    loadChildren: () => import('./pages/mobile-no-input/mobile-no-input.module').then( m => m.MobileNoInputPageModule)
  },
  {
    path: 'otp-validation',
    loadChildren: () => import('./pages/otp-validation/otp-validation.module').then( m => m.OtpValidationPageModule)
  },
  {
    path: 'checkout-description',
    loadChildren: () => import('./pages/checkout-description/checkout-description.module').then( m => m.CheckoutDescriptionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
