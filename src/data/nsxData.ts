import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import nsxHeroImg from '../assets/images/honda_nsx_hero_red_1787353828162.jpg';
import nsxSennaImg from '../assets/images/honda_nsx_senna_suzuka_1787353841095.jpg';
import nsxEngineImg from '../assets/images/nsx_c30a_vtec_real_engine_1787414338574.jpg';
import nsxCadImg from '../assets/images/honda_nsx_cad_blueprint_1787353864879.jpg';

export const nsxImages = {
  hero: nsxHeroImg,
  senna: nsxSennaImg,
  engine: nsxEngineImg,
  cad: nsxCadImg,
};

export const nsxStats: StatItem[] = [
  { value: '274', unit: 'HP @ 7.300 RPM', label: 'Potencia Oficial C30A VTEC (280 PS Pacto de Caballeros JDM)' },
  { value: '270', unit: 'KM/H', label: 'Velocidad Máxima Auténtica Atmosférica' },
  { value: '5.2', unit: 'SEG', label: 'Aceleración 0-100 km/h (Transmisión Manual de 5 Marchas)' },
  { value: '100%', unit: 'ALUMINIO', label: 'Primer Chasis Monocasco Completo de Aluminio en Producción' },
  { value: '8.000', unit: 'RPM', label: 'Límite de Giro VTEC con Bielas de Titanio de Fábrica' },
  { value: '+50%', unit: 'RIGIDEZ', label: 'Aumento de Rigidez Torsional Exigido por Ayrton Senna en Suzuka' },
];

export const nsxTimeline: TimelineItem[] = [
  {
    year: '1984',
    title: 'Proyecto HP-X (Honda Pininfarina eXperimental)',
    description:
      'Honda encarga al carrocero italiano Pininfarina el prototipo HP-X con motor central C20A 2.0L V6. El objetivo de Tadashi Kume: crear un superdeportivo utilizable a diario capaz de batir al Ferrari 328.',
  },
  {
    year: '1986',
    title: 'Nace el Código de Desarrollo NS-X',
    description:
      'Inicia oficialmente el desarrollo del "New Sportscar eXperimental" bajo la dirección técnica del ingeniero Shigeru Uehara. Se aprueba la decisión revolucionaria de construir una carrocería 100% de aluminio.',
  },
  {
    year: 'Febrero 1989',
    title: 'Ayrton Senna Prueba el Prototipo en Suzuka',
    description:
      'Durante unos tests de Fórmula 1 con McLaren-Honda, Ayrton Senna conduce el prototipo NSX en Suzuka. Su veredicto fue lapidario: "El coche se siente un poco frágil". Honda detiene la producción para reforzar el chasis un 50%.',
  },
  {
    year: 'Mayo 1989',
    title: 'Pruebas en Nürburgring Nordschleife y VTEC',
    description:
      'Honda establece un centro permanente en Nürburgring. Se integra la nueva tecnología de distribución variable VTEC y bielas de titanio en el motor V6 C30A de 3.0 litros.',
  },
  {
    year: 'Septiembre 1990',
    title: 'Lanzamiento Comercial del Honda NSX (NA1)',
    description:
      'Sale al mercado en Japón y EEUU (bajo marca Acura). Destroza el paradigma de los superdeportivos al ofrecer prestaciones de Ferrari con la fiabilidad, ergonomía y visibilidad de un Honda Civic.',
  },
  {
    year: '1992',
    title: 'Nace el Inmortal NSX-R (NA1 Type R)',
    description:
      'Versión purista para circuito aligerada en 120 kg, con componentes mecánicos equilibrados a mano, asientos Recaro de carbono-kevlar y puesta a punto radical de suspensión.',
  },
  {
    year: '2005',
    title: 'Cierre de la Leyenda NA1/NA2',
    description:
      'Tras 18.685 unidades fabricadas y haber obligado a Ferrari a redefinir sus estándares con el F355, el NSX de primera generación cesa su producción habiendo cambiado la historia del automóvil.',
  },
];

export const nsxSpecs: SpecItem[] = [
  { label: 'Configuración Motor', value: 'C30A · V6 a 90° DOHC 24V con Sistema VTEC Atmosférico' },
  { label: 'Cilindrada Exacta', value: '2.977 cc (Bórax de 90 mm × Carrera de 78 mm)' },
  { label: 'Materiales Especiales', value: 'Bielas de Titanio de Serie + Bloque y Culatas de Aluminio' },
  { label: 'Potencia Máxima', value: '274 HP (201 kW) @ 7.300 RPM (280 PS Oficiales en Japón)' },
  { label: 'Par Motor Máximo', value: '284 Nm (210 lb·ft) @ 5.400 RPM (VTEC Variable Induction System)' },
  { label: 'Corte de Inyección', value: '8.000 RPM (8.300 RPM en VTEC límite mecánico)' },
  { label: 'Estructura / Chasis', value: 'Monocasco 100% de Aluminio con extruidos de aleación Serie 6000' },
  { label: 'Suspensión', value: 'Independiente de Doble Horquilla Paralela de Aluminio Forjado (Del. / Tras.)' },
  { label: 'Caja de Cambios', value: 'Manual de 5 Velocidades con Diferencial de Deslizamiento Limitado (LSD)' },
  { label: 'Frenos', value: 'Discos Ventilados en las 4 ruedas con ABS de 4 Canales Independientes' },
  { label: 'Peso en Vacío', value: '1.365 kg (NSX Estándar) / 1.230 kg (NSX-R Type R)' },
  { label: 'Diseño Aerodinámico', value: 'Cabina Tipo Burbuja Inspirada en Caza F-16 Falcon (Cx: 0.32)' },
];

export const nsxChapters: Chapter[] = [
  {
    number: '01',
    category: 'GÉNESIS Y DESAFÍO',
    title: 'Proyecto HP-X: La Rebelión de Tochigi contra Maranello',
    paragraphs: [
      'A mediados de la década de 1980, Honda dominaba con mano de hierro la Fórmula 1 suministrando motores turbo V6 a Williams y McLaren. Sin embargo, en el mundo de los coches de calle, la firma japonesa era percibida únicamente como un fabricante respetable de berlinas fiables y utilitarios económicos como el Civic y el Accord.',
      'El presidente de Honda, Tadashi Kume, consideró que era hora de infligir un golpe definitivo al statu quo europeo. En 1984 comisionó al prestigioso carrocero Pininfarina el diseño del prototipo HP-X (Honda Pininfarina eXperimental). La consigna dada al equipo de ingenieros liderado por Shigeru Uehara era tan audaz como imperdonable: construir un superdeportivo de motor central capaz de superar la velocidad y dinamismo del Ferrari 328 (y posterior 348), pero eliminando por completo su fragilidad mecánica, su calor insufrible y su ergonomía penitencial.',
    ],
  },
  {
    number: '02',
    category: 'INGENIERÍA AEROESPACIAL',
    title: 'Inspiración Caza F-16: La Visibilidad de 360 Grados',
    paragraphs: [
      'Uno de los mayores defectos históricamente aceptados en los superdeportivos italianos de motor central era la nula visibilidad trasera y lateral. Para aparcar un Lamborghini Countach o un Ferrari Testarossa, el conductor debía sentarse sobre el umbral de la puerta con la puerta abierta. Honda se negó rotundamente a aceptar esta servidumbre.',
      'Shigeru Uehara buscó inspiración fuera de la industria automotriz y visitó las bases aéreas de las Fuerzas Armadas estadounidenses para estudiar el pabellón transparente de cabina de los cazas de combate F-16 Fighting Falcon. El equipo trasladó esa filosofía al diseño del NSX: montantes de techo ultradelgados en color negro enmascarado, una superficie acristalada envolvente de 360 grados y una posición de conducción adelantada que ofrecía un campo de visión periférico inédito en la categoría.',
    ],
  },
  {
    number: '03',
    category: 'REVOLUCIÓN DE MATERIALES',
    title: 'El Primer Monocasco Completo de Aluminio de la Historia',
    paragraphs: [
      'Para compensar el peso adicional de los sistemas de aire acondicionado de alto rendimiento, servofreno, dirección asistida variable y confort interior, Honda tomó la decisión más costosa e innovadora de la década: construir el primer chasis monocasco de producción masiva fabricado íntegramente en aluminio.',
      'El aluminio redujo el peso de la estructura desnuda en 140 kg y la carrocería completa en 200 kg comparado con el acero convencional. Para lograrlo, Honda tuvo que inventar nuevos procesos metalúrgicos, desarrollando aleaciones de aluminio extruido Serie 6000 para los travesaños estructurales y construyendo una planta de pintura especial de 5 etapas para evitar la corrosión galvánica. La suspensión de doble horquilla forjada en las cuatro ruedas también era enteramente de aluminio.',
    ],
    image: {
      src: nsxImages.cad,
      alt: 'Plano técnico CAD del chasis de aluminio del Honda NSX',
      caption: 'Esquema de ingeniería mostrando el monocasco estructural de aluminio extruido y estampación de aleación ligera.',
      tag: 'ESQUEMA TÉCNICO // ALUMINIUM MONOCOQUE',
    },
  },
  {
    number: '04',
    category: 'SINFONÍA ATMOSFÉRICA',
    title: 'El Corazón C30A: Bielas de Titanio y Distribución VTEC',
    paragraphs: [
      'El motor original del prototipo era un SOHC V6 de 2.0 litros derivado del Honda Legend. No obstante, Uehara comprendió rápidamente que necesitaban más garra. El equipo concibió el bloque C30A: un V6 atmosférico de 3.0 litros (2.977 cc) a 90 grados, DOHC de 24 válvulas con inyección electrónica PGM-FI y cárter de aluminio.',
      'El C30A introdujo dos avances tecnológicos legendarios. En primer lugar, el sistema VTEC (Variable Valve Timing and Lift Electronic Control), que alternaba mecánicamente entre dos perfiles de leva a 5.800 RPM: un perfil suave para par en bajas revoluciones y un perfil agresivo de carreras que abría las válvulas más tiempo y a mayor profundidad. En segundo lugar, para soportar un régimen constante de 8.000 RPM, Honda instaló por primera vez en un coche de producción en serie bielas de titanio forjado, reduciendo las masas reciprocantes y garantizando una respuesta al acelerador instantánea.',
    ],
    image: {
      src: nsxImages.engine,
      alt: 'Motor V6 C30A VTEC con tapas rojas de balancines en el vano central',
      caption: 'Bloque C30A V6 3.0L DOHC VTEC con bielas de titanio y colector de admisión de geometría variable (VIS).',
      tag: 'INGENIERÍA MECÁNICA // C30A VTEC',
    },
  },
  {
    number: '05',
    category: 'EL FACTOR SENNA',
    title: 'Suzuka, Febrero de 1989: El Diagnóstico del Maestro',
    paragraphs: [
      'En febrero de 1989, Honda se encontraba realizando pruebas secretas de validación con el prototipo NS-X en el circuito de Suzuka. Casualmente, el equipo McLaren-Honda de Fórmula 1 estaba ensayando los nuevos motores V10 atmosféricos para el monoplaza MP4/5. La cúpula de Honda invitó al flamante Campeón del Mundo Ayrton Senna a ponerse al volante del prototipo.',
      'Senna se subió al NSX vistiendo su icónico casco amarillo, calcetines blancos y mocasines de cuero. Puso el prototipo al límite absoluto durante varias vueltas sobre el asfalto japonés. Al bajarse, los ingenieros esperaban parabienes. Senna miró fijamente a Shigeru Uehara y pronunció unas palabras que cambiaron el destino del coche: "No estoy seguro de poder darles consejos sobre un coche de calle, pero se siente un poco frágil (soft). Le falta rigidez estructural".',
    ],
    image: {
      src: nsxImages.senna,
      alt: 'Ayrton Senna conduciendo el prototipo del Honda NSX en Suzuka',
      caption: 'Ayrton Senna al volante del prototipo NSX en Suzuka durante las pruebas de puesta a punto del chasis.',
      tag: 'HISTORIA LEYENDA // AYRTON SENNA',
    },
  },
  {
    number: '06',
    category: 'RIGIDEZ Y OBSESIÓN',
    title: 'Nürburgring Nordschleife: 8 Meses para un 50% Más de Rigidez',
    paragraphs: [
      'La crítica de Ayrton Senna cayó como un martillazo en el orgullo de los ingenieros de Honda, pero en lugar de ignorarla, paralizaron la fecha de lanzamiento. Honda estableció un centro permanente de pruebas en el infernal trazado alemán de Nürburgring Nordschleife, siendo el primer fabricante japonés en instalarse allí durante meses completos.',
      'Tras miles de kilómetros de tortura dinámica en los baches y rasantes del "Infierno Verde", el equipo rediseñó los refuerzos extruidos del chasis de aluminio, logrando incrementar la rigidez torsional en un asombroso 50%. Cuando Senna volvió a probar el coche perfeccionado en Suzuka y Tochigi, confirmó sonriendo que la máquina finalmente transmitía la precisión quirúrgica de un monoplaza de carreras.',
    ],
  },
  {
    number: '07',
    category: 'ERGONOMÍA PERFECTA',
    title: 'El Superdeportivo Diario: La Lección que Humilló a Europa',
    paragraphs: [
      'Cuando el Honda NSX (comercializado como Acura NSX en América del Norte) debutó oficialmente en el Salón de Chicago y Tokio en 1989/1990, la prensa del motor quedó estupefacta. Tenía la silueta baja de un avión de caza, aceleraba de 0 a 100 km/h en 5.2 segundos y alcanzaba los 270 km/h.',
      'Pero lo verdaderamente revolucionario era que podías conducirlo a diario bajo la lluvia con aire acondicionado helado, un embrague ultrasuave, un maletero trasero capaz de albergar dos bolsas de golf y la garantía inquebrantable de un motor Honda capaz de hacer 300.000 kilómetros sin perder una gota de aceite. La prensa británica tituló: "Honda ha demostrado que los superdeportivos no necesitan ser una pesadilla para ser fascinantes".',
    ],
  },
  {
    number: '08',
    category: 'PACTO DE CABALLEROS',
    title: 'Los 280 PS Declarados y el Rendimiento Real',
    paragraphs: [
      'A finales de los 80, la Asociación Japonesa de Fabricantes de Automóviles (JAMA) estableció un "Pacto de Caballeros" no escrito limitando la potencia máxima declarada de los turismos a 280 PS (276 HP) para evitar una guerra armamentística en las carreteras niponas.',
      'Honda declaró oficialmente que el C30A rendía 280 PS a 7.300 RPM en el mercado doméstico (274 HP para mercados de exportación). Sin embargo, el equilibrio de masas del V6 VTEC, sumado a un coeficiente aerodinámico de 0.32 y una distribución de pesos del 42% delante y 58% detrás, permitía al NSX humillar en aceleración en pista a rivales teóricamente más potentes.',
    ],
  },
  {
    number: '09',
    category: 'EL EFECTO FERRARI F355',
    title: 'La Sacudida a Maranello: La Reacción Desesperada de Italia',
    paragraphs: [
      'El impacto del NSX en Ferrari fue sísmico. El Ferrari 348, lanzado en 1989, quedó instantáneamente obsoleto: su cambio era duro, su chasis impreciso al límite y su calidad de ajuste decepcionante en comparación con la impecable precisión del cupé japonés.',
      'El propio presidente de Ferrari, Luca Cordero di Montezemolo, admitió años más tarde que el Honda NSX fue el toque de atención definitivo que obligó a Maranello a reinventarse por completo. Ferrari aceleró el desarrollo del F355, elevando radicalmente la fiabilidad y la calidad de construcción para poder competir con la vara de medir fijada por Honda.',
    ],
  },
  {
    number: '10',
    category: 'EL EVANGELIO DE GORDON MURRAY',
    title: 'El Referente Directo del McLaren F1',
    paragraphs: [
      'Quizá el elogio más grande jamás recibido por el NSX provino del genio del diseño Gordon Murray, creador del tricampeón McLaren F1. Durante la fase de diseño del superdeportivo británico de 390 km/h, Murray probó decenas de exóticos de la época, incluyendo el Porsche 959, el Ferrari F40 y el Bugatti EB110.',
      'Murray escribió en sus memorias: "En el momento en que conduje el Honda NSX, todos los demás coches de referencia —Ferrari, Porsche, Lamborghini— desaparecieron de mi mente. El tacto de su dirección, el equilibrio del chasis de aluminio y la suavidad del motor eran insuperables. Utilicé el chasis del NSX como mi único punto de referencia para el comportamiento dinámico del McLaren F1".',
    ],
  },
  {
    number: '11',
    category: 'EL INMORTAL NSX-R (NA1)',
    title: '1992: La Búsqueda de la Perfección Radical para Circuito',
    paragraphs: [
      'En noviembre de 1992, Honda presentó la variante definitiva para puristas: el NSX Type R (NSX-R), comercializado exclusivamente en el mercado japonés en una tirada limitada de 483 unidades.',
      'Honda eliminó el aislamiento acústico, el equipo de sonido, la climatización, el control de tracción y reemplazó las llantas por unas Enkei de aluminio forjado y los asientos por unas baquets Recaro de carbono-kevlar en color rojo. El resultado fue una reducción drástica de 120 kg de peso (dejándolo en solo 1.230 kg), mientras que el motor V6 C30A se ensamblaba mediante un equilibrado azul (blueprinted) de bielas y cigüeñal con tolerancias idénticas a los motores de carreras.',
    ],
  },
  {
    number: '12',
    category: 'ALTA TENSÍON EN LE MANS',
    title: '1994 - 1996: Las Incursiones en las 24 Horas de La Sarthe',
    paragraphs: [
      'Tras conquistar las calles, Honda llevó el NSX a las 24 Horas de Le Mans. En 1994, tres NSX GT2 preparados por Kremer Racing y la propia fábrica hicieron su debut en la clase GT2.',
      'En 1995, el Honda NSX GT2 número 84, pilotado por Keiichi Tsuchiya (el legendario "Drift King"), Akira Iida y Kunimitsu Takahashi, logró una heroica victoria en la categoría GT2 en Le Mans, demostrando que el chasis de aluminio también poseía la durabilidad de resistencia bajo el diluvio francés.',
    ],
  },
  {
    number: '13',
    category: 'EVOLUCIÓN C32B Y TARGA',
    title: '1997 - 2001: El Motor 3.2 Litros y la Caja de 6 Marchas',
    paragraphs: [
      'En 1997, Honda actualizó la mecánica del NSX con el código NA2. El motor aumentó su cilindrada a 3.2 litros (C32B) mediante el uso de camisas de cilindro de aleación de fibra de carbono reforzada (FRM), elevando la potencia a 290 HP y el par motor.',
      'Junto con el nuevo bloque C32B se introdujo una caja de cambios manual de 6 velocidades de relación cerrada y discos de freno más grandes. Además, se popularizó la carrocería NSX-T (Targa) con techo desmontable de aluminio, permitiendo disfrutar de la melodía VTEC a cielo abierto.',
    ],
  },
  {
    number: '14',
    category: 'ADIÓS A LOS POP-UP LIGHTS',
    title: '2002: Rediseño Estético y el NSX-R NA2 en Nürburgring',
    paragraphs: [
      'En 2002, las normativas de seguridad de peatones obligaron a retirar los icónicos faros escamoteables ("pop-up headlights"), reemplazándolos por ópticas fijas de descarga de gas de policarbonato con una mejora aerodinámica que redujo el Cx a 0.30.',
      'Ese mismo año vio el nacimiento del NSX-R NA2 en color Championship White. Con un alerón trasero de fibra de carbono y un ajuste de suspensión implacable, el piloto de pruebas Motoharu Kurosawa detuvo el cronómetro en Nürburgring Nordschleife en 7:56 minutos, un tiempo idéntico al del Ferrari 360 Challenge Stradale que contaba con 110 CV más de potencia.',
    ],
  },
  {
    number: '15',
    category: 'MOCASINES Y CALCETINES BLANCOS',
    title: 'La Leyenda Audiovisual de Senna bailando sobre los Pedales',
    paragraphs: [
      'Pocos vídeos en la historia de la cultura automovilística son tan venerados como la filmación de Ayrton Senna pilotando el Honda NSX Type R en el circuito de Suzuka para el documental "Best Motoring".',
      'Las cámaras colocadas en los pedales inmortalizaron la técnica de puntataco (heel-and-toe) de Senna, quien vestía un traje azul, calcetines blancos de algodón y mocasines. La cadencia hipnótica de sus pies modulando el gas en la entrada de las curvas en S de Suzuka mientras el V6 aullaba a 8.000 RPM se convirtió en un mito sagrado del automovilismo.',
    ],
  },
  {
    number: '16',
    category: 'DISEÑO ATEMPORAL',
    title: 'La Pureza de Proporciones de Ken Okuyama y Shigeru Uehara',
    paragraphs: [
      'El diseño exterior del NSX, supervisado por Masahito Nakano y refinado por Ken Okuyama (quien más tarde diseñaría el Ferrari Enzo), destaca por una sobriedad ejecutiva libre de ostentaciones gratuitas.',
      'Su alerón integrado en la zaga que albergaba la barra transversal de luces traseras en LED, su voladizo trasero extendido diseñado para estabilizar el flujo aerodinámico a 250 km/h y sus tomas de aire laterales para enfriar el V6 convirtieron al NSX en un objeto de arte industrial atemporal que envejece con una dignidad magistral.',
    ],
  },
  {
    number: '17',
    category: 'CULTURA POP Y CINE',
    title: 'Pulp Fiction, Gran Turismo y el Mito Callejero',
    paragraphs: [
      'El Honda/Acura NSX traspasó los circuitos para convertirse en un icono pop global. En la película "Pulp Fiction" (1994) de Quentin Tarantino, el emblemático personaje Winston Wolfe (interpretado por Harvey Keitel) conduce un Acura NSX plateado a toda velocidad proclamando: "Está a treinta minutos de aquí. Estaré allí en diez".',
      'Paralelamente, la saga de videojuegos Gran Turismo de Kazunori Yamauchi convirtió al NSX en el automóvil predilecto de millones de entusiastas en todo el planeta, consolidando su reputación como el deportivo japonés más refinado jamás construido.',
    ],
  },
  {
    number: '18',
    category: 'RECAUDACIÓN Y COLECCIONISMO',
    title: 'El Valor Histórico de las Unidades NA1 de 1990',
    paragraphs: [
      'En la actualidad, las unidades originales del Honda NSX NA1 de 1990 en estado de fábrica han experimentado una revalorización astronómica en el mercado internacional de subastas.',
      'Ejemplares con bajo kilometraje, en el mítico color Formula Red (R-77) o Berlina Black, superan holgadamente los 150.000 euros, mientras que las escasas unidades del NSX-R original cotizan por encima de los 500.000 euros, reconocidos por coleccionistas como piezas de museo de la ingeniería japonesa.',
    ],
  },
  {
    number: '19',
    category: 'FILOSOFÍA HUMAN-CENTERED',
    title: 'El Legado Técnico de Shigeru Uehara',
    paragraphs: [
      'Shigeru Uehara, quien posteriormente dirigiría los proyectos del Honda S2000 y el Integra Type R, resumió la filosofía del NSX en una sola frase: "El automóvil debe estar al servicio del ser humano, no al revés. Un superdeportivo no debe aterrorizar al conductor, sino amplificar sus sentidos".',
      'Esta filosofía de "superdeportivo centrado en el ser humano" sentó las bases de la ingeniería moderna. Hoy en día, desde el Porsche 911 GT3 hasta las creaciones de McLaren Automotive, todos los superdeportivos modernos deben su usabilidad diaria a las lecciones que Honda impartió en 1990.',
    ],
  },
  {
    number: '20',
    category: 'EL MITO INMORTAL',
    title: 'El Legado Imperecedero del Samurai de Aluminio',
    paragraphs: [
      'Treinta y cinco años después de su debut, el Honda NSX de 1990 permanece como el hito más brillante de la época dorada del automóvil japonés. Una máquina concebida con el coraje de desafiar a Ferrari, esculpida en aluminio ligero, perfeccionada por las manos de Ayrton Senna y bendecida con el aullido celestial del VTEC a 8.000 RPM.',
      'El NSX no fue simplemente un gran coche: fue la prueba definitiva de que la pasión, la obsesión técnica y la visión de ingeniería podían cambiar para siempre el curso de la historia del automóvil. El samurai de aluminio vive eternamente en el Olimpo del motor.',
    ],
  },
];
