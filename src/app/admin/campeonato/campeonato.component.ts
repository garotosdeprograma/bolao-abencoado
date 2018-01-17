import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { showError } from '../../utils/showError';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from './campeonato.service';

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.scss']
})
export class CampeonatoComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  public campeonato: Campeonato;
  public campeonatos: Campeonato[];
  public filter; any;

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor(private service: CampeonatoService, private toastr: ToastrService) {
    this.campeonato = new Campeonato();
    this.campeonatos = [];
    this.filter = {};
    this.loadingIndicator = true;
    this.reorderable = true;
  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', '../../assets/data/company.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  ngOnInit() {
    this.service.getCampeonatos(this.filter)
    .then(result => {
      this.rows = result.campeonatos;
      this.loadingIndicator = false;
    })
    .catch(err => {
      showError(err, this.toastr);
    });
  }

  public save() {
    const logo = 'assets/campeonatos/' + this.campeonato.nome + '';
    this.campeonato.logo = logo;
    this.service.saveCampeonato(this.campeonato)
    .then(campeonato => {
      this.campeonatos.unshift(campeonato);
    })
    .catch(err => {
      showError(err, this.toastr);
    });
  }

}
