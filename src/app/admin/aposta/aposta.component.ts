import { Component, OnInit } from '@angular/core';
import { URL_API } from '../../constant/api';
import { ApostaService } from './aposta.service';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'app-aposta',
  templateUrl: './aposta.component.html',
  styleUrls: ['./aposta.component.scss']
})
export class ApostaComponent implements OnInit {

  filter: any;
  apostas: any[];
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean;
  pagination: Pagination;

  constructor(private service: ApostaService) {
    this.filter = {};
    this.apostas = [];
    this.loadingIndicator = true;
    this.pagination = new Pagination();
  }

  ngOnInit() {
    this.setPage();
  }

  setPage(pageInfo = { offset: 0 }) {
    this.filter.page = pageInfo.offset + 1;
    this.getApostas();
  }

  getApostas() {
    this.service.getApostas(this.filter)
      .then(result => {
        this.pagination.count = result.total;
        this.pagination.offset = result.current_page - 1;
        this.pagination.limit = result.per_page;
        this.rows = result.data;
        this.loadingIndicator = false;
        console.log(this.rows);
      })
      .catch(err => console.log(err));
  }

}
