import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../providers/game.service';
import { PeopleService } from '../../providers/people.service';
import { ThemeService } from '../../providers/theme.service';

import { People } from '../../models/people';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  public gamer: string;
  private peopleGamer: People;

  public nameInvalid = false;
  public alreadyPlay = false;

  constructor(
    private gameService: GameService,
    private peopleService: PeopleService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.peopleService.reset();
    this.themeService.reset();
    this.gameService.reset();

    this.peopleService.setPeopleList();
    this.themeService.loadThemeList();
  }

  public play = (): void => {
    this.nameInvalid = false;
    this.alreadyPlay = false;

    if (this.gamer && this.gamer.length > 0) {
      if (this.peopleService.isNameValid(this.gamer)) {
        this.peopleGamer = this.peopleService.getPeopleFromName(this.gamer);
        if (this.peopleService.canPeoplePlay(this.peopleGamer)) {
          this.gameService.setGamer(this.peopleGamer);
          this.router.navigate(['pick/people']);
        } else {
          this.alreadyPlay = true;
        }
      } else {
        this.nameInvalid = true;
      }
    }
  }

}
