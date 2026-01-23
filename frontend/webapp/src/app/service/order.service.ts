import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'https://inventory-management-app-37df.onrender.com/api/order';
  orders: any[] = [];
  constructor(private http: HttpClient) {}

  placeOrder() {
    return this.http.post(`${this.baseUrl}/place`, {});
  }
  getMyOrders(){
    return this.http.get<any[]>(`https://inventory-management-app-37df.onrender.com/api/order/user`);
  }
}
