import { Component, OnInit } from '@angular/core';
import { RodadaService } from './rodada.service';
import { Rodada } from '../../models/rodada';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';

declare const jQuery;

@Component({
  selector: 'app-rodada',
  templateUrl: './rodada.component.html',
  styleUrls: ['./rodada.component.scss']
})
export class RodadaComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean;
  reorderable: boolean;
  public rodada: Rodada;
  public rodadas: Rodada[];
  public filter; any;

  constructor(private service: RodadaService, private toastr: ToastrService) {
    this.filter = {};
    this.rodada = new Rodada();
    this.rodadas = [];
    this.loadingIndicator = true;
    this.reorderable = true;
  }

  ngOnInit() {
    this.service.getAll(this.filter)
    .then(result => {
      this.rows = result.rodadas.data;
      this.loadingIndicator = false;
    })
    .catch(err => {
      showError(err, this.toastr);
      this.loadingIndicator = false;
    });
  }

  public save() {
    if (this.rodada.id) {
      this.edit();
    } else {
      this.service.save(this.rodada)
      .then(rodada => {
        this.service.getAll({});
        jQuery('#modal-rodada').hide();
        this.toastr.success('Rodada salva com sucesso');
        this.loadingIndicator = false;
    })
    .catch(err => showError(err, this.toastr));
    }
  }

  public setRodada(row) {
    this.rodada.nome = row.nome;
    this.rodada.inicio = row.inicio;
    this.rodada.fim = row.fim;
    jQuery('#modal-rodada').show();
  }

  public edit() {
    this.service.edit(this.rodada)
    .then(rodada => {
      this.service.getAll({});
      jQuery('#modal-rodada').hide();
      this.toastr.success('Rodada editada com sucesso');
    })
    .catch(err => showError);
  }

  public parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
}

}
