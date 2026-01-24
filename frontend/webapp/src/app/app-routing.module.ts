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
import { HeroComponent } from './hero/hero.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './admin/users/users.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

const routes: Routes = [

  /* ---------- PUBLIC ---------- */
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: HeroComponent },
  { path: 'how-it-works', component: HowItWorksComponent },

  /* ---------- AUTH ---------- */
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  /* ---------- USER ---------- */
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'productlist',
    component: ProductlistComponent,
    canActivate: [AuthGuard]
  },

  /* ---------- ADMIN (WITH LAYOUT) ---------- */
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }, // Added role requirement
    children: [
      { path: 'dashboard', component: AdmindashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: ProductFormComponent },
      { path: 'products/:id', component: ProductFormComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/add', component: CategoryFormComponent },
      { path: 'categories/:id', component: CategoryFormComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  /* ---------- FALLBACK ---------- */
  { path: '**', redirectTo: 'welcome' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
