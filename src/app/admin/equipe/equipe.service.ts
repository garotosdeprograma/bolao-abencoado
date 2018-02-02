import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { URL_API } from '../../constant/api';
import { STORED_TOKEN } from '../../constant/local-storage';
import { Equipe } from '../../models/equipe';

@Injectable()
export class EquipeService {

  private url: string;
  private token: string;

  constructor(private http: Http) {
    this.url = URL_API + 'equipe';
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

  public getEscudos() {
    return this.http.get('../../../assets/data/escudos.json')
      .map(this.extract)
      .toPromise();
  }

  private extract(res: Response): any {
    return res.json();
  }

  public saveEquipe(equipe: Equipe): Promise<any> {
    return this.http.post(this.url, equipe, this.getHeaders())
      .map(this.extract)
      .toPromise();
  }

  public update(equipe: Equipe): Promise<any> {
    const url = this.url + '/' + equipe.id;
    return this.http.put(url, equipe, this.getHeaders())
      .map(this.extract)
      .toPromise();
  }

  public getEquipes(filter: any): Promise<any> {
    let url = '';
    if (filter.page) {
      url = this.url + '?page=' + filter.page;
    } else {
      url = this.url + '?page=1';
    }
    if (filter.nome) {
      url += '&nome=' + filter.nome;
    }
    console.log(filter);
    console.log(url);
    return this.http.get(url, this.getHeaders())
    .map(this.extract)
    .toPromise();
  }

}
