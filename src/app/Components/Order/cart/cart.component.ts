import { IProduct } from './../../../Models/iproduct';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { ProductStaticServService } from 'src/app/Services/product-static-serv.service';
import { CartVM } from 'src/app/ViewModules/cart-vm';
import { Router } from '@angular/router';
import { APIProductServService } from 'src/app/Services/apiproduct-serv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  MyDate :Date ;
  TotalPrice : number ;
  ShowConfirm:boolean = false ;
  Showes: boolean = true;
  ConfirmForm:FormGroup;
  Categories: ICategory[];
  AddedCartProducts: CartVM[] = [];
  ProductList:IProduct[]=[];
  constructor(private ProductStaticServ : ProductStaticServService ,
    private APIProducts : APIProductServService, private FormBuild: FormBuilder ,private Router: Router) 
  { 
    this.MyDate = new Date();
    this.TotalPrice = 0;
    this.Categories = [
      { id: 1, name: 'Lab' },
      { id: 2, name: 'Mobile' },
    ];

    this.ConfirmForm = FormBuild.group({
      FullName: ['', [Validators.required, Validators.pattern('[A-Za-z /s]{3,}')]],
      Address: ['', [Validators.required , Validators.pattern('[A-Za-z0-9 /s]{6,}')]],
      CreditNumber : ['',[Validators.required,Validators.pattern('[0-9]{16}')]],
    });
  }
  ngOnInit(): void {
    this.AddedCartProducts = this.ProductStaticServ.RecievedAddedToCart();
    this.PutCartElements(this.AddedCartProducts);
    this.APIProducts.GetAllProducts().subscribe
    (
      data=>this.ProductList=data.Products
    )
  }
  get FullName() {
    return this.ConfirmForm.get('FullName');
  }

  get Address() {
    return this.ConfirmForm.get('Address');
  }

  get CreditNumber() {
    return this.ConfirmForm.get('CreditNumber');
  }
  
  Back()
  {
    this.Router.navigate(['/Products']);
  }

  PutCartElements(Products : any)
  {
    this.AddedCartProducts=Products ;
    for(let i =0 ; i< this.AddedCartProducts.length ; i++)
    {
      this.TotalPrice += this.AddedCartProducts[i].PriceOfProd*this.AddedCartProducts[i].CountOfProd ;
    }
  }


  RemoveProduct(Name: string)
  {
    this.AddedCartProducts = this.AddedCartProducts.filter((product)=>
    {
      return product.ProductName != Name;
    });
    this.TotalPrice=0 ;
    for(let i =0 ; i< this.AddedCartProducts.length ; i++)
    {
      this.TotalPrice += this.AddedCartProducts[i].PriceOfProd*this.AddedCartProducts[i].CountOfProd ;
    }
    this.ProductStaticServ.CartProducts =  this.AddedCartProducts.filter((product)=>
    {
      return product.ProductName != Name;
    });
  }

  ConfirmOrder()
  {
    // for(let i =0 ; i< this.ProductList.length ; i++)
    // {
     
    //   for(let j =0 ; j< this.AddedCartProducts.length ; j++)
    // {
    //   if(this.ProductList[i].id==this.AddedCartProducts[j].ProductId)
    //   { 
    //     if(this.ProductList[i].Quantity !=0)
    //     {
    //       this.ProductList[i].Quantity-=this.AddedCartProducts[j].CountOfProd ;
    //       this.AddedCartProducts[j].QuantityOfProd -= this.AddedCartProducts[j].CountOfProd ;
    //     }
    //   }
    //   // this.APIProducts.UpdateProduct(this.ProductList[i].id,this.ProductList[i]);
    // }
    // }
    this.Showes = false;
    this.AddedCartProducts=[];
    this.ProductStaticServ.CartProducts = [];
  }


  
 

}
