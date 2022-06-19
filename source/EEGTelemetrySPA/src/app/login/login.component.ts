import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
              private adminService : AdminService ) { }

  loginForm: FormGroup ;
  isSubmitted  =  false;
  isLoginDetailsInvalid : boolean = false;

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get formControls() { 
    return this.loginForm.controls; 
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
     this.adminService.getLoginDetails(this.loginForm.value).subscribe(result => {
       if(result && result.adminRole == 'Technician'){
        this.router.navigateByUrl('/admin');
        this.isLoginDetailsInvalid = false;
       }
       else if(result && result.adminRole == 'Doctor'){
         this.router.navigateByUrl('/admin-doctor');
         this.isLoginDetailsInvalid = false;
       }
       else{
        this.isLoginDetailsInvalid = true;
        console.log("invalid login");
       }
       
     });
   
  }


}
