import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoutePage } from '../types';
import { xj220Images } from '../data/xj220Data';
import { f40MiuraImages } from '../data/f40MiuraData';
import { countachImages } from '../data/countachData';
import { r34Images } from '../data/r34Data';
import { supraImages } from '../data/supraData';
import { mazda787bImages } from '../data/mazda787bData';
import { nsxImages } from '../data/nsxData';
import { camaroMustangImages } from '../data/camaroMustangData';
import { f1Images } from '../data/f1Data';
import { shelbyCobraImages } from '../data/shelbyCobraData';
import { toyotaHiluxImages } from '../data/toyotaHiluxData';
import { UserAccountNav } from './UserAccountNav';
import { Logo } from './Logo';

interface DocumentalesPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenBroadcastModal?: () => void;
}

type EraFilter = 'all' | '60s' | '70s' | '80s' | '90s' | '2000s';
type CountryFilter = 'all' | 'italia' | 'uk' | 'japon' | 'usa' | 'global';

interface DocItem {
  id: 'shelby-cobra' | 'toyota-hilux' | 'countach' | 'f40-miura' | 'xj220' | 'r34' | 'supra' | 'mazda-787b' | 'nsx' | 'camaro-mustang' | 'f1';
  number: string;
  badge: string;
  badgeColor: string;
  isNew?: boolean;
  country: 'italia' | 'uk' | 'japon' | 'usa' | 'global';
  era: '60s' | '70s' | '80s' | '90s' | '2000s';
  origin: string;
  years: string;
  title: string;
  titleAccent: string;
  accentColor: string;
  borderColor: string;
  bgCard: string;
  description: string;
  specs: string[];
  topSpeed: string;
  power: string;
  engine: string;
  units: string;
  chaptersCount: number;
  image: string;
  imageAlt: string;
  audioVisualTag: string;
  blueprintCode: string;
  tags: string[];
}

const DOCUMENTARIES: DocItem[] = [
  {
    id: 'shelby-cobra',
    number: '010',
    badge: '★ NUEVO ESTRENO // VENENO ANALÓGICO V8',
    badgeColor: '#38bdf8',
    isNew: true,
    country: 'usa',
    era: '60s',
    origin: 'LOS ÁNGELES & THAMES DITTON // USA & UK',
    years: '1962 — 1967',
    title: 'SHELBY',
    titleAccent: 'COBRA 427 S/C',
    accentColor: '#38bdf8',
    borderColor: 'border-[#38bdf8]/50 hover:border-[#38bdf8]',
    bgCard: 'bg-[#081220]',
    description:
      'La leyenda definitiva de Carroll Shelby y Ken Miles que conquistó el Campeonato Mundial de Constructores FIA 1965 y humilló a Ferrari. Carrocería artesanal de aluminio, chasis tubular reforzado de 4 pulgadas y la fuerza bruta del motor Ford 427 FE Big Block Side-Oiler de 485 CV y 0-100 km/h en 3.8 segundos.',
    specs: ['FORD 427 FE SIDE-OILER 7.0L', '298 KM/H', '485 CV (S/C) / 800+ CV (SUPER SNAKE)', '6 CAPÍTULOS EXTENDIDOS'],
    topSpeed: '298 KM/H',
    power: '485 CV @ 6.500 RPM',
    engine: 'FORD 427 FE V8 7.0L BIG BLOCK',
    units: '348 UNIDADES (427)',
    chaptersCount: 6,
    image: shelbyCobraImages.hero,
    imageAlt: '1965 Shelby Cobra 427 S/C en Guardsman Blue',
    audioVisualTag: 'V8 BIG BLOCK 427 & SIDE EXHAUSTS',
    blueprintCode: 'DWG-CSX-427-1965',
    tags: ['Carroll Shelby', 'Ken Miles', '427 FE Side-Oiler', 'FIA GT 1965', 'Semi-Competition', 'Super Snake'],
  },
  {
    id: 'toyota-hilux',
    number: '011',
    badge: '★ NUEVO ESTRENO // EL MONOLITO INDESTRUCTIBLE',
    badgeColor: '#eab308',
    isNew: true,
    country: 'japon',
    era: '80s',
    origin: 'HAMURA & AICHI, JAPÓN // GLOBAL',
    years: '1968 — PRESENTE',
    title: 'TOYOTA',
    titleAccent: 'HILUX 4X4',
    accentColor: '#eab308',
    borderColor: 'border-[#eab308]/50 hover:border-[#eab308]',
    bgCard: 'bg-[#181508]',
    description:
      'El patrón indiscutible de la resistencia mecánica y la supervivencia humana con más de 19 millones de unidades en 180 países. Del chasis de largueros en cajón y los indestructibles motores 22R y Diésel, al legendario test de Top Gear (mar, fuego, bola de demolición y colapso de 23 pisos), la conquista de los Polos a -50°C y las victorias en el Rally Dakar.',
    specs: ['22R-E / 1GD-FTV DIESEL / V6 DAKAR', '3.500 KG REMOLQUE', '400 CV (DAKAR) / 1M+ KM DURABILIDAD', '6 CAPÍTULOS EXTENDIDOS'],
    topSpeed: '175 KM/H (CALLE) / 170 KM/H (DAKAR T1+)',
    power: '204 CV (2.8 D4-D) / 400 CV (DAKAR V6)',
    engine: '22R 2.4L / 1GD-FTV 2.8L DIESEL / 3.5L V6 TWIN-TURBO',
    units: '19.000.000+ UNIDADES',
    chaptersCount: 6,
    image: toyotaHiluxImages.hero,
    imageAlt: 'Toyota Hilux 4x4 Off-Road Clásica y Expedición',
    audioVisualTag: 'LADDER CHASSIS & BULLETPROOF DIESEL',
    blueprintCode: 'DWG-RN65-1985',
    tags: ['Top Gear Survivor', 'Motor 22R', 'Eje Rígido 4WD', 'Arctic Trucks Polar', 'Dakar Winner', 'Hino Motors'],
  },
  {
    id: 'f1',
    number: '009',
    badge: '★ EL PINÁCULO DE LA VELOCIDAD (75 AÑOS)',
    badgeColor: '#e62628',
    isNew: false,
    country: 'global',
    era: '80s',
    origin: 'SILVERSTONE, MONZA, SPA & MÓNACO // GLOBAL',
    years: '1950 — PRESENTE',
    title: 'LA HISTORIA DE LA',
    titleAccent: 'FÓRMULA 1',
    accentColor: '#e62628',
    borderColor: 'border-[#e62628]/50 hover:border-[#e62628]',
    bgCard: 'bg-[#180809]',
    description:
      'La epopeya definitiva del automovilismo mundial con 12 capítulos extendidos. Del debut en Silverstone 1950 y los 5 títulos de Juan Manuel Fangio, a la revolución del monocasco Lotus, los monstruos Turbo de 1.400 CV de los años 80, la guerra sagrada Senna vs. Prost, el sacrificio de Imola 1994, la sinfonía V10 a 20.000 RPM de Schumacher, la era híbrida y el retorno del Efecto Suelo.',
    specs: ['V12 / V10 / TURBO / HÍBRIDO', '372.6 KM/H', '1.400+ CV (TURBO) / 1.050+ CV (HÍBRIDO)', '12 CAPÍTULOS EXTENDIDOS'],
    topSpeed: '372.6 KM/H',
    power: '1.400+ CV (TURBO) / 1.050+ CV (HÍBRIDO)',
    engine: 'V12 ATM / V10 3.0L / 1.5L TURBO / 1.6L V6 TURBO HÍBRIDO',
    units: '1.100+ GRANDES PREMIOS',
    chaptersCount: 12,
    image: f1Images.hero,
    imageAlt: 'Evolución Histórica de la Fórmula 1',
    audioVisualTag: 'V10 REVS, TURBO FLAMES & GROUND EFFECT',
    blueprintCode: 'DWG-FIA-F1-1950',
    tags: ['Juan Manuel Fangio', 'Lotus Efecto Suelo', 'BMW Turbo 1.400 CV', 'Senna vs Prost', 'Ferrari V10 Schumacher', 'Adrian Newey'],
  },
  {
    id: 'camaro-mustang',
    number: '008',
    badge: '★ LA GUERRA DE DETROIT (60 AÑOS)',
    badgeColor: '#ff5500',
    country: 'usa',
    era: '60s',
    origin: 'DETROIT & DEARBORN, MICHIGAN, USA',
    years: '1964 — PRESENTE',
    title: 'CAMARO',
    titleAccent: 'VS MUSTANG',
    accentColor: '#ff5500',
    borderColor: 'border-[#ff5500]/50 hover:border-[#ff5500]',
    bgCard: 'bg-[#180d09]',
    description:
      'La rivalidad más feroz y longeva de la historia del automóvil con capítulos extendidos. Del debut del Mustang en 1964 y el contraataque secreto del Proyecto Panther en 1966, a la guerra del SCCA Trans-Am (Donohue vs. Parnelli Jones), los Big Blocks 427 ZL-1 y Boss 429, el Fox 5.0 vs. IROC-Z y la era moderna de 760 CV en Nürburgring.',
    specs: ['V8 BIG & SMALL BLOCKS', '320+ KM/H', '760 CV (GT500) / 650 CV (ZL1)', '12 CAPÍTULOS LARGOS'],
    topSpeed: '320+ KM/H',
    power: '760 CV (GT500) / 650 CV (ZL1)',
    engine: 'V8 302 / 427 / 429 / LT4 / PREDATOR',
    units: '15.000.000+ COMBINADOS',
    chaptersCount: 12,
    image: camaroMustangImages.hero,
    imageAlt: 'Duelo Chevrolet Camaro vs Ford Mustang',
    audioVisualTag: 'V8 AMERICAN ROAR & TRANS-AM WAR',
    blueprintCode: 'DWG-PONY-1964',
    tags: ['Trans-Am', 'Boss 302 / 429', 'Camaro Z/28', 'COPO 9560 ZL-1', 'Shelby GT500', 'ZL1 1LE'],
  },
  {
    id: 'nsx',
    number: '007',
    badge: '★ REVOLUCIÓN DE ALUMINIO & AYRTON SENNA',
    badgeColor: '#ffd451',
    country: 'japon',
    era: '90s',
    origin: 'TOCHIGI & SUZUKA, JAPÓN',
    years: '1990 — 2005',
    title: 'HONDA',
    titleAccent: 'NSX (NA1)',
    accentColor: '#e62628',
    borderColor: 'border-[#e62628]/50 hover:border-[#e62628]',
    bgCard: 'bg-[#18090b]',
    description:
      'El samurai de aluminio que cambió para siempre las reglas de los superdeportivos. Chasis monocasco 100% de aluminio, visibilidad de caza F-16, motor V6 C30A VTEC a 8.000 RPM con bielas de titanio y la puesta a punto personal de Ayrton Senna en Suzuka.',
    specs: ['C30A V6 VTEC 3.0L', '270 KM/H', '274 CV @ 7.300 RPM', '20 CAPÍTULOS'],
    topSpeed: '270 KM/H',
    power: '274 CV (280 PS PACTO)',
    engine: 'C30A V6 3.0L DOHC VTEC',
    units: '18.685 UNIDADES',
    chaptersCount: 20,
    image: nsxImages.hero,
    imageAlt: 'Honda NSX NA1 en Formula Red',
    audioVisualTag: 'ALUMINIUM MONOCOQUE & VTEC SOUND',
    blueprintCode: 'DWG-NA1-1990',
    tags: ['Ayrton Senna', 'C30A VTEC', 'Chasis Aluminio', 'F-16 Canopy', 'NSX-R'],
  },
  {
    id: 'mazda-787b',
    number: '006',
    badge: '★ LE MANS WINNER & R26B WANKEL',
    badgeColor: '#22c55e',
    country: 'japon',
    era: '90s',
    origin: 'HIROSHIMA & LA SARTHE, JAPÓN / FRANCIA',
    years: '1991',
    title: 'MAZDA',
    titleAccent: '787B (#55 RENOWN)',
    accentColor: '#22c55e',
    borderColor: 'border-[#22c55e]/50 hover:border-[#22c55e]',
    bgCard: 'bg-[#091c10]',
    description:
      'La gesta inmortal del único prototipo rotativo y japonés en ganar las 24 Horas de Le Mans. Con el motor R26B de 4 rotores rindiendo 700 CV a 9.000 RPM, la librea Renown y la conducción heroica de Herbert, Weidler y Gachot.',
    specs: ['R26B 4-ROTOR WANKEL', '340+ KM/H', '700 CV @ 9.000 RPM', '20 CAPÍTULOS'],
    topSpeed: '340+ KM/H',
    power: '700 CV (930+ CLASIFICACIÓN)',
    engine: 'R26B 4-ROTOR WANKEL 2.6L',
    units: 'PROTOTIPO GRUPO C',
    chaptersCount: 20,
    image: mazda787bImages.hero,
    imageAlt: 'Mazda 787B #55 Le Mans Winner 1991 en verde y naranja Renown',
    audioVisualTag: 'R26B 4-ROTOR WANKEL SYMPHONY',
    blueprintCode: 'DWG-787B-1991',
    tags: ['R26B Wankel', 'Le Mans 1991', 'Renown Livery', 'Grupo C', 'Johnny Herbert'],
  },
  {
    id: 'r34',
    number: '004',
    badge: '★ JDM CULTO & TELEMETRÍA',
    badgeColor: '#4ea0ff',
    country: 'japon',
    era: '90s',
    origin: 'TOCHIGI & OMORI, JAPÓN',
    years: '1999 — 2002',
    title: 'NISSAN SKYLINE',
    titleAccent: 'GT-R R34 (BNR34)',
    accentColor: '#4ea0ff',
    borderColor: 'border-[#4ea0ff]/50 hover:border-[#4ea0ff]',
    bgCard: 'bg-[#071424]',
    description:
      'El icono cibernético y el rey de los 90. Del motor RB26DETT twin-turbo y el pacto de caballeros de los 280 CV, a la tracción total inteligente ATTESA E-TS Pro, la telemetría MFD desarrollada con Gran Turismo y el canto de cisne del NISMO Z-Tune de 500 CV.',
    specs: ['RB26DETT BITURBO 2.6L', '300+ KM/H', '334 CV REALES', '20 CAPÍTULOS'],
    topSpeed: '300+ KM/H',
    power: '280 CV (334 CV REALES)',
    engine: 'RB26DETT 6L 2.6L BITURBO',
    units: '11.578 UNIDADES',
    chaptersCount: 20,
    image: r34Images.hero,
    imageAlt: 'Nissan Skyline GT-R R34 V-Spec II en Bayside Blue',
    audioVisualTag: 'ATTESA E-TS PRO & MFD POLYPHONY',
    blueprintCode: 'DWG-BNR34-1999',
    tags: ['RB26DETT', 'ATTESA E-TS Pro', 'MFD Telemetría', 'Bayside Blue', 'NISMO Z-Tune'],
  },
  {
    id: 'supra',
    number: '005',
    badge: '★ 2JZ LEYENDA INDESTRUCTIBLE',
    badgeColor: '#e62628',
    country: 'japon',
    era: '90s',
    origin: 'AICHI & MOTOMACHI, JAPÓN',
    years: '1993 — 2002',
    title: 'TOYOTA SUPRA',
    titleAccent: 'MK4 TURBO (A80)',
    accentColor: '#e62628',
    borderColor: 'border-[#e62628]/50 hover:border-[#e62628]',
    bgCard: 'bg-[#180708]',
    description:
      'El misil de Isao Tsuzuki con cabina de caza de combate. El motor de hierro fundido 2JZ-GTE con sobrealimentación secuencial en dos fases, el récord mundial de frenada de 113 a 0 km/h y el fenómeno cinematográfico y de aceleración más grande de la historia.',
    specs: ['2JZ-GTE BITURBO SECUENCIAL', '285+ KM/H', '330 CV / 1000+ TUNED', '20 CAPÍTULOS'],
    topSpeed: '285+ KM/H (317 KM/H A1)',
    power: '330 CV (325 BHP)',
    engine: '2JZ-GTE 6L 3.0L SECUENCIAL',
    units: '45.230 UNIDADES',
    chaptersCount: 20,
    image: supraImages.hero,
    imageAlt: 'Toyota Supra MK4 Turbo en Renaissance Red',
    audioVisualTag: '2JZ-GTE & ACTIVE FRONT SPOILER',
    blueprintCode: 'DWG-JZA80-1993',
    tags: ['2JZ-GTE', 'Secuencial Biturbo', 'Getrag V160', 'Active Spoiler', 'Castrol TOM’S'],
  },
  {
    id: 'countach',
    number: '003',
    badge: '★ MONOGRAFÍA WEDGE',
    badgeColor: '#ffd451',
    country: 'italia',
    era: '70s',
    origin: 'SANT’AGATA BOLOGNESE, ITALIA',
    years: '1971 — 1990',
    title: 'LAMBORGHINI',
    titleAccent: 'COUNTACH',
    accentColor: '#ffd451',
    borderColor: 'border-[#ffd451]/50 hover:border-[#ffd451]',
    bgCard: 'bg-[#14140e]',
    description:
      'El monolito en cuña que redefinió para siempre las leyes del superdeportivo mundial. De la exclamación piamontesa de asombro de Gandini y el techo periscopio del LP400, a los legendarios neumáticos Pirelli P7 de 345 mm y los 455 CV del Quattrovalvole.',
    specs: ['V12 LONGITUDINAL 5.2L', '298 KM/H', '455 CV', '20 CAPÍTULOS'],
    topSpeed: '298 KM/H',
    power: '455 CV (QV)',
    engine: 'V12 5.2L 48V',
    units: '1.983 UNIDADES',
    chaptersCount: 20,
    image: countachImages.hero,
    imageAlt: 'Lamborghini Countach LP400 Periscopio en amarillo estudio',
    audioVisualTag: 'WEDGE DESIGN & V12 BIZZARRINI',
    blueprintCode: 'DWG-LP112-1971',
    tags: ['Puertas de Tijera', 'Periscopio', 'Pirelli P7 345mm', 'Horacio Pagani'],
  },
  {
    id: 'f40-miura',
    number: '002',
    badge: '★ MONOGRAFÍA DUAL',
    badgeColor: '#ff7173',
    country: 'italia',
    era: '80s',
    origin: 'MARANELLO & SANT’AGATA, ITALIA',
    years: '1963 — 1992',
    title: 'FERRARI F40',
    titleAccent: '& MIURA SV',
    accentColor: '#ff7173',
    borderColor: 'border-[#d92f31]/50 hover:border-[#ff7173]',
    bgCard: 'bg-[#161013]',
    description:
      'El Génesis y el Apocalipsis de la era dorada de los superdeportivos italianos. La legendaria afrenta de Enzo que impulsó el nacimiento del Miura con motor central transversal, hasta el último y visceral rugido analógico del F40 antes de morir el Commendatore.',
    specs: ['V12 ATMOSFÉRICO & V8 BITURBO', '324 KM/H', '478 CV', '20 CAPÍTULOS'],
    topSpeed: '324 KM/H',
    power: '478 CV (F40)',
    engine: 'V8 2.9L BITURBO / V12 4.0L',
    units: '1.311 (F40) / 764 (MIURA)',
    chaptersCount: 20,
    image: f40MiuraImages.f40Hero,
    imageAlt: 'Ferrari F40 y Lamborghini Miura SV',
    audioVisualTag: 'GÉNESIS Y APOCALIPSIS ANALÓGICO',
    blueprintCode: 'DWG-F120-1987',
    tags: ['Kevlar & Carbono', 'Motor Central Transversal', 'Enzo Ferrari', 'Rosso Corsa'],
  },
  {
    id: 'xj220',
    number: '001',
    badge: '★ CLÁSICO DE VELOCIDAD',
    badgeColor: '#72b9ff',
    country: 'uk',
    era: '90s',
    origin: 'BLOODHOUND & TWR, REINO UNIDO',
    years: '1992 — 1994',
    title: 'JAGUAR',
    titleAccent: 'XJ220',
    accentColor: '#72b9ff',
    borderColor: 'border-[#4ea0ff]/40 hover:border-[#72b9ff]',
    bgCard: 'bg-[#0f2338]',
    description:
      'El sueño clandestino del "Saturday Club" que nació en secreto de un grupo de ingenieros, asombró como prototipo V12 4x4, mutó a un V6 biturbo del Grupo B y conquistó el récord del mundo a 349.4 km/h en Nardò.',
    specs: ['V6 BITURBO JRV-6', '349.4 KM/H', '542 CV', '20 CAPÍTULOS'],
    topSpeed: '349.4 KM/H',
    power: '542 CV',
    engine: 'V6 3.5L BITURBO (JRV-6)',
    units: '275 UNIDADES',
    chaptersCount: 20,
    image: xj220Images.hero,
    imageAlt: 'Jaguar XJ220 Superdeportivo',
    audioVisualTag: 'SATURDAY CLUB & RÉCORD MUNDIAL NARDÒ',
    blueprintCode: 'DWG-XJ220-1992',
    tags: ['Saturday Club', 'Récord Nardò', 'V6 Grupo B Metro 6R4', 'TWR'],
  },
];

const DocCard = memo(({ doc, onNavigate, idx }: { doc: DocItem; onNavigate: (page: RoutePage) => void; idx: number }) => {
  return (
    <motion.div
      id={`doc-card-${doc.id}`}
      onClick={() => onNavigate(doc.id)}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: idx * 0.03 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative aspect-[3/4] sm:aspect-[16/10] overflow-hidden bg-[#0d1d2e] rounded-2xl cursor-pointer shadow-2xl"
    >
      {/* Background Image */}
      <img
        src={doc.image}
        alt={doc.imageAlt}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
      />
      
      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top Tags */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex gap-2">
        <span
          className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest rounded-full backdrop-blur-md"
          style={{
            backgroundColor: `${doc.badgeColor}40`,
            color: '#fff',
            border: `1px solid ${doc.badgeColor}80`
          }}
        >
          {doc.badge}
        </span>
      </div>
      
      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 flex flex-col justify-end">
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 opacity-80">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/70">
            {doc.origin}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase" style={{ color: doc.accentColor }}>
            {doc.years}
          </span>
        </div>
        
        <h2 className="text-base sm:text-2xl md:text-3xl font-black tracking-tight leading-[1.1] text-white group-hover:text-white transition-colors">
          {doc.title}{' '}
          <span style={{ color: doc.accentColor }}>
            {doc.titleAccent}
          </span>
        </h2>
        
        <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm text-white/70 line-clamp-1 sm:line-clamp-2 leading-relaxed">
          {doc.description}
        </p>
        
        {/* Footer Stats */}
        <div className="mt-3 sm:mt-5 pt-2 sm:pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-2 sm:gap-4">
            <div>
              <span className="block text-[8px] sm:text-[9px] text-white/50 uppercase tracking-widest mb-0.5">Motor</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-white/90">{doc.engine.split(' ')[0]} {doc.engine.split(' ')[1]}</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-[9px] text-white/50 uppercase tracking-widest mb-0.5">Potencia</span>
              <span className="text-[11px] font-mono text-white/90">{doc.power.split(' ')[0]} {doc.power.split(' ')[1]}</span>
            </div>
          </div>
          
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
            <span className="ml-0.5 sm:ml-1 text-[11px] sm:text-sm">▶</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export const DocumentalesPage: React.FC<DocumentalesPageProps> = ({
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenBroadcastModal,
}) => {
  const [activeTab, setActiveTab] = useState<'nuevo' | 'todos'>('nuevo');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = useMemo(() => {
    if (activeTab === 'nuevo') {
      // "NUEVO" shows all newly released documentaries
      return DOCUMENTARIES.filter((doc) => doc.isNew);
    }

    // "TODOS" shows all, with search capability
    return DOCUMENTARIES.filter((doc) => {
      if (searchQuery === '') return true;
      const q = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.titleAccent.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#070e17] text-[#edf5ff] flex flex-col justify-between selection:bg-[#ffd451] selection:text-black pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-12 md:px-28 py-3.5 sm:py-5 border-b border-[#4ea0ff]/20 bg-[#070e17]/95 backdrop-blur-md">
        <button
          id="doc-brand-logo-btn"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Logo size="md" />
        </button>

        <div className="flex items-center gap-3 sm:gap-6">
          <span className="hidden xl:inline text-[#a9c9ed] text-[10px] font-bold tracking-[0.24em] uppercase font-mono">
            ARCHIVO / 01 · CATÁLOGO COMPLETO
          </span>
          <button
            id="doc-header-home-btn"
            onClick={() => onNavigate('home')}
            className="text-[13px] font-bold tracking-[0.2em] text-[#8fb9e4] hover:text-white uppercase transition-all hover:scale-105 hidden sm:inline"
          >
            ← Inicio
          </button>
          <button
            id="doc-header-datos-btn"
            onClick={() => onNavigate('datos')}
            className="px-5 py-2.5 border border-[#ffd451]/50 bg-[#ffd451]/10 text-[#ffd451] hover:bg-[#ffd451] hover:text-black text-[12px] font-black tracking-[0.2em] uppercase transition-all rounded-lg shadow-[0_0_15px_rgba(255,212,81,0.2)] hidden sm:inline-block hover:scale-105"
          >
            Datos →
          </button>
          <button
            id="doc-header-foro-btn"
            onClick={() => onNavigate('foro')}
            className="px-5 py-2.5 border border-[#22c55e]/50 bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e] hover:text-black text-[12px] font-black tracking-[0.2em] uppercase transition-all rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.2)] hidden sm:inline-block hover:scale-105"
          >
            Foro →
          </button>
          <div className="pl-2 border-l border-white/15">
            <UserAccountNav
              onNavigate={onNavigate}
              onOpenAuthModal={onOpenAuthModal || (() => {})}
              onOpenAccountModal={onOpenAccountModal}
              onOpenBroadcastModal={onOpenBroadcastModal}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[30vh] sm:min-h-[35vh] flex items-end px-4 sm:px-12 md:px-28 py-10 sm:py-16 overflow-hidden bg-[#070e17] border-b border-[#4ea0ff]/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4ea0ff]/5 to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-[clamp(32px,6vw,80px)] font-black tracking-tight leading-[0.9] text-white">
            Explora el archivo.
          </h1>
          <p className="mt-4 max-w-xl text-[#8cb4d8] text-sm sm:text-base leading-relaxed font-light">
            Sumérgete en la historia de las máquinas que redefinieron los límites de la ingeniería. Documentales detallados con narrativa inmersiva y música original.
          </p>
        </div>
      </section>

      {/* Control Bar: Search & Interactive Filters */}
      <section className="relative z-30 px-4 sm:px-12 md:px-28 py-6 bg-[#070e17] border-b border-[#4ea0ff]/10">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          {/* Tabs: NUEVO & TODOS */}
          <div className="flex bg-white/5 rounded-full p-1 border border-white/5 self-start">
            <button
              onClick={() => {
                setActiveTab('nuevo');
                setSearchQuery(''); // Reset search when switching to NUEVO
              }}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                activeTab === 'nuevo'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              NUEVO
            </button>
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                activeTab === 'todos'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              TODOS
            </button>
          </div>

          {/* Search bar (only visible inside "TODOS" tab) */}
          {activeTab === 'todos' && (
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Buscar documental..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-xs text-white placeholder-[#5c7a99] focus:outline-none focus:border-white/30 transition-all rounded-full"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm opacity-50">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Main Catalog View */}
      <main className="flex-1 px-4 sm:px-12 md:px-28 py-6 sm:py-10 bg-[#070e17]">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center border border-white/10 bg-white/5 rounded-2xl">
            <span className="text-3xl opacity-50">🔍</span>
            <h3 className="mt-4 text-lg font-bold text-white">No se encontraron resultados</h3>
            <p className="mt-2 text-sm text-white/50">Intenta modificar el término de búsqueda.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className={activeTab === 'nuevo' ? "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto" : "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 md:gap-8"}
          >
            <AnimatePresence mode="popLayout">
              {filteredDocs.map((doc, idx) => (
                <DocCard 
                  key={doc.id} 
                  doc={doc} 
                  onNavigate={onNavigate} 
                  idx={idx} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-12 md:px-28 py-8 bg-[#04080e] text-[#7292af] text-[11px] tracking-[0.16em] border-t border-white/10 font-mono">
        <button
          id="doc-footer-back-btn"
          onClick={() => onNavigate('home')}
          className="hover:text-white transition-colors flex items-center gap-2"
        >
          <span>←</span> VOLVER A LA PORTADA
        </button>

        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          <span className="text-white font-bold tracking-widest">AUTOARCHIVE HISTORICAL MONOGRAPHS</span>
        </div>

        <button
          id="doc-footer-facts-btn"
          onClick={() => onNavigate('datos')}
          className="hover:text-[#ffd451] text-[#ffd451] transition-colors font-bold"
        >
          DATOS CURIOSOS (10 SECRETOS) →
        </button>
      </footer>
    </div>
  );
};
