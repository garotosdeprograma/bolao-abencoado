import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { URL_API } from '../../constant/api';
import { EquipeService } from './equipe.service';
import { Equipe } from '../../models/equipe';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../models/pagination';
declare const jQuery;

import { infoEscudo } from '../../../assets/data/escudos';
import { element } from 'protractor';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {
  
  @ViewChild('botaoEscolherEscudo') BotaoEscolherEscudo: ElementRef;
  @ViewChild('divEscudos') DivEscudos: ElementRef;
  
  public escudos: any[];
  url: String;

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  filter: any = {};
  equipes: Equipe[];
  pagination: Pagination;
  public equipe: Equipe;
  
  constructor(private service: EquipeService, private toastr: ToastrService) {
    this.url = '';
    this.equipe = new Equipe();
    this.loadingIndicator = true;
    this.reorderable = true;
    this.equipes = [];
    this.pagination = new Pagination();
    this.escudos = infoEscudo;
  }

  setPage(pageInfo = { offset: 0 }) {
    this.filter.page = pageInfo.offset + 1;
    this.getEquipes();
  }

  ngOnInit() {
    this.setPage();
  }

  getEquipes() {
    this.service.getEquipes(this.filter || { page: 1 })
      .then(result => {
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

  public buscar() {
    this.filter.page = 1;
    this.getEquipes();
  }

  public edit(equipe) {
    this.equipe = equipe;
  }

  public novo() {
    this.equipe = new Equipe();
  }

  public submit() {
    if (this.equipe.id != null) {
      this.update();
    } else {
      this.save();
    }
  }

  public update() {
    this.service.update(this.equipe)
      .then(result => {
        this.toastr.success('Equipe editada com sucesso!');
        return this.getEquipes();
      })
      .then(result => jQuery('#modal-equipe').modal('hide'))
      .catch(err => {
        showError(err, this.toastr);
      });
  }

  public save() {
    // this.equipe.logo = url;
    this.service.saveEquipe(this.equipe)
      .then(result => {
        this.toastr.success('Equipe salva com sucesso!');
        return this.getEquipes();
      })
      .then(result => jQuery('#modal-equipe').modal('hide'))
      .catch(err => {
        showError(err, this.toastr);
      });
  }

  escolherEscudo() {
    this.BotaoEscolherEscudo.nativeElement.style.display = 'none';
    this.DivEscudos.nativeElement.style.display = 'block';
  }

  selecionarEscudo(url) {
    this.url = url;
    (<HTMLImageElement>document.getElementById('escudo-equipe')).src = url;
    this.BotaoEscolherEscudo.nativeElement.style.display = 'block';
    this.DivEscudos.nativeElement.style.display = 'none';
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
