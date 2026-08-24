import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import xj220HeroImg from '../assets/images/xj220_hero_studio_1787273477819.jpg';
import xj220BlueprintImg from '../assets/images/xj220_technical_blueprint_1787273488562.jpg';
import xj220EngineImg from '../assets/images/xj220_jv6_real_engine_1787414405145.jpg';
import xj220cLeMansImg from '../assets/images/xj220c_lemans_race_1787273509597.jpg';
import xj220InteriorImg from '../assets/images/xj220_cockpit_interior_1787273521074.jpg';

export const xj220Images = {
  hero: xj220HeroImg,
  blueprint: xj220BlueprintImg,
  engine: xj220EngineImg,
  lemans: xj220cLeMansImg,
  interior: xj220InteriorImg,
};

export const xj220Gallery = [
  {
    id: 'img-1',
    src: xj220HeroImg,
    title: 'Jaguar XJ220 Supercar (1992)',
    category: 'ESTUDIO & CARROCERÍA',
    description: 'Silueta escultural de aluminio conformada a mano por JaguarSport en Bloxham. Diseñado por Keith Helfet.',
    aspect: '16:9',
  },
  {
    id: 'img-2',
    src: xj220BlueprintImg,
    title: 'Plano Técnico de Ingeniería y Flujo Aerodinámico',
    category: 'ESQUEMA TÉCNICO CAD',
    description: 'Plano seccional con cotas de chasis, efecto suelo ventral y túneles venturi que logran un coeficiente Cx de 0.36.',
    aspect: '16:9',
  },
  {
    id: 'img-3',
    src: xj220EngineImg,
    title: 'Propulsor JRV-6 3.5L V6 Biturbo (550 CV)',
    category: 'MECÁNICA & TURBOS',
    description: 'V6 a 90° con doble turbocompresor Garrett T3, intercoolers aire-aire y más de 640 Nm de par motor.',
    aspect: '16:9',
  },
  {
    id: 'img-4',
    src: xj220cLeMansImg,
    title: 'Jaguar XJ220-C en las 24 Horas de Le Mans (1993)',
    category: 'COMPETICIÓN GT',
    description: 'Unidad nº 50 pilotada por David Brabham, John Nielsen y David Coulthard, vencedora en pista de la clase GT.',
    aspect: '16:9',
  },
  {
    id: 'img-5',
    src: xj220InteriorImg,
    title: 'Cockpit & Instrumentación en Puerta del Conductor',
    category: 'INTERIOR & ERGONOMÍA',
    description: 'Habitáculo envolvente tapizado en cuero Connolly con los famosos 4 relojes analógicos auxiliares en la puerta.',
    aspect: '16:9',
  },
];

export const xj220Stats: StatItem[] = [
  { value: '550', unit: 'CV', label: 'POTENCIA' },
  { value: '3.5', unit: 'L', label: 'V6 BITURBO' },
  { value: '343+', unit: 'KM/H', label: 'VELOCIDAD' },
  { value: '~1470', unit: 'KG', label: 'PESO' },
];

export const xj220Timeline: TimelineItem[] = [
  {
    year: '1984',
    title: 'Nace la idea',
    description: 'Jim Randle comienza a concebir el proyecto junto a un selecto grupo de ingenieros apasionados fuera del horario laboral.',
  },
  {
    year: '1985–1987',
    title: 'Desarrollo secreto',
    description: 'El denominado "Saturday Club" desarrolla en secreto prototipos y soluciones aerodinámicas de alta tecnología.',
  },
  {
    year: '1988',
    title: 'Debut del prototipo',
    description: 'Jaguar presenta el XJ220 con motor V12 de 6.2 litros y tracción integral en el Salón de Birmingham con ovación mundial.',
  },
  {
    year: '1989',
    title: 'Producción aprobada',
    description: 'La abrumadora demanda anima a Jaguar y TWR a autorizar un programa de producción limitada en serie.',
  },
  {
    year: '1990–1991',
    title: 'Desarrollo definitivo',
    description: 'Por motivos de peso, dimensiones y emisiones, el V12 es sustituido por el V6 biturbo del Grupo B y tracción trasera.',
  },
  {
    year: '1992',
    title: 'Comienza la entrega',
    description: 'Inicia la fabricación artesanal en Bloxham para los primeros clientes a pesar de la recesión económica mundial.',
  },
  {
    year: '1993',
    title: 'Gesta en Le Mans',
    description: 'El XJ220-C número 50 gana su categoría en las 24 Horas de Le Mans antes de una polémica descalificación técnica.',
  },
  {
    year: '1994',
    title: 'Fin de producción',
    description: 'El último XJ220 abandona la factoría de Bloxham, cerrando una de las leyendas más fascinantes del automovilismo.',
  },
];

export const xj220Specs: SpecItem[] = [
  { label: 'MOTOR', value: 'V6 3.5 L BITURBO' },
  { label: 'CONFIGURACIÓN', value: 'V6 A 90° LONGITUDINAL' },
  { label: 'POTENCIA MÁXIMA', value: '550 CV @ 7.200 RPM' },
  { label: 'PAR MOTOR', value: '~644 NM @ 4.500 RPM' },
  { label: 'TRACCIÓN', value: 'PROPULSIÓN TRASERA (RWD)' },
  { label: 'TRANSMISIÓN', value: 'MANUAL / 5 VELOCIDADES' },
  { label: 'PESO EN VACÍO', value: '~1.470 KG' },
  { label: 'ACELERACIÓN 0–60 MPH', value: '≈ 3,6 SEGUNDOS' },
  { label: 'VELOCIDAD MÁXIMA', value: '≈ 343 - 349 KM/H' },
  { label: 'RÉCORD NARDÒ', value: '217,1 MPH (349,4 KM/H)' },
  { label: 'CARROCERÍA', value: 'PANELES DE ALUMINIO FORMADOS' },
  { label: 'CENTRO DE FABRICACIÓN', value: 'BLOXHAM, OXFORDSHIRE (UK)' },
  { label: 'UNIDADES FABRICADAS', value: '≈ 275–281 EJEMPLARES' },
  { label: 'PERÍODO DE PRODUCCIÓN', value: '1992 – 1994' },
];

export const xj220Chapters: Chapter[] = [
  {
    number: '01',
    category: 'EL CONTEXTO',
    title: 'Jaguar antes del XJ220:',
    subtitle: 'una marca con historia deportiva.',
    isDark: false,
    paragraphs: [
      'Para comprender por qué nació el XJ220 es necesario entender la historia deportiva de Jaguar. Mucho antes de que existiera este superdeportivo, Jaguar ya había construido una reputación internacional gracias a sus automóviles de competición.',
      'Modelos como el XK120, el C-Type y el D-Type habían demostrado que Jaguar podía combinar velocidad, elegancia y tecnología. El D-Type, por ejemplo, consiguió varias victorias históricas en las 24 Horas de Le Mans durante la década de 1950.',
      'Esa relación con Le Mans era especialmente importante. La competición había forjado la identidad de Jaguar como fabricante capaz de desafiar a las marcas europeas más prestigiosas.',
      'Décadas después, los ingenieros de Jaguar querían recuperar precisamente esa mística. No buscaban simplemente construir otro automóvil rápido: querían erigir una declaración tecnológica absoluta.',
    ],
  },
  {
    number: '02',
    category: 'THE SATURDAY CLUB',
    title: 'El proyecto secreto',
    subtitle: 'de los ingenieros visionarios.',
    isDark: true,
    paragraphs: [
      'En diciembre de 1984, el ingeniero jefe de Jaguar, Jim Randle, comenzó a imaginar un automóvil deportivo completamente diferente de los modelos que Jaguar producía habitualmente en su catálogo de gran turismo.',
      'Randle convocó a un pequeño grupo de ingenieros y diseñadores apasionados que compartían el mismo sueño: concebir un superdeportivo con tecnología nacida en los circuitos.',
      'El proyecto no contaba inicialmente con presupuesto oficial ni autorización de la directiva para un programa de producción. Por ello, el equipo comenzó a reunirse y trabajar durante sus fines de semana y horas libres.',
      'Debido a estas sesiones voluntarias fuera del horario laboral, el grupo pasó a la historia con el legendario nombre de "The Saturday Club".',
      'El equipo exploró soluciones de vanguardia: monocasco ligero, tracción integral permanente, un motor V12 de competición y una carrocería con efecto suelo aerodinámico.',
    ],
  },
  {
    number: '03',
    category: 'EL PROTOTIPO',
    title: '1988:',
    subtitle: 'el mundo descubre al XJ220.',
    isDark: false,
    paragraphs: [
      'Tras cuatro años de intenso desarrollo clandestino y semi-oficial, Jaguar decidió desvelar el prototipo conceptual en el British International Motor Show de Birmingham de 1988.',
      'El impacto mediático fue electrizante e inmediato.',
      'El automóvil poseía unas proporciones esculturales: extremadamente bajo, muy ancho y con más de 4,9 metros de longitud, esculpido meticulosamente alrededor del flujo de aire.',
      'Bajo su cubierta trasera descansaba un imponente motor V12 atmosférico de 6,2 litros derivado de Le Mans, emparejado con tracción a las cuatro ruedas desarrollada con FF Developments.',
      'La meta declarada era superar las 220 millas por hora (354 km/h), hazaña que inspiró su icónica denominación: XJ220.',
      'La reacción fue tan arrolladora que cientos de compradores adinerados firmaron cheques en blanco en el propio stand para asegurarse una unidad.',
    ],
  },
  {
    number: '04',
    category: 'EL DISEÑO',
    title: 'Una silueta esculpida',
    subtitle: 'exclusivamente para la velocidad.',
    isDark: true,
    image: {
      src: xj220HeroImg,
      alt: 'Jaguar XJ220 Supercar en acabado plateado de estudio',
      caption: 'La silueta del XJ220 esculpida por Keith Helfet combinaba curvas aerodinámicas de aluminio con una presencia imponente de casi 5 metros de largo.',
      tag: 'DISEÑO DE CARROCERÍA',
    },
    paragraphs: [
      'El diseño estético del XJ220, obra de Keith Helfet, se convirtió en una de las obras cumbres del diseño industrial automotriz.',
      'La carrocería destacaba por superficies fluidas y limpias sin alerones ostentosos, confiando en difusores ventrales y túneles venturi para generar carga aerodinámica.',
      'Su perfil elíptico lograba un coeficiente de arrastre asombrosamente bajo para su época (Cx de 0.36), permitiendo una estabilidad direccional intachable por encima de los 300 km/h.',
      'Conservaba la gracia felina tradicional de Jaguar pero elevada a proporciones casi alienígenas para la década de 1990.',
    ],
  },
  {
    number: '05',
    category: 'EL CAMBIO',
    title: 'El V12 desaparece:',
    subtitle: 'el proyecto sufre un giro radical.',
    isDark: false,
    paragraphs: [
      'Transformar un prototipo de salón en un vehículo homologable para la calle con garantías mundiales exigía superar obstáculos colosales de peso, refrigeración y normativas de emisiones.',
      'El gigantesco motor V12 con tracción total resultaba excesivamente pesado (casi 1.900 kg estimados) y difícil de refrigerar en el vano central.',
      'La decisión técnica más audaz fue sustituir el V12 por un compacto V6 de 3,5 litros con dos turbocompresores Garrett, derivado del laureado propulsor de rallyes del MG Metro 6R4 y perfeccionado por TWR.',
      'Asimismo, la compleja tracción integral se desechó a favor de una tradicional propulsión trasera, recortando más de 300 kg de masa total.',
      'A pesar de que el coche de producción era sustancialmente más rápido y ágil que el concepto V12, este cambio de especificaciones generó descontento entre los puristas.',
    ],
  },
  {
    number: '06',
    category: 'TWR',
    title: 'JaguarSport y TWR:',
    subtitle: 'la alianza con Tom Walkinshaw.',
    isDark: true,
    paragraphs: [
      'Para materializar la producción del XJ220 con rigor de carreras, Jaguar creó la empresa conjunta JaguarSport junto a Tom Walkinshaw Racing (TWR).',
      'TWR atesoraba victorias indiscutibles en el Campeonato Mundial de Resistencia y en Le Mans con los prototipos XJR-9 y XJR-12.',
      'Se construyó una factoría dedicada en Bloxham, Oxfordshire, concebida como un centro de alta artesanía donde cada unidad se ensamblaba a mano con tolerancias de competición.',
    ],
  },
  {
    number: '07',
    category: 'EL MOTOR',
    title: 'El motor JV6:',
    subtitle: 'un corazón compacto de furia biturbo.',
    isDark: false,
    image: {
      src: xj220EngineImg,
      alt: 'Propulsor Jaguar JRV-6 V6 Biturbo de 3.5 Litros con turbos gemelos Garrett',
      caption: 'El motor JRV-6 de 3.498 cc con doble turbocompresor Garrett y doble intercooler producía 550 CV y una aceleración demoledora.',
      tag: 'MOTORIZACIÓN & TURBO',
    },
    paragraphs: [
      'El bloque motor, denominado internamente JRV-6, cubicaba 3.498 cc con 4 válvulas por cilindro y doble árbol de levas en cabeza.',
      'Alimentado por dos turbos Garrett T3 con intercoolers gemelos, entregaba unos descomunales 550 caballos de fuerza y 644 Nm de par motor.',
      'La entrega de potencia era explosiva: una vez superado el retardo inicial del turbo, el empuje catapultaba el bólido hacia el horizonte con una violencia mecánica fascinante.',
      'Asociado a una caja manual de 5 marchas sincronizadas, requería manos expertas y absoluto respeto al volante.',
    ],
  },
  {
    number: '08',
    category: 'PRESTACIONES',
    title: 'Cuando los 340 km/h',
    subtitle: 'parecían una quimera inalcanzable.',
    isDark: true,
    paragraphs: [
      'A principios de los años noventa, rebasar los 320 km/h en un automóvil de serie representaba la cima absoluta de la ingeniería.',
      'En las míticas pruebas en el anillo de alta velocidad de Nardò en Italia, el piloto Martin Brundle alcanzó 217,1 mph (349,4 km/h) tras retirar temporalmente los catalizadores para calibración.',
      'Con catalizadores de serie oficiales, el coche homologó 341,7 km/h (212,3 mph), coronándose oficialmente como el automóvil de producción más veloz del planeta hasta la llegada del McLaren F1.',
    ],
  },
  {
    number: '09',
    category: 'AERODINÁMICA',
    title: 'Efecto suelo y túneles:',
    subtitle: 'la ciencia del aire invisible.',
    isDark: false,
    image: {
      src: xj220BlueprintImg,
      alt: 'Plano técnico y esquema de aerodinámica del Jaguar XJ220',
      caption: 'Esquema de ingeniería con cotas, plano de chasis y flujo de efecto suelo. El difusor trasero y túneles venturi generaban agarre a más de 340 km/h.',
      tag: 'PLANO TÉCNICO CAD',
    },
    paragraphs: [
      'La eficiencia aerodinámica del XJ220 no dependía de grandes apéndices visibles, sino de su fondo plano carenado y su gigantesco difusor trasero.',
      'El diseño generaba una depresión controlada bajo el chasis que succionaba el vehículo contra el asfalto a medida que aumentaba la velocidad, aumentando el agarre sin penalizar el avance.',
      'Incluso los faros escamoteables contaban con deflectores que bajaban al encenderse para minimizar las turbulencias frontales.',
    ],
  },
  {
    number: '10',
    category: 'EL MERCADO',
    title: 'El cambio de era:',
    subtitle: 'la crisis y la recesión de los 90.',
    isDark: true,
    paragraphs: [
      'Mientras el XJ220 se preparaba para debutar en la calle, el colapso financiero de principios de los noventa golpeó con dureza el mercado especulativo de superdeportivos.',
      'Compradores que habían abonado depósitos de 50.000 libras vieron cómo el precio final escalaba hasta casi 470.000 libras esterlinas (equivalente a más de un millón de euros actuales).',
      'Muchos especuladores intentaron rescindir sus contratos alegando el cambio de motorización del V12 al V6, desembocando en sonados litigios legales.',
    ],
  },
  {
    number: '11',
    category: 'CONTROVERSIA',
    title: 'Del sueño al litigio:',
    subtitle: 'el dilema de las expectativas.',
    isDark: false,
    paragraphs: [
      'La polémica entre el prototipo soñado y la realidad de producción marcó profundamente la percepción del XJ220 en su momento.',
      'Jaguar ganó la mayoría de los arbitrajes judiciales demostrando que el vehículo entregado superaba con creces las prestaciones dinámicas prometidas.',
      'Aun así, la tormenta mediática opacó temporalmente lo que objetivamente era un triunfo magistral de la ingeniería automotriz británica.',
    ],
  },
  {
    number: '12',
    category: 'PRODUCCIÓN',
    title: 'Artesanía en Bloxham:',
    subtitle: 'menos de 300 leyendas fabricadas.',
    isDark: true,
    paragraphs: [
      'Entre 1992 y 1994, únicamente se produjeron entre 275 y 281 unidades en la factoría de Oxfordshire.',
      'Cada unidad requería semanas de confección manual: paneles de aluminio batidos, tapicería en piel Connolly cosida a mano y ensamblaje de chasis con adhesivos aeroespaciales.',
      'Esta limitada tirada consolidó al XJ220 como uno de los modelos más exclusivos y codiciados de toda la historia de Jaguar.',
    ],
  },
  {
    number: '13',
    category: 'LE MANS',
    title: 'Gloria y descalificación:',
    subtitle: 'el XJ220-C en La Sarthe en 1993.',
    isDark: false,
    image: {
      src: xj220cLeMansImg,
      alt: 'Jaguar XJ220-C compitiendo en las 24 Horas de Le Mans en 1993',
      caption: 'El Jaguar XJ220-C nº 50 cruzó la meta en primera posición de la clase GT en Le Mans 1993 antes de una polémica descalificación técnica.',
      tag: 'LE MANS 1993 / MOTORSPORT',
    },
    paragraphs: [
      'TWR adaptó tres unidades para la clase GT de las 24 Horas de Le Mans de 1993, denominadas Jaguar XJ220-C.',
      'Pilotado por David Brabham, John Nielsen y David Coulthard, el bólido nº 50 dominó implacablemente su categoría y cruzó la meta en primera posición.',
      'Sin embargo, semanas después, los comisarios técnicos de la ACO descalificaron la victoria por una controvertida apelación sobre los escapes sin convertidores catalíticos, una decisión que sigue debatiéndose hasta hoy.',
    ],
  },
  {
    number: '14',
    category: 'XJ220-C',
    title: 'La bestia de competición:',
    subtitle: 'puro músculo sin concesiones.',
    isDark: true,
    paragraphs: [
      'El XJ220-C despojó al superdeportivo de todo lujo: interior en fibra de carbono vista, jaula antivuelco integral, frenos sobredimensionados y una aerodinámica revisada con splitter frontal y alerón trasero fijo.',
      'Su motor V6 fue exprimido hasta rozar los 680 caballos de potencia en especificación de clasificación.',
      'Demostró que el chasis de aluminio poseía una rigidez torsional formidable, rivalizando directamente con los Porsche 911 RSR y Ferrari F40 LM.',
    ],
  },
  {
    number: '15',
    category: 'JAGUAR XJ220S',
    title: 'El radical XJ220S:',
    subtitle: 'la variante homologada para calle de TWR.',
    isDark: false,
    paragraphs: [
      'Para conmemorar el programa de Le Mans, TWR fabricó una serie ultra-restringida de solo 6 ejemplares denominada Jaguar XJ220S.',
      'Reemplazaron la mayor parte de los paneles de aluminio por fibra de carbono, instalaron faros fijos de policarbonato, un splitter frontal prominente y elevaron la potencia hasta los 680 CV.',
      'El peso se redujo drásticamente a 1.080 kg, convirtiéndolo en un misil de calle capaz de acelerar de 0 a 100 km/h en apenas 3,3 segundos.',
    ],
  },
  {
    number: '16',
    category: 'INTERIOR',
    title: 'El habitáculo:',
    subtitle: 'deportividad envuelta en cuero Connolly.',
    isDark: true,
    image: {
      src: xj220InteriorImg,
      alt: 'Interior y cuadro de mandos del Jaguar XJ220 con relojes en la puerta',
      caption: 'Puesto de conducción con cuatro relojes analógicos en la puerta del piloto, consola central orientada y refinada tapicería en cuero Connolly.',
      tag: 'HABITÁCULO & DETALLES',
    },
    paragraphs: [
      'El habitáculo del XJ220 ofrecía una peculiar mezcla de cockpit de carreras y sofisticación inglesa.',
      'Una de sus mayores señas de identidad era la ubicación de cuatro relojes analógicos de instrumentación auxiliar (presión de turbo, voltímetro, reloj y temperatura de aceite) montados directamente en el panel de la puerta del conductor.',
      'Los asientos baquet tapizados en fino cuero y el salpicadero envolvente creaban una atmósfera futurista e inconfundible.',
    ],
  },
  {
    number: '17',
    category: 'RIVALES',
    title: 'La era dorada:',
    subtitle: 'F40, 959, EB110 y XJ220 frente a frente.',
    isDark: false,
    paragraphs: [
      'El cambio de década entre los años 80 y 90 dio a luz a los cuatro pilares fundamentales del superdeportivo moderno: el visceral Ferrari F40, el cerebral Porsche 959, el cuatriturbo Bugatti EB110 y el estilizado Jaguar XJ220.',
      'Cada uno encarnaba una filosofía técnica radicalmente diferente, pero el XJ220 reinaba indiscutiblemente en el apartado de velocidad punta pura.',
    ],
  },
  {
    number: '18',
    category: 'EL FINAL',
    title: '1994: el telón cae',
    subtitle: 'sobre una hazaña irrepetible.',
    isDark: true,
    paragraphs: [
      'En 1994 cesó la producción en Bloxham tras cumplir su ciclo de vida y satisfacer los pedidos comprometidos.',
      'Lo que había empezado en 1984 como un sueño clandestino en servilletas de papel durante un sábado por la tarde culminó en una de las máquinas más emblemáticas del siglo XX.',
    ],
  },
  {
    number: '19',
    category: 'DATOS CURIOSOS',
    title: 'Secretos del bólido:',
    subtitle: 'detalles únicos y curiosidades de ingeniería.',
    isDark: false,
    paragraphs: [
      'El motor JRV-6 V6 biturbo del XJ220 fue probado inicialmente en una furgoneta Ford Transit modificada por TWR que sorprendía a los conductores en las autopistas inglesas.',
      'Los retrovisores exteriores provenían del Citroën CX, una práctica habitual de la época compartida con el McLaren F1 y Lotus Esprit.',
      'Los pilotos traseros fueron heredados del Rover 200/400 pero enmascarados con una elegante rejilla estriada enrasada.',
      'Con 2,22 metros de anchura total con espejos, era más ancho que casi cualquier coche de su era, requiriendo suma atención en carreteras estrechas británicas.',
    ],
  },
  {
    number: '20',
    category: 'LEGADO',
    title: 'El juicio de la historia:',
    subtitle: 'el nacimiento de un icono inmortal.',
    isDark: true,
    paragraphs: [
      'Con el paso de las décadas, la nostalgia y la perspectiva histórica han situado al Jaguar XJ220 en el olimpo de los clásicos más reverenciados.',
      'Lejos de las turbulencias comerciales de su época, hoy es admirado como la máxima expresión de audacia ingenieril británica: un supercoche que desafió las leyes de la física y definió una época legendaria.',
    ],
  },
];
