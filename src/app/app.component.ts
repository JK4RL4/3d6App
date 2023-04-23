import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Character, EMPTY_CHARACTER } from './character';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = '3d6App';
  selectedLanguage = 'es';
  character: Character = JSON.parse(JSON.stringify(EMPTY_CHARACTER));
  editMode: boolean = true;
  characterUpdates!: Subscription;
  actionCompleted!: Subscription;
  actionCompletedTex!: string;

  constructor(
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
        this.actionCompletedTex = action;
        setTimeout(() => {
          this.actionCompletedTex = '';
        }, 1500);
      });
  }

  ngOnDestroy(): void {
    this.characterUpdates.unsubscribe();
    this.actionCompleted.unsubscribe();
  }

  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
