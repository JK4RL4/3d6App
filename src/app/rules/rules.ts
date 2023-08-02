export const RULES = {
  Agotado:
    'Ocurre cuando la Energía del personaje se reduce a 0. El personaje deberá descansar un turno sin realizar acciones de combate para recuperar la Energía a su valor máximo, tras lo que sufrirá la Pérdida de 1 punto de Energía.',
  Aguante:
    'Daño que puede recibir el personaje antes de quedar fuera de combate. Si el aguante cae por debajo del 50%, el personaje recibe un Penalizador de 1 punto a todas sus tiradas y su Velocidad se reduce en 2 puntos. Si cae por debajo del 25%, el personaje recibe un Penalizador de 2 puntos a todas sus tiradas y su Velocidad se reduce en 4 puntos.',
  Alcance: 'Indica el alcance del arma en combate.',
  Aturdir:
    'Por cada efecto de aturdimiento en un personaje, éste sufre 1 punto de Pérdida de Energía.',
  Bloqueo:
    'Número de éxitos adicionales que necesita un ataque enemigo para impactar si se realiza una Defensa activa con escudo.',
  Bonificador:
    'Valor que se suma a la Dificultad de cualquier tirada. Puede acumularse con otros bonificadores.',
  Calidad:
    'La calidad del arma influye en el Impacto, en el Daño, en el Alcance y en la capacidad de aplicar Efectos con ella.',
  Carisma:
    'Condiciona los modificadores sociales en las interacciones con NPCs.',
  Concepto:
    'Arquetipo del personaje para tener una guía básica de construcción.',
  Conducta:
    'El comportamiento del personaje. Puede coincidir con la naturaleza o ser totalmente opuesto si el personaje esconde su verdadero ser. Puede condicionar los modificadores sociales en las interacciones con NPCs.',
  Constitución: 'Condiciona el Aguante y la Energía del personaje.',
  Corto: 'Alcance hasta 80 metros.',
  Coste: 'Gasto de Energía que debe realizarse para llevar a cabo una acción.',
  Daño: 'Daño aplicado al enemigo si la tirada de ataque tiene éxito.',
  Defensa:
    'Cada punto de defensa reduce la Dificultad de cualquier ataque enemigo en 1 punto.',
  'Defensa activa':
    'Se realiza cuando el personaje elige defender como acción de turno. Puede llevarse a cabo contra cualquier ataque frontal durante el turno en el que se declara, pero reduciendo en 1 punto su efecto por cada ataque por encima del primero.',
  Destino:
    'Por cada punto de destino, el personaje puede: <br> - Repetir una tirada. Ninguna tirada puede repetirse más de una vez. El resultado de la repetición sustituye por completo al de la tirada original. <br> - Superar automáticamente una tirada de Dificultad menor o igual a 16 con Margen de éxito 0. <br> - Ignorar todos los estados y penalizaciones por heridas, además de reducir cualquier Coste o Pérdida de Energía de Ataque o Habilidad a 0 durante 1 turno.',
  Destreza: 'Condiciona el Impacto de los ataques, la Energía y la Iniciativa.',
  Destruir:
    'Por cada efecto aplicado, la Defensa del enemigo se reduce permanentemente en 1 punto.',
  Desvío:
    'Número de éxitos adicionales que necesita un ataque enemigo para impactar si se realiza una Defensa activa con arma.',
  Dificultad:
    'Número objetivo de la tirada indicado en el valor de Impacto/Habilidad/Salvación y que puede ser modificado por un Penalizador/Bonificador a discreción del narrador.',
  'Doble arma': `Al atacar con dos armas se aplicarán las siguientes reglas:
    <br> - El Coste de Enegía total del ataque será la suma del coste del ataque de ambas armas por separado. 
    <br> - La dificultad de Impacto será la del arma principal, con un Bonificador de 1 punto si el impacto del arma secundaria es igual o superior, o con un Penalizador de 1 punto si es inferior. 
    <br> - Los valores de Bloqueo, Evasión y Desvío del enemigo se reduce a la mitad redondeando hacia abajo.
    <br> - El Daño que se aplicará será el del arma secundaria si el Margen de éxito del ataque es de 2 o menos, el del arma principal en caso de ser de 5 o menos, o la suma de ambos si se obtiene un margen de éxito de 6 o más.`,
  Efecto:
    'Consecuencias adicionales del ataque si éste tiene éxito. El número entre paréntisis indica el Margen de éxito necesario en la tirada de ataque para aplicar el efecto. El efecto puede acumularse tantas veces como permita el Margen de éxito, aumentando su impacto.',
  Energía:
    'Puntos que deben invertirse para realizar acciones o aumentar la Iniciativa. Si cae a 0, el personaje queda Agotado. Si el valor máximo es 0 debido a Pérdida, el personaje queda Exhausto.',
  Envenenar:
    'Por cada efecto de veneno en el personaje, éste pierde 1 punto de Aguante y 1 punto de Energía al inicio del turno hasta que se cure.',
  Exhausto:
    'Ocurre cuando la Energía máxima del personaje es 0. El personaje no puede realizar acciones de combate.',
  'Éxito crítico':
    'Si se supera una tirada de Habilidad/Salvación con un Margen de éxito de 10 o más, se obtiene un éxito crítico. Cada éxito crítico otorga 1 punto de Destino y puede tener efectos adicionales a discreción del narrador.',
  Extremo: 'Alcance hasta 300 metros.',
  'Fallo crítico':
    'Si se falla una tirada de Habilidad/Salvación con un Margen de éxito de -10 o menos, se obtiene un fallo crítico. Cuando ocurra, el personaje perderá 1 punto de Destino y puede tener efectos adicionales a discreción del narrador.',
  Fuerza:
    'Condiciona el Daño de Pelea y con armas de Alcance Melé, la Energía, la capacidad de carga y en menor medida la Voluntad.',
  'Golpe crítico':
    'Si se consigue un Margen de éxito de 10 o más en una tirada de ataque, se produce un golpe crítico. Los golpes críticos duplican el Daño del ataque y pueden tener efectos adicionales a discreción del narrador.',
  Habilidad:
    'Capacidades entrenadas o aprendidas del personaje que le permiten realizar acciones en diferentes ámbitos. Si no se posee la habilidad, se puede realizar la tirada como una Salvación del Atributo relacionado con un Penalizador de -2 en el caso de ser una habilidad innata o -4 en el caso de ser una habilidad aprendida. Si se trata de un conocimiento, no se puede realizar tirada si no se posee una habilidad relacionada con él mismo.',
  Inteligencia: 'Condiciona en menor medida la Iniciativa y la Voluntad.',
  Impedir:
    'Por cada efecto de impedimento aplicado a un personaje, éste debe gastar 1 punto de Energía o quedar Agotado.',
  Iniciativa:
    'Velocidad a la que actúa el personaje. Puede incrementarse utilizando Energía al inicio de cada turno. Si la Iniciativa para el turno supera en 10 puntos o más a la del enemigo, el personaje puede realizar una Defensa activa además de su acción de combate.',
  Impacto: 'Dificultad de la tirada de ataque.',
  Lanzar:
    'El rango se verá condicionado por el Tamaño del arma y la Fuerza del personaje.',
  Largo: 'Alcance hasta 140 metros.',
  Letal:
    'El Margen de éxito necesario para obtener un Golpe crítico se reduce en el valor indicado.',
  'Margen de éxito':
    'Resultado de restar la Dificultad de una tirada menos la suma de los dados de la misma.',
  'Mecánica de juego':
    'Todas las tiradas se lanzarán con 3 dados de 6 con el objetivo de que la suma total de los resultados sea igual o menor que la Dificultad establecida.',
  'Melé(x)':
    'El número entre paréntesis indicará el rango melé dependiendo de las dimensiones del arma. Si se combate contra un enemigo con rango melé, se obtendra un Bonificador de 1 punto al Impacto si el rango melé del personaje es superior.',
  Naturaleza:
    'La razón de ser del personaje. Realizar acciones acorde a su naturaleza le proporciona un Bonificador variable a las tiradas de Voluntad.',
  Penalizador:
    'Valor que se resta a la Dificultad de cualquier tirada. Puede acumularse con otros penalizadores.',
  Percepción:
    'Valor que se suma a las tiradas percepción. Recibe un Bonificador de la Habilidad Alerta y un Penalizador por el yelmo equipado.',
  Pérdida:
    'Reducción permanente del valor de Energía máxima que tiene efecto hasta realizar un descanso largo fuera de combate.',

  Perforar: 'Por cada punto se ignora 1 punto de la Defensa del enemigo.',
  Pifia:
    'Si se falla una tirada de ataque con un Margen de éxito de -10 o más, se produce una pifia. Las pifias permiten al enemigo una oportunidad de contraataque, otorgándole una acción de combate adicional, y pueden tener efectos adicionales a discreción del narrador.',
  Quemar:
    'Por cada efecto de quemado en un personaje, éste recibe 3 puntos de Daño adicionales cada vez que reciba un ataque con este efecto.',
  Sabiduría: 'Condiciona la Voluntad y la Percepción.',
  Salvación:
    'Capacidades innatas del personaje que le permiten evitar situaciones de peligro.',
  Sangrar:
    'Por cada efecto de sangrado en un personaje, éste pierde 2 puntos de Aguante al inicio del turno hasta que se cure.',
  'Tipo de daño': 'Condiciona los Efectos que puede aplicar el arma.',
  Tamaño:
    'El tamaño del arma influye en el Impacto, en el Daño y en la capacidad de aplicar Efectos con ella.',
  Voluntad: 'Valor que se suma a las tiradas de voluntad.',
};
