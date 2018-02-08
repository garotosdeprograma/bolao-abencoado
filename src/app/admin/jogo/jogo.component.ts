import { Component, OnInit } from '@angular/core';
import { JogoService } from './jogo.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CampeonatoService } from '../campeonato/campeonato.service';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Jogo } from '../../models/jogo';
import { Equipe } from '../../models/equipe';
import { EquipeService } from '../equipe/equipe.service';
import { RodadaService } from '../rodada/rodada.service';
declare const jQuery;

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  jogos: any[];
  jogo: Jogo;
  campeonatos: any[];
  equipes: Equipe[];
  idRodada: number;


  constructor(private service: JogoService,
              private toastr: ToastrService,
              private campeonatoService: CampeonatoService,
              private rodadaService: RodadaService,
              private route: ActivatedRoute) {
                this.jogo = new Jogo();
                this.campeonatos = [];
                this.equipes = [];
                this.jogos = [];
               }

  ngOnInit() {
    this.route.queryParams.
    subscribe(params => {
      this.jogo.rodada_id = +params.id;
      this.idRodada = params.id;
      this.getJogos(params.id);
    });
    this.getCampeonatos();
  }

  salvar() {
    console.log(this.jogo);
    if (this.jogo.equipe_casa === this.jogo.equipe_visitante) {
      this.toastr.error('Time casa e visitante não podem ser iguais');
      return;
    }
    this.service.saveJogo(this.jogo)
      .then(result => {
        this.toastr.success('Jogo salvo com sucesso.');
        jQuery('#modal-jogo').modal('hide');
        this.getJogos(this.idRodada);
        // this.jogo = new Jogo();
      })
      .catch(err => showError(err, this.toastr));
  }

  newJogo() {
    this.jogo = new Jogo();
    this.jogo.rodada_id = this.idRodada;
    jQuery('#modal-jogo').modal('show');
  }

  editJogo(jogo) {
    this.campeonatoService.getEquipesPorCampeonatos(jogo.campeonato_id)
    .then(result => this.equipes = result.equipes)
    .then(result => {
      this.jogo = new Jogo();
      this.jogo.campeonato_id = jogo.campeonato_id;
      this.jogo.equipe_casa = jogo.equipe_casa.id;
      this.jogo.equipe_visitante = jogo.equipe_visitante.id;
      this.jogo.rodada_id = this.idRodada;
      this.jogo.inicio = jogo.inicio;
      this.jogo.id = jogo.id;
      return this.jogo;
    })
    .then(result => {
      jQuery('#modal-jogo').modal('show');
    })
    .catch(err => showError(err, this.toastr));
  }

  getEquipesPorCampeonatos() {
    return this.campeonatoService.getEquipesPorCampeonatos(this.jogo.campeonato_id)
        .then(result => {
          return this.equipes = result.equipes;
        })
        .catch(err => showError(err, this.toastr));
  }

  getJogos(id) {
    this.rodadaService.getJogosPorRodada(id)
      .then(result => {
        this.jogos = result[0].jogos;
      })
      .catch(err => showError(err, this.toastr));
  }

  getCampeonatos() {
    this.campeonatoService.getAllCampeonatos()
      .then(result => {
        this.campeonatos = result;
      })
      .catch(err => showError(err, this.toastr));
  }

}
