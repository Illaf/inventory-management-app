import { Component, OnInit,inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  router= inject(Router)
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigateByUrl("/auth/register")
  }
}
