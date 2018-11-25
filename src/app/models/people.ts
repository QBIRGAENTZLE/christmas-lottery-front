import { Theme } from './theme';

export class People {

  id: number;
  name: string;
  peoplePicked: string;
  isPicked: boolean;
  cantPick: number[];
  themesPicked: string[];
  isChild: boolean;

  constructor(people) {
    this.id = people.id;
    this.name = people.name;
    this.peoplePicked = people.peoplePicked;
    this.isPicked = people.isPicked;
    this.cantPick = people.cantPick;
    this.themesPicked = people.themesPicked;
    this.isChild = people.isChild;
  }
}
