import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { UserResolverService } from './user-resolver.service';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [
    UserService,
    UserResolverService
  ]
})
export class UserModule { }
