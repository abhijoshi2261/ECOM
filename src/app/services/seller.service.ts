import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { login, signUp } from '../dataTypes/dataType';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  static navigate(arg0: string[]) {
    throw new Error('Method not implemented.');
  }

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(data:signUp){
     this.http.post('http://localhost:3000/users',data,{observe:'response'}).subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller']);
    });
  }


  userLogin(data:login){
    this.http.get(`http://localhost:3000/users?email=${data.email} && password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller']);
      }
   });
 }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller']);
    }
    else{
      this.isLoginError.emit(true);
    }
  }



}
