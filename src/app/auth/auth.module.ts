import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing';
import { InicialComponent } from './inicial/inicial.component';
import { RodadaService } from '../admin/rodada/rodada.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [InicialComponent],
  providers: [ RodadaService ]
})
export class AuthModule { }