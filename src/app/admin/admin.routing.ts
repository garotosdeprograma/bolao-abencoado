import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { AdministradorComponent } from './administrador/administrador.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent },      
      { path: 'administrador', component: AdministradorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
