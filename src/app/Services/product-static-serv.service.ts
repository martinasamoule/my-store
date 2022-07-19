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
  
  AddToCart(Quantity: number, Price: number, Name: string, Count: any , Id:number ) :CartVM [] {
    if (Quantity != 0 && Quantity>=Count && Count!=0) {
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
        QuantityOfProd: Quantity,
        ProductId:Id
      });
      }
     
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
