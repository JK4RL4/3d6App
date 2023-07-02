export class Character {
  public name: string | null;
  public image: string | null;
  public lore: string | null;
  public energy: number | null;
  public health: number | null;
  public destiny: number | null;
  public archetype: Archetype | null;
  public attributes: Attributes;
  public skills: Skill[] | null;
  public gear: Gear | null;
  public weapons: Weapon[] | null;
  public spells: Spell[] | null;

  constructor() {
    this.name = null;
    this.lore = null;
    this.image = null;
    this.energy = null;
    this.health = null;
    this.destiny = 1;
    this.archetype = {
      concept: null,
      nature: null,
      conduct: null,
    };
    this.attributes = {
      strength: 2,
      dexterity: 2,
      constitution: 2,
      intelligence: 2,
      wisdom: 2,
      charisma: 2,
    };
    this.skills = [];
    this.gear = {
      clothes: null,
      armor: null,
      shield: null,
      helmet: null,
    };
    this.weapons = [];
    this.spells = [];
  }
}

export interface Archetype {
  concept: string | null;
  nature: string | null;
  conduct: string | null;
}

export interface Attributes {
  [key: string]: number;
}

export class Skill {
  public name: string | null;
  public rank: number | null;

  constructor() {
    this.name = null;
    this.rank = null;
  }
}

export interface Gear {
  clothes: string | null;
  armor: string | null;
  shield: string | null;
  helmet: string | null;
}

export class Weapon {
  public name: string | null;
  public size: string | null;
  public range: string | null;
  public quality: string | null;
  public damageType: string[] | null;
  public impactAtt: string | null;
  public damageAtt: string | null;

  constructor() {
    this.name = null;
    this.size = null;
    this.range = null;
    this.quality = null;
    this.damageType = [];
    this.impactAtt = null;
    this.damageAtt = null;
  }
}

export class Spell {
  public name: string | null;
  public description: string | null;
  public type: string | null;
  public cost: number | null;
  public lost: number | null;

  constructor() {
    this.name = null;
    this.type = null;
    this.description = null;
    this.cost = null;
    this.lost = null;
  }
}
