import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RodadaService } from '../../admin/rodada/rodada.service';
import { showError, errorHandler } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { RodadaTO } from '../../models/rodadaTO';
import { ApostaTO } from '../../models/apostaTO';
import { ApostaService } from '../../admin/aposta/aposta.service';
import { Jogo } from '../../models/jogo';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {

  @ViewChild('enviar') Enviar: ElementRef;
  @ViewChild('formulario') Formulario: ElementRef;
  @ViewChild('formularioCadastro') FormularioCadastro: ElementRef;
  @ViewChild('equipeEscolhida') EquipeEscolhida: ElementRef;
  @ViewChild('bolaAposta') BolaAposta: ElementRef;
  @ViewChild('jogosSelecionados') JogosSelecionados: ElementRef;
  public rodadas: any[];
  public apostas: any[];
  private idRodada: number;
  public apostaTO: ApostaTO;
  public viewJogos: Set<any>;
  public isEmpty: boolean;

  constructor(private service: RodadaService,
    private toastr: ToastrService,
    private router: Router,
    private apostaService: ApostaService) {
    this.rodadas = [];
    this.apostas = [];
    this.apostaTO = new ApostaTO();
    this.viewJogos = new Set();
  }

  ngOnInit() {
    this.getJogos();
  }

  initComponent() {
    this.rodadas = [];
    this.apostas = [];
    this.apostaTO = new ApostaTO();
    this.viewJogos = new Set();
    this.getJogos();
  }

  getJogos() {
    this.service.getJogosPorRodada()
      .then(result => {
        return this.rodadas = result.map((elm: any) => {
          elm.jogos.map(elm2 => {
            elm2.equipe_casa.ativo = false;
            elm2.equipe_visitante.ativo = false;
            return elm2;
          });
          return elm;
        });
      })
      .then(rodadas => {
        console.log(this.rodadas);
        if (rodadas.length  < 1) {
          return this.isEmpty = true;
        }
      })
      .catch(err => errorHandler(err, this.toastr, this.router));
  }

  escolherEquipe(jogo, time, idRodada, side) {

    try {

      if (jogo.campeonato.tipo === 'INTERNACIONAL') {

        const internacional = this.apostaTO.times.filter(elm => {
          return elm.idJogo === jogo.id;
        });

        if (this.apostaTO.tipo === jogo.campeonato.tipo && internacional.length < 1) {
          this.toastr.error('Só é permitido escolher um jogo internacional.');
          return;
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

      this.mostrarBolaAposta();

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
    if (jogo.campeonato.tipo === 'INTERNACIONAL') {
      this.apostaTO.tipo = '';
    }
    this.apostaTO.times = this.apostaTO.times.filter(elm => {
      if (elm.idJogo === jogo.id) {
        jogo.equipe_casa.ativo = false;
        jogo.equipe_visitante.ativo = false;
        return false;
      }
      return true;
    });
    this.mostrarBolaAposta();
  }

  resetValues() {
    this.rodadas = [];
    this.apostas = [];
    this.apostaTO = new ApostaTO();
  }

  salvarAposta() {
    this.apostaService.saveAposta(this.apostaTO)
      .then(result => {
        this.toastr.success('Aposta salva com sucesso');
        this.initComponent();
        this.mostrarBolaAposta();
      })
      .catch(err => errorHandler(err, this.toastr, this.router));
  }

  continuarAposta() {
    this.Enviar.nativeElement.style.display = 'block';
    this.Formulario.nativeElement.style.display = 'block';
    this.JogosSelecionados.nativeElement.style.display = 'none';
  }

  numberValidation(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
  }


  mostrarBolaAposta() {
    if (this.apostaTO.times.length > 0) {
      this.BolaAposta.nativeElement.style.right = '10px';
    } else {
      this.BolaAposta.nativeElement.style.right = '-83px';
      this.viewJogos.clear();
      this.apostaTO = new ApostaTO();
      jQuery('#modal-aposta').modal('hide');
      this.JogosSelecionados.nativeElement.style.display = 'block';
      this.Formulario.nativeElement.style.display = 'none';
      this.Enviar.nativeElement.style.display = 'none';
    }
  }

  voltarVerAposta() {
    this.JogosSelecionados.nativeElement.style.display = 'block';
    this.Formulario.nativeElement.style.display = 'none';
    this.Enviar.nativeElement.style.display = 'none';
  }
}
