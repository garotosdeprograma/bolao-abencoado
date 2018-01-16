import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { RankingComponent } from './ranking/ranking.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { RodadaComponent } from './rodada/rodada.component';
import { ApostaComponent } from './aposta/aposta.component';
import { EquipeComponent } from './equipe/equipe.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
    AdminComponent,
    MenuComponent,
    AdministradorComponent,
    RankingComponent,
    CampeonatoComponent,
    RodadaComponent,
    ApostaComponent,
    EquipeComponent
  ]
})
export class AdminModule { }
