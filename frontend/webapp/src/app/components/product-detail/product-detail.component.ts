import { Component, OnInit, inject } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { Product } from 'src/app/types/product';
import { ProductlistService } from 'src/app/service/productlist.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone:true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports:[ProductGridComponent,NgIf,NgFor]
})
export class ProductDetailComponent implements OnInit {
  productId!: string;
  product: any;
  similarProducts:Product[]=[];
  productService= inject(ProductsService)
  productListService= inject(ProductlistService);
  cartService=inject(CartService)
 result:any 

  constructor(
    private route: ActivatedRoute,
    //productService: ProductsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (res) => {
          console.log('API response:', res);
          this.product = res.product; // ✅ store the actual product object
        },
        error: (err) => console.error('Error fetching product:', err)
      });
    }
  }
  getProduct() {
    // this.productService.getProductById(this.productId).subscribe({
    //   next: (res: any) => {
    //     this.product = res.product;
    //     this.productListService.getProductForList('',this.product.categoryId,'',-1,1,3).subscribe(result =>{
    //       this.similarProducts=result;
    //     })
    //   },
    //   error: (err) => {
    //     console.error('Error fetching product details', err);
    //   }
    // });
  }

}
