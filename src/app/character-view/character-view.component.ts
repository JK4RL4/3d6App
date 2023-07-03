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

  // Vida y energía
  maxHealth!: number;
  maxEnergy!: number;

  // Pasivas
  speed!: number;
  perception!: number;
  will!: number;

  // Arma
  currentWeapon!: any;
  currentWeaponIndex!: string | null;

  // Estadísticas intermedias
  weaponDefense!: number;
  shieldDefense!: number;
  defense!: number;
  alert!: number;
  helmetPen!: number;
  armorPen!: number;
  shieldPen!: number;
  armor!: number;
  shield!: number;
  cc!: number;
  fight!: number;
  sizeMod!: number;
  qualityMod!: number;

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

  getCharIntermediateStats(): void {
    // Alerta
    this.alert = this.character.skills?.find(
      (skill) => skill?.name?.toUpperCase() == 'ALERTA'
    )?.rank!;
    // Penalización de casco
    this.helmetPen =
      this.character.attributes['strength'] -
      this.GEAR.helmet.find(
        (helmet) => helmet.name == this.character?.gear?.helmet
      )?.strength!;
    // Penalización de armadura
    this.armorPen =
      this.character.attributes['strength'] -
      this.GEAR.armor.find((armor) => armor.name == this.character?.gear?.armor)
        ?.strength!;
    // Penalización de escudo
    this.shieldPen =
      this.character.attributes['strength'] -
      this.GEAR.shield.find(
        (shield) => shield.name == this.character?.gear?.shield
      )?.strength!;
    // Armadura
    this.armor = this.GEAR.armor.find(
      (armor) => armor.name == this.character?.gear?.armor
    )?.defense!;
    // Escudo
    this.shield = this.GEAR.shield.find(
      (shield) => shield.name == this.character?.gear?.shield
    )?.defense!;
    // Armas cuerpo a cuerpo
    this.cc = this.character?.skills?.find(
      (skill) => skill?.name?.toUpperCase() == 'ARMAS CUERPO A CUERPO'
    )?.rank!;
    // Pelea
    this.fight = this.character?.skills?.find(
      (skill) => skill?.name?.toUpperCase() == 'PELEA'
    )?.rank!;
    // Modificador de tamaño
    this.sizeMod = this.SIZES.find(
      (size) => size.size == this.currentWeapon?.size
    )?.def!;
    // Modificador de calidad
    this.qualityMod = this.QUALITIES.find(
      (quality) => quality.quality == this.currentWeapon?.quality
    )?.def!;
  }

  calculateCharPasives(): void {
    // Percepción
    this.perception =
      8 +
      this.character.attributes['wisdom'] +
      (this.helmetPen < 0 ? this.helmetPen : 0) +
      (this.alert > 0 ? this.alert : 0);
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
      (this.armorPen < 0 ? this.armorPen : 0) +
      (this.shieldPen < 0 ? this.shieldPen : 0);
    // Defensa con arma
    let weaponDefense =
      (this.sizeMod ? this.sizeMod : 0) +
      (this.qualityMod ? this.qualityMod : 0);
    this.weaponDefense =
      this.currentWeapon &&
      this.currentWeapon.range?.toUpperCase().includes('MELÉ')
        ? Math.round(
            weaponDefense *
              Math.round(
                (this.character.attributes['dexterity'] +
                  (this.currentWeapon.name.toUpperCase() == 'SIN ARMA'
                    ? this.fight
                      ? this.fight
                      : 0
                    : this.cc
                    ? this.cc
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
      this.shield > 0
        ? Math.round(
            this.shield *
              Math.round(
                (this.character.attributes['dexterity'] +
                  (this.cc ? this.cc : 0)) /
                  10
              )
          ) - this.shieldPen
        : 0;
    if (this.shieldDefense < 0) {
      this.shieldDefense = 0;
    }
    // Defensa
    this.defense = this.armor ? this.armor : 0;
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
      // A distancia
      let ad = this.character?.skills?.find(
        (skill) => skill?.name?.toUpperCase() == 'ARMAS A DISTANCIA'
      )?.rank!;
      // Impactar
      let hit = !this.currentWeapon.range?.toUpperCase().includes('MELÉ')
        ? ad
        : this.currentWeapon.name?.toUpperCase() == 'SIN ARMA'
        ? this.fight
        : this.cc;
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
