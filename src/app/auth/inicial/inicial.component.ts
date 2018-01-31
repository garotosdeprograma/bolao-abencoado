import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {

  @ViewChild('enviar') Enviar: ElementRef;
  @ViewChild('inputTelefone') InputTelefone: ElementRef;
  @ViewChild('formularioCadastro') FormularioCadastro: ElementRef;
  @ViewChild('equipeEscolhida') EquipeEscolhida: ElementRef;
  public jogos: any[];

  // constructor(private service: JogoService) { }

  ngOnInit() {
  }

  buscarJogos() {
    // this.service.buscarJogos()
  }

  finalizarAposta() {
    this.Enviar.nativeElement.style.display = 'block';
    this.InputTelefone.nativeElement.style.display = 'block';
  }

  FormularioCadastroUsuario() {
    this.FormularioCadastro.nativeElement.style.display = 'block';
  }

  escolherEquipe() {
    this.EquipeEscolhida.nativeElement.style.backgroundColor = '#000';
  }
}
