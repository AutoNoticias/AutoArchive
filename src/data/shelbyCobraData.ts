import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import cobraHeroImg from '../assets/images/shelby_cobra_hero_1787873550463.jpg';
import cobraEngineImg from '../assets/images/shelby_cobra_engine_1787873564254.jpg';
import cobraActionImg from '../assets/images/shelby_cobra_action_1787873579946.jpg';
import cobraCadImg from '../assets/images/shelby_cobra_cad_1787873597980.jpg';

export const shelbyCobraImages = {
  hero: cobraHeroImg,
  engine: cobraEngineImg,
  action: cobraActionImg,
  cad: cobraCadImg,
};

export const shelbyCobraStats: StatItem[] = [
  { value: '485', unit: 'CV', label: 'Potencia del motor Ford 427 FE V8 Side-Oiler en versión S/C' },
  { value: '3.8', unit: 'SEG', label: 'Aceleración de 0 a 100 km/h en 1965 sobre neumáticos de calle' },
  { value: '1.060', unit: 'KG', label: 'Peso pluma en vacío con carrocería de aluminio artesanal' },
  { value: '298', unit: 'KM/H', label: 'Velocidad punta oficial alcanzada en la recta de Mulsanne / Le Mans' },
  { value: '1965', unit: 'AÑO', label: 'En el que Shelby American arrebató el Campeonato Mundial a Ferrari' },
  { value: '12.4', unit: 'SEG', label: '0 a 160 km/h y frenado total a 0 (Récord mundial 0-100-0 MPH)' },
];

export const shelbyCobraTimeline: TimelineItem[] = [
  {
    year: '1959',
    title: 'Carroll Shelby Conquista Le Mans y Diseña su Venganza',
    description:
      'Carroll Shelby gana las 24 Horas de Le Mans al volante de un Aston Martin DBR1 junto a Roy Salvadori. Forzado a retirarse poco después por afecciones cardíacas, Shelby jura construir el deportivo biplaza más rápido del mundo para desafiar la supremacía de Enzo Ferrari.',
  },
  {
    year: 'Septiembre de 1961',
    title: 'La Carta a AC Cars y la Alianza Estratégica con Ford',
    description:
      'Shelby descubre que la firma británica AC Cars en Thames Ditton se ha quedado sin los motores Bristol de 6 cilindros para su roadster Ace. Envía un telegrama proponiendo adaptar el nuevo motor V8 "Small Block" de 260 pulgadas cúbicas (4.3L) de fundición fina que Ford acababa de desarrollar.',
  },
  {
    year: 'Febrero de 1962',
    title: 'El Nacimiento del Chasis CSX2000 en Santa Fe Springs',
    description:
      'Llega por vía aérea el primer chasis a Los Ángeles. En el taller de Dean Moon en Santa Fe Springs, Shelby y su equipo instalan el motor Ford V8 260 y la caja manual Borg-Warner T-10 en menos de 8 horas. Nace el Cobra CSX2000 pintado repetidamente de diferentes colores para simular una producción en masa ante la prensa.',
  },
  {
    year: '1963',
    title: 'El Cobra 289 y el Desembarco de Ken Miles',
    description:
      'Con el motor Ford 289 (4.7L) de 271 CV y la maestría en puesta a punto del legendario piloto e ingeniero británico Ken Miles, el Cobra comienza a demoler a los Chevrolet Corvette en las pistas del SCCA en Estados Unidos.',
  },
  {
    year: '1964',
    title: 'El Aerodinámico Shelby Daytona Coupe de Peter Brock',
    description:
      'Para superar la desventaja aerodinámica del roadster descapotable en la kilométrica recta de Mulsanne en Le Mans, Peter Brock diseña el Daytona Coupe (CSX2287). Con su revolucionaria zaga truncada "Kamm-tail", alcanza 315 km/h y gana su categoría en Le Mans 1964.',
  },
  {
    year: 'Enero de 1965',
    title: 'La Bestia 427: Chasis Rediseñado y Motor Big Block',
    description:
      'Shelby rediseña por completo el chasis junto a Ford y AC Cars: tubos principales ensanchados a 4 pulgadas, suspensión por dobles triángulos superpuestos y amortiguadores helicoidales. Bajo el capó instalan el monstruoso Ford 427 FE "Side-Oiler" de 7.0 litros rindiendo hasta 485 CV.',
  },
  {
    year: '4 de Julio de 1965',
    title: 'Campeones Mundiales de Constructores FIA GT',
    description:
      'Shelby American se proclama Campeón Mundial de Constructores de la FIA para Gran Turismo en el circuito de Reims, convirtiéndose en el primer y único fabricante estadounidense en lograr esta corona mundial, humillando a Ferrari en su propio terreno.',
  },
  {
    year: '1966',
    title: 'El Mito de los 427 S/C "Semi-Competition"',
    description:
      'Al no alcanzar la homologación de 100 unidades de carreras para la FIA a tiempo, Shelby convierte 31 unidades de pura competición en modelos matriculables de calle denominados "Semi-Competition" (S/C): escapes laterales libres, arco antivuelco, boca de llenado rápida de combustible y aceleración salvaje.',
  },
  {
    year: '1966',
    title: 'El Temido "Super Snake" CSX3015 de Doble Compresor Paxton',
    description:
      'Carroll Shelby construye dos unidades extremas conocidas como "Super Snake", equipadas con dos compresores volumétricos Paxton que elevaban la potencia del 427 a más de 800 CV. Uno fue reservado para su uso personal y el otro fue vendido al comediante Bill Cosby.',
  },
  {
    year: 'Presente',
    title: 'La Leyenda Inmortal del Músculo Americano-Británico',
    description:
      'El Shelby Cobra original CSX es considerado el Santo Grial de los deportivos de colección mundiales, superando cotizaciones de más de 5 a 13 millones de dólares en subastas internacionales y permaneciendo como el símbolo absoluto de la fuerza bruta analógica.',
  },
];

export const shelbyCobraSpecs: {
  street427: SpecItem[];
  sc427: SpecItem[];
  superSnake: SpecItem[];
} = {
  street427: [
    { label: 'Modelo Insignia', value: '1965 Shelby Cobra 427 Street Roadster' },
    { label: 'Motor', value: 'Ford 427 FE V8 Big Block (7.0L)' },
    { label: 'Cilindrada Exacta', value: '6.997 cc (427 cu in)' },
    { label: 'Alimentación', value: 'Carburador Holley 4 bocas de 780 CFM' },
    { label: 'Potencia', value: '425 CV @ 6.000 RPM' },
    { label: 'Par Motor', value: '651 Nm @ 3.700 RPM' },
    { label: 'Transmisión', value: 'Manual Toploader de 4 velocidades con diferencial Salisbury' },
    { label: 'Peso en Vacío', value: '1.090 kg' },
    { label: '0 a 100 km/h', value: '4.2 segundos' },
    { label: 'Velocidad Máxima', value: '265 km/h' },
  ],
  sc427: [
    { label: 'Modelo Insignia', value: '1965 Shelby Cobra 427 S/C (Semi-Competition)' },
    { label: 'Motor', value: 'Ford 427 FE "Side-Oiler" V8 de competición' },
    { label: 'Cilindrada Exacta', value: '6.997 cc (Diámetro 107.4 mm x Carrera 96.0 mm)' },
    { label: 'Relación de Compresión', value: '11.5:1 con culatas de aluminio Medium Riser' },
    { label: 'Alimentación', value: 'Doble Carburador Holley 4 bocas de competición' },
    { label: 'Potencia', value: '485 CV @ 6.500 RPM' },
    { label: 'Par Motor', value: '678 Nm @ 4.000 RPM' },
    { label: 'Frenos', value: 'Discos ventilados Girling en las 4 ruedas' },
    { label: 'Neumáticos', value: 'Goodyear Blue Streak Racing (Del: 8.15x15 / Tras: 9.50x15)' },
    { label: '0 a 100 km/h', value: '3.8 segundos' },
    { label: '0 a 160 a 0 km/h', value: '12.4 segundos (Récord mundial certificado)' },
    { label: 'Velocidad Máxima', value: '298 km/h' },
  ],
  superSnake: [
    { label: 'Modelo Insignia', value: '1966 Shelby Cobra 427 "Super Snake" (CSX3015)' },
    { label: 'Motor', value: 'Ford 427 FE V8 con Doble Sobrealimentador Paxton' },
    { label: 'Alimentación', value: '2 Compresores Volumétricos Paxton a presión forzada' },
    { label: 'Potencia Estimada', value: '800+ CV @ 6.500 RPM' },
    { label: 'Transmisión', value: 'Automática reforzada Lincoln de 3 velocidades (para soportar el par)' },
    { label: '0 a 100 km/h', value: '3.0 segundos (estimado sobre pista engomada)' },
    { label: 'Velocidad Máxima', value: '320+ km/h' },
    { label: 'Unidades Construidas', value: 'Solo 2 fabricadas en la historia (1 superviviente)' },
  ],
};

export const shelbyCobraChapters: Chapter[] = [
  {
    number: '01',
    category: 'GÉNESIS & AMBICIÓN',
    title: 'El Tejano del Corazón Valiente y el Sueño de Derrotar a Maranello',
    subtitle: 'De ganar las 24 Horas de Le Mans con pastillas de nitroglicerina bajo la lengua al nacimiento de Shelby American.',
    paragraphs: [
      'En junio de 1959, el piloto tejano Carroll Shelby cruzaba la línea de meta de las 24 Horas de Le Mans como vencedor absoluto al volante del Aston Martin DBR1 junto al británico Roy Salvadori. Pero mientras el champán empapaba su mono de carreras a rayas, Shelby escondía un secreto médico angustioso: padecía una grave angina de pecho y dependía de pastillas sublinguales de nitroglicerina para soportar las palpitaciones durante los relevos nocturnos a más de 250 kilómetros por hora.',
      'Forzado a retirarse definitivamente del pilotaje profesional en 1960 por consejo médico estricto, Shelby se negó a abandonar las pistas. Con una personalidad arrolladora, su sombrero vaquero característico y una intuición mecánica fuera de serie, concibió una obsesión inquebrantable: construir un deportivo estadounidense ultraligero y brutalmente potente capaz de destronar a los aristocráticos Ferrari en el Campeonato Mundial de Constructores de la FIA.',
    ],
    image: {
      src: shelbyCobraImages.hero,
      alt: '1965 Shelby Cobra 427 S/C en Guardsman Blue',
      caption: 'El icono definitivo del automovilismo americano: carrocería británica de aluminio moldeada a mano y furia V8 Ford Big Block.',
      tag: 'CAPÍTULO 01 // EL ORIGEN DEL MITO',
    },
    highlight: {
      value: '1959',
      label: 'Triunfo en Le Mans',
      description: 'El catalizador que encendió la obsesión de Carroll Shelby por humillar a Ferrari.',
    },
  },
  {
    number: '02',
    category: 'EL INJERTO MECÁNICO',
    title: 'El Chasis CSX2000: Matrimonio Angloamericano en Santa Fe Springs',
    subtitle: 'Cómo un telegrama a Inglaterra y el nuevo motor V8 260 de Ford crearon el primer Cobra de la historia en solo ocho horas de taller.',
    paragraphs: [
      'En septiembre de 1961, Shelby se enteró de que la fábrica británica AC Cars en Surrey se había quedado huérfana de propulsores tras el cese de producción de los motores Bristol de 6 cilindros. Inmediatamente envió un telegrama a Charles Hurlock proponiendo modificar el chasis tubular del AC Ace para alojar un compacto motor V8 americano. Al mismo tiempo, convenció a los ejecutivos de Ford Motor Company para que le suministraran prototipos de su nuevo bloque V8 "Small Block" de 260 pulgadas cúbicas con fundición de pared delgada.',
      'El 2 de febrero de 1962, el primer chasis desnudo (CSX2000) aterrizó en Los Ángeles. En el taller de Dean Moon en Santa Fe Springs, Shelby y sus mecánicos trabajaron sin descanso: en menos de ocho horas el motor Ford V8 y la caja manual Borg-Warner T-10 estaban encajados a la perfección. Para convencer a la prensa del motor de que tenía una línea de montaje en marcha, Shelby repintaba el mismo coche de color amarillo, azul y rojo antes de cada prueba de revista.',
    ],
    image: {
      src: shelbyCobraImages.cad,
      alt: 'Plano técnico del chasis tubular del Shelby Cobra',
      caption: 'Esquema de ingeniería del chasis de tubos de acero principales de 4 pulgadas y suspensión independiente en las cuatro ruedas.',
      tag: 'CAPÍTULO 02 // CHASSIS ARCHITECTURE',
    },
    highlight: {
      value: '8 HORAS',
      label: 'Montaje del CSX2000',
      description: 'Tiempo récord en el que el primer motor Ford V8 fue adaptado al chasis británico en Los Ángeles.',
    },
  },
  {
    number: '03',
    category: 'EVOLUCIÓN EN PISTA',
    title: 'Ken Miles y el Temible Cobra 289 en el Escenario Mundial',
    subtitle: 'El toque maestro del genio británico de las carreras para convertir una fiera indomable en un arma de precisión.',
    paragraphs: [
      'El Cobra debutó en competición a finales de 1962 en Riverside. Aunque una rotura del palier trasero le privó de la victoria, el coche pulverizó a los Corvette Sting Ray de General Motors desde los primeros compases. La llegada del brillante ingeniero y piloto británico Ken Miles fue la pieza decisiva: Miles afinó la cremallera de dirección, la geometría de suspensión y el equilibrio de pesos.',
      'Con el nuevo propulsor Ford 289 de 4.7 litros dotado de cuatro carburadores Weber de doble cuerpo y 271 CV en versión de calle (más de 360 CV en especificación FIA), el Cobra 289 conquistó el Campeonato SCCA de Estados Unidos en 1963, 1964 y 1965, barriendo a todos sus rivales y forzando a Enzo Ferrari a mirar con respeto y pavor al equipo de Venecia, California.',
    ],
    image: {
      src: shelbyCobraImages.action,
      alt: 'Shelby Cobra 427 compitiendo al límite en circuito',
      caption: 'Ken Miles y los pilotos de Shelby exprimiendo el par motor descomunal del V8 en las pistas de Estados Unidos y Europa.',
      tag: 'CAPÍTULO 03 // GUERRA EN LOS CIRCUITOS',
    },
    highlight: {
      value: '289 CI',
      label: 'Motor de Leyenda',
      description: 'El V8 Small Block que dominó los campeonatos nacionales del SCCA frente a General Motors.',
    },
  },
  {
    number: '04',
    category: 'AERODINÁMICA & GLORIA',
    title: 'El Daytona Coupe y la Corona Mundial FIA de 1965',
    subtitle: 'Peter Brock desafía las leyes convencionales del viento y arrebata el título mundial a la Scuderia Ferrari en su propio santuario.',
    paragraphs: [
      'A pesar del salvaje empuje del Cobra descapotable, su coeficiente de resistencia aerodinámica limitaba su velocidad punta en las largas rectas europeas como Mulsanne en Le Mans a unos 260 km/h, donde los Ferrari 250 GTO superaban los 290 km/h. Peter Brock, joven y visionario diseñador de Shelby, dibujó una carrocería coupé con morro afilado y una abrupta caída trasera truncada basada en los estudios del aerodinamista alemán Wunibald Kamm.',
      'El Shelby Daytona Coupe (CSX2287) fue una revolución: alcanzó 315 km/h en Mulsanne y ganó las 24 Horas de Le Mans en la categoría GT en 1964. En 1965, con triunfos categóricos en Daytona, Sebring, Monza, Nürburgring y Reims, Shelby American se consagró Campeón Mundial de Constructores de la FIA, grabando con letras de oro el mayor hito del automovilismo deportivo estadounidense.',
    ],
    image: {
      src: shelbyCobraImages.hero,
      alt: 'Líneas agresivas del Shelby Cobra con franjas Le Mans',
      caption: 'La inconfundible librea azul Guardsman Blue con dos franjas blancas que inmortalizó las victorias de Shelby en todo el planeta.',
      tag: 'CAPÍTULO 04 // FIA GT WORLD CHAMPIONSHIP',
    },
    highlight: {
      value: '1965',
      label: 'Campeón Mundial FIA',
      description: 'El primer y único constructor de EE.UU. en vencer el Campeonato Mundial de Gran Turismo de la FIA.',
    },
  },
  {
    number: '05',
    category: 'LA BESTIA 427',
    title: 'El Monstruo Big Block "Side-Oiler": Fuerza Bruta sin Concesiones',
    subtitle: 'Siete litros de cilindrada, 485 caballos de fuerza y el nacimiento del mito 427 S/C Semi-Competition.',
    paragraphs: [
      'Para 1965, Shelby sabía que la competencia aumentaría y decidió dar un salto descomunal instalando el motor Ford 427 FE (Ford-Edsel) "Side-Oiler" de 7.0 litros de NASCAR. El chasis del 289 era incapaz de digerir semejante bestia de hierro fundido, por lo que fue rediseñado por completo junto a los ingenieros de Ford en Detroit: tubos de 4 pulgadas en lugar de 3, suspensión independiente por dobles trapecios y anchos pasos de rueda abultados para calzar neumáticos gigantescos.',
      'Para homologar el 427 en el Grupo 3 de la FIA se requerían 100 unidades fabricadas. Cuando los inspectores llegaron a las instalaciones de Shelby, solo encontraron 53 unidades terminadas. Descartada la homologación, Shelby tomó 31 de esos chasis de pura competición y los adaptó para la calle como "427 S/C" (Semi-Competition): añadió un pequeño parabrisas y silenciadores laterales, creando el coche de calle más rápido, visceral y aterrador del siglo XX con 485 CV y un 0-100 km/h en 3.8 segundos.',
    ],
    image: {
      src: shelbyCobraImages.engine,
      alt: 'Vano motor del Ford 427 FE Big Block Side-Oiler',
      caption: 'El legendario bloque Ford 427 con doble carburador Holley, tapas de balancines con aletas Cobra y colectores tubulares independientes.',
      tag: 'CAPÍTULO 05 // 427 FE SIDE-OILER',
    },
    highlight: {
      value: '485 CV',
      label: 'Potencia 427 S/C',
      description: 'Cifras astronómicas para 1965 sobre un chasis de poco más de 1.000 kg de peso en vacío.',
    },
  },
  {
    number: '06',
    category: 'EL SANTO GRIAL',
    title: 'El "Super Snake" CSX3015 y la Inmortalidad del Mito Cobra',
    subtitle: 'Doble compresor Paxton, 800 caballos de fuerza y el legado eterno de la cobra real de Carroll Shelby.',
    paragraphs: [
      'En 1966, Carroll Shelby decidió empujar los límites de la física automotriz aún más lejos. Tomó el chasis CSX3015 de competición y le instaló dos supercargadores centrífugos Paxton alimentando el motor 427 FE a través de dos carburadores Holley de cuatro bocas. El resultado fue bautizado como el Cobra 427 "Super Snake": generaba más de 800 caballos de potencia y era capaz de quemar goma en tercera marcha a más de 150 km/h.',
      'Solo se construyeron dos unidades del Super Snake: el personal de Shelby (que condujo durante décadas) y el CSX3303 entregado al comediante Bill Cosby. Hoy en día, un Shelby Cobra 427 original es una de las piezas mecánicas más cotizadas del planeta, superando los 13 millones de dólares en subastas. Una máquina salvaje, analógica y sin filtros que encarna la cumbre del ingenio, la audacia y la pasión por la velocidad pura.',
    ],
    image: {
      src: shelbyCobraImages.hero,
      alt: 'Detalle de la zaga y escapes del Shelby Cobra 427',
      caption: 'Una escultura rodante de músculo y ligereza que convirtió a Carroll Shelby en una leyenda viva del motor.',
      tag: 'CAPÍTULO 06 // EL SANTO GRIAL',
    },
    highlight: {
      value: '800+ CV',
      label: '427 Super Snake',
      description: 'La creación más extrema de Carroll Shelby con doble compresor Paxton y aceleración colosal.',
    },
  },
];
