import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { People } from '../../models/people';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:3000';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public getAll(model: string): Promise<Object> {
    return this.http.get(`${this.url}/${model}`).toPromise();
  }

  public savePeoplePicked(gamer: People, picked: People): Promise<Object> {
    return this.http.put(`${this.url}/save-people-picked`, [gamer, picked], this.httpOptions).toPromise();
  }

  public saveThemePicked(gamer: People): Promise<Object> {
    return this.http.put(`${this.url}/save-theme-picked`, [gamer], this.httpOptions).toPromise();
  }
}
