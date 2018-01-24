import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { URL_API } from '../../constant/api';
import { STORED_TOKEN } from '../../constant/local-storage';
import { Campeonato } from '../../models/campeonato';

@Injectable()
export class CampeonatoService {

  private url: string;
  private token: string;

  constructor(private http: Http) {
    this.url = URL_API + 'campeonato';
  }

  private getHeaders() {
    const headers = new Headers();
    this.token = localStorage.getItem(STORED_TOKEN);
    headers.append('Authorization', 'Bearer ' + this.token);
    headers.append('Content-Type', 'application/json');
    return {
      headers: headers
    };
  }

  private extract(res: Response): any {
    return res.json();
  }

  public saveCampeonato(campeonato: Campeonato): Promise<any> {
    return this.http.post(this.url, campeonato, this.getHeaders())
      .map(this.extract)
      .toPromise();
  }

  public update(campeonato: Campeonato): Promise<any> {
    const url = this.url + '/' + campeonato.id;
    return this.http.put(url, campeonato, this.getHeaders())
      .map(this.extract)
      .toPromise();
  }

  public getCampeonatos(filter: any): Promise<any> {
    let url = '';
    if (filter.page) {
      url = this.url + '?page=' + filter.page;
    } else {
      url = this.url + '?page=1';
    }
    if (filter.nome) {
      url += '&nome=' + filter.nome;
    }
    console.log(url);
    return this.http.get(url, this.getHeaders())
    .map(this.extract)
    .toPromise();
  }

}
