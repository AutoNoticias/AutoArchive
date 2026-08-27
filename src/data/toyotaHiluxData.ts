import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import hiluxHeroImg from '../assets/images/toyota_hilux_hero_1787873616719.jpg';
import hiluxEngineImg from '../assets/images/toyota_hilux_engine_1787873630665.jpg';
import hiluxArcticImg from '../assets/images/toyota_hilux_arctic_1787873645892.jpg';
import hiluxCadImg from '../assets/images/toyota_hilux_cad_1787873661761.jpg';

export const toyotaHiluxImages = {
  hero: hiluxHeroImg,
  engine: hiluxEngineImg,
  arctic: hiluxArcticImg,
  cad: hiluxCadImg,
};

export const toyotaHiluxStats: StatItem[] = [
  { value: '19M+', unit: 'UNIDADES', label: 'Fabricadas y comercializadas en más de 180 países del mundo' },
  { value: '1968', unit: 'AÑO', label: 'De debut oficial de la primera generación (N10) con Hino Motors' },
  { value: '1.000.000+', unit: 'KM', label: 'Kilometraje habitual alcanzado por motores 22R y 2L/3L sin rectificar' },
  { value: '-50°C', unit: 'POLO SUR', label: 'Temperatura extrema superada en la expedición antártica de 70.000 km' },
  { value: '3 VECES', unit: 'DAKAR WINNER', label: 'Victoria absoluta en el Rally Dakar con Toyota Gazoo Racing' },
  { value: '3.500', unit: 'KG', label: 'Capacidad de remolque con chasis de escalera de acero de alta resistencia' },
];

export const toyotaHiluxTimeline: TimelineItem[] = [
  {
    year: 'Marzo de 1968',
    title: 'Nacimiento de la Leyenda: Hilux Generación N10',
    description:
      'Toyota lanza la primera generación Hilux (contracción de "High" y "Luxury"), desarrollada en conjunto con su división de vehículos comerciales pesados Hino Motors. Con chasis de largueros y motor 1.5L 2R, sienta las bases de la robustez japonesa.',
  },
  {
    year: '1978 — 1979',
    title: 'La Revolución 4x4 y el Eje Rígido Delantero (RN36/LN36)',
    description:
      'Llega la 3ª generación e introduce por primera vez la tracción total a las cuatro ruedas conectable con reductora y doble eje rígido con ballestas. El motor de gasolina 20R/22R y el primer diésel atmosférico Tipo L convierten a la Hilux en el todoterreno más codiciado de América y Oceanía.',
  },
  {
    year: '1983 — 1988',
    title: 'La 4ª Generación (N50/N60) y el Fénix de "Volver al Futuro"',
    description:
      'Con pasos de rueda musculosos esculpidos en chapa de acero, cabina Xtra Cab y el indestructible motor de 2.4L 22R-E con inyección electrónica, la Hilux negra 4x4 se convierte en el icono de toda una generación en la gran pantalla.',
  },
  {
    year: '1988 — 1997',
    title: 'La 5ª Generación (N80/N90/N100): El Épice de la Durabilidad',
    description:
      'Considerada por mecánicos e ingenieros de todo el planeta como la camioneta más dura jamás concebida. Suspendida sobre un chasis de acero tratado contra la corrosión y equipada con los legendarios motores diésel 2.8L 3L y 3.0L 1KZ-T con turbocompresor.',
  },
  {
    year: '2003',
    title: 'El Test de la Indestructibilidad de Top Gear',
    description:
      'El programa británico Top Gear somete a una Hilux diésel de 1988 a torturas brutales: choque contra árboles, inmersión en la marea del Canal de Bristol durante 5 horas, impacto directo de una bola de demolición de acero, incendio provocado y colapso sobre un edificio de 23 pisos dinamitado. Tras 40 minutos de mecánica básica con llaves fijas y WD-40, el motor arranca y el vehículo rueda por sus propios medios.',
  },
  {
    year: '2007',
    title: 'Conquista del Polo Norte Magnético y la Antártida',
    description:
      'Dos Toyota Hilux modificadas por Arctic Trucks con enormes neumáticos de 38 y 44 pulgadas cruzan el Océano Ártico y se convierten en los primeros vehículos con motor de combustión en alcanzar el Polo Norte Magnético. Posteriormente recorren 70.000 km en la meseta polar de la Antártida a -50°C sin fallos mecánicos.',
  },
  {
    year: '2019 — 2023',
    title: 'El Trono del Desierto: Triunfos en el Rally Dakar',
    description:
      'Toyota Gazoo Racing domina el Rally Dakar con la Hilux DKR T1+ pilotada por Nasser Al-Attiyah, superando miles de kilómetros de dunas implacables en Arabia Saudita y demostrando que la ingeniería de chasis y fiabilidad de Hilux no tiene rival en la competición off-road.',
  },
  {
    year: 'Presente',
    title: 'La Reina Global de la Confianza y el Trabajo Extremo',
    description:
      'Desde las minas subterráneas de Australia y las selvas tropicales del Amazonas hasta los desiertos del Sahara y las cumbres de los Andes, la Toyota Hilux permanece como el patrón de oro indiscutible de durabilidad, supervivencia y lealtad mecánica.',
  },
];

export const toyotaHiluxSpecs: {
  classicGen4: SpecItem[];
  gen8Dakar: SpecItem[];
  arcticExpedition: SpecItem[];
} = {
  classicGen4: [
    { label: 'Modelo Insignia', value: '1985 Toyota Hilux 4x4 Xtra Cab (RN65 / LN65)' },
    { label: 'Motor Gasolina', value: 'Toyota 22R-E 2.4L SOHC con inyección EFI' },
    { label: 'Motor Diésel Alternativo', value: 'Toyota 2L 2.4L Diésel / 2L-T Turbo Diésel' },
    { label: 'Potencia Gasolina', value: '114 CV @ 4.800 RPM' },
    { label: 'Par Motor', value: '190 Nm @ 2.800 RPM' },
    { label: 'Chasis', value: 'Largueros y travesaños cerrados de acero de sección rectangular' },
    { label: 'Ejes', value: 'Doble eje rígido con diferenciales de 8 pulgadas y ballestas semi-elípticas' },
    { label: 'Caja de Transferencia', value: 'Cíclica RF1A accionada por engranajes con reductora 2.28:1' },
    { label: 'Carga Útil', value: '1.000 kg en caja de carga' },
    { label: 'Consumo / Autonomía', value: 'Depósito de 65L con más de 700 km de autonomía' },
  ],
  gen8Dakar: [
    { label: 'Modelo Insignia', value: 'Toyota GR DKR Hilux T1+ (Campeona Rally Dakar)' },
    { label: 'Motor', value: 'Toyota V35A-FTS 3.5L V6 Twin-Turbo (Derivado Land Cruiser 300)' },
    { label: 'Potencia', value: '400 CV (Regulada por brida FIA T1+)' },
    { label: 'Par Motor', value: '660 Nm de entrega lineal desde 2.000 RPM' },
    { label: 'Transmisión', value: 'Secuencial Sadev de 6 velocidades con tres diferenciales autoblocantes' },
    { label: 'Recorrido de Suspensión', value: '350 mm con dobles amortiguadores Reiger ajustables por rueda' },
    { label: 'Neumáticos', value: 'BFGoodrich 37x12.5 R17 sobre llantas forjadas de magnesio' },
    { label: 'Chasis', value: 'Estructura tubular multitubular integrada sobre base Hilux' },
    { label: 'Depósito de Combustible', value: '540 litros de seguridad FT3' },
  ],
  arcticExpedition: [
    { label: 'Modelo Insignia', value: 'Toyota Hilux Arctic Trucks AT44 (Expedición Polar)' },
    { label: 'Motor', value: 'Toyota 1GD-FTV 2.8L D4-D Turbo Diésel Intercooler' },
    { label: 'Potencia / Par', value: '204 CV / 500 Nm @ 1.600 RPM' },
    { label: 'Neumáticos Polares', value: 'Nokian Hakkapeliitta 44x18.5 R15 a baja presión (1.5 a 3 PSI)' },
    { label: 'Desarrollo de Ejes', value: 'Relación 5.14:1 con bloqueos de diferencial ARB neumáticos' },
    { label: 'Sistema de Calefacción', value: 'Calefactor Webasto auxiliar de motor y combustible precalentado' },
    { label: 'Autonomía Polar', value: 'Depósito auxiliar extendido de 280L para más de 1.400 km sobre nieve' },
  ],
};

export const toyotaHiluxChapters: Chapter[] = [
  {
    number: '01',
    category: 'GÉNESIS & ADN',
    title: 'El Nacimiento del Titán Japonés: De Hino Motors a la Conquista Mundial',
    subtitle: 'Cómo la combinación de ingeniería industrial pesada y simplicidad mecánica creó la camioneta más robusta del planeta.',
    paragraphs: [
      'En marzo de 1968, las carreteras de Japón presenciaron el nacimiento de un vehículo concebido bajo una premisa inusual: combinar la resistencia indestructible de los camiones pesados con la comodidad de un turismo. Desarrollada en estrecha colaboración entre Toyota y su división de vehículos pesados Hino Motors en la planta de Hamura, nació la primera generación Hilux (cuyo nombre unía las palabras inglesas "High" y "Luxury").',
      'Lejos de ser un simple vehículo utilitario, la Hilux fue construida sobre un chasis de largueros de acero en cajón soldado por arco con rigidez torsional incomparable. Su motor inicial de 1.5 litros (2R) de 4 cilindros y árbol de levas lateral demostró desde el primer día una virtud que definiría su legado durante seis décadas: una tolerancia asombrosa al maltrato, a los aceites de baja calidad y a las sobrecargas sin pestañear.',
    ],
    image: {
      src: toyotaHiluxImages.hero,
      alt: 'Clásica Toyota Hilux 4x4 superando terreno rocoso off-road',
      caption: 'La reina indiscutible del todoterreno: chasis de escalera, tracción total conectable y fiabilidad legendaria.',
      tag: 'CAPÍTULO 01 // EL NACIMIENTO DEL MITO',
    },
    highlight: {
      value: '1968',
      label: 'Primera Generación',
      description: 'El inicio de una dinastía que supera los 19 millones de unidades en más de 180 naciones.',
    },
  },
  {
    number: '02',
    category: 'TRACCIÓN TOTAL PURA',
    title: 'La Era del Eje Rígido: La Revolución 4x4 de 1979',
    subtitle: 'La llegada del doble eje rígido con ballestas y la caja de transferencia por engranajes que conquistaron América.',
    paragraphs: [
      'Durante su primera década, la Hilux fue predominantemente de tracción trasera. Sin embargo, en 1978 Toyota presentó la tercera generación (N30/N40) e introdujo en 1979 su variante más legendaria: la Hilux 4WD (RN36 y LN36). Equipada con un eje rígido delantero guiado por robustas ballestas semielípticas, cubos de rueda delanteros con bloqueo manual Aisin y una caja de transferencia RF1A accionada exclusivamente por engranajes de acero templado.',
      'Esta arquitectura mecánica pura, sin juntas homocinéticas frágiles ni electrónica compleja, permitía vadear ríos caudalosos, cruzar desiertos de dunas cortadas y transportar cargas de más de una tonelada por senderos donde otros vehículos quedaban destrozados. Había nacido la herramienta de trabajo y exploración definitiva.',
    ],
    image: {
      src: toyotaHiluxImages.cad,
      alt: 'Plano técnico del chasis de largueros y suspensión de la Toyota Hilux',
      caption: 'Esquema de ingeniería del chasis de acero de sección rectangular y la disposición de ejes rígidos con ballestas.',
      tag: 'CAPÍTULO 02 // LADDER-FRAME CHASSIS',
    },
    highlight: {
      value: '1979',
      label: 'Llegada del 4WD',
      description: 'El debut de la tracción total conectable con doble eje rígido que forjó su leyenda off-road.',
    },
  },
  {
    number: '03',
    category: 'MOTORES INDESTRUCTIBLES',
    title: 'Los Corazones de Hierro: El 22R de Gasolina y los Diésel Serie L y KD',
    subtitle: 'Propulsores de fundición mineral capaces de superar el millón de kilómetros con solo cambios de fluidos básicos.',
    paragraphs: [
      'Si el chasis de la Hilux es su columna vertebral, sus motores son el mito viviente de la ingeniería japonesa. En gasolina, el bloque 2.4L de 4 cilindros 22R y 22R-E (con inyección electrónica introducida en 1985) se convirtió en leyenda por su bloque de hierro fundido de paredes gruesas, cadena de distribución de doble rodillo y una culata de flujo transversal con par motor inagotable a bajas revoluciones.',
      'En el terreno del diésel, las series 2L (2.4L), 3L (2.8L) y 5L (3.0L) atmosféricos —y más tarde los 1KZ-TE y 1GD-FTV con Common Rail— demostraron poder funcionar con gasóleos contaminados, calor abrasador de más de 50°C y polvo desértico fino. Es común encontrar en Australia, Sudamérica y África unidades con más de un millón de kilómetros en el odómetro funcionando con compresión perfecta.',
    ],
    image: {
      src: toyotaHiluxImages.engine,
      alt: 'Vano motor del propulsor Toyota 22R / Diésel de fundición pesada',
      caption: 'Bloque de hierro fundido, distribución indestructible y simplicidad mecánica: el secreto del millón de kilómetros.',
      tag: 'CAPÍTULO 03 // BULLETPROOF POWERTRAINS',
    },
    highlight: {
      value: '1.000.000+',
      label: 'Kilómetros Reales',
      description: 'El estándar de durabilidad que mecánicos y flotas de todo el mundo reconocen unánimemente.',
    },
  },
  {
    number: '04',
    category: 'EL JUICIO FINAL',
    title: 'El Test de la Indestructibilidad de Top Gear: El Fénix Mecánico',
    subtitle: 'Sumergida en el mar, aplastada por una bola de demolición, quemada y arrojada desde un edificio dinamitado.',
    paragraphs: [
      'En noviembre de 2003, el icónico programa automovilístico británico Top Gear decidió comprobar si la reputación de la Toyota Hilux era real o una exageración publicitaria. Compraron una Hilux diésel de 1988 con más de 300.000 km y la sometieron a un castigo inimaginable: la estrellaron contra un árbol, la ataron a un muelle donde la marea marina la sumergió bajo cinco metros de agua salada durante cinco horas, le arrojaron una caravana encima, la golpearon con una bola de demolición y le prendieron fuego con gasolina.',
      'El clímax ocurrió cuando colocaron la maltrecha camioneta en la azotea de un edificio residencial de 23 pisos que fue demolido con 12.500 cartuchos de dinamita. Tras desenterrarla de entre toneladas de escombros de hormigón y polvo, un mecánico utilizó únicamente llaves fijas, un destornillador y spray aflojatodo, sin cambiar una sola pieza de repuesto. Para el asombro del mundo entero, el motor diésel arrancó al primer intento y la Hilux entró triunfal en el plató de televisión.',
    ],
    image: {
      src: toyotaHiluxImages.hero,
      alt: 'Toyota Hilux en condiciones extremas de supervivencia',
      caption: 'El vehículo que demostró que ninguna fuerza física ni catástrofe natural puede extinguir su voluntad de rodar.',
      tag: 'CAPÍTULO 04 // THE TOP GEAR SURVIVOR',
    },
    highlight: {
      value: '23 PISOS',
      label: 'Colapso de Edificio',
      description: 'La caída entre escombros de dinamita tras la cual la Hilux arrancó sin repuestos nuevos.',
    },
  },
  {
    number: '05',
    category: 'FRONTERA POLAR',
    title: 'Hielo Antártico y los Confines del Polo Sur: Las Bestias Arctic Trucks',
    subtitle: 'Navegando sobre grietas glaciares a -50 grados Celsius donde cualquier fallo mecánico significa la muerte.',
    paragraphs: [
      'En 2007, las capacidades de supervivencia de la Hilux fueron puestas a prueba en el entorno más hostil de la Tierra: el Océano Glacial Ártico. En colaboración con los especialistas islandeses de Arctic Trucks, dos Hilux modificadas con gigantescos neumáticos de flotación a baja presión (1.5 PSI) se convirtieron en los primeros automóviles de la historia en conquistar el Polo Norte Magnético.',
      'Posteriormente, una flota de Toyota Hilux AT44 emprendió expediciones a través de la meseta de la Antártida, acumulando más de 70.000 kilómetros sobre hielo azul y nieve polvo a temperaturas de hasta 50 grados bajo cero. Mientras otros transportes de orugas quedaban inutilizados por congelación de fluidos o rotura de transmisiones, los motores y transmisiones de Hilux completaron las misiones sin un solo fallo estructural.',
    ],
    image: {
      src: toyotaHiluxImages.arctic,
      alt: 'Toyota Hilux Arctic Trucks en las nieves eternas de la Antártida',
      caption: 'Equipada con neumáticos de 44 pulgadas y suspensiones reforzadas para atravesar el desierto blanco antártico.',
      tag: 'CAPÍTULO 05 // ARCTIC & ANTARCTIC EXPEDITIONS',
    },
    highlight: {
      value: '-50°C',
      label: 'Temperatura Mínima',
      description: 'Operación ininterrumpida en las condiciones climáticas más letales del globo terrestre.',
    },
  },
  {
    number: '06',
    category: 'GLORIA EN EL DAKAR',
    title: 'El Trono del Rally Dakar y el Legado Inmortal de la Resistencia',
    subtitle: 'Toyota Gazoo Racing y la Hilux DKR T1+ dominando las dunas más temidas del automovilismo mundial.',
    paragraphs: [
      'El Rally Dakar es considerado unánimemente el evento automovilístico más duro del planeta: dos semanas de dunas gigantescas, salares cortantes, rocas volcánicas y jornadas de más de 800 kilómetros a fondo. Toyota Gazoo Racing convirtió a la Hilux en su estandarte de competición con la Hilux DKR T1+ equipada con un motor V6 Twin-Turbo de 400 CV y suspensiones de 350 mm de recorrido.',
      'Con victorias absolutas en 2019, 2022 y 2023 pilotada por el astro qatarí Nasser Al-Attiyah, la Hilux demostró que su ADN de durabilidad no solo sirve para el trabajo pesado o la supervivencia, sino para batir a los prototipos de competición más avanzados del mundo. Hoy en día, la Hilux no es solo una camioneta: es un símbolo universal de resiliencia humana y fiabilidad absoluta.',
    ],
    image: {
      src: toyotaHiluxImages.hero,
      alt: 'Toyota Hilux en plena acción por senderos desérticos',
      caption: 'Una máquina concebida para vencer al tiempo, a la naturaleza y a cualquier obstáculo sobre la faz de la Tierra.',
      tag: 'CAPÍTULO 06 // DAKAR & GLOBAL LEGACY',
    },
    highlight: {
      value: '3 VECES',
      label: 'Campeona del Dakar',
      description: 'Dominio absoluto de la Hilux en la competición de rally raid más exigente de la historia.',
    },
  },
];
