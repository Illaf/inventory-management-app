import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './interceptors/auth-guard';
import { adminAuthGuard } from './interceptors/admin-auth-guard';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { OrderComponent } from './components/order/order.component';
import { LayoutComponent } from './admin/layout/layout.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    component: LayoutComponent, // layout that holds sidebar + router-outlet
    children: [
      { path: 'dashboard', component: AdmindashboardComponent },
      {
        path:"admin/products",
        component: ProductsComponent,
         canActivate:[AuthGuard]
      },
      {
        path:"admin/dashboard",
        component: AdmindashboardComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"admin/categories",
        component: CategoriesComponent,
        canActivate:[AuthGuard]
      },
     
     // { path: 'orders', component: ManageOrdersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path:"admin/categories/add",
    component: CategoryFormComponent,
     canActivate:[AuthGuard]
  },
  {
    path:"admin/categories/:id",
    component: CategoryFormComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"admin/products",
    component: ProductsComponent,
     canActivate:[AuthGuard]
  },
  {
    path:"admin/products/add",
    component: ProductFormComponent,
     canActivate:[AuthGuard]
  },
  {
    path:"admin/products/:id",
    component: ProductFormComponent,
    canActivate:[AuthGuard]
  },
  { path: 'product/:id', component: ProductDetailComponent } ,

  {
    path:"productlist",
    component: ProductlistComponent,
    canActivate:[AuthGuard],
    
  },
  {
    path: 'auth',
    children: [
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path:"auth/login",
    component: LoginComponent
  },
  {
    path:"cart",
    component: CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"orders",
    component: OrderComponent,
     canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
