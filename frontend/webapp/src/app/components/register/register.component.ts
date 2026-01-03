import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
@Component({
  selector: 'app-register',
  standalone:true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[FormsModule,MatInputModule,ReactiveFormsModule,CommonModule,RouterModule]
})
export class RegisterComponent implements OnInit {
registerForm!: FormGroup
formBuilder= inject(FormBuilder);
authService= inject(AuthService);
adminService = inject(AdminService);
router=inject(Router);
errorMessage: String | undefined;
admins:any =[];
submitted = false;


  constructor() { }

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe((data)=>{
console.log("data",data);
this.admins= data;
    })
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      admin: [null]
    },
    
  { validators: this.passwordMatchValidator });
    
  }
  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
  
  isRoleAdmin():boolean{
    return this.registerForm.get('role')?.value === 'user'
  }
  onSubmit() {
    this.submitted=true
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  
    const formData = this.registerForm.value;
  
    const payload: any = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };
  
    // only attach admin if role === user
    if (formData.role === 'user' && formData.admin) {
      payload.admin = formData.admin;
    }
  
    console.log('Payload:', payload);
  
    this.authService.registerUser(payload).subscribe({
      next: () => {
        alert('User Registered');
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
  
}
