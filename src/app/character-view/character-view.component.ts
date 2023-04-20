import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  Character,
  GEAR,
  WEAPON_DAMAGES,
  WEAPON_QUALITIES,
  WEAPON_RANGES,
  WEAPON_SIZES,
} from '../character';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.sass'],
})
export class CharacterViewComponent {
  strength!: number;
  dexterity!: number;
  constitution!: number;
  intelligence!: number;
  wisdom!: number;
  charisma!: number;
  maxHealth!: number;
  maxEnergy!: number;
  speed!: number;
  perception!: number;
  will!: number;
  currentWeapon!: any;
  currentWeaponIndex!: string;
  weaponDefense!: number;
  shieldDefense!: number;
  defense!: number;
  GEAR = GEAR;
  SIZES = WEAPON_SIZES;
  RANGES = WEAPON_RANGES;
  QUALITIES = WEAPON_QUALITIES;
  DAMAGES = WEAPON_DAMAGES;

  @Output() editModeChange = new EventEmitter<boolean>();
  _character!: Character;
  get character(): Character {
    return this._character;
  }
  @Input('character') set character(character: Character) {
    this._character = character;
    this.getAttributes();
    this.calculateCharPasives();
    this.calculateCharStats();
    this.currentWeaponIndex = '0';
    this.updateWeapon(0);
  }

  getAttributes(): void {
    // Fuerza
    this.strength = parseInt(
      this.character.attributes.find(
        (attribute) => attribute.name.toUpperCase() == 'STRENGTH'
      )?.rank!
    );
    // Destreza
    this.dexterity = parseInt(
      this.character.attributes.find(
        (attribute) => attribute.name.toUpperCase() == 'DEXTERITY'
      )?.rank!
    );
    // Constitución
    this.constitution = parseInt(
      this.character.attributes.find(
        (attribute) => attribute.name.toUpperCase() == 'CONSTITUTION'
      )?.rank!
    );
    // Inteligencia
    this.intelligence = parseInt(
      this.character.attributes.find(
        (attribute) => attribute.name.toUpperCase() == 'INTELLIGENCE'
      )?.rank!
    );
    // Sabiduría
    this.wisdom = parseInt(
      this.character.attributes.find(
        (attribute) => attribute.name.toUpperCase() == 'WISDOM'
      )?.rank!
    );
    // Carisma
    this.charisma = parseInt(
      this.character.attributes.find(
        (attribute) => attribute.name.toUpperCase() == 'CHARISMA'
      )?.rank!
    );
  }

  updateHealth(x: number): void {
    this.character.health += x;
    if (this.character.health > this.maxHealth) {
      this.character.health = this.maxHealth;
    }
    if (this.character.health < 0) {
      this.character.health = 0;
    }
  }

  updateEnergy(x: number): void {
    this.character.energy += x;
    if (this.character.energy > this.maxEnergy) {
      this.character.energy = this.maxEnergy;
    }
    if (this.character.energy < 0) {
      this.character.energy = 0;
    }
  }

  calculateCharPasives(): void {
    let alert = parseInt(
      this.character.skills.find(
        (skill) => skill.name.toUpperCase() == 'ALERTA'
      )?.rank!
    );
    let helmetPen =
      this.strength! -
      this.GEAR.helmet.find(
        (helmet) => helmet.name == this.character.gear.helmet
      )?.strength!;
    let armorPen =
      this.strength! -
      this.GEAR.armor.find((armor) => armor.name == this.character.gear.armor)
        ?.strength!;
    let shieldPen =
      this.strength! -
      this.GEAR.shield.find(
        (shield) => shield.name == this.character.gear.shield
      )?.strength!;
    let armor = this.GEAR.armor.find(
      (armor) => armor.name == this.character.gear.armor
    )?.defense!;
    let shield = this.GEAR.shield.find(
      (shield) => shield.name == this.character.gear.shield
    )?.defense!;
    let cc = parseInt(
      this.character.skills.find(
        (skill) => skill.name.toUpperCase() == 'ARMAS CUERPO A CUERPO'
      )?.rank!
    );
    // Percepción
    this.perception =
      this.wisdom! + (helmetPen < 0 ? helmetPen : 0) + (alert > 0 ? alert : 0);
    // Voluntad
    this.will = Math.round(this.wisdom * 2 + this.intelligence);
    // Velocidad
    this.speed =
      this.dexterity * 2 +
      this.intelligence +
      (armorPen < 0 ? armorPen : 0) +
      (shieldPen < 0 ? shieldPen : 0);
    // Defensa con arma
    this.weaponDefense = this.currentWeapon
      ? 4 + this.dexterity + (cc ? cc : 0) + this.currentWeapon.defense
      : 0;
    // Defensa con escudo
    this.shieldDefense =
      shield > 0 ? 4 + this.dexterity + (cc ? cc : 0) + shield : 0;
    // Defensa
    this.defense = 8 - (armor ? armor : 0);
  }

  calculateCharStats(): void {
    this.character.health = this.constitution * 10;
    this.maxHealth = this.character.health;
    this.character.energy =
      this.strength * 3 + this.constitution * 2 + this.dexterity * 2;
    this.maxEnergy = this.character.energy;
  }

  updateWeapon(weaponIndex: any): void {
    this.currentWeapon = this.character.weapons[weaponIndex]
      ? JSON.parse(JSON.stringify(this.character.weapons[weaponIndex]))
      : null;

    if (this.currentWeapon) {
      let weaponQuality = this.QUALITIES.find(
        (quality) => quality.quality == this.currentWeapon.quality
      );
      let weaponSize = this.SIZES.find(
        (size) => size.size == this.currentWeapon.size
      );
      let cc = parseInt(
        this.character.skills.find(
          (skill) => skill.name?.toUpperCase() == 'ARMAS CUERPO A CUERPO'
        )?.rank!
      );
      let ad = parseInt(
        this.character.skills.find(
          (skill) => skill.name?.toUpperCase() == 'ARMAS A DISTANCIA'
        )?.rank!
      );
      let hit = this.currentWeapon.range?.toUpperCase() != 'NULO' ? ad : cc;
      // Energía
      this.currentWeapon.energy = 2 + weaponSize?.energy!;
      // Impacto
      this.currentWeapon.impact =
        this.dexterity +
        (hit ? hit : 0) +
        weaponQuality?.hit! +
        (weaponSize?.hit! + Math.round(this.strength / 2) >= 0
          ? 0
          : weaponSize?.hit! + Math.round(this.strength / 2));
      // Daño
      this.currentWeapon.damage =
        4 + this.strength + weaponSize?.damage! + weaponQuality?.damage!;
      // Efectos
      this.currentWeapon.effects = [];
      this.currentWeapon.damageType.forEach((damage: any) => {
        let typeEffects = this.DAMAGES.find(
          (type) => type.type.toUpperCase() == damage.toUpperCase()
        );
        this.currentWeapon.effects = this.currentWeapon.effects.concat(
          typeEffects?.effects
        );
      });
    }
  }
}
