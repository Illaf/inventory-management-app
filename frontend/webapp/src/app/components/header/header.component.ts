import { Component, NgModule, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { json } from 'stream/consumers';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  authService= inject(AuthService);
  cartService = inject(CartService)
  searchQuery: string = '';
  router= inject(Router)
  isAdmin:boolean=false;
  searchTerm:string='';
  userId:string =""
  showCartCount:boolean = false;
  cartCount = 0;
  constructor() { }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.isAdmin = user?.isAdmin || false;
    }
    this.userId = JSON.parse(localStorage.getItem('user')  || '{}')
    this.cartService.fetchCart();
    if(this.cartService.items)
    this.showCartCount=true;
  this.cartService.items$.subscribe(items => {
    this.cartCount = items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  });
  }
  
onSearch(){
if(this.searchTerm){
  this.router.navigateByUrl("/productlist?searchTerm="+this.searchTerm)
}
this.searchTerm="";
}
logout(){
  this.authService.logOut();
  alert("User logged out")
}
}
