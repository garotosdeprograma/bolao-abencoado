import { Component, OnInit } from '@angular/core';
import { URL_API } from '../../constant/api';
declare const jQuery;

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  
  constructor() {
    this.fetch((data) => {
      this.temp = [...data];
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', '../../assets/data/company.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  addInputCampeonato() {
    jQuery('<div class="col-sm-12 row p-0 m-0">' +
      '<div class= "form-group col-11 pl-0 ml-0">' +
      '<select class="form-control">' +
      '<option selected > Campeonato...</option>' +
      '<option value = "1" > Brasileiro Série A </option>' +
      '<option value = "2" > Brasileiro Série B </option>' +
      '<option value = "3" > UEFA < /option>' +
      '</select>' +
      '</div>' +
      '<div class="col-1 pl-0 ml-0">' +
      '<a class="btn btn-excluir" style="cursor:pointer;background-color:gray">' +
      '<i class="fa fa-trash" aria-hidden="true" style="color: #fff"></i>' +
      '</a>' +
      '</div>' +
      '</div>').appendTo(".input-campeonato");
    return false;
  }

  removeInputCampeonato() {
    // criar lógica
  }

  ngOnInit() {
  }

}
