import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { URL_API } from '../../constant/api';
import { STORED_TOKEN } from '../../constant/local-storage';
import { Jogo } from '../../models/jogo';

@Injectable()
export class JogoService {

  private url: string;
  private token: string;

  constructor(private http: Http) {
    this.url = URL_API + 'jogo';
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

  public saveJogo(jogo: Jogo): Promise<any> {
    return this.http.post(this.url, jogo, this.getHeaders())
      .map(this.extract)
      .toPromise();
  }

  public update(jogo: Jogo): Promise<any> {
    const url = this.url + '/' + jogo.id;
    return this.http.put(url, jogo, this.getHeaders())
      .map(this.extract)
      .toPromise();
  }

  public getJogos(filter: any): Promise<any> {
    let url = '';
    if (filter.page) {
      url = this.url + '?page=' + filter.page;
    } else {
      url = this.url + '?page=1';
    }
    if (filter.nome) {
      url += '&nome=' + filter.nome;
    }
    return this.http.get(url, this.getHeaders())
    .map(this.extract)
    .toPromise();
  }

}
