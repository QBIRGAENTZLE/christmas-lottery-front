import { Component } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { GameService } from '../../providers/game/game.service';

import { People } from '../../models/people';

@Component({
  selector: 'app-people-picker',
  templateUrl: './people-picker.component.html',
  styleUrls: ['./people-picker.component.scss']
})
export class PeoplePickerComponent {

  public disableButton = false;

  public peoplePicked: People;
  public showPicked = false;

  constructor(
    private gameService: GameService,
    private spinner: NgxSpinnerService
  ) { }

  public pick = (): void => {
    this.disableButton = true;
    this.spinner.show();
    this.showPicked = false;

    this.gameService.pickPeople().then(peoplePicked => {
      this.peoplePicked = peoplePicked;

      setTimeout(() => {

        this.showPicked = true;
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
    });


  }

}
