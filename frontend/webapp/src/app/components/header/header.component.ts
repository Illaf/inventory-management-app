import { Component, NgModule, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  authService= inject(AuthService);
  searchQuery: string = '';
  router= inject(Router)
  isAdmin:boolean=false;
  searchTerm:string='';
  constructor() { }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.isAdmin = user?.isAdmin || false;
    }
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
