import { Component, OnInit } from '@angular/core';
import { URL_API } from '../../constant/api';
import { ApostaService } from './aposta.service';
import { Pagination } from '../../models/pagination';
import { RodadaService } from '../rodada/rodada.service';
import { showError, errorHandler } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aposta',
  templateUrl: './aposta.component.html',
  styleUrls: ['./aposta.component.scss']
})
export class ApostaComponent implements OnInit {

  filter: any;
  apostas: any[];
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean;
  listaRodada: any[];
  limit: number;

  constructor(private service: ApostaService,
              private toastr: ToastrService,
              private router: Router,
              private rodadaService: RodadaService) {
    this.filter = {};
    this.filter.ids = [];
    this.apostas = [];
    this.loadingIndicator = true;
    this.listaRodada = [];
    this.limit = 20;

  }

  ngOnInit() {
    this.getLastRodadas()
      .then(listRodada => {
        if (listRodada.length > 0) {
          this.filter.ids = listRodada[listRodada.length - 1].id;
          return this.getApostas();
        } else {
          return this.loadingIndicator = false;
        }
      })
      .catch(err => errorHandler(err, this.toastr, this.router));
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

  getApostas() {
    this.service.getApostas(this.filter)
      .then(result => {
        this.temp = [...result];
        this.rows = result;
        return this.loadingIndicator = false;
      })
      .catch(err => errorHandler(err, this.toastr, this.router));
  }

}
