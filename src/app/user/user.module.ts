import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { UserResolverService } from './user-resolver.service';
import { AboutComponent } from './about/about.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CommentsComponent } from './comments/comments.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [UserComponent, AboutComponent, FavoritesComponent, CommentsComponent, PostsComponent],
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
