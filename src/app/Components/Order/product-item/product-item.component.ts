import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductStaticServService } from 'src/app/Services/product-static-serv.service';
import { CartVM } from 'src/app/ViewModules/cart-vm';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit{
 @Input() ProductsList :  IProduct[] = [];
 @Output () AddedProductEvent : EventEmitter <object> = new EventEmitter <object>();
 CartProducts: CartVM[] = [];

  constructor(private ProductStaticServ : ProductStaticServService ) { }


  ngOnInit(): void {
  }
  
  SendProductDta(Quantity: number, Price: number, Name: string, Count: any , Id:number ) {
    this.AddedProductEvent.emit(
      {
        Quantity:Quantity ,
        Price:Price ,
        Name:Name ,
        Count:Count ,
        Id:Id
      });

  }
}
