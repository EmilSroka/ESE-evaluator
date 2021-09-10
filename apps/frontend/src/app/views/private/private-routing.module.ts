import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateShellComponent } from './private-shell.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
