import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { AdministradorComponent } from './administrador/administrador.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    HomeComponent,
    AdminComponent,
    AdministradorComponent
  ]
})
export class AdminModule { }
