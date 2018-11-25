import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { GameService } from '../../providers/game.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {

  public disableButton = false;

  public themesPicked: string[];
  public showThemesPicked = false;

  constructor(
    private gameService: GameService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public pickThemes = (): void => {
    this.disableButton = true;
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.showThemesPicked = true;
      this.themesPicked = this.gameService.pickThemes();
      this.spinner.hide();
    }, 5000);
  }

  public backHome = (): void => {
    this.router.navigate(['/']);
  }

}
