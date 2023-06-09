export const ATTRIBUTES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

export const SKILLS = [
  { name: 'Academicismo', attribute: 'intelligence' },
  { name: 'Acrobacias', attribute: 'dexterity' },
  { name: 'Alerta', attribute: 'wisdom' },
  { name: 'Armas a distancia', attribute: 'dexterity' },
  { name: 'Armas cuerpo a cuerpo', attribute: 'dexterity' },
  { name: 'Atletismo', attribute: 'strength' },
  { name: 'Cerrajero', attribute: 'dexterity' },
  { name: 'Conocimiento', attribute: 'intelligence' },
  { name: 'Danza', attribute: 'dexterity' },
  { name: 'Empatía', attribute: 'wisdom' },
  { name: 'Equitación', attribute: 'dexterity' },
  { name: 'Escapismo', attribute: 'dexterity' },
  { name: 'Esquiva', attribute: 'dexterity' },
  { name: 'Etiqueta', attribute: 'charisma' },
  { name: 'Expresión', attribute: 'charisma' },
  { name: 'Herbolaria', attribute: 'wisdom' },
  { name: 'Herrería', attribute: 'strength' },
  { name: 'Interpretación', attribute: 'charisma' },
  { name: 'Intimidación', attribute: 'charisma' },
  { name: 'Investigación', attribute: 'intelligence' },
  { name: 'Juego de manos', attribute: 'dexterity' },
  { name: 'Liderazgo', attribute: 'charisma' },
  { name: 'Medicina', attribute: 'intelligence' },
  { name: 'Natación', attribute: 'strength' },
  { name: 'Ocultismo', attribute: 'intelligence' },
  { name: 'Pelea', attribute: 'dexterity' },
  { name: 'Perspicacia', attribute: 'wisdom' },
  { name: 'Persuasión', attribute: 'charisma' },
  { name: 'Religión', attribute: 'intelligence' },
  { name: 'Sabiduría popular', attribute: 'wisdom' },
  { name: 'Senescal', attribute: 'intelligence' },
  { name: 'Sigilo', attribute: 'dexterity' },
  { name: 'Subterfugio', attribute: 'charisma' },
  { name: 'Supervivencia', attribute: 'wisdom' },
  { name: 'Tasación', attribute: 'intelligence' },
  { name: 'Trato con animales', attribute: 'wisdom' },
  { name: 'Trepar', attribute: 'strength' },
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
    { name: 'Escudo grande', defense: 4, strength: 4, weight: 2 },
  ],
  helmet: [
    { name: 'Sin yelmo', defense: 0, strength: 1, weight: 0 },
    { name: 'Yelmo ligero', defense: 1, strength: 2, weight: 0 },
    { name: 'Yelmo medio', defense: 2, strength: 3, weight: 1 },
    { name: 'Yelmo pesado', defense: 4, strength: 4, weight: 2 },
  ],
};

export const WEAPON_RANGES = [
  'melé(1)',
  'melé(2)',
  'melé(3)',
  'lanzar',
  'corto',
  'largo',
  'extremo',
];

export const WEAPON_QUALITIES = [
  { quality: 'baja', damage: -1, crit: 0, effects: -1, hit: -1, def: -2 },
  { quality: 'estándar', damage: 0, crit: 0, effects: 0, hit: 0, def: 1 },
  { quality: 'alta', damage: 1, crit: 0, effects: 0, hit: 1, def: 1 },
  { quality: 'legendaria', damage: 2, crit: 1, effects: -1, hit: 2, def: 2 },
  { quality: 'única', damage: 3, crit: 2, effects: -1, hit: 3, def: 2 },
];

export const WEAPON_SIZES = [
  {
    size: 'diminuto',
    hit: 2,
    damage: 1,
    crit: 2,
    effects: 2,
    def: -2,
    energy: -1,
    strength: 1,
  },
  {
    size: 'pequeño',
    hit: 1,
    damage: 2,
    crit: 1,
    effects: 1,
    def: -1,
    energy: 0,
    strength: 2,
  },
  {
    size: 'medio',
    hit: 0,
    damage: 4,
    crit: 0,
    effects: 0,
    def: 1,
    energy: 0,
    strength: 3,
  },
  {
    size: 'grande',
    hit: -1,
    damage: 6,
    crit: 0,
    effects: -1,
    def: 2,
    energy: 1,
    strength: 4,
  },
  {
    size: 'colosal',
    hit: -3,
    damage: 10,
    crit: 1,
    effects: -3,
    def: 0,
    energy: 3,
    strength: 5,
  },
];

export const WEAPON_DAMAGES = [
  {
    type: 'cortante',
    effects: [
      { type: 'Sangrado', rank: 3 },
      { type: 'Impedimento', rank: 3 },
    ],
  },
  {
    type: 'contundente',
    effects: [
      { type: 'Aturdir', rank: 6 },
      { type: 'Impedimento', rank: 2 },
    ],
  },
  { type: 'perforante', effects: [{ type: 'Perforar', rank: 2 }] },
  { type: 'fuego', effects: [{ type: 'Quemar', rank: 3 }] },
  {
    type: 'frío',
    effects: [
      { type: 'Aturdir', rank: 4 },
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
  { type: 'veneno', effects: [{ type: 'Envenenar', rank: 3 }] },
  { type: 'destructor', effects: [{ type: 'Romper', rank: 3 }] },
  { type: 'mágico', effects: [{ type: 'Sofocar', rank: 2 }] },
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
