import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// EXTERNAL IMPORTS
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

// PROVIDERS IMPORTS
import { GameService } from './providers/game.service';
import { PeopleService } from './providers/people.service';
import { ThemeService } from './providers/theme.service';

// ROUTES IMPORT
import { APP_ROUTES } from './app.routes';

// COMPONENTS IMPORTS
import { AppComponent } from './app.component';
import { PeoplePickerComponent } from './components/people-picker/people-picker.component';
import { StartComponent } from './components/start/start.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    PeoplePickerComponent,
    StartComponent,
    ThemePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule.forRoot(APP_ROUTES, {
      useHash: true
    }),
  ],
  providers: [
    GameService,
    PeopleService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
