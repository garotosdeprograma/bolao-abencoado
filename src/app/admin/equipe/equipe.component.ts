import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { URL_API } from '../../constant/api';
import { EquipeService } from './equipe.service';
import { Equipe } from '../../models/equipe';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../models/pagination';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../campeonato/campeonato.service';
import { element } from 'protractor';
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
  listaCampeonatoEscolhido: any;

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
  listaCampeonatos: any[];

  constructor(private service: EquipeService, private toastr: ToastrService,
    private campeonatoService: CampeonatoService) {
    this.url = 'assets/img/default.png';
    this.equipe = new Equipe();
    this.loadingIndicator = true;
    this.reorderable = true;
    this.equipes = [];
    this.pagination = new Pagination();
    this.escudos = [];
    this.campeonatos = [];
    this.listaCampeonatos = [];
    this.listaCampeonatoEscolhido = new Set();
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

  clearModal() {
    this.listaCampeonatoEscolhido.forEach(element => {
      this.listaCampeonatos.push(element.id);
    })
    this.equipe.campeonato = this.listaCampeonatos;
    this.listaCampeonatoEscolhido.clear();
    this.url = 'assets/img/default.png';
    this.listaCampeonatos = [];
  }

  public save() {
    this.clearModal();
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
    this.url = this.equipe.logo;
    this.BotaoEscolherEscudo.nativeElement.style.display = 'block';
    this.DivEscudos.nativeElement.style.display = 'none';
  }

  listaCampeonatosEquipe(campeonato) {
    this.listaCampeonatoEscolhido.add(campeonato);
  }

  removerCampeonato(campeonato) {
    this.listaCampeonatoEscolhido.delete(campeonato);
  }

  newEquipe() {
    this.equipe = new Equipe();
  }
}
