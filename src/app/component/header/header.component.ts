import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SearchService } from 'src/app/service/search/search.service';
import { ShoesService } from 'src/app/service/shoes/shoes.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private shoesService: ShoesService
  ) {}
  logout() {
    this.router.navigateByUrl('/');
    this.authService.logout();
  }
  ngOnInit(): void {}
  openDialog() {
    this.dialog.open(LoginFormComponent);
  }
  navigate() {
    this.router.navigateByUrl('/auth/signup');
  }

  searching(e) {
    this.searchService.searching(e.target.value)
  }
}
