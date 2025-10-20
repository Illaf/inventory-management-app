import { CommonModule } from '@angular/common';
import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/service/categories.service';
@Component({
  selector: 'app-category-form',
  standalone:true,
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  imports:[FormsModule, MatInputModule,ReactiveFormsModule,CommonModule]
})
export class CategoryFormComponent implements OnInit {
  categoryForm!:FormGroup;
name:string | undefined;
description!:string;
categoryService= inject(CategoriesService)
isEditing:boolean=false;
route= inject(ActivatedRoute)
id!:string;
constructor(private fb: FormBuilder) {
  
  this.categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });
}

  ngOnInit(): void {
    
      this.id= this.route.snapshot.params["id"]
    if(this.id){
      this.isEditing=true
      this.categoryService.getCategoryById(this.id).subscribe((result:any)=>{
        this.categoryForm.patchValue({
          name: result.category.name,
          description: result.category.description
        });
        console.log(result);
      })
    }
  }


onSubmit(){
  console.log("Submit clicked!");
  console.log(this.categoryForm.status)
  if(this.categoryForm.valid){
    
      this.categoryService.addCategory(this.categoryForm.value).subscribe({
        next: (res) => {
          alert("Category added")
          console.log('Category added:', res);
          // navigate or show success message
        },
        error: (err) => {
          console.error('Error adding category:', err);
        }
      })
    
  }
}
update(){
  if(this.categoryForm.valid){
    
    this.categoryService.editCategory(this.id,this.categoryForm.value).subscribe({
      next: (res) => {
        console.log('Category updated:', res);
        // navigate or show success message
      },
      error: (err) => {
        console.error('Error updating category:', err);
      }
    })
  
}
}
}
