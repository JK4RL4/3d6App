import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterService } from '../character.service';
import { Character } from '../character.type';

@Component({
  selector: 'app-character-spells',
  templateUrl: './character-spells.component.html',
  styleUrls: ['./character-spells.component.sass'],
})
export class CharacterSpellsComponent implements OnInit, OnDestroy {
  character!: Character;
  characterSub!: Subscription;

  constructor(private characterService: CharacterService) {}

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
}
