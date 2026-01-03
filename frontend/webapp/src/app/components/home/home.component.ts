import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from 'src/app/service/cart.service';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoriesService } from 'src/app/service/categories.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/service/socket.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/types/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
cartService= inject(CartService)
categoryService= inject(CategoriesService)
private route = inject(ActivatedRoute)
router= inject(Router)
categories:any[]=[]
products:any[] =[]
selectedCategoryId: string | null = null;
user : any;
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {

    // ✅ 1. Load user FIRST
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  
    if (this.user) {
      // 🔌 2. Connect socket
      this.socketService.connect();
  
      // 🧾 3. Register user
      this.socketService.register(this.user._id, 'user');
  
      // 🔔 4. Listen for status updates
      this.socketService.onOrderStatusUpdate().subscribe(data => {
        alert(`Your order ${data.orderId} is now ${data.status}`);
      });
    }
  
    // 📦 Load categories
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.categories;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }
  
searchCategory(categoryId:string){
  console.log(categoryId)
  this.router.navigate(['/productlist', categoryId]);
}
selectCategory(categoryId: string) {
  this.selectedCategoryId = categoryId;
  // console.log(this.selectedCategoryId)
}
}
