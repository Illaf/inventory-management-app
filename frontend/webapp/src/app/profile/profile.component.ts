import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  admins: any[] = [];
  userRole!: string;
  loading = false;
  userId:string =""
  private authService = inject(AuthService)
  private adminService = inject(AdminService)
  constructor(private fb:FormBuilder) { 
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    this.userId = user._id
  }

  ngOnInit(): void {
    this.buildForm();
this.loadProfile();
this.loadAdmins();
  }
  buildForm() {
    this.profileForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
    address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    country: ['India'],
    pincode: ['', Validators.pattern(/^[0-9]{6}$/)]
    }),
    admin: ['']
    });
    }
    submit() {
      if (this.profileForm.invalid) return;
      this.loading = true;
      this.authService.updateProfile({userId:this.userId, ...this.profileForm.getRawValue()})
      .subscribe({
      next: () => {
      this.loading = false;
      alert('Profile updated successfully');
      },
      error: () => {
      this.loading = false;
      }
      });
      }
      loadAdmins() {
        this.adminService.getAdmins().subscribe((res: any) => {
        this.admins = res;
        });
        }
        loadProfile() {
          this.authService.getUser(this.userId).subscribe((res:any) => {
            console.log("userId",this.userId)
            console.log("res:",res)
            this.userRole = res.role;
          this.profileForm.patchValue({
          name: res.name,
          phone: res.phone,
          address: {
            street: res.address?.street || '',
            city: res.address?.city || '',
            state: res.address?.state || '',
            country: res.address?.country || 'India',
            pincode: res.address?.pincode || ''
          },
          admin: res.admin
          });
          if(this.userRole === 'admin')
          this.profileForm.get('admin')?.disable()
          })
          
}
}
