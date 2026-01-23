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
    return this.http.get<Product[]>('https://inventory-management-app-37df.onrender.com/api/product/get')
  }
getProductById(id: string) {
  return this.http.get<{ success: boolean; message: string; product: any }>(
    'https://inventory-management-app-37df.onrender.com/api/product/' + id
  );
}

  addProduct(product:Object){
    return this.http.post("https://inventory-management-app-37df.onrender.com/api/product/add", product)
  }
  editProduct(id:string,product:Object){
return this.http.put("https://inventory-management-app-37df.onrender.com/api/product/"+id, product)
  }
  deleteProduct(id:string){
return this.http.delete("https://inventory-management-app-37df.onrender.com/api/product/"+id);
  }

}
