import { Injectable } from '@angular/core';

import { People } from '../../models/people';
import { HttpService } from '../http/http.service';

import * as accents from 'remove-accents';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private peopleList: People[] = [];

  constructor(
    private httpService: HttpService
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
    const people = this.peopleList.find(p => {
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
    const people = this.peopleList.find(p => {
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

  public async getAdultList(): Promise<People[]> {
    await this.loadPeopleList();

    return this.peopleList.filter(p => {
      return !p.isChild;
    });
  }

  public async getChildList(): Promise<People[]> {
    await this.loadPeopleList();

    return this.peopleList.filter(p => {
      return p.isChild;
    });
  }

  public async loadPeopleList(): Promise<boolean> {
    return this.httpService.getAll('peoples').then((list: People[]) => {
      this.peopleList = list;

      return new Promise(resolve => {
        resolve(true);
      });
    });
  }
}
