import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import {
  Character,
  SKILLS,
  GEAR,
  WEAPON_SIZES,
  WEAPON_RANGES,
  WEAPON_QUALITIES,
  WEAPON_DAMAGES,
  NATURE,
} from '../character';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.sass'],
})
export class CharacterCreatorComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @Input() character!: Character;
  NATURE = NATURE?.sort((a: string, b: string) => a.localeCompare(b));
  SKILLS = SKILLS;
  GEAR = GEAR;
  WEAPON = {
    size: WEAPON_SIZES,
    range: WEAPON_RANGES,
    quality: WEAPON_QUALITIES,
    damageType: WEAPON_DAMAGES,
  };
  hideWeapon: boolean[] = [true];
  hideSpell: boolean[] = [true];

  newSkill(): void {
    this.character.skills.push({ name: this.SKILLS[0].name, rank: '0' });
  }

  newWeapon(): void {
    this.character.weapons.push({
      name: null,
      size: null,
      range: null,
      quality: null,
      damageType: [],
      impactAtt: null,
      damageAtt: null,
    });
    this.hideWeapon.push(true);
  }

  newSpell(): void {
    this.character.spells.push({
      name: null,
      type: null,
      description: null,
      cost: null,
      lost: null,
    });
    this.hideSpell.push(true);
  }
}
