import { Component, EventEmitter, Output } from '@angular/core';
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
  selectedCharacter!: string;

  constructor(
    private characterService: CharacterService,
    public dialogRef: MatDialogRef<CharacterLoadComponent>
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.savedCharacters = JSON.parse(localStorage.getItem('chracters')!);
    if (!this.savedCharacters) {
      this.savedCharacters = [];
    }
    this.selectedCharacter = this.savedCharacters[0].name;
  }

  loadFromFile(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.characterService.sendCharacterUpdates(
          JSON.parse(fileReader.result?.toString()!)
        );
      };
      fileReader.readAsText(file);
    }
  }

  loadCharacter(): void {
    this.characterService.sendCharacterUpdates(
      this.savedCharacters.find((char) => char.name == this.selectedCharacter)!
    );
  }
}
