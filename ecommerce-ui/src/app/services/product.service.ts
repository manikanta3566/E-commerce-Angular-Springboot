import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(data:any){
    return this.http.post(API_URLS.BASE_URL+API_URLS.SELLER_PRODUCT,data);
  }

  getProducts(pageNumber:number,pageSize:number){
    return this.http.get(`${API_URLS.BASE_URL}${API_URLS.SELLER_PRODUCT}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  deleteProduct(productId:string){
    return this.http.delete(`${API_URLS.BASE_URL}${API_URLS.SELLER_PRODUCT}/${productId}`);
  }

  updateProduct(productId:string,data:any){
    return this.http.put(`${API_URLS.BASE_URL}${API_URLS.SELLER_PRODUCT}/${productId}`,data);
  }
}
