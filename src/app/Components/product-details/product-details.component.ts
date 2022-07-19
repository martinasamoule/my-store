import { IProduct } from './../../Models/iproduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIProductServService } from 'src/app/Services/apiproduct-serv.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  Product : IProduct | null = null ;
  WantedProductId : number = 0 ;
  AllProducts: IProduct[] = [] ;
  constructor( private ActivatedRoute: ActivatedRoute
            , private Router: Router ,private APIProducts : APIProductServService) 
  {

  }

  ngOnInit(): void {
    this.APIProducts.GetAllProducts().subscribe
    (
      products=>this.AllProducts=products 
    )
    this.ActivatedRoute.paramMap.subscribe(parmMap=>
      {
        this.WantedProductId = Number(parmMap.get('ID')) ;
        this.APIProducts.GetProductById(this.WantedProductId).subscribe
        (
          product=>this.Product=product 
        )
      })
  }

  Back()
  {
    this.Router.navigate(['/Products']);
  }

  Previous()
  {
    let CurrentIndex = this.AllProducts.findIndex(product=>product.id==this.WantedProductId);
    let PrevProductID ;
    if(CurrentIndex > 0)
    {
      PrevProductID = this.AllProducts[CurrentIndex-1].id;
      this.Router.navigate(['/Products', PrevProductID]);
    }
  }

  Next()
  {
    let CurrentIndex = this.AllProducts.findIndex(product=>product.id==this.WantedProductId);
    let NextProductID ;
    if(CurrentIndex < this.AllProducts.length)
    {
      NextProductID = this.AllProducts[CurrentIndex+1].id;
      this.Router.navigate(['/Products', NextProductID]);
    }
    
  }

}
