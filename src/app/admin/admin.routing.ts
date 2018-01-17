import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { RankingComponent } from './ranking/ranking.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { RodadaComponent } from './rodada/rodada.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'administrador', component: AdministradorComponent },
      { path: 'ranking', component: RankingComponent },
      { path: 'campeonato', component: CampeonatoComponent },
      { path: 'rodada', component: RodadaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
