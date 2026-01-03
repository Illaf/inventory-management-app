import { NgFor,NgIf } from '@angular/common';
import { Component, OnInit, inject,OnChanges, Input } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { Product } from 'src/app/types/product';
import {MatIconModule} from '@angular/material/icon';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/types/cartItem';
import { ProductlistService } from 'src/app/service/productlist.service';

@Component({
  selector: 'app-product-grid',
  standalone:true,
  imports:[MatGridListModule,NgFor,NgIf,RouterModule,MatIconModule],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})

export class ProductGridComponent implements OnInit,OnChanges {
  @Input() categoryId: string | null = null;
productService= inject(ProductsService)
cartService= inject(CartService)
productListService = inject(ProductlistService)
route= inject(ActivatedRoute)

  constructor() { }
products:Product[]= []
  ngOnInit(): void {
    this.productService.getProducts().subscribe((result:any) =>{
      // console.log(result.products);
      this.products= result.products;
    })
    this.cartService.fetchCart();
  }
  ngOnChanges(): void {
    this.loadProducts(); // reload when category changes
  }
  loadProducts() {
    try {
      if (this.categoryId) {
        // console.log("this.categoryId",this.categoryId)
        // fetch category-wise products
        this.productListService.getProductForList({categoryId:this.categoryId?? undefined}).subscribe((res:any) =>{
          this.products=res
          // console.log("res products:",res.products)
        })
      } else {
        // fetch all products
        this.productService.getProducts().subscribe((res: any) => {
          this.products = res.products;
        });
      }
    } catch (error) {
      console.log("error from loadproducts in product-grid:",error)
    }
    
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
  

