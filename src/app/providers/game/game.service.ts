import { Injectable } from '@angular/core';

import { findIndex } from 'lodash';

import { HttpService } from '../http/http.service';
import { PeopleService } from '../people/people.service';
import { ThemeService } from '../theme/theme.service';

import { People } from '../../models/people';
import { Theme } from '../../models/theme';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private currentGamer: People;
  private peopleList: People[];
  private peoplePicked: People;

  private themesList: Theme[];
  private themesPicked: string[] = [];

  private mustPickCantPickPeople = true;

  constructor(
    private httpService: HttpService,
    private peopleService: PeopleService,
    private themeService: ThemeService
  ) {
  }

  public reset = (): void => {
    this.peopleList = [];
    this.currentGamer = null;
    this.peoplePicked = null;
    this.mustPickCantPickPeople = true;
    this.themesList = [];
    this.themesPicked = [];
  }

  public async pickPeople(): Promise<People> {
    if (this.currentGamer.isChild) {
      return this.peopleService.getChildList().then(childList => {
        this.peopleList = childList;
        this.checkWhoCanPick();
        const peoplePicked = this.pick();
        this.savePeoplePicked(peoplePicked);
        return peoplePicked;
      });
    } else {
      return this.peopleService.getAdultList().then(adultList => {
        this.peopleList = adultList;
        this.checkWhoCanPick();
        const peoplePicked = this.pick();
        this.savePeoplePicked(peoplePicked);
        return peoplePicked;
      });
    }
  }

  private savePeoplePicked = (peoplePicked: People): void => {
    this.currentGamer.peoplePicked = peoplePicked.name;
    peoplePicked.isPicked = true;

    this.httpService.savePeoplePicked(this.currentGamer, peoplePicked);
  }

  private pick = (): People => {
    do {
      this.peoplePicked = this.peopleList[Math.floor(Math.random() * this.peopleList.length)];
    }
    while (
      this.peoplePicked._id === this.currentGamer._id || this.peoplePicked.isPicked ||
      (!this.mustPickCantPickPeople && this.currentGamer.cantPick.includes(this.peoplePicked._id))
    );

    return this.peoplePicked;
  }

  private checkWhoCanPick = (): void => {
    for (const people of this.peopleList) {
      if (people._id !== this.currentGamer._id && !people.isPicked && !this.currentGamer.cantPick.includes(people._id)) {
        this.mustPickCantPickPeople = false;
        break;
      }
    }
  }

  public pickThemes(): string[] {
    if (this.currentGamer.isChild) {
      this.themesList = this.themeService.getChildThemesList();
    } else {
      this.themesList = this.themeService.getAdultThemesList();
    }

    let firstTheme: string

    if (this.currentGamer.peoplePicked === 'Christelle') {
      firstTheme = 'Bricolage / Jardinage'
    } else {
      firstTheme = this.themesList[Math.floor(Math.random() * this.themesList.length)].name;
    }

    this.themesPicked.push(firstTheme);

    if (!this.currentGamer.isChild) {
      let secondTheme: string;
      do {
        secondTheme = this.themesList[Math.floor(Math.random() * this.themesList.length)].name;
      }
      while (secondTheme === firstTheme);

      this.themesPicked.push(secondTheme);
    }

    this.saveThemesPicked();

    return this.themesPicked;
  }

  private saveThemesPicked = (): void => {
    this.currentGamer.themesPicked = this.themesPicked;

    this.httpService.saveThemePicked(this.currentGamer);
  }

  public setGamer = (people: People): void => {
    this.currentGamer = people;
  }
}
