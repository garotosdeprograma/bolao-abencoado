import { Jogo } from './../../models/jogo';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { URL_API } from '../../constant/api';
import { EquipeService } from './equipe.service';
import { Equipe } from '../../models/equipe';
import { showError, errorHandler } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../models/pagination';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../campeonato/campeonato.service';
import { element } from 'protractor';
import { Router } from '@angular/router';
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
  src: String;
  x: any;

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
  listaCampeonatosEscolhidos: any[];
  logoDefault: string;

  constructor(private service: EquipeService,
    private toastr: ToastrService,
    private router: Router,
    private campeonatoService: CampeonatoService) {
    this.logoDefault = 'assets/img/default.png';
    this.src = '';
    this.equipe = new Equipe();
    this.loadingIndicator = true;
    this.reorderable = true;
    this.equipes = [];
    this.pagination = new Pagination();
    this.escudos = [];
    this.campeonatos = [];
    this.listaCampeonatos = [];
    this.listaCampeonatosEscolhidos = [];
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
      .catch(err => errorHandler(err, this.toastr, this.router));
  }

  getEquipes(): Promise<any> {
    return this.service.getEquipes(this.filter || { page: 1 })
      .then(result => {
        this.pagination.count = result.total;
        this.pagination.offset = result.current_page - 1;
        this.pagination.limit = result.per_page;
        this.rows = result.data;
        this.loadingIndicator = false;
      })
      .catch(err => errorHandler(err, this.toastr, this.router));
  }

  public buscar() {
    this.filter.page = 1;
    this.getEquipes();
  }

  public edit(equipe) {
    this.equipe = new Equipe();
    this.equipe.id = equipe.id;
    this.equipe.nome = equipe.nome;
    this.equipe.logo = equipe.logo ? equipe.logo : this.logoDefault;
    equipe.campeonatos.forEach(element => {
      const campeonato = {
        id: element.id,
        nome: element.nome
      };
      this.listaCampeonatosEscolhidos.push(campeonato);
    });
    this.recolherLogos();
  }

  public submit() {
    Promise.resolve(
      this.criarListaCampeonatos()
    ).then(result => {
      if (this.equipe.id != null) {
        this.update();
      } else {
        this.save();
      }
    });
  }

  public update() {
    this.service.update(this.equipe)
      .then(result => {
        this.toastr.success('Equipe editada com sucesso!');
        return this.getEquipes();
      })
      .then(result => {
        jQuery('#modal-equipe').modal('hide');
        this.limparDados();
      })
      .catch(err => errorHandler(err, this.toastr, this.router));
  }

  criarListaCampeonatos() {
    this.listaCampeonatosEscolhidos.forEach(element => {
      this.equipe.campeonato.push(element.id);
    });
  }

  public save() {
    this.service.saveEquipe(this.equipe)
      .then(result => {
        this.toastr.success('Equipe salva com sucesso!');
        return this.getEquipes();
      })
      .then(result => {
        jQuery('#modal-equipe').modal('hide');
        this.limparDados();
      })
      .catch(err => errorHandler(err, this.toastr, this.router));
  }

  escolherEscudo() {
    this.BotaoEscolherEscudo.nativeElement.style.display = 'none';
    this.DivEscudos.nativeElement.style.display = 'block';
  }

  recolherLogos() {
    this.BotaoEscolherEscudo.nativeElement.style.display = 'block';
    this.DivEscudos.nativeElement.style.display = 'none';
  }

  selecionarEscudo(url) {
    this.equipe.logo = url;
    this.src = this.equipe.logo;
    this.recolherLogos();
  }

  listaCampeonatosEquipe(campeonato) {
    if (this.listaCampeonatosEscolhidos.length < 1) {
      this.listaCampeonatosEscolhidos.push(campeonato);
    } else {
      const filterCampeonato = this.listaCampeonatosEscolhidos.filter(element => {
        if (element.id === campeonato.id) {
          element.id = campeonato.id;
          element.nome = campeonato.nome;
          return true;
        }
        return false;
      });

      if (filterCampeonato.length < 1) {
        this.listaCampeonatosEscolhidos.push(campeonato);
      }
    }
  }

  removerCampeonato(campeonato) {
    this.listaCampeonatosEscolhidos = this.listaCampeonatosEscolhidos.filter(element => {
      if (element.id !== campeonato.id) {
        return true;
      } else {
        return false;
      }
    });
  }

  limparDados() {
    this.equipe = new Equipe();
    this.listaCampeonatosEscolhidos = [];
    this.equipe.logo = this.logoDefault;
    this.recolherLogos();
  }

  newEquipe() {
    jQuery('#modal-equipe').modal('show');
    this.limparDados();
  }
}
