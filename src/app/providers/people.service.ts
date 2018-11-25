import { Injectable } from '@angular/core';

import { find, filter } from 'lodash';

import { People } from '../models/people';

import { JsonService } from '../providers/json.service';

import * as accents from 'remove-accents';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private peopleList: People[] = [];

  constructor(
    private jsonService: JsonService
  ) {
  }

  public reset = (): void => {
    this.peopleList = [];
  }

  private sanitizeName = (name: string): string => {
    let tmpName = name;
    tmpName = tmpName.toLowerCase();

    if (accents.has(tmpName)) {
      tmpName = accents.remove(tmpName);
    }

    return tmpName;
  }

  public isNameValid = (name: string): boolean => {
    const people = find(this.peopleList, p => {
      return this.sanitizeName(p.name) === this.sanitizeName(name);
    });

    if (people) {
      return true;
    } else {
      return false;
    }
  }

  public canPeoplePlay = (people: People): boolean => {
    if (people.peoplePicked) {
      return false;
    } else {
      return true;
    }
  }

  public getPeopleFromName = (name: string): People => {
    const people = find(this.peopleList, p => {
      return this.sanitizeName(p.name) === this.sanitizeName(name);
    });

    if (people) {
      return people;
    } else {
      return null;
    }
  }

  public getPeopleList = (): People[] => {
    return this.peopleList;
  }

  public getAdultList = (): Promise<People[]> => {
    return this.jsonService.getJsonFile('peoples').then(jsonPeople => {
      const tmpPeopleList = jsonPeople;
      return filter(tmpPeopleList, (people) => {
        return !people.isChild;
      });
    });
  }

  public getChildList = (): Promise<People[]> => {
    return this.jsonService.getJsonFile('peoples').then(jsonPeople => {
      const tmpPeopleList = jsonPeople;
      return filter(tmpPeopleList, (people) => {
        return people.isChild;
      });
    });
  }

  public setPeopleList = (): void => {
    this.jsonService.getJsonFile('peoples').then((jsonPeople) => {
      this.peopleList = jsonPeople;
    });

  }
}
