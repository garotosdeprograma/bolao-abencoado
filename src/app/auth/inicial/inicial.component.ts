import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RodadaService } from '../../admin/rodada/rodada.service';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { RodadaTO } from '../../models/rodadaTO';
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
  public rodadas: any[];
  public apostas;
  private idRodada: number;


  constructor(private service: RodadaService, private toastr: ToastrService) {
    this.rodadas = [];
    this.apostas = new Set();
  }

  ngOnInit() {
    this.getJogos();
  }

  getJogos() {
    this.service.getRodadaJogos()
      .then(result => {
        console.log(result);
        this.rodadas = result.map((elm: any) => {
          elm.jogos.map(elm2 => {
            elm2.equipe_casa.ativo = false;
            elm2.equipe_visitante.ativo = false;
            return elm2;
          });
          return elm;
        });
      })
      .catch(err => showError(err, this.toastr));
  }

  buscarJogos() {
    // this.service.buscarJogos()
  }

  escolherEquipeRight(jogo, time, idRodada) {

    if (!!this.idRodada && this.idRodada !== idRodada) {
      this.toastr.error('Não pode escolher jogos em rodadas diferentes.');
      return;
    }

    const aposta = {
      idTime: time.id,
      idJogo: jogo.id
    };

    const visitante = {
      idJogo: jogo.id,
      idTime: jogo.equipe_visitante.id
    };

    this.apostas.delete(visitante);

    this.apostas.add(aposta);

    jogo.equipe_casa.ativo = true;
    jogo.equipe_visitante.ativo = false;

  }

  escolherEquipeLeft(jogo, time, idRodada) {
    
    const rodada = {
      idRodada
    }

    if(this.apostas.size < 1) {
      this.apostas.add(rodada);
    } else if(this.apostas.has(rodada)) {
      
    }

    const iteratorApostas = this.apostas[Symbol.iterator]();
    iteratorApostas.next().value;

    if(iteratorApostas.next().value) {

    }


    this.apostas.add(rodada);
    // if (!!this.idRodada && this.idRodada !== idRodada) {
    //   this.toastr.error('Não pode escolher jogos em rodadas diferentes.');
    //   return;
    // }

    const aposta = {
      idJogo: jogo.id,
      idTime: time.id
    };

    const casa = {
      idJogo: jogo.id,
      idTime: jogo.equipe_casa.id
    };

    this.apostas.delete(casa);

    this.apostas.add(aposta);

    jogo.equipe_casa.ativo = false;
    jogo.equipe_visitante.ativo = true;

  }

  finalizarAposta() {
    this.Enviar.nativeElement.style.display = 'block';
    this.InputTelefone.nativeElement.style.display = 'block';
  }

  FormularioCadastroUsuario() {
    this.FormularioCadastro.nativeElement.style.display = 'block';
  }
}
