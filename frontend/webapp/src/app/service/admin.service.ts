import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  http= inject(HttpClient);
  router=inject(Router);
  constructor() { }

getAdmins(){
return this.http.get('http://localhost:8800/api/admins');
}
approveOrder(id:string){
return this.http.post(`http://localhost:8800/api/admin/approve/`+id,id)
}
getUserOrdersUnderAdmin():Observable<Order[]>{
return this.http.get<Order[]>('http://localhost:8800/api/admin/orders')
}
updateOrderStatus(orderId: string, status: 'approved' | 'rejected') {
  return this.http.put<Order>(`http://localhost:8800/api/admin/status/`+orderId, { status });
}

}
