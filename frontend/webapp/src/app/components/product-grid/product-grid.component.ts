import { NgFor,NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { Product } from 'src/app/types/product';
import {MatIconModule} from '@angular/material/icon';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/types/cartItem';

@Component({
  selector: 'app-product-grid',
  standalone:true,
  imports:[MatGridListModule,NgFor,NgIf,RouterModule,MatIconModule],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
productService= inject(ProductsService)
cartService= inject(CartService)
route= inject(ActivatedRoute)
  constructor() { }
products:Product[]= []
  ngOnInit(): void {
    this.productService.getProducts().subscribe((result:any) =>{
      console.log(result.products);
      this.products= result.products;
    })
    this.cartService.fetchCart();
  }


  addToCart(productId: string) {
    console.log("add cart triggered")
    alert("product added")
    this.cartService.addToCart(productId, 1).subscribe(() => {
      this.cartService.fetchCart(); // Refresh cart
    });
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.cartService.fetchCart(); // Refresh cart
    });
  }

  isInCart(productId: string): boolean {
    return this.cartService.items.some(item => item.product._id === productId);
  }
  getCartItemQuantity(productId: string): number {
    const item = this.cartService.items.find(
      (item) => item.product._id === productId
    );
    return item ? item.quantity : 0;
  }
  
  increaseQty(productId: string) {
    this.cartService.addToCart(productId, 1).subscribe(() => {
      this.cartService.fetchCart();
    });
  }
  
  decreaseQty(productId: string) {
    const item = this.cartService.items.find(
      (item) => item.product._id === productId
    );
  
    if (!item) return;
  
    if (item.quantity <= 1) {
      this.cartService.removeFromCart(productId).subscribe(() => {
        this.cartService.fetchCart();
      });
    } else {
      this.cartService.addToCart(productId, -1).subscribe(() => {
        this.cartService.fetchCart();
      });
    }
  }
  showProductDetails(product:Product){
    
  }
  
  }
  

