import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { sellerAuthGuard } from './services/seller-auth.guard';
import { SellerHomeComponent } from './seller-home/seller-home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'seller',
    component:SellerComponent,
    canActivate:[sellerAuthGuard]
  },
  {
    path:'sellerHome',
    component:SellerHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
