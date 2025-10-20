import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
http= inject(HttpClient)
orders: any=[]
  constructor() { }

  ngOnInit() {
    this.http.get('/api/admin/orders').subscribe((orders) => {
      this.orders = orders;
    });
  }
  
  approve(orderId: string) {
    this.http.put(`/api/admin/approve/${orderId}`, {}).subscribe(() => {
      alert('Order approved!');
      this.ngOnInit();
    });
  }
  

}
