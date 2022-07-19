import { ICategory } from '../../../Models/icategory';
import { IProduct } from '../../../Models/iproduct';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CartVM } from 'src/app/ViewModules/cart-vm';
import { ProductStaticServService } from 'src/app/Services/product-static-serv.service';
import { APIProductServService } from 'src/app/Services/apiproduct-serv.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit  , OnDestroy{
  FilterProductList: IProduct[] = [];
  Categories: ICategory[];
  CartProducts: CartVM[] = [];
  AddedMessage:string =  "You item added sucessfully to cart .. " ;
  ShowMessage:boolean = false ;
  IntervalAds:any ;

  constructor( private ProductStaticServ : ProductStaticServService , private APIProducts : APIProductServService) {
    this.Categories = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Mobiles' },
      { id: 3, name: 'Bags' },
    ];
  }

  ngOnDestroy(): void {
    clearTimeout(this.IntervalAds);
  }

  ngOnInit(): void {
    this.APIProducts.GetAllProducts().subscribe
    (
      products=>this.FilterProductList = products 
    );
  }


  AddToCart(event:any) {
    this.CartProducts = this.ProductStaticServ.AddToCart(event.Quantity, event.Price, event.Name, event.Count , event.Id );
    this.ShowMessage = true ;
    this.IntervalAds = setTimeout(()=>{
     this.ShowMessage = false ;
   },3000);
  }

  FilterCategory(categoryid: any) {
    this.APIProducts.GetProductByCategoryId(+categoryid).subscribe
    (
      products=>this.FilterProductList = products 
    );
   
  }





}
