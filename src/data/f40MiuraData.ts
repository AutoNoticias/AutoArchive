import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import f40StudioImg from '../assets/images/f40_studio_red_1787274141701.jpg';
import miuraStudioImg from '../assets/images/miura_sv_studio_1787274165236.jpg';
import f40EngineImg from '../assets/images/f40_engine_turbos_1787274175395.jpg';
import miuraEngineImg from '../assets/images/miura_engine_v12_1787274186431.jpg';
import cadSchematicImg from '../assets/images/f40_miura_cad_schematic_1787274197990.jpg';

export const f40MiuraImages = {
  f40Hero: f40StudioImg,
  miuraHero: miuraStudioImg,
  f40Engine: f40EngineImg,
  miuraEngine: miuraEngineImg,
  schematic: cadSchematicImg,
};

export const f40MiuraStats: StatItem[] = [
  { value: '324', unit: 'KM/H', label: 'Velocidad Máx. F40 (1er > 200 mph)' },
  { value: '290', unit: 'KM/H', label: 'Velocidad Máx. Miura SV (1971)' },
  { value: '478', unit: 'PS', label: 'Potencia F40 V8 Biturbo' },
  { value: '385', unit: 'PS', label: 'Potencia Miura SV V12 Atmosférico' },
  { value: '1,100', unit: 'KG', label: 'Peso en Vacío F40 (Kevlar/Carbono)' },
  { value: '150', unit: 'UNIDADES', label: 'Miura SV Producidos (1971-1973)' },
];

export const f40MiuraTimeline: TimelineItem[] = [
  {
    year: '1963',
    title: 'La Ruptura: Ferruccio vs. Il Commendatore',
    description:
      'Tras quejas por el embrague defectuoso de su Ferrari 250 GT, Enzo Ferrari le responde a Ferruccio Lamborghini que "un fabricante de tractores no entiende de deportivos". Nace Automobili Ferruccio Lamborghini en Sant’Agata Bolognese.',
  },
  {
    year: '1965',
    title: 'Salón de Turín: El Chasis Desnudo TP400',
    description:
      'Los jóvenes ingenieros Gian Paolo Dallara y Paolo Stanzani presentan un chasis tubular perforado con un V12 transversal en posición central trasera. El mundo automotriz queda atónito ante la arquitectura de coche de carreras.',
  },
  {
    year: '1966',
    title: 'Ginebra 1966: Marcello Gandini y Bertone Asombran al Mundo',
    description:
      'Con apenas 27 años, Marcello Gandini de Carrozzeria Bertone esculpe la carrocería del P400 Miura en solo cuatro meses. Nace oficialmente el término "Supercar" en el vocabulario mundial.',
  },
  {
    year: '1971',
    title: 'Miura SV: La Madurez y Perfección Técnica (Spinto Veloce)',
    description:
      'Presentado junto al prototipo del Countach en Ginebra, el Miura SV soluciona la aerodinámica con pasos de rueda ensanchados, suspensión trasera rediseñada, 385 PS y cárter dividido que separa la lubricación del motor y la caja de cambios.',
  },
  {
    year: '1984',
    title: 'El Proyecto 288 GTO Evoluzione',
    description:
      'Ferrari desarrolla cinco unidades de experimentación extrema para el cancelado Grupo B de la FIA. Nicola Materazzi utiliza esta base para concebir un bólido radical sin concesiones.',
  },
  {
    year: '1986',
    title: 'El Último Deseo de Enzo Ferrari',
    description:
      'A sus 88 años, Enzo Ferrari observa con descontento la complejidad electrónica del Porsche 959 y ordena crear "el mejor automóvil del mundo, un coche de carreras puro para la calle" para conmemorar los 40 años de Ferrari.',
  },
  {
    year: '1987',
    title: '21 de Julio de 1987: Presentación del Ferrari F40 en Maranello',
    description:
      'Bajo una tela roja en el Centro Cívico de Maranello, Enzo Ferrari desvela el F40. Con 324 km/h (201.4 mph), se convierte en el primer automóvil de producción de la historia en superar las 200 mph.',
  },
  {
    year: '1988',
    title: 'El Adiós al Commendatore',
    description:
      'Enzo Ferrari fallece el 14 de agosto de 1988 a los 90 años. El F40 queda sellado en la historia como el último vehículo personalmente aprobado y firmado por el mítico fundador.',
  },
  {
    year: '1992',
    title: 'Cierre de Producción y Legado Inmortal',
    description:
      'Finaliza la producción del F40 con 1.311 unidades fabricadas (muy por encima de las 400 planeadas inicialmente). Miura SV y F40 quedan coronados como los dos pilares absolutos del Olimpo analógico italiano.',
  },
];

export const f40MiuraSpecs: { f40: SpecItem[]; miura: SpecItem[] } = {
  f40: [
    { label: 'Modelo', value: 'Ferrari F40 (Tipo F120)' },
    { label: 'Años de Producción', value: '1987 — 1992' },
    { label: 'Unidades Producidas', value: '1.311 ejemplares' },
    { label: 'Motor', value: 'Tipo F120A V8 a 90° DOHC 32V' },
    { label: 'Cilindrada', value: '2.936 cc (2.9 Litros)' },
    { label: 'Sobrealimentación', value: '2 Turbocompresores IHI + Intercoolers Behr' },
    { label: 'Presión de Turbo', value: '1.1 bar (16 psi)' },
    { label: 'Potencia Máxima', value: '478 PS (471 hp / 352 kW) @ 7.000 rpm' },
    { label: 'Par Motor', value: '577 Nm (426 lb-ft) @ 4.000 rpm' },
    { label: 'Transmisión', value: 'Manual de 5 velocidades con rejilla abierta' },
    { label: 'Chasis', value: 'Tubular de acero + paneles de Kevlar, Carbono y Nomex' },
    { label: 'Peso en Vacío', value: '1.100 kg (2.425 lb)' },
    { label: '0-100 km/h', value: '3.8 - 4.1 segundos' },
    { label: '0-200 km/h', value: '11.0 segundos' },
    { label: 'Velocidad Máxima', value: '324 km/h (201.4 mph)' },
    { label: 'Ayudas Electrónicas', value: 'Ninguna (Sin ABS, sin ESP, sin dirección asistida)' },
  ],
  miura: [
    { label: 'Modelo', value: 'Lamborghini Miura P400 SV (Spinto Veloce)' },
    { label: 'Años de Producción', value: '1971 — 1973' },
    { label: 'Unidades Producidas', value: '150 ejemplares' },
    { label: 'Motor', value: 'V12 Bizzarrini a 60° Transversal DOHC 24V' },
    { label: 'Cilindrada', value: '3.929 cc (3.9 Litros)' },
    { label: 'Alimentación', value: '4 Carburadores triples Weber 40 IDL3C' },
    { label: 'Lubricación', value: 'Cárter dividido (aceite de motor y caja separados)' },
    { label: 'Potencia Máxima', value: '385 PS (380 hp / 283 kW) @ 7.850 rpm' },
    { label: 'Par Motor', value: '400 Nm (295 lb-ft) @ 5.750 rpm' },
    { label: 'Transmisión', value: 'Manual de 5 velocidades integrada en el bloque' },
    { label: 'Chasis', value: 'Monocasco central de acero perforado + subchasis tubulares' },
    { label: 'Peso en Vacío', value: '1.245 kg (2.745 lb)' },
    { label: '0-100 km/h', value: '5.3 - 5.5 segundos' },
    { label: '0-400 m (1/4 milla)', value: '13.9 segundos' },
    { label: 'Velocidad Máxima', value: '290 km/h (180 mph)' },
    { label: 'Diseño de Carrocería', value: 'Marcello Gandini para Carrozzeria Bertone' },
  ],
};

export const f40MiuraChapters: Chapter[] = [
  {
    number: '01',
    category: 'GÉNESIS & RIVALIDAD',
    title: 'La Ofensa de Maranello y el Nacimiento del Toro',
    subtitle: 'El choque entre dos titanes industriales italianos',
    paragraphs: [
      'A principios de la década de 1960, Ferruccio Lamborghini era uno de los industriales más prósperos del norte de Italia gracias a su floreciente fábrica de tractores y calderas de calefacción. Apasionado por los automóviles deportivos de alta gama, poseía varios modelos de prestigio, entre ellos un Ferrari 250 GT. Sin embargo, Ferruccio experimentaba constantes problemas con el desgaste prematuro del embrague en sus trayectos cotidianos.',
      'Al desmontar el embrague en sus propios talleres de tractores, Lamborghini descubrió con asombro que la pieza defectuosa era idéntica a la que él mismo utilizaba en sus máquinas agrícolas, pero por la cual Ferrari cobraba una suma diez veces superior. Decidido a brindar una sugerencia constructiva, concertó una reunión en Maranello con Enzo Ferrari.',
      'La respuesta del altivo "Commendatore" pasó a la historia: «Lamborghini, usted sabrá conducir tractores, pero nunca sabrá cómo manejar un Ferrari». Aquella humillación encendió una llama insaciable. En mayo de 1963, Ferruccio fundó Automobili Ferruccio Lamborghini en Sant’Agata Bolognese con una única y obsesiva misión: construir el gran turismo definitivo que eclipsara para siempre al Cavallino Rampante.',
    ],
    highlight: {
      value: '1963',
      label: 'FUNDACIÓN DE SANT’AGATA',
      description: 'El desacuerdo por un embrague dio origen a la rivalidad más legendaria del automovilismo.',
    },
    image: {
      src: miuraStudioImg,
      alt: 'Lamborghini Miura SV 1971 en Estudio',
      caption: 'El Lamborghini Miura SV: la culminación estética y mecánica del primer superdeportivo de la historia.',
      tag: 'MONOGRAFÍA 002 / PIEZA A',
    },
  },
  {
    number: '02',
    category: 'INGENIERÍA CLANDESTINA',
    title: 'El Motín Nocturno: Dallara, Stanzani y Wallace',
    subtitle: 'El chasis TP400 diseñado fuera de las horas de trabajo',
    paragraphs: [
      'Ferruccio Lamborghini deseaba construir grandes turismos confortables y civilizados, alejados del mundo ruidoso y peligroso de las carreras. Sin embargo, contrató a un trío de jóvenes prodigios que soñaban en secreto con las pistas: Gian Paolo Dallara (29 años), Paolo Stanzani (29 años) y el audaz piloto neocelandés de pruebas Bob Wallace.',
      'Trabajando por las noches y durante los fines de semana, este equipo concibió el proyecto TP400 (Transversale Posteriore 400). Inspirados en el Ford GT40 de Le Mans, idearon un chasis monocasco de chapa de acero perforada para reducir peso, con subchasis tubulares delantero y trasero.',
      'La genialidad arquitectónica radicaba en su disposición: un motor V12 de cuatro árboles de levas montado transversalmente justo detrás del conductor, con la caja de cambios y el diferencial fundidos en una sola carcasa de aleación de magnesio y aluminio dentro del mismo cárter del bloque.',
    ],
    highlight: {
      value: 'V12 60°',
      label: 'DISPOSICIÓN TRANSVERSAL CENTRAL',
      description: 'Arquitectura revolucionaria que redujo la longitud total y concentró las masas en el centro.',
    },
  },
  {
    number: '03',
    category: 'DISEÑO & ESCULTURA',
    title: 'Marcello Gandini y la Obra Maestra de Bertone',
    subtitle: 'La silueta sensual que bautizó a los superdeportivos',
    paragraphs: [
      'Cuando el chasis desnudo TP400 se expuso en el Salón de Turín de 1965, Nuccio Bertone se acercó a Ferruccio y le dijo: «Yo soy el zapatero que confeccionará el zapato para este pie». Bertone encomendó la tarea a un joven y casi desconocido diseñador de 27 años: Marcello Gandini, quien acababa de sustituir a Giorgetto Giugiaro.',
      'Gandini concibió una silueta de proporciones nunca antes vistas. Con apenas 1.05 metros de altura sobre el asfalto, el capó delantero y la cubierta trasera se abrían como conchas completas («clamshells»), revelando la mecánica pura. Las tomas de aire en forma de cuerno en las puertas, los faros inclinados con pestañas icónicas y las persianas traseras de plástico negro crearon una escultura rodante.',
      'En el Salón de Ginebra de marzo de 1966, el coche causó un terremoto mediático absoluto. Fue bautizado como "Miura", en honor a la célebre ganadería de toros de lidia de Don Eduardo Miura. La prensa internacional acuñó por primera vez el término «Supercar».',
    ],
    highlight: {
      value: '1.05 M',
      label: 'ALTURA TOTAL AL SUELO',
      description: 'Una de las carrocerías más bajas, fluidas y aerodinámicas jamás producidas en serie.',
    },
  },
  {
    number: '04',
    category: 'EVOLUCIÓN TÉCNICA',
    title: 'Miura SV: La Corrección de las Leyes de la Física',
    subtitle: '1971: El nacimiento del Spinto Veloce definitivo',
    paragraphs: [
      'A pesar de su belleza hipnótica, las primeras versiones del Miura (P400 y P400S) sufrían de un grave defecto aerodinámico: a velocidades superiores a 220 km/h, la forma del morro generaba sustentación positiva (efecto ala de avión), aligerando la dirección delantera a niveles aterradores.',
      'En 1971, bajo la dirección de Paolo Stanzani y las exhaustivas pruebas de Bob Wallace en la Autostrada del Sole, nació el Miura SV (Spinto Veloce). La suspensión trasera fue completamente rediseñada con brazos oscilantes más anchos, aumentando la vía trasera en 130 milímetros y requiriendo los musculosas y voluptuosos pasos de rueda ensanchados.',
      'Mecánicamente, se introdujo el cárter dividido: los primeros Miura compartían el mismo aceite para el motor V12 y la transmisión, lo que provocaba que diminutas partículas metálicas de los engranajes pudieran dañar los cojinetes del cigüeñal. El SV separó ambos circuitos con sistemas independientes, garantizando fiabilidad y longevidad.',
    ],
    highlight: {
      value: '150',
      label: 'UNIDADES PRODUCIDAS',
      description: 'El Miura SV es la versión más codiciada, potente y técnicamente resuelta de la saga.',
    },
    image: {
      src: miuraEngineImg,
      alt: 'Motor V12 Bizzarrini del Lamborghini Miura SV',
      caption: 'El majestuoso V12 de 3.9 litros y 4 carburadores Weber triples triples IDA en posición transversal.',
      tag: 'INGENIERÍA / V12 CLÁSICO',
    },
  },
  {
    number: '05',
    category: 'EL MOTOR BIZZARRINI',
    title: 'La Sinfonía Mecánica de los Cuatro Carburadores Weber',
    subtitle: 'El propulsor de 385 caballos a casi 8.000 revoluciones',
    paragraphs: [
      'El corazón del Miura SV fue obra del legendario Giotto Bizzarrini, ex-jefe de desarrollo de Ferrari y padre del 250 GTO. Bizzarrini concibió un V12 a 60 grados de 3.929 cc en aleación ligera con doble árbol de levas en cabeza por bancada y dos válvulas por cilindro accionadas por cadena.',
      'En el SV, los árboles de levas recibieron un cruce de válvulas más agresivo y se instalaron cuatro carburadores de triple cuerpo Weber 40 IDL3C de tiro invertido. La potencia ascendió a unos brutales 385 PS (380 hp) a 7.850 rpm, con un par motor de 400 Nm a 5.750 rpm.',
      'El sonido de admisión emanando de las 12 trompetas metálicas a escasos centímetros de la nuca de los ocupantes, combinado con el aullido del escape Ansa de cuatro salidas, convirtió al Miura SV en una de las experiencias acústicas más embriagadoras jamás construidas.',
    ],
    highlight: {
      value: '385 PS',
      label: 'POTENCIA MÁXIMA @ 7.850 RPM',
      description: 'Alcanzaba los 290 km/h en 1971 con una pureza de aspiración natural incomparable.',
    },
  },
  {
    number: '06',
    category: 'EL CONTEXTO DE LOS 80',
    title: 'El Desafío Alemán: La Amenaza del Porsche 959',
    subtitle: 'Maranello bajo la presión de la tecnología computerizada',
    paragraphs: [
      'Avanzando quince años en el tiempo, hacia 1985, el panorama de los superdeportivos había cambiado drásticamente. Porsche presentó el 959: un prodigio tecnológico repleto de tracción integral electrónica, suspensión adaptativa por computadora, frenos ABS y turbocompresores secuenciales.',
      'Para muchos en la prensa, el Porsche 959 representaba el futuro y dejaba a los deportivos italianos clásicos obsoletos. En Maranello, un anciano Enzo Ferrari de casi 89 años sintió que la esencia primordial del automovilismo deportivo estaba siendo sofocada por los microchips y la electrónica de confort.',
      'Enzo convocó a sus ingenieros de confianza a una reunión privada en su despacho de Maranello. Su veredicto fue tajante: «Quiero un coche que recuerde a la gente lo que es un verdadero deportivo. Sin concesiones, sin filtros, ligero y salvaje. Un coche de carreras matriculado para la calle».',
    ],
    highlight: {
      value: '1986',
      label: 'EL MANDATO DEL COMMENDATORE',
      description: 'La orden directa de crear el Ferrari más rápido, crudo y visceral de todos los tiempos.',
    },
  },
  {
    number: '07',
    category: 'EL ARQUITECTO DEL F40',
    title: 'Nicola Materazzi: El Maestro de la Turboalimentación',
    subtitle: 'El desarrollo relámpago de 13 meses en secreto',
    paragraphs: [
      'El desarrollo del proyecto —denominado internamente Tipo F120— fue encomendado al ingeniero Nicola Materazzi, una de las mentes más brillantes de Ferrari, responsable del motor del Lancia Stratos de rally, del 288 GTO y de los motores turbo de Fórmula 1 de la Scuderia.',
      'Materazzi negoció con Enzo Ferrari el control absoluto del proyecto: elegiría a su equipo técnico, los proveedores y no rendiría cuentas ante los comités burocráticos de Fiat. El plazo era inhumano: solo trece meses para tener el vehículo listo para el 40 aniversario de la marca en 1987.',
      'Aprovechando la experiencia del prototipo 288 GTO Evoluzione de 650 CV, Materazzi rediseñó por completo el chasis tubular, la suspensión por dobles triángulos superpuestos y la cinemática de los ejes para soportar una velocidad objetivo nunca antes alcanzada: superar las míticas 200 millas por hora (321.8 km/h).',
    ],
    highlight: {
      value: '13 MESES',
      label: 'TIEMPO RÉCORD DE DESARROLLO',
      description: 'Desde la primera hoja en blanco hasta la presentación internacional oficial.',
    },
    image: {
      src: f40StudioImg,
      alt: 'Ferrari F40 Rojo Corsa en Estudio',
      caption: 'El Ferrari F40: alerón trasero icónico, carrocería en fibra de carbono y Kevlar pintada en Rosso Corsa.',
      tag: 'MONOGRAFÍA 002 / PIEZA B',
    },
  },
  {
    number: '08',
    category: 'EL MOTOR TIPO F120A',
    title: 'Furia Biturbo: 2.9 Litros y la Patada de los Turbos IHI',
    subtitle: 'La mecánica derivada de la era turbo de la Fórmula 1',
    paragraphs: [
      'El motor del Ferrari F40 (código Tipo F120A) era un V8 a 90 grados con bloque y culatas de aleación de aluminio y silicio, con una cilindrada de 2.936 cc. Contaba con 4 válvulas por cilindro accionadas por cuatro árboles de levas, pistones forjados Mahle con recubrimiento de grafito y bielas de acero especial.',
      'La sobrealimentación corría a cargo de dos turbocompresores japoneses IHI refrigerados por agua, soplando a una presión máxima de 1.1 bar (16 psi). Para enfriar el aire de admisión comprimido, se instalaron dos masivos intercoolers aire-aire de la firma alemana Behr en la parte superior del vano motor.',
      'El resultado oficial fue de 478 PS (471 hp) a 7.000 rpm y un demoledor par de 577 Nm a 4.000 rpm. Sin embargo, en bancos de potencia modernos se ha comprobado que muchas unidades entregaban más de 500 CV reales. La entrega de potencia era brutal: por debajo de 3.500 rpm el coche era dócil, pero al entrar el soplado de ambos turbos se producía una explosión de aceleración violenta que exigía manos de piloto profesional.',
    ],
    highlight: {
      value: '478 PS',
      label: 'POTENCIA HOMOLOGADA OFICIAL',
      description: 'Más de 160 caballos por litro en 1987, una cifra estratosférica para su época.',
    },
    image: {
      src: f40EngineImg,
      alt: 'Motor V8 Biturbo del Ferrari F40',
      caption: 'El vano motor del F40 con sus dobles intercoolers Behr, cubierta de Lexan ranurada y tubos de escape triples.',
      tag: 'MECÁNICA / V8 BITURBO',
    },
  },
  {
    number: '09',
    category: 'AERODINÁMICA & COMPOSITES',
    title: 'Fioravanti y la Escultura Funcional de Pininfarina',
    subtitle: 'Kevlar, Carbono, Nomex y el alerón trasero que marcó una era',
    paragraphs: [
      'El diseño exterior del F40 fue obra de Leonardo Fioravanti y Pietro Camardella en Pininfarina. A diferencia de las líneas sensuales y fluidas del Miura, el F40 era pura agresión aerodinámica nacida en el túnel de viento.',
      'Fue el primer automóvil de producción del mundo en utilizar una carrocería compuesta íntegramente por paneles de fibra de carbono, Kevlar y estructura de nido de abeja de Nomex unidas mediante resina epoxi. La carrocería completa constaba de solo 11 piezas y pesaba apenas 46 kilogramos.',
      'El gigantesco alerón trasero fijo no era un adorno cosmético: generaba carga aerodinámica real para estabilizar el tren trasero a más de 300 km/h. Las icónicas tomas de aire NACA en el capó y los laterales canalizaban aire fresco a los intercoolers y frenos con una resistencia aerodinámica mínima ($C_x$ de 0.34).',
    ],
    highlight: {
      value: '0.34 Cx',
      label: 'COEFICIENTE AERODINÁMICO CON ALERÓN',
      description: 'Equilibrio perfecto entre penetración aerodinámica y carga para superar los 320 km/h.',
    },
  },
  {
    number: '10',
    category: 'ESPARTANISMO EXTREMO',
    title: 'La Dieta de los 1.100 Kilos: Sin Alfombras, Sin Dirección Asistida',
    subtitle: 'El habitáculo donde se ve el tejido verde de Kevlar y el pegamento',
    paragraphs: [
      'Al abrir la puerta del Ferrari F40 —accionando un sencillo cordón de tela verde en lugar de una manija metálica—, quedaba claro que se entraba en una máquina de carreras sin filtros de cortesía.',
      'No había alfombrillas, ni molduras de cuero, ni aislamiento acústico, ni guantera, ni equipo de radio. La resina verde epoxi que unía los paneles de carbono y Kevlar estaba a la vista en el túnel central y los pisos. Los asientos tipo baquet eran de fibra de carbono tapizados en tela roja ignífuga.',
      'Las ventanillas de las primeras unidades eran de plástico Lexan con corredera manual. No había servofreno, ni dirección asistida, ni control de tracción, ni frenos ABS. El peso en báscula se detuvo en apenas 1.100 kg en vacío, otorgándole una relación peso/potencia de 2.3 kg por caballo.',
    ],
    highlight: {
      value: '1.100 KG',
      label: 'PESO TOTAL EN VACÍO',
      description: 'Una ligereza inalcanzable para cualquier superdeportivo contemporáneo con electrónica.',
    },
  },
  {
    number: '11',
    category: 'EL DÍA DE LA BARRERA',
    title: 'La Conquista de las 200 Millas por Hora',
    subtitle: 'Nardò 1987: 324 km/h que cambiaron el libro de los récords',
    paragraphs: [
      'El 21 de julio de 1987, en la pista de pruebas de Nardò en el sur de Italia y bajo la atenta mirada de los cronometradores oficiales, el Ferrari F40 fue lanzado a fondo en el anillo circular peraltado.',
      'El velocímetro digital de telemetría marcó 324 km/h (201.4 mph). Con este registro histórico, el Ferrari F40 pulverizó el récord de su rival el Porsche 959 (317 km/h) y se convirtió en el primer automóvil de serie legal para circular por carretera en superar la barrera de las 200 mph.',
      'Ese mismo día, el piloto de pruebas de Ferrari Darío Benuzzi comentó: «A 320 km/h el F40 es tan estable como un tren sobre raíles, pero requiere el 100% de la concentración humana. No perdona los errores de pilotaje».',
    ],
    highlight: {
      value: '324 KM/H',
      label: 'RÉCORD MUNDIAL DE VELOCIDAD (1987)',
      description: 'El primer automóvil comercial homologado en romper la barrera de las 200 millas por hora.',
    },
    image: {
      src: cadSchematicImg,
      alt: 'Plano Técnico CAD Ferrari F40 y Lamborghini Miura SV',
      caption: 'Esquema técnico comparativo de chasis, cotas y flujos aerodinámicos entre el Miura SV (1971) y el F40 (1987).',
      tag: 'PLANO TÉCNICO COMPARATIVO',
    },
  },
  {
    number: '12',
    category: 'DOS FILOSOFÍAS EN PUGNA',
    title: 'El V12 Atmosférico de Gandini vs. El V8 Biturbo de Pininfarina',
    subtitle: 'La dualidad eterna del diseño y la ingeniería italiana',
    paragraphs: [
      'Comparar el Lamborghini Miura SV y el Ferrari F40 es analizar las dos cumbres más altas pero opuestas del automovilismo italiano clásico.',
      'El Miura SV representa el romanticismo puro: un motor V12 de aspiración natural alimentado por doce gargantas de carburador, una carrocería voluptuosa y sensual diseñada a mano con martillo sobre madera, y un habitáculo revestido en suave piel Connolly con relojes redondos cromados.',
      'El Ferrari F40 representa el pragmatismo feroz: inducción forzada mediante turbocompresores, carrocería en composites ligeros diseñada en túnel de viento con ángulos afilados, y un habitáculo austero donde cada gramo de material innecesario fue erradicado sin piedad.',
    ],
    highlight: {
      value: 'V12 vs V8T',
      label: 'ASPIRACIÓN NATURAL VS BITURBO',
      description: 'La transición definitiva entre la era clásica artesanal y la era moderna de los composites.',
    },
  },
  {
    number: '13',
    category: 'EL ESCÁNDALO DE LA ESPECULACIÓN',
    title: 'La Fiebre del Oro: Subastas y Locura Financiera',
    subtitle: 'El precio original de 400.000 $ que se multiplicó por siete',
    paragraphs: [
      'Originalmente, Ferrari planeaba fabricar una serie estrictamente limitada de 400 unidades del F40 con un precio base de aproximadamente 400.000 dólares. Sin embargo, tras la muerte de Enzo Ferrari en agosto de 1988, se desató una histeria especulativa sin precedentes en el mercado automotriz.',
      'Coleccionistas, fondos de inversión y celebridades ofrecieron hasta 1.6 millones de dólares por plazas de entrega asignadas. Personajes como Nigel Mansell, Alain Prost, Diego Armando Maradona, Nick Mason (baterista de Pink Floyd) y el Sultán de Brunei adquirieron ejemplares.',
      'Para satisfacer la abrumadora demanda de clientes VIP de larga trayectoria, Ferrari extendió la producción hasta alcanzar un total final de 1.311 unidades al cierre de la línea en 1992.',
    ],
    highlight: {
      value: '1.311',
      label: 'EJEMPLARES FABRICADOS',
      description: 'Más del triple de la producción originalmente planificada debido al fervor mundial.',
    },
  },
  {
    number: '14',
    category: 'EN LA PISTA',
    title: 'El Bautismo de Fuego: F40 LM y Miura Jota',
    subtitle: 'Cuando las bestias de calle regresaron al circuito',
    paragraphs: [
      'Aunque Ferruccio Lamborghini prohibió tajantemente las carreras, el legendario piloto de pruebas Bob Wallace construyó en 1970 un prototipo de carreras único en el más absoluto secreto: el Miura Jota (Apéndice J de la FIA), con carrocería en aleación de aluminio Avional, ventanas de plexiglás y 440 CV.',
      'Por su parte, el Ferrari F40 demostró su pedigrí en competición gracias a Michelotto, quien desarrolló el F40 LM (Le Mans) y F40 Competizione. Con turbos IHI más grandes y 720 caballos de potencia, compitió en la serie IMSA GTO estadounidense y en las 24 Horas de Le Mans, humillando a prototipos construidos expresamente para carreras.',
      'Ambos modelos demostraron que sus chasis de calle albergaban el alma inquebrantable de bólidos de resistencia pura.',
    ],
    highlight: {
      value: '720 PS',
      label: 'POTENCIA DEL F40 LM MICHELOTTO',
      description: 'El F40 llevado al límite extremo para las 24 Horas de Le Mans y la serie IMSA.',
    },
  },
  {
    number: '15',
    category: 'SENSACIONES AL VOLANTE',
    title: 'El Arte Perdido de la Conducción Analógica',
    subtitle: 'Pedales de aluminio sin servoasistencia y embragues de piedra',
    paragraphs: [
      'Conducir hoy un Miura SV o un Ferrari F40 es sumergirse en una era donde no existían redes de seguridad electrónica ni filtros entre el asfalto y el cuerpo del piloto.',
      'En el Miura SV, el pedal de embrague requiere una fuerza atlética, la palanca de cambios con pomo de baquelita exige precisión milimétrica al deslizarse por la rejilla abierta, y el olor a gasolina vaporizada por los Weber impregna el aire tras cada aceleración.',
      'En el F40, la dirección carece por completo de asistencia hidráulica: pesada en maniobras de estacionamiento, pero una vez en movimiento transmite cada grano de grava del asfalto a las palmas de las manos. Al superar las 4.000 rpm, el silbido ensordecedor de las válvulas de descarga wastegate y el empuje de los dos turbos comprimen el cuerpo contra el baquet de carbono.',
    ],
    highlight: {
      value: '0 AYUDAS',
      label: 'CONDUCCIÓN PURA SIN FILTROS',
      description: 'Conexión mecánica directa y transparente entre el conductor, el motor y la carretera.',
    },
  },
  {
    number: '16',
    category: 'MANTENIMIENTO & RESTAURACIÓN',
    title: 'La Conservación de los Dioses de Metal',
    subtitle: 'Depósitos de combustible de goma aeronáutica y carburadores sincronizados',
    paragraphs: [
      'Mantener estas dos leyendas en óptimo estado de funcionamiento es un arte reservado a los maestros mecánicos más experimentados del planeta.',
      'El Ferrari F40 utiliza dos depósitos de combustible flexibles de caucho aeronáutico tipo bolsa (FT3) ubicados en los pontones laterales, los cuales deben ser reemplazados obligatoriamente cada diez años por normativa de seguridad y degradación de materiales.',
      'En el Miura SV, la sincronización de las cuatro baterías de carburadores Weber de triple cuerpo requiere un oído entrenado con vacuómetro de mercurio para asegurar que las doce mariposas de admisión abran en perfecto unísono sin descompensar las bancadas de cilindros.',
    ],
    highlight: {
      value: '10 AÑOS',
      label: 'VIDA ÚTIL DEPÓSITOS FT3 DEL F40',
      description: 'Una de las tareas de mantenimiento más exigentes y costosas del superdeportivo de Maranello.',
    },
  },
  {
    number: '17',
    category: 'DISEÑADORES LEGENDARIOS',
    title: 'Gandini y Pininfarina: Las Dos Mentes del Siglo XX',
    subtitle: 'La influencia infinita en el diseño industrial contemporáneo',
    paragraphs: [
      'Marcello Gandini y el equipo de Pininfarina (liderado por Fioravanti) marcaron el rumbo estético del automovilismo durante más de cuatro décadas.',
      'Gandini demostró con el Miura que un automóvil deportivo podía ser una escultura de alta costura, combinando sensualidad orgánica con proporciones atléticas. Su trabajo en Bertone redefinió el concepto del automóvil como obra de arte contemporánea.',
      'Pininfarina demostró con el F40 que la forma puede derivar directamente de la función aerodinámica más despiadada sin perder la belleza italiana. El alerón del F40 se convirtió en el icono pop más reproducido en posters de habitaciones de los años 80 y 90.',
    ],
    highlight: {
      value: 'POSTER CARS',
      label: 'SÍMBOLOS CULTURALES GLOBALES',
      description: 'Los dos automóviles más representados en la cultura popular, cine y afiches juveniles.',
    },
  },
  {
    number: '18',
    category: 'MERCADO DE COLECCIÓN',
    title: 'El Olimpo de las Subastas Millonarias',
    subtitle: 'Valores que superan los cuatro millones de euros en Pebble Beach',
    paragraphs: [
      'Tanto el Lamborghini Miura SV como el Ferrari F40 se han consolidado como dos de las piezas de inversión automotriz más codiciadas y revalorizadas de la historia.',
      'Un Miura SV original con certificación de autenticidad del Polo Storico de Lamborghini alcanza con facilidad cifras de entre 3.5 y 5.0 millones de euros en las prestigiosas subastas de RM Sotheby’s y Gooding & Company en Pebble Beach y Villa d’Este.',
      'El Ferrari F40 con certificación Ferrari Classiche, historial documentado y su característica pintura Rosso Corsa tan fina que deja entrever la trama de Kevlar bajo la luz solar, cotiza de forma consistente entre los 2.8 y 4.2 millones de euros.',
    ],
    highlight: {
      value: '€4M+',
      label: 'VALOR PROMEDIO EN SUBASTA',
      description: 'Activos de colección de primera categoría con revalorización histórica sostenida.',
    },
  },
  {
    number: '19',
    category: 'EL FIN DE UNA ERA',
    title: 'El Último Bastión de los Superdeportivos Analógicos',
    subtitle: 'Por qué nunca volveremos a ver automóviles como estos',
    paragraphs: [
      'Las normativas modernas de emisiones, seguridad contra impactos peatonales y la obligatoriedad de sistemas de asistencia electrónica han hecho que vehículos como el Miura SV y el Ferrari F40 sean irrepetibles en el siglo XXI.',
      'Hoy en día, superdeportivos modernos con más de 1.000 caballos y propulsión híbrida pueden ser conducidos a diario con la facilidad de un utilitario gracias a computadoras que calculan la tracción cientos de veces por segundo.',
      'El Miura SV y el F40 carecían de intermediarios digitales. La potencia que salía de los neumáticos Pirelli dependía exclusivamente del tacto del pie derecho, la sensibilidad en la yema de los dedos y el respeto a la física.',
    ],
    highlight: {
      value: '100% MECÁNICO',
      label: 'SIN INTERMEDIARIOS DIGITALES',
      description: 'La culminación de un siglo de evolución automotriz analógica.',
    },
  },
  {
    number: '20',
    category: 'VEREDICTO & LEGADO',
    title: 'Dos Monarcas para una Sola Corona',
    subtitle: 'El Génesis y el Apocalipsis de la era de oro italiana',
    paragraphs: [
      'El Lamborghini Miura SV y el Ferrari F40 son dos caras de la misma moneda dorada: el Miura fue el Génesis, el vehículo que inventó el concepto de superdeportivo y desafió al orden establecido.',
      'El Ferrari F40 fue el Apocalipsis, el último bramido de Enzo Ferrari antes de partir, la demostración definitiva de que la pasión, la ligereza y la potencia bruta sin filtros son capaces de derrotar a la tecnología más compleja.',
      'Juntos, el Toro de Sant’Agata y el Cavallino de Maranello custodian las puertas del paraíso del motor. Dos monumentos eternos a la gloria de la ingeniería italiana que jamás serán olvidados.',
    ],
    highlight: {
      value: 'INMORTALES',
      label: 'EL LEGADO ITALIANO',
      description: 'Los dos pilares fundacionales que definen la pasión automotriz mundial.',
    },
  },
];
