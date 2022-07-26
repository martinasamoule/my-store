import { CartVM } from './../ViewModules/cart-vm';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductStaticServService {

  CartProducts: CartVM[] = [];
  CartAddedElement : CartVM [] = [] ;

  constructor() { 
  }
  
  AddToCart( Price: number, Name: string, Count: any , Id:number ) :CartVM [] {

      let Found =this.CartProducts.find(Product=>Product.ProductId==Id)
      if(Found)
      {
        this.CartProducts.map(product=>
          {
            if(product.ProductId==Id)
            {
              product.CountOfProd += +Count ;
            }
          })
      }
      else
      {
        this.CartProducts.push({
        ProductName: Name,
        CountOfProd: +Count,
        PriceOfProd: Price,
        ProductId:Id
      });
      }
     
    
     return this.CartProducts ;
  }

  RecievedAddedToCart(): CartVM[]
  {
    if(this.CartAddedElement.length!=0)
    { 
      this.CartProducts = this.CartAddedElement ;
    }
    return this.CartProducts ;
  }
}
