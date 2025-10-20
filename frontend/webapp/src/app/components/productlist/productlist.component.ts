import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductlistService } from 'src/app/service/productlist.service';
import { ProductsService } from 'src/app/service/products.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  http = inject(HttpClient);
  productListService = inject(ProductlistService);

  products: Product[] = [];
  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = 'price';
  sortOrder: number = -1;
  page: number = 1;
  pageSize: number = 5;
  isNext = true;
  loading = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ✅ Listen for query params (searchTerm, sorting, etc.)
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('searchTerm') || '';
      this.categoryId = params.get('categoryId') || '';
      this.sortBy = params.get('sortBy') || 'price';
      this.sortOrder = params.has('sortOrder')
        ? Number(params.get('sortOrder'))
        : -1;

      // Load products based on these query params
      this.getProducts();
    });

    // ✅ Also handle route params (e.g., category route `/productlist/:id`)
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.categoryId = params['id'];
        this.getProducts();
      }
    });
  }

  getProducts(): void {
    this.loading = true;

    this.productListService
      .getProductForList({
        searchTerm: this.searchTerm,
        categoryId: this.categoryId,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
        page: this.page,
        pageSize: this.pageSize
      })
      .subscribe({
        next: (res: any) => {
          console.log('Filtered products:', res);
          this.products = res || [];
          this.loading = false;
        },
        error: (err) => {
          console.error('Error finding products:', err);
          this.loading = false;
        }
      });
  }

  setPage(page: number): void {
    this.page = page;
    this.isNext = true;
    this.getProducts();
  }
}