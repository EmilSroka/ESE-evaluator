import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      },
      {
        path: Path.private,
        loadChildren: () =>
          import('./views/private/private.module').then(m => m.PrivateModule),
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
