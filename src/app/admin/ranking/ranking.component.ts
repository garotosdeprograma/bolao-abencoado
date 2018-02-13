import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { RodadaService } from '../rodada/rodada.service';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  limit: number;

  @ViewChild('tableWrapper') tableWrapper;
  listaRodada: any[];
  filter: any;
  ranking: any[];

  constructor(private rodadaService: RodadaService,
    private router: Router,
              private toastr: ToastrService) {
    this.filter = {};
    this.filter.ids = [];
    this.ranking = [];
    this.loadingIndicator = true;
    this.listaRodada = [];
    this.limit = 20;
  }

  ngOnInit() {
    this.getLastRodadas()
    .then(rodadas => {
        this.filter.idRodada = rodadas[rodadas.length - 1].id;
        return this.getRanking();
      })
      .catch(err => showError(err, this.toastr));
  }

  getRanking() {
    this.rodadaService.getRanking(this.filter)
      .then(result => {
        this.temp = [...result];
        this.rows = result;
        return this.loadingIndicator = false;
      })
      .catch(err => showError(err, this.toastr));
  }

  getLastRodadas() {
    return this.rodadaService.getLastRodadas(this.limit)
    .then(result => {
      return this.listaRodada = result.data;
    })
    .catch(err => {
      if (err.status) {
        this.router.navigate(['/']);
        this.toastr.error(err.getMessage());
      } else {
        showError(err, this.toastr);
      }
    });
  }

}
