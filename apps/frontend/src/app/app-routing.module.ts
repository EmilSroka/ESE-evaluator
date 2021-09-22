import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './feature/auth/guards/login.guard';
import { LogoutGuard } from './feature/auth/guards/logout.guard';

export enum Path {
  public = '',
  private = 'dashboard',
}

const routes: Routes = [
  {
    path: Path.public,
    children: [
      {
        path: Path.public,
        loadChildren: () =>
          import('./views/public/public.module').then(m => m.PublicModule),
        canActivate: [LogoutGuard],
      },
      {
        path: Path.private,
        loadChildren: () =>
          import('./views/private/private.module').then(m => m.PrivateModule),
        canActivate: [LoginGuard],
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./views/not-found/not-found.module').then(m => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRotingModule {}
