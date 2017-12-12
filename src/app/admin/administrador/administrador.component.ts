import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  @ViewChild('jogos') Jogos: ElementRef;
  @ViewChild('ranking') Ranking: ElementRef;
  @ViewChild('campeonatos') Campeonatos: ElementRef;  
  @ViewChild('apostas') Apostas: ElementRef;
  @ViewChild('usuarios') Usuarios: ElementRef;
  @ViewChild('equipes') Equipes: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  mostrarJogos() {
    // this.Jogos.nativeElement.style.right = '0';
    // this.Jogos.nativeElement.style.width = '100vw';
    this.Jogos.nativeElement.style.display = 'block';
  }

  voltar() {
    // this.Jogos.nativeElement.style.right = '-100px';
    // this.Jogos.nativeElement.style.width = '0';
    this.Jogos.nativeElement.style.display = 'none';
  }

  rankingSemana() {
    this.Ranking.nativeElement.style.display = 'block';
    this.Campeonatos.nativeElement.style.display = 'none';
    this.Apostas.nativeElement.style.display = 'none';
    // this.Usuarios.nativeElement.style.display = 'none';
    this.Equipes.nativeElement.style.display = 'none';
  }

  campeonato() {
    this.Ranking.nativeElement.style.display = 'none';
    this.Campeonatos.nativeElement.style.display = 'block';
    this.Apostas.nativeElement.style.display = 'none';
    // this.Usuarios.nativeElement.style.display = 'none';
    this.Equipes.nativeElement.style.display = 'none';
  }

  aposta() {
    this.Ranking.nativeElement.style.display = 'none';    
    this.Campeonatos.nativeElement.style.display = 'none';
    this.Apostas.nativeElement.style.display = 'block';
    // this.Usuarios.nativeElement.style.display = 'none';
    this.Equipes.nativeElement.style.display = 'none';
  }

  usuario() {
    this.Ranking.nativeElement.style.display = 'none';    
    this.Campeonatos.nativeElement.style.display = 'none';
    this.Apostas.nativeElement.style.display = 'none';
    // this.Usuarios.nativeElement.style.display = 'block';
    this.Equipes.nativeElement.style.display = 'none';
  }

  equipe() {
    this.Ranking.nativeElement.style.display = 'none';    
    this.Campeonatos.nativeElement.style.display = 'none';
    this.Apostas.nativeElement.style.display = 'none';
    // this.Usuarios.nativeElement.style.display = 'none';
    this.Equipes.nativeElement.style.display = 'block';
  }

}
