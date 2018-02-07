import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { URL_API } from '../../constant/api';
import { STORED_TOKEN } from '../../constant/local-storage';
import { Aposta } from '../../models/aposta';
import { ApostaTO } from '../../models/apostaTO';

@Injectable()
export class ApostaService {

  private url: string;
  private token: string;

  constructor(private http: Http) {
    this.url = URL_API + 'aposta';
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

  public saveAposta(apostaTO: ApostaTO): Promise<any> {
    const aposta = new Aposta();
    console.log(apostaTO.times);
    aposta.rodada_id = apostaTO.rodada_id;
    aposta.jogo_1 = apostaTO.times[0].idJogo;
    aposta.time_1 = apostaTO.times[0].idTime;
    aposta.jogo_2 = apostaTO.times[1].idJogo;
    aposta.time_2 = apostaTO.times[1].idTime;
    aposta.jogo_3 = apostaTO.times[2].idJogo;
    aposta.time_3 = apostaTO.times[2].idTime;
    aposta.jogo_4 = apostaTO.times[3].idJogo;
    aposta.time_4 = apostaTO.times[3].idTime;
    return this.http.post(this.url, aposta, this.getHeaders())
      .map(this.extract)
      .toPromise();
  }

  public update(aposta: Aposta): Promise<any> {
    const url = this.url + '/' + aposta.id;
    return this.http.put(url, aposta, this.getHeaders())
      .map(this.extract)
      .toPromise();
  }

  public getApostas(filter: any): Promise<any> {
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
