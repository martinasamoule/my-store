import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ProductsComponent } from './Components/Order/products/products.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/Order/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductItemComponent } from './Components/Order/product-item/product-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    FooterComponent,
    CartComponent,
    ProductDetailsComponent,
    NotFoundComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule ,
    HttpClientModule ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
