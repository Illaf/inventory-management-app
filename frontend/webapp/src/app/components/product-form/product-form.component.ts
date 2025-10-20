import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { Product } from 'src/app/types/product';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { CategoriesService } from 'src/app/service/categories.service';
@Component({
  selector: 'app-product-form',
  standalone:true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports:[FormsModule, MatInputModule,ReactiveFormsModule,CommonModule,MatFormFieldModule,NgFor]
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  products: Product[] = [];
  isEditing = false;
  editingId: string | null = null;
  productService= inject(ProductsService);
  categoryService= inject(CategoriesService)
  route= inject(ActivatedRoute)
  categories:any[]= [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
    this.editingId= this.route.snapshot.params["id"]
    this.categoryService.getCategories().subscribe({
      
        next: (res: any) => {
          this.categories = res.categories; // adjust based on your API response
        },
        error: (err) => {
          console.error('Failed to load categories', err);
        }
      
    })
    if(this.editingId){
      this.isEditing=true
      this.productService.getProductById(this.editingId).subscribe((result: any) => {
        console.log(result.product)
        const product = result.product;  
      //console.log('productp;',product)
        if (!product) return; // safeguard
      
        this.productForm.patchValue({
          name: product.name ?? '',
          categoryId: product.categoryId ?? '',
          description: product.description ?? '',
          price: product.price ?? 0,
          stock: product.stock ?? 0,
          supplierId: product.supplierId ?? ''
        });
      
        const imageControls = product.images?.map((img: string) => this.fb.control(img)) || [];
        this.productForm.setControl('images', this.fb.array(imageControls));
        //console.log(this.productForm.value)
      });
      
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: [''],
      images: this.fb.array([]),
      stock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      supplierId: ['', Validators.required],
    });
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  addImage(url: string = '') {
    this.images.push(this.fb.control(url));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => (this.products = data));
  }

  onSubmit(): void {
    console.log('on submi =t triggered')
    Object.keys(this.productForm.controls).forEach(controlName => {
      const control = this.productForm.get(controlName);
  
      if (control && control.invalid) {
        console.log(`❌ Control "${controlName}" is invalid.`);
        console.log('Errors:', control.errors);
      }
    });
    if (this.productForm.invalid) return;
    console.log(this.productForm.status)
    const product: Product = this.productForm.value;

    if (this.isEditing && this.editingId) {
      this.productService.editProduct(this.editingId, product).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    } else {
      this.productService.addProduct(product).subscribe(() => {
        alert("product added")
        this.loadProducts();
        this.resetForm();
      });
    }
  }


  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  resetForm(): void {
    this.productForm.reset();
    this.images.clear();
    this.isEditing = false;
    this.editingId = null;
  }
}
