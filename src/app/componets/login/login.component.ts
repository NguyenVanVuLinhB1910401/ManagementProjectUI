import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router, 
    private toast: NgToastService,
    private resetPasswordService: ResetPasswordService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
      //console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            //console.log(res);
            this.loginForm.reset();
            this.auth.storeAccessToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            this.auth.setUserLogin(res.accessToken);
            //const userPayload = this.auth.decodedToken();
            //this.toast.success({detail: "SUCCESS", summary: res.message, duration: 5000});
            
            //console.log(this.auth?.userLogin);
            
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            //console.log(err);
            this.toast.error({detail: "Thông báo", summary: err.error.message, duration: 5000, position: "topCenter"});
          }
        })
    }else{
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
  
  checkValidEmail(event: string){
    const value = event;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      
      this.resetPasswordService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: "Reset success!", duration: 5000});
          this.resetPasswordEmail = "";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
        },
        error: (err) => {
          this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 5000});
        }
      })
    }
  }

  
}
