import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Character } from '../character';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-load',
  templateUrl: './character-load.component.html',
  styleUrls: ['./character-load.component.sass'],
})
export class CharacterLoadComponent {
  savedCharacters!: Character[];
  selectedCharacter: string | null = null;
  file!: File | null;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private characterService: CharacterService,
    public dialogRef: MatDialogRef<CharacterLoadComponent>
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.savedCharacters = JSON.parse(localStorage.getItem('chracters')!)?.sort(
      (a: any, b: any) => a.name.localeCompare(b.name)
    );
    if (!this.savedCharacters) {
      this.savedCharacters = [];
    }
    this.selectedCharacter = this.savedCharacters[0]?.name
      ? this.savedCharacters[0]?.name
      : null;
  }

  loadFromFile(event: any): void {
    this.file = event.target.files[0];
    if (this.file) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.characterService.sendCharacterUpdates(
          JSON.parse(fileReader.result?.toString()!)
        );
        this.characterService.sendActionCompleted('Personaje cargado');
        this.dialogRef.close();
      };
      fileReader.readAsText(this.file);
    }
  }

  loadCharacter(): void {
    this.characterService.sendCharacterUpdates(
      this.savedCharacters.find(
        (char) =>
          char.name ==
          (this.selectedCharacter != 'null' ? this.selectedCharacter : null)
      )!
    );
    this.characterService.sendActionCompleted('Personaje cargado');
    this.dialogRef.close();
  }

  resetFile(event: any): void {
    event.target.value = null;
    this.file = null;
  }
}
