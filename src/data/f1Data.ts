import { Chapter, TimelineItem, SpecItem, StatItem } from '../types';
import f1HeroImg from '../assets/images/f1_hero_evolution_1787580428634.jpg';
import f1TurboImg from '../assets/images/f1_turbo_monsters_1787580444351.jpg';
import f1MonacoImg from '../assets/images/f1_monaco_action_1787580459564.jpg';
import f1CadImg from '../assets/images/f1_technical_cad_1787580472901.jpg';

export const f1Images = {
  hero: f1HeroImg,
  turbo: f1TurboImg,
  monaco: f1MonacoImg,
  cad: f1CadImg,
};

export const f1Stats: StatItem[] = [
  { value: '75+', unit: 'AÑOS', label: 'De historia oficial de la F1 (1950-Presente)' },
  { value: '1.100+', unit: 'GRANDES PREMIOS', label: 'Disputados en los 5 continentes' },
  { value: '1.400+', unit: 'CV', label: 'Pico de potencia en clasificación (BMW Turbo 1986)' },
  { value: '372.6', unit: 'KM/H', label: 'Récord de velocidad en carrera (Valtteri Bottas)' },
  { value: '52%+', unit: 'EFICIENCIA', label: 'Eficiencia térmica de las unidades de potencia híbridas V6' },
  { value: '6.0', unit: 'G LATERAL', label: 'Cargas de deceleración y viraje que soportan los pilotos' },
];

export const f1Timeline: TimelineItem[] = [
  {
    year: '13 de Mayo de 1950',
    title: 'El Primer Gran Premio en Silverstone',
    description:
      'Sobre las pistas del aeródromo militar de Silverstone de la Royal Air Force, se disputa el Gran Premio de Gran Bretaña. Giuseppe Farina lidera el triplete del mítico Alfa Romeo 158 "Alfetta" con motor 1.5L sobrealimentado por compresor Roots.',
  },
  {
    year: '1951 — 1957',
    title: 'El Reinado Legendario de Juan Manuel Fangio',
    description:
      'El "Chueco" de Balcarce conquista 5 Campeonatos Mundiales con 4 constructores diferentes (Alfa Romeo, Maserati, Mercedes-Benz y Ferrari). Su remontada épica en Nürburgring 1957 batiendo el récord de vuelta 9 veces consecutivas queda grabada como la mayor exhibición de pilotaje de todos los tiempos.',
  },
  {
    year: '1958 — 1962',
    title: 'La Revolución del Motor Trasero y el Monocasco de Lotus',
    description:
      'John Cooper ubica el motor detrás del piloto logrando triunfos inmediatos. Colin Chapman perfecciona la ingeniería con el Lotus 25 de 1962: el primer chasis monocasco de planchas de aluminio remachadas, desterrando para siempre los pesados chasis tubulares.',
  },
  {
    year: '1967',
    title: 'El Motor Cosworth DFV: El Corazón Universal de la F1',
    description:
      'Keith Duckworth y Mike Costin, con patrocinio de Ford, crean el motor V8 3.0L atmosférico Cosworth DFV (Double Four Valve). Diseñado como elemento estructural portante atornillado al chasis, conquista 155 victorias de Gran Premio y 12 títulos mundiales de pilotos.',
  },
  {
    year: '1977 — 1978',
    title: 'La Era del Efecto Suelo: Lotus 78/79 y el Suelo Venturi',
    description:
      'Colin Chapman y Peter Wright descubren el efecto suelo automotriz. Con pontones laterales con perfil de ala invertida y faldas deslizantes contra el asfalto, los monoplazas generan una succión descomunal que les permite trazar curvas a velocidades nunca antes vistas.',
  },
  {
    year: '1983 — 1988',
    title: 'La Era Turbo Salvaje: 1.400 Caballos de Fuerza en 1.5 Litros',
    description:
      'Renault introduce el turbo en 1977, pero la década de los 80 desata la locura. Motores de 4 cilindros y 1.5 litros como el BMW M12/13 alcanzan más de 5.5 bares de presión de soplado y 1.400 CV en clasificación, rodando con gasolina especial inflamable y cajas de cambio manuales de titanio.',
  },
  {
    year: '1988 — 1990',
    title: 'El Duelo Inmortal: Ayrton Senna vs. Alain Prost en McLaren-Honda',
    description:
      'El equipo McLaren-Honda MP4/4 arrasa ganando 15 de 16 carreras en 1988. La rivalidad entre el misticismo y velocidad pura de Ayrton Senna y la fría inteligencia de "El Profesor" Alain Prost culmina en los históricos choques en la chicana de Suzuka en 1989 y 1990.',
  },
  {
    year: '1994',
    title: 'El Fin de Semana Negro de Imola y la Revolución de la Seguridad',
    description:
      'Las trágicas muertes de Roland Ratzenberger y Ayrton Senna en el GP de San Marino en Imola sacuden al mundo. Liderada por el profesor Sid Watkins y Max Mosley, la FIA implementa reformas radicales: monocascos reforzados con Zylon, el dispositivo HANS, crash-tests obligatorios y circuitos rediseñados.',
  },
  {
    year: '2000 — 2004',
    title: 'La Dinastía Roja de Michael Schumacher y el Aullido de los V10',
    description:
      'Ferrari, bajo la batuta de Jean Todt, Ross Brawn, Rory Byrne y Michael Schumacher, conquista 5 títulos mundiales consecutivos. Los motores V10 atmosféricos de 3.0 litros giran a 19.000 y 20.000 RPM, creando la banda sonora más estremecedora de la historia del automovilismo.',
  },
  {
    year: '2014 — 2021',
    title: 'La Era Híbrida Turbo V6 y el Dominio de Lewis Hamilton',
    description:
      'La F1 adopta motores 1.6L V6 Turbo con dos motores-generadores eléctricos (MGU-K y MGU-H). Mercedes-AMG diseña una arquitectura con turbo partido revolucionaria, conquistando 8 Campeonatos Mundiales de Constructores consecutivos y llevando a Lewis Hamilton a igualar el récord de 7 títulos de Schumacher.',
  },
  {
    year: '2022 — Presente',
    title: 'El Retorno del Efecto Suelo y la Era de Max Verstappen',
    description:
      'La F1 reintroduce túneles Venturi bajo el suelo para reducir la turbulencia y permitir adelantamientos más cerrados. Adrian Newey y Red Bull Racing perfeccionan la suspensión anti-dive y crean el dominante RB19, mientras la categoría se prepara para la revolución reglamentaria y de combustibles sostenibles de 2026.',
  },
];

export const f1Specs: {
  turboEra: SpecItem[];
  v10Era: SpecItem[];
  hybridEra: SpecItem[];
} = {
  turboEra: [
    { label: 'Monoplaza Insignia', value: '1986 Brabham BT55 / Benetton B186 / McLaren MP4/4' },
    { label: 'Motor Insignia', value: 'BMW M12/13 1.5L Turbo / Honda RA168E 1.5L V6 Twin-Turbo' },
    { label: 'Cilindrada', value: '1.499 cc (4 cilindros en línea) / 1.494 cc (V6)' },
    { label: 'Presión de Soplado', value: 'Hasta 5.5 bares (Qualifying Mode)' },
    { label: 'Potencia en Clasificación', value: '1.350 — 1.430 CV @ 11.500 RPM' },
    { label: 'Potencia en Carrera', value: '900 — 1.050 CV @ 4.0 bares' },
    { label: 'Transmisión', value: 'Manual en H de 6 velocidades con embrague de carbono' },
    { label: 'Peso Mínimo', value: '540 kg (Relación peso/potencia: 0.38 kg/CV en quali)' },
    { label: 'Aceleración 0-100 km/h', value: '1.8 segundos' },
    { label: 'Aceleración 0-200 km/h', value: '4.6 segundos' },
    { label: 'Velocidad Máxima', value: '352+ km/h (Monza 1986 Gerhard Berger)' },
  ],
  v10Era: [
    { label: 'Monoplaza Insignia', value: '2004 Ferrari F2004 / McLaren MP4-20 / Williams FW26' },
    { label: 'Motor Insignia', value: 'Ferrari Tipo 053 3.0L V10 a 90° / BMW P84' },
    { label: 'Cilindrada y Bloque', value: '2.998 cc V10 atmosférico en aleación de aluminio y magnesio' },
    { label: 'Régimen de Giro Máximo', value: '19.200 RPM (Ferrari) / 19.800 RPM (BMW Williams)' },
    { label: 'Potencia Máxima', value: '920 — 960 CV @ 19.000 RPM atmosférico' },
    { label: 'Distribución de Válvulas', value: '4 válvulas por cilindro con retorno neumático de nitrógeno' },
    { label: 'Transmisión', value: 'Secuencial semiautomática de 7 velocidades con levas en volante' },
    { label: 'Peso con Piloto', value: '605 kg' },
    { label: 'Récord Histórico de Monza', value: '1:19.525 Rubens Barrichello (F2004)' },
    { label: 'Frenada 200-0 km/h', value: '1.9 segundos / 55 metros (Discos de carbono-carbono)' },
  ],
  hybridEra: [
    { label: 'Monoplaza Insignia', value: '2020 Mercedes-AMG W11 EQ Performance / 2023 Red Bull RB19' },
    { label: 'Unidad de Potencia', value: '1.6L V6 Turbo con MGU-K (Cinético) + MGU-H (Calorífico)' },
    { label: 'Cilindrada y Sobrealimentación', value: '1.600 cc V6 a 90° con Turbo simple split de 125.000 RPM' },
    { label: 'Potencia Térmica (ICE)', value: '780 — 830 CV @ 12.500 RPM' },
    { label: 'Potencia Eléctrica (ERS)', value: '160 CV (120 kW) MGU-K de descarga constante' },
    { label: 'Potencia Total Combinada', value: '1.020 — 1.050+ CV' },
    { label: 'Eficiencia Térmica', value: '> 52% (El motor de combustión interna más eficiente del planeta)' },
    { label: 'Carga Aerodinámica', value: '> 3.500 kg a 250 km/h (Suelo con túneles Venturi)' },
    { label: 'Aceleración 0-100 km/h', value: '2.1 segundos' },
    { label: 'Fuerzas G en Curva Rápida', value: '5.8 G a 6.2 G (Copse en Silverstone / Pouhon en Spa)' },
  ],
};

export const f1Chapters: Chapter[] = [
  {
    number: '01',
    category: 'ORÍGENES // 1950',
    title: 'El Nacimiento en Silverstone: Caballeros, Asfalto Bélico y el Alfetta 158',
    subtitle: 'Cómo la FIA unificó los Grandes Premios de posguerra sobre las pistas de la Royal Air Force',
    paragraphs: [
      'El 13 de mayo de 1950, bajo un cielo despejado de primavera en la campiña inglesa de Northamptonshire, nació oficialmente la máxima categoría del automovilismo mundial. En las pistas de hormigón y asfalto del aeródromo militar de Silverstone —utilizado apenas un lustro antes por los bombarderos Wellington de la Royal Air Force durante la Segunda Guerra Mundial—, más de 120.000 espectadores presenciaron el Gran Premio de Gran Bretaña y de Europa.',
      'La Federación Internacional del Automóvil (FIA) estableció una normativa técnica sencilla conocida como "Fórmula 1" para unificar las carreras europeas: se permitían motores atmosféricos de hasta 4.5 litros de cilindrada o motores sobrealimentados por compresor volumétrico de hasta 1.5 litros. No existían cinturones de seguridad, jaulas antivuelco, monos ignífugos ni escapatorias de grava. Los pilotos vestían camisas de manga corta de algodón, cascos de cuero con gafas de aviador y guantes finos, sentados sobre gigantescos tanques de combustible de más de 200 litros.',
      'El equipo oficial de Alfa Romeo se presentó con cuatro unidades del legendario monoplaza Tipo 158 "Alfetta". Diseñado originalmente en 1938 por Gioacchino Colombo y escondido de los bombardeos nazis en una fábrica de quesos en Melzo, el Alfetta contaba con un motor de 8 cilindros en línea de 1.5 litros sobrealimentado por un compresor Roots de doble etapa que entregaba 350 CV a 8.500 RPM, alimentado por una mezcla altamente tóxica de metanol, etanol y éter.',
      'El trío de pilotos italianos conocido popularmente como "Las Tres F" —Giuseppe "Nino" Farina, Juan Manuel Fangio y Luigi Fagioli— aplastó a la competencia. Farina ganó la carrera con una velocidad media de 146.4 km/h y se coronó a final de temporada como el primer Campeón Mundial de la historia de la Fórmula 1, marcando el punto de partida de una saga de velocidad, tecnología y tragedia humana.',
    ],
    highlight: {
      value: '13 Mayo 1950',
      label: 'Nacimiento oficial en Silverstone',
      description: 'El primer Gran Premio puntuable del Campeonato Mundial de Pilotos de la FIA.',
    },
  },
  {
    number: '02',
    category: 'LA LEYENDA // 1951-1957',
    title: 'Juan Manuel Fangio: El Maestro de Balcarce y la Hazaña Inmortal de Nürburgring',
    subtitle: 'Cinco títulos mundiales con cuatro marcas distintas y la mayor exhibición de pilotaje de todos los tiempos',
    paragraphs: [
      'Si los primeros años de la Fórmula 1 tuvieron un soberano indiscutible, ese fue el argentino Juan Manuel Fangio. Hijo de inmigrantes italianos y formado en las brutales y polvorientas carreras de Turismo Carretera en Sudamérica, Fangio combinaba una sensibilidad mecánica sobrehumana para conservar el coche con una agresividad quirúrgica cuando las circunstancias lo exigían.',
      'A lo largo de la década de 1950, Fangio logró una hazaña irrepetible: conquistó cinco Campeonatos Mundiales (1951, 1954, 1955, 1956 y 1957) al volante de cuatro constructores legendarios diferentes: Alfa Romeo, Maserati, Mercedes-Benz (las temibles "Flechas de Plata" W196) y Scuderia Ferrari. Su récord de porcentaje de victorias (24 triunfos en 51 Grandes Premios disputados, un asombroso 47.06%) permanece inalcanzado hasta hoy.',
      'La cumbre de su genio tuvo lugar el 4 de agosto de 1957 en el infernal trazado del Nordschleife de Nürburgring, conocido como "El Infierno Verde" con sus 22.8 kilómetros y 174 curvas entre bosques. Al volante de su Maserati 250F roja, Fangio sufrió una desastrosa parada en boxes que le dejó con 48 segundos de desventaja respecto a las Ferrari 801 de los jóvenes británicos Mike Hawthorn y Peter Collins a falta de solo 10 vueltas.',
      'Lo que siguió es considerado por historiadores, ingenieros y pilotos como la mayor lección de conducción en la historia del motor: Fangio condujo al límite de la física, rozando los setos con las ruedas a 200 km/h y recortando hasta 8 segundos por vuelta. Batió el récord de vuelta del circuito en nueve ocasiones consecutivas, adelantó a Collins y a Hawthorn en la penúltima vuelta y cruzó la meta victorioso. Exhausto en el podio, Fangio pronunció su famosa frase: "Nunca antes había corrido así, y jamás volveré a hacerlo".',
    ],
    image: {
      src: f1HeroImg,
      alt: 'Evolución histórica de los monoplazas de Fórmula 1 en circuito',
      caption: 'De los clásicos monoplazas de los años 50 con motor delantero a las bestias aerodinámicas modernas de carbono.',
      tag: 'PIEZA 01 // EVOLUCIÓN HISTÓRICA',
    },
    highlight: {
      value: '47.06%',
      label: 'Porcentaje de victorias de Fangio',
      description: '24 victorias en 51 carreras iniciadas: el ratio más alto en la historia de la categoría.',
    },
  },
  {
    number: '03',
    category: 'REVOLUCIÓN DE INGENIERÍA // 1958-1967',
    title: 'Colin Chapman y Lotus: Motor Trasero, Chasis Monocasco y el Milagro Cosworth DFV',
    subtitle: 'El fin del motor delantero y cómo la aviación transformó los monoplazas en estructuras portantes',
    paragraphs: [
      'A finales de los años 50, la Fórmula 1 experimentó su primera gran metamorfosis conceptual. Mientras Enzo Ferrari sostenía tercamente que "los caballos deben tirar del carro y no empujarlo", los constructores británicos independientes —a quienes Don Enzo llamaba despectivamente "garagisti"— demostraron lo contrario. Charles y John Cooper colocaron el motor Coventry Climax detrás del piloto en sus pequeños bólidos, logrando un reparto de pesos óptimo, menor superficie frontal y una agilidad fulminante.',
      'Pero el verdadero visionario de la era moderna fue Anthony Colin Bruce Chapman, fundador de Team Lotus. Ingeniero aeronáutico de formación, Chapman aplicó un mantra obsesivo: "Añadir potencia te hace más rápido en las rectas; restar peso te hace más rápido en todas partes". En 1962, Chapman concibió el Lotus 25 para Jim Clark: el primer monoplaza con chasis monocasco de planchas de aluminio de aviación remachadas alrededor de una bañera central.',
      'El monocasco del Lotus 25 era tres veces más rígido que los tradicionales chasis tubulares de tubos soldados ("Spaceframe") y pesaba la mitad, permitiendo al piloto ir prácticamente acostado para reducir la resistencia aerodinámica al mínimo. Con Jim Clark al volante, el binomio Clark-Lotus dominó los campeonatos de 1963 y 1965 con una elegancia inalcanzable.',
      'En 1967, Chapman convenció a Ford y a los ingenieros Keith Duckworth y Mike Costin de Cosworth para crear el legendario motor V8 3.0L DFV (Double Four Valve). El DFV no solo era ligero y entregaba 400 CV a 9.000 RPM, sino que fue diseñado para atornillarse directamente a la espalda del monocasco, actuando como elemento estructural rígido sobre el cual se montaba la suspensión trasera. El Cosworth DFV democratizó la Fórmula 1, ganando 155 carreras y convirtiéndose en el propulsor más exitoso de todos los tiempos.',
    ],
    highlight: {
      value: 'Lotus 25',
      label: 'Primer chasis monocasco de aluminio',
      description: 'Revolucionó la rigidez torsional y sentó las bases de la construcción de vehículos de carreras.',
    },
  },
  {
    number: '04',
    category: 'AERODINÁMICA EXTREMA // 1977-1982',
    title: 'El Secreto del Efecto Suelo: Túneles Venturi, Faldas Móviles y el Brabham Fan Car',
    subtitle: 'Cuando los monoplazas comenzaron a utilizar el aire bajo el suelo para succionarse al asfalto',
    paragraphs: [
      'A finales de los años 60, los ingenieros comenzaron a montar alerones invertidos sobre altos soportes para generar carga aerodinámica (downforce) y empujar los neumáticos contra el suelo. Sin embargo, los alerones tradicionales generaban una enorme resistencia al avance ("drag") que penalizaba la velocidad punta en recta.',
      'En 1977, Colin Chapman y el aerodinamista Peter Wright descubrieron la solución definitiva en el túnel de viento del Imperial College: el Efecto Suelo (Ground Effect). En el Lotus 78 y su sucesor, el dominante Lotus 79 "Black & Gold" de 1978, diseñaron los pontones laterales con forma de ala de avión invertida. Al circular a alta velocidad, el espacio estrecho entre el fondo plano y el asfalto aceleraba el flujo de aire según el Principio de Bernoulli, creando una gigantesca zona de baja presión que literalmente succionaba el monoplaza hacia el suelo.',
      'Para evitar que el aire exterior entrara por los laterales y rompiera el vacío, Lotus instaló "faldas deslizantes" cerámicas con resortes que rozaban continuamente el asfalto. El agarre en curva creció a niveles inhumanos: Mario Andretti y Ronnie Peterson arrasaron en 1978, describiendo la sensación como "conducir sobre raíles invisibles a 240 km/h".',
      'La respuesta más demencial a esta tecnología llegó del diseñador de Brabham, Gordon Murray, con el mítico Brabham BT46B "Fan Car" de 1978: un monoplaza con un gigantesco ventilador trasero accionado por el motor Alfa Romeo Flat-12. Oficialmente el ventilador servía para "refrigeración", pero en la práctica aspiraba el aire de debajo del chasis creando succión instantánea incluso en parado. Niki Lauda ganó el GP de Suecia en Anderstorp por más de 34 segundos, antes de que el coche fuera prohibido inmediatamente por motivos de seguridad.',
    ],
    image: {
      src: f1MonacoImg,
      alt: 'Monoplaza de Fórmula 1 en acción a alta velocidad en circuito urbano de Mónaco',
      caption: 'El mítico circuito de Mónaco: el test definitivo de precisión, aerodinámica y valentía al volante.',
      tag: 'PIEZA 02 // CIRCUITO DE MÓNACO',
    },
    highlight: {
      value: 'Lotus 79',
      label: 'El campeón del Efecto Suelo 1978',
      description: 'El monoplaza que transformó para siempre la aerodinámica automotriz mediante túneles Venturi.',
    },
  },
  {
    number: '05',
    category: 'POTENCIA MONSTRUOSA // 1983-1988',
    title: 'La Era Turbo Salvaje: 1.400 Caballos de Fuerza en Motores de 1.5 Litros',
    subtitle: 'Bloques de hierro sazonados con lluvia, turbos Garrett a 5.5 bares y gasolina de cohete en clasificación',
    paragraphs: [
      'Ninguna época en la historia del deporte de motor iguala la demencia mecánica de la era turbo de los años 80. Lo que Renault inició con valentía en 1977 con su pequeño RS01 "la tetera amarilla" se transformó en una carrera armamentística sin límites presupuestarios ni restricciones de soplado.',
      'El motor más temible jamás construido fue el BMW M12/13 de 4 cilindros en línea y 1.500 centímetros cúbicos concebido por Paul Rosche. Para soportar tensiones internas inimaginables, BMW utilizaba bloques de fundición de hierro usados de los viejos coches de calle BMW Serie 1500 con más de 100.000 km, dejándolos reposar a la intemperie bajo la lluvia para que el metal liberara todas sus tensiones moleculares.',
      'Equipado con un turbocompresor gigante Garrett o KKK que soplaba a presiones astronómicas de hasta 5.5 bares (80 psi) y alimentado por combustibles sintéticos especiales con 84% de tolueno formulados por químicas petroleras, el motor BMW generaba más de 1.400 CV de potencia. Los dinamómetros de la fábrica de Múnich no podían medirlo porque su escala solo llegaba a 1.280 CV.',
      'En clasificación, los pilotos contaban con una sola vuelta limpia ("the golden lap") con neumáticos blandos de goma pegajosa que apenas duraban tres kilómetros. Con cajas de cambio manuales de titanio en H, sin dirección asistida, sin control de tracción y con un retardo del turbo ("turbo lag") de casi dos segundos tras pisar el acelerador, domar estas bestias requería un valor titánico. En Monza 1986, Gerhard Berger fue cronometrado a 352.6 km/h al volante del Benetton-BMW, estableciendo el récord de velocidad de la era turbo clásica.',
    ],
    image: {
      src: f1TurboImg,
      alt: 'Monoplaza de la era turbo de los años 80 escupiendo llamaradas de escape en boxes',
      caption: 'La era más salvaje: motores de 1.5 litros capaces de superar los 1.400 CV en modo de clasificación extrema.',
      tag: 'PIEZA 03 // ERA TURBO SALVAJE',
    },
    highlight: {
      value: '1.400+ CV',
      label: 'Potencia específica récord',
      description: 'Más de 930 CV por litro de cilindrada: la cifra más alta jamás alcanzada en un motor de cuatro tiempos.',
    },
  },
  {
    number: '06',
    category: 'DUELO INMORTAL // 1988-1990',
    title: 'Ayrton Senna vs. Alain Prost: La Guerra Sagrada de McLaren-Honda',
    subtitle: 'Misticismo contra cálculo: telemetría en Mónaco y las colisiones históricas en Suzuka',
    paragraphs: [
      'En 1988, Ron Dennis unió bajo el techo de McLaren al mejor chasis (el MP4/4 diseñado por Gordon Murray y Steve Nichols), al mejor motor (el V6 Turbo Honda RA168E) y a los dos pilotos más superlativos del planeta: el bicampeón francés Alain Prost y el genio brasileño Ayrton Senna da Silva. El resultado fue una máquina imparable que ganó 15 de los 16 Grandes Premios del año.',
      'Sin embargo, la convivencia entre dos personalidades tan opuestas pronto se convirtió en una guerra psicológica y deportiva sin cuartel. Alain Prost era "El Profesor": calculador, elegante, enfocado en la puesta a punto para carrera y en la preservación de los neumáticos. Ayrton Senna era la velocidad pura y el fervor místico: un piloto que buscaba trascender los límites humanos en cada curva.',
      'La consagración divina de Senna ocurrió en la clasificación del Gran Premio de Mónaco de 1988: Ayrton marcó una vuelta 1.427 segundos más rápida que la de Prost con el mismo coche. Años después, Senna describió aquella experiencia en trance: "De repente me di cuenta de que ya no estaba conduciendo el coche de forma consciente. Conducía por puro instinto, estaba en otra dimensión. El circuito era un túnel y yo solo iba y venía... Me asusté porque supe que estaba más allá de mi comprensión".',
      'La tensión estalló en los desenlaces de 1989 y 1990 en el circuito de Suzuka, Japón. En 1989, Prost cerró la trayectoria a Senna en la chicana Casio Triangle; Senna reinició empujado por los comisarios y ganó la carrera, pero fue descalificado por el presidente de la FIA Jean-Marie Balestre, entregando el título a Prost. En 1990, ahora con Prost en Ferrari, Senna no levantó el pie en la primera curva tras la salida, impactando a 270 km/h contra Prost y coronándose bicampeón mundial en un acto de revancha que conmovió los cimientos del deporte.',
    ],
    highlight: {
      value: '15 de 16',
      label: 'Victorias del McLaren MP4/4 en 1988',
      description: 'El récord de dominio porcentual en una temporada (93.75%) que perduró durante 35 años.',
    },
  },
  {
    number: '07',
    category: 'TRAGEDIA Y REFORMA // 1994',
    title: 'El Fin de Semana Negro de Imola 1994 y la Revolución Médica de Sid Watkins',
    subtitle: 'El sacrificio de Roland Ratzenberger y Ayrton Senna que transformó la seguridad para siempre',
    paragraphs: [
      'El Gran Premio de San Marino de 1994, disputado en el Autodromo Enzo e Dino Ferrari de Imola entre el 29 de abril y el 1 de mayo, es el fin de semana más oscuro y traumático en la historia del deporte de motor. Tras la prohibición de las ayudas electrónicas de pilotaje (suspensión activa y control de tracción) a finales de 1993, los coches se habían vuelto extremadamente nerviosos e impredecibles.',
      'El viernes, un jovencísimo Rubens Barrichello despegó sobre los pianos de la Variante Bassa a 225 km/h, impactando contra la valla y salvando la vida gracias a la rápida intervención del médico jefe de la FIA, el profesor Sid Watkins. El sábado, durante la clasificación, el alerón delantero del Simtek de Roland Ratzenberger se desprendió en la curva Villeneuve a 314 km/h; el piloto austríaco falleció instantáneamente.',
      'Afectado profundamente, Senna dudó sobre si competir el domingo, pero tomó la salida al frente del pelotón con su Williams FW16. En la vuelta 7, a las 14:17 horas, la columna de dirección del monoplaza de Senna cedió al entrar a la curva de Tamburello a 310 km/h. Aunque Senna logró frenar hasta los 218 km/h, impactó contra el muro de hormigón desprotegido. Un fragmento de la suspensión delantera perforó su casco Bell, causándole lesiones cerebrales fatales. En el habitáculo de su coche, los comisarios encontraron una bandera de Austria que Senna pensaba ondear tras cruzar la meta en homenaje a Ratzenberger.',
      'El dolor colectivo catalizó la mayor revolución de seguridad de la historia. Liderados por el profesor Sid Watkins, el presidente de la FIA Max Mosley y la Asociación de Pilotos de Grandes Premios (GPDA), se rediseñaron los circuitos eliminando muros cercanos, se crearon escapatorias asfaltadas y de grava profunda, se elevaron las protecciones laterales del cockpit ("Headrest"), se introdujeron cables de sujeción para las ruedas y, más adelante, se hizo obligatorio el dispositivo HANS (Head and Neck Support). El legado de Senna y Ratzenberger salvó incontables vidas en las tres décadas posteriores.',
    ],
    highlight: {
      value: 'Sid Watkins',
      label: 'El cirujano que salvó la F1',
      description: 'Pionero de la telemetría médica y los estándares de evacuación en pista en menos de 30 segundos.',
    },
  },
  {
    number: '08',
    category: 'ERA DE ORO V10 // 1998-2005',
    title: 'La Dinastía Roja de Michael Schumacher y la Sinfonía Atmosférica a 20.000 RPM',
    subtitle: 'El sonido más estremecedor del planeta y el dream-team que resucitó a la Scuderia Ferrari',
    paragraphs: [
      'Tras 21 años de sequía de títulos de pilotos desde Jody Scheckter en 1979, la Scuderia Ferrari construyó el equipo más perfecto y coordinado en la historia de la competición automovilística. Bajo la dirección general de Jean Todt, la genialidad estratégica de Ross Brawn, el lápiz aerodinámico de Rory Byrne y el motorista Paolo Martinelli, se unió el piloto más implacable de todos los tiempos: Michael Schumacher.',
      'El corazón de esta era dorada fueron los motores V10 atmosféricos de 3.0 litros. Fabricados con aleaciones ultraligeras de aluminio, berilio y titanio, estos propulsores prescindieron de los muelles mecánicos tradicionales y utilizaron válvulas con retorno neumático accionado por nitrógeno a presión. Esto permitió a los motores Ferrari (Tipo 053), BMW (P84) y Renault (RS25) girar a la asombrosa cifra de 19.000 e incluso 20.000 revoluciones por minuto.',
      'El sonido de una parrilla de 20 monoplazas V10 arrancando en Monza, Spa-Francorchamps o Suzuka era una experiencia física atronadora: un aullido agudo y metálico que resonaba en el pecho de los aficionados a kilómetros de distancia. Con un peso de apenas 605 kg con piloto incluido y más de 950 CV atmosféricos, los coches de 2004 aceleraban y frenaban con una violencia inusitada.',
      'Al volante del sublime Ferrari F2004, Schumacher conquistó 13 de las 18 carreras de la temporada 2004, sellando su séptimo Campeonato Mundial de Pilotos y el quinto consecutivo de la Scuderia. Los récords de vuelta en carrera establecidos por el F2004 en circuitos como Monza (1:21.046 de Rubens Barrichello) resistieron intactos durante más de una década y media frente a coches con mucha más tecnología digital.',
    ],
    image: {
      src: f1CadImg,
      alt: 'Plano técnico CAD de ingeniería con flujos aerodinámicos y monocasco de Fórmula 1',
      caption: 'Ingeniería al milímetro: simulación CFD de flujos aerodinámicos, alerones vortex y chasis de fibra de carbono.',
      tag: 'PIEZA 04 // PLANO CAD AERODINÁMICO',
    },
    highlight: {
      value: '20.000 RPM',
      label: 'Régimen de giro de los motores V10',
      description: 'Válvulas de retorno neumático y más de 950 CV atmosféricos en apenas 90 kg de peso de motor.',
    },
  },
  {
    number: '09',
    category: 'MAESTRÍA AERODINÁMICA // 2009-2013',
    title: 'Adrian Newey, Difusores Soplados y el Tetracampeonato de Sebastian Vettel',
    subtitle: 'Cómo los gases de escape calientes pegaron los coches al asfalto en las curvas lentas',
    paragraphs: [
      'En 2009, la FIA implementó un cambio radical de reglamento para reducir la turbulencia aerodinámica y prohibir los apéndices complejos en los pontones. El ingeniero Ross Brawn sorprendió al mundo descubriendo un vacío legal en el difusor trasero con su equipo Brawn GP: el famoso "Doble Difusor", que llevó a Jenson Button a proclamarse campeón mundial.',
      'Sin embargo, el ingeniero más laureado de la era moderna, Adrian Newey —director técnico de Red Bull Racing—, llevó la explotación de los flujos de aire a una dimensión completamente nueva. Newey ideó el sistema de "Difusores Soplados" (Blown Diffusers): colocó las salidas de escape del motor Renault V8 2.4L de tal manera que los gases a más de 800 °C incidieran directamente sobre los canales laterales del difusor trasero.',
      'Para que el sistema funcionara incluso cuando el piloto no pisaba el acelerador en mitad de una curva cerrada, los ingenieros de software programaron el mapa de motor para seguir inyectando combustible y aire con el encendido retrasado ("Hot Blowing" o soplado en retención). El motor rugía como una ametralladora en las frenadas, pero mantenía un flujo constante de gas que sellaba el difusor y otorgaba una estabilidad en curva asombrosa.',
      'Al volante del Red Bull RB6, RB7, RB8 y RB9, el joven alemán Sebastian Vettel ejecutó esta ventaja con una precisión quirúrgica: lograba la pole position los sábados y escapaba en la primera vuelta a base de vueltas perfectas. Vettel y Red Bull conquistaron cuatro títulos mundiales consecutivos de Pilotos y Constructores entre 2010 y 2013, estableciendo en 2013 el récord histórico de nueve victorias consecutivas en una sola temporada.',
    ],
    highlight: {
      value: 'Adrian Newey',
      label: 'El genio de la aerodinámica',
      description: 'El único diseñador que ha ganado títulos mundiales con tres equipos distintos (Williams, McLaren y Red Bull).',
    },
  },
  {
    number: '10',
    category: 'REVOLUCIÓN HÍBRIDA // 2014-2021',
    title: 'La Era Turbo-Híbrida V6 y el Reinado Absoluto de Mercedes-AMG y Lewis Hamilton',
    subtitle: 'El 50% de eficiencia térmica, la recuperación de energía MGU-K/MGU-H y el récord de 7 coronas',
    paragraphs: [
      'En 2014, la Fórmula 1 acometió la transformación tecnológica más compleja de su historia: la sustitución de los motores atmosféricos por sofisticadas "Unidades de Potencia" híbridas compuestas por un motor de combustión interna V6 Turbo de 1.6 litros y dos generadores eléctricos: el MGU-K (Kinetic, que recupera energía en las frenadas) y el MGU-H (Heat, que recupera energía del eje del turbocompresor).',
      'Mercedes-AMG High Performance Powertrains en Brixworth, Reino Unido, preparó esta transición con años de antelación y una obra maestra de ingeniería: el "Split-Turbo". Separaron la turbina de escape del compresor de aire ubicándolos en extremos opuestos del bloque motor y uniéndolos mediante un eje central que atravesaba la V del motor. Esto eliminó el retraso del turbo, redujo las temperaturas de admisión y permitió un empaque aerodinámico sumamente compacto.',
      'El resultado fue una eficiencia térmica sin precedentes: mientras los motores de los automóviles convencionales apenas aprovechan el 30% de la energía del combustible, la unidad de potencia Mercedes superó el 50% de eficiencia térmica, entregando más de 1.000 CV de potencia combinada con apenas 100 kg de combustible por carrera.',
      'Al volante de las "Flechas de Plata" (W05 a W11), el piloto británico Lewis Hamilton impuso una hegemonía histórica. Con un estilo de pilotaje impecable en lluvia, gestión magistral de neumáticos y velocidad pura, Hamilton superó las 100 victorias en Grandes Premios y las 100 pole positions, alcanzando a Michael Schumacher con 7 Campeonatos Mundiales de Pilotos en 2020 y consolidando a Mercedes con 8 títulos mundiales de constructores consecutivos.',
    ],
    highlight: {
      value: '> 50%',
      label: 'Eficiencia térmica récord mundial',
      description: 'Más de 1.000 CV combinados utilizando un tercio menos de combustible que los antiguos V8.',
    },
  },
  {
    number: '11',
    category: 'NUEVA ERA // 2022-2025',
    title: 'El Retorno del Efecto Suelo y la Máquina Perfecta de Max Verstappen',
    subtitle: 'Túneles Venturi modernos, el combate al "porpoising" y la temporada de récord absoluto del RB19',
    paragraphs: [
      'En 2022, la F1 ejecutó el mayor cambio aerodinámico en cuatro décadas: eliminó los complejos alerones y vórtices superiores para reintroducir el Efecto Suelo mediante dos gigantescos túneles Venturi esculpidos bajo el suelo del coche. El objetivo era reducir drásticamente el "aire sucio" turbulento y permitir que los monoplazas se siguieran de cerca y batallaran rueda contra rueda sin sobrecalentar los neumáticos.',
      'El nuevo reglamento trajo consigo un desafío de ingeniería inesperado: el "porpoising" o rebote aerodinámico. A altas velocidades en recta, la enorme succión pegaba el fondo del coche al suelo hasta bloquear el flujo de aire; el coche perdía la carga, se elevaba bruscamente sobre sus suspensiones y volvía a succionarse en un ciclo oscilatorio violento que castigaba la espalda de los pilotos.',
      'Adrian Newey y el equipo Red Bull Racing comprendieron la dinámica de suspensiones mejor que nadie. Diseñaron una suspensión delantera anti-dive (antihundimiento) y trasera anti-squat que mantenía el suelo a una altura constante y milimétrica respecto al asfalto sin provocar rebotes.',
      'A los mandos del Red Bull RB19 en 2023, el neerlandés Max Verstappen firmó la temporada más dominante en los 75 años de la Fórmula 1: ganó 19 de las 22 carreras del calendario (un 86.4% de efectividad), lideró más de 1.000 vueltas en un solo año y encadenó 10 victorias consecutivas, demostrando una simbiosis perfecta entre máquina, piloto y estrategia.',
    ],
    highlight: {
      value: '19 de 22',
      label: 'Victorias de Max Verstappen en 2023',
      description: 'El récord absoluto de victorias en una sola temporada en la historia del Campeonato Mundial.',
    },
  },
  {
    number: '12',
    category: 'FUTURO // 2026 EN ADELANTE',
    title: 'Hacia 2026: 50% Eléctrico, Combustibles 100% Sostenibles y el Alma de la Competición',
    subtitle: 'La próxima gran revolución técnica y por qué la Fórmula 1 sigue siendo el pináculo de la velocidad humana',
    paragraphs: [
      'A medida que la Fórmula 1 mira hacia su futuro reglamentario de 2026, la categoría se prepara para una nueva era de relevancia tecnológica y sostenibilidad extrema. Las futuras unidades de potencia prescindirán del complejo y costoso MGU-H y triplicarán la potencia del motor eléctrico MGU-K hasta los 350 kW (casi 475 CV eléctricos), alcanzando una distribución de potencia de casi 50% térmica y 50% eléctrica.',
      'El combustible será 100% sintético y de origen no fósil (e-fuels de captura de carbono y biocombustibles avanzados de segunda generación), desarrollado junto a gigantes energéticos para demostrar que los motores de combustión de alto rendimiento pueden ser completamente neutros en emisiones de carbono sin sacrificar el espectáculo sonoro ni la velocidad punta.',
      'Además, los monoplazas de 2026 serán más cortos, 10 cm más estrechos y significativamente más ligeros, con aerodinámica activa ("Modo Recta" y "Modo Curva") para maximizar la eficiencia y facilitar los adelantamientos en pista.',
      'A lo largo de más de siete décadas, la Fórmula 1 ha sobrevivido a crisis económicas, guerras tecnológicas y cambios generacionales porque encarna una fascinación universal inalterable: la búsqueda del límite absoluto donde el coraje del ser humano y la cúspide de la ingeniería de vanguardia se funden a más de 350 kilómetros por hora.',
    ],
    highlight: {
      value: '100% Sostenible',
      label: 'Combustibles sintéticos para 2026',
      description: 'Cero emisiones netas de carbono con más de 1.000 CV de potencia combinada.',
    },
  },
];
