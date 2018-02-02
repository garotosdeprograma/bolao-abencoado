import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RodadaService } from '../../admin/rodada/rodada.service';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
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
  public apostas: any[];

  constructor(private service: RodadaService, private toastr: ToastrService) {
    this.rodadas = [];
    this.apostas = [];
  }

  ngOnInit() {
    this.getJogos();
  }

  getJogos() {
    this.service.getRodadaJogos()
      .then(result => {
        this.rodadas = result;
      })
      .catch(err => showError(err, this.toastr));
  }

  buscarJogos() {
    // this.service.buscarJogos()
  }

  isActive(event) {
    console.log(event);
    return true;
    // if (jogo.equipe_casa.id === time.id) {
    //   jogo.equipe_casa.ativo = true;
    //   jogo.equipe_visitante.ativo = false;
    // } else {
    //   jogo.equipe_visitante.ativo = true;
    //   jogo.equipe_casa.ativo = false;
    // }
  }

  escolherEquipe(jogo, time) {
    // TODO checar rodada
    const aposta = {
      idTime: time.id,
      idJogo: jogo.id
    };

    const filteredApostas = this.apostas.filter(elm => {
      return !(elm.id === aposta.idJogo);
    });

    filteredApostas.push(aposta);

    this.apostas = filteredApostas;

    // this.isActive(jogo, time);

  }

  finalizarAposta() {
    this.Enviar.nativeElement.style.display = 'block';
    this.InputTelefone.nativeElement.style.display = 'block';
  }

  FormularioCadastroUsuario() {
    this.FormularioCadastro.nativeElement.style.display = 'block';
  }
}
