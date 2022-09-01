import { Injectable, OnInit } from '@angular/core';
import { Data } from '../Models/data'
import { Valores } from '../Models/valores'
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private DATA_URL_API: string = '';

  private data: Data[] = [];

  private _storage: Storage | null = null;

  constructor(private http : HttpClient, public storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    if (!this._storage) {
      const storage = await this.storage.create();
      this._storage = storage;
      this.DATA_URL_API = await this._storage?.get('backendurl');
    }
  }

  async setURL(url: string) {
    if (url.replace(" ", "") == "") return;
    this.DATA_URL_API = url;
    this._storage?.set('backendurl', url);
  }

  async importURL() {
    if (!this._storage) await this.initStorage();
    await this._storage?.get('backendurl').then((res: string) => {
      this.DATA_URL_API = res;
    })
  }

  getURL(): string {
    return this.DATA_URL_API;
  }

  getAllData() {
    return this.http.get(this.DATA_URL_API + '/getalldata')
  }

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
