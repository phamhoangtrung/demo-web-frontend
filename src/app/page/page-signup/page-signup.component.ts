import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-signup.component.html',
  styleUrls: ['./page-signup.component.css']
})
export class PageSignupComponent implements OnInit {
  signupForm: FormGroup
  constructor(
    readonly fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  signup() {
    const { email, password, confirmPassword } = this.signupForm.value
    if (confirmPassword !== password) {
      this.signupForm.setErrors({
        error: "Confirmation password does not match"
      })
      return
    }
    this.authService.signup(email, password).then(() => {
      this.router.navigateByUrl('/admin')
    }).catch((e)=>{
      this.signupForm.setErrors({
        error: e.message 
      })
    });
  }

  ngOnInit(): void {
  }
}
