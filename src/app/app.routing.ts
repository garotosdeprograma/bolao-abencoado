import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AdminGuard]
  },
  {
    path: 'redirectToRoot',
    redirectTo: '/'
  },
  { path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
