
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CartComponent } from './Components/Order/cart/cart.component';
import { ProductsComponent } from './Components/Order/products/products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

const routes: Routes = [
    {path: '', redirectTo :'/Products', pathMatch: 'full'},
    {path: 'Products', component: ProductsComponent},
    {path: 'Cart', component: CartComponent } ,
    {path: 'Products/:ID', component: ProductDetailsComponent} ,
    {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
