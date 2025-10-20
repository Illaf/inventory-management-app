import { Injectable, inject } from '@angular/core';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../types/cartItem';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http= inject(HttpClient);
  
  private _items = new BehaviorSubject<CartItem[]>([]);
  public items$ = this._items.asObservable();
  private cartUrl = 'http://localhost:8800/api/cart';
  constructor() {}

  // Fetch cart from backend
  fetchCart(): void {
    this.http.get<any>(this.cartUrl).subscribe({
      next: (res) => {
        console.log("Fetched cart:", res);
        this._items.next(res.items || []); // 🔥 Triggers UI update
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
        this._items.next([]); // reset cart if failed
      },
    });
  }

  // Add a product
  addToCart(productId: string, quantity: number = 1): Observable<any> {
    console.log(`${this.cartUrl}/add/${productId}`)
    return this.http.post(`${this.cartUrl}/add/${productId}`, { quantity });
  }

  // Remove a product
  removeFromCart(productId: string): any {
    this.http.delete(`${this.cartUrl}/remove/${productId}`).subscribe({
      next: (res) => {
        console.log('Removed item from cart');
        this.fetchCart(); // 🔥 Refresh the cart after removal
      },
      error: (err) => console.error('Failed to remove item:', err)
    });
  }

  // Clear entire cart
  clearCart(): Observable<any> {
    return this.http.delete(`${this.cartUrl}/clear`);
  }

  // Expose current items
  get items(): CartItem[] {
    return this._items.value;
  }
}
