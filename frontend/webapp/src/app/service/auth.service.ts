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
    console.log("hello i am pressed")
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
  getUser(id:string){
    // console.log("id:",id)
    return this.http.post('http://localhost:8800/api/auth/user',{id},{
      headers:{'x-skip-interceptor':'true'}
    })
  }
  isLoggedIn(){
    const token= localStorage.getItem('token')
    console.log("token from isloggedin:",token)
    if(token) return true;
    return false;
  }
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigateByUrl("/auth/register")
  }
  updateProfile(data:any){
    return this.http.put(`http://localhost:8800/api/auth/profile`, data);
  }
}
