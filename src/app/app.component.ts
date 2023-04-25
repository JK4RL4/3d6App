import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Character, EMPTY_CHARACTER } from './character';
import { CharacterService } from './character.service';
import {
  faWandSparkles,
  faPen,
  faDice,
  faScroll,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = '3d6App';
  selectedLanguage = 'es';
  character: Character = JSON.parse(JSON.stringify(EMPTY_CHARACTER));
  index: number = 0;
  characterUpdates!: Subscription;
  actionCompleted!: Subscription;
  faWandSparkles = faWandSparkles;
  faPen = faPen;
  faDice = faDice;
  faScroll = faScroll;

  constructor(
    private snackBar: MatSnackBar,
    private characterService: CharacterService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.characterUpdates = this.characterService
      .getCharacterUpdates()
      .subscribe((character: Character) => {
        character
          ? (this.character = character)
          : (this.character = JSON.parse(JSON.stringify(EMPTY_CHARACTER)));
      });

    this.actionCompleted = this.characterService
      .getActionCompleted()
      .subscribe((action: string) => {
        this.snackBar.open(action);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 1000);
      });
  }

  ngOnDestroy(): void {
    this.characterUpdates.unsubscribe();
    this.actionCompleted.unsubscribe();
  }

  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }

  updateCharacter(e: any): void {
    this.index = e.index;
    if (e.index != 0) {
      this.character = JSON.parse(JSON.stringify(this.character));
    }
  }
}
