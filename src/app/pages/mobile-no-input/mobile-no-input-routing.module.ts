import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileNoInputPage } from './mobile-no-input.page';

const routes: Routes = [
  {
    path: '',
    component: MobileNoInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileNoInputPageRoutingModule {}
