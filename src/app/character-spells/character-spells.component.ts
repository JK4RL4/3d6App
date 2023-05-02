import { Component, Input } from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'app-character-spells',
  templateUrl: './character-spells.component.html',
  styleUrls: ['./character-spells.component.sass'],
})
export class CharacterSpellsComponent {
  @Input() character!: Character;
}
