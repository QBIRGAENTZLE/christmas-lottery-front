import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';

import { Theme } from '../../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themesList: Theme[];

  constructor(
    private httpService: HttpService
  ) { }

  public reset = (): void => {
    this.themesList = [];
  }


  public loadThemeList(): void {
    this.httpService.getAll('themes').then((list: Theme[]) => {
      this.themesList = list;
    });
  }

  public getAdultThemesList(): Theme[] {
    return this.themesList.filter(t => {
      return !t.childTheme;
    });
  }

  public getChildThemesList(): Theme[] {
    return this.themesList.filter(t => {
      return t.childTheme;
    });
  }

}
