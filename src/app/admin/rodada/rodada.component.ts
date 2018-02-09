import { Component, OnInit } from '@angular/core';
import { RodadaService } from './rodada.service';
import { Rodada } from '../../models/rodada';
import { showError } from '../../utils/showError';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../models/pagination';

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
  public pagination: Pagination = new Pagination();

  constructor(private service: RodadaService, private toastr: ToastrService) {
    this.filter = {};
    this.rodada = new Rodada();
    this.rodadas = [];
    this.loadingIndicator = true;
    this.filter = {};
  }

  ngOnInit() {
    this.setPage();
  }

  setPage(pageInfo = {offset: 0}) {
    this.filter.page = pageInfo.offset + 1;
    this.getRodadas();
  }

  public buscar() {
    this.filter.page = 1;
    this.getRodadas();
  }

  private getRodadas(): Promise<any> {
    return this.service.getRodadas(this.filter)
      .then(result => {
        this.pagination.count = result.total;
        this.pagination.offset = result.current_page - 1;
        this.pagination.limit = result.per_page;
        this.rows = result.data;
        this.temp = result.data;
        this.loadingIndicator = false;
      })
      .catch(err => {
        showError(err, this.toastr);
      });
  }

  public novo() {
    this.rodada = new Rodada();
    jQuery('#modal-rodada').modal('show');
  }

  public setRodada(row) {
    this.rodada.nome = row.nome;
    this.rodada.inicio = row.inicio;
    this.rodada.fim = row.fim;
    jQuery('#modal-rodada').modal('show');
  }

  public edit(rodada) {
    this.rodada = rodada;
  }

  public parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
  }

  public update() {
    this.service.update(this.rodada)
      .then(result => {
        this.toastr.success('Rodada editada com sucesso.');
        return this.getRodadas();
      })
      .then(result => jQuery('#modal-rodada').modal('hide'))
      .catch(err => {
        showError(err, this.toastr);
      });
  }

  public save() {
    this.service.save(this.rodada)
      .then(result => {
        this.toastr.success('Rodada salva com sucesso.');
        return this.getRodadas();
      })
      .then(result => jQuery('#modal-rodada').modal('hide'))
      .catch(err => {
        showError(err, this.toastr);
      });
  }

  public submit() {
    if (this.rodada.id != null) {
      this.update();
    } else {
      this.save();
    }
  }
}
