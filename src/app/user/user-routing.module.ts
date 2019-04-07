import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserResolverService } from './user-resolver.service';
import { PostsComponent } from './posts/posts.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CommentsComponent } from './comments/comments.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    resolve: { userBase: UserResolverService},
    children: [
          {
            path: '',
            redirectTo: 'about',
            pathMatch: 'full'
          },
          {
            path: 'posts',
            component: PostsComponent,
          },
          {
            path: 'favorites',
            component: FavoritesComponent,
          },
          {
            path: 'comments',
            component: CommentsComponent,
          },
          {
            path: 'about',
            component: AboutComponent,
          },
          {
            path: '**',
            redirectTo: 'about',
            pathMatch: 'full'
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
