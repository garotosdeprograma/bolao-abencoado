import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { RankingComponent } from './ranking/ranking.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { RodadaComponent } from './rodada/rodada.component';
import { ApostaComponent } from './aposta/aposta.component';
import { EquipeComponent } from './equipe/equipe.component';
import { JogoComponent } from './jogo/jogo.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: RankingComponent },
      { path: 'ranking', component: RankingComponent },
      { path: 'campeonato', component: CampeonatoComponent },
      { path: 'rodada', component: RodadaComponent },
      { path: 'aposta', component: ApostaComponent },
      { path: 'equipe', component: EquipeComponent },
      { path: 'jogo', component: JogoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
