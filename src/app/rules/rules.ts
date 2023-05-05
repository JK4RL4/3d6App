export const RULES = {
  Destino:
    'Por cada punto de destino, el personaje puede repetir una tirada. Ninguna tirada puede repetirse más de una vez. El resultado de la repetición sustituye por completo al de la tirada original.',
  'Fallo crítico':
    'Si se falla una tirada de Habilidad/Salvación con un Margen de éxito de -10 o menos, se obtiene un fallo crítico. Cuando ocurra, el personaje perderá 1 punto de Destino y puede tener efectos adicionales a discreción del narrador.',
  'Éxito crítico':
    'Si se supera una tirada de Habilidad/Salvación con un Margen de éxito de 10 o más, se obtiene un éxito crítico. Cada éxito crítico otorga 1 punto de Destino y puede tener efectos adicionales a discreción del narrador.',
  Pifia:
    'Si se falla una tirada de ataque con un Margen de éxito de -10 o más, se produce una pifia. Las pifias otorgan al enemigo una oportunidad de contraataque, otorgándole una acción de combate adicional, y pueden tener efectos adicionales a discreción del narrador.',
  Penalizador:
    'Valor que se resta a la Dificultad de cualquier tirada. Puede acumularse con otros penalizadores.',
  Bonificador:
    'Valor que se suma a la Dificultad de cualquier tirada. Puede acumularse con otros bonificadores.',
  Salvación:
    'Capacidades innatas del personaje que le permiten evitar situaciones de peligro.',
  Habilidad:
    'Capacidades entrenadas o aprendidas del personaje que le permiten realizar acciones en diferente ámbitos.',
  Dificultad:
    'Número objetivo de la tirada indicado en el valor de Impacto/Habilidad/Salvación y que puede ser modificado por un Penalizador/Bonificador a discreción del narrador.',
  'Mecánica de juego':
    'Todas las tiradas se lanzarán con 3 dados de 6 con el objetivo de que la suma total de los resultados sea igual o menor que la Dificultad establecida.',
  'Margen de éxito':
    'Resultado de restar la Dificultad de una tirada menos la suma de los dados de la misma.',
  Envenenar:
    'Por cada efecto de veneno en el personaje, éste pierde 1 punto de Aguante y 1 punto de Energía al inicio del turno hasta que se cure.',
  Destruir:
    'Por cada efecto aplicado, la Defensa del enemigo se reduce permanentemente en 1 punto.',
  Perforar: 'Por cada punto se ignora 1 punto de la Defensa del enemigo.',
  Sangrar:
    'Por cada efecto de sangrado en un personaje, éste pierde 2 puntos de Aguante al inicio del turno hasta que se cure.',
  Impedir:
    'Por cada efecto de impedimento aplicado a un personaje, éste debe gastar 1 punto de Energía o quedar Agotado.',
  Letal:
    'El Margen de éxito necesario para obtener un Golpe crítico se reduce en el valor indicado.',
  Quemar:
    'Por cada efecto de quemado en un personaje, éste recibe 3 puntos de Daño adicionales cada vez que reciba un ataque con este efecto.',
  Aturdir:
    'Por cada efecto de aturdimiento en un personaje, éste sufre 1 punto de Pérdida de Energía.',
  'Golpe crítico':
    'Si se consigue un Margen de éxito de 10 o más en una tirada de ataque, se produce un golpe crítico. Los golpes críticos duplican el Daño del ataque y pueden tener efectos adicionales a discreción del narrador.',
  Coste: 'Gasto de Energía que debe realizarse para llevar a cabo una acción.',
  Pérdida:
    'Reducción permanente del valor de Energía máxima que tiene efecto hasta realizar un descanso largo fuera de combate.',
  Agotado:
    'Ocurre cuando la Energía del personaje se reduce a 0. El personaje deberá descansar un turno sin realizar acciones de combate para recuperar la Energía a su valor máximo.',
  Exhausto:
    'Ocurre cuando la Energía máxima del personaje es 0. El personaje no puede realizar acciones de combate.',
  Fuerza:
    'Condiciona el Daño de Pelea y con armas de Alcance Melé, la capacidad de carga y en menor medida la Voluntad.',
  Destreza: 'Condiciona el Impacto de los ataques y la Iniciativa.',
  Constitución: 'Condiciona el Aguante del personaje.',
  Inteligencia: 'Condiciona en menor medida la Iniciativa y la Voluntad.',
  Sabiduría: 'Condiciona la Voluntad y la Percepción.',
  Carisma:
    'Condiciona los modificadores sociales en las interacciones con NPCs.',
  Iniciativa:
    'Velocidad a la que actúa el personaje. Puede incrementarse utilizando Energía al inicio de cada turno. Si la Iniciativa para el turno supera en 10 puntos o más a la del enemigo, el personaje puede realizar una Defensa activa además de su acción de combate.',
  Percepción:
    'Valor que se suma a las tiradas percepción. Recibe un Bonificador de la Habilidad Alerta y un Penalizador por el yelmo equipado.',
  Voluntad: 'Valor que se suma a las tiradas de voluntad.',
  Naturaleza:
    'La razón de ser del personaje. Realizar acciones acorde a su naturaleza le proporciona un Bonificador variable a las tiradas de Voluntad.',
  Conducta:
    'El comportamiento del personaje. Puede coincidir con la naturaleza o ser totalmente opuesto si el personaje esconde su verdadero ser. Puede condicionar los modificadores sociales en las interacciones con NPCs.',
  Concepto:
    'Arquetipo del personaje para tener una guía básica de construcción.',
  Defensa:
    'Cada punto de defensa reduce la Dificultad de cualquier ataque enemigo en 1 punto.',
  Desvío:
    'Número de éxitos adicionales que necesita un ataque enemigo para impactar si se realiza una Defensa activa con arma.',
  Bloqueo:
    'Número de éxitos adicionales que necesita un ataque enemigo para impactar si se realiza una Defensa activa con escudo.',
  'Defensa activa':
    'Se realiza cuando el personaje elige defender como acción de turno. Puede llevarse a cabo contra cualquier ataque frontal durante el turno en el que se declara, pero reduciendo en 1 punto su efecto por cada ataque por encima del primero.',
  Energía:
    'Puntos que deben invertirse para realizar acciones o aumentar la Iniciativa. Si cae a 0, el personaje queda Agotado. Si el valor máximo es 0 debido a Pérdida, el personaje queda Exhausto.',
  Aguante:
    'Daño que puede recibir el personaje antes de quedar fuera de combate. Si el aguante cae por debajo del 50%, el personaje recibe un Penalizador de 1 punto a todas sus tiradas y su Velocidad se reduce en 2 puntos. Si cae por debajo del 25%, el personaje recibe un Penalizador de 2 puntos a todas sus tiradas y su Velocidad se reduce en 4 puntos.',
  Impacto: 'Dificultad de la tirada de ataque.',
  Daño: 'Daño aplicado al enemigo si la tirada de ataque tiene éxito.',
  Efecto:
    'Consecuencias adicionales del ataque si éste tiene éxito. El número entre paréntisis indica el Margen de éxito necesario en la tirada de ataque para aplicar el efecto. El efecto puede acumularse tantas veces como permita el Margen de éxito, aumentando su impacto.',
  Tamaño:
    'El tamaño del arma influye en el Impacto, en el Daño y en la capacidad de aplicar Efectos con ella.',
  Calidad:
    'La calidad del arma influye en el Impacto, en el Daño, en el Alcance y en la capacidad de aplicar Efectos con ella.',
  Alcance: 'Indica el alcance del arma en combate.',
  'Melé(x)':
    'El número entre paréntesis indicará el rango melé dependiendo de las dimensiones del arma. Si se combate contra un enemigo con rango melé, se obtendra un Bonificador de 1 punto al Impacto si el rango melé del personaje es superior.',
  Lanzar:
    'El rango se verá condicionado por el Tamaño del arma y la Fuerza del personaje.',
  Corto: 'Alcance hasta 80 metros.',
  Largo: 'Alcance hasta 140 metros.',
  Extremo: 'Alcance hasta 300 metros.',
  'Tipo de daño': 'Condiciona los Efectos que puede aplicar el arma.',
};
