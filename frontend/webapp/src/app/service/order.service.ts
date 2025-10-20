import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8800/api/order';

  constructor(private http: HttpClient) {}

  placeOrder() {
    return this.http.post(`${this.baseUrl}/place`, {});
  }
}
