import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicShellComponent } from './public-shell.component';
import { LoginComponent } from './login/login.component';
import { PublicPath } from './public-routes';

const routes: Routes = [
  {
    path: PublicPath.base,
    component: PublicShellComponent,
    children: [
      {
        path: PublicPath.login,
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
