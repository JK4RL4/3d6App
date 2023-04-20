export interface Character {
  name: string;
  energy: number;
  health: number;
  archetype: {
    concept: string;
    nature: string;
    conduct: string;
  };
  attributes: [
    { name: 'strength'; rank: string },
    { name: 'dexterity'; rank: string },
    { name: 'constitution'; rank: string },
    { name: 'intelligence'; rank: string },
    { name: 'wisdom'; rank: string },
    { name: 'charisma'; rank: string }
  ];
  skills: { name: string; rank: string }[];
  gear: {
    clothes: string;
    armor: string;
    shield: string;
    helmet: string;
  };
  weapons: {
    name: string | null;
    size: string | null;
    range: string | null;
    quality: string | null;
    damageType: string[];
  }[];
}

export const EMPTY_CHARACTER = {
  name: null,
  energy: 12,
  health: 20,
  archetype: {
    concept: null,
    nature: null,
    conduct: null,
  },
  attributes: [
    { name: 'strength', rank: 2 },
    { name: 'dexterity', rank: 2 },
    { name: 'constitution', rank: 2 },
    { name: 'intelligence', rank: 2 },
    { name: 'wisdom', rank: 2 },
    { name: 'charisma', rank: 2 },
  ],
  skills: [],
  gear: {
    clothes: null,
    armor: null,
    shield: null,
    helmet: null,
  },
  weapons: [],
};

export const SKILLS = [
  { name: 'Academicismo', attribute: 'int' },
  { name: 'Acrobacias', attribute: 'dex' },
  { name: 'Alerta', attribute: 'wis' },
  { name: 'Armas a distancia', attribute: 'dex' },
  { name: 'Armas cuerpo a cuerpo', attribute: 'dex' },
  { name: 'Atletismo', attribute: 'str' },
  { name: 'Cerrajero', attribute: 'dex' },
  { name: 'Conocimiento', attribute: 'int', input: true },
  { name: 'Danza', attribute: 'dex' },
  { name: 'Empatía', attribute: 'wis' },
  { name: 'Equitación', attribute: 'dex' },
  { name: 'Escapismo', attribute: 'dex' },
  { name: 'Esquiva', attribute: 'dex' },
  { name: 'Etiqueta', attribute: 'cha' },
  { name: 'Expresión', attribute: 'cha' },
  { name: 'Herbolaria', attribute: 'wis' },
  { name: 'Herrería', attribute: 'str' },
  { name: 'Interpretación', attribute: 'cha' },
  { name: 'Intimidación', attribute: 'cha' },
  { name: 'Investigación', attribute: 'int' },
  { name: 'Juego de manos', attribute: 'dex' },
  { name: 'Liderazgo', attribute: 'cha' },
  { name: 'Medicina', attribute: 'int' },
  { name: 'Natación', attribute: 'str' },
  { name: 'Ocultismo', attribute: 'int' },
  { name: 'Pelea', attribute: 'dex' },
  { name: 'Perspicacia', attribute: 'wis' },
  { name: 'Persuasión', attribute: 'cha' },
  { name: 'Religión', attribute: 'int' },
  { name: 'Sabiduría popular', attribute: 'wis' },
  { name: 'Senescal', attribute: 'int' },
  { name: 'Sigilo', attribute: 'dex' },
  { name: 'Subterfugio', attribute: 'cha' },
  { name: 'Supervivencia', attribute: 'wis' },
  { name: 'Tasación', attribute: 'int' },
  { name: 'Trato con animales', attribute: 'wis' },
  { name: 'Trepar', attribute: 'str' },
  { name: 'Personalizada', attribute: null, input: true },
];

export const GEAR = {
  clothes: [
    { name: 'Harapos' },
    { name: 'Ropa normal' },
    { name: 'Ropa de camuflaje' },
    { name: 'Ropa de calidad' },
    { name: 'Ropajes ilustres' },
  ],
  armor: [
    { name: 'Sin armadura', defense: 0, strength: 1, weight: 0 },
    { name: 'Armadura ligera', defense: 1, strength: 2, weight: 0 },
    { name: 'Armadura media', defense: 2, strength: 2, weight: 1 },
    { name: 'Armadura  pesada', defense: 3, strength: 3, weight: 2 },
    { name: 'Armadura  completa', defense: 4, strength: 4, weight: 3 },
  ],
  shield: [
    { name: 'Sin escudo', defense: 0, strength: 1, weight: 0 },
    { name: 'Escudo pequeño', defense: 2, strength: 2, weight: 0 },
    { name: 'Escudo mediano', defense: 3, strength: 3, weight: 1 },
    { name: 'Escudo grande', defense: 5, strength: 4, weight: 2 },
  ],
  helmet: [
    { name: 'Sin yelmo', defense: 0, strength: 1, weight: 0 },
    { name: 'Yelmo ligero', defense: 1, strength: 2, weight: 0 },
    { name: 'Yelmo medio', defense: 2, strength: 3, weight: 1 },
    { name: 'Yelmo pesado', defense: 4, strength: 4, weight: 2 },
  ],
};

export const WEAPON_RANGES = ['nulo', 'lanzar', 'corto', 'largo', 'extremo'];

export const WEAPON_QUALITIES = [
  { quality: 'baja', damage: -1, crit: 0, effects: -1, hit: -1 },
  { quality: 'estándar', damage: 0, crit: 0, effects: 0, hit: 0 },
  { quality: 'alta', damage: 1, crit: 0, effects: 0, hit: 1 },
  { quality: 'legendaria', damage: 2, crit: 1, effects: 1, hit: 2 },
  { quality: 'única', damage: 3, crit: 2, effects: 2, hit: 3 },
];

export const WEAPON_SIZES = [
  {
    size: 'diminuto',
    hit: 2,
    damage: -2,
    crit: 2,
    effects: 2,
    def: -2,
    energy: -1,
  },
  {
    size: 'pequeño',
    hit: 1,
    damage: -1,
    crit: 1,
    effects: 1,
    def: -1,
    energy: 0,
  },
  {
    size: 'medio',
    hit: 0,
    damage: 0,
    crit: 0,
    effects: 0,
    def: 0,
    energy: 0,
  },
  {
    size: 'grande',
    hit: -1,
    damage: 2,
    crit: 0,
    effects: -1,
    def: 1,
    energy: 1,
  },
  {
    size: 'colosal',
    hit: -3,
    damage: 4,
    crit: 0,
    effects: -3,
    def: 0,
    energy: 3,
  },
];

export const WEAPON_DAMAGES = [
  {
    type: 'cortante',
    effects: [
      { type: 'Sangrado', rank: 4 },
      { type: 'Impedimento', rank: 6 },
    ],
  },
  {
    type: 'contundente',
    effects: [
      { type: 'Aturdir', rank: 8 },
      { type: 'Impedimento', rank: 4 },
    ],
  },
  { type: 'perforante', effects: [{ type: 'Perforar', rank: 2 }] },
  { type: 'fuego', effects: [{ type: 'Quemar', rank: 3 }] },
  {
    type: 'frío',
    effects: [
      { type: 'Aturdir', rank: 8 },
      { type: 'Impedimento', rank: 2 },
    ],
  },
  {
    type: 'eléctrico',
    effects: [
      { type: 'Aturdir', rank: 6 },
      { type: 'Impedimento', rank: 3 },
      { type: 'Quemar', rank: 5 },
    ],
  },
  { type: 'veneno', effects: [{ type: 'Envenenar', rank: 4 }] },
  { type: 'destructor', effects: [{ type: 'Romper', rank: 4 }] },
  // { type: 'mágico', effects: [{ type: 'canalizar', rank: 4 }] },
];

export const NATURE = [
  'Anarquista',
  'Director',
  'Penitente',
  'Ansioso de Elogios	',
  'Enigma',
  'Perfeccionista',
  'Ansioso de Emociones	',
  'Fanático',
  'Planificador',
  'Arquitecto',
  'Gallardo',
  'Protector',
  'Autista',
  'Gurú',
  'Pusilánime',
  'Autocrata',
  'Hedonista',
  'Rebelde',
  'Bellaco',
  'Honesto',
  'Repulsivo',
  'Bravucón',
  'Hosco',
  'Rutinario',
  'Caballeroso',
  'Idealista',
  'Sádico',
  'Camaleón',
  'Juez',
  'Sicofante',
  'Capitalista',
  'Manipulador',
  'Sociópata',
  'Celebrante',
  'Mártir',
  'Soldado',
  'Científico',
  'Masoquista',
  'Solitario',
  'Competidor',
  'Mediador',
  'Superviviente',
  'Confabulador',
  'Monstruo',
  'Tradicionalista',
  'Confidente',
  'Nihilista',
  'Truhán',
  'Conformista',
  'Niño',
  'Vanguardista',
  'Crítico',
  'Ojo de la Tormenta',
  'Visionario',
  'Depravado',
  'Optimista',
  'Diletante',
  'Pedagogo',
  'Adicto',
  'Defensor',
  'Líder',
  'Ajeno',
  'Desgraciado',
  'Mentor',
  'Árbitro',
  'Destructor',
  'Mercenario',
  'Artista',
  'Estoico',
  'Pueblerino',
  'Bárbaro',
  'Explorador',
  'Seguidor',
  'Barriobajero',
  'Fatalista',
  'Sociable',
  'Burócrata',
  'Futurista',
  'Soñador',
  'Buscador',
  'Grotesco',
  'Tirano',
  'Cazador',
  'Independiente',
  'Vivisector',
  'Cobarde',
  'Jugador',
];
