import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
http= inject(HttpClient);
router=inject(Router);
  constructor() { }
  registerUser(user:Object){
    return this.http.post('http://localhost:8800/api/auth/signup',user,{
      headers: { 'x-skip-interceptor': 'true' }
    })
  }
  loginUser(user:Object){
    return this.http.post('http://localhost:8800/api/auth/login',user,{
      headers:{'x-skip-interceptor':'true'}
    })
  }
  getAllUsers(){
    return this.http.get('http://localhost:8800/api/auth/users',{
      headers:{'x-skip-interceptor':'true'}
    });
}
  getUsername(){
    let user= localStorage.getItem('user');
    if(user){
      // console.log(JSON.parse(user).name)
      return JSON.parse(user).name;
    }
  }
  isLoggedIn(){
    const token= localStorage.getItem('token')
    if(token) return true;
    return false;
  }
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigateByUrl("/auth/register")
  }
}
