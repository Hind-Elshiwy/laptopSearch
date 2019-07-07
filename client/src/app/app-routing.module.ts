import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { SignGuard } from './auth/sign.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent, canActivate: [SignGuard] }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent, canActivate: [SignGuard] }]
  },

  {
    path: 'products',component:ProductsComponent
  },
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  },
  {
    path: 'invalid', component: NotAuthorizedComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
