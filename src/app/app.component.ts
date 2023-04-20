import { Component, OnInit } from '@angular/core';

// Translate
import { TranslateService } from '@ngx-translate/core';

import { Character, EMPTY_CHARACTER } from './character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = '3d6App';
  selectedLanguage = 'es';
  character: Character = JSON.parse(JSON.stringify(EMPTY_CHARACTER));
  editMode: boolean = true;

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }

  ngOnInit(): void {}

  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
