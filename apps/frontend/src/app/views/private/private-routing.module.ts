import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateShellComponent } from './private-shell.component';
import { PrivatePath, USERNAME_PATH_PARAM_NAME } from './private-routes';
import { UserComponent } from './user/user.component';
import { MeComponent } from './me/me.component';
import { DatasetsComponent } from './datasets/datasets.component';
import { ConfigurationsComponent } from './configurations/configurations.component';

const routes: Routes = [
  {
    path: PrivatePath.base,
    component: PrivateShellComponent,
    children: [
      {
        path: PrivatePath.base,
        redirectTo: PrivatePath.me,
      },
      {
        path: PrivatePath.me,
        component: MeComponent,
      },
      {
        path: PrivatePath.datasets,
        component: DatasetsComponent,
      },
      {
        path: PrivatePath.configurations,
        component: ConfigurationsComponent,
      },
      {
        path: `${PrivatePath.user}/:${USERNAME_PATH_PARAM_NAME}`,
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
