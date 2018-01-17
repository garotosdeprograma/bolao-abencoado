import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { URL_API } from '../../constant/api';
import { STORED_TOKEN } from '../../constant/local-storage';
import { Rodada } from '../../models/rodada';

@Injectable()
export class RodadaService {

  private token: string;
  private url: string;

  constructor(private http: Http) {
    this.url = URL_API + 'rodada';
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

  public save(rodada: Rodada): Promise<any> {
    return this.http.post(this.url, rodada, this.getHeaders())
    .map(this.extract)
    .toPromise();
  }

  public getAll(filter: any): Promise<any> {
    if (filter.page) {
      this.url += '?page=' + filter.page;
    } else {
      this.url += '?page=1';
    }

    if (filter.nome) {
      this.url += '&nome=' + filter.nome;
    }

    if (filter.inicio) {
      this.url += '&inicio=' + filter.inicio;
    }
    if (filter.fim) {
      this.url += '&fim=' + filter.fim;
    }
    return this.http.get(this.url, this.getHeaders())
    .map(this.extract)
    .toPromise();
  }

  public edit(rodada: Rodada): Promise<any> {
    return this.http.put(this.url, rodada, this.getHeaders())
    .map(this.extract)
    .toPromise();
  }


}
