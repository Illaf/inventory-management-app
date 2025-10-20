import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from 'src/app/service/cart.service';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoriesService } from 'src/app/service/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',

  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
cartService= inject(CartService)
categoryService= inject(CategoriesService)
router= inject(Router)
categories:any[]=[]
user : any;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user.name);
    this.categoryService.getCategories().subscribe({
      
      next: (res: any) => {
        this.categories = res.categories; // adjust based on your API response
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    
  })
  }
searchCategory(categoryId:string){
  console.log(categoryId)
  this.router.navigate(['/productlist', categoryId]);
}
}
