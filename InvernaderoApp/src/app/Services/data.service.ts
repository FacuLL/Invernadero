import { Injectable } from '@angular/core';
import { Data } from '../Models/data'
import { Valores } from '../Models/valores'
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  DATA_URL_API = 'http://localhost:3000';

  data: Data[] = [];

  constructor(private http : HttpClient) {  }

  getLastData(): Observable<Data> {
    return this.http.get<Data>(this.DATA_URL_API + '/getlastdata');
  }

  modificarVal(valores: Valores) {
    return this.http.post(this.DATA_URL_API + '/modificarval', valores);
  }

  getVal(): Observable<Valores> {
    return this.http.get<Valores>(this.DATA_URL_API + '/sendval');
  }

  toexcel() {
    return this.http.get(this.DATA_URL_API + '/toexcel', { responseType: 'blob' });
  }
}
