import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IProduct } from './../Models/iproduct';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartVM } from '../ViewModules/cart-vm';

@Injectable({
  providedIn: 'root'
})
export class APIProductServService {
  httpOption;

  constructor(private HTTPClient : HttpClient) 
  {
    this.httpOption = 
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(
      ()=>new Error('Error occured, please try again')
    )
  }

  GetAllProducts():Observable<IProduct[]>
  {
    return this.HTTPClient.get<IProduct[]>(`${environment.APIURL}/Products`)
  }

  GetProductById(ProductId:number ):Observable<IProduct>
  {
    return this.HTTPClient.get<IProduct>(`${environment.APIURL}/Products/${ProductId}`) 
  }

  GetProductByCategoryId(CategoryId:number ):Observable<IProduct[]>
  {
    if(CategoryId==0)
    {
      return this.HTTPClient.get<IProduct[]>(`${environment.APIURL}/Products`)
    }
    else
    {
      return this.HTTPClient.get<IProduct[]>(`${environment.APIURL}/Products?Categoryid=${CategoryId}`)
    }
    
  }


  UpdateProduct(ProductId:number , UpdatedProduct:IProduct)
  {
    return this.HTTPClient.patch
    (`${environment.APIURL}/Products/${ProductId}`, UpdatedProduct , this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


}