import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private seller:SellerService, private router:Router){}

  display = false;
  authError:string='';

  userData:any;

  signUp(){
    this.display=false;
  }

  login(){
    this.display=true;
  }

  signUpForm = new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })

  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })


  get control(){
  return this.signUpForm.controls
  }
  
  get controls(){
    return this.loginForm.controls
  }

  ngOnInit():void{
    this.seller.reloadSeller();
  }


  signUpUser(data:any){
    console.log(data);
    this.seller.userSignUp(data);
    // this.router.navigate(['seller']);
  }

  loginUser(data:any){
    this.authError='';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is Not Correct";
      }
    })
  }

}
