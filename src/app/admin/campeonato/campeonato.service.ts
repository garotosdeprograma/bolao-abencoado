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

  public getCampeonatos(filter: any): Promise<any> {
    this.url += '?page' + filter.page + '&nome=' + filter.nome;
    return this.http.get(this.url, this.getHeaders())
    .map(this.extract)
    .toPromise();
  }

}
