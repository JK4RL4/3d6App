import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../character';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { CharacterLoadComponent } from '../character-load/character-load.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.sass'],
})
export class AppMenuComponent {
  @Input() editMode!: boolean;
  @Input() character!: Character;
  savedCharacters!: Character[];
  characterLoaded!: Subscription;
  fileUrl: any;

  constructor(private dialog: MatDialog) {}

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
  }

  download(): void {
    const blob = new Blob([JSON.stringify(this.character)], {
      type: 'text/plain',
    });
    saveAs(blob, this.character.name + '.txt');
  }
}
