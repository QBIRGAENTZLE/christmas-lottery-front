import { Injectable } from '@angular/core';

import { filter } from 'lodash';

import { Theme } from '../models/theme';

import { JsonService } from '../providers/json.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themesList: Theme[];
  private adultThemesList: Theme[];
  private childThemesList: Theme[];

  constructor(
    private jsonService: JsonService
  ) { }

  public reset = (): void => {
    this.themesList = [];
    this.adultThemesList = [];
    this.childThemesList = [];
  }


  public loadThemeList = (): void => {
    this.jsonService.getJsonFile('themes').then((jsonTheme) => {
      this.themesList = jsonTheme;

      this.adultThemesList = filter(this.themesList, (theme) => {
        return !theme.childTheme;
      });
      this.childThemesList = filter(this.themesList, (theme) => {
        return theme.childTheme;
      });
    });
  }

  public getAdultThemesList = (): Theme[] => {
    return this.adultThemesList;
  }

  public getChildThemesList = (): Theme[] => {
    return this.childThemesList;
  }

}
