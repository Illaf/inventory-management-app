import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {
http= inject(HttpClient)
  constructor() { }
  getProductForList(options: {
    searchTerm?: string;
    categoryId?: string;
    sortBy?: string;
    sortOrder?: number;
    page?: number;
    pageSize?: number;
  }) {
    let params = new HttpParams();
  
    if (options.searchTerm) params = params.set('searchTerm', options.searchTerm);
    if (options.categoryId) params = params.set('categoryId', options.categoryId);
    if (options.sortBy) params = params.set('sortBy', options.sortBy);
    if (options.sortOrder !== undefined) params = params.set('sortOrder', options.sortOrder);
    if (options.page !== undefined) params = params.set('page', options.page);
    if (options.pageSize !== undefined) params = params.set('pageSize', options.pageSize);
  
    return this.http.get<Product[]>('http://localhost:8800/api/product/productlist', { params });
  }
}
