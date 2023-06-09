import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Character } from './character.type';
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
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = '3d6App';
  selectedLanguage = 'es';
  index: number = 0;
  actionCompleted!: Subscription;
  faWandSparkles = faWandSparkles;
  faPen = faPen;
  faDice = faDice;
  faScroll = faScroll;
  character = new Character();
  characterSub!: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private characterService: CharacterService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.actionCompleted = this.characterService
      .getActionCompleted()
      .subscribe((action: string) => {
        this.snackBar.open(action);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 1000);
      });

    this.characterSub = this.characterService
      .getCharacter()
      .subscribe((character: Character) => {
        this.character = character;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.characterService.sendCharacter(this.character), 0);
  }

  ngOnDestroy(): void {
    this.characterSub.unsubscribe();
    this.actionCompleted.unsubscribe();
  }

  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }

  updateCharacter(e: any): void {
    this.index = e.index;
  }

  tabUpdate(): void {
    this.characterService.sendCharacter(this.character);
  }
}
