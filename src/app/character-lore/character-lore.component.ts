import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../character.type';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-lore',
  templateUrl: './character-lore.component.html',
  styleUrls: ['./character-lore.component.sass'],
})
export class CharacterLoreComponent implements OnInit, OnDestroy {
  character!: Character;
  characterSub!: Subscription;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterSub = this.characterService
      .getCharacter()
      .subscribe((character: Character) => (this.character = character));
  }

  ngOnDestroy(): void {
    this.characterSub.unsubscribe();
  }
}
