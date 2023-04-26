import { Component, Input } from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'app-character-lore',
  templateUrl: './character-lore.component.html',
  styleUrls: ['./character-lore.component.sass'],
})
export class CharacterLoreComponent {
  @Input() character!: Character;
}
