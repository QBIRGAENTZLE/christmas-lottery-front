import { Injectable } from '@angular/core';

import { findIndex } from 'lodash';

import { JsonService } from './json.service';
import { PeopleService } from './people.service';
import { ThemeService } from './theme.service';

import { People } from '../models/people';
import { Theme } from '../models/theme';

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
    private jsonService: JsonService,
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

  public pickPeople = (): Promise<People> => {

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
    this.jsonService.getJsonFile('peoples').then(peopleList => {

      const indexPeoplePicked = findIndex(peopleList, people => {
        return people.id === this.peoplePicked.id;
      });
      peopleList[indexPeoplePicked].isPicked = true;

      const indexGamer = findIndex(peopleList, people => {
        return people.id === this.currentGamer.id;
      });
      peopleList[indexGamer].peoplePicked = peoplePicked.name;

      this.jsonService.saveJsonFile(peopleList);

    });
  }

  private pick = (): People => {
    do {
      this.peoplePicked = this.peopleList[Math.floor(Math.random() * this.peopleList.length)];
    }
    while (
      this.peoplePicked.id === this.currentGamer.id || this.peoplePicked.isPicked ||
      (!this.mustPickCantPickPeople && this.currentGamer.cantPick.includes(this.peoplePicked.id))
    );

    return this.peoplePicked;
  }

  private checkWhoCanPick = (): void => {
    for (const people of this.peopleList) {

      if (people.id !== this.currentGamer.id && !people.isPicked && !this.currentGamer.cantPick.includes(people.id)) {
        this.mustPickCantPickPeople = false;
        break;
      }
    }
  }

  public pickThemes = (): string[] => {
    if (this.currentGamer.isChild) {
      this.themesList = this.themeService.getChildThemesList();
    } else {
      this.themesList = this.themeService.getAdultThemesList();
    }

    const firstTheme = this.themesList[Math.floor(Math.random() * this.themesList.length)].name;
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
    this.jsonService.getJsonFile('peoples').then(peopleList => {

      const indexGamer = findIndex(peopleList, people => {
        return people.id === this.currentGamer.id;
      });
      peopleList[indexGamer].themesPicked = this.themesPicked;

      this.jsonService.saveJsonFile(peopleList);

    });
  }

  public setGamer = (people: People): void => {
    this.currentGamer = people;
  }
}
