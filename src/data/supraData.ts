import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import supraHeroImg from '../assets/images/supra_mk4_hero_studio_1787310538438.jpg';
import supraEngineImg from '../assets/images/supra_2jzgte_real_engine_1787414314890.jpg';
import supraCockpitImg from '../assets/images/supra_cockpit_driver_centric_1787310559033.jpg';
import supraCadImg from '../assets/images/supra_cad_blueprint_schematic_1787310571911.jpg';

export const supraImages = {
  hero: supraHeroImg,
  engine: supraEngineImg,
  cockpit: supraCockpitImg,
  cad: supraCadImg,
};

export const supraStats: StatItem[] = [
  { value: '330', unit: 'HP (USA/EU)', label: 'Potencia Exportación (280 CV Japón)' },
  { value: '250', unit: 'KM/H', label: 'Velocidad Autolimitada (285+ km/h Real)' },
  { value: '4.6', unit: 'SEG', label: 'Aceleración 0-100 km/h (Versión Turbo)' },
  { value: '3.0', unit: 'LITROS', label: 'Cilindrada 2JZ-GTE 6 en Línea Twin-Turbo' },
  { value: '45,230', unit: 'UNIDADES', label: 'Producción Total Supra A80 (1993-2002)' },
  { value: '1,000+', unit: 'HP', label: 'Techo de Potencia con Bloque de Serie' },
];

export const supraTimeline: TimelineItem[] = [
  {
    year: '1978',
    title: 'Nace la estirpe: Celica XX / Celica Supra (A40)',
    description:
      'Toyota alarga el morro del Celica para albergar un motor de 6 cilindros en línea M-E de 2.0 y 2.6 litros, creando un Gran Turismo para competir con el Datsun Z.',
  },
  {
    year: '1986',
    title: 'Independencia total: Supra MK3 (A70)',
    description:
      'El Supra se separa definitivamente del Celica con tracción trasera propia y estrena el motor 7M-GTE turbo de 232 CV, suspensión electrónica TEMS y techo Targa.',
  },
  {
    year: '1989',
    title: 'Inicia el Proyecto Secreto 080A (MK4)',
    description:
      'El ingeniero jefe Isao Tsuzuki recibe la orden de construir un superdeportivo que supere en prestaciones, frenada y peso al Porsche 911 (964) y al Corvette ZR-1.',
  },
  {
    year: 'Mayo 1993',
    title: 'Debut Mundial del Toyota Supra A80',
    description:
      'Presentado con un diseño curvilíneo revolucionario, alerón trasero hueco sobreelevado, transmisión Getrag V160 de 6 marchas y el motor 2JZ-GTE con turbos secuenciales.',
  },
  {
    year: '1994',
    title: 'Frenada Histórica en Car and Driver',
    description:
      'La revista estadounidense registra una frenada de 113 km/h a 0 en apenas 45 metros gracias a su ABS de 4 canales con sensor de aceleración lateral, un récord que duró hasta el Porsche Carrera GT de 2004.',
  },
  {
    year: '1997',
    title: 'Castrol TOM’S Supra Campeón del JGTC',
    description:
      'Pedro de la Rosa y Michael Krumm conquistan el campeonato absoluto GT500 frente a Nissan y Honda con el mítico Supra blanco, verde y rojo de Castrol.',
  },
  {
    year: 'Noviembre 1998',
    title: 'La Locura de Smokey Nagata en la A1 británica',
    description:
      'El preparador Kazuhiko Nagata rueda a 317 km/h en la autopista británica A1 de noche con su Supra Top Secret RB26/2JZ antes de ser detenido por la policía británica.',
  },
  {
    year: '2001',
    title: 'El Mito de Hollywood: "The Fast and the Furious"',
    description:
      'El Supra naranja "10-Second Car" pilotado por Paul Walker (Brian O’Conner) catapulta al MK4 al estrellato universal de la cultura automovilística contemporánea.',
  },
  {
    year: 'Agosto 2002',
    title: 'Última Unidad en la Planta de Motomachi',
    description:
      'Debido a las restrictivas normas de emisiones Euro III / LEV, Toyota cesa la producción del A80 tras 9 años de dominio indiscutido en la calle y los circuitos.',
  },
];

export const supraSpecs: SpecItem[] = [
  { label: 'Denominación de Chasis', value: 'E-JZA80 (MK4 / Cuarta Generación)' },
  { label: 'Configuración Motor', value: '2JZ-GTE · 6 cilindros en línea DOHC 24V Biturbo Secuencial' },
  { label: 'Cilindrada Exacta', value: '2.997 cc (86.0 mm diámetro × 86.0 mm carrera - Cuadrado)' },
  { label: 'Bloque y Culata', value: 'Bloque de hierro fundido de alta densidad (CGI) / Culata aluminio Yamaha' },
  { label: 'Turbocompresores', value: 'Twin Hitachi CT12B (Japón cerámicos / Exportación turbinas de acero)' },
  { label: 'Potencia Oficial (Japón)', value: '280 CV (206 kW) @ 5.600 RPM (Pacto de Caballeros)' },
  { label: 'Potencia Oficial (USA/EU)', value: '330 CV (243 kW / 325 bhp) @ 5.600 RPM' },
  { label: 'Par Motor Máximo', value: '441 Nm (325 lb·ft) @ 4.800 RPM (451 Nm con VVT-i en 1997)' },
  { label: 'Transmisión Manual', value: 'Getrag V160 / V161 de 6 velocidades con volante bimasa' },
  { label: 'Diferencial Trasero', value: 'Torsen T-2 de deslizamiento limitado con aletas de refrigeración' },
  { label: 'Aerodinámica Activa', value: 'Active Front Spoiler retráctil eléctrico automático a >80 km/h' },
  { label: 'Frenos Delanteros/Traseros', value: 'Discos ventilados espirales 323mm (4 pistones) / 324mm (2 pistones)' },
  { label: 'Peso en Vacío', value: '1.510 kg (Turbo Coupe) / 1.540 kg (Turbo Targa)' },
  { label: 'Aceleración 0-100 km/h', value: '4.6 segundos' },
  { label: 'Cuarto de Milla (400m)', value: '13.1 segundos @ 175 km/h' },
  { label: 'Agarre Lateral en Skidpad', value: '0.98 G sostenido' },
  { label: 'Reparto de Masas', value: '53% Delante / 47% Detrás' },
  { label: 'Capacidad del Depósito', value: '70 litros' },
];

export const supraChapters: Chapter[] = [
  {
    number: '01',
    category: 'GÉNESIS DEL PROYECTO',
    title: 'El Mandato de Isao Tsuzuki: Superar a Porsche y Ferrari',
    paragraphs: [
      'A finales de los años ochenta, en pleno apogeo de la burbuja económica japonesa ("Bubble Economy"), la junta directiva de Toyota Motor Corporation dio luz verde al proyecto interno 080A. La misión encomendada al veterano ingeniero jefe Isao Tsuzuki era colosal: concebir un deportivo que no fuera una mera evolución del pesado Supra MK3 (A70), sino un rival capaz de destronar al Porsche 911 Turbo (964), al Ferrari 348 y al Chevrolet Corvette ZR-1.',
      'Tsuzuki reunió a un equipo de élite en el centro de diseño de Toyota en Aichi y estableció dos dogmas innegociables: una reducción radical de peso respecto al modelo anterior y una resistencia estructural sobredimensionada hasta el absurdo en cada componente móvil.',
      'El resultado vio la luz en el Salón del Automóvil de Chicago en febrero de 1993: una silueta orgánica, fluida y escultural con un monumental alerón trasero que cambiaría para siempre el rumbo del automovilismo deportivo japonés.',
    ],
    highlight: {
      value: '-100 KG',
      label: 'Reducción de peso respecto al anterior Supra MK3 Turbo',
      description: 'Logrado mediante aleaciones de magnesio, aluminio forjado y moqueta de fibras huecas.',
    },
  },
  {
    number: '02',
    category: 'INGENIERÍA OBSESIVA',
    title: 'La Dieta de Adelgazamiento: Magnesio, Aluminio y Fibras Huecas',
    paragraphs: [
      'Hacer que un Gran Turismo de propulsión trasera con motor de seis cilindros y dos turbocompresores fuera ligero en los años 90 requería una devoción fanática por el detalle. El equipo de Tsuzuki analizó cada gramo del vehículo.',
      'El capó, el panel del techo targa desmontable, los brazos de la suspensión delantera y los soportes del motor fueron forjados en aluminio. El volante de cuatro radios utilizaba un núcleo interior de aleación de magnesio.',
      'Incluso los tornillos de fijación del chasis fueron vaciados en su núcleo para ahorrar peso, las fibras de la moqueta del suelo eran huecas por dentro y el colosal alerón trasero de serie estaba fabricado mediante un proceso especial de soplado termoplástico con estructura interior completamente hueca para restar masa en el voladizo posterior.',
    ],
    image: {
      src: supraHeroImg,
      alt: 'Toyota Supra MK4 Turbo en Renaissance Red estudio',
      caption: 'La escultural y atemporal carrocería del Supra A80 en color Renaissance Red (código 3L2).',
      tag: 'CHASIS A80',
    },
  },
  {
    number: '03',
    category: 'EL MOTOR INDESTRUCTIBLE',
    title: '2JZ-GTE: El Bloque de Hierro que Desafió a la Física',
    paragraphs: [
      'Si hay un motor en la historia de la automoción que ha alcanzado el estatus de deidad mecánica, es el Toyota 2JZ-GTE. Desarrollado en colaboración con los ingenieros de Yamaha, este 6 cilindros en línea de 3.0 litros (2.997 cc) cuenta con una arquitectura de dimensiones cuadradas perfectas: 86.0 mm de diámetro por 86.0 mm de carrera.',
      'La clave de su leyenda reside en su bloque motor: fabricado en fundición de hierro gris nodular de alta densidad con paredes de cilindro ultra-gruesas, sin camisas flotantes y con un cigüeñal de acero forjado nitrurado apoyado sobre 7 bancadas masivas.',
      'Mientras otros fabricantes utilizaban bloques de aluminio propensos a deformaciones bajo presiones extremas, el 2JZ fue diseñado pensando en la homologación para las 24 Horas de Le Mans y el campeonato de turismos. De serie, sin abrir el motor ni cambiar bielas o pistones, el bloque es capaz de soportar más de 800 a 1.000 CV con fiabilidad asombrosa.',
    ],
    image: {
      src: supraEngineImg,
      alt: 'Vano motor 2JZ-GTE twin-turbo en detalle',
      caption: 'El legendario 2JZ-GTE con doble árbol de levas DOHC 24V y turbos secuenciales CT12B.',
      tag: 'MOTOR 2JZ-GTE',
    },
  },
  {
    number: '04',
    category: 'SOBREALIMENTACIÓN SECUENCIAL',
    title: 'Doble Turbo Secuencial: Cero Retardo y Empuje Ininterrumpido',
    paragraphs: [
      'Para evitar el molesto retardo de respuesta (turbo lag) propio de los motores biturbo convencionales de gran cilindrada de la época, Toyota implementó un complejísimo sistema de sobrealimentación secuencial en dos fases gestionado por válvulas neumáticas y actuadores de vacío.',
      'A bajo régimen (desde las 1.800 RPM), todos los gases de escape se dirigen exclusivamente al primer turbocompresor (Turbo 1), proporcionando un empuje inmediato y 400 Nm de par motor casi desde el ralentí.',
      'Al alcanzar las 3.500 RPM, una válvula de derivación de gases ("Exhaust Gas Control Valve") comienza a pre-girar la turbina del segundo turbocompresor (Turbo 2) sin enviar aún presión a la admisión. Finalmente, a 4.000 RPM, la válvula de admisión se abre por completo y ambos turbos soplan al unísono a 0.8 bar de presión constante hasta las 6.800 RPM.',
    ],
    highlight: {
      value: '1.800 RPM',
      label: 'Entrada del primer turbo secuencial',
      description: 'Entregaba par demoledor de forma progresiva sin el temido turbo lag de la época.',
    },
  },
  {
    number: '05',
    category: 'HABITÁCULO DE CAZA DE COMBATE',
    title: 'El Cockpit Envolvente: Inspiración en el Caza F-16',
    paragraphs: [
      'Al abrir la puerta del Supra MK4, el conductor no entra en un interior convencional de automóvil: se sienta dentro de la cabina de un caza de combate militar.',
      'Todo el salpicadero, la consola central, los mandos del climatizador y la esfera de los relojes analógicos están girados y orientados de forma agresiva en un ángulo envolvente de 45 grados hacia el piloto. El pasajero queda intencionadamente relegado a un plano secundario.',
      'En el cuadro de instrumentos principal, la esfera más grande y situada exactamente en el centro no es el velocímetro, sino el tacómetro de revoluciones con aguja blanca hasta las 8.000 RPM, flanqueado por el indicador de presión de turbo y la escala de temperatura de agua.',
    ],
    image: {
      src: supraCockpitImg,
      alt: 'Cockpit interior del Supra orientado al conductor',
      caption: 'Salpicadero envolvente estilo cabina de caza con tacómetro central y palanca Getrag V160.',
      tag: 'COCKPIT DRIVER-CENTRIC',
    },
  },
  {
    number: '06',
    category: 'TRANSMISIÓN GETRAG V160',
    title: 'La Caja de Seis Marchas "Bulletproof" Co-desarrollada con Getrag',
    paragraphs: [
      'Para transmitir la violenta entrega de par motor del 2JZ-GTE al asfalto sin riesgo de rotura, Toyota recurrió al especialista alemán Getrag para diseñar una de las transmisiones manuales más resistentes jamás construidas: la caja Getrag V160 (y su posterior evolución V161).',
      'Construida con engranajes helicoidales de dientes anchos de acero tratado térmicamente, ejes paralelos sobredimensionados y sincronizadores dobles y triples de carbono/bronce, la V160 era prácticamente indestructible.',
      'En el mundo de las carreras de aceleración (Drag Racing) y las preparaciones extremas de más de 1.200 CV, los preparadores conservaban la caja Getrag de serie debido a su capacidad para soportar cambios a fondo ("flat-shifting") a más de 8.500 RPM sin romper un solo diente.',
    ],
  },
  {
    number: '07',
    category: 'AERODINÁMICA ACTIVA',
    title: 'Active Front Spoiler: El Labio Delantero Retráctil Inteligente',
    paragraphs: [
      'Mucho antes de que los hiperdeportivos modernos popularizaran la aerodinámica activa, las versiones turbo del Supra comercializadas en Japón y Europa equipaban el "Active Front Spoiler".',
      'Un labio aerodinámico de plástico negro situado bajo el morro permanecía oculto para protegerlo de badenes y rampas en ciudad. Sin embargo, al superar los 80 km/h en autopista, un motor eléctrico desplegaba el deflector 120 milímetros hacia abajo.',
      'Esto reducía drásticamente el coeficiente de sustentación delantero (CLf) de +0.07 a -0.05, canalizando el aire hacia los frenos y pegando el morro al asfalto a altas velocidades. El conductor podía además desplegar o recoger el alerón a voluntad mediante un botón en la consola central.',
    ],
  },
  {
    number: '08',
    category: 'FRENADA DE RÉCORD',
    title: 'El Récord Mundial de Frenada: 113 a 0 km/h en 45 Metros',
    paragraphs: [
      'En 1997, los periodistas de la revista norteamericana Car and Driver realizaron su prestigiosa prueba anual de frenada de emergencia desde 70 mph (113 km/h) a 0. Para sorpresa de toda la industria europea, el Supra Turbo detuvo sus 1.550 kg en unos inverosímiles 45.4 metros (149 pies).',
      'Este récord de deceleración superó al Porsche 911 Turbo (993), al Ferrari F355 y al Acura NSX, y permaneció como el mejor registro absoluto en la historia de la revista durante más de siete años, hasta que el Porsche Carrera GT de 450.000 dólares con frenos cerámicos lo rebajó en 2004 por apenas 30 centímetros.',
      'El secreto residía en su avanzado sistema de ABS de 4 sensores y 4 canales con sensor de aceleración G lateral integrado, que modulaba la presión hidráulica de las pinzas monobloque delanteras de 4 pistones de forma independiente en cada rueda.',
    ],
    highlight: {
      value: '45.4 M',
      label: 'Frenada de 113 km/h a 0 (Car and Driver 1997)',
      description: 'Récord mundial imbatido durante 7 años hasta la llegada del Porsche Carrera GT.',
    },
  },
  {
    number: '09',
    category: 'EL ALERÓN HOOP',
    title: 'El Alerón de Aro Trasero: Escultura y Apoyo Aerodinámico',
    paragraphs: [
      'El rasgo más distintivo e imitado de la silueta del Supra MK4 es su colosal alerón trasero en forma de arco sobreelevado ("Hoop Spoiler").',
      'A diferencia de los alerones añadidos de posventa, el alerón del A80 fue diseñado en el túnel de viento de Toyota en Higashifuji para generar carga aerodinámica positiva sobre el eje motriz trasero a partir de 120 km/h sin penalizar excesivamente el coeficiente aerodinámico global (Cx de 0.31 en la versión Turbo).',
      'La altura del alerón fue calculada con precisión milimétrica para que la lama horizontal superior quedara exactamente alineada con la línea del techo, evitando entorpecer la visión por el retrovisor central interior.',
    ],
    image: {
      src: supraCadImg,
      alt: 'Plano técnico CAD del Toyota Supra A80 con flujo aerodinámico',
      caption: 'Esquema técnico CAD del Supra A80 con líneas de flujo sobre el alerón trasero y cotas de chasis.',
      tag: 'PLANO TÉCNICO CAD',
    },
  },
  {
    number: '10',
    category: 'CHASIS & SUSPENSIÓN',
    title: 'Doble Triángulo de Aluminio y Diferencial Torsen',
    paragraphs: [
      'Para garantizar una agilidad impropia de su tamaño, el Supra A80 montaba esquemas de suspensión de doble horquilla (Double Wishbone) independiente en las cuatro ruedas, con brazos forjados en aluminio para minimizar la masa no suspendida.',
      'El tren trasero integraba un diferencial de deslizamiento limitado Torsen T-2 helicoidal alojado en una carcasa de fundición con aletas de disipación de calor. A diferencia de los diferenciales de discos viscosos, el Torsen transfería el par motor de forma instantánea a la rueda con mayor adherencia sin ningún tipo de retraso térmico.',
      'En pruebas de adherencia en el skidpad de 60 metros, el Supra Turbo alcanzaba de serie una aceleración lateral sostenida de 0.98 G, una cifra reservada en 1993 a monoplazas de competición y superdeportivos italianos.',
    ],
  },
  {
    number: '11',
    category: 'GAMA & VERSIONES',
    title: 'SZ, RZ, GZ y Techo Aerotop (Targa)',
    paragraphs: [
      'En el mercado japonés, la gama A80 se estructuró en tres niveles principales: la versión atmosférica SZ (con motor 2JZ-GE de 225 CV y cambio de 5 marchas), la versión deportiva extrema RZ (con motor 2JZ-GTE biturbo, frenos grandes, cambio Getrag de 6 marchas y amortiguadores Bilstein amarillos) y la lujosa GZ (con interior en cuero, asientos eléctricos y control de crucero).',
      'Para los mercados de exportación (Estados Unidos y Europa), Toyota ofreció la codiciada carrocería "Aerotop": un techo rígido desmontable de aluminio de apenas 8 kg de peso que se guardaba perfectamente anclado en un soporte específico en el maletero.',
      'A pesar de ser un targa, los ingenieros reforzaron los largueros laterales y el marco del parabrisas con acero de alta resistencia para garantizar que no existiera torsión en curvas pronunciadas.',
    ],
  },
  {
    number: '12',
    category: 'EVOLUCIÓN VVT-I',
    title: 'Actualización de 1997: Distribución Variable VVT-i y Monstruoso Par Motor',
    paragraphs: [
      'En agosto de 1997, coincidiendo con el "Facelift" de mitad de ciclo, Toyota introdujo en el mercado doméstico japonés el motor 2JZ-GTE dotado del sistema de distribución variable continua de válvulas VVT-i en el árbol de admisión.',
      'Aunque la potencia máxima declarada permanecía congelada en los 280 CV oficiales del pacto de caballeros, el par motor máximo creció de forma espectacular hasta los 451 Nm (333 lb·ft) a sólo 3.600 RPM.',
      'La entrega de fuerza a medio régimen se volvió arrolladora, permitiendo recuperaciones de 80 a 120 km/h en 5ª velocidad más rápidas que las de un Ferrari F355 Berlinetta.',
    ],
  },
  {
    number: '13',
    category: 'DOMINIO EN EL JGTC',
    title: 'El Mito del Castrol TOM’S Supra y las Batallas en Super GT',
    paragraphs: [
      'En los circuitos, el Supra MK4 escribió algunas de las páginas más gloriosas del Campeonato Japonés de Gran Turismos (JGTC / Super GT). Preparado por escuderías legendarias como TOM’S, SARD, Cerumo y Team LeMans, el Supra se batió en duelo a muerte contra el Nissan Skyline GT-R y el Honda NSX.',
      'Para optimizar el reparto de pesos, los coches de carreras de la categoría GT500 reemplazaron el pesado 6 cilindros 2JZ por el compacto motor 4 cilindros turbo de 2.0 litros 3S-GTE derivado de los Celica de rallyes del Grupo A, entregando casi 500 CV.',
      'En 1997, el emblemático Castrol TOM’S Supra número 36 pilotado por el español Pedro de la Rosa y el alemán Michael Krumm conquistó el título absoluto de pilotos y constructores, creando una de las decoraciones de competición más icónicas de la historia del automovilismo.',
    ],
  },
  {
    number: '14',
    category: 'LE MANS & COMPENSACIÓN',
    title: 'Las 24 Horas de Le Mans de 1995: El Supra LM de SARD',
    paragraphs: [
      'En 1995 y 1996, Toyota llevó el Supra MK4 al templo de la resistencia mundial: las 24 Horas de Le Mans. Desarrollado por el equipo SARD Racing bajo la denominación Supra LM GT (chasis #01), el coche compitió en la categoría reina de GT1 frente a gigantes como el McLaren F1 GTR y el Ferrari F40 LM.',
      'Con un peso rebajado a 1.248 kg, carrocería ensanchada de fibra de carbono y el motor 3S-GT rindiendo 650 CV, el Supra cruzó la recta de Les Hunaudières a más de 330 km/h.',
      'En la edición de 1995, el equipo completó las 24 horas ininterrumpidas finalizando en 14ª posición absoluta, demostrando la solidez indestructible de la plataforma nipona en el escenario más exigente del planeta.',
    ],
  },
  {
    number: '15',
    category: 'LA LOCURA DE SMOKEY NAGATA',
    title: '317 km/h en la Autopista A1: El Arresto de Top Secret',
    paragraphs: [
      'Ninguna historia del Supra estaría completa sin la infame hazaña del preparador japonés Kazuhiko "Smokey" Nagata, fundador del taller Top Secret en Chiba.',
      'En una lluviosa noche de noviembre de 1998, Nagata transportó su Supra MK4 dorado biturbo (preparado con más de 800 CV) hasta el Reino Unido. Con el objetivo de publicitar su taller ante la prensa británica de Max Power, entró a la autopista pública A1 cerca de Peterborough.',
      'A las cuatro de la madrugada, sobre asfalto húmedo, Nagata pisó a fondo hasta registrar 317 km/h (197 mph) en el velocímetro digital antes de levantar el pie. Fue interceptado por la policía británica, pasó la noche en prisión, se le retiró el permiso de conducir en suelo británico por 10 años y fue expulsado del país al día siguiente, convirtiendo su hazaña en un mito absoluto del tuning clandestino.',
    ],
    highlight: {
      value: '317 KM/H',
      label: 'Velocidad de Smokey Nagata en la autopista pública A1 (1998)',
      description: 'El récord de velocidad no oficial más legendario y polémico en vías públicas.',
    },
  },
  {
    number: '16',
    category: 'CULTURA TUNING & 1.000 CV',
    title: 'La Era de los 1.000 Caballos de Fuerza: HKS, VeilSide y JUN',
    paragraphs: [
      'A finales de los años 90 y principios de los 2000, el Supra MK4 se convirtió en el rey indiscutido de las pistas de aceleración y de la cultura del tuning global.',
      'Preparadores como HKS construyeron el legendario "HKS Drag Supra", el primer coche de tracción trasera con carrocería de serie en bajar de los 7 segundos en el cuarto de milla (6.89 segundos @ 320 km/h).',
      'Gracias a la masiva disponibilidad de turbocompresores individuales de gran tamaño (como los Garrett T04R, Greddy T88 o BorgWarner EFR) y centralitas programables, era común ver Supras de calle con más de 1.000 a 1.500 CV rodando con gasolina de competición y escape libre, emitiendo el inconfundible sonido del corte de inyección anti-lag y la válvula de descarga bov (Blow-Off Valve).',
    ],
  },
  {
    number: '17',
    category: 'EL ICONO DE HOLLYWOOD',
    title: 'El "10-Second Car" de Paul Walker y Fast & Furious',
    paragraphs: [
      'En el año 2001, el estreno de la película "The Fast and the Furious" (A todo gas) transformó al Toyota Supra MK4 de un respetado deportivo de culto en un fenómeno de masas planetario.',
      'El Supra naranja brillante con vinilos de gladiador de Troy Lee Designs y kit de carrocería Bomex pilotado por Paul Walker (en su papel del agente encubierto Brian O’Conner) protagonizó el legendario clímax final cruzando las vías del tren frente al Dodge Charger de 1970 de Dominic Toretto.',
      'Paul Walker, un auténtico fanático del motor en la vida real, era propietario de varios Supras MK4 en su colección privada. La última escena de "Furious 7" (2015), en la que el Supra blanco personal de Walker se desvía en la bifurcación de la carretera hacia el atardecer, selló para siempre el vínculo emocional entre el actor y este automóvil.',
    ],
  },
  {
    number: '18',
    category: 'MERCADO DE COLECCIÓN',
    title: 'La Fiebre en Subastas: Joyas de 200.000 Dólares',
    paragraphs: [
      'Debido a que la inmensa mayoría de los Supra MK4 fueron severamente modificados, repintados o accidentados durante la fiebre del tuning de los 2000, los escasos ejemplares que sobrevivieron en estado 100% original de fábrica y bajo kilometraje se han convertido en auténtico oro para los coleccionistas.',
      'En subastas de casas como Barrett-Jackson y RM Sotheby’s, unidades originales de Supra Turbo manual de 6 velocidades con menos de 15.000 kilómetros han alcanzado cifras récord de entre 150.000 y 230.000 dólares.',
      'Toyota respondió a esta devoción en 2020 a través de su división GAZOO Racing, lanzando el programa "GR Heritage Parts" para volver a fabricar y suministrar piezas de recambio originales de fábrica para el A80, desde faros de cristal hasta embragues y componentes de suspensión.',
    ],
  },
  {
    number: '19',
    category: 'COMPARATIVA HISTÓRICA',
    title: 'Supra MK4 vs. Skyline GT-R vs. RX-7 vs. NSX',
    paragraphs: [
      'Los años 90 representaron la era de oro irrepetible de los "Cuatro Reyes" del automovilismo japonés: el Nissan Skyline GT-R R34 (la computadora con tracción total), el Mazda RX-7 FD3S (la ligereza y equilibrio del motor rotativo), el Honda NSX (el chasis de aluminio de motor central afinado por Ayrton Senna) y el Toyota Supra MK4 (la fuerza bruta indestructible y la estabilidad a alta velocidad).',
      'Mientras el NSX era el bisturí para circuito técnico y el GT-R el arma para lluvia y asfalto roto, el Supra era el misil de línea recta, el coche capaz de tragar millas de autopista a 300 km/h sin inmutarse y de ofrecer un potencial de potenciación que superaba a cualquier rival.',
    ],
  },
  {
    number: '20',
    category: 'EL MITO INMORTAL',
    title: 'Por Qué el 2JZ y el A80 Nunca Morirán',
    paragraphs: [
      'Más de tres décadas después de su debut en 1993, el Toyota Supra MK4 A80 sigue ocupando un lugar privilegiado en la cumbre del panteón automovilístico mundial.',
      'Representa una época en la que la ingeniería japonesa no conocía la palabra compromiso: un bloque de fundición de hierro indestructible, un chasis que frenaba mejor que los superdeportivos europeos, una silueta orgánica que no ha envejecido un solo día y una caja manual que resistía cualquier nivel de abuso.',
      'El Supra MK4 no es solo un coche; es el testimonio eterno de una era dorada en la que los coches se construían para durar un millón de kilómetros y para hacer soñar a cualquiera que se sentara tras su volante orientado hacia el infinito.',
    ],
    highlight: {
      value: 'A80',
      label: 'La Leyenda Inmortal de Toyota y Yamaha',
      description: 'El deportivo japonés con mayor culto, potencial mecánico y legado cinematográfico de la historia.',
    },
  },
];
