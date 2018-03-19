import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing';
import { InicialComponent } from './inicial/inicial.component';
import { RodadaService } from '../admin/rodada/rodada.service';
import { ApostaService } from '../admin/aposta/aposta.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  declarations: [InicialComponent, AuthComponent],
  providers: [
    RodadaService,
    ApostaService
  ]
})
export class AuthModule { }
