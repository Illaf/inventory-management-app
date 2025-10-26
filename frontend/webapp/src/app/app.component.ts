import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn=false;
  authService= inject(AuthService)
  title = 'webapp';
  constructor(public router: Router){
    this.isLoggedIn= this.authService.isLoggedIn()
  }
}
