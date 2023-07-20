import { Component, ViewChild, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { Character, Spell, Weapon, Skill } from '../character.type';
import {
  SKILLS,
  GEAR,
  WEAPON_SIZES,
  WEAPON_RANGES,
  WEAPON_QUALITIES,
  WEAPON_DAMAGES,
  NATURE,
  ATTRIBUTES,
} from '../character.const';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.sass'],
})
export class CharacterCreatorComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  character!: Character;
  characterSub!: Subscription;
  readonly NATURE = NATURE?.sort((a: string, b: string) => a.localeCompare(b));
  readonly ATTRIBUTES = ATTRIBUTES;
  readonly SKILLS = SKILLS;
  readonly GEAR = GEAR;
  readonly WEAPON = {
    size: WEAPON_SIZES,
    range: WEAPON_RANGES,
    quality: WEAPON_QUALITIES,
    damageType: WEAPON_DAMAGES,
  };
  hideWeapon: boolean[] = [true];
  hideSpell: boolean[] = [true];

  constructor(public characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterSub = this.characterService
      .getCharacter()
      .subscribe((character: Character) => {
        this.character = character;
      });
  }

  newSkill(): void {
    this.character?.skills?.push(new Skill());
  }

  newWeapon(): void {
    this.character?.weapons?.push(new Weapon());
    this.hideWeapon.push(true);
  }

  newSpell(): void {
    this.character?.spells?.push(new Spell());
    this.hideSpell.push(true);
  }
}
