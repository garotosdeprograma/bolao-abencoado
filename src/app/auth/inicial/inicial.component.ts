import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RodadaService } from '../../admin/rodada/rodada.service';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { RodadaTO } from '../../models/rodadaTO';
import { ApostaTO } from '../../models/apostaTO';
import { ApostaService } from '../../admin/aposta/aposta.service';
import { Jogo } from '../../models/jogo';
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
  private idRodada: number;
  public apostaTO: ApostaTO;
  public viewJogos: Set<any>;


  constructor(private service: RodadaService,
    private toastr: ToastrService,
    private apostaService: ApostaService) {
    this.rodadas = [];
    this.apostas = [];
    this.apostaTO = new ApostaTO();
    this.viewJogos = new Set();
  }

  ngOnInit() {
    this.getJogos();
  }

  getJogos() {
    this.service.getJogosPorRodada()
      .then(result => {
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

  escolherEquipe(jogo, time, idRodada, side) {

    try {

      if (jogo.campeonato.tipo === 'INTERNACIONAL') {
        if (this.apostaTO.tipo && this.apostaTO.tipo === jogo.campeonato.tipo) {
          throw new Error('Só é permitido escolher um jogo internacional.');
        } else {
          this.apostaTO.tipo = jogo.campeonato.tipo;
        }
      }

      if (!this.apostaTO.rodada_id) {
        this.apostaTO.rodada_id = idRodada;
      } else if (this.apostaTO.rodada_id !== idRodada) {
        this.toastr.error('Não é permitido escolher jogos de rodadas diferentes em uma aposta.');
        return;
      }

      const timeAposta = {
        idTime: time.id,
        idJogo: jogo.id
      };

      if (this.apostaTO.times.length < 1) {
        this.apostaTO.times.push(timeAposta);
      } else {
        const filteredTime = this.apostaTO.times.filter(elm => {
          if (elm.idJogo === timeAposta.idJogo) {
            elm.idTime = timeAposta.idTime;
            return true;
          }
          return false;
        });

        if (filteredTime.length < 1) {
          if (this.apostaTO.times.length === 4) {
            this.toastr.error('Não é permitido escolher mais de quatro(4) times em uma aposta.');
            return;
          }
          this.apostaTO.times.push(timeAposta);
        }
      }

      if (side === 'right') {
        jogo.equipe_casa.ativo = true;
        jogo.equipe_visitante.ativo = false;
      } else {
        jogo.equipe_casa.ativo = false;
        jogo.equipe_visitante.ativo = true;
      }

    } catch (error) {
      this.toastr.error(error.message);
    }

    this.viewJogos.add(jogo);

  }

  retirarAposta(jogo) {
    this.viewJogos.delete(jogo);
    this.apostaTO.times = this.apostaTO.times.filter(elm => {
      if (elm.idJogo === jogo.id) {
        jogo.equipe_casa.ativo = false;
        jogo.equipe_visitante.ativo = false;
        return false;
      }
      return true;
    });
  }

  resetValues() {
    this.rodadas = [];
    this.apostas = [];
    this.apostaTO = new ApostaTO();
  }

  salvarAposta() {
    console.log(this.apostaTO);
    this.apostaService.saveAposta(this.apostaTO)
      .then(result => {
        this.toastr.success('Aposta salva com sucesso');
        jQuery('#modal-aposta').modal('hide');
      })
      .catch(err => showError(err, this.toastr));
  }

  continuarAposta() {
    this.Enviar.nativeElement.style.display = 'block';
    this.InputTelefone.nativeElement.style.display = 'block';
  }

  numberValidation(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
  }

}
