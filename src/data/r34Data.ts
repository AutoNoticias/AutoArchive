import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import r34HeroImg from '../assets/images/r34_gtr_hero_bayside_blue_1787310472663.jpg';
import r34EngineImg from '../assets/images/r34_rb26dett_real_engine_1787414327247.jpg';
import r34CockpitImg from '../assets/images/r34_mfd_cockpit_interior_1787310494305.jpg';
import r34CadImg from '../assets/images/r34_cad_blueprint_schematic_1787310505106.jpg';
import r34ZtuneImg from '../assets/images/r34_nismo_ztune_rear_1787310526358.jpg';

export const r34Images = {
  hero: r34HeroImg,
  engine: r34EngineImg,
  cockpit: r34CockpitImg,
  cad: r34CadImg,
  ztune: r34ZtuneImg,
};

export const r34Stats: StatItem[] = [
  { value: '280', unit: 'CV (OFICIAL)', label: 'Pacto de Caballeros Japonés (330+ CV Reales)' },
  { value: '300', unit: 'KM/H+', label: 'Velocidad Punta Deslimitada' },
  { value: '7:52', unit: 'MIN:SEG', label: 'Tiempo en Nürburgring Nordschleife (1999)' },
  { value: '2.6', unit: 'LITROS', label: 'Cilindrada RB26DETT 6 en Línea Biturbo' },
  { value: '11,578', unit: 'UNIDADES', label: 'Producción Total BNR34 (1999-2002)' },
  { value: '50:50', unit: 'TORQUE', label: 'Reparto Vectorial ATTESA E-TS Pro' },
];

export const r34Timeline: TimelineItem[] = [
  {
    year: '1969',
    title: 'Nace la Leyenda: Hakosuka PGC10',
    description:
      'Nissan presenta el primer Skyline GT-R con motor S20 de 6 cilindros y 24 válvulas derivado del prototipo de competición R380. Logra 52 victorias consecutivas en turismos japoneses.',
  },
  {
    year: '1989',
    title: 'El Retorno de Godzilla: BNR32',
    description:
      'Tras 16 años de ausencia, Nissan revive la insignia GT-R con tracción total ATTESA E-TS y el motor RB26DETT para dominar el Grupo A mundial sin perder una sola carrera en el JTCC.',
  },
  {
    year: '1995',
    title: 'La Evolución Aerodinámica: BCNR33',
    description:
      'El R33 estrena el diferencial activo Active LSD y se convierte en el primer coche de producción de serie en bajar de los 8 minutos en Nürburgring Nordschleife (7:59).',
  },
  {
    year: 'Enero 1999',
    title: 'Presentación Oficial del BNR34',
    description:
      'Bajo la dirección del ingeniero jefe Kozo Watanabe, Nissan lanza el R34 con chasis un 50% más rígido, carrocería más corta y agresiva, y la legendaria pantalla MFD desarrollada con Polyphony Digital.',
  },
  {
    year: 'Octubre 2000',
    title: 'Llega el V-Spec II: Capó de Carbono NACA',
    description:
      'Actualización con capó de fibra de carbono dotado de toma NACA funcional, suspensión aún más firme, frenos Brembo dorados y pedales de aluminio perforado.',
  },
  {
    year: 'Mayo 2001',
    title: 'M-Spec: El "Mizuno" de Gran Turismo',
    description:
      'Versión bautizada en honor al ingeniero Kazutoshi Mizuno, con amortiguadores Ripple Control de absorción de microvibraciones y tapicería de cuero cosido a mano con asientos calefactables.',
  },
  {
    year: 'Febrero 2002',
    title: 'Ediciones V-Spec II Nür & M-Spec Nür',
    description:
      'Homenaje al Infierno Verde alemán: equipan el motor N1 de competición con bloque reforzado 24U, turbocompresores con turbinas de acero y tapa de balancines en color dorado Millennium Jade.',
  },
  {
    year: 'Agosto 2002',
    title: 'Fin de la Producción de la Saga Skyline GT-R',
    description:
      'Sale de la planta de Tochigi el último BNR34 de la historia, cerrando tres décadas de la denominación Skyline GT-R con motor 6 en línea y tracción total manual.',
  },
  {
    year: '2005',
    title: 'NISMO Z-Tune: El Canto de Cisne de 500 CV',
    description:
      'NISMO recompra 19 unidades usadas de R34 V-Spec con menos de 30.000 km, desmonta los chasis hasta el metal desnudo, refuerza con costuras de soldadura y crea la máquina definitiva de 500 CV y 2.8L (RB26DETT Z2).',
  },
];

export const r34Specs: SpecItem[] = [
  { label: 'Denominación de Chasis', value: 'GF-BNR34 (V-Spec / V-Spec II)' },
  { label: 'Configuración Motor', value: 'RB26DETT · 6 cilindros en línea DOHC 24V Biturbo' },
  { label: 'Cilindrada Exacta', value: '2.568 cc (86.0 mm diámetro × 73.7 mm carrera)' },
  { label: 'Bloque y Culata', value: 'Bloque de hierro fundido nodular y culata de aluminio' },
  { label: 'Turbocompresores', value: 'Twin Garrett T28 cerámicos en paralelo (acero en N1/Nür)' },
  { label: 'Potencia Oficial Declarada', value: '280 CV (206 kW) @ 6.800 RPM (Pacto Japonés)' },
  { label: 'Potencia Real en Banco', value: '327 — 334 CV de serie sin restricciones' },
  { label: 'Par Motor Máximo', value: '392 Nm (40.0 kgf·m) @ 4.400 RPM' },
  { label: 'Caja de Cambios', value: 'Manual Getrag 233 de 6 velocidades con sincronizadores triples' },
  { label: 'Sistema de Tracción Total', value: 'ATTESA E-TS Pro con reparto electrohidráulico y Active LSD' },
  { label: 'Dirección a las 4 Ruedas', value: 'Super HICAS eléctrica asistida por ordenador' },
  { label: 'Frenos', value: 'Discos ventilados Brembo (324mm del. / 300mm tras.) con pinzas doradas' },
  { label: 'Peso en Vacío', value: '1.560 kg (V-Spec) / 1.540 kg (V-Spec II con capó carbono)' },
  { label: 'Aceleración 0-100 km/h', value: '4.6 segundos (4.9s oficial)' },
  { label: 'Cuarto de Milla (400m)', value: '12.9 segundos @ 178 km/h' },
  { label: 'Distribución de Peso', value: '55% Delante / 45% Detrás' },
  { label: 'Pantalla de Telemetría', value: 'Multi-Function Display (MFD) Hitachi/Xanavi 5.8" TFT' },
  { label: 'Capacidad de Combustible', value: '65 litros' },
];

export const r34Chapters: Chapter[] = [
  {
    number: '01',
    category: 'GÉNESIS & HERENCIA',
    title: 'El Fantasma del Grupo A y el Nacimiento del Arma Definitiva',
    paragraphs: [
      'Para comprender la existencia del Nissan Skyline GT-R R34 (código de chasis BNR34), es imperativo viajar a los circuitos de finales de los años ochenta. Cuando el R32 debutó en 1989 con el revolucionario motor RB26DETT y el sistema de tracción total inteligente ATTESA E-TS, su objetivo era uno solo: aniquilar a los Ford Sierra RS500 Cosworth y BMW M3 E30 en el Campeonato Japonés de Turismos (JTCC) y en las prestigiosas 24 Horas de Spa-Francorchamps.',
      'El resultado fue una masacre deportiva tan absoluta (29 victorias de 29 carreras en el JTCC japonés y dominio indiscutido en el campeonato australiano de turismos de Bathurst) que la prensa australiana lo bautizó con el terrorífico apodo de "Godzilla", el monstruo marino que emerge de las profundidades para destruir todo a su paso.',
      'Sin embargo, tras el paso del más grande y pesado R33 en 1995, el equipo de ingenieros de Nissan en Tochigi y Omori sabía que la generación que cerraría el milenio debía volver a las proporciones compactas, a la violencia mecánica y a la precisión milimétrica.',
    ],
    highlight: {
      value: '29 de 29',
      label: 'Victorias consecutivas del GT-R en el JTCC Grupo A',
      description: 'El récord de imbatibilidad más abrumador en la historia del automovilismo de turismos asiático.',
    },
  },
  {
    number: '02',
    category: 'INGENIERÍA DE CHASIS',
    title: 'Kozo Watanabe y la Obsesión por la Rigidez Torsional',
    paragraphs: [
      'El ingeniero jefe Kozo Watanabe asumió la dirección del proyecto BNR34 con un mandamiento inquebrantable: acortar la carrocería respecto al R33, reducir el voladizo delantero para eliminar el subviraje inercial y elevar la rigidez estructural a cotas nunca vistas en un deportivo de gran serie.',
      'La longitud total se redujo en 75 milímetros, con 20 mm menos en el voladizo frontal. El chasis fue sometido a simulaciones de elementos finitos por supercomputadora, añadiendo mamparos de refuerzo soldados en las torretas de suspensión delantera, túnel de transmisión reforzado y barras de torsión traseras de fundición de aluminio.',
      'El resultado fue un incremento astronómico del 50% en la rigidez torsional global comparado con el R33, permitiendo a los ingenieros ajustar la geometría de los multibrazos independientes con tolerancias de apenas décimas de milímetro.',
    ],
    image: {
      src: r34HeroImg,
      alt: 'Nissan Skyline GT-R R34 Bayside Blue en estudio',
      caption: 'El icónico perfil musculoso del BNR34 con llantas forjadas de 18 pulgadas y pintura Bayside Blue (código TV2).',
      tag: 'CHASIS BNR34',
    },
  },
  {
    number: '03',
    category: 'MECÁNICA DE LEYENDA',
    title: 'El Sagrado Corazón: La Arquitectura del RB26DETT',
    paragraphs: [
      'En el corazón de todo Skyline GT-R de la era dorada late el RB26DETT: un bloque de hierro fundido nodular de 6 cilindros en línea, culata de aluminio de 24 válvulas DOHC y un sistema de alimentación mediante seis mariposas de admisión individuales (ITBs), una para cada cilindro, que garantizaba una respuesta de acelerador instantánea digna de un monoplaza de Gran Premio.',
      'La sobrealimentación corría a cargo de dos turbocompresores Garrett T28 cerámicos en paralelo. Las turbinas cerámicas eran notablemente más ligeras que las de acero tradicional, reduciendo la inercia rotacional y prácticamente eliminando el turbo-lag por encima de las 3.500 RPM.',
      'Con un cigüeñal de acero forjado de 7 apoyos y pistones con faldas refrigeradas por chorros de aceite dedicados bajo cada camisa, el RB26DETT fue diseñado desde su concepción para soportar presiones de hasta 600 CV de competición con componentes internos completamente de serie.',
    ],
    image: {
      src: r34EngineImg,
      alt: 'Vano motor RB26DETT twin-turbo en detalle',
      caption: 'Tapa de balancines en rojo texturizado con mariposas individuales y turbos gemelos en paralelo.',
      tag: 'MOTOR RB26DETT',
    },
  },
  {
    number: '04',
    category: 'EL PACTO DE CABALLEROS',
    title: 'La Mentira Oficial de los 280 Caballos de Fuerza',
    paragraphs: [
      'En el catálogo oficial de Nissan y en la ficha técnica homologada ante el Ministerio de Transporte de Japón, el Skyline GT-R R34 declaraba exactamente 280 CV (276 CV / 206 kW) a 6.800 RPM. Esto se debía al famoso "Gentlemen’s Agreement" (Pacto de Caballeros) de 1989 entre los fabricantes nipones de la JAMA para evitar una guerra armamentística de potencia en las carreteras públicas.',
      'La realidad era un secreto a voces: al subir un BNR34 de estricta serie a cualquier banco de potencia dinamométrico de rodillos, el motor arrojaba de forma consistente entre 327 y 334 caballos de vapor reales a las ruedas.',
      'Bastaba con retirar el pequeño restrictor de plástico amarillo instalado en la línea de vacío de la válvula de control de presión de turbo (un proceso que los preparadores y entusiastas tardaban 30 segundos en realizar) para que la presión de soplado pasara de 0.85 bar a 1.05 bar, liberando de inmediato 360 CV sin comprometer la fiabilidad.',
    ],
    highlight: {
      value: '334 CV',
      label: 'Potencia real en banco de dinamómetro de serie',
      description: 'Superaba con holgura los 280 CV declarados por el pacto de caballeros nipón.',
    },
  },
  {
    number: '05',
    category: 'TELEMETRÍA DIGITAL',
    title: 'La Pantalla MFD y la Conexión con Gran Turismo',
    paragraphs: [
      'Mucho antes de que los coches deportivos modernos incorporaran pantallas táctiles configurables, el R34 revolucionó el mundo del automóvil al equipar en la consola central el Multi-Function Display (MFD): una pantalla a color TFT de 5.8 pulgadas desarrollada conjuntamente por Nissan, Hitachi, Xanavi y el equipo de Polyphony Digital liderado por Kazunori Yamauchi (creador de la saga de videojuegos Gran Turismo).',
      'El MFD no era un adorno cosmético; era una unidad telemétrica de grado aeroespacial que monitorizaba en tiempo real la presión de sobrealimentación de ambos turbos, temperatura de aceite de motor y refrigerante, temperatura de escape, ciclo de trabajo de los inyectores, porcentaje de apertura del acelerador y, en las versiones V-Spec, un sensor de fuerzas G laterales y longitudinales junto a un medidor de tiempo por vuelta con memoria.',
      'El conductor podía alternar entre diferentes gráficos de aguja digital y gráficos de barras históricas, dotando al habitáculo de una atmósfera de caza de combate F-15 que fascinó a toda una generación.',
    ],
    image: {
      src: r34CockpitImg,
      alt: 'Cockpit interior del R34 con la pantalla MFD activa',
      caption: 'El habitáculo enfocado al piloto con la pantalla MFD en la consola central mostrando curvas de soplado y fuerzas G.',
      tag: 'TELEMETRÍA MFD',
    },
  },
  {
    number: '06',
    category: 'TRACCIÓN TOTAL VETORIAL',
    title: 'ATTESA E-TS Pro: La Inteligencia Artificial Analógica',
    paragraphs: [
      'El sistema ATTESA E-TS Pro (Advanced Total Traction Engineering System for All-Terrain Electronic Torque Split) representaba la cúspide de la ingeniería de tracción total en los años 90.',
      'En condiciones normales de adherencia y aceleración en línea recta, el 100% del par motor se enviaba a las ruedas traseras, manteniendo la agilidad, ligereza y comportamiento puro de un vehículo de propulsión posterior. Sin embargo, una red de microprocesadores de 16 bits leía 100 veces por segundo la velocidad de cada rueda mediante los sensores del ABS, la posición del volante y el sensor de aceleración G.',
      'En milisegundos, un embrague multidisco bañado en aceite ubicado en la caja de transferencia enviaba hasta el 50% del par al eje delantero. En la versión V-Spec, el diferencial trasero Active LSD controlaba independientemente el bloqueo de cada rueda trasera, permitiendo al R34 trazar curvas en lluvia o asfalto roto a velocidades que desafiaban las leyes de la física.',
    ],
  },
  {
    number: '07',
    category: 'DIRECCIÓN EN LAS 4 RUEDAS',
    title: 'Super HICAS: El Giro Cuádruple Electrónico',
    paragraphs: [
      'Complementando la tracción total, el R34 equipaba la última y más refinada evolución del sistema Super HICAS (High Capacity Actively Controlled Steering). A diferencia de los sistemas hidráulicos anteriores del R32, el R34 utilizaba un actuador eléctrico de alta velocidad montado en el subchasis trasero.',
      'A velocidades de autopista y en cambios rápidos de carril, las ruedas traseras giraban en la misma dirección que las delanteras hasta en 1 grado, estabilizando el centro de gravedad del vehículo y eliminando el balanceo de la zaga.',
      'En curvas lentas y horquillas de montaña (Touge), el sistema giraba inicialmente en fase opuesta para inscribir el morro de forma fulgurante en el vértice de la curva, antes de realinearse para permitir una salida a fondo con tracción perfecta.',
    ],
  },
  {
    number: '08',
    category: 'TRANSMISIÓN GETRAG',
    title: 'La Caja de Seis Velocidades Getrag 233',
    paragraphs: [
      'Una de las mayores debilidades de los anteriores R32 y R33 en competiciones de resistencia era la caja de cambios manual de 5 velocidades, propensa a roturas de sincronizadores cuando los motores superaban los 500 CV.',
      'Para el R34, Nissan colaboró estrechamente con la firma alemana Getrag para desarrollar la caja Getrag 233 de 6 relaciones cerradas. Construida con carcasa reforzada y sincronizadores triples en 1ª, 2ª y 3ª velocidad, esta transmisión era capaz de resistir arrancadas a 7.000 RPM sin inmutarse.',
      'El tacto de la palanca, corto, metálico y de precisión quirúrgica, se convirtió en uno de los atributos más celebrados por los probadores de revistas como Best Motoring y Option Magazine.',
    ],
  },
  {
    number: '09',
    category: 'AERODINÁMICA BAJO EL CHASIS',
    title: 'Efecto Suelo: Difusores de Fibra de Carbono en el V-Spec',
    paragraphs: [
      'El Skyline GT-R V-Spec (Victory Specification) no era una simple denominación comercial; incorporaba un paquete aerodinámico subterráneo pionero en un vehículo de producción en serie.',
      'Bajo el parachoques delantero, una bandeja inferior de plástico técnico canalizaba el flujo de aire hacia los frenos y el cárter. Pero la verdadera joya de la corona residía en la zaga: un monumental difusor trasero de fibra de carbono vista que envolvía el escape y el diferencial trasero.',
      'Este difusor creaba un área de baja presión por efecto Venturi, succionando literalmente el coche contra el pavimento a altas velocidades y permitiendo que el alerón trasero ajustable de doble ala trabajara con un ángulo de ataque menor, reduciendo la resistencia al avance.',
    ],
    image: {
      src: r34CadImg,
      alt: 'Plano técnico CAD del chasis y difusores del R34',
      caption: 'Esquema técnico ortográfico del BNR34 con distribución aerodinámica y cotas dimensionales.',
      tag: 'PLANO TÉCNICO CAD',
    },
  },
  {
    number: '10',
    category: 'EL INFIERNO VERDE',
    title: 'El Asalto a Nürburgring Nordschleife: 7 Minutos 52 Segundos',
    paragraphs: [
      'Desde el desarrollo del R32, Nissan adoptó el legendario circuito alemán de Nürburgring Nordschleife como su laboratorio de pruebas de fuego. En 1999, el piloto de pruebas oficial de Nissan, Kazuo Shimizu, llevó un prototipo de R34 V-Spec de preproducción al trazado de 20.8 kilómetros.',
      'Bajo condiciones de asfalto mixto y tráfico en pista, el R34 paró el cronómetro en 7 minutos y 52 segundos, pulverizando el récord anterior del R33 y superando a superdeportivos europeos consagrados como el Porsche 911 (996) Carrera y el Ferrari F355.',
      'El vídeo a bordo de la vuelta de Shimizu, esquivando baches en Flugplatz y negociando el Karussell a fondo con el indicador de fuerzas G del MFD rozando 1.3G, se convirtió en un documento de culto instantáneo entre los fanáticos del motor en todo el planeta.',
    ],
    highlight: {
      value: '7:52.00',
      label: 'Tiempo récord en Nürburgring Nordschleife (1999)',
      description: 'El deportivo de 4 plazas más rápido del mundo en el Infierno Verde a finales de los 90.',
    },
  },
  {
    number: '11',
    category: 'GAMA & VERSIONES',
    title: 'De V-Spec a V-Spec II: El Capó de Carbono NACA',
    paragraphs: [
      'En agosto del año 2000, Nissan presentó el V-Spec II, la evolución más deseada del BNR34. La modificación visual y funcional más llamativa fue la adopción de un capó fabricado en fibra de carbono (CFRP), ahorrando preciados kilogramos en el tren delantero.',
      'El capó integraba una toma de aire de perfil NACA funcional que enviaba aire fresco directamente sobre el turbocompresor trasero, ayudando a disipar las altas temperaturas acumuladas en el vano motor durante tandas de circuito.',
      'En el habitáculo, la consola central adoptó molduras en tono titanio oscuro, los asientos recibieron tapicería de tela negra de alta adherencia y se añadieron los exclusivos pedales de aleación de aluminio taladrados.',
    ],
  },
  {
    number: '12',
    category: 'GRAN TURISMO DE LUJO',
    title: 'El M-Spec: La Visión de Confort de Kazutoshi Mizuno',
    paragraphs: [
      'El legendario ingeniero de Nissan Kazutoshi Mizuno (quien más tarde crearía el Nissan GT-R R35) concibió una versión con una filosofía completamente distinta: el M-Spec (bautizado con la "M" por su propio apellido).',
      'Mizuno entendía que muchos clientes adinerados deseaban las prestaciones demoledoras del GT-R sin sufrir la dureza extrema de la suspensión de circuito del V-Spec II. Para ellos desarrolló los amortiguadores "Ripple Control", diseñados para absorber las microvibraciones y ondulaciones del asfalto a alta velocidad.',
      'El interior del M-Spec era un derroche de lujo artesanal: asientos de cuero cosidos a mano con calefacción integrada y un volante forrado en piel de grano fino, convirtiéndolo en el Gran Turismo definitivo para devorar la autopista Shuto de Tokio a 250 km/h con total serenidad.',
    ],
  },
  {
    number: '13',
    category: 'EDICIONES HOMENAJE',
    title: 'V-Spec II Nür & M-Spec Nür: El Bloque Dorado N1',
    paragraphs: [
      'En febrero de 2002, como despedida oficial de la producción del R34, Nissan lanzó las series limitadas Nür (nombradas en honor a Nürburgring): 718 unidades del V-Spec II Nür y 285 unidades del M-Spec Nür.',
      'La diferencia fundamental radicaba bajo el capó: montaban el motor RB26DETT con especificación N1 de carreras de resistencia. El bloque de cilindros estaba marcado con el código 24U (con paredes de cilindro más gruesas y pasos de refrigerante sobredimensionados), turbos Garrett con turbinas de acero para soportar mayores presiones sin riesgo de rotura de las aspas cerámicas, bomba de agua N1 de mayor caudal y pistones equilibrados individualmente.',
      'Para identificarlos, la tapa de balancines fue pintada en un exquisito color dorado metálico y se introdujo el legendario color de carrocería Millennium Jade (código JW0), hoy en día una de las pinturas más cotizadas en subastas de coleccionistas.',
    ],
    image: {
      src: r34ZtuneImg,
      alt: 'Nissan Skyline GT-R R34 NISMO Z-Tune con pilotos traseros encendidos',
      caption: 'Pilotos circulares cuádruples iluminados y escape de titanio en el icono de Omori.',
      tag: 'NÜR & NISMO',
    },
  },
  {
    number: '14',
    category: 'CULTURA TOUGE & WANGAN',
    title: 'El Rey de la Medianoche: El Mid Night Club y la Autopista Shuto',
    paragraphs: [
      'El místico aura del R34 no se forjó únicamente en los circuitos oficiales, sino también en las sombras del asfalto nocturno japonés. En la Bayshore Route (Wangan) de la autopista Shuto y en los puertos de montaña de Gunma y Hakone (Touge), el GT-R era el monarca indiscutido.',
      'Preparadores legendarios como Mine’s, Top Secret (liderado por Kazuhiko "Smokey" Nagata), HKS, Blitz y JUN Auto utilizaron la plataforma BNR34 como lienzo para romper barreras inimaginables.',
      'El R34 de Mine’s, con apenas 600 CV pero una respuesta de acelerador calibrada al milisegundo y una reducción de peso obsesiva, se convirtió en el coche más rápido en el circuito de Tsukuba, humillando a superdeportivos europeos con el doble de potencia en los vídeos del programa Hot Version.',
    ],
  },
  {
    number: '15',
    category: 'EL SANTO GRIAL',
    title: 'NISMO Z-Tune: 500 CV Artesanales en Omori Factory',
    paragraphs: [
      'Para celebrar el 20º aniversario de NISMO en 2005, cuando la producción del R34 ya había finalizado, los ingenieros de Omori Factory decidieron crear el superdeportivo definitivo: el NISMO R34 GT-R Z-Tune.',
      'Como ya no había chasis nuevos, NISMO adquirió en el mercado de ocasión 19 unidades de R34 V-Spec con menos de 30.000 km y sin daños estructurales. Cada coche fue completamente desmontado hasta la chapa desnuda.',
      'El monocasco fue reforzado a mano con costuras de soldadura estructural y paneles de fibra de carbono en los túneles y vano motor. El motor, denominado RB26DETT Z2, vio su cilindrada aumentada a 2.8 litros (2.771 cc) con turbos IHI derivados del coche de carreras de las 24 Horas de Nürburgring, entregando 500 CV a 6.800 RPM y 540 Nm de par.',
    ],
    highlight: {
      value: '19 Unidades',
      label: 'Fabricadas del legendario NISMO Z-Tune (2005)',
      description: 'Cada unidad supera hoy los 2 millones de dólares en el mercado internacional de coleccionistas.',
    },
  },
  {
    number: '16',
    category: 'ESPECIFICACIONES Z-TUNE',
    title: 'Frenos Brembo Monobloque y Amortiguadores SACHS F1',
    paragraphs: [
      'El NISMO Z-Tune no dejaba ni un solo componente al azar. Para frenar una bestia capaz de alcanzar los 100 km/h en 3.8 segundos y superar los 327 km/h, se instaló un sistema de frenos desarrollado conjuntamente con Brembo: pinzas monobloque de 6 pistones delante con discos flotantes de 365 mm y pinzas de 4 pistones detrás.',
      'La suspensión fue encomendada a SACHS Race Engineering, montando amortiguadores con especificación derivada de los monoplazas de Fórmula 1 con ajuste tridireccional.',
      'El sistema de escape completo fue fabricado en titanio aeroespacial con soldaduras vistas, mientras que las aletas delanteras ensanchadas y el capó ventilado de fibra de carbono reducían la sustentación aerodinámica a cero en el eje delantero.',
    ],
  },
  {
    number: '17',
    category: 'ÉXITO EN COMPETICIÓN',
    title: 'El Dominio en el All Japan GT Championship (JGTC)',
    paragraphs: [
      'En el prestigioso campeonato JGTC (actual Super GT), el R34 GT500 de NISMO defendió el honor de Nissan frente a los monstruosos Toyota Supra y Honda NSX.',
      'Equipado con un kit de fuselaje ancho de fibra de carbono y motores que evolucionaron del RB26DETT al V6 biturbo VQ30DETT para mejorar el reparto de masas, el R34 de Pennzoil NISMO pilotado por Érik Comas y Satoshi Motoyama conquistó el campeonato de pilotos en 1999.',
      'En 2003, en su año de despedida en el JGTC, el R34 Motul Pitwork NISMO ganó nuevamente el campeonato absoluto, despidiéndose de los trazados de Suzuka y Fuji Speedway en lo más alto del podio.',
    ],
  },
  {
    number: '18',
    category: 'CINE & VIDEOJUEGOS',
    title: 'El Icono de Paul Walker y el Fenómeno Global',
    paragraphs: [
      'La consagración del R34 en el imaginario colectivo occidental llegó a través del cine y los videojuegos. La saga Gran Turismo de PlayStation permitió a millones de jóvenes de todo el mundo conocer los detalles de un coche que nunca se vendió oficialmente en Estados Unidos ni en Europa continental con volante a la izquierda.',
      'En 2003, el estreno de la película "2 Fast 2 Furious" (A todo gas 2) inmortalizó al actor Paul Walker al volante de un R34 plata con franjas azules y luces de neón cruzando el puente levadizo de Miami.',
      'Walker, quien era un auténtico entusiasta del motor y coleccionista de GT-R en su vida privada, consideraba al BNR34 su automóvil favorito de todos los tiempos, convirtiendo el modelo en un símbolo de la cultura pop del siglo XXI.',
    ],
  },
  {
    number: '19',
    category: 'LEGISLACIÓN & COTIZACIÓN',
    title: 'La Regla de los 25 Años y la Fiebre en Subastas',
    paragraphs: [
      'Debido a las estrictas leyes de importación de Estados Unidos (la famosa "25-Year Rule" de la NHTSA), los Skyline GT-R R34 no podían circular legalmente en territorio estadounidense hasta cumplir 25 años desde su fecha de fabricación original.',
      'En 2024, con el desbloqueo legal de los primeros modelos de 1999, la demanda internacional explotó de manera estratosférica. Ejemplares en estado original de V-Spec II Nür en color Millennium Jade o Midnight Purple II han superado los 400.000 a 700.000 dólares en subastas de Bring a Trailer y RM Sotheby’s.',
      'Los coleccionistas consideran al R34 el equivalente japonés al Porsche 911 Carrera RS 2.7 o al Ferrari F40: la cúspide analógica de una marca antes de la llegada de la era digital y las cajas de cambio de doble embrague.',
    ],
  },
  {
    number: '20',
    category: 'LEGADO ETERNO',
    title: 'El Último Samurái: Por Qué Nunca Habrá Otro Igual',
    paragraphs: [
      'El Nissan Skyline GT-R R34 representa el punto álgido de una época irrepetible en la historia del automóvil japonés: una era en la que los ingenieros tenían libertad presupuestaria absoluta para sobredimensionar cada pieza de metal, en la que el conductor estaba conectado mecánicamente a una caja de cambios manual y en la que un motor de 6 cilindros en línea cantaba hasta las 8.000 RPM escupiendo fuego por el escape.',
      'Aunque su sucesor, el Nissan GT-R R35 de 2007, superó todas sus cifras de aceleración y tiempos en circuito, el R34 retiene un alma visceral, una estética atemporal de aristas musculosas y una mística cultural que ningún superdeportivo moderno podrá jamás replicar.',
      'Veinticinco años después de su nacimiento, el rugido del RB26DETT resonando en la noche de Tokio sigue recordando al mundo que hubo una vez en la que un sedán de cuatro plazas transformado en cupé desafió a los gigantes de Europa y se convirtió en el Dios del Asfalto.',
    ],
    highlight: {
      value: 'BNR34',
      label: 'El Último Skyline GT-R con motor RB26DETT y cambio manual',
      description: 'El deportivo japonés más venerado, mitificado y respetado de todos los tiempos.',
    },
  },
];
