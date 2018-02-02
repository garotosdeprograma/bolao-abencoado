import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { URL_API } from '../../constant/api';
import { EquipeService } from './equipe.service';
import { Equipe } from '../../models/equipe';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../models/pagination';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../campeonato/campeonato.service';
declare const jQuery;


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
  campeonatos: Campeonato[];
  listaCampeonatos: number[];


  constructor(private service: EquipeService, private toastr: ToastrService,
              private campeonatoService: CampeonatoService) {
    this.url = '';
    this.equipe = new Equipe();
    this.loadingIndicator = true;
    this.reorderable = true;
    this.equipes = [];
    this.pagination = new Pagination();
    this.escudos = [];
    this.campeonatos = [];
    this.listaCampeonatos = [];
  }

  setPage(pageInfo = { offset: 0 }) {
    this.filter.page = pageInfo.offset + 1;
    this.getEquipes();
  }

  ngOnInit() {
    this.setPage();
    this.getEscudos();
    this.getCampeonatos();
  }

  getCampeonatos() {
    this.campeonatoService.getAllCampeonatos()
      .then(result => {
        console.log(result);
        this.campeonatos = result;
      })
      .catch(err => showError(err, this.toastr));
  }

  getEscudos() {
    return this.service.getEscudos()
      .then(escudos => {
        this.escudos = escudos;
      })
      .catch(err => showError(err, this.toastr));
  }

  getEquipes() {
    this.service.getEquipes(this.filter || { page: 1 })
      .then(result => {
        this.pagination.count = result.total;
        this.pagination.offset = result.current_page - 1;
        this.pagination.limit = result.per_page;
        this.rows = result.data;
        // .map(equipe => {
        //   return {
        //     nome: equipe.nome,
        //     campeonato: equipe.campeonatos[0].nome
        //   };
        // });
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
    this.equipe.campeonato = this.listaCampeonatos;
    console.log(this.equipe);
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
    this.equipe.logo = url;
    (<HTMLImageElement>document.getElementById('escudo-equipe')).src = this.equipe.logo;
    this.BotaoEscolherEscudo.nativeElement.style.display = 'block';
    this.DivEscudos.nativeElement.style.display = 'none';
  }

  newEquipe() {
    this.equipe = new Equipe();
  }

  // addInputCampeonato() {
  //   jQuery('<div class="col-sm-12 row p-0 m-0">' +
  //     '<div class= "form-group col-11 pl-0 ml-0">' +
  //     '<select class="form-control">' +
  //     '<option selected > Campeonato...</option>' +
  //     '<option value = "1" > Brasileiro Série A </option>' +
  //     '<option value = "2" > Brasileiro Série B </option>' +
  //     '<option value = "3" > UEFA < /option>' +
  //     '</select>' +
  //     '</div>' +
  //     '<div class="col-1 pl-0 ml-0">' +
  //     '<a class="btn btn-excluir" style="cursor:pointer;background-color:gray">' +
  //     '<i class="fa fa-trash" aria-hidden="true" style="color: #fff"></i>' +
  //     '</a>' +
  //     '</div>' +
  //     '</div>').appendTo(".input-campeonato");
  //   return false;
  // }

  removeInputCampeonato() {
    // TODO criar lógica
  }

}
