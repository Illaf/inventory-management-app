import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private _items = new BehaviorSubject<any[]>([]);
  items$ = this._items.asObservable();
  cartItems:any = [];
  total = 0;
  orders:any[]=[]
  http= inject(HttpClient)
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cartService.fetchCart();
    this.cartService.items$.subscribe((items) => {
      this.cartItems = items;
      this.total = items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );
    });
   //this.loadCartItems()
  }
loadCartItems(){
  this.http.get<any>('/api/orders/user').subscribe((orders: any[]) => {
    this.orders = orders;

    // Highlight if approved & not notified
    const notify = orders.find(o => o.approved && !o.notified);
    if (notify) {
      alert('🎉 Your order has been approved!');
      this.http.put(`/api/orders/notify/${notify._id}`, {}).subscribe();
    }
  });
}
  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    this.orderService.placeOrder().subscribe({
      next: (res) => {
        alert('Order placed successfully!');
        this.cartService.fetchCart(); // empty cart
      },
      error: () => alert('Failed to place order')
    });
  }
  removeItemFromCart(productId: string) {
    console.log("clicked remove", productId);
    this.cartService.removeFromCart(productId);
    this.cartService.fetchCart()
  }
  clearCart(){
    console.log("clear cart")
    this.cartService.clearCart();
  }
}
