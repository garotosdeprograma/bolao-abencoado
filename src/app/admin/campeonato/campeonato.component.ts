import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { showError } from '../../utils/showError';
import { Campeonato } from '../../models/campeonato';
import { Pagination } from '../../models/pagination';
import { CampeonatoService } from './campeonato.service';
declare const jQuery;

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
  public pagination: Pagination = new Pagination();

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
  }

  ngOnInit() {
    this.setPage();
  }

  setPage(pageInfo = {offset: 0}) {
    this.filter.page = pageInfo.offset + 1;
    this.getCampeonatos();
  }

  private getCampeonatos(): Promise<any> {
    return this.service.getCampeonatos(this.filter)
    .then(result => {
      this.pagination.count = result.total;
      this.pagination.offset = result.current_page - 1;
      this.pagination.limit = result.per_page;
      this.rows = result.data;
      this.loadingIndicator = false;
    })
    .catch(err => {
      showError(err, this.toastr);
    });
  }

  public buscar() {
    this.filter.page = 1;
    this.getCampeonatos();
  }


  public edit(campeonato) {
    this.campeonato = campeonato;
  }

  public novo() {
    this.campeonato = new Campeonato();
  }

  public submit() {
    if (this.campeonato.id != null) {
      this.update();
    } else {
      this.save();
    }
  }

  public update() {
    this.service.update(this.campeonato)
      .then(result => {
        this.toastr.success('Campeonato editado com sucesso.');
        return this.getCampeonatos();
      })
      .then(result => jQuery('#modal-campeonato').modal('hide'))
      .catch(err => {
        showError(err, this.toastr);
      });
  }

  public save() {
    const logo = 'assets/campeonatos/' + this.campeonato.nome + '';
    this.campeonato.logo = logo;
    this.service.saveCampeonato(this.campeonato)
      .then(result => {
        this.toastr.success('Campeonato salvo com sucesso.');
        return this.getCampeonatos();
      })
      .then(result => jQuery('#modal-campeonato').modal('hide'))
      .catch(err => {
        showError(err, this.toastr);
      });
  }

}
