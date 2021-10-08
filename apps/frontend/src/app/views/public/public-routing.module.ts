import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicShellComponent } from './public-shell.component';
import { LoginComponent } from './login/login.component';
import { PublicPath } from './public-routes';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: PublicPath.base,
    component: PublicShellComponent,
    children: [
      {
        path: PublicPath.login,
        component: LoginComponent,
      },
      {
        path: PublicPath.register,
        component: RegisterComponent,
      },
      {
        path: PublicPath.base,
        redirectTo: PublicPath.login,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
