import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('meusjogos') meusJogos: ElementRef;
  @ViewChild('resultado') resultado: ElementRef;
  @ViewChild('equipecasaescolhida') equipeEscolhida: ElementRef;
  @ViewChild('fechar') fechar: ElementRef;

  constructor() { }

  ngOnInit() {
    this.meusJogos.nativeElement.style.display = 'none';
    this.resultado.nativeElement.style.display = 'none';
  }
  showMenu() {
    this.meusJogos.nativeElement.style.display = this.meusJogos.nativeElement.style.display === 'none' ? 'block' : 'none';
  }
  showResultado() {
    this.resultado.nativeElement.style.display = this.resultado.nativeElement.style.display === 'none' ? 'flex' : 'none';
  }
  escolherEquipe() {
    this.equipeEscolhida.nativeElement.style.backgroundColor = '#F75C03';
  }
  fecharMensagem() {
    this.fechar.nativeElement.style.display = this.fechar.nativeElement.style.display === 'none' ? 'block' : 'none';
  }
}
