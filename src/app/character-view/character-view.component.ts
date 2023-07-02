import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterService } from '../character.service';
import {
  ATTRIBUTES,
  GEAR,
  SKILLS,
  WEAPON_DAMAGES,
  WEAPON_QUALITIES,
  WEAPON_RANGES,
  WEAPON_SIZES,
} from '../character.const';
import { Character } from '../character.type';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.sass'],
})
export class CharacterViewComponent implements OnInit, OnDestroy {
  character!: Character;
  characterSub!: Subscription;

  readonly GEAR = GEAR;
  readonly SIZES = WEAPON_SIZES;
  readonly RANGES = WEAPON_RANGES;
  readonly QUALITIES = WEAPON_QUALITIES;
  readonly DAMAGES = WEAPON_DAMAGES;
  readonly SKILLS = SKILLS;
  readonly ATTRIBUTES = ATTRIBUTES;

  maxHealth!: number;
  maxEnergy!: number;
  speed!: number;
  perception!: number;
  will!: number;
  currentWeapon!: any;
  currentWeaponIndex!: string | null;
  weaponDefense!: number;
  shieldDefense!: number;
  defense!: number;

  parsedSkills!: { name: string; rank: number }[];
  parseInt = parseInt;
  String = String;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterSub = this.characterService
      .getCharacter()
      .subscribe((character: Character) => {
        this.character = character;
        this.currentWeaponIndex =
          this.character?.weapons?.length! > 0 ? '0' : null;
        this.currentWeapon = this.currentWeaponIndex
          ? this.character?.weapons![0]
          : null;
        this.calculateCharPasives();
        this.calculateCharStats();
        this.setFight();
        this.updateWeapon(0);
      });
  }

  ngOnDestroy(): void {
    this.characterSub.unsubscribe();
  }

  updateHealth(x: number): void {
    this.character.health! += x;
    if (this.character.health! < 0) {
      this.character.health = 0;
    }
  }

  updateEnergy(x: number): void {
    this.character.energy! += x;
    if (this.character.energy! < 0) {
      this.character.energy = 0;
    }
  }

  updateDestiny(x: number): void {
    this.character.destiny! += x;
    if (this.character.destiny! < 0) {
      this.character.destiny = 0;
    }
  }

  calculateCharPasives(): void {
    // Alerta
    let alert = this.character.skills?.find(
      (skill) => skill?.name?.toUpperCase() == 'ALERTA'
    )?.rank!;
    // Penalización de casco
    let helmetPen =
      this.character.attributes['strength'] -
      this.GEAR.helmet.find(
        (helmet) => helmet.name == this.character?.gear?.helmet
      )?.strength!;
    // Penalización de armadura
    let armorPen =
      this.character.attributes['strength'] -
      this.GEAR.armor.find((armor) => armor.name == this.character?.gear?.armor)
        ?.strength!;
    // Penalización de escudo
    let shieldPen =
      this.character.attributes['strength'] -
      this.GEAR.shield.find(
        (shield) => shield.name == this.character?.gear?.shield
      )?.strength!;
    // Armadura
    let armor = this.GEAR.armor.find(
      (armor) => armor.name == this.character?.gear?.armor
    )?.defense!;
    // Escudo
    let shield = this.GEAR.shield.find(
      (shield) => shield.name == this.character?.gear?.shield
    )?.defense!;
    // Armas cuerpo a cuerpo
    let cc = this.character?.skills?.find(
      (skill) => skill?.name?.toUpperCase() == 'ARMAS CUERPO A CUERPO'
    )?.rank!;

    // Pelea
    let fight = this.character?.skills?.find(
      (skill) => skill?.name?.toUpperCase() == 'PELEA'
    )?.rank!;

    // Modificador de tamaño
    let sizeMod = this.SIZES.find(
      (size) => size.size == this.currentWeapon?.size
    )?.def;
    // Modificador de calidad
    let qualityMod = this.QUALITIES.find(
      (quality) => quality.quality == this.currentWeapon?.quality
    )?.def;
    // Percepción
    this.perception =
      8 +
      this.character.attributes['wisdom'] +
      (helmetPen < 0 ? helmetPen : 0) +
      (alert > 0 ? alert : 0);
    // Voluntad
    this.will =
      8 +
      Math.round(
        (this.character.attributes['wisdom'] * 2 +
          this.character.attributes['intelligence'] +
          this.character.attributes['strength']) /
          2
      );
    // Velocidad
    this.speed =
      this.character.attributes['dexterity'] * 2 +
      this.character.attributes['intelligence'] +
      (armorPen < 0 ? armorPen : 0) +
      (shieldPen < 0 ? shieldPen : 0);
    // Defensa con arma
    let weaponDefense = (sizeMod ? sizeMod : 0) + (qualityMod ? qualityMod : 0);
    this.weaponDefense =
      this.currentWeapon &&
      this.currentWeapon.range?.toUpperCase().includes('MELÉ')
        ? Math.round(
            weaponDefense *
              Math.round(
                (this.character.attributes['dexterity'] +
                  (this.currentWeapon.name.toUpperCase() == 'SIN ARMA'
                    ? fight
                      ? fight
                      : 0
                    : cc
                    ? cc
                    : 0)) /
                  10
              )
          )
        : 0;
    if (this.weaponDefense < 0) {
      this.weaponDefense = 0;
    }
    // Defensa con escudo
    this.shieldDefense =
      shield > 0
        ? Math.round(
            shield *
              Math.round(
                (this.character.attributes['dexterity'] + (cc ? cc : 0)) / 10
              )
          ) - shieldPen
        : 0;
    if (this.shieldDefense < 0) {
      this.shieldDefense = 0;
    }
    // Defensa
    this.defense = armor ? armor : 0;
  }

  calculateCharStats(): void {
    this.maxHealth = this.character.attributes['constitution'] * 10;
    this.character.health = this.maxHealth;
    this.maxEnergy =
      this.character.attributes['strength'] * 3 +
      this.character.attributes['constitution'] * 2 +
      this.character.attributes['dexterity'] * 2;
    this.character.energy = this.maxEnergy;
  }

  updateWeapon(weaponIndex: any): void {
    this.currentWeapon = this.character?.weapons![weaponIndex];

    if (this.currentWeapon) {
      // Calidad de arma
      let weaponQuality = this.QUALITIES.find(
        (quality) => quality.quality == this.currentWeapon.quality
      );
      // Tamaño de arma
      let weaponSize = this.SIZES.find(
        (size) => size.size == this.currentWeapon.size
      );
      // Cuerpo a cuerpo
      let cc = this.character?.skills?.find(
        (skill) => skill.name?.toUpperCase() == 'ARMAS CUERPO A CUERPO'
      )?.rank!;
      // Pelea
      let fight = this.character?.skills?.find(
        (skill) => skill?.name?.toUpperCase() == 'PELEA'
      )?.rank!;
      // A distancia
      let ad = this.character?.skills?.find(
        (skill) => skill?.name?.toUpperCase() == 'ARMAS A DISTANCIA'
      )?.rank!;
      // Impactar
      let hit = !this.currentWeapon.range?.toUpperCase().includes('MELÉ')
        ? ad
        : this.currentWeapon.name?.toUpperCase() == 'SIN ARMA'
        ? fight
        : cc;
      // Energía
      this.currentWeapon.energy = 2 + weaponSize?.energy!;
      // Impacto
      this.currentWeapon.impact =
        8 +
        this.character.attributes[this.currentWeapon.impactAtt] +
        (hit ? hit : 0) +
        weaponQuality?.hit! +
        (weaponSize?.hit! +
          Math.round(this.character.attributes['strength'] / 2) >=
        0
          ? 0
          : weaponSize?.hit! +
            Math.round(this.character.attributes['strength'] / 2));
      // Daño
      this.currentWeapon.damage =
        4 +
        (this.character.attributes[this.currentWeapon.damageAtt]
          ? this.character.attributes[this.currentWeapon.damageAtt]
          : 0) +
        weaponSize?.damage! +
        weaponQuality?.damage!;
      // Efectos
      let effects: { type: string; rank: number }[] = [];
      this.currentWeapon.effects = [];
      this.currentWeapon.damageType.forEach((damage: any) => {
        let typeEffects = this.DAMAGES.find(
          (type) => type.type.toUpperCase() == damage.toUpperCase()
        );
        effects = effects.concat(
          JSON.parse(JSON.stringify(typeEffects?.effects!))
        );
      });
      effects.forEach((effect) => {
        if (
          !this.currentWeapon.effects.some(
            (weaponEffect: { type: string; rank: number }) =>
              weaponEffect.type == effect.type
          )
        ) {
          let typeEffects = effects.filter(
            (filteredEffect) => filteredEffect.type == effect.type
          );
          let bestEffect = Math.min(...typeEffects.map((item) => item.rank));
          this.currentWeapon.effects.push(
            typeEffects.find((typeEffect) => typeEffect.rank == bestEffect)
          );
          this.currentWeapon.effects[
            this.currentWeapon.effects.length - 1
          ].rank +=
            (weaponSize?.effects ? weaponSize?.effects : 0) +
            (weaponQuality?.effects ? weaponQuality?.effects : 0);
        }
      });
    }
  }

  setFight(): void {
    if (!this.character?.weapons?.some((weapon) => weapon.name == 'Sin arma')) {
      this.character?.weapons?.push({
        name: 'Sin arma',
        size: 'pequeño',
        range: 'melé(1)',
        quality: 'estándar',
        damageType: ['Contundente'],
        impactAtt: 'dexterity',
        damageAtt: 'strength',
      });
    }
  }
}
