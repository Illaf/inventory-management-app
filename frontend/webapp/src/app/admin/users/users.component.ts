import { Component, OnInit,ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone:true,
  imports:[MatTableModule, MatPaginatorModule,MatButtonModule,RouterModule]
})
export class UsersComponent implements OnInit {
users:any[]=[]
displayedColumns: string[] = [ 'name', 'phone','address','isActive'];
  dataSource = new MatTableDataSource<Object>([] as any);
  constructor(private authService:AuthService) { }
admin:string|null =""
  ngOnInit(): void {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      const user = JSON.parse(userStr);
      this.admin = user._id; 
      console.log("this.admin =", user.name)
    }
  
    console.log("this.admin",this.admin)
this.authService.getAllUsers().subscribe((result:any) => {
  //console.log(result)
  this.dataSource.data=result.filter((user: { admin: string | null; }) => user.admin === this.admin)
  console.log(this.dataSource.data)
})
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
delete(id:string){

}
}
