import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  @ViewChild('jogos') Jogos: ElementRef;
  @ViewChild('ranking') Ranking: ElementRef;
  @ViewChild('campeonatos') Campeonatos: ElementRef;
  @ViewChild('rodadas') Rodadas: ElementRef;
  @ViewChild('apostas') Apostas: ElementRef;
  @ViewChild('usuarios') Usuarios: ElementRef;
  @ViewChild('equipes') Equipes: ElementRef;

  constructor() { }

  ngOnInit() {
    this.Ranking.nativeElement.style.display = 'block';
  }

  mostrarJogos() {
    this.Jogos.nativeElement.style.display = 'block';
  }

  voltar() {
    this.Jogos.nativeElement.style.display = 'none';
  }

  rankingSemana() {
    this.Ranking.nativeElement.style.display = 'block';
    this.Campeonatos.nativeElement.style.display = 'none';
    this.Rodadas.nativeElement.style.display = 'none'
    this.Apostas.nativeElement.style.display = 'none';
    this.Equipes.nativeElement.style.display = 'none';
  }

  campeonato() {
    this.Ranking.nativeElement.style.display = 'none';
    this.Campeonatos.nativeElement.style.display = 'block';
    this.Rodadas.nativeElement.style.display = 'none'
    this.Apostas.nativeElement.style.display = 'none';
    this.Equipes.nativeElement.style.display = 'none';
  }

  rodada() {
    this.Ranking.nativeElement.style.display = 'none';
    this.Campeonatos.nativeElement.style.display = 'none';
    this.Rodadas.nativeElement.style.display = 'block'
    this.Apostas.nativeElement.style.display = 'none';
    this.Equipes.nativeElement.style.display = 'none';
  }

  aposta() {
    this.Ranking.nativeElement.style.display = 'none';
    this.Campeonatos.nativeElement.style.display = 'none';
    this.Rodadas.nativeElement.style.display = 'none'
    this.Apostas.nativeElement.style.display = 'block';
    this.Equipes.nativeElement.style.display = 'none';
  }

  equipe() {
    this.Ranking.nativeElement.style.display = 'none';
    this.Campeonatos.nativeElement.style.display = 'none';
    this.Rodadas.nativeElement.style.display = 'none'
    this.Apostas.nativeElement.style.display = 'none';
    this.Equipes.nativeElement.style.display = 'block';
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
