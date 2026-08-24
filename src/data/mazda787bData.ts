import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import mazdaHeroImg from '../assets/images/mazda_787b_hero_green_1787329729642.jpg';
import mazdaEngineImg from '../assets/images/mazda_r26b_rotary_engine_1787414350260.jpg';
import mazdaCockpitImg from '../assets/images/mazda_787b_cockpit_1787329763600.jpg';
import mazdaCadImg from '../assets/images/mazda_787b_cad_1787329780220.jpg';

export const mazda787bImages = {
  hero: mazdaHeroImg,
  engine: mazdaEngineImg,
  cockpit: mazdaCockpitImg,
  cad: mazdaCadImg,
};

export const mazda787bStats: StatItem[] = [
  { value: '700', unit: 'HP @ 9.000 RPM', label: 'Potencia Oficial en Carrera (930+ HP en Clasificación)' },
  { value: '340+', unit: 'KM/H', label: 'Velocidad Máxima en la Recta de Mulsanne' },
  { value: '3.8', unit: 'SEG', label: 'Aceleración Estimada 0-100 km/h (Prototipo Le Mans)' },
  { value: '2.6', unit: 'LITROS', label: 'Cilindrada Equivalente R26B (4 Rotores Wankel)' },
  { value: '830', unit: 'KG', label: 'Peso en Vacío (Chasis monocasco de Carbono y Kevlar)' },
  { value: '1', unit: 'HISTÓRICO', label: 'Único coche japonés y rotativo ganador de Le Mans' },
];

export const mazda787bTimeline: TimelineItem[] = [
  {
    year: '1967',
    title: 'Mazda Adopta el Motor Wankel',
    description:
      'Mazda lanza el Cosmo Sport 110S tras adquirir los derechos de licencia de Felix Wankel, iniciando una obsesión de décadas por perfeccionar el motor rotativo.',
  },
  {
    year: '1983',
    title: 'Nace Mazdaspeed y el Sueño de Le Mans',
    description:
      'Mazdaspeed se convierte en el brazo oficial de competición de Mazda, inscribiendo prototipos de Grupo C propulsados por motores rotativos en el circuito de La Sarthe.',
  },
  {
    year: '1990',
    title: 'El Debut del 787 y las Lecciones del Dolor',
    description:
      'El Mazda 787 debuta en las 24 Horas de Le Mans con problemas de fiabilidad y elevado consumo. La FIA anuncia que los motores rotativos serán prohibidos a partir de 1992.',
  },
  {
    year: 'Junio 1991',
    title: 'La Gloria Eterna en Le Mans',
    description:
      'El Mazda 787B número 55 con librea Renown, pilotado por Johnny Herbert, Volker Weidler y Bertrand Gachot, cruza la meta en 1ª posición tras completar 362 vueltas sin fallos mecánicos.',
  },
  {
    year: '1992',
    title: 'El Fin de una Era y la Prohibición de la FIA',
    description:
      'Entra en vigor el cambio de reglamento de la FIA que banea los motores rotativos, convirtiendo al 787B en el primer y único ganador sin pistones de la historia de Le Mans.',
  },
  {
    year: '2011',
    title: 'El Retorno Emotivo a La Sarthe',
    description:
      'Con motivo del 20 aniversario de su victoria, el legendario 787B (#55) pilotado y demo-girado ante 200.000 enfervorizados espectadores en Le Mans, rindiendo tributo al orgullo japonés.',
  },
];

export const mazda787bSpecs: SpecItem[] = [
  { label: 'Homologación de Chasis', value: 'Prototipo FIA Grupo C (Monocasco de Carbono y panal de abejas)' },
  { label: 'Configuración Motor', value: 'Mazda R26B · 4 Rotores Wankel en línea (Naturaleza rotativa)' },
  { label: 'Cilindrada Equivalente', value: '2.622 cc (654 cc por cámara × 4 rotores)' },
  { label: 'Sistema de Admisión', value: 'Sistema de Conductores Telescópicos de Longitud Variable (VICS)' },
  { label: 'Potencia Máxima (Carrera)', value: '700 CV (515 kW) a 9.000 RPM (Limitado por fiabilidad)' },
  { label: 'Potencia Máxima (Clasificación)', value: '930 CV (684 kW) a 10.500 RPM con mapeo agresivo' },
  { label: 'Par Motor Máximo', value: '608 Nm (448 lb·ft) @ 6.500 RPM' },
  { label: 'Caja de Cambios', value: 'Porsche 962 (Hewland VGC) manual de 5 velocidades' },
  { label: 'Sistema de Frenos', value: 'Discos ventilados de carbono-carbono Brembo con pinzas de 6 pistones' },
  { label: 'Peso en Vacío', value: '830 kg (Mínimo reglamentario del Grupo C)' },
  { label: 'Velocidad Máxima', value: '340+ km/h (con relación aerodinámica de baja carga para Mulsanne)' },
  { label: 'Velocidad Promedio en Carrera', value: '205 con 233 km/h' },
  { label: 'Capacidad del Depósito', value: '100 litros (Homologado según consumo de combustible FIA)' },
];

export const mazda787bChapters: Chapter[] = [
  {
    number: '01',
    category: 'GÉNESIS ROTATIVA',
    title: 'La Apuesta Más Audaz de Hiroshima: El Sueño del Motor Wankel',
    paragraphs: [
      'En la historia del automovilismo mundial, pocas marcas han desafiado el dogma establecido con tanta perseverancia como Toyo Kogyo, hoy conocida como Mazda. Mientras los gigantes de Detroit y Europa apostaban ciegamente por los motores de cilindros y pistones alternativos, la firma de Hiroshima adquirió en 1961 los derechos experimentales del motor rotativo inventado por Felix Wankel.',
      'Para los ingenieros de Mazda, el motor rotativo representaba la perfección mecánica: ausencia de pistones pesados, movimiento puramente rotacional, dimensiones ultracompactas y una suavidad de marcha inalcanzable para cualquier bloque convencional. Tras décadas de evolución en deportivos de calle como el Cosmo, el RX-3 y el RX-7, la dirección de Mazda tomó la decisión más ambiciosa de su historia: llevar la tecnología Wankel a la cúspide de la resistencia mundial, las 24 Horas de Le Mans.',
    ],
  },
  {
    number: '02',
    category: 'EL INFIERNO DE LA SARTHE',
    title: 'Grupo C: El Laboratorio Tecnológico Más Salvaje del Planeta',
    paragraphs: [
      'A finales de los años 80 y principios de los 90, la categoría Grupo C del Campeonato Mundial de Sport Prototipos vivía su época dorada. Monstruos aerodinámicos con motores V8 biturbo y V12 atmosféricos rugían por las rectas de Le Mans a más de 350 km/h, desafiando los límites de la física y la aerodinámica de suelo efecto.',
      'Para Mazdaspeed, el brazo deportivo liderado por Takaichi Ohashi, competir en el Grupo C significaba enfrentarse a colosos con presupuestos multimillonarios como Porsche, Jaguar, Mercedes-Benz y Peugeot. El prototipo con motor rotativo 787 y posteriormente el 787B nació como un banco de pruebas rodante sobre un chasis de fibra de carbono diseñado por Nigel Stroud, buscando la durabilidad extrema necesaria para sobrevivir 24 horas continuas de castigo mecánico a 9.000 RPM.',
    ],
    image: {
      src: mazda787bImages.cad,
      alt: 'Esquema de diseño y chasis del Mazda 787B',
      caption: 'Plano técnico del monocasco de carbono y geometría de suspensiones del prototipo Grupo C.',
      tag: 'ESQUEMA TÉCNICO // GRUPO C',
    },
  },
  {
    number: '03',
    category: 'LA OBRA MAESTRA R26B',
    title: 'R26B: La Sinfonía de 4 Rotores que Retumbaba en el Alma',
    paragraphs: [
      'El corazón indiscutible del Mazda 787B era el motor R26B, una obra maestra absoluta de la ingeniería mecánica. A diferencia de los motores anteriores de dos rotores, el R26B utilizaba cuatro rotores dispuestos en un eje principal compartido, alcanzando una cilindrada equivalente de 2.622 centímetros cúbicos.',
      'Lo que hacía único al R26B no era solo su potencia brutal de 700 caballos en carrera a 9.000 RPM y más de 930 caballos en clasificación, sino su sistema de admisión con conductos telescópicos de longitud variable VICS. Las trompetas de admisión se alargaban o acortaban electrónicamente según las revoluciones para optimizar el llenado de las cámaras de combustión en todo el rango de giro. Su sonido al rojo vivo, un aullido metálico agudo similar al de un reactor de combate, se convirtió en la melodía más inconfundible de la historia del automovilismo.',
    ],
    image: {
      src: mazda787bImages.engine,
      alt: 'Motor R26B 4-rotor Wankel',
      caption: 'Detalle del bloque R26B de 4 rotores, colectores de escape y trompetas de admisión variable.',
      tag: 'CORAZÓN MECÁNICO // R26B',
    },
    highlight: {
      value: '700 CV',
      label: 'Potencia continua del motor R26B a 9.000 RPM en carrera',
      description: 'El motor rotativo más potente jamás fabricado para competición de resistencia.',
    },
  },
  {
    number: '04',
    category: 'AERODINÁMICA Y CHASIS',
    title: 'Fibra de Carbono y el Secreto del Eje Trasero',
    paragraphs: [
      'El chasis del 787B fue construido utilizando un monocasco avanzado de fibra de carbono y panal de abejas compuesto, proporcionando una rigidez torsional extrema con un peso en vacío de apenas 830 kilogramos.',
      'La aerodinámica fue esculpida en el túnel de viento para generar el máximo apoyo aerodinámico en las curvas lentas de Indianapolis y Arnage, permitiendo al mismo tiempo reducir la resistencia al avance mediante la selección de relaciones de alerón trasero específicas para volar por la legendaria recta de Mulsanne, antes de que esta fuera partida por dos chicanes en 1990.',
    ],
  },
  {
    number: '05',
    category: 'LA LIBREA RENOWN',
    title: 'Naranja y Verde: Los Colores Inmortales del Patrocinador',
    paragraphs: [
      'Visualmente, el Mazda 787B es instantáneamente reconocible gracias a su icónica decoración geométrica en tonos verde brillante y naranja intenso, patrocinada por la marca de ropa japonesa Renown bajo su línea de moda Argyle.',
      'Este diseño audaz y vanguardista se apartaba de los tradicionales colores corporativos de competición, convirtiendo al coche número 55 en una obra de arte rodante que cautivó inmediatamente los corazones de los aficionados de todo el mundo.',
    ],
  },
  {
    number: '06',
    category: 'EL CAMBIO DE REGLAMENTO',
    title: 'La Sombra de la Prohibición: La Última Oportunidad',
    paragraphs: [
      'A finales de 1990, la Federación Internacional del Automóvil anunció una controvertida modificación radical en el reglamento del Campeonato Mundial de Sport Prototipos para la temporada de 1992: los motores atmosféricos de 3.5 litros pasarían a ser obligatorios, prohibiendo tajantemente los propulsores turboalimentados y los motores rotativos Wankel.',
      'Para Mazdaspeed, la edición de 1991 de las 24 Horas de Le Mans representaba la última oportunidad histórica para demostrar la supremacía del concepto rotativo antes de que la burocracia del automovilismo condenase al Wankel al ostracismo.',
    ],
  },
  {
    number: '07',
    category: 'EL EQUIPO DE PILOTOS',
    title: 'Herbert, Weidler y Gachot: La Tripulación del Triunfo',
    paragraphs: [
      'La responsabilidad de pilotar el coche principal, el chasis 787B-002 inscrito con el legendario número 55, recayó sobre una terna internacional de pilotos de talento excepcional: el británico Johnny Herbert, el alemán Volker Weidler y el belga-francés Bertrand Gachot.',
      'Cada uno aportó velocidad, temple y sensibilidad técnica durante las sesiones de clasificación y los exigentes entrenamientos previos, trabajando codo con codo con los ingenieros japoneses para encontrar una puesta a punto que preservase los frenos de carbono y los neumáticos Dunlop durante la dura noche francesa.',
    ],
    image: {
      src: mazda787bImages.cockpit,
      alt: 'Cockpit del Mazda 787B',
      caption: 'Puesto de conducción minimalista con volante Momo y instrumentación analógica de resistencia.',
      tag: 'CABINA // ENDURANCE',
    },
  },
  {
    number: '08',
    category: 'ESTRATEGIA DE CARRERA',
    title: 'Velocidad Controlada: La Táctica Frente a los Gigantes',
    paragraphs: [
      'La edición número 59 de las 24 Horas de Le Mans se presentaba como un campo de batalla titánico. Los todopoderosos Mercedes-Benz C11, con sus motores V8 biturbo de 5.0 litros que escupían más de 730 CV, eran los claros favoritos. Peugeot había presentado su revolucionario 905 con un motor V10 aullador, y Jaguar defendía el orgullo británico con sus mastodónticos XJR-12 equipados con inagotables motores V12 de 7.4 litros. Ante estos colosos, los tres Mazda 787 y 787B inscritos parecían, sobre el papel, candidatos secundarios.',
      'Los coches alemanes y británicos eran más rápidos a una vuelta pura y consumían algo menos de combustible gracias a la eficiencia térmica de sus enormes cilindradas. Sin embargo, los estrategas de Mazdaspeed, liderados por el inquebrantable Takaichi Ohashi, idearon un plan maestro de contención y resistencia. En 1991, Mazda corría bajo una exención de peso reglamentario que les permitía pesar solo 830 kg, frente a los 1000 kg de los monstruos alemanes.',
      'En lugar de correr el riesgo de reventar el motor R26B persiguiendo el liderato absoluto desde la primera hora, el equipo ordenó a sus pilotos mantener un ritmo constante, fiable y endiabladamente rápido. Ohashi sabía que la ligereza del chasis preservaría los neumáticos, los frenos de carbono Brembo y reduciría la fatiga estructural. La orden fue tajante: rodar sin cometer errores y exprimir la increíble durabilidad del motor rotativo a 9.000 RPM de manera ininterrumpida, esperando a que la carrera de desgaste pasara factura a los favoritos.',
    ],
  },
  {
    number: '09',
    category: 'LA NOCHE DE LA SARTHE',
    title: 'Sobreviviendo a la Oscuridad y al Desgaste',
    paragraphs: [
      'A las 16:00 horas del sábado 15 de junio, la bandera tricolor francesa dio la salida. Como era de esperar, los Mercedes-Benz Sauber C11 de Karl Wendlinger, Michael Schumacher, y Fritz Kreutzpointner impusieron un ritmo demoledor desde el inicio, distanciándose rápidamente del resto del pelotón. Mientras tanto, los Peugeot 905 volaban en las primeras horas antes de que su frágil juventud mecánica los obligara a abandonar prematuramente.',
      'A medida que la noche caía sobre el circuito de La Sarthe y la temperatura del asfalto descendía, la carrera se transformaba en una prueba de supervivencia pura. Los faros halógenos y de descarga iluminaban las rectas infinitas entre los tupidos bosques franceses. En ese escenario, los discos de freno de carbono del 787B se ponían al rojo vivo en cada violenta frenada de la curva de Mulsanne y Arnage, ofreciendo un espectáculo visual hipnótico.',
      'El coche #55 funcionaba como un reloj suizo de altísima precisión. Durante la gélida madrugada, los mecánicos de Mazdaspeed realizaban paradas en boxes impecables, cambiando neumáticos Dunlop y recargando combustible con una coreografía milimétrica. Mientras los pilotos se relevaban envueltos en sudor, el aullido estratosférico del motor de 4 rotores cortaba la noche francesa sin decaer un ápice en su intensidad. A diferencia de los vibrantes motores de pistones convencionales, la sedosa rotación del Wankel transmitía mucha menos fatiga estructural al chasis de carbono, previniendo microfisuras y roturas por vibración armónica.',
    ],
  },
  {
    number: '10',
    category: 'EL COLAPSO DE LOS LÍDERES',
    title: 'La Presión Insoportable sobre Mercedes-Benz',
    paragraphs: [
      'Al entrar en la madrugada profunda, la táctica de acoso silencioso de Mazda comenzó a dar sus frutos. El ritmo sostenido de los pilotos del coche #55 obligaba a los líderes a empujar sus mecánicas sin descanso. Los imbatibles Mercedes-Benz C11 comenzaron a sufrir el castigo térmico y mecánico de La Sarthe. Uno tras otro, los favoritos alemanes sufrieron percances: problemas en la caja de cambios, sobrecalentamiento del alternador y fatiga del soporte del motor.',
      'A las 12:54 horas del domingo, el líder incontestable de la carrera, el Mercedes-Benz C11 número 1, se vio obligado a entrar a boxes humeante. Un fallo catastrófico en el soporte del alternador había provocado una avería en la correa de la bomba de agua, destruyendo el portentoso motor V8 en cuestión de minutos. La desesperación inundó el garaje de Sauber-Mercedes mientras los mecánicos contemplaban impotentes el fin de su carrera.',
      'De las cenizas del gigante alemán, surgió el chillido triunfal del R26B. El Mazda 787B #55, que había escalado silenciosamente posiciones durante la noche manteniendo un ritmo infernal pero conservador, heredó el liderato general absoluto de la carrera. La noticia corrió como la pólvora por el paddock: un coche japonés, impulsado por un motor rotativo, lideraba las 24 Horas de Le Mans a falta de menos de cuatro horas.',
    ],
  },
  {
    number: '11',
    category: 'EL AMANECER DECISIVO',
    title: 'Los Rayos del Sol y la Persecución del Jaguar',
    paragraphs: [
      'Con las luces del domingo 16 de junio bañando de oro el asfalto de La Sarthe, el 787B continuaba rodando con una solidez pasmosa, pero la victoria estaba lejos de estar asegurada. Tras el desastre de Mercedes, los fornidos Jaguar XJR-12 de Silk Cut, pilotados por leyendas como Davy Jones y Raul Boesel, iniciaron una feroz cacería.',
      'Los enormes V12 británicos rugían recortando segundos por vuelta, intentando presionar al frágil prototipo japonés para provocar un fallo. En ese momento crítico, Johnny Herbert tomó el relevo al volante. Las temperaturas dentro de la cabina del Mazda superaban los 50 grados centígrados, exacerbadas por la posición central del abrasador motor R26B y los conductos de refrigeración.',
      'A pesar del calor asfixiante, de sufrir deshidratación severa y un agotamiento físico extremo, Herbert sabía que no podía ceder ni un milímetro. Aferrado al volante Momo de tres radios, el británico mantuvo el coche en pista con tiempos de vuelta extraordinariamente consistentes, bailando por las enlazadas de Porsche Curves con la precisión de un cirujano. La ligereza del Mazda y el mágico apoyo aerodinámico le permitieron mantener a raya a los obstinados Jaguar, que simplemente eran demasiado pesados para atrapar al prototipo verde y naranja en los sectores revirados.',
    ],
  },
  {
    number: '12',
    category: 'LA BANDERA A CUADROS',
    title: '16 de Junio de 1991: El Triunfo Histórico de Japón',
    paragraphs: [
      'Los últimos minutos de la carrera transcurrieron en una tensión agónica dentro del box de Mazdaspeed. Los ingenieros comprobaban obsesivamente la telemetría, temiendo que cualquier tornillo suelto pudiera arrebatarles la gloria. Sin embargo, la mecánica Wankel se mostró inmortal.',
      'A las 16:00 horas en punto, ante cientos de miles de espectadores enfervorizados, la bandera a cuadros cayó sobre el Mazda 787B número 55. Tras 362 extenuantes vueltas y 4.922 kilómetros recorridos a una impresionante velocidad media de 205 con 233 km/h, el prototipo cruzó la línea de meta. La cabina estalló de júbilo y las lágrimas brotaron en los rostros del estoico equipo japonés.',
      'Fue una victoria doblemente histórica y que reescribió los libros de récords. Por primera vez en los 68 años de historia de las 24 Horas de Le Mans, un fabricante asiático ganaba la clasificación general absoluta, rompiendo la hegemonía europea. Y lo que es aún más importante: por primera y única vez, un coche impulsado por un motor sin pistones —el incomprendido pero genial motor rotativo Wankel— conquistaba la gloria eterna en el santuario de la resistencia mundial, silenciando para siempre a sus críticos.',
    ],
    highlight: {
      value: '362 VUELTAS',
      label: 'Distancia completada en Le Mans 1991 (4.922 km)',
      description: 'Un hito histórico que consagró la tecnología rotativa de Mazda ante el mundo.',
    },
  },
  {
    number: '13',
    category: 'EL DRAMA EN EL PODIO',
    title: 'Johnny Herbert y el Desvanecimiento por Cansancio',
    paragraphs: [
      'La celebración posterior a la carrera estuvo marcada por un momento de intensa emoción y preocupación. Debido al esfuerzo físico titánico que supuso doblar turnos al volante con temperaturas sofocantes en la cabina, Johnny Herbert no pudo subir al podio por su propio pie y tuvo que recibir asistencia médica inmediata por deshidratación aguda.',
      'Mientras tanto, Volker Weidler y Bertrand Gachot alzaron el trofeo de campeones en nombre de todo el equipo Mazdaspeed y de los miles de ingenieros de Hiroshima que habían creído en el sueño del motor rotativo.',
    ],
  },
  {
    number: '14',
    category: 'EL SECRETO DE LA FIABILIDAD',
    title: '¿Por Qué el 787B No Rompió?',
    paragraphs: [
      'Muchos expertos se preguntaron cómo un motor tan radical como el R26B de 4 rotores pudo completar 24 horas a pleno rendimiento sin sufrir una sola avería, cuando sus rivales directos cayeron como moscas.',
      'La respuesta residía en el meticuloso trabajo de desarrollo de los sellos de los vértices de los rotores (apex seals), el diseño de las bujías de encendido de doble chispa por cámara y un sistema de refrigeración hiperdimensionado que disipaba el calor extremo con absoluta eficiencia.',
    ],
  },
  {
    number: '15',
    category: 'EL LEGADO INMORTAL',
    title: 'El Icono Absoluto del Automovilismo Japonés',
    paragraphs: [
      'La victoria del Mazda 787B en Le Mans 1991 trascendió el ámbito deportivo para convertirse en un símbolo de orgullo nacional y excelencia tecnológica para Japón, comparable al éxito de los Honda en la Fórmula 1.',
      'La librea Renown y el inconfundible rugido del R26B quedaron grabados a fuego en la memoria colectiva de varias generaciones de entusiastas, convirtiendo al coche en un mito inalcanzable y el santo grial de los coleccionistas.',
    ],
  },
  {
    number: '16',
    category: 'EL MUSEO Y LA RESTAURACIÓN',
    title: 'El Cuidado de las Leyendas en Hiroshima',
    paragraphs: [
      'Tras su gesta, el chasis ganador #55 fue retirado de la competición activa y trasladado con honores al Museo Mazda en Hiroshima, donde se conserva en estado de marcha original.',
      'Periódicamente, los técnicos veteranos de Mazdaspeed arrancan el motor R26B en eventos especiales alrededor del mundo, haciendo rugir de nuevo los cuatro rotores para deleite de los aficionados que acuden exclusivamente para escuchar su música mecánica.',
    ],
  },
  {
    number: '17',
    category: 'HOMENAJES EN VIDEOJUEGOS',
    title: 'El Protagonista Indiscutible de Gran Turismo',
    paragraphs: [
      'Para los millones de jugadores de la saga "Gran Turismo" desarrollada por Polyphony Digital, el Mazda 787B con la decoración Renown es uno de los vehículos más codiciados, icónicos y memorables de toda la historia de los videojuegos de conducción.',
      'Conducir el 787B con una perspectiva de cabina y escuchar su característico sonido a través de un sistema de sonido envolvente se convirtió en el rito de iniciación definitivo para cualquier amante de los coches virtuales.',
    ],
  },
  {
    number: '18',
    category: 'INFLUENCIA EN NUEVOS PROYECTOS',
    title: 'El Espíritu del Wankel en el Siglo XXI',
    paragraphs: [
      'Aunque las normativas de emisiones y eficiencia han relegado al motor rotativo de alta cilindrada de los coches de producción masiva, Mazda ha mantenido vivo el espíritu del Wankel utilizándolo como extensor de autonomía en vehículos eléctricos híbridos enchufables como el Mazda MX-30 R-EV.',
      'Los ingenieros de Hiroshima continúan investigando y patentando nuevas tecnologías de combustión rotativa, demostrando que el legado del 787B sigue vivo en el ADN de la compañía.',
    ],
  },
  {
    number: '19',
    category: 'COMPARATIVA HISTÓRICA',
    title: 'Mazda 787B vs. Porsche 962 vs. Sauber C11',
    paragraphs: [
      'En la cumbre de los prototipos de Grupo C de 1991, el Mazda 787B competía contra leyendas absolutas de la ingeniería alemana como el Porsche 962C y el dominante Mercedes-Benz Sauber C11.',
      'Mientras los alemanes confiaban en motores turbo de gran cilindrada o potentes V8, el 787B demostró que la ligereza de un chasis de carbono, la finura aerodinámica y la asombrosa suavidad de giro de un motor rotativo sin pistones alternativos podían derrotar a los gigantes de Europa en su propio terreno.',
    ],
  },
  {
    number: '20',
    category: 'EL HIMNO ETERNO DE HIROSHIMA',
    title: 'Por Qué el Mazda 787B Vivirá Por Siempre',
    paragraphs: [
      'El Mazda 787B no es únicamente un coche de carreras ganador de Le Mans; es el triunfo absoluto de la pasión sobre la convención, la prueba palpable de que un sueño audaz puede superar cualquier barrera técnica o reglamentaria.',
      'Cada vez que el R26B ruge a 9.000 RPM en una exhibición internacional, los fantasmas de la victoria de 1991 regresan para recordarnos que hubo una vez en la que Hiroshima desafió al mundo entero y ganó con el poder de cuatro rotores girando hacia la eternidad.',
    ],
    highlight: {
      value: 'EL Nº 55',
      label: 'El número sagrado del automovilismo mundial',
      description: 'El monoplaza que convirtió el motor rotativo en leyenda eterna.',
    },
  },
];
