import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserResolverService } from './user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    resolve: { userBase: UserResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
