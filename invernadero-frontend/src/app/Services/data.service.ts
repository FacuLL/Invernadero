import { Injectable } from '@angular/core';
import { Data } from '../Models/data'
import { Valores } from '../Models/valores'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  DATA_URL_API = 'http://localhost:3000';

  data: Data[] = [];

  constructor(private http : HttpClient) {  }

  getLastData() {
    return this.http.get<Data>(this.DATA_URL_API + '/getlastdata');
  }

  modificarVal(valores: Valores[]) {
    return this.http.post(this.DATA_URL_API + '/modificarval', valores);
  }

  toexcel() {
    return this.http.get(this.DATA_URL_API + '/toexcel', { responseType: 'blob' });
  }

}
