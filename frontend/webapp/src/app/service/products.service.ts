import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  http= inject(HttpClient);
  constructor() { }
  getProducts(){
    return this.http.get<Product[]>('http://localhost:8800/api/product/get')
  }
getProductById(id: string) {
  return this.http.get<{ success: boolean; message: string; product: any }>(
    'http://localhost:8800/api/product/' + id
  );
}

  addProduct(product:Object){
    return this.http.post("http://localhost:8800/api/product/add", product)
  }
  editProduct(id:string,product:Object){
return this.http.put("http://localhost:8800/api/product/"+id, product)
  }
  deleteProduct(id:string){
return this.http.delete("http://localhost:8800/api/product/"+id);
  }

}
