import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../character.type';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { CharacterLoadComponent } from '../character-load/character-load.component';
import { RulesComponent } from '../rules/rules.component';
import { PrintComponent } from '../print/print.component';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.sass'],
})
export class AppMenuComponent implements OnInit, OnDestroy {
  @Input() index!: number;
  character!: Character;
  characterSub!: Subscription;
  savedCharacters!: Character[];
  characterLoaded!: Subscription;
  fileUrl: any;

  constructor(
    private characterService: CharacterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.characterSub = this.characterService
      .getCharacter()
      .subscribe((character: Character) => {
        this.character = character;
      });
  }

  ngOnDestroy(): void {
    this.characterSub.unsubscribe();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CharacterLoadComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openRulesDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(RulesComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openPrintDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(PrintComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  save(): void {
    this.savedCharacters = JSON.parse(localStorage.getItem('chracters')!);
    if (!this.savedCharacters) {
      this.savedCharacters = [];
      this.savedCharacters.push(this.character);
    } else {
      let charFound = this.savedCharacters.findIndex(
        (char) => char.name == this.character.name
      );
      charFound >= 0
        ? (this.savedCharacters[charFound] = this.character)
        : this.savedCharacters.push(this.character);
    }
    localStorage.setItem('chracters', JSON.stringify(this.savedCharacters));
    this.characterService.sendActionCompleted('Personaje guardado');
  }

  download(): void {
    const blob = new Blob([JSON.stringify(this.character)], {
      type: 'text/plain',
    });
    saveAs(blob, this.character.name + '.txt');
  }
}
