export class Theme {

  name: string;
  childTheme: boolean;

  constructor(theme) {
    this.name = theme.name;
    this.childTheme = theme.childTheme;
  }
}
