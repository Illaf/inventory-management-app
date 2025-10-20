import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
@Component({
  selector: 'app-register',
  standalone:true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[FormsModule,MatInputModule,ReactiveFormsModule,CommonModule]
})
export class RegisterComponent implements OnInit {
registerForm!: FormGroup
formBuilder= inject(FormBuilder);
authService= inject(AuthService);
adminService = inject(AdminService);
router=inject(Router);
errorMessage: String | undefined;
admins:any =[];
  constructor() { }

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe((data)=>{
console.log("data",data);
this.admins= data;
    })
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      admin:['']
    })
  }
  isRoleAdmin():boolean{
    return this.registerForm.get('role')?.value === 'User'
  }
onSubmit(){
  if(this.registerForm.invalid) return;

  const formData: any= this.registerForm.value;
  const payload= {
    ...formData
    
  }
  console.log(payload);

   
    this.authService.registerUser(payload).subscribe({
      next: (result: any) => {
        alert("User Registered");
        this.router.navigateByUrl("/auth/login");
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      },
      error: (err: any) => {
        if (err.error?.message) {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage)
        } else {
          this.errorMessage = 'Error Registering the user';
        }
      }
    })
  
}
}
