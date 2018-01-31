import { Component, OnInit } from '@angular/core';
import { URL_API } from '../../constant/api';
import { EquipeService } from './equipe.service';
import { Equipe } from '../../models/equipe';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../models/pagination';
declare const jQuery;

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  filter: any = {};
  equipes: Equipe[];
  pagination: Pagination;

  constructor(private service: EquipeService, private toastr: ToastrService) {
    this.loadingIndicator = true;
    this.reorderable = true;
    this.equipes = [];
    this.pagination = new Pagination();
  }

  setPage(pageInfo = {offset: 0}) {
    this.filter.page = pageInfo.offset + 1;
    this.getEquipes();
  }

  ngOnInit() {
    this.setPage();
  }

  getEquipes() {
    this.service.getEquipes(this.filter || {page: 1})
      .then(result => {
        console.log(result);
        this.pagination.count = result.total;
        this.pagination.offset = result.current_page - 1;
        this.pagination.limit = result.per_page;
        this.rows = result.data.map(equipe => {
          return {
            nome: equipe.nome,
            campeonato: equipe.campeonatos[0].nome
          };
        });
        this.loadingIndicator = false;
      })
      .catch(err => showError(err, this.toastr));
  }

  addInputCampeonato() {
    jQuery('<div class="col-sm-12 row p-0 m-0">' +
      '<div class= "form-group col-11 pl-0 ml-0">' +
      '<select class="form-control">' +
      '<option selected > Campeonato...</option>' +
      '<option value = "1" > Brasileiro Série A </option>' +
      '<option value = "2" > Brasileiro Série B </option>' +
      '<option value = "3" > UEFA < /option>' +
      '</select>' +
      '</div>' +
      '<div class="col-1 pl-0 ml-0">' +
      '<a class="btn btn-excluir" style="cursor:pointer;background-color:gray">' +
      '<i class="fa fa-trash" aria-hidden="true" style="color: #fff"></i>' +
      '</a>' +
      '</div>' +
      '</div>').appendTo(".input-campeonato");
    return false;
  }

  removeInputCampeonato() {
    // criar lógica
  }

}
