import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(
    private http: Http
  ) {
  }

  public getJsonFile = (jsonFileName: string): Promise<any[]> => {
    return new Promise((resolve/*, reject*/) => {
      this.http.get(`/assets/json/${jsonFileName}.json`).toPromise().then(res => {
        resolve(res.json());
      });
    });
  }


  public saveJsonFile = (json: Object[]): void => {
    this.http.post('http://localhost:3000/api/upload', json).toPromise().then(_res => {
    }).catch(err => {
      console.log('POST ERROR', err);
    });
  }
}
