import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import camaroMustangHeroImg from '../assets/images/camaro_mustang_hero_1787489295341.jpg';
import transAmBattleImg from '../assets/images/transam_muscle_battle_1787489315599.jpg';
import v8MuscleEngineImg from '../assets/images/v8_muscle_engine_1787489331642.jpg';
import camaroMustangCadImg from '../assets/images/camaro_mustang_cad_1787489347700.jpg';

export const camaroMustangImages = {
  hero: camaroMustangHeroImg,
  transAm: transAmBattleImg,
  engine: v8MuscleEngineImg,
  cad: camaroMustangCadImg,
};

export const camaroMustangStats: StatItem[] = [
  { value: '60+', unit: 'AÑOS', label: 'De rivalidad ininterrumpida (1964-presente)' },
  { value: '15M+', unit: 'UNIDADES', label: 'Pony Cars combinados vendidos en todo el mundo' },
  { value: '760', unit: 'HP', label: 'Potencia Shelby GT500 Predator 5.2L Supercharged' },
  { value: '650', unit: 'HP', label: 'Potencia Camaro ZL1 1LE LT4 6.2L Supercharged' },
  { value: '7:16.04', unit: 'MIN', label: 'Récord Camaro ZL1 1LE en Nürburgring Nordschleife' },
  { value: '429 / 427', unit: 'CI', label: 'Cilindradas míticas Big Block en la cúspide de 1969' },
];

export const camaroMustangTimeline: TimelineItem[] = [
  {
    year: '17 de Abril de 1964',
    title: 'La Feria Mundial de Nueva York y el Fenómeno Mustang',
    description:
      'Ford presenta el Mustang concebido por Lee Iacocca y Donald Frey. Con un precio base de $2.368 dólares, Ford planeaba vender 100.000 unidades en su primer año, pero supera las 400.000 en 12 meses y un millón en dos años. Nace oficialmente la era del "Pony Car".',
  },
  {
    year: '29 de Junio de 1966',
    title: 'La Primera Rueda de Prensa Satelital: Nace el Camaro',
    description:
      'Pete Estes, director general de Chevrolet, convoca a 14 hoteles simultáneamente y desvela el proyecto secreto "XP-836 / Panther". Al ser preguntado por la prensa sobre qué es un Camaro, responde con ironía histórica: "Un animal pequeño y feroz que se alimenta de Mustangs".',
  },
  {
    year: '1967',
    title: 'El Debut del Camaro y el Código Secreto Z/28 de Vince Piggins',
    description:
      'Chevrolet lanza el Camaro 1967 en versiones estándar, Rally Sport (RS) y Super Sport (SS). Para homologar el coche en las carreras Trans-Am de la SCCA, Vince Piggins crea bajo cuerda la opción RPO Z28 con un motor 302 ci de bloque pequeño y cigüeñal de carrera corta diseñado para girar a más de 7.000 rpm.',
  },
  {
    year: '1968 — 1970',
    title: 'La Guerra Total del SCCA Trans-Am: Donohue vs. Parnelli Jones',
    description:
      'El campeonato Trans-Am enfrenta al equipo Sunoco Camaro de Roger Penske con Mark Donohue contra los Mustang Boss 302 del equipo de Bud Moore pilotados por Parnelli Jones y George Follmer. Son tres temporadas épicas con roces de chapa, motores al límite y récords de vuelta.',
  },
  {
    year: '1969',
    title: 'El Cenit del Músculo: Boss 429, Mach 1, SS 396 y el Monstruo COPO ZL-1',
    description:
      'Ford crea el Mustang Boss 429 con culatas semi-hemisféricas para homologar su motor en NASCAR. Paralelamente, distribuidores rebeldes de Chevrolet como Don Yenko y Fred Gibb utilizan el sistema de pedidos especiales de flota (COPO 9560) para montar el motor V8 427 ZL-1 de aluminio de Can-Am en 69 unidades del Camaro.',
  },
  {
    year: '1974 — 1981',
    title: 'La Crisis del Petróleo y la Era Malaise',
    description:
      'Las normativas de emisiones y el embargo petrolero estrangulan la potencia. Ford transforma el Mustang en el compacto Mustang II (1974) basado en el Pinto, logrando enormes ventas urbanas. Chevrolet mantiene el Camaro de 2ª generación con el Z28 y paragolpes de aluminio, manteniendo vivo el espíritu visual V8.',
  },
  {
    year: '1982 — 1993',
    title: 'El Renacimiento Callejero: Mustang Fox Body 5.0 vs. Camaro IROC-Z',
    description:
      'La inyección electrónica devuelve la gloria. El Mustang GT con plataforma Fox y el motor 5.0L High Output se convierte en el rey de las carreras callejeras de cuarto de milla. Chevrolet contraataca con el Camaro IROC-Z de 3ª generación con suspensión rebajada Bilstein, inyección TPI 5.7L y diseño ultra afilado.',
  },
  {
    year: '2005 — 2010',
    title: 'La Fiebre Retro y el Retorno Triunfal de Chevrolet',
    description:
      'Ford redefine el mercado en 2005 con el Mustang S197 de estética retro inspirada en 1969. Tras la discontinuación del Camaro en 2002, General Motors presenta el concept del Camaro de 5ª generación (famoso como "Bumblebee" en Transformers), relanzándolo en 2010 con plataforma Zeta y suspensión trasera independiente.',
  },
  {
    year: '2015 — Presente',
    title: 'Coches de Circuito de Élite Mundial: GT350R / GT500 vs. ZL1 1LE',
    description:
      'La rivalidad trasciende las pistas de aceleración y conquista Nürburgring y Laguna Seca. El Shelby GT350R introduce un V8 5.2L Voodoo atmosférico con cigüeñal plano que gira a 8.250 rpm. El Camaro ZL1 1LE incorpora amortiguadores Multimatic DSSV de F1 y aerodinámica de carbono para humillar a superdeportivos europeos.',
  },
];

export const camaroMustangSpecs: {
  classicMustang: SpecItem[];
  classicCamaro: SpecItem[];
  modernMustang: SpecItem[];
  modernCamaro: SpecItem[];
} = {
  classicMustang: [
    { label: 'Modelo Insignia', value: '1969 Ford Mustang Boss 429 / Boss 302' },
    { label: 'Motor Boss 302', value: '302 ci (4.9L) Small Block V8 Windsor/Cleveland Híbrido' },
    { label: 'Motor Boss 429', value: '429 ci (7.0L) Big Block V8 "Shotgun" Semi-Hemi' },
    { label: 'Carburador', value: 'Holley 4 bocas 780 CFM (Boss 302) / 735 CFM (Boss 429)' },
    { label: 'Potencia Oficial (Subestimada)', value: '290 HP @ 5.800 rpm (Boss 302) / 375 HP @ 5.200 rpm (Boss 429)' },
    { label: 'Potencia Real en Dinamómetro', value: '350+ HP (Boss 302) / 470+ HP (Boss 429 deslimitado)' },
    { label: 'Par Motor', value: '393 Nm @ 4.300 rpm (302) / 610 Nm @ 3.400 rpm (429)' },
    { label: 'Transmisión', value: 'Manual Toploader de 4 velocidades con palanca Hurst' },
    { label: 'Diferencial Trasero', value: 'Ford 9 pulgadas con autoblocante Traction-Lok (3.91:1 / 4.30:1)' },
    { label: 'Aceleración 0-100 km/h', value: '5.3 - 6.5 segundos (según relación de cambio)' },
    { label: 'Cuarto de Milla (1/4 milla)', value: '13.6 seg @ 106 mph (Boss 429)' },
    { label: 'Peso en Vacío', value: '1.450 kg (Boss 302) / 1.620 kg (Boss 429)' },
  ],
  classicCamaro: [
    { label: 'Modelo Insignia', value: '1969 Chevrolet Camaro Z/28 / COPO 9560 ZL-1' },
    { label: 'Motor Z/28 (RPO Z28)', value: '302 ci (4.9L) Small Block V8 (Bloque 327 + Cigüeñal 283)' },
    { label: 'Motor COPO ZL-1', value: '427 ci (7.0L) Big Block V8 100% de Aluminio Can-Am' },
    { label: 'Carburador', value: 'Holley 780 CFM 4 bocas / Opción Cross-Ram de doble 4 bocas' },
    { label: 'Potencia Oficial (Subestimada)', value: '290 HP @ 5.800 rpm (Z/28) / 430 HP @ 5.200 rpm (ZL-1)' },
    { label: 'Potencia Real en Dinamómetro', value: '360-390 HP (Z/28 @ 7.200 rpm) / 520+ HP (COPO ZL-1)' },
    { label: 'Par Motor', value: '393 Nm @ 4.200 rpm (Z/28) / 610 Nm @ 4.400 rpm (ZL-1)' },
    { label: 'Transmisión', value: 'Manual Muncie M21 / M22 "Rock Crusher" de 4 velocidades' },
    { label: 'Diferencial Trasero', value: 'GM 12-Bolt Posi-Traction de servicio pesado (3.73:1 / 4.10:1)' },
    { label: 'Aceleración 0-100 km/h', value: '5.1 - 6.2 segundos' },
    { label: 'Cuarto de Milla (1/4 milla)', value: '12.1 seg @ 116 mph (COPO ZL-1 con slicks de fábrica)' },
    { label: 'Peso en Vacío', value: '1.430 kg (Z/28) / 1.490 kg (COPO ZL-1 con motor de aluminio)' },
  ],
  modernMustang: [
    { label: 'Modelo Cúspide', value: 'Ford Mustang Shelby GT500 (Gen S550) / Dark Horse (S650)' },
    { label: 'Motor Shelby GT500', value: '5.2L V8 "Predator" DOHC 32V con compresor Eaton 2.65L' },
    { label: 'Potencia Máxima', value: '760 HP (771 CV) @ 7.300 rpm' },
    { label: 'Par Motor', value: '847 Nm (625 lb-ft) @ 5.000 rpm' },
    { label: 'Línea Roja (Corte)', value: '7.500 rpm (8.250 rpm en el atmosférico GT350R Voodoo)' },
    { label: 'Transmisión', value: 'Tremec TR-9070 de doble embrague (DCT) de 7 velocidades' },
    { label: 'Frenos', value: 'Brembo de 6 pistones delanteros con discos de dos piezas de 420 mm' },
    { label: '0-100 km/h', value: '3.3 segundos' },
    { label: 'Cuarto de Milla', value: '10.7 segundos @ 133 mph' },
    { label: 'Velocidad Máxima', value: '290 km/h (limitada por carga aerodinámica masiva)' },
    { label: 'Suspensión', value: 'MagneRide adaptativa con amortiguadores magnetorreológicos' },
  ],
  modernCamaro: [
    { label: 'Modelo Cúspide', value: 'Chevrolet Camaro ZL1 1LE (Plataforma Alpha)' },
    { label: 'Motor Camaro ZL1', value: '6.2L V8 LT4 Supercharged OHV 16V con compresor Eaton 1.74L' },
    { label: 'Potencia Máxima', value: '650 HP (659 CV) @ 6.400 rpm' },
    { label: 'Par Motor', value: '881 Nm (650 lb-ft) @ 3.600 rpm' },
    { label: 'Línea Roja (Corte)', value: '6.600 rpm' },
    { label: 'Transmisión', value: 'Manual Tremec MH3 de 6 velocidades con Active Rev Match / Auto 10 vel.' },
    { label: 'Frenos', value: 'Brembo monobloque de 6 pistones con discos flotantes de 390 mm' },
    { label: '0-100 km/h', value: '3.5 segundos' },
    { label: 'Cuarto de Milla', value: '11.4 segundos @ 125 mph' },
    { label: 'Velocidad Máxima', value: '320 km/h (sin paquete aerodinámico 1LE) / 306 km/h (1LE)' },
    { label: 'Suspensión 1LE', value: 'Multimatic DSSV (Dynamic Suspensions Spool Valve) de competición F1' },
  ],
};

export const camaroMustangChapters: Chapter[] = [
  {
    number: '01',
    category: 'GÉNESIS // ABRIL DE 1964',
    title: 'El Golpe Maestro de Lee Iacocca y el Nacimiento del Pony Car',
    subtitle: 'Cómo un cupé económico derivado del Falcon tomó por sorpresa a toda la industria de Detroit',
    paragraphs: [
      'A principios de la década de 1960, la demografía de los Estados Unidos experimentaba una transformación radical con la llegada a la mayoría de edad de la generación del Baby Boom. Los jóvenes no querían los pesados, sobrios y aburridos sedanes de cuatro puertas que conducían sus padres. Querían estilo, juventud, individualismo y prestaciones accesibles. Lee Iacocca, el carismático y visionario vicepresidente de Ford Motor Company, comprendió este fenómeno sociológico antes que nadie.',
      'Junto con el ingeniero Donald Frey y el diseñador Joe Oros, Iacocca lideró un proyecto ultrasecreto en las entrañas de Dearborn conocido como "Fairlane Committee". La premisa era brillante en su sencillez: construir un vehículo con proporciones de deportivo europeo —un morro largo y estilizado combinado con una zaga corta y musculosa— pero utilizando la plataforma económica y probada del modesto Ford Falcon. Esto permitía contener drásticamente los costes de fabricación y ofrecer el automóvil a un precio base rompedor de apenas 2.368 dólares.',
      'El 17 de abril de 1964, en la Feria Mundial de Flushing Meadows en Nueva York, Ford desveló el Mustang. La respuesta popular no tuvo precedentes en la historia del automóvil: los concesionarios fueron asediados por compradores que hacían cola en las aceras, firmaban cheques sobre el capó e incluso dormían dentro de los vehículos en exhibición para evitar que fueran vendidos a otros clientes. Ford estimaba vender 100.000 unidades en todo el primer año; en su lugar, despachó 22.000 pedidos el primer día, superó las 418.000 unidades en doce meses y alcanzó el millón de Mustangs vendidos en apenas dos años.',
      'El éxito colosal del Mustang pilló a General Motors en un estado de parálisis y complacencia absoluta. GM confiaba ciegamente en que su Chevrolet Corvair de motor trasero refrigerado por aire satisfaría a los compradores juveniles, pero tras la demoledora publicación del libro "Unsafe at Any Speed" de Ralph Nader y el imparable tsunami comercial del caballo salvaje de Ford, la cúpula de GM en Detroit comprendió que estaban perdiendo el tren de la historia. Había que responder de inmediato, con toda la fuerza del imperio industrial de Chevrolet.',
    ],
    highlight: {
      value: '418.812',
      label: 'Mustangs vendidos en los primeros 12 meses',
      description: 'El récord de ventas para un automóvil de debut en la historia de la industria estadounidense.',
    },
  },
  {
    number: '02',
    category: 'CONTRAATAQUE GM // 1966',
    title: 'Proyecto Panther: "Un Animal Pequeño y Feroz que se Alimenta de Mustangs"',
    subtitle: 'La respuesta de ingeniería de Chevrolet y la mítica rueda de prensa satelital de Pete Estes',
    paragraphs: [
      'En el verano de 1964, bajo la dirección del ingeniero jefe Alex Mair y el mítico piloto e ingeniero Zora Arkus-Duntov, Chevrolet puso en marcha el proyecto de ingeniería de máxima urgencia denominado "XP-836", con el nombre en código "Panther". La orden ejecutiva era tajante: diseñar un cupé y cabriolet de cuatro plazas con arquitectura tradicional de tracción trasera y motor longitudinal delantero sobre la flamante plataforma F-Body de GM, con un subchasis delantero desacoplado mediante casquillos de goma para lograr una rigidez torsional y un aislamiento acústico infinitamente superiores a los del monocasco del Falcon.',
      'A medida que se acercaba el lanzamiento de 1966, el departamento de marketing de General Motors evaluó cientos de nombres que empezaran por la letra "C", según la tradición corporativa de Chevrolet (Corvette, Corvair, Chevelle, Chevy II). Se barajaron nombres como Chaparral, Command, GeMini y Panther, pero finalmente triunfó "Camaro", una palabra rescatada de un antiguo diccionario francés-inglés de argot que significaba "camarada", "compañero" o "amigo entrañable".',
      'El 29 de junio de 1966, el gerente general de Chevrolet, E.M. "Pete" Estes, convocó una conferencia de prensa sin precedentes que marcó un hito tecnológico: fue la primera rueda de prensa transmitida en directo por circuito cerrado de televisión y satélite a 14 hoteles de las principales ciudades de Estados Unidos. Estes anunció oficialmente la llegada del Chevrolet Camaro 1967.',
      'Durante la sesión de preguntas y respuestas, un periodista del Detroit Free Press levantó la mano y preguntó con curiosidad: "Señor Estes, ¿qué es exactamente un Camaro?". Pete Estes, con una sonrisa fría y desafiante, lanzó la frase que sellaría la rivalidad más encarnizada del automovilismo durante los siguientes sesenta años: "Un Camaro es un animal pequeño y feroz que se alimenta de Mustangs". La guerra abierta de Detroit había comenzado.',
    ],
    highlight: {
      value: 'F-Body',
      label: 'Plataforma con subchasis aislado',
      description: 'La arquitectura modular con suspensión delantera independiente que sustentó al Camaro durante cuatro generaciones.',
    },
  },
  {
    number: '03',
    category: 'HOMOLOGACIÓN // 1967',
    title: 'El Código Oculto RPO Z28: El Truco Matemático de los 302 Pulgadas Cúbicas',
    subtitle: 'Vince Piggins y la creación clandestina del arma definitiva para dominar el SCCA Trans-Am',
    paragraphs: [
      'Cuando el Camaro llegó a los salones de venta en septiembre de 1966, ofrecía una amplia gama de opciones que iban desde dóciles motores de 6 cilindros en línea de 230 ci (3.8L) hasta poderosos V8 Big Block de 396 ci (6.5L) en las versiones Super Sport (SS). Sin embargo, el director de carreras de Chevrolet, Vince Piggins, tenía una ambición mucho más alta y secreta: conquistar el recién fundado campeonato de turismos de la SCCA (Sports Car Club of America), el prestigioso serial Trans-Am.',
      'El reglamento del SCCA Trans-Am de la Clase Over 2.0 Liters imponía un límite de cilindrada estricto de 305 pulgadas cúbicas (5.0 Litros) y exigía que el vehículo compitiera con una configuración mecánica disponible en los concesionarios para el público general, con una producción mínima obligatoria de 1.000 unidades homologadas. Chevrolet no tenía en su catálogo ningún motor V8 de alto rendimiento con esa cilindrada exacta.',
      'Piggins ideó una obra maestra de ingeniería cruzada que pasó a la leyenda. Tomó el robusto bloque de fundición de cuatro tornillos del motor V8 327 ci de diámetro grande (4.00 pulgadas / 101.6 mm) y le instaló el cigüeñal de carrera ultracorta (3.00 pulgadas / 76.2 mm) del veterano V8 283 ci. El cálculo volumétrico resultante fue de exactamente 302.4 pulgadas cúbicas (4.955 cc), situándose matemáticamente justo por debajo del límite legal del reglamento.',
      'Este motor de carrera corta, bautizado internamente como DZ 302, contaba con pistones forjados de aluminio domados con una compresión extrema de 11.0:1, culatas con puertos rectangulares gigantescos y válvulas de 2.02 pulgadas, un árbol de levas mecánico de altas revoluciones "Duntov 30-30", colector de admisión de aluminio de plano alto y un gigantesco carburador Holley de 780 CFM. Aunque Chevrolet lo homologó con unos ridículamente subestimados 290 HP a 5.800 rpm para despistar a las aseguradoras y a Ford, en banco de pruebas el 302 entregaba entre 360 y 390 HP reales y giraba con furia salvaje por encima de las 7.500 rpm.',
      'Piggins incluyó este paquete en la hoja de pedidos bajo el discreto código de opción RPO Z28. No aparecía en los folletos publicitarios ni tenía emblemas exteriores en 1967; sólo los clientes enterados podían solicitarlo a los concesionarios. Apenas se fabricaron 602 unidades en 1967, pero sentó las bases del modelo que cambiaría para siempre la percepción del Camaro.',
    ],
    highlight: {
      value: '302.4 ci',
      label: 'Cilindrada exacta del motor DZ 302',
      description: 'Diámetro de 4.00" y carrera corta de 3.00" para superar las 7.500 rpm con total fiabilidad.',
    },
  },
  {
    number: '04',
    category: 'GUERRA EN PISTA // 1968-1970',
    title: 'La Batalla Trans-Am: Roger Penske y Mark Donohue vs. Bud Moore y Parnelli Jones',
    subtitle: 'El choque titánico de fabricantes en Laguna Seca, Watkins Glen y Road America con motores al límite',
    paragraphs: [
      'A finales de los años 60, el Campeonato Trans-Am de la SCCA se convirtió en el verdadero campo de batalla publicitario bajo el lema sagrado de Detroit: "Gana el domingo, vende el lunes". El público llenaba las colinas de circuitos emblemáticos como Lime Rock, Mid-Ohio, Watkins Glen y Riverside para ver a los dos titanes de la industria luchar rueda contra rueda, rozando carrocerías y derrapando en cada curva.',
      'Chevrolet respaldaba de forma semi-clandestina al equipo de Roger Penske, con el brillante piloto e ingeniero de la Universidad de Brown, Mark Donohue, al volante del célebre Camaro Z/28 azul marino con llantas amarillas de Sunoco. Donohue aplicó el concepto de "la ventaja injusta" ("The Unfair Advantage"): aligeró la carrocería sumergiendo los paneles en baños de ácido para adelgazar la chapa, instaló jaulas antivuelco estructurales que multiplicaban la rigidez del chasis y optimizó el colector de admisión cruzada de doble carburador "Cross-Ram" de Chevrolet. Donohue y su Camaro Z/28 aplastaron a la competencia, ganando 10 de las 13 carreras en 1968 y coronándose campeones consecutivos en 1968 y 1969.',
      'Humillada en su orgullo corporativo, Ford contrató al mítico diseñador Larry Shinoda (ex-GM) para rediseñar el Mustang 1969 y concebir el legendario Mustang Boss 302. Shinoda despojó al Mustang de todo aditamento innecesario, le instaló un spoiler delantero aerodinámico, alerón trasero ajustable y las icónicas franjas laterales reflectantes en forma de palo de hockey. Bajo el capó, Ford creó un motor híbrido monstruoso uniendo el bloque de fundición Windsor 302 con las revolucionarias culatas Cleveland de gigantescas válvulas inclinadas (2.23 pulgadas) inspiradas en el motor del Ford GT40 de Le Mans.',
      'En la temporada de 1970, la rivalidad alcanzó niveles de drama y violencia deportiva insuperables. Ford confió sus Boss 302 al veterano preparador Bud Moore y al indomable piloto de Indianápolis Parnelli Jones, mientras que Penske y Donohue defendían el honor de GM antes de marcharse a Javelin. La temporada de 1970 fue un combate de gladiadores: Parnelli Jones condujo con una agresividad feroz, recuperando carreras tras pinchazos y salidas de pista para darle a Ford el ansiado Campeonato de Constructores Trans-Am por apenas un punto sobre el Camaro.',
    ],
    image: {
      src: transAmBattleImg,
      alt: 'Batalla en pista Trans-Am entre Ford Mustang Boss 302 y Chevrolet Camaro Z28',
      caption: 'El duelo épico del campeonato Trans-Am de 1970: Mark Donohue (Sunoco Camaro) contra Parnelli Jones (Boss 302).',
      tag: 'PIEZA 02 // HISTORIA TRANS-AM',
    },
    highlight: {
      value: '1968 — 1970',
      label: 'La era de oro del Trans-Am',
      description: 'El periodo más competitivo de la historia de los circuitos norteamericanos entre marcas oficiales.',
    },
  },
  {
    number: '05',
    category: 'APOGEO BIG BLOCK // 1969',
    title: 'La Locura de los Motores Gigantes: Boss 429 vs. COPO 9560 ZL-1',
    subtitle: 'Cuando Ford homologó un motor de NASCAR y Chevrolet creó un bloque 427 de aluminio puro de Can-Am',
    paragraphs: [
      'Mientras los motores Small Block de 5.0 litros libraban su guerra de agilidad y altas revoluciones en los circuitos de carretera, en las pistas de aceleración (drag strips) y en los bulevares nocturnos de Estados Unidos se desató una escalada demencial de cilindrada y fuerza bruta: la era de los Big Blocks de 7.0 litros (427 y 429 pulgadas cúbicas).',
      'En Dearborn, Ford necesitaba homologar su nuevo motor V8 429 "Shotgun" para la NASCAR Grand National contra los temibles Dodge Charger Daytona con motor Hemi 426. El reglamento de NASCAR exigía fabricar al menos 500 automóviles de calle con ese motor. Ford decidió montarlo en el Mustang, pero el colosal bloque con cámaras de combustión semi-hemisféricas era tan descomunalmente ancho que no cabía físicamente entre las torretas de suspensión del vano motor.',
      'Ford subcontrató a la prestigiosa firma Kar Kraft en Brighton, Michigan, para modificar a mano 859 unidades del Mustang 1969. Kar Kraft cortó y ensanchó las torretas de suspensión, reubicó los brazos de control, desplazó la batería al maletero y creó el mítico Mustang Boss 429 (KK 429). Con una gigantesca toma de aire funcional sobre el capó, el Boss 429 era una bestia de competición apenas civilizada que entregaba más de 470 HP reales.',
      'Chevrolet, por su parte, tenía una estricta política interna de la alta dirección de GM que prohibía instalar motores de más de 400 pulgadas cúbicas en coches de tamaño medio o compacto como el Camaro. Sin embargo, concesionarios rebeldes vinculados a las carreras de aceleración descubrieron una grieta en el sistema administrativo de GM: el sistema COPO (Central Office Production Order), reservado originalmente para pedir flotas de taxis o camiones pesados con especificaciones especiales.',
      'El concesionario Fred Gibb de Illinois y el legendario preparador Don Yenko utilizaron el código COPO 9560 para ordenar 69 unidades del Camaro 1969 equipadas con el motor ZL-1: un V8 Big Block de 427 ci fabricado íntegramente en aluminio fundido de especificación Can-Am. El motor ZL-1 pesaba exactamente lo mismo que un pequeño Small Block 327 de hierro, pero generaba más de 520 HP y 610 Nm de par. El COPO Camaro ZL-1 1969 era capaz de pulverizar el cuarto de milla en 12.1 segundos con neumáticos de competición, convirtiéndose en el Santo Grial de los Muscle Cars clásicos y alcanzando cotizaciones superiores al millón de dólares en las subastas modernas.',
    ],
    image: {
      src: v8MuscleEngineImg,
      alt: 'Vano motor V8 Big Block 427 y Boss 429 con carburadores y colectores pulidos',
      caption: 'La cúspide de la ingeniería mecánica de 1969: carburación masiva, culatas de aluminio y 7.0 litros de cilindrada.',
      tag: 'PIEZA 03 // V8 BIG BLOCK ARCHITECTURE',
    },
    highlight: {
      value: '69',
      label: 'Camaros COPO 9560 ZL-1 fabricados',
      description: 'El muscle car más codiciado del mundo, con motor 427 completamente de aluminio fundido.',
    },
  },
  {
    number: '06',
    category: 'INGENIERÍA COMPARADA',
    title: 'Diseño y Chasis: El Duelo Estructural de la Primera Generación',
    subtitle: 'Diferencial 9 Pulgadas vs. 12-Bolt, suspensión por ballestas, tracción y rigidez torsional',
    paragraphs: [
      'Al analizar la ingeniería que definió a los primeros Mustang y Camaro entre 1967 y 1969, se descubren dos filosofías complementarias pero con distinciones técnicas fundamentales en su tren de rodaje, arquitectura de suspensiones y transmisión.',
      'El Ford Mustang utilizaba una construcción monocasco completa ("Unitized Body/Frame"). Para mitigar la flexibilidad del chasis en curvas y fuertes aceleraciones, Ford incorporaba barras estabilizadoras de exportación ("Export Brace") que unían las torretas de suspensión delantera con el cortafuegos, además del travesaño inferior "Monte Carlo Bar". Su mayor joya mecánica en el eje trasero era el legendario diferencial Ford de 9 pulgadas con portador desmontable ("Drop-out Third Member"). Su diseño con piñón de ataque hipoide soportado por tres rodamientos le otorgaba una resistencia tan descomunal a los impactos de par que sigue siendo el estándar universal empleado en el drag racing y la NASCAR hasta nuestros días.',
      'El Chevrolet Camaro, por el contrario, adoptó un chasis semi-monocasco con un subchasis delantero tubular desacoplado atornillado con casquillos de goma ("Subframe"). Esta solución no sólo reducía drásticamente las vibraciones y el ruido de rodadura en el habitáculo, sino que permitía un acceso mucho más rápido y sencillo para sustituir transmisiones y motores en competición. Para frenar el rebote parásito del eje trasero en fuertes aceleraciones ("Wheel Hop"), Chevrolet introdujo en 1968 los amortiguadores traseros escalonados (uno por delante del eje y otro por detrás), combinados con el indestructible eje trasero GM 12-Bolt Posi-Traction con corona de 8.875 pulgadas.',
      'En el apartado de frenada, ambos modelos marcaron un salto cualitativo al homologar frenos de disco delanteros ventilados con pinzas de cuatro pistones Kelsey-Hayes y Delco-Moraine, reemplazando a los obsoletos tambores que sufrían desfallecimiento térmico inmediato en circuitos.',
    ],
    image: {
      src: camaroMustangCadImg,
      alt: 'Esquema técnico CAD comparativo entre chasis y dimensiones de Camaro y Mustang 1969',
      caption: 'Diagrama comparativo de arquitectura estructural, subchasis delantero y distribución de masas entre ambos rivales.',
      tag: 'PIEZA 04 // BLUEPRINT TÉCNICO CAD',
    },
    highlight: {
      value: 'Ford 9" vs 12-Bolt',
      label: 'Los diferenciales más resistentes',
      description: 'Arquitecturas de transmisión legendarias capaces de soportar más de 800 Nm de par motor.',
    },
  },
  {
    number: '07',
    category: 'RESISTENCIA // 1974-1981',
    title: 'La Oscuridad de la Crisis del Petróleo y la Supervivencia Malaise',
    subtitle: 'De cómo el Mustang II salvó comercialmente a Ford mientras el Camaro Z28 mantenía vivo el espíritu V8',
    paragraphs: [
      'En octubre de 1973, la crisis del petróleo provocada por el embargo de la OPEP sacudió los cimientos del mundo industrializado. De la noche a la mañana, el precio del combustible se cuadruplicó, el gobierno de los Estados Unidos impuso el límite federal de velocidad de 55 mph (88 km/h), la EPA introdujo estrictas leyes de emisiones y las compañías de seguros castigaron con pólizas prohibitivas a cualquier vehículo catalogado como deportivo.',
      'La respuesta de Ford fue radical e incomprendida por los puristas, pero un golpe maestro de supervivencia financiera: Lee Iacocca ordenó lanzar en 1974 el Mustang II, un vehículo 48 centímetros más corto y 220 kg más ligero basado en la plataforma del Ford Pinto, disponible inicialmente solo con motores de 4 cilindros y V6. Aunque los entusiastas del músculo tradicional se rasgaron las vestiduras, el Mustang II fue un éxito colosal de ventas, despachando más de 385.000 unidades en 1974 y salvando a la marca de la bancarrota durante los años más duros de la crisis.',
      'Chevrolet optó por una estrategia diferente: mantuvo la carrocería de 2ª generación del Camaro (introducida en 1970 con líneas inspiradas en los grandes coupés de Ferrari y Pininfarina). Para cumplir con las normas de absorción de impactos a 5 mph, Chevrolet diseñó los robustos paragolpes de aluminio extruido en 1974 y posteriormente los paragolpes envolventes de uretano de color de la carrocería en 1978.',
      'Aunque la potencia de los motores V8 de 350 ci cayó drásticamente a 170-185 HP debido a las bajas relaciones de compresión y los catalizadores de escape primitivos, el Camaro Z28 y el Pontiac Firebird Trans Am (conducido por Burt Reynolds en "Smokey and the Bandit") mantuvieron encendida la llama visual del muscle car con espectaculares gráficos, capós abultados con tomas de aire por inducción y escapes dobles resonantes, dominando las ventas a finales de los 70.',
    ],
    highlight: {
      value: '385.993',
      label: 'Mustang II vendidos en 1974',
      description: 'La estrategia de reducción de tamaño que garantizó la supervivencia del linaje Mustang.',
    },
  },
  {
    number: '08',
    category: 'RENACIMIENTO // 1982-1993',
    title: 'La Guerra Electrónica de los Años 80: Fox Body 5.0 vs. Camaro IROC-Z',
    subtitle: 'El retorno de la potencia callejera con inyección electrónica, cajas de 5 velocidades y chasis rebajados',
    paragraphs: [
      'Con la llegada de la década de 1980, la tecnología digital y los sistemas de inyección electrónica de combustible (EFI) rescataron a los deportivos estadounidenses del letargo de la década anterior. Comenzó una nueva era dorada de rivalidad callejera que definió a toda una generación de conductores en los años 80 y 90.',
      'En 1982, Ford lanzó el famoso eslogan publicitario "The Boss is Back" con el Mustang GT sobre la plataforma Fox (introducida en 1979). El motor V8 5.0L (302 ci) con carburador Holley de 4 bocas y posteriormente con inyección electrónica multipunto de alta impedancia (Sequential Electronic Fuel Injection - SEFI) con colector de admisión de aluminio en 1986 entregaba 225 HP y 407 Nm de par. Combinado con un peso pluma de apenas 1.380 kg y la transmisión manual Borg-Warner T-5 de 5 marchas, el Mustang Fox Body se convirtió en el coche de aceleración más accesible, personalizable y rápido del mercado norteamericano, dominando las carreras de media noche.',
      'Chevrolet respondió en 1985 con uno de los automóviles más icónicos de la década: el Camaro IROC-Z, nombrado en honor a la International Race of Champions. Basado en el Camaro de 3ª generación con su agresivo coeficiente aerodinámico de 0.34 y luneta trasera de cristal envolvente, el IROC-Z equipaba suspensión rebajada desarrollada por Bilstein, barras estabilizadoras de gran diámetro, neumáticos Goodyear Eagle VR50 de perfil bajo sobre llantas de 16 pulgadas de aluminio forjado y el motor V8 305/350 ci con inyección Tuned Port Injection (TPI).',
      'Con sus largos colectores de admisión individuales que maximizaban el llenado de los cilindros por resonancia acústica a medio régimen, el motor L98 5.7L TPI del Camaro entregaba 245 HP y un demoledor par de 468 Nm. El duelo entre el ágil y liviano Mustang Fox 5.0 y el aplomado y devorador de curvas Camaro IROC-Z llenó las páginas de las revistas especializadas Car and Driver y Motor Trend durante una década ininterrumpida.',
    ],
    highlight: {
      value: '225 vs 245 HP',
      label: 'Potencias cumbre de los 80',
      description: 'El regreso triunfal de las aceleraciones de 0 a 100 km/h en menos de 6.5 segundos.',
    },
  },
  {
    number: '09',
    category: 'CUARTA GENERACIÓN // 1993-2002',
    title: 'La Era LT1 / LS1 vs. Modular 4.6L: El Vacío Temporal de Chevrolet',
    subtitle: 'El dominio mecánico del bloque de aluminio LS1 y la dolorosa pausa productiva del Camaro en 2002',
    paragraphs: [
      'En 1993, Chevrolet presentó el Camaro de 4ª generación con una carrocería radicalmente futurista fabricada con paneles compuestos de chapa compuesta (SMC) y una luna delantera con una inclinación récord de 68 grados. Equipado inicialmente con el motor LT1 5.7L de 275 HP derivado del Corvette C4, el Camaro dio un salto gigantesco en 1998 al incorporar el revolucionario motor V8 LS1 de bloque y culatas 100% de aluminio fundido. Con 305 a 325 HP reales en las versiones SS (Super Sport) afinadas por SLP Engineering, el Camaro LS1 era un misil capaz de hacer el 0-100 km/h en 5.1 segundos y el cuarto de milla en 13.5 segundos de fábrica.',
      'Ford, por su parte, reemplazó su veterano bloque 302 pushrod en 1996 por la familia de motores modulares con árboles de levas en cabeza (Modular 4.6L SOHC 2V y DOHC 4V). El Mustang SVT Cobra de 1999 introdujo por primera vez en la historia del modelo una suspensión trasera independiente (IRS) multibrazo con semiejes de velocidad constante. En 2003, el equipo Special Vehicle Team (SVT) de Ford creó el célebre Mustang SVT Cobra "Terminator", acoplando un compresor volumétrico Eaton Roots al V8 4.6L DOHC con pistones forjados Manley para declarar 390 HP oficiales (que en dinamómetro superaban con holgura los 420 HP).',
      'Sin embargo, a pesar de la superioridad mecánica en aceleración del Camaro LS1, las tendencias del mercado cambiaron hacia los SUV familiares y los cupés de tracción delantera. Las ventas del Camaro cayeron en picado debido a la incomodidad de acceso al habitáculo y la baja visibilidad. En agosto de 2002, General Motors tomó la traumática decisión de cerrar la planta de Sainte-Thérèse en Quebec y descontinuar el Camaro tras 35 años de producción continua. Ford quedó como el único superviviente en el mercado.',
    ],
    highlight: {
      value: 'LS1 vs Terminator',
      label: 'Duelo mecánico de cambio de siglo',
      description: 'El debut de los bloques de aluminio LS y la sobrealimentación por compresor de fábrica.',
    },
  },
  {
    number: '10',
    category: 'RENACIMIENTO RETRO // 2005-2015',
    title: 'La Fiebre Retrofuturista: El Fenómeno S197 y el Regreso de Bumblebee',
    subtitle: 'El Mustang 2005 despierta la nostalgia y el Camaro Concept 2006 rompe taquillas en Hollywood',
    paragraphs: [
      'Al quedarse sin rival directo, Ford tomó una decisión que revolucionó la industria del diseño automotriz mundial: bajo la dirección de J Mays y Hau Thai-Tang, Ford lanzó en 2005 el Mustang de quinta generación (código S197). Su diseño era una brillante reinterpretación retrofuturista de las líneas maestras del Mustang Fastback de 1969, con faros redondos embutidos en la parrilla, pilotos traseros de tres barras verticales y un interior de estilo clásico con esferas redondas retroiluminadas en aluminio pulido.',
      'El impacto del Mustang 2005 fue arrollador: las ventas se dispararon y la nostalgia por los Muscle Cars tradicionales invadió la cultura popular. En los pasillos de General Motors en Detroit, el vicepresidente de desarrollo de productos, Bob Lutz, comprendió que no podían seguir ausentes del mercado.',
      'En el Salón Internacional del Automóvil de Detroit de 2006, GM desveló el Chevrolet Camaro Concept diseñado por el coreano-estadounidense SangYup Lee, basado en la musculosa plataforma de tracción trasera Zeta de origen Holden. El éxito fue tan descomunal que el director de cine Michael Bay eligió el concept car para protagonizar el taquillazo mundial de Hollywood "Transformers" (2007) como el robot extraterrestre "Bumblebee", convirtiendo al Camaro en un ícono global para una nueva generación de millones de jóvenes.',
      'En 2010, el Camaro de 5ª generación llegó a las calles con un V8 LS3 de 6.2L y 426 HP, suspensión trasera totalmente independiente y un diseño imponente. Por primera vez en 24 años, el Camaro superó en ventas anuales al Ford Mustang en Estados Unidos (2010 a 2014), obligando a Ford a responder en 2011 con el legendario motor V8 5.0L DOHC "Coyote" de 412 HP con distribución variable independiente Ti-VCT.',
    ],
    highlight: {
      value: 'Coyote 5.0L',
      label: 'El motor DOHC 32V de Ford',
      description: 'Cuatro árboles de levas y distribución variable para competir contra los 6.2L de GM.',
    },
  },
  {
    number: '11',
    category: 'CIRCUITOS MUNDIALES // 2015-2024',
    title: 'De Drag Strips a Nürburgring: Shelby GT350R / GT500 vs. Camaro ZL1 1LE',
    subtitle: 'Fibra de carbono, suspensiones DSSV de F1, cigüeñal plano a 8.250 rpm y 760 caballos de fuerza',
    paragraphs: [
      'En la última década, la rivalidad entre Mustang y Camaro abandonó definitivamente el estigma de ser coches diseñados únicamente para acelerar en línea recta. Ambos fabricantes invirtieron presupuestos de ingeniería astronómicos para transformar sus Pony Cars en instrumentos de precisión capaces de destrozar tiempos de vuelta de superdeportivos europeos de Porsche, Ferrari y McLaren en los circuitos más exigentes del planeta.',
      'Ford Performance sorprendió al mundo en 2015 con el Shelby GT350R: bajo el capó montó el motor atmosférico "Voodoo" 5.2L V8 con cigüeñal plano (Flat-Plane Crankshaft), una arquitectura exótica reservada tradicionalmente a Ferrari que le permitía girar hasta un aullido ensordecedor de 8.250 rpm entregando 526 HP. El GT350R fue además el primer vehículo de producción masiva del mundo en equipar llantas fabricadas íntegramente en fibra de carbono de serie, ahorrando 27 kg de masa no suspendida.',
      'Para la corona absoluta de la potencia, Ford lanzó el Shelby GT500 con el V8 5.2L "Predator" sobrealimentado por un compresor Eaton de 2.65L que genera 760 HP y 847 Nm de par, acoplado a una rapidísima caja de cambios de doble embrague (DCT) de 7 velocidades desarrollada por Tremec que cambia de marcha en apenas 80 milisegundos.',
      'Chevrolet, por su parte, utilizó la ligera y ultra rígida plataforma Alpha (compartida con Cadillac) para crear el arma definitiva de pista: el Camaro ZL1 1LE. Equipado con el motor LT4 V8 6.2L Supercharged de 650 HP y 881 Nm, el paquete 1LE prescindió de la amortiguación magnetorreológica para instalar amortiguadores de competición derivados directamente de la Fórmula 1 y Le Mans: los Multimatic DSSV (Dynamic Suspensions Spool Valve) con válvulas de carrete de aluminio mecanizado. Con un alerón de fibra de carbono que genera 136 kg de carga aerodinámica a 240 km/h y neumáticos Goodyear Eagle F1 Supercar 3R de compuesto casi liso, el Camaro ZL1 1LE detuvo el cronómetro en el legendario circuito alemán de Nürburgring Nordschleife en un tiempo estratosférico de 7 minutos, 16 segundos y 04 centésimas, batiendo a rivales como el Ferrari 488 GTB y el Porsche 911 GT3 RS 991.1.',
    ],
    highlight: {
      value: '7:16.04 min',
      label: 'Tiempo del Camaro ZL1 1LE en Nürburgring',
      description: 'El récord absoluto para un muscle car estadounidense con caja de cambios manual.',
    },
  },
  {
    number: '12',
    category: 'EPÍLOGO Y LEGADO',
    title: 'Sesenta Años de Pasión: El Mito Inmortal del V8 Americano',
    subtitle: 'El fin de la sexta generación del Camaro y la resistencia solitaria del Mustang Dark Horse S650',
    paragraphs: [
      'En diciembre de 2023, la última unidad del Chevrolet Camaro de 6ª generación (un ZL1 1LE de color Panther Black) salió de la línea de ensamblaje de Lansing Grand River en Michigan, marcando el final de otra etapa histórica para General Motors. Mientras tanto, Ford ha reafirmado su compromiso con los entusiastas al lanzar la 7ª generación del Mustang (S650), liderada por el Mustang Dark Horse con motor Coyote V8 atmosférico de 500 HP y caja manual Tremec.',
      'A lo largo de seis décadas ininterrumpidas, la rivalidad entre el Ford Mustang y el Chevrolet Camaro ha trascendido las frías estadísticas de ventas y las cifras de potencia en banco de pruebas. Ha sido un fenómeno cultural que ha moldeado la música rock, el cine de persecuciones, la cultura del tuning, los domingos en los drag strips y el corazón de millones de apasionados del motor en cada rincón del planeta.',
      'Sin el Mustang, el Camaro jamás habría nacido; y sin la constante y feroz presión del Camaro, el Mustang jamás habría alcanzado las cotas de excelencia dinámica, potencia sobrealimentada y sofisticación aerodinámica que hoy lo consagran en el Olimpo del automovilismo. Su guerra no tuvo perdedores: los únicos vencedores fueron los amantes del rugido visceral de un motor V8 americano.',
    ],
    highlight: {
      value: '1964 — ∞',
      label: 'Un legado que nunca morirá',
      description: 'La rivalidad más icónica, longeva y apasionante de la historia del automóvil.',
    },
  },
];
