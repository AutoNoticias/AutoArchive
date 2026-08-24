import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import countachHeroImg from '../assets/images/countach_lp400_hero_1787274469417.jpg';
import countachEngineImg from '../assets/images/countach_v12_real_engine_1787414391361.jpg';
import countachCadImg from '../assets/images/countach_cad_blueprint_1787274490980.jpg';
import countachCockpitImg from '../assets/images/countach_cockpit_interior_1787274499397.jpg';
import countachQvWingImg from '../assets/images/countach_qv_wing_1787274511669.jpg';

export const countachImages = {
  hero: countachHeroImg,
  engine: countachEngineImg,
  cad: countachCadImg,
  cockpit: countachCockpitImg,
  qvWing: countachQvWingImg,
};

export const countachStats: StatItem[] = [
  { value: '298', unit: 'KM/H', label: 'Velocidad Máx. LP5000 QV (1985)' },
  { value: '455', unit: 'CV', label: 'Potencia Máxima V12 5.2L QV' },
  { value: '1.07', unit: 'METROS', label: 'Altura Total del LP400 al Suelo' },
  { value: '16', unit: 'AÑOS', label: 'En Producción Oficial (1974-1990)' },
  { value: '1,983', unit: 'UNIDADES', label: 'Total Producidos en Toda la Saga' },
  { value: '0.42', unit: 'CX', label: 'Coeficiente Aerodinámico Wedge' },
];

export const countachTimeline: TimelineItem[] = [
  {
    year: '1970',
    title: 'Proyecto Secreto LP112',
    description:
      'Tras el éxito del Miura, Ferruccio Lamborghini encarga al ingeniero Paolo Stanzani y al diseñador Marcello Gandini la creación de su sucesor, con el objetivo de resolver los problemas de peso y refrigeración del V12.',
  },
  {
    year: '1971',
    title: 'Salón de Ginebra: El Prototipo Amarillo LP500',
    description:
      'Aparece por primera vez el prototipo LP500 en color amarillo chillón con carrocería en cuña pura y puertas de tijera. El público y la prensa quedan conmocionados ante un diseño que parecía una nave espacial.',
  },
  {
    year: '1974',
    title: 'Nace la Leyenda: LP400 "Periscopio"',
    description:
      'Inicia la producción comercial del LP400 con motor V12 de 3.9 litros (375 CV) y el ingenioso túnel en el techo con espejo periscópico para ver hacia atrás.',
  },
  {
    year: '1975',
    title: 'El Conde Walter Wolf y el Nacimiento del Alerón',
    description:
      'El magnate petrolero canadiense Walter Wolf encarga a Gian Paolo Dallara tres Countach especiales con motor de 5.0 litros, pasos de rueda ensanchados y el legendario alerón trasero en forma de flecha.',
  },
  {
    year: '1978',
    title: 'Countach LP400 S: Neumáticos Pirelli P7 Gigantes',
    description:
      'Lamborghini adopta oficialmente las modificaciones de Wolf: extensiones de fibra de vidrio en pasos de rueda y los colosales neumáticos traseros Pirelli P7 de 345 mm de sección, los más anchos del mundo.',
  },
  {
    year: '1982',
    title: 'Countach LP5000 S: Aumento a 4.8 Litros',
    description:
      'Para combatir las estrictas normas de emisiones y mantener la supremacía frente a Ferrari, la cilindrada del V12 sube a 4.754 cc manteniendo 375 CV pero con un par motor sensiblemente superior a bajo régimen.',
  },
  {
    year: '1985',
    title: 'Countach 5000 Quattrovalvole: 455 Caballos de Furia',
    description:
      'Respuesta directa al Ferrari Testarossa: culatas con 4 válvulas por cilindro (48V en total), 5.167 cc y 6 carburadores Weber verticales sobre el motor, alcanzando 455 CV y 298 km/h.',
  },
  {
    year: '1988',
    title: 'Countach 25th Anniversary: El Toque de Horacio Pagani',
    description:
      'Para celebrar el 25 aniversario de la marca, un joven Horacio Pagani rediseña más de 500 piezas de la carrocería en materiales compuestos, creando la versión más rápida y refinada de la saga.',
  },
  {
    year: '1990',
    title: 'Último Countach y el Relevo al Diablo',
    description:
      'El 4 de julio de 1990 sale de Sant’Agata Bolognese el último Countach 25th Anniversary (chasis #ZA9C005A0KLA12085 en color plata metalizado), pasando al Museo de Lamborghini tras 16 años de dominio cultural.',
  },
];

export const countachSpecs: { lp400: SpecItem[]; qv: SpecItem[]; anniv: SpecItem[] } = {
  lp400: [
    { label: 'Denominación', value: 'Lamborghini Countach LP400 "Periscopio"' },
    { label: 'Años de Producción', value: '1974 — 1978' },
    { label: 'Unidades Producidas', value: '157 ejemplares' },
    { label: 'Motor', value: 'V12 Bizzarrini a 60° Longitudinal Trasero DOHC 24V' },
    { label: 'Cilindrada', value: '3.929 cc (3.9 Litros)' },
    { label: 'Alimentación', value: '6 Carburadores horizontales dobles Weber 45 DCOE' },
    { label: 'Potencia Máxima', value: '375 CV (370 hp / 276 kW) @ 8.000 rpm' },
    { label: 'Par Motor', value: '361 Nm (266 lb-ft) @ 5.000 rpm' },
    { label: 'Transmisión', value: 'Manual de 5 velocidades montada delante del motor' },
    { label: 'Chasis', value: 'Estructura tubular espacial de acero soldado' },
    { label: 'Peso en Vacío', value: '1.065 kg (2.348 lb)' },
    { label: '0-100 km/h', value: '5.4 segundos' },
    { label: 'Velocidad Máxima', value: '290 km/h (180 mph)' },
    { label: 'Neumáticos Traseros', value: 'Michelin XWX 215/70 VR14' },
    { label: 'Diseño', value: 'Marcello Gandini para Carrozzeria Bertone' },
  ],
  qv: [
    { label: 'Denominación', value: 'Lamborghini Countach 5000 Quattrovalvole (QV)' },
    { label: 'Años de Producción', value: '1985 — 1988' },
    { label: 'Unidades Producidas', value: '610 ejemplares' },
    { label: 'Motor', value: 'V12 a 60° Longitudinal Trasero DOHC 48V (4 válvulas/cil)' },
    { label: 'Cilindrada', value: '5.167 cc (5.2 Litros)' },
    { label: 'Alimentación', value: '6 Carburadores verticales Weber 44 DCNF (o Bosch K-Jetronic en EE.UU.)' },
    { label: 'Potencia Máxima', value: '455 CV (449 hp / 335 kW) @ 7.000 rpm' },
    { label: 'Par Motor', value: '500 Nm (369 lb-ft) @ 5.200 rpm' },
    { label: 'Transmisión', value: 'Manual de 5 velocidades sincronizada con rejilla abierta' },
    { label: 'Chasis', value: 'Tubular de acero con paneles de aluminio y fibra de vidrio' },
    { label: 'Peso en Vacío', value: '1.490 kg (3.285 lb)' },
    { label: '0-100 km/h', value: '4.5 - 4.8 segundos' },
    { label: 'Velocidad Máxima', value: '298 km/h (185 mph)' },
    { label: 'Neumáticos Traseros', value: 'Pirelli P7 Cinturato 345/35 VR15' },
    { label: 'Alerón Trasero', value: 'Opcional (con coste extra de $5.000)' },
  ],
  anniv: [
    { label: 'Denominación', value: 'Lamborghini Countach 25th Anniversary' },
    { label: 'Años de Producción', value: '1988 — 1990' },
    { label: 'Unidades Producidas', value: '657 ejemplares (la versión más vendida)' },
    { label: 'Motor', value: 'V12 a 60° Longitudinal Trasero DOHC 48V' },
    { label: 'Cilindrada', value: '5.167 cc (5.2 Litros)' },
    { label: 'Potencia Máxima', value: '455 CV (449 hp / 335 kW) @ 7.000 rpm' },
    { label: 'Par Motor', value: '500 Nm (369 lb-ft) @ 5.200 rpm' },
    { label: 'Diseño y Aerodinámica', value: 'Rediseño de Horacio Pagani (entradas de aire integradas)' },
    { label: 'Llantas', value: 'OZ Racing de 2 piezas forjadas en aleación ligera' },
    { label: '0-100 km/h', value: '4.7 segundos' },
    { label: 'Velocidad Máxima', value: '298 km/h' },
    { label: 'Equipamiento', value: 'Climatizador mejorado, elevalunas eléctricos, asientos eléctricos' },
    { label: 'Cese de Fabricación', value: '4 de julio de 1990 (Reemplazado por el Diablo)' },
  ],
};

export const countachChapters: Chapter[] = [
  {
    number: '01',
    category: 'EL ORIGEN DEL NOMBRE',
    title: '¡Countach!: La Exclamación Piamontesa que Bautizó al Icono',
    subtitle: 'El término dialectal de asombro que desafió a los toros de lidia',
    paragraphs: [
      'Casi todos los modelos de Lamborghini llevan nombres extraídos de la tauromaquia española: Miura, Espada, Islero, Jarama, Diablo o Murciélago. Sin embargo, el Countach es la única y célebre excepción en la historia de la marca del toro.',
      'A finales de 1970, durante las noches secretas de trabajo en la granja de Cesana Torinese donde Carrozzeria Bertone modelaba el prototipo a escala real, un cerrajero piamontés que solo hablaba el dialecto de Turín no hacía más que repetir una palabra cada vez que veía la silueta afilada: «¡Còun-tach!».',
      'En dialecto piamontés, "Countach" (pronunciado kun-tash) es una exclamación intraducible de asombro absoluto, utilizada ante algo deslumbrante, hiperbólico o seductor. Marcello Gandini y Nuccio Bertone, divertidos por la fuerza fonética y la reacción visceral que provocaba, decidieron que ningún nombre de toro podría superar el magnetismo de aquella palabra.',
    ],
    highlight: {
      value: '¡COUNTACH!',
      label: 'EXCLAMACIÓN DIALECTAL PIAMONTESA',
      description: 'La única ocasión en que Lamborghini rompió su tradición taurina por un grito de asombro puro.',
    },
    image: {
      src: countachHeroImg,
      alt: 'Lamborghini Countach LP400 Periscopio en Estudio',
      caption: 'El Lamborghini Countach LP400 Periscopio de 1974: pureza geométrica original de Marcello Gandini.',
      tag: 'MONOGRAFÍA 003 / PIEZA A',
    },
  },
  {
    number: '02',
    category: 'REVOLUCIÓN ARQUITECTÓNICA',
    title: 'El Proyecto LP112: De Transversal a Longitudinal Invertido',
    subtitle: 'La solución de Paolo Stanzani para resolver los dilemas del Miura',
    paragraphs: [
      'El Lamborghini Miura había asombrado al mundo con su motor V12 transversal, pero adolecía de tres problemas graves: la accesibilidad mecánica era una pesadilla, el varillaje del cambio era impreciso y el calor del escape asfixiaba los carburadores.',
      'Para el nuevo proyecto —código interno LP112 (Longitudinale Posteriore 112)—, el ingeniero Paolo Stanzani ideó una disposición mecánica magistral e insólita: montó el colosal motor V12 en sentido longitudinal, pero invertido 180 grados.',
      'La caja de cambios se situaba hacia adelante, quedando ubicada directamente entre los dos asientos del conductor y pasajero. Desde allí, un eje de transmisión atravesaba el propio cárter de aceite del motor para enviar la fuerza al diferencial trasero. Esto permitió una palanca de cambios con conexión directa y corta, y concentró el 80% de la masa en el centro exacto del vehículo.',
    ],
    highlight: {
      value: 'LP112',
      label: 'LONGITUDINALE POSTERIORE INVERTIDO',
      description: 'Arquitectura que revolucionó el reparto de masas y la precisión del selector de marchas.',
    },
  },
  {
    number: '03',
    category: 'ESCULTURA GEOMÉTRICA',
    title: 'Marcello Gandini y la Era de la Cuña («Wedge Design»)',
    subtitle: 'El nacimiento de las líneas trapezoidales que rompieron con las curvas orgánicas',
    paragraphs: [
      'Si el Miura representaba las curvas femeninas y sensuales de los años 60, el Countach nació para demoler ese paradigma. Marcello Gandini, inspirado por sus prototipos Alfa Romeo Carabo y Lancia Stratos Zero, concibió una forma geométrica pura de cuña trapezoidal.',
      'El morro descendía casi hasta tocar el asfalto en una línea recta continua que subía por el parabrisas y terminaba en una trasera truncada verticalmente. No había una sola curva tradicional: todo eran planos intersectados, tomas de aire triangulares NACA y cortes angulares a 45 grados.',
      'Con apenas 1.07 metros de altura total, el Countach parecía más un avión de combate supersónico caído a la carretera que un automóvil civil. Cuando el prototipo LP500 se presentó en el Salón de Ginebra de 1971 junto al Miura SV, el público quedó paralizado por el shock visual.',
    ],
    highlight: {
      value: '1.07 M',
      label: 'ALTURA TOTAL DE CARROCERÍA',
      description: 'Una de las siluetas más bajas y afiladas jamás homologadas para circular por carretera.',
    },
  },
  {
    number: '04',
    category: 'LAS PUERTAS DE TIJERA',
    title: 'La Génesis de las Puertas Élitro: Forma que Sigue a la Función',
    subtitle: 'Cómo un dilema de espacio se convirtió en la firma de Sant’Agata',
    paragraphs: [
      'Las icónicas puertas que se abren hacia arriba y hacia adelante rotando sobre una bisagra delantera —conocidas técnicamente como puertas de tijera o élitro— son hoy el sello de identidad de todo superdeportivo Lamborghini V12.',
      'Sin embargo, Gandini no las concibió por simple exhibicionismo estético, sino por pura necesidad ergonómica: el chasis tubular espacial requería unos travesaños laterales extremadamente anchos y altos para garantizar la rigidez torsional.',
      'Sumado al parabrisas sumamente inclinado y a la anchura del coche (casi 2 metros), unas puertas convencionales no habrían podido abrirse en ningún estacionamiento o garaje estándar. Las puertas verticales permitían al conductor salir con holgura incluso en espacios angostos.',
    ],
    highlight: {
      value: 'PUERTAS TIJERA',
      label: 'SOLUCIÓN ERGONÓMICA Y ESTRUCTURAL',
      description: 'Nacidas de la anchura del chasis multitubular, hoy definen el ADN de Lamborghini.',
    },
    image: {
      src: countachCockpitImg,
      alt: 'Interior y habitáculo del Lamborghini Countach',
      caption: 'Puesto de conducción con rejilla abierta cromada, volante Momo y asientos de cuero casi apoyados en el chasis.',
      tag: 'HABITÁCULO / ANALÓGICO',
    },
  },
  {
    number: '05',
    category: 'EL ENIGMA DEL PERISCOPIO',
    title: 'El Misterio del Techo Periscopio del LP400 Original',
    subtitle: 'La hendidura de chapa para ver hacia atrás en un coche sin luneta útil',
    paragraphs: [
      'La visibilidad trasera en el Countach era prácticamente nula: el motor V12 central y los enormes radiadores laterales bloqueaban cualquier ángulo visual hacia atrás por el retrovisor convencional.',
      'Para el primer modelo de producción de 1974 —el codiciado Countach LP400 "Periscopio"—, Gandini ideó una hendidura longitudinal en el techo de aluminio. A través de este canal, un sistema de espejos prismáticos tipo periscopio permitía al conductor mirar por encima de los carburadores traseros.',
      'Aunque en la práctica el campo de visión seguía siendo sumamente limitado, esta característica otorgó a las primeras 157 unidades producidas una pureza estética inigualable, convirtiendo al "LP400 Periscopio" en la versión más pura y valiosa para los coleccionistas modernos.',
    ],
    highlight: {
      value: '157',
      label: 'UNIDADES LP400 PERISCOPIO',
      description: 'El Countach más puro, sin aditamentos aerodinámicos posteriores ni ensanches.',
    },
  },
  {
    number: '06',
    category: 'LA MANIOBRA COUNTACH',
    title: 'El Arte de Estacionar Sentado en el Umbral de la Puerta',
    subtitle: 'La técnica obligatoria para dar marcha atrás sin visibilidad trasera',
    paragraphs: [
      'Debido a que la pequeña luneta trasera y las persianas apenas permitían distinguir siluetas, los pilotos de prueba de Sant’Agata Bolognese, encabezados por Bob Wallace y Valentino Balboni, inventaron una maniobra que se volvió legendaria.',
      'Para estacionar marcha atrás, el conductor abría la puerta de tijera hacia arriba, se sentaba directamente sobre el ancho umbral lateral del chasis con medio cuerpo fuera del coche, agarraba el volante con la mano derecha y accionaba el embrague con el pie izquierdo mientras miraba hacia atrás por encima del techo.',
      'Esta pintoresca coreografía se convirtió en un ritual de iniciación obligatorio para todo propietario de un Countach en las décadas de los 70 y 80.',
    ],
    highlight: {
      value: 'MANIOBRA BALBONI',
      label: 'REVERSA SOBRE EL UMBRAL',
      description: 'La única forma práctica de estacionar el superdeportivo debido a la ausencia de visibilidad trasera.',
    },
  },
  {
    number: '07',
    category: 'INGENIERÍA ESTRUCTURAL',
    title: 'El Chasis Multitubular: 90 Metros de Tubos de Acero Soldados a Mano',
    subtitle: 'La jaula de pájaros de alta rigidez diseñada por Paolo Stanzani',
    paragraphs: [
      'Mientras que el prototipo original LP500 utilizaba una estructura semi-monocasco de chapa que resultó demasiado pesada y propensa a fisuras durante los ensayos de choque, el Countach de producción adoptó un chasis espacial multitubular completo.',
      'Fabricado por la firma especializada Marchesi en Módena, este chasis utilizaba más de 90 metros de tubos de acero de sección redonda y cuadrada soldados minuciosamente a mano con tecnología TIG. El conjunto completo pesaba apenas 90 kilogramos, pero ofrecía una rigidez torsional colosal para absorber los esfuerzos del V12.',
      'Sobre esta jaula tubular se remacharon paneles de carrocería en aleación ligera de aluminio, mientras que las conchas delantera y trasera se abrían ampliamente para otorgar acceso total a las suspensiones independientes por dobles triángulos superpuestos.',
    ],
    highlight: {
      value: '90 KG',
      label: 'PESO DEL CHASIS ESPACIAL MARCHESI',
      description: 'Estructura ultraligera soldada a mano que sustentó toda la saga Countach durante 16 años.',
    },
    image: {
      src: countachCadImg,
      alt: 'Plano Técnico CAD del Chasis Tubular del Lamborghini Countach',
      caption: 'Esquema de ingeniería de la estructura tubular, cotas aerodinámicas y disposición de los dobles radiadores.',
      tag: 'PLANO TÉCNICO CAD',
    },
  },
  {
    number: '08',
    category: 'EL MOTOR V12 BIZZARRINI',
    title: 'Seis Carburadores Weber Dobles y la Sinfonía a 8.000 RPM',
    subtitle: 'El propulsor de 4 árboles de levas que rugía en el habitáculo',
    paragraphs: [
      'El motor del LP400 era la evolución suprema del V12 de Giotto Bizzarrini, con 3.929 cc, bloque y culatas de aluminio silicio, cuatro árboles de levas en cabeza accionados por cadena y dos válvulas por cilindro.',
      'Alimentado por seis carburadores horizontales de doble cuerpo Weber 45 DCOE montados a los costados de las culatas, entregaba 375 caballos de fuerza a unas vertiginosas 8.000 revoluciones por minuto y un par de 361 Nm a 5.000 rpm.',
      'En el LP400 original, con su carrocería estrecha y bajo coeficiente aerodinámico sin alerones, el coche alcanzaba unos impresionantes 290 km/h reales, coronándose como el automóvil de producción más veloz de la primera mitad de los años setenta.',
    ],
    highlight: {
      value: '375 CV',
      label: 'POTENCIA LP400 ORIGINAL @ 8.000 RPM',
      description: 'Una respuesta al acelerador inmediata gracias a doce mariposas de carburación independientes.',
    },
    image: {
      src: countachEngineImg,
      alt: 'Motor V12 del Lamborghini Countach con Carburadores Weber',
      caption: 'El imponente V12 con seis carburadores de doble cuerpo, trompetas metálicas y chasis tubular expuesto.',
      tag: 'MECÁNICA / V12 LONGITUDINAL',
    },
  },
  {
    number: '09',
    category: 'EL EPISODIO WALTER WOLF',
    title: 'El Magnate Canadiense que Rediseñó el Destino del Countach',
    subtitle: 'Tres unidades especiales que crearon los pasos de rueda ensanchados',
    paragraphs: [
      'A mediados de los años setenta, el millonario canadiense Walter Wolf, dueño de su propia escudería de Fórmula 1, no estaba satisfecho con el comportamiento del LP400 a altas velocidades y consideraba que los neumáticos Michelin de 215 mm no podían digerir los 375 CV.',
      'Wolf financió personalmente el desarrollo de tres unidades especiales construidas por Gian Paolo Dallara en Sant’Agata. Estas unidades montaban un motor V12 experimental de 5.0 litros con 447 CV, frenos de ocho pistones AP Racing de Fórmula 1 y pasos de rueda ensanchados en fibra de vidrio para alojar los nuevos y masivos neumáticos Pirelli P7.',
      'Además, Wolf instaló en la trasera un gigantesco alerón en forma de delta ajustable desde el habitáculo. El éxito visual y dinámico de los "Wolf Countach" fue tan descomunal que Lamborghini decidió adoptar estas modificaciones en la producción en serie.',
    ],
    highlight: {
      value: 'WALTER WOLF',
      label: 'LOS 3 PROTOTIPOS ESPECIALES',
      description: 'El catalizador que transformó el diseño minimalista original en la bestia ensanchada de los años 80.',
    },
  },
  {
    number: '10',
    category: 'LA ERA DEL PIRELLI P7',
    title: 'Countach LP400 S: Los Neumáticos Más Anchos del Planeta (345 mm)',
    subtitle: 'El nacimiento de los pasos de rueda remachados y las llantas Bravo',
    paragraphs: [
      'En 1978, Lamborghini presentó en el Salón de Ginebra el Countach LP400 S. El diseño minimalista y liso de Gandini dio paso a una estética agresiva y amenazante con aletines de fibra de vidrio remachados en negro mate y spoiler delantero profundo.',
      'Las llantas de aleación Campagnolo con diseño de cinco agujeros redondos (estilo teléfono "Bravo") calzaban los legendarios neumáticos radiales Pirelli P7 de perfil ultrabajo: 205/50 VR15 delante y unos descomunales 345/35 VR15 detrás.',
      'Con 345 milímetros de anchura de banda de rodadura, eran los neumáticos más anchos jamás montados en un automóvil de serie, otorgándole un agarre lateral en curva que desafiaba a los prototipos de competición.',
    ],
    highlight: {
      value: '345 MM',
      label: 'ANCHURA DE NEUMÁTICO TRASERO',
      description: 'Récord mundial en su momento: una huella de neumático que convirtió al Countach en un icono de poder.',
    },
  },
  {
    number: '11',
    category: 'EL MÍTICO ALERÓN TRASERO',
    title: 'La Paradoja del Gran Alerón: Cero Apoyo y Menos Velocidad',
    subtitle: 'El accesorio cosmético más deseado que reducía la velocidad punta en 15 km/h',
    paragraphs: [
      'El gigantesco alerón trasero en forma de V invertida se convirtió en el elemento más característico del Countach en la cultura popular. Sin embargo, en el túnel de viento se descubrió que no producía carga aerodinámica positiva, sino que incrementaba la resistencia al avance.',
      'El alerón provocaba una pérdida de aproximadamente 15 a 18 km/h en velocidad punta debido al drag aerodinámico. Consciente de ello, Lamborghini nunca lo homologó como equipo de fábrica de serie: se vendía como una opción de concesionario por 5.000 dólares.',
      'Cuando un cliente encargaba su Countach con alerón, el coche salía de la línea de montaje sin él. Dos operarios salían al estacionamiento de la fábrica de Sant’Agata con un taladro manual, perforaban el capó trasero de aluminio y atornillaban el alerón antes del embarque.',
    ],
    highlight: {
      value: '-16 KM/H',
      label: 'PENALIZACIÓN DE VELOCIDAD POR EL ALERÓN',
      description: 'A pesar de reducir la velocidad por fricción, casi el 95% de los compradores exigían instalarlo.',
    },
    image: {
      src: countachQvWingImg,
      alt: 'Lamborghini Countach 5000 QV con Gran Alerón Trasero',
      caption: 'El icónico alerón trasero en forma de delta que decoró los pósters de millones de jóvenes en todo el mundo.',
      tag: 'AERODINÁMICA / CULTURA POP',
    },
  },
  {
    number: '12',
    category: 'EL GOLPE DE LOS 4.8 LITROS',
    title: 'Countach LP5000 S: La Respuesta a la Crisis del Petróleo',
    subtitle: '1982: Mayor cilindrada y par motor para reconquistar el mercado norteamericano',
    paragraphs: [
      'A principios de los años 80, tras superar una severa crisis financiera bajo la nueva dirección de los hermanos franceses Patrick y Jean-Claude Mimran, Lamborghini decidió revitalizar el corazón mecánico del Countach.',
      'Nació así en 1982 el Countach LP5000 S (también conocido como LP500S). El motor V12 incrementó su carrera y diámetro para alcanzar los 4.754 cc. Aunque la potencia se mantuvo en 375 CV a 7.000 rpm debido a reglamentaciones de carburación, el par motor trepó hasta los 410 Nm a solo 4.500 rpm.',
      'El coche se volvió mucho más elástico y utilizable en el tráfico real, convirtiéndose en el primer Countach en ser importado y homologado de forma masiva en los Estados Unidos, donde se convirtió en el juguete predilecto de Wall Street y Hollywood.',
    ],
    highlight: {
      value: '4.754 CC',
      label: 'CILINDRADA DEL MOTOR LP5000 S',
      description: 'Incremento del 21% en cilindrada para mejorar la curva de par y la respuesta en bajas vueltas.',
    },
  },
  {
    number: '13',
    category: 'LA CUMBRE TÉCNICA: QUATTROVALVOLE',
    title: '5000 Quattrovalvole: 48 Válvulas y 455 CV Frente a Ferrari',
    subtitle: 'La batalla frontal contra el Ferrari Testarossa de 1984',
    paragraphs: [
      'Cuando Ferrari presentó el Testarossa en el Salón de París de 1984 con su motor de 12 cilindros planos y 390 CV, Sant’Agata Bolognese preparó un contragolpe demoledor: el Countach 5000 Quattrovalvole (QV), desvelado en Ginebra en 1985.',
      'El ingeniero Giulio Alfieri rediseñó las culatas con cuatro válvulas por cilindro (48 válvulas en total), movió las bujías al centro de la cámara de combustión e incrementó la cilindrada a 5.167 cc con una relación de compresión de 9.5:1.',
      'La alimentación fue una obra de arte mecánica: seis carburadores dobles Weber 44 DCNF montados verticalmente en la parte superior del motor. Para dar cabida a los carburadores, se añadió una característica joroba en el capó motor. El resultado: 455 CV a 7.000 rpm y una aceleración de 0 a 100 km/h en 4.5 segundos, humillando al Testarossa.',
    ],
    highlight: {
      value: '455 CV',
      label: 'POTENCIA 5000 QV @ 7.000 RPM',
      description: 'El superdeportivo atmosférico más potente de su época, superando ampliamente a su rival de Maranello.',
    },
  },
  {
    number: '14',
    category: 'EL TOQUE DE HORACIO PAGANI',
    title: 'El Conde de los Composites: Horacio Pagani y el Countach Evoluzione',
    subtitle: 'El laboratorio experimental de fibra de carbono que adelantó el futuro',
    paragraphs: [
      'A mediados de los 80, un joven ingeniero argentino llegado a Italia con una carta de recomendación de Juan Manuel Fangio trabajaba en el departamento de materiales compuestos de Lamborghini: Horacio Pagani.',
      'En 1986, Pagani lideró el proyecto secreto Countach Evoluzione. Reemplazó todo el chasis tubular de acero por una estructura monocasco de fibra de carbono, Kevlar y aluminio alveolar, reduciendo el peso en 500 kilogramos (el coche pesaba apenas 980 kg) y alcanzando 330 km/h en pruebas en Nardò.',
      'Aunque la dirección de Lamborghini consideró que la fibra de carbono era demasiado costosa para la producción masiva en ese momento, este prototipo sentó las bases de los superdeportivos modernos y del posterior nacimiento de Pagani Automobili.',
    ],
    highlight: {
      value: '980 KG',
      label: 'PESO DEL COUNTACH EVOLUZIONE (1986)',
      description: 'El primer superdeportivo con chasis monocasco integral de fibra de carbono de la historia.',
    },
  },
  {
    number: '15',
    category: 'EL BROCHE DE ORO: 25TH ANNIVERSARY',
    title: '1988: El 25 Aniversario y las 500 Piezas Rediseñadas',
    subtitle: 'La última evolución comercial antes de la llegada del Diablo',
    paragraphs: [
      'Para conmemorar el cuarto de siglo de la fundación de la marca en el Gran Premio de Monza de 1988, Lamborghini presentó el Countach 25th Anniversary.',
      'Horacio Pagani fue el encargado de rediseñar la aerodinámica y el estilo exterior: rediseñó más de 500 componentes, incorporando tomas de aire con branquias en los pontones laterales, tomas de refrigeración superiores rediseñadas para mejorar el flujo a los radiadores, paragolpes integrados y llantas OZ Racing de dos piezas.',
      'El habitáculo se dotó de asientos de cuero con regulación eléctrica, aire acondicionado de mayor potencia y aislamiento acústico mejorado. Se convirtió en la versión más vendida de toda la historia del Countach con 657 unidades.',
    ],
    highlight: {
      value: '657',
      label: 'UNIDADES 25TH ANNIVERSARY',
      description: 'La variante final y de mayor éxito comercial, refinada personalmente por Horacio Pagani.',
    },
  },
  {
    number: '16',
    category: 'FENÓMENO CULTURAL & CINE',
    title: 'El Rey de los Pósters y la Fama de Hollywood',
    subtitle: 'De The Cannonball Run a El Lobo de Wall Street',
    paragraphs: [
      'Ningún automóvil en la historia de la humanidad ha decorado tantas paredes de dormitorios y garajes como el Lamborghini Countach. En las décadas de 1980 y 1990, millones de niños y jóvenes crecieron con el póster de un Countach blanco o negro con alerón.',
      'En el cine, el Countach LP400S negro de 1979 protagonizó la escena inicial de la mítica película The Cannonball Run (1981), con su motor V12 aullando en las carreteras de Arizona mientras escapaba de la policía.',
      'Décadas más tarde, Martin Scorsese inmortalizó un Countach 25th Anniversary blanco auténtico en The Wolf of Wall Street (2013), protagonizado por Leonardo DiCaprio, demostrando que su magnetismo estético sigue intacto.',
    ],
    highlight: {
      value: 'CULTURA POP',
      label: 'EL PÓSTER DEFINITIVO DEL SIGLO XX',
      description: 'Símbolo indiscutible de opulencia, audacia y la estética retrofuturista de los años ochenta.',
    },
  },
  {
    number: '17',
    category: 'SENSACIONES EXTREMAS',
    title: 'Conducir una Bestia Indomable: Embrague Pesado y Calor Infame',
    subtitle: 'El desafío físico de dominar un superdeportivo sin dirección asistida',
    paragraphs: [
      'Conducir un Countach no se parece a nada que exista en la industria automotriz actual. El pedal de embrague de doble disco requería casi 40 kilogramos de presión en el pie izquierdo, el acelerador tenía un recorrido duro y la dirección Momo sin asistencia hidráulica a baja velocidad era un ejercicio de gimnasio.',
      'El calor generado por el V12 y los seis carburadores situados justo detrás de las cabezas de los ocupantes inundaba el habitáculo, ya que las ventanillas solo se abrían un pequeño recuadro de cinco centímetros para pagar peajes.',
      'Sin embargo, cuando la aguja del tacómetro superaba las 4.500 rpm y las doce gargantas Weber aspiraban aire a pleno pulmón, el empuje brutal y el aullido metálico a 7.500 vueltas proporcionaban una recompensa sensorial irrepetible.',
    ],
    highlight: {
      value: '100% ANALÓGICO',
      label: 'SIN DIRECCIÓN NI FRENOS ASISTIDOS',
      description: 'Una experiencia física extrema que exigía valentía, fuerza y pericia técnica al volante.',
    },
  },
  {
    number: '18',
    category: 'MERCADO DE COLECCIÓN',
    title: 'La Revalorización de los Dioses de Sant’Agata',
    subtitle: 'De coches infravalorados en los 90 a piezas de museo de 1.5 millones',
    paragraphs: [
      'Durante los años 90 y principios de los 2000, los Countach vivieron una época de depreciación donde muchas unidades cayeron en manos de propietarios que descuidaron su complejo mantenimiento mecánico.',
      'Hoy en día, la situación ha dado un giro absoluto: el departamento Polo Storico de Lamborghini certifica restauraciones completas y los precios en subastas de Pebble Beach, Gooding & Co y RM Sotheby’s no han parado de escalar.',
      'Un LP400 Periscopio original en estado de concurso supera holgadamente los 1.2 a 1.6 millones de euros, mientras que un 5000 QV con carburadores en estado impecable cotiza entre los 650.000 y 900.000 euros.',
    ],
    highlight: {
      value: '€1.5M+',
      label: 'VALOR MÁXIMO LP400 PERISCOPIO',
      description: 'Una de las cotizaciones históricas más sólidas del coleccionismo automotriz contemporáneo.',
    },
  },
  {
    number: '19',
    category: 'LEGADO DE DISEÑO',
    title: 'El ADN Inmortal: De Gandini a los Superdeportivos Modernos',
    subtitle: 'Diablo, Murciélago, Aventador y Revuelto descienden de sus líneas',
    paragraphs: [
      'El impacto del Countach en la historia del diseño industrial es tan profundo que todos los superdeportivos V12 que Lamborghini ha producido desde 1974 descienden directamente de su arquitectura.',
      'El Diablo, el Murciélago, el Aventador y el actual Revuelto híbrido mantienen intactas las proporciones de cuña, las puertas de tijera y la disposición de motor central longitudinal que Stanzani y Gandini concibieron hace más de medio siglo.',
      'En 2021, Lamborghini rindió homenaje al 50 aniversario del prototipo original con el lanzamiento del Countach LPI 800-4, una edición limitada a 112 unidades con tecnología híbrida y 814 CV que se agotó en cuestión de horas.',
    ],
    highlight: {
      value: '50 AÑOS',
      label: 'INFLUENCIA DIRECTA EN EL DISEÑO',
      description: 'Cada Lamborghini V12 moderno lleva en sus entrañas la genética nacida en el proyecto LP112.',
    },
  },
  {
    number: '20',
    category: 'VEREDICTO FINAL',
    title: 'El Monolito que Cambió las Reglas del Universo Automotriz',
    subtitle: 'El superdeportivo que convirtió la fantasía en chapa y gasolina',
    paragraphs: [
      'El Lamborghini Countach no fue simplemente un automóvil veloz; fue una declaración de guerra contra lo convencional, un cometa que atravesó el cielo del automovilismo para redefinir para siempre los límites de lo que era posible en una carretera.',
      'Durante 16 años ininterrumpidos de producción, desafió crisis petroleras, cambios de propietarios corporativos y revoluciones tecnológicas sin perder jamás su trono como el rey indiscutible del asombro visual.',
      'El Countach demostró que el verdadero arte automotriz no se mide únicamente en túneles de viento o tiempos de vuelta cronometrados, sino en la capacidad irrepetible de detener el corazón de quien lo contempla y provocar un grito involuntario de asombro: «¡Countach!».',
    ],
    highlight: {
      value: 'ETERNO',
      label: 'EL ICONO SUPREMO DEL SUPERDEPORTIVO',
      description: 'La máquina que definió para siempre la palabra Supercar en el imaginario colectivo de la humanidad.',
    },
  },
];
