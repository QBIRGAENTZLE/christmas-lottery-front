import { Routes } from '@angular/router';

import { StartComponent } from './components/start/start.component';
import { PeoplePickerComponent } from './components/people-picker/people-picker.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

export const APP_ROUTES: Routes = [
  { path: '', component: StartComponent },
  { path: 'pick/people', component: PeoplePickerComponent },
  { path: 'pick/theme', component: ThemePickerComponent },
];
