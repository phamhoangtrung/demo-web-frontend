import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { IndexComponent } from './page/index/index.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material/material.module';
import { FormModalComponent } from './component/form-modal/form-modal.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { PageLoginComponent } from './page/page-login/page-login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { PageSignupComponent } from './page/page-signup/page-signup.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ShoesDetailComponent } from './page/shoes-detail/shoes-detail.component';
import { PageErrorComponent } from './page/page-error/page-error.component';
import { ConfirmBoxComponent } from './component/confirm-box/confirm-box.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    FormModalComponent,
    LoginFormComponent,
    PageLoginComponent,
    AdminLayoutComponent,
    DefaultLayoutComponent,
    PageSignupComponent,
    NavbarComponent,
    ShoesDetailComponent,
    PageErrorComponent,
    ConfirmBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features=> dùng cho chức năng update
    ReactiveFormsModule, NoopAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }



