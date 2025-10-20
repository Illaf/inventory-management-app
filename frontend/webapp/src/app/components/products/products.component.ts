import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { Product } from 'src/app/types/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, RouterModule],
})
export class ProductsComponent implements OnInit {
  cartService= inject(CartService);
  productService = inject(ProductsService);
  displayedColumns: string[] = ['name', 'categoryId', 'description', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
productId!:string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result: any) => {
      console.log(result);
      this.dataSource.data = result.products ?? [];
      this.dataSource.paginator = this.paginator;
    });
  }
 

}
