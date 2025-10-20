import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriesService } from 'src/app/service/categories.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone:true,
  templateUrl: './categories.component.html',
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,RouterModule],
  styleUrls: ['./categories.component.css'],
  
})
export class CategoriesComponent implements AfterViewInit {
  categoryService= inject(CategoriesService);
  displayedColumns: string[] = [ 'name', 'description','actions'];
  dataSource = new MatTableDataSource<Object>([] as any);

  
  constructor() {
 }
  ngOnInit(){
    this.categoryService.getCategories().subscribe((result:any) =>{
      console.log(result)
      this.dataSource.data=result.categories
    })
  }

   @ViewChild(MatPaginator) paginator!: MatPaginator;
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }
   delete(id:string){
this.categoryService.deleteCategory(id).subscribe((result:any)=>{
  console.log(result);
})
   }
  }
  