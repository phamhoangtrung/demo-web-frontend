import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup
  constructor(
    readonly fb: FormBuilder,
    public authService: AuthService,
    readonly dialogRef: MatDialogRef<LoginFormComponent>,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }
    );
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      if(this.router.url === '/signup'){
        this.router.navigateByUrl('')
      }
      // console.log(this.router.url === '/signup');
      
      this.dialogRef.close();
    });
  }

  signup() {
    const { email, password } = this.loginForm.value
    this.authService.signup(email, password).then(() => {
      this.dialogRef.close();
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value
      this.authService.login(email, password)
        .then(() => {
          if(this.router.url === '/signup'){
            this.router.navigateByUrl('')
          }
          this.dialogRef.close();
        })
        .catch(err => {
          this.loginForm.setErrors({
            error: "Incorrect email or password"
          })
        });
    }
  }

  ngOnInit(): void { }
}
