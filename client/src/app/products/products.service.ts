import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Product } from './product.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,private router: Router) { }

  getProducts(url="") {
    return this.http.get<Product[]>(environment.apiBaseUrl + '/products'+ url);
  }


}
