import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
    this.authService.user$.subscribe(user => this.user = user)
  }
  ngOnInit(): void {
  }
  navigate(path) {
    this.router.navigateByUrl(`/auth/${path}`);
  }

}
