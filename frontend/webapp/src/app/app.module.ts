import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptors/token';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: [
    AppComponent,
    
    HomeComponent,
         HeaderComponent,
         FooterComponent,
         SearchFilterComponent,
         
         AdmindashboardComponent,
         ProductlistComponent,
         CartComponent,
         OrderComponent,
         AdminOrdersComponent,
         LayoutComponent,
         SidebarComponent,
         
         
        
  
    
  ],
  imports: [
    LoginComponent,
    RegisterComponent,
    ProductGridComponent,
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],

   bootstrap: [AppComponent]
})
export class AppModule { }
