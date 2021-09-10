import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicShellComponent } from './public-shell.component';

const routes: Routes = [
  {
    path: '',
    component: PublicShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
