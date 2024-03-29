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
  printCharacter!: object;
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
  defense!: any;
  armorPen!: number;
  shieldPen!: number;
  weaponPen!: number;
  armor!: number;
  shield!: number;
  cc!: number;
  fight!: number;
  sizeMod!: number;
  qualityMod!: number;

  strength!: number;
  dexterity!: number;
  constitution!: number;
  intelligence!: number;
  wisdom!: number;
  charisma!: number;

  parsedSkills!: any;
  parsedWeapons!: any;
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
        this.getCharIntermediateStats();
        this.calculateCharPasives();
        this.calculateCharStats();
        this.setPrintWeapons();
        this.updateWeapon(0);
        this.setPrintCharater();
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
    // Atributos
    this.strength = parseInt(String(this.character.attributes['strength']));
    this.dexterity = parseInt(String(this.character.attributes['dexterity']));
    this.constitution = parseInt(
      String(this.character.attributes['constitution'])
    );
    this.intelligence = parseInt(
      String(this.character.attributes['intelligence'])
    );
    this.wisdom = parseInt(String(this.character.attributes['wisdom']));
    this.charisma = parseInt(String(this.character.attributes['charisma']));
    // Habilidades
    this.parsedSkills = this.character.skills?.map((skill) => {
      let skillAttribute = this.SKILLS.find(
        (skillBase) => skillBase.name == skill.name
      )?.attribute!;
      return {
        name: skill.name,
        rank:
          this.parseInt(String(skill.rank)) +
          this.parseInt(String(this.character.attributes[skillAttribute])),
      };
    });
    // Penalización de armadura
    this.armorPen =
      this.GEAR.armor.find((armor) => armor.name == this.character?.gear?.armor)
        ?.strength! - this.strength;
    // Penalización de escudo
    this.shieldPen =
      this.GEAR.shield.find(
        (shield) => shield.name == this.character?.gear?.shield
      )?.strength! - this.strength;
    // Penalización de arma
    this.weaponPen =
      this.strength -
      this.SIZES.find((type) => type.size == this.currentWeapon?.size)
        ?.strength!;
    // Armadura
    this.armor = this.GEAR.armor.find(
      (armor) => armor.name == this.character?.gear?.armor
    )?.defense!;
    // Escudo
    this.shield = this.GEAR.shield.find(
      (shield) => shield.name == this.character?.gear?.shield
    )?.defense!;
    // Armas cuerpo a cuerpo
    this.cc = parseInt(
      String(
        this.character?.skills?.find(
          (skill) => skill?.name?.toUpperCase() == 'ARMAS CUERPO A CUERPO'
        )?.rank!
      )
    );
    // Pelea
    this.fight = parseInt(
      String(
        this.character?.skills?.find(
          (skill) => skill?.name?.toUpperCase() == 'PELEA'
        )?.rank!
      )
    );
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
    this.perception = 8 + Math.round((2 * this.wisdom + this.intelligence) / 2);
    // Voluntad
    this.will =
      8 + Math.round((this.wisdom * 2 + this.intelligence + this.strength) / 2);
    // Velocidad
    this.speed =
      8 +
      Math.round((this.dexterity * 3 + this.intelligence) / 2) -
      (this.armorPen > 0 ? this.armorPen : 0) -
      (this.shieldPen > 0 ? this.shieldPen : 0);
    // Defensa
    this.defense = this.armor
      ? this.shield
        ? this.armor + this.shield + '/' + this.armor
        : this.armor
      : this.shield
      ? this.shield + '/' + 0
      : 0;
  }

  calculateCharStats(): void {
    let initiated = this.maxHealth != null;
    this.maxHealth = 12 + this.constitution * 4;
    this.maxEnergy = Math.round(
      this.constitution * 2 + this.strength + this.dexterity
    );
    if (!initiated) {
      this.character.health = this.maxHealth;
      this.character.energy = this.maxEnergy;
    }
  }

  setPrintWeapons(): void {
    this.parsedWeapons = [];
    for (let i = 0; i < 4; i++) {
      this.updateWeapon(i, true);
    }
  }

  updateWeapon(weaponIndex: any, print?: boolean): void {
    let currentWeapon: any = this.character?.weapons![weaponIndex];

    if (currentWeapon) {
      // Calidad de arma
      let weaponQuality = this.QUALITIES.find(
        (quality) => quality.quality == currentWeapon.quality
      );
      // Tamaño de arma
      let weaponSize = this.SIZES.find(
        (size) => size.size == currentWeapon.size
      );
      // A distancia
      let ad = parseInt(
        String(
          this.character?.skills?.find(
            (skill) => skill?.name?.toUpperCase() == 'ARMAS A DISTANCIA'
          )?.rank!
        )
      );
      // Impactar
      let hit = !currentWeapon.range?.toUpperCase().includes('MELÉ')
        ? ad
        : currentWeapon.name?.toUpperCase().includes('SIN ARMA')
        ? this.fight
        : this.cc;
      // Energía
      currentWeapon.energy =
        2 +
        (currentWeapon.baseEnergy != null
          ? this.parseInt(currentWeapon.baseEnergy)
          : 0) +
        weaponSize?.energy! -
        (this.armorPen > 0 ? this.armorPen : 0) -
        (this.shieldPen > 0 ? this.shieldPen : 0);
      // Impacto
      currentWeapon.impact =
        8 +
        this.parseInt(
          String(this.character.attributes[currentWeapon.impactAtt])
        ) +
        (hit ? hit : 0) +
        weaponQuality?.hit! +
        (weaponSize?.hit! + Math.round(this.strength / 2) >= 0
          ? 0
          : weaponSize?.hit! + Math.round(this.strength / 2));
      // Daño
      currentWeapon.damage =
        (this.character.attributes[currentWeapon.damageAtt]
          ? parseInt(String(this.character.attributes[currentWeapon.damageAtt]))
          : 0) +
        (currentWeapon.baseDamage != null
          ? parseInt(String(currentWeapon.baseDamage))
          : 0) +
        weaponSize?.damage! +
        weaponQuality?.damage!;
      // Efectos
      let effects: { type: string; rank: number }[] = [];
      currentWeapon.effects = [];
      currentWeapon.damageType.forEach((damage: any) => {
        let typeEffects = this.DAMAGES.find(
          (type) => type.type.toUpperCase() == damage.toUpperCase()
        );
        effects = effects.concat(
          JSON.parse(JSON.stringify(typeEffects?.effects!))
        );
      });
      effects.forEach((effect) => {
        if (effect.type == 'Perforar') {
          currentWeapon.piercing =
            effect.rank -
            (weaponSize?.effects ? weaponSize?.effects : 0) -
            (weaponQuality?.effects ? weaponQuality?.effects : 0);
        } else {
          if (
            !currentWeapon.effects.some(
              (weaponEffect: { type: string; rank: number }) =>
                weaponEffect.type == effect.type
            )
          ) {
            let typeEffects = effects.filter(
              (filteredEffect) => filteredEffect.type == effect.type
            );
            let bestEffect = Math.min(...typeEffects.map((item) => item.rank));
            currentWeapon.effects.push(
              typeEffects.find((typeEffect) => typeEffect.rank == bestEffect)
            );
            currentWeapon.effects[currentWeapon.effects.length - 1].rank +=
              (weaponSize?.effects ? weaponSize?.effects : 0) +
              (weaponQuality?.effects ? weaponQuality?.effects : 0);
          }
        }
      });
      currentWeapon.effects.map(
        (effect: { type: string; rank: number }) =>
          (effect.rank = effect.rank < 1 ? 1 : effect.rank)
      );

      if (print) {
        currentWeapon.printEffects = currentWeapon.effects
          .map((effect: { type: string; rank: number }) => {
            return effect.type + ' (' + effect.rank + ')';
          })
          .join(', ');
        currentWeapon.weaponPen =
          this.SIZES.find((type) => type.size == currentWeapon?.size)
            ?.strength! - this.strength;
      }
    }

    if (!print) {
      this.currentWeapon = currentWeapon;
    } else if (currentWeapon?.name) {
      this.parsedWeapons.push(currentWeapon);
    }
    this.getCharIntermediateStats();
    this.calculateCharPasives();
  }

  setPrintCharater(): void {
    this.characterService.sendPrintCharacter({
      character: this.character,
      perception: this.perception,
      will: this.will,
      speed: this.speed,
      defense: this.defense,
      parsedSkills: this.parsedSkills,
      parsedWeapons: this.parsedWeapons,
      maxHealth: this.maxHealth,
      maxEnergy: this.maxEnergy,
    });
  }
}
