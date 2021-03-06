import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { RankingComponent } from './ranking/ranking.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { RodadaComponent } from './rodada/rodada.component';
import { ApostaComponent } from './aposta/aposta.component';
import { EquipeComponent } from './equipe/equipe.component';
import { FormsModule } from '@angular/forms';
import { CampeonatoService } from './campeonato/campeonato.service';
import { RodadaService } from './rodada/rodada.service';
import { JogoComponent } from './jogo/jogo.component';
import { EquipeService } from './equipe/equipe.service';
import { JogoService } from './jogo/jogo.service';
import { ApostaService } from './aposta/aposta.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgxDatatableModule
  ],
  declarations: [
    AdminComponent,
    MenuComponent,
    RankingComponent,
    CampeonatoComponent,
    RodadaComponent,
    ApostaComponent,
    EquipeComponent,
    JogoComponent
  ],
  providers: [  CampeonatoService,
                RodadaService,
                EquipeService,
                JogoService,
                ApostaService
            ]
})
export class AdminModule { }
