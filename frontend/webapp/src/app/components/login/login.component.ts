
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule,MatInputModule,ReactiveFormsModule,CommonModule,RouterModule]
})
export class LoginComponent implements OnInit {
  errorMessage: String | undefined
  router= inject(Router)
  loginForm!: FormGroup
  formBuilder= inject(FormBuilder);
authService= inject(AuthService);
  constructor() { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.minLength(5)]],
      
    })
  }
  onSubmit(){
    if(this.loginForm.invalid) return;
  
    const formData: any= this.loginForm.value;
   
    console.log(formData);
  
    this.authService.loginUser(formData).subscribe({
      next: (result: any) => {
        alert("User logged in");
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        if(result.user.admin == null){
          this.router.navigateByUrl("/dashboard");
        }
        else this.router.navigateByUrl("/");
      },
      error: (err: any) => {
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error logging in user';
        }
      }
    });
    
  }


}
