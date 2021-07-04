import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { IndexComponent } from './page/index/index.component';
import { PageErrorComponent } from './page/page-error/page-error.component';
import { PageLoginComponent } from './page/page-login/page-login.component';
import { PageSignupComponent } from './page/page-signup/page-signup.component';
import { ShoesDetailComponent } from './page/shoes-detail/shoes-detail.component';
import { AuthGuardGuard } from './service/auth-guard/auth-guard.guard';
import { InAuthGuardGuard } from './service/in-auth-guard/in-auth-guard.guard';

const routes: Routes = [{
  path: 'auth',
  component: DefaultLayoutComponent,
  children: [
    {
      path: "signin",
      component: PageLoginComponent,
    }, {
      path: "signup",
      component: PageSignupComponent,
    },
  ],
  canActivate: [InAuthGuardGuard]
}
  ,
{
  path: "admin",
  component: AdminLayoutComponent,
  children: [{
    path: '', component: IndexComponent
  }, {
    path: ':id', component: ShoesDetailComponent
  }],
  canActivate: [AuthGuardGuard]

},
{ path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
// {
//   path: "**",
//   component: PageErrorComponent,
// },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
