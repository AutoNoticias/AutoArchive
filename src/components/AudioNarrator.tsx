import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Volume2,
  Minimize2,
  Maximize2,
  Sparkles,
  Radio,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Smartphone,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  VolumeX,
  AlertCircle,
  X,
  ListMusic,
  Music,
  Music2,
  Lock,
  Headphones,
  UserCheck,
  ShieldAlert,
  FileText,
  ArrowLeft,
  ArrowRight,
  Type,
  Disc,
} from 'lucide-react';
import { Chapter } from '../types';
import { useAuth } from '../context/AuthContext';

interface AudioNarratorProps {
  documentaryTitle: string;
  docId?: string;
  chapters: Chapter[];
  accentColor?: string;
  onChapterSelect?: (index: number) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

interface NarrationItem {
  globalIndex: number;
  chapterIndex: number;
  chapterNumber: string;
  chapterTitle: string;
  chapterSubtitle?: string;
  text: string;
  isChapterHeader: boolean;
}

function renderHighlightedText(text: string, activeCharIndex: number) {
  if (!text) return null;
  // Split by whitespace but keep the whitespace as tokens
  const parts = text.split(/(\s+)/);
  let currentPos = 0;
  
  // First, map each part to its start and end indices
  const partsWithIndices = parts.map(part => {
    const start = currentPos;
    const end = currentPos + part.length;
    currentPos = end;
    const isWord = part.length > 0 && !/^\s+$/.test(part);
    return { part, start, end, isWord };
  });

  // Now find the active word index
  // We want to find the word token that contains activeCharIndex
  let activePartIndex = -1;
  if (activeCharIndex !== null && activeCharIndex >= 0) {
    let closestIndex = -1;
    for (let i = 0; i < partsWithIndices.length; i++) {
      const p = partsWithIndices[i];
      if (p.isWord) {
        if (activeCharIndex >= p.start && activeCharIndex < p.end) {
          activePartIndex = i;
          break;
        }
        if (p.start <= activeCharIndex) {
          closestIndex = i;
        }
      }
    }
    if (activePartIndex === -1 && closestIndex !== -1) {
      activePartIndex = closestIndex;
    }
  }

  return (
    <>
      {partsWithIndices.map((p, i) => {
        if (!p.isWord) {
          return <span key={i}>{p.part}</span>;
        }
        
        const isCurrentlySpoken = i === activePartIndex;
        
        return (
          <span
            key={i}
            className={`transition-all duration-100 inline-block ${
              isCurrentlySpoken
                ? 'bg-amber-400 text-slate-950 font-black rounded px-1.5 py-0.5 shadow-[0_0_16px_rgba(251,191,36,0.95)] ring-2 ring-amber-300 scale-105 mx-0.5 z-10 relative'
                : 'text-white/85 font-medium'
            }`}
          >
            {p.part}
          </span>
        );
      })}
    </>
  );
}

interface SpeechChunk {
  text: string;
  offset: number;
  pauseAfter: number;
}

/**
 * Splits text into natural breathing chunks based on punctuation.
 * This guarantees short, natural, human-like narrator pauses on commas and periods
 * across all desktop and mobile devices.
 */
function splitIntoSpeechChunks(text: string, isMobile: boolean): SpeechChunk[] {
  const chunks: SpeechChunk[] = [];
  let currentStart = 0;
  
  // Regexp to find punctuation followed by space or end of string
  const punctRegex = /[,;:.—–!?\n]+/g;
  let match;
  
  while ((match = punctRegex.exec(text)) !== null) {
    const punct = match[0];
    const matchIndex = match.index;
    const punctEnd = matchIndex + punct.length;
    
    // Check if the punctuation is followed by space or is at the end of string, or if it's a newline
    const isAtEnd = punctEnd === text.length;
    const isFollowedBySpace = isAtEnd || /\s/.test(text.charAt(punctEnd));
    
    // Also protect decimal numbers like "3.5" or "1,2"
    const isDecimal = !isAtEnd && /^\d+$/.test(text.charAt(punctEnd)) && matchIndex > 0 && /^\d+$/.test(text.charAt(matchIndex - 1));
    
    if ((isFollowedBySpace || punct.includes('\n')) && !isDecimal) {
      // Create a chunk from currentStart to punctEnd
      const chunkText = text.substring(currentStart, punctEnd);
      
      // Determine the natural pause duration (in ms) after this punctuation
      let pauseAfter = isMobile ? 30 : 80; // default very short breathing pause
      if (punct.includes('\n')) {
        pauseAfter = isMobile ? 120 : 400; // paragraph/newline pause (much shorter on mobile as requested)
      } else if (punct.includes('.') || punct.includes('!') || punct.includes('?')) {
        pauseAfter = isMobile ? 220 : 450; // crisp period pause
      } else if (punct.includes(';') || punct.includes(':')) {
        pauseAfter = isMobile ? 80 : 250; // elegant semicolon pause
      } else if (punct.includes(',')) {
        pauseAfter = isMobile ? 40 : 180; // perfect natural short comma pause (much shorter on mobile as requested)
      } else if (punct.includes('—') || punct.includes('–') || punct.includes('-')) {
        pauseAfter = isMobile ? 40 : 150; // natural parenthetical pause
      }
      
      chunks.push({
        text: chunkText,
        offset: currentStart,
        pauseAfter
      });
      
      currentStart = punctEnd;
    }
  }
  
  // Add any remaining text as the last chunk
  if (currentStart < text.length) {
    chunks.push({
      text: text.substring(currentStart),
      offset: currentStart,
      pauseAfter: isMobile ? 20 : 50 // small ending pause
    });
  }
  
  return chunks;
}

/**
 * High-Precision Phonetic Normalizer & Prosodic Breath Engine for Documentary Audio:
 * Converts car acronyms, technical engineering metrics, legendary names, lap times,
 * and numbers into seamless natural spoken Spanish with rhythmic breath marks.
 */
function sanitizeAndPhoneticize(text: string): string {
  if (!text) return '';

  let t = text;

  // Clean unicode oddities, non-breaking spaces, curly quotes, dashes
  t = t.replace(/[\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]/g, ' ');
  t = t.replace(/[\u2018\u2019]/g, "'");
  t = t.replace(/[\u201C\u201D]/g, '"');
  t = t.replace(/[\u2013\u2014]/g, ' — ');
  t = t.replace(/•/g, ', ');

  // Remove URLs or markdown links
  t = t.replace(/https?:\/\/\S+/g, '');
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Strip emojis and non-standard symbols
  t = t.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '');

  // Strip markdown formatting symbols (*, _, #, ~, `)
  t = t.replace(/[*_~`#]/g, '');

  // Clean brackets & technical labels
  t = t.replace(/\b1\/4\s*(?:de\s*)?milla\b/gi, 'un cuarto de milla');
  t = t.replace(/\b0-100\s*km\/h\b/gi, 'de cero a cien kilómetros por hora, ');
  t = t.replace(/\b0-200\s*km\/h\b/gi, 'de cero a doscientos kilómetros por hora, ');
  t = t.replace(/\b0-60\s*mph\b/gi, 'de cero a sesenta millas por hora, ');
  t = t.replace(/\b0-100\b/g, 'cero a cien');
  t = t.replace(/\bkm\/h\b/gi, 'kilómetros por hora');
  t = t.replace(/\bmph\b/gi, 'millas por hora');
  t = t.replace(/\b(\d+)\s*cv\b/gi, '$1 caballos de potencia');
  t = t.replace(/\b(\d+)\s*hp\b/gi, '$1 caballos de potencia');
  t = t.replace(/\b(\d+)\s*bhp\b/gi, '$1 caballos de potencia');
  t = t.replace(/\b(\d+)\s*rpm\b/gi, '$1 revoluciones por minuto');
  t = t.replace(/\b(\d+)\s*nm\b/gi, '$1 newton metro');
  t = t.replace(/\b(\d+)\s*kg\b/gi, '$1 kilogramos');
  t = t.replace(/\b(\d+)\s*cm3\b/gi, '$1 centímetros cúbicos');
  t = t.replace(/\b(\d+)\s*cc\b/gi, '$1 centímetros cúbicos');
  t = t.replace(/%/g, ' por ciento');
  t = t.replace(/°C/gi, ' grados centígrados');

  // Engine Displacements
  t = t.replace(/\b7\.0\s*L\b/gi, 'siete litros');
  t = t.replace(/\b5\.0\s*L\b/gi, 'cinco litros');
  t = t.replace(/\b5\.2\s*L\b/gi, 'cinco punto dos litros');
  t = t.replace(/\b5\.4\s*L\b/gi, 'cinco punto cuatro litros');
  t = t.replace(/\b5\.8\s*L\b/gi, 'cinco punto ocho litros');
  t = t.replace(/\b6\.2\s*L\b/gi, 'seis punto dos litros');
  t = t.replace(/\b3\.0\s*L\b/gi, 'tres litros');
  t = t.replace(/\b2\.6\s*L\b/gi, 'dos punto seis litros');
  t = t.replace(/\b3\.2\s*L\b/gi, 'tres punto dos litros');
  t = t.replace(/\b3\.5\s*L\b/gi, 'tres punto cinco litros');
  t = t.replace(/\b3\.8\s*L\b/gi, 'tres punto ocho litros');

  // Cubic Inches
  t = t.replace(/\b302\s*ci\b/gi, 'trescientas dos pulgadas cúbicas');
  t = t.replace(/\b350\s*ci\b/gi, 'trescientas cincuenta pulgadas cúbicas');
  t = t.replace(/\b396\s*ci\b/gi, 'trescientas noventa y seis pulgadas cúbicas');
  t = t.replace(/\b427\s*ci\b/gi, 'cuatrocientas veintisiete pulgadas cúbicas');
  t = t.replace(/\b428\s*ci\b/gi, 'cuatrocientas veintiocho pulgadas cúbicas');
  t = t.replace(/\b429\s*ci\b/gi, 'cuatrocientas veintinueve pulgadas cúbicas');
  t = t.replace(/\b454\s*ci\b/gi, 'cuatrocientas cincuenta y cuatro pulgadas cúbicas');
  t = t.replace(/\bci\b/g, ' pulgadas cúbicas');

  // Lap Times (e.g. 7:16.04)
  t = t.replace(/\b7:16\.04\b/g, 'siete minutos, dieciséis segundos y cuatro centésimas');
  t = t.replace(/\b7:29\.60\b/g, 'siete minutos, veintinueve segundos y sesenta centésimas');
  t = t.replace(/\b(\d+):(\d{2})\.(\d+)\b/g, '$1 minutos, $2 segundos con $3 centésimas');

  // Specific Car Models & Iconic Automotive Names
  t = t.replace(/\bF40\b/g, 'F cuarenta');
  t = t.replace(/\bF50\b/g, 'F cincuenta');
  t = t.replace(/\bR34\b/gi, 'R treinta y cuatro');
  t = t.replace(/\bR33\b/gi, 'R treinta y tres');
  t = t.replace(/\bR32\b/gi, 'R treinta y dos');
  t = t.replace(/\b787B\b/gi, 'Siete ochenta y siete B');
  t = t.replace(/\bNSX-R\b/gi, 'N S X - R');
  t = t.replace(/\bNSX\b/gi, 'N S X');
  t = t.replace(/\bGT-R\b/gi, 'G T R');
  t = t.replace(/\bGTR\b/gi, 'G T R');
  t = t.replace(/\bXJ220\b/gi, 'X J doscientos veinte');
  t = t.replace(/\bZ\/28\b/gi, 'Z veintiocho');
  t = t.replace(/\bZ28\b/gi, 'Z veintiocho');
  t = t.replace(/\bZL-1\b/gi, 'Z L uno');
  t = t.replace(/\bZL1 1LE\b/gi, 'Z L uno, uno L E');
  t = t.replace(/\bZL1\b/gi, 'Z L uno');
  t = t.replace(/\b1LE\b/gi, 'uno L E');
  t = t.replace(/\bBoss 302\b/gi, 'Boss trescientos dos');
  t = t.replace(/\bBoss 429\b/gi, 'Boss cuatrocientos veintinueve');
  t = t.replace(/\bMach 1\b/gi, 'Mach uno');
  t = t.replace(/\bCOPO 9560\b/gi, 'Copo nueve mil quinientos sesenta');
  t = t.replace(/\bCOPO\b/gi, 'Copo');
  t = t.replace(/\bIROC-Z\b/gi, 'Áirok Z');
  t = t.replace(/\bSVT Cobra\b/gi, 'S V T Cobra');
  t = t.replace(/\bGT350R\b/gi, 'G T trescientos cincuenta R');
  t = t.replace(/\bGT350\b/gi, 'G T trescientos cincuenta');
  t = t.replace(/\bGT500\b/gi, 'G T quinientos');
  t = t.replace(/\bLS1\b/gi, 'L S uno');
  t = t.replace(/\bLS3\b/gi, 'L S tres');
  t = t.replace(/\bLS7\b/gi, 'L S siete');
  t = t.replace(/\bLT1\b/gi, 'L T uno');
  t = t.replace(/\bLT4\b/gi, 'L T cuatro');
  t = t.replace(/\bLT6\b/gi, 'L T seis');
  t = t.replace(/\bTrans-Am\b/gi, 'Trans-Am');
  t = t.replace(/\bSCCA\b/gi, 'S C C A');
  t = t.replace(/\bDSSV\b/gi, 'D S S V');
  t = t.replace(/\bCFM\b/gi, 'C F M');
  t = t.replace(/\bTremec\b/gi, 'Trémec');
  t = t.replace(/\bHolley\b/gi, 'Jóley');
  t = t.replace(/\bRochester Quadrajet\b/gi, 'Róchester Cuadrayet');
  t = t.replace(/\bMuncie M22\b/gi, 'Mansi M veintidós');
  t = t.replace(/\bToploader\b/gi, 'Tóploader');
  t = t.replace(/\bBrembo\b/gi, 'Brembo');
  t = t.replace(/\bMultimatic\b/gi, 'Multimatic');
  t = t.replace(/\bNürburgring Nordschleife\b/gi, 'Nürburgring Nordschleife');
  t = t.replace(/\bNürburgring\b/gi, 'Nürburgring');

  // Key Personalities
  t = t.replace(/\bCarroll Shelby\b/gi, 'Cárrol Shélby');
  t = t.replace(/\bShelby\b/gi, 'Shélby');
  t = t.replace(/\bLee Iacocca\b/gi, 'Lí Iacóca');
  t = t.replace(/\bJohn DeLorean\b/gi, 'Yon De Lórian');
  t = t.replace(/\bZora Arkus-Duntov\b/gi, 'Zora Árkus Dúntov');
  t = t.replace(/\bParnelli Jones\b/gi, 'Parnéli Yóns');
  t = t.replace(/\bMark Donohue\b/gi, 'Mark Dónohiu');
  t = t.replace(/\bRoger Penske\b/gi, 'Róyer Pénske');
  t = t.replace(/\bBud Moore\b/gi, 'Bad Mur');
  t = t.replace(/\bPete Estes\b/gi, 'Pit Éstes');
  t = t.replace(/\bAyrton Senna\b/gi, 'Áirton Séna');
  t = t.replace(/\bGordon Murray\b/gi, 'Górdon Mórrei');
  t = t.replace(/\bEnzo Ferrari\b/gi, 'Énzo Ferrári');
  t = t.replace(/\bFerruccio Lamborghini\b/gi, 'Ferrúcho Lamborguíni');

  // Decades and years pronunciation
  t = t.replace(/\b1960\b/g, 'mil novecientos sesenta');
  t = t.replace(/\b1964\b/g, 'mil novecientos sesenta y cuatro');
  t = t.replace(/\b1965\b/g, 'mil novecientos sesenta y cinco');
  t = t.replace(/\b1966\b/g, 'mil novecientos sesenta y seis');
  t = t.replace(/\b1967\b/g, 'mil novecientos sesenta y siete');
  t = t.replace(/\b1968\b/g, 'mil novecientos sesenta y ocho');
  t = t.replace(/\b1969\b/g, 'mil novecientos sesenta y nueve');
  t = t.replace(/\b1970\b/g, 'mil novecientos setenta');
  t = t.replace(/\b1971\b/g, 'mil novecientos setenta y uno');
  t = t.replace(/\b1973\b/g, 'mil novecientos setenta y tres');
  t = t.replace(/\b1974\b/g, 'mil novecientos setenta y cuatro');
  t = t.replace(/\b1978\b/g, 'mil novecientos setenta y ocho');
  t = t.replace(/\b1979\b/g, 'mil novecientos setenta y nueve');
  t = t.replace(/\b1980\b/g, 'mil novecientos ochenta');
  t = t.replace(/\b1982\b/g, 'mil novecientos ochenta y dos');
  t = t.replace(/\b1985\b/g, 'mil novecientos ochenta y cinco');
  t = t.replace(/\b1986\b/g, 'mil novecientos ochenta y seis');
  t = t.replace(/\b1987\b/g, 'mil novecientos ochenta y siete');
  t = t.replace(/\b1989\b/g, 'mil novecientos ochenta y nueve');
  t = t.replace(/\b1990\b/g, 'mil novecientos noventa');
  t = t.replace(/\b1991\b/g, 'mil novecientos noventa y uno');
  t = t.replace(/\b1992\b/g, 'mil novecientos noventa y dos');
  t = t.replace(/\b1993\b/g, 'mil novecientos noventa y tres');
  t = t.replace(/\b1994\b/g, 'mil novecientos noventa y cuatro');
  t = t.replace(/\b1995\b/g, 'mil novecientos noventa y cinco');
  t = t.replace(/\b1996\b/g, 'mil novecientos noventa y seis');
  t = t.replace(/\b1998\b/g, 'mil novecientos noventa y ocho');
  t = t.replace(/\b1999\b/g, 'mil novecientos noventa y nueve');
  t = t.replace(/\b2000\b/g, 'dos mil');
  t = t.replace(/\b2002\b/g, 'dos mil dos');
  t = t.replace(/\b2003\b/g, 'dos mil tres');
  t = t.replace(/\b2004\b/g, 'dos mil cuatro');
  t = t.replace(/\b2005\b/g, 'dos mil cinco');
  t = t.replace(/\b2006\b/g, 'dos mil seis');
  t = t.replace(/\b2007\b/g, 'dos mil siete');
  t = t.replace(/\b2008\b/g, 'dos mil ocho');
  t = t.replace(/\b2009\b/g, 'dos mil nueve');
  t = t.replace(/\b2010\b/g, 'dos mil diez');
  t = t.replace(/\b2011\b/g, 'dos mil once');
  t = t.replace(/\b2012\b/g, 'dos mil doce');
  t = t.replace(/\b2013\b/g, 'dos mil trece');
  t = t.replace(/\b2014\b/g, 'dos mil catorce');
  t = t.replace(/\b2015\b/g, 'dos mil quince');
  t = t.replace(/\b2018\b/g, 'dos mil dieciocho');
  t = t.replace(/\b2019\b/g, 'dos mil diecinueve');
  t = t.replace(/\b2020\b/g, 'dos mil veinte');
  t = t.replace(/\b2021\b/g, 'dos mil veintiuno');
  t = t.replace(/\b2022\b/g, 'dos mil veintidós');
  t = t.replace(/\b2023\b/g, 'dos mil veintitrés');
  t = t.replace(/\b2024\b/g, 'dos mil veinticuatro');
  t = t.replace(/\b2025\b/g, 'dos mil veinticinco');

  // Engines & vehicle models phonetics
  t = t.replace(/\bV12\b/g, 'V doce');
  t = t.replace(/\bV10\b/g, 'V diez');
  t = t.replace(/\bV8\b/g, 'V ocho');
  t = t.replace(/\bV6\b/g, 'V seis');
  t = t.replace(/\bI6\b/g, 'seis cilindros en línea');
  t = t.replace(/\b4WD\b/gi, 'tracción cuatro por cuatro');
  t = t.replace(/\bAWD\b/gi, 'tracción a las cuatro ruedas');
  t = t.replace(/\bRWD\b/gi, 'tracción trasera');
  t = t.replace(/\bFWD\b/gi, 'tracción delantera');
  t = t.replace(/\b2JZ-GTE\b/gi, 'dos J Z G T E');
  t = t.replace(/\b2JZ\b/gi, 'dos J Z');
  t = t.replace(/\bRB26DETT\b/gi, 'R B veintiséis D E T T');
  t = t.replace(/\bRB26\b/gi, 'R B veintiséis');
  t = t.replace(/\bATTESA\b/gi, 'A T E S A');
  t = t.replace(/\bHICAS\b/gi, 'H I C A S');
  t = t.replace(/\bVTEC\b/gi, 'V-Tec');
  t = t.replace(/\bR26B\b/gi, 'R veintiséis B');
  t = t.replace(/\bNA1\b/gi, 'N A uno');
  t = t.replace(/\bNA2\b/gi, 'N A dos');
  t = t.replace(/\bA80\b/gi, 'A ochenta');
  t = t.replace(/\bSV\b/g, 'S V');
  t = t.replace(/\bLP400\b/gi, 'L P cuatrocientos');
  t = t.replace(/\bLP500\b/gi, 'L P quinientos');
  t = t.replace(/\bLM\b/g, 'Le Mans');
  t = t.replace(/\bvs\.?\b/gi, 'versus');
  t = t.replace(/\/\//g, ', ');

  // Insert natural breath spaces around punctuation
  t = t.replace(/:/g, ': ');
  t = t.replace(/;/g, '; ');

  // Clean double spaces and trim
  return t.replace(/\s+/g, ' ').trim();
}

/**
 * Mobile Hardware Audio Session Unlocker & Background Keep-Alive
 * Uses a silent audio loop to guarantee continuous OS background execution for 
 * Web Speech API and Web Audio API even when the phone screen is off.
 */
let globalAudioCtx: AudioContext | null = null;
function unlockMobileAudioSubsystem() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      if (!globalAudioCtx) {
        globalAudioCtx = new AudioContextClass();
      }
      if (globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume();
      }
      const osc = globalAudioCtx.createOscillator();
      const gain = globalAudioCtx.createGain();
      gain.gain.value = 0.00001; // Inaudible to human ear
      osc.connect(gain);
      gain.connect(globalAudioCtx.destination);
      osc.start();
      osc.stop(globalAudioCtx.currentTime + 0.04);
    }
  } catch {
    // Non-fatal
  }
}

/**
 * Cinematic Ambient Soundtrack Synthesizer with Slow Documentary Rhythm
 * Generates a warm, atmospheric documentary soundtrack featuring:
 * - Lush sustained Dorian/Dm9 orchestral strings & harmonic pads
 * - Slow, cinematic rhythm (~64 BPM): deep sub-bass heartbeat kick, soft acoustic shaker/rim groove, and melodic bass pulses
 * - Web Audio lookahead sequencer for 100% rock-solid, drift-free timing
 * - Runs seamlessly and continuously throughout the entire narration
 */
class AmbientDocumentarySynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private padGain: GainNode | null = null;
  private rhythmGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isRunning = false;
  private currentVolume = 80; // 80% by default

  // Rhythm Sequencer properties (68 BPM cinematic groove with rich rhythm & melody)
  private currentThemeKey = 'default';
  private tempo = 68;
  private stepInterval = (60 / 68) / 4; // 16th note step interval (~0.220s) for fluid rhythmic beat
  private currentStep = 0;
  private nextStepTime = 0;
  private scheduleAheadTime = 0.15; // 150ms lookahead
  private timerId: number | null = null;

  // Profiles mapping: tempo, root frequencies, arpeggios, filter cutoff, rhythm style
  private themes: Record<string, {
    tempo: number;
    roots: number[];
    chords: number[][];
    filterCutoff: number;
    bassType: OscillatorType;
    kickPitchStart: number;
    rhythmPattern: 'epic' | 'ambient' | 'synthwave' | 'minimal' | 'cinematic';
  }> = {
    'jdm': {
      tempo: 100,
      roots: [65.41, 73.42, 55.0, 82.41],
      chords: [
        [130.81, 196.0, 261.63, 329.63, 392.0, 523.25],
        [146.83, 220.0, 293.66, 349.23, 440.0, 587.33],
        [110.0, 164.81, 220.0, 261.63, 329.63, 440.0],
        [164.81, 246.94, 329.63, 392.0, 493.88, 659.25]
      ],
      filterCutoff: 1200,
      bassType: 'sawtooth',
      kickPitchStart: 160,
      rhythmPattern: 'synthwave'
    },
    'supercars': {
      tempo: 92,
      roots: [73.42, 98.0, 82.41, 65.41],
      chords: [
        [146.83, 220.0, 293.66, 369.99, 440.0, 587.33],
        [196.0, 293.66, 392.0, 493.88, 587.33, 783.99],
        [164.81, 246.94, 329.63, 392.0, 493.88, 659.25],
        [130.81, 196.0, 261.63, 329.63, 392.0, 523.25]
      ],
      filterCutoff: 1000,
      bassType: 'sawtooth',
      kickPitchStart: 150,
      rhythmPattern: 'cinematic'
    },
    'classic': {
      tempo: 62,
      roots: [73.42, 87.31, 65.41, 58.27],
      chords: [
        [146.83, 220.0, 261.63, 349.23, 440.0, 523.25],
        [174.61, 220.0, 261.63, 349.23, 392.0, 523.25],
        [130.81, 196.0, 261.63, 329.63, 392.0, 523.25],
        [116.54, 174.61, 233.08, 293.66, 349.23, 466.16]
      ],
      filterCutoff: 550,
      bassType: 'triangle',
      kickPitchStart: 130,
      rhythmPattern: 'ambient'
    },
    'rally': {
      tempo: 88,
      roots: [55.0, 65.41, 73.42, 49.0],
      chords: [
        [110.0, 164.81, 220.0, 277.18, 329.63, 440.0],
        [130.81, 196.0, 261.63, 311.13, 392.0, 523.25],
        [146.83, 220.0, 293.66, 349.23, 440.0, 587.33],
        [98.0, 146.83, 196.0, 246.94, 293.66, 392.0]
      ],
      filterCutoff: 900,
      bassType: 'sawtooth',
      kickPitchStart: 155,
      rhythmPattern: 'epic'
    },
    'default': {
      tempo: 72,
      roots: [73.42, 82.41, 65.41, 73.42],
      chords: [
        [146.83, 220.0, 293.66, 349.23, 440.0, 587.33],
        [164.81, 246.94, 329.63, 392.0, 493.88, 659.25],
        [130.81, 196.0, 261.63, 329.63, 392.0, 523.25],
        [146.83, 220.0, 293.66, 349.23, 440.0, 587.33]
      ],
      filterCutoff: 700,
      bassType: 'triangle',
      kickPitchStart: 140,
      rhythmPattern: 'minimal'
    }
  };

  public setThemeForDocumentary(title: string) {
    const t = (title || '').toLowerCase();
    if (t.includes('nissan') || t.includes('gt-r') || t.includes('jdm') || t.includes('skyline') || t.includes('supra') || t.includes('rx-7') || t.includes('japoneses')) {
      this.currentThemeKey = 'jdm';
    } else if (t.includes('mclaren') || t.includes('ferrari') || t.includes('porsche') || t.includes('bugatti') || t.includes('superauto') || t.includes('lambo')) {
      this.currentThemeKey = 'supercars';
    } else if (t.includes('rally') || t.includes('grupo b') || t.includes('group b') || t.includes('quattro') || t.includes('terreno')) {
      this.currentThemeKey = 'rally';
    } else if (t.includes('le mans') || t.includes('classic') || t.includes('vintage') || t.includes('historico') || t.includes('leyendas')) {
      this.currentThemeKey = 'classic';
    } else {
      this.currentThemeKey = 'default';
    }

    const theme = this.themes[this.currentThemeKey] || this.themes['default'];
    this.tempo = theme.tempo;
    this.stepInterval = (60 / this.tempo) / 4;
    this.rootFreqs = theme.roots;
    this.arpeggioChords = theme.chords;
  }

  // 4-Bar Cinematic Harmonic Progression: Dm -> F -> C -> Bb
  // Root frequencies for sub & bass (D2, F2, C2, Bb1)
  private rootFreqs = [73.42, 87.31, 65.41, 58.27];
  // Melodic arpeggio chord note matrices for documentary soundtrack vibe
  private arpeggioChords = [
    [146.83, 220.0, 261.63, 349.23, 440.0, 523.25], // Dm (D3, A3, C4, F4, A4, C5)
    [174.61, 220.0, 261.63, 349.23, 392.0, 523.25], // F  (F3, A3, C4, F4, G4, C5)
    [130.81, 196.0, 261.63, 329.63, 392.0, 523.25], // C  (C3, G3, C4, E4, G4, C5)
    [116.54, 174.61, 233.08, 293.66, 349.23, 466.16], // Bb (Bb2, F3, Bb3, D4, F4, Bb4)
  ];

  public init() {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass && !this.ctx) {
        this.ctx = new AudioContextClass();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch {
      // Non-fatal
    }
  }

  private getGain(val: number): number {
    const pct = val > 1 ? val / 100 : val;
    const clamped = Math.max(0.02, Math.min(1.0, pct));
    return clamped * 0.12; // Subtle ambient backdrop so narration voice is 100% clear
  }

  public start(volume = 90) {
    this.init();
    if (!this.ctx) return;
    this.currentVolume = volume;

    if (this.isRunning) {
      this.setVolume(volume);
      return;
    }

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const targetGain = this.getGain(this.currentVolume);

      // 1. Master output gain with smooth 1.0s fade-in
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.00001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(
        Math.max(0.0001, targetGain),
        now + 1.0
      );

      // 2. Dynamic multi-band compression for pristine mix punch
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-20, now);
      this.compressor.knee.setValueAtTime(10, now);
      this.compressor.ratio.setValueAtTime(3.5, now);
      this.compressor.attack.setValueAtTime(0.02, now);
      this.compressor.release.setValueAtTime(0.2, now);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      // 3. Sub-mix gain busses for Pads and Rhythm
      this.padGain = this.ctx.createGain();
      this.padGain.gain.setValueAtTime(0.55, now);

      this.rhythmGain = this.ctx.createGain();
      this.rhythmGain.gain.setValueAtTime(1.0, now);

      // 4. Lowpass cinematic filter for atmospheric harmonic background
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(620, now);
      this.filter.Q.setValueAtTime(1.2, now);

      this.padGain.connect(this.filter);
      this.filter.connect(this.masterGain);
      this.rhythmGain.connect(this.masterGain);

      // 5. Breathing LFO for organic pad modulation
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.09, now);
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(180, now);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      // 6. Warm harmonic chords under the rhythm
      const chord = [
        { freq: 73.42, type: 'sine' as OscillatorType, gain: 0.32, detune: -3, pan: 0 },
        { freq: 110.0, type: 'triangle' as OscillatorType, gain: 0.25, detune: 2, pan: -0.3 },
        { freq: 146.83, type: 'sine' as OscillatorType, gain: 0.22, detune: -4, pan: 0.3 },
        { freq: 220.0, type: 'sine' as OscillatorType, gain: 0.18, detune: -2, pan: 0.4 },
        { freq: 293.66, type: 'triangle' as OscillatorType, gain: 0.14, detune: 3, pan: -0.4 },
      ];

      this.oscillators = [];

      chord.forEach((item) => {
        if (!this.ctx || !this.padGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = item.type;
        osc.frequency.setValueAtTime(item.freq, now);
        osc.detune.setValueAtTime(item.detune, now);
        g.gain.setValueAtTime(item.gain, now);

        if (typeof this.ctx.createStereoPanner === 'function' && item.pan !== 0) {
          try {
            const panner = this.ctx.createStereoPanner();
            panner.pan.setValueAtTime(item.pan, now);
            osc.connect(g);
            g.connect(panner);
            panner.connect(this.padGain);
          } catch {
            osc.connect(g);
            g.connect(this.padGain);
          }
        } else {
          osc.connect(g);
          g.connect(this.padGain);
        }

        osc.start();
        this.oscillators.push(osc);
      });

      // 7. Start the rhythm & beat engine
      this.currentStep = 0;
      this.nextStepTime = now + 0.05;
      this.isRunning = true;

      this.startRhythmScheduler();
    } catch (err) {
      console.warn('Ambient synth audio init error:', err);
    }
  }

  // Lookahead step scheduler for accurate, glitch-free rhythmic pulse (16th-note resolution)
  private startRhythmScheduler() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    this.timerId = window.setInterval(() => {
      if (!this.isRunning || !this.ctx) return;
      while (this.nextStepTime < this.ctx.currentTime + this.scheduleAheadTime) {
        this.scheduleRhythmStep(this.currentStep, this.nextStepTime);
        this.nextStepTime += this.stepInterval;
        this.currentStep = (this.currentStep + 1) % 64; // 4-bar loop (64 16th-note steps)
      }
    }, 25);
  }

  // Multi-layered rhythmic soundtrack: Kick drum, Snare/Clap, Hi-Hats groove, Bassline & Melodic synth pluck
  private scheduleRhythmStep(step: number, time: number) {
    if (!this.ctx || !this.rhythmGain) return;

    const stepInBar = step % 16; // 0 to 15 (16 sixteenth notes per bar)
    const barIndex = Math.floor(step / 16) % 4; // 0 to 3 (4 bars progression)
    const root = this.rootFreqs[barIndex] || 73.42;

    // 1. PUNCHY KICK DRUM: Strong rhythmic beats on 1 and 3 (step 0 and step 8), with occasional syncopated ghost kick on step 10
    if (stepInBar === 0) {
      this.playKick(time, 1.0);
    } else if (stepInBar === 8) {
      this.playKick(time, 0.88);
    } else if (stepInBar === 10 || (barIndex === 3 && stepInBar === 14)) {
      this.playKick(time, 0.65);
    }

    // 2. CRISP DOCUMENTARY SNARE / RIM CLAP: Hits on Backbeats 2 and 4 (step 4 and step 12)
    if (stepInBar === 4 || stepInBar === 12) {
      this.playSnare(time, stepInBar === 4 ? 0.85 : 0.95);
    }

    // 3. HI-HAT GROOVE: Consistent 8th notes and 16th syncopations with dynamic accents
    if (stepInBar % 2 === 0) {
      // Downbeat 8ths (accented on offbeats)
      const isOffbeat = stepInBar % 4 === 2;
      this.playHiHat(time, isOffbeat ? 0.7 : 0.45, isOffbeat ? 0.08 : 0.04);
    } else if (stepInBar === 7 || stepInBar === 11 || stepInBar === 15) {
      // 16th-note swing ghost taps
      this.playHiHat(time, 0.35, 0.03);
    }

    // 4. DRIVING BASSLINE: Punchy bass groove synced to the beat
    if (stepInBar === 0 || stepInBar === 3 || stepInBar === 6 || stepInBar === 8 || stepInBar === 11 || stepInBar === 14) {
      let freq = root;
      if (stepInBar === 6) freq = root * 1.5; // 5th note jump
      if (stepInBar === 11) freq = root * 1.334; // 4th note
      if (stepInBar === 14) freq = root * 1.2; // Minor 3rd note
      this.playBassNote(time, freq, stepInBar === 0 ? 0.85 : 0.65);
    }

    // 5. CINEMATIC MELODIC PLUCK / ARPEGGIO: Melodic synth motif giving real musical motion
    if (stepInBar % 2 === 1 || stepInBar === 0 || stepInBar === 4 || stepInBar === 8 || stepInBar === 12) {
      const chordNotes = this.arpeggioChords[barIndex] || this.arpeggioChords[0];
      const noteIdx = (stepInBar * 3) % chordNotes.length;
      const noteFreq = chordNotes[noteIdx];
      const pan = (stepInBar % 4 === 0) ? -0.3 : (stepInBar % 4 === 2) ? 0.3 : 0;
      this.playMelodicPluck(time, noteFreq, 0.45, pan);
    }
  }

  // Punchy Acoustic/Electronic Kick Drum
  private playKick(time: number, velocity: number) {
    if (!this.ctx || !this.rhythmGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Fast pitch sweep from 145Hz down to 42Hz for punchy transient + deep body
      osc.frequency.setValueAtTime(145, time);
      osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.72 * velocity, time + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.36);

      osc.connect(gain);
      gain.connect(this.rhythmGain);

      osc.start(time);
      osc.stop(time + 0.38);
    } catch {}
  }

  // Crisp Snare / Rim Clap (White noise + resonant tone body)
  private playSnare(time: number, velocity: number) {
    if (!this.ctx || !this.rhythmGain) return;
    try {
      // Noise burst for snap
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1200, time);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, time);
      noiseGain.gain.linearRampToValueAtTime(0.38 * velocity, time + 0.004);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.rhythmGain);

      // Tonal body
      const bodyOsc = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      bodyOsc.type = 'triangle';
      bodyOsc.frequency.setValueAtTime(210, time);
      bodyOsc.frequency.exponentialRampToValueAtTime(110, time + 0.08);

      bodyGain.gain.setValueAtTime(0.0001, time);
      bodyGain.gain.linearRampToValueAtTime(0.32 * velocity, time + 0.005);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(this.rhythmGain);

      noise.start(time);
      noise.stop(time + 0.17);
      bodyOsc.start(time);
      bodyOsc.stop(time + 0.14);
    } catch {}
  }

  // Crisp Hi-Hat Cymbal
  private playHiHat(time: number, velocity: number, duration: number) {
    if (!this.ctx || !this.rhythmGain) return;
    try {
      const bufferSize = Math.max(256, Math.floor(this.ctx.sampleRate * duration));
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7500, time);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.24 * velocity, time + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.rhythmGain);

      noise.start(time);
      noise.stop(time + duration + 0.01);
    } catch {}
  }

  // Warm Melodic Bassline
  private playBassNote(time: number, freq: number, velocity: number) {
    if (!this.ctx || !this.rhythmGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, time);
      filter.frequency.exponentialRampToValueAtTime(140, time + 0.22);
      filter.Q.setValueAtTime(2.0, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.42 * velocity, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.32);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.rhythmGain);

      osc.start(time);
      osc.stop(time + 0.35);
    } catch {}
  }

  // Melodic Synth Pluck / Arpeggio
  private playMelodicPluck(time: number, freq: number, velocity: number, pan: number) {
    if (!this.ctx || !this.rhythmGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, time);
      filter.frequency.exponentialRampToValueAtTime(450, time + 0.25);
      filter.Q.setValueAtTime(1.5, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.28 * velocity, time + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);

      osc.connect(filter);
      filter.connect(gain);

      if (typeof this.ctx.createStereoPanner === 'function' && pan !== 0) {
        try {
          const panner = this.ctx.createStereoPanner();
          panner.pan.setValueAtTime(pan, time);
          gain.connect(panner);
          panner.connect(this.rhythmGain);
        } catch {
          gain.connect(this.rhythmGain);
        }
      } else {
        gain.connect(this.rhythmGain);
      }

      osc.start(time);
      osc.stop(time + 0.3);
    } catch {}
  }

  public stop() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;
    try {
      if (this.timerId !== null) {
        window.clearInterval(this.timerId);
        this.timerId = null;
      }

      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(Math.max(0.00001, this.masterGain.gain.value), now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.8);

      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        if (this.lfo) {
          try {
            this.lfo.stop();
            this.lfo.disconnect();
          } catch {}
        }
        this.oscillators = [];
        this.lfo = null;
        this.isRunning = false;
      }, 850);
    } catch {
      this.isRunning = false;
    }
  }

  public setVolume(vol: number) {
    this.currentVolume = vol;
    if (this.masterGain && this.ctx && this.isRunning) {
      try {
        const now = this.ctx.currentTime;
        const targetGain = this.getGain(vol);
        this.masterGain.gain.setValueAtTime(Math.max(0.00001, this.masterGain.gain.value), now);
        this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetGain), now + 0.25);
      } catch {}
    }
  }

  // Dynamic Audio Ducking: Smoothly reduces ambient music during spoken speech and restores it in pauses
  public duckAudio(isSpeaking: boolean) {
    if (!this.masterGain || !this.ctx || !this.isRunning) return;
    try {
      const now = this.ctx.currentTime;
      const baseGain = this.getGain(this.currentVolume);
      const targetGain = isSpeaking ? baseGain * 0.70 : baseGain;
      this.masterGain.gain.setValueAtTime(Math.max(0.00001, this.masterGain.gain.value), now);
      this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetGain), now + 0.35);
    } catch {}
  }

  // Cinematic Intro Bell / Chime: Soft acoustic harmonic chord before speech starts
  public playIntroChime() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const chimeGain = this.ctx.createGain();
      chimeGain.gain.setValueAtTime(0.0001, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.07, now + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      chimeGain.connect(this.ctx.destination);

      // Warm harmonic chord: D4 (293.66Hz), A4 (440Hz), F5 (698.46Hz)
      const chord = [293.66, 440.0, 698.46];
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        osc.connect(chimeGain);
        osc.start(now + idx * 0.07);
        osc.stop(now + 1.2);
      });
    } catch {}
  }

  // Harmonic Swell for Chapter Transitions
  public playTransitionChime() {
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const tGain = this.ctx.createGain();
      tGain.gain.setValueAtTime(0.0001, now);
      tGain.gain.exponentialRampToValueAtTime(0.05, now + 0.15);
      tGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
      tGain.connect(this.ctx.destination);

      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220.0, now);
      osc.frequency.exponentialRampToValueAtTime(440.0, now + 0.8);
      osc.connect(tGain);
      osc.start(now);
      osc.stop(now + 1.4);
    } catch {}
  }
}

const ambientSynth = new AmbientDocumentarySynth();

// Format voice option with clear region, natural engine badge, and gender label
const getVoiceLabel = (v: SpeechSynthesisVoice): string => {
  const name = (v.name || '').toLowerCase();
  const lang = (v.lang || '').toLowerCase().replace('_', '-');
  const femaleMarkers = [
    'monica',
    'mónica',
    'paulina',
    'angelica',
    'angélica',
    'paloma',
    'lucia',
    'lucía',
    'carmen',
    'laura',
    'soledad',
    'sofia',
    'sofía',
    'helena',
    'elena',
    'conchita',
    'penelope',
    'penélope',
    'victoria',
    'valeria',
    'marina',
    'alva',
    'damaris',
    'marisol',
    'francisca',
    'ximena',
    'lola',
    'clara',
    'isabel',
    'catalina',
    'valentina',
    'camila',
    'daniela',
    'elvira',
    'irene',
    'sabina',
    'female',
    'mujer',
    'femenin',
    'femenina',
    'eea',
    'eeb',
    'sfa',
    'sfb',
    'voice 2',
    'voz 2',
  ];
  const isFemale = femaleMarkers.some((f) => name.includes(f));
  const isSpain =
    lang === 'es-es' ||
    lang.includes('es-es') ||
    name.includes('españa') ||
    name.includes('spain') ||
    name.includes('(spain)');
  const isNatural =
    name.includes('natural') ||
    name.includes('neural') ||
    name.includes('online') ||
    name.includes('enhanced') ||
    name.includes('premium') ||
    name.includes('google') ||
    name.includes('apple') ||
    name.includes('wavenet');

  const flag = isSpain ? '🇪🇸' : lang.includes('mx') ? '🇲🇽' : lang.includes('us') ? '🇺🇸' : '🌎';
  const qualityBadge = isNatural ? ' ⭐ [Voz Natural HD]' : '';
  const regionTag = isSpain ? 'es-ES (España)' : v.lang;
  const genderTag = isFemale ? '👩 Locutora' : '👨 Locutor';

  return `${flag} ${genderTag} [${regionTag}]${qualityBadge} - ${v.name}`;
};

// Global reference array to prevent JS garbage collection from destroying active utterance objects on mobile
declare global {
  interface Window {
    __audioNarratorUtterancePool?: SpeechSynthesisUtterance[];
  }
}

export const AudioNarrator: React.FC<AudioNarratorProps> = ({
  documentaryTitle,
  docId,
  chapters,
  accentColor = '#e62628',
  onChapterSelect,
  onOpenAuthModal,
}) => {
  const { user } = useAuth();
  const userRef = useRef(user);
  userRef.current = user;

  const [showPodcastLockModal, setShowPodcastLockModal] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);
  const [rate, setRate] = useState<number>(1.2);
  const [pitch, setPitch] = useState<number>(1.0); // 1.0: Native natural voice timbre (no digital pitch distortion)
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('male');
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [testSoundState, setTestSoundState] = useState<'idle' | 'testing' | 'success'>('idle');
  const [spokenCharIndex, setSpokenCharIndex] = useState<number>(-1);

  const requireAuthForPodcast = useCallback((): boolean => {
    if (!userRef.current) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setIsPaused(false);
      isPlayingRef.current = false;
      isPausedRef.current = false;
      ambientSynth.stop();
            setShowPodcastLockModal(true);
      return false;
    }
    return true;
  }, []);

  // Stop playback immediately if user logs out
  useEffect(() => {
    if (!user && (isPlaying || isPaused)) {
      setIsPlaying(false);
      setIsPaused(false);
      isPlayingRef.current = false;
      isPausedRef.current = false;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      ambientSynth.stop();
          }
  }, [user, isPlaying, isPaused]);

  // Ambient Documentary Background Music
  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('autoarchive_ambient_music_enabled');
      return saved !== null ? saved === 'true' : true; // Enabled by default
    }
    return true;
  });
  const [musicVolume, setMusicVolume] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('autoarchive_ambient_music_volume');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 5 && parsed <= 100) return parsed;
      }
    }
    return 20; // 20% soft volume by default so voice is crystal clear
  });

  // Master flattened narration items list across ALL chapters
  const allItemsRef = useRef<NarrationItem[]>([]);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const currentGlobalIndexRef = useRef(currentGlobalIndex);
  currentGlobalIndexRef.current = currentGlobalIndex;

  const autoScrollRef = useRef(autoScroll);
  autoScrollRef.current = autoScroll;

  const rateRef = useRef(rate);
  rateRef.current = rate;

  const pitchRef = useRef(pitch);
  pitchRef.current = pitch;

  const selectedVoiceRef = useRef(selectedVoice);
  selectedVoiceRef.current = selectedVoice;

  const voiceGenderRef = useRef(voiceGender);
  voiceGenderRef.current = voiceGender;

  const musicEnabledRef = useRef(musicEnabled);
  musicEnabledRef.current = musicEnabled;

  const musicVolumeRef = useRef(musicVolume);
  musicVolumeRef.current = musicVolume;

  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;

  const watchdogTimerRef = useRef<number | null>(null);
  const chunkTimeoutRef = useRef<number | null>(null);
  const wakeLockRef = useRef<any>(null);
  

  // Screen WakeLock to prevent phone from locking/suspending TTS during playback
  const acquireWakeLock = async () => {
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      try {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
      } catch {
        // WakeLock may be rejected if low battery or hidden tab
      }
    }
  };

  const releaseWakeLock = () => {
    if (wakeLockRef.current) {
      try {
        wakeLockRef.current.release();
      } catch {
        // Ignore
      }
      wakeLockRef.current = null;
    }
  };

  // Build the complete master queue for the entire documentary
  const buildFullDocumentaryQueue = useCallback(() => {
    const items: NarrationItem[] = [];
    let globalCounter = 0;

    chapters.forEach((chap, chapIdx) => {
      // 1. Chapter Title Header
      const titleClean = sanitizeAndPhoneticize(chap.title);
      const subClean = sanitizeAndPhoneticize(chap.subtitle || '');
      const headerText = subClean
        ? `Capítulo ${chap.number}. ${titleClean}. ${subClean}.`
        : `Capítulo ${chap.number}. ${titleClean}.`;

      items.push({
        globalIndex: globalCounter++,
        chapterIndex: chapIdx,
        chapterNumber: chap.number,
        chapterTitle: chap.title,
        chapterSubtitle: chap.subtitle,
        text: headerText,
        isChapterHeader: true,
      });

      // 2. Paragraph sentences
      for (const p of chap.paragraphs) {
        const cleanP = sanitizeAndPhoneticize(p);
        if (!cleanP) continue;

        // Split into natural sentences
        const sentenceSplits = cleanP
          .split(/(?<=[.?!;])\s+/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        if (sentenceSplits.length === 0 && cleanP.length > 0) {
          items.push({
            globalIndex: globalCounter++,
            chapterIndex: chapIdx,
            chapterNumber: chap.number,
            chapterTitle: chap.title,
            chapterSubtitle: chap.subtitle,
            text: cleanP,
            isChapterHeader: false,
          });
        } else {
          for (const s of sentenceSplits) {
            // Keep sentences under 160 characters so mobile TTS never hits 15-second timeout
            if (s.length > 160) {
              const commaSplits = s
                .split(/(?<=[,])\s+/)
                .map((c) => c.trim())
                .filter((c) => c.length > 0);
              if (commaSplits.length > 1) {
                for (const cs of commaSplits) {
                  items.push({
                    globalIndex: globalCounter++,
                    chapterIndex: chapIdx,
                    chapterNumber: chap.number,
                    chapterTitle: chap.title,
                    chapterSubtitle: chap.subtitle,
                    text: cs,
                    isChapterHeader: false,
                  });
                }
              } else {
                items.push({
                  globalIndex: globalCounter++,
                  chapterIndex: chapIdx,
                  chapterNumber: chap.number,
                  chapterTitle: chap.title,
                  chapterSubtitle: chap.subtitle,
                  text: s,
                  isChapterHeader: false,
                });
              }
            } else {
              items.push({
                globalIndex: globalCounter++,
                chapterIndex: chapIdx,
                chapterNumber: chap.number,
                chapterTitle: chap.title,
                chapterSubtitle: chap.subtitle,
                text: s,
                isChapterHeader: false,
              });
            }
          }
        }
      }
    });

    allItemsRef.current = items;
  }, [chapters]);

  // Safe scroll helper for any documentary page structure
  const scrollToChapter = useCallback(
    (chapterNum: string) => {
      if (typeof document === 'undefined') return;
      const selectors = [
        `capitulo-${chapterNum}`,
        `camaro-mustang-ch-${chapterNum}`,
        `camaro-ch-${chapterNum}`,
        `mustang-ch-${chapterNum}`,
        `r34-ch-${chapterNum}`,
        `supra-ch-${chapterNum}`,
        `chapter-${chapterNum}`,
        `cap-${chapterNum}`,
        `f40-ch-${chapterNum}`,
        `miura-ch-${chapterNum}`,
        `787b-ch-${chapterNum}`,
        `nsx-ch-${chapterNum}`,
        `countach-ch-${chapterNum}`,
        `xj220-ch-${chapterNum}`,
      ];

      for (const id of selectors) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-offset-4', 'ring-offset-[#080808]');
          el.style.setProperty('--tw-ring-color', accentColor);
          setTimeout(() => {
            el.classList.remove('ring-2', 'ring-offset-4', 'ring-offset-[#080808]');
          }, 2500);
          break;
        }
      }
    },
    [accentColor]
  );

  // Detect mobile screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const ua = navigator.userAgent || navigator.vendor || '';
        const mobileCheck = /android|iphone|ipad|ipod|mobile|blackberry|iemobile|opera mini/i.test(ua);
        const isMobileScreen = mobileCheck || window.innerWidth < 768;
        setIsMobile(isMobileScreen);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Voice sorting and detection algorithm prioritizing Spanish Male Narrator Voices
  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Female names and identifiers to penalize/exclude from male default selection
    const femaleMarkers = [
      'monica',
      'mónica',
      'paulina',
      'angelica',
      'angélica',
      'paloma',
      'lucia',
      'lucía',
      'carmen',
      'laura',
      'soledad',
      'sofia',
      'sofía',
      'helena',
      'elena',
      'conchita',
      'penelope',
      'penélope',
      'victoria',
      'valeria',
      'marina',
      'alva',
      'damaris',
      'marisol',
      'francisca',
      'ximena',
      'lola',
      'clara',
      'isabel',
      'catalina',
      'valentina',
      'camila',
      'daniela',
      'elvira',
      'irene',
      'sabina',
      'female',
      'mujer',
      'femenin',
      'femenina',
      'eea',
      'eeb',
      'sfa',
      'sfb',
      'voice 2',
      'voz 2',
    ];

    // Explicit Male names and identifiers (iOS, Android, Samsung, Microsoft, Google TTS)
    const maleMarkers = [
      'alvaro',
      'álvaro',
      'jorge',
      'manuel',
      'pablo',
      'enrique',
      'diego',
      'carlos',
      'juan',
      'raul',
      'raúl',
      'julio',
      'felipe',
      'gonzalo',
      'javier',
      'mateo',
      'tomas',
      'tomás',
      'nicolas',
      'nicolás',
      'david',
      'miguel',
      'eddy',
      'arnau',
      'alberto',
      'hector',
      'héctor',
      'sergio',
      'ignacio',
      'matias',
      'matías',
      'santiago',
      'lucas',
      'rodrigo',
      'fernando',
      'male',
      'hombre',
      'masculin',
      'masculino',
      'eed',
      'eec',
      'sfd',
      'sfc',
      'esd',
      'esc',
      'voice 1',
      'voz 1',
    ];

    // Calculate quality affinity score strictly prioritizing Spanish (es-ES) high-definition neural voices
    const getMaleScore = (v: SpeechSynthesisVoice): number => {
      const name = (v.name || '').toLowerCase();
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      let score = 0;

      const isSpanish =
        lang.startsWith('es') ||
        lang.includes('spanish') ||
        name.includes('español') ||
        name.includes('spanish');

      if (!isSpanish) return -10000;

      // Heavy penalty for mechanical / robotic engines
      if (name.includes('espeak') || name.includes('desktop') || name.includes('compact') || name.includes('fallback')) {
        score -= 8000;
      }

      const isSpain =
        lang === 'es-es' ||
        lang.startsWith('es-es') ||
        name.includes('españa') ||
        name.includes('spain') ||
        name.includes('(spain)');

      // Top priority for Spanish from Spain (es-ES)
      if (isSpain) {
        score += 8000;
      } else if (lang.startsWith('es')) {
        score += 2000;
      }

      // Massive bonus for Natural, Neural, Online, Enhanced, Premium and Studio voices
      if (name.includes('natural') || name.includes('neural') || name.includes('online')) {
        score += 7000;
      }
      if (name.includes('enhanced') || name.includes('premium') || name.includes('studio') || name.includes('wavenet')) {
        score += 6000;
      }
      if (name.includes('google') || name.includes('apple') || name.includes('siri') || name.includes('microsoft')) {
        score += 3000;
      }

      // Penalty if identified as female when seeking default male narrator
      if (femaleMarkers.some((f) => name.includes(f))) {
        score -= 5000;
      }

      // Bonus for known top-tier male voices (e.g., Alvaro, Jorge, Manuel, Pablo in Spain)
      if (maleMarkers.some((m) => name.includes(m))) {
        score += 2500;
      }

      return score;
    };

    // Filter all Spanish voices, prioritizing es-ES
    const esVoices = voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return (
        lang.startsWith('es') ||
        lang.includes('spanish') ||
        name.includes('español') ||
        name.includes('spanish')
      );
    });

    const pool = esVoices.length > 0 ? esVoices : voices;

    // Sort pool so highest scored es-ES natural voices come first
    const sortedVoices = [...pool].sort((a, b) => getMaleScore(b) - getMaleScore(a));
    setAvailableVoices(sortedVoices);

    if (selectedVoiceRef.current && sortedVoices.some((v) => v.name === selectedVoiceRef.current?.name)) {
      return;
    }

    const bestVoice = sortedVoices[0];
    if (bestVoice) {
      setSelectedVoice(bestVoice);
      selectedVoiceRef.current = bestVoice;
    }
  }, []);

  // One-click switch between male and female voice profiles prioritizing es-ES
  const selectGender = useCallback(
    (gender: 'male' | 'female') => {
      setVoiceGender(gender);
      voiceGenderRef.current = gender;

      // Keep 1.0 pitch for natural human timbre without digital formant distortion
      const newPitch = 1.0;
      setPitch(newPitch);
      pitchRef.current = newPitch;

      const femaleMarkers = [
        'monica',
        'mónica',
        'paulina',
        'angelica',
        'angélica',
        'paloma',
        'lucia',
        'lucía',
        'carmen',
        'laura',
        'soledad',
        'sofia',
        'sofía',
        'helena',
        'elena',
        'conchita',
        'penelope',
        'penélope',
        'victoria',
        'valeria',
        'marina',
        'alva',
        'damaris',
        'marisol',
        'francisca',
        'ximena',
        'lola',
        'clara',
        'isabel',
        'catalina',
        'valentina',
        'camila',
        'daniela',
        'elvira',
        'irene',
        'sabina',
        'female',
        'mujer',
        'femenin',
        'femenina',
        'eea',
        'eeb',
        'sfa',
        'sfb',
        'voice 2',
        'voz 2',
      ];

      // Step 1: Look for natural / neural es-ES voice of desired gender
      const matchNaturalSpain = availableVoices.find((v) => {
        const name = (v.name || '').toLowerCase();
        const lang = (v.lang || '').toLowerCase().replace('_', '-');
        const isFemale = femaleMarkers.some((f) => name.includes(f));
        const isSpain = lang === 'es-es' || lang.startsWith('es-es') || name.includes('españa') || name.includes('spain');
        const isNatural = name.includes('natural') || name.includes('neural') || name.includes('online') || name.includes('enhanced') || name.includes('premium') || name.includes('google') || name.includes('apple');
        return isSpain && isNatural && (gender === 'male' ? !isFemale : isFemale);
      });

      // Step 2: Any standard es-ES voice of desired gender
      const matchSpain = availableVoices.find((v) => {
        const name = (v.name || '').toLowerCase();
        const lang = (v.lang || '').toLowerCase().replace('_', '-');
        const isFemale = femaleMarkers.some((f) => name.includes(f));
        const isSpain = lang === 'es-es' || lang.startsWith('es-es') || name.includes('españa') || name.includes('spain');
        return isSpain && (gender === 'male' ? !isFemale : isFemale);
      });

      // Step 3: Any natural Spanish voice of desired gender
      const matchNatural = availableVoices.find((v) => {
        const name = (v.name || '').toLowerCase();
        const isFemale = femaleMarkers.some((f) => name.includes(f));
        const isNatural = name.includes('natural') || name.includes('neural') || name.includes('online') || name.includes('enhanced') || name.includes('premium') || name.includes('google') || name.includes('apple');
        return isNatural && (gender === 'male' ? !isFemale : isFemale);
      });

      // Step 4: Fallback
      const matchAny = availableVoices.find((v) => {
        const name = (v.name || '').toLowerCase();
        const isFemale = femaleMarkers.some((f) => name.includes(f));
        return gender === 'male' ? !isFemale : isFemale;
      });

      const matchVoice = matchNaturalSpain || matchSpain || matchNatural || matchAny || availableVoices[0];

      if (matchVoice) {
        setSelectedVoice(matchVoice);
        selectedVoiceRef.current = matchVoice;
      }

      if (isPlayingRef.current) {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        playItem(currentGlobalIndexRef.current, true);
      }
    },
    [availableVoices]
  );

  // Toggle ambient background music on/off
  const toggleMusic = useCallback(() => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    musicEnabledRef.current = next;
    try {
      localStorage.setItem('autoarchive_ambient_music_enabled', String(next));
    } catch {
      // Ignore
    }
    if (isPlayingRef.current && !isPausedRef.current) {
      if (next) {
        ambientSynth.start(musicVolumeRef.current);
      } else {
        ambientSynth.stop();
      }
    }
  }, [musicEnabled]);

  const handleMusicVolumeChange = useCallback((vol: number) => {
    setMusicVolume(vol);
    musicVolumeRef.current = vol;
    try {
      localStorage.setItem('autoarchive_ambient_music_volume', String(vol));
    } catch {
      // Ignore
    }
    ambientSynth.setVolume(vol);
  }, []);

  // Safe documentary slug for persistence across browser tabs/refreshes
  const docStorageKey = `autoarchive_audio_pos_${(documentaryTitle || 'documental').toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  // Initialize SpeechSynthesis on mount & restore previous progress
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    buildFullDocumentaryQueue();
    loadVoices();

    // Restore saved listening progress if available
    try {
      const saved = localStorage.getItem(docStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.index === 'number' && parsed.index > 0) {
          const queue = allItemsRef.current;
          if (queue && parsed.index < queue.length) {
            setCurrentGlobalIndex(parsed.index);
            currentGlobalIndexRef.current = parsed.index;
            setIsPaused(true);
          }
        }
      }
    } catch {
      // Ignore storage errors
    }

    // Handle mobile touch initialization to fetch voices if loaded late by OS
    const handleTouchInit = () => {
      loadVoices();
    };
    window.addEventListener('touchstart', handleTouchInit, { once: true, passive: true });
    window.addEventListener('pointerdown', handleTouchInit, { once: true, passive: true });

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Initialize global pool
    if (!window.__audioNarratorUtterancePool) {
      window.__audioNarratorUtterancePool = [];
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchInit);
      window.removeEventListener('pointerdown', handleTouchInit);
      releaseWakeLock();
      ambientSynth.stop();
            if (watchdogTimerRef.current) {
        clearTimeout(watchdogTimerRef.current);
      }
      if (chunkTimeoutRef.current) {
        clearTimeout(chunkTimeoutRef.current);
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [buildFullDocumentaryQueue, docStorageKey, loadVoices]);

  // Re-build queue when chapters prop change
  useEffect(() => {
    buildFullDocumentaryQueue();
  }, [buildFullDocumentaryQueue]);

  // Main playback engine function for an individual item
  const playItem = useCallback(
    (index: number, isUserInitiated = false) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      // Clear any pending timers for watchdog or chunks
      if (watchdogTimerRef.current) {
        clearTimeout(watchdogTimerRef.current);
        watchdogTimerRef.current = null;
      }
      if (chunkTimeoutRef.current) {
        clearTimeout(chunkTimeoutRef.current);
        chunkTimeoutRef.current = null;
      }

      if (!userRef.current) {
        setIsPlaying(false);
        setIsPaused(false);
        ambientSynth.stop();
                setShowPodcastLockModal(true);
        return;
      }

      const queue = allItemsRef.current;
      if (!queue || queue.length === 0) return;

      // Check if finished entire documentary
      if (index >= queue.length) {
        setIsPlaying(false);
        setIsPaused(false);
        releaseWakeLock();
        ambientSynth.stop();
                return;
      }

      // Start/ensure subtle ambient background music is playing with unique theme for this documentary
      if (musicEnabledRef.current) {
        ambientSynth.setThemeForDocumentary(documentaryTitle);
        ambientSynth.start(musicVolumeRef.current);
      }

      const currentItem = queue[index];
      if (!currentItem) return;

      // Update state for visual sync
      setCurrentGlobalIndex(index);
      currentGlobalIndexRef.current = index;
      setSpokenCharIndex(-1);

      // Save position to localStorage
      try {
        localStorage.setItem(
          docStorageKey,
          JSON.stringify({
            index,
            chapterIndex: currentItem.chapterIndex,
            chapterNumber: currentItem.chapterNumber,
            timestamp: Date.now(),
          })
        );
      } catch {
        // Ignore storage errors
      }

      // If this item starts a new chapter, scroll, trigger subtle harmonic cue & notify parent
      if (currentItem.isChapterHeader) {
        if (musicEnabledRef.current) {
          ambientSynth.playTransitionChime();
        }
        if (autoScrollRef.current) {
          scrollToChapter(currentItem.chapterNumber);
        }
        if (onChapterSelect) {
          onChapterSelect(currentItem.chapterIndex);
        }
      }

      // Update lockscreen / media session metadata
      if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
        try {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: currentItem.chapterTitle,
            artist: documentaryTitle,
            album: 'AutoArchive Documentales',
          });
        } catch {
          // Ignore
        }
      }

      // Create new utterance
      const textToSpeak = currentItem.text.trim();
      if (!textToSpeak) {
        playItem(index + 1, false);
        return;
      }

      // 1. SPLIT TEXT INTO NATURAL PHRASES (CHUNKS) WITH CONTROLLED PUNCTUATION PAUSES
      const chunks = splitIntoSpeechChunks(textToSpeak, isMobileRef.current);
      if (chunks.length === 0) {
        playItem(index + 1, false);
        return;
      }

      // Only cancel existing synthesis if the play was manually initiated by the user
      // (e.g. clicking a chapter, play button, dragging slider).
      // Natural progression should NOT call cancel(), preventing the mobile audio driver reset lag!
      if (isUserInitiated && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      // Define internal recursive play function for chunks
      const playChunk = (chunkIndex: number) => {
        if (!isPlayingRef.current || isPausedRef.current) return;

        // Clear any previous watchdog or chunk timeouts
        if (watchdogTimerRef.current) {
          clearTimeout(watchdogTimerRef.current);
          watchdogTimerRef.current = null;
        }
        if (chunkTimeoutRef.current) {
          clearTimeout(chunkTimeoutRef.current);
          chunkTimeoutRef.current = null;
        }

        // If we spoke all chunks in this paragraph, move to the next paragraph
        if (chunkIndex >= chunks.length) {
          // Restore ambient music volume in pause between sentences
          if (musicEnabledRef.current) {
            ambientSynth.duckAudio(false);
          }

          if (isPlayingRef.current && !isPausedRef.current) {
            // Faster pacing: extremely snappy on mobile (30ms instead of 50ms) to avoid lagging transitions
            const pauseMs = currentItem.isChapterHeader 
              ? (isMobileRef.current ? 100 : 150) 
              : (isMobileRef.current ? 30 : 50);
              
            chunkTimeoutRef.current = window.setTimeout(() => {
              if (isPlayingRef.current && !isPausedRef.current) {
                playItem(index + 1, false);
              }
            }, pauseMs);
          }
          return;
        }

        const chunk = chunks[chunkIndex];
        // Clean punctuation for mobile so the native OS voice doesn't double-pause
        const cleanText = isMobileRef.current 
          ? chunk.text.replace(/[,;:—–-]/g, '\u200B')
          : chunk.text;
        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Mobile narrator set specifically to 1.2x
        const calculatedRate = isMobileRef.current ? 1.2 : rateRef.current;
        utterance.rate = calculatedRate;
        utterance.pitch = pitchRef.current;
        utterance.volume = 1.0;
        utterance.lang = selectedVoiceRef.current?.lang || 'es-ES';

        if (selectedVoiceRef.current) {
          utterance.voice = selectedVoiceRef.current;
        }

        // Protect utterance against mobile garbage collection
        if (!window.__audioNarratorUtterancePool) {
          window.__audioNarratorUtterancePool = [];
        }
        window.__audioNarratorUtterancePool.push(utterance);
        if (window.__audioNarratorUtterancePool.length > 50) {
          window.__audioNarratorUtterancePool.shift();
        }

        let chunkFinished = false;

        const advanceToNextChunk = () => {
          if (chunkFinished) return;
          chunkFinished = true;

          if (watchdogTimerRef.current) {
            clearTimeout(watchdogTimerRef.current);
            watchdogTimerRef.current = null;
          }

          if (isPlayingRef.current && !isPausedRef.current) {
            // Wait for the exact custom-tailored pause after this punctuation chunk!
            chunkTimeoutRef.current = window.setTimeout(() => {
              playChunk(chunkIndex + 1);
            }, chunk.pauseAfter);
          }
        };

        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            // Sincronización perfecta: sumamos el offset acumulado de caracteres del chunk
            setSpokenCharIndex(chunk.offset + event.charIndex);
          }
        };

        utterance.onstart = () => {
          // Smoothly duck ambient music when spoken speech begins
          if (musicEnabledRef.current) {
            ambientSynth.duckAudio(true);
          }
        };

        utterance.onend = () => {
          advanceToNextChunk();
        };

        utterance.onerror = (e) => {
          if (e.error === 'interrupted' || e.error === 'canceled') {
            return;
          }
          console.warn('SpeechSynthesis error on chunk:', e);
          advanceToNextChunk();
        };

        // Watchdog Timer for chunk:
        const wordCount = chunk.text.split(/\s+/).length;
        const expectedMs = Math.max(3000, (wordCount / (140 * rateRef.current)) * 60 * 1000 + 3000);

        watchdogTimerRef.current = window.setTimeout(() => {
          if (isPlayingRef.current && !isPausedRef.current && !window.speechSynthesis.speaking) {
            advanceToNextChunk();
          }
        }, expectedMs);

        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.error('SpeechSynthesis.speak failed on chunk:', err);
          advanceToNextChunk();
        }
      };

      // Start speaking the first chunk of the paragraph
      playChunk(0);
    },
    [docStorageKey, documentaryTitle, onChapterSelect, scrollToChapter]
  );

  // Play / Pause Toggle with mobile resume fix
  const handlePlayPause = () => {
    if (!isSupported) return;
    if (!requireAuthForPodcast()) return;

    unlockMobileAudioSubsystem();
    loadVoices();

    if (isPlaying && !isPaused) {
      // USER PAUSES:
      ambientSynth.stop();
            if (watchdogTimerRef.current) {
        clearTimeout(watchdogTimerRef.current);
        watchdogTimerRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setIsPaused(true);
      isPlayingRef.current = false;
      isPausedRef.current = true;
      releaseWakeLock();

      // Persist the exact pause point
      try {
        localStorage.setItem(
          docStorageKey,
          JSON.stringify({
            index: currentGlobalIndexRef.current,
            timestamp: Date.now(),
          })
        );
      } catch {
        // Ignore
      }
    } else if (isPaused) {
      // USER RESUMES:
      setIsPlaying(true);
      setIsPaused(false);
      isPlayingRef.current = true;
      isPausedRef.current = false;
      acquireWakeLock();
      if (musicEnabledRef.current) {
        ambientSynth.setThemeForDocumentary(documentaryTitle);
        ambientSynth.start(musicVolumeRef.current);
      }

      // Clear any pending/stuck TTS before restarting
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      // Resume immediately from the EXACT sentence index where we paused!
      playItem(currentGlobalIndexRef.current, true);
    } else {
      // FIRST PLAY:
      setIsPlaying(true);
      setIsPaused(false);
      isPlayingRef.current = true;
      isPausedRef.current = false;
      acquireWakeLock();
      ambientSynth.playIntroChime();
      if (musicEnabledRef.current) {
        ambientSynth.setThemeForDocumentary(documentaryTitle);
        ambientSynth.start(musicVolumeRef.current);
      }

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      // Immediate startup: 50ms broadcast lead-in so speech begins naturally and without delay
      setTimeout(() => {
        if (isPlayingRef.current && !isPausedRef.current) {
          playItem(currentGlobalIndexRef.current, true);
        }
      }, 50);
    }
  };

  // Stop handler
  const handleStop = () => {
    if (!isSupported) return;
    ambientSynth.stop();
        if (watchdogTimerRef.current) {
      clearTimeout(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    releaseWakeLock();
    setIsPlaying(false);
    setIsPaused(false);
    isPlayingRef.current = false;
    isPausedRef.current = false;
    setCurrentGlobalIndex(0);
    currentGlobalIndexRef.current = 0;
    try {
      localStorage.removeItem(docStorageKey);
    } catch {
      // Ignore
    }
  };

  // Jump to specific chapter
  const handleSelectChapter = (chapIdx: number) => {
    if (chapIdx < 0 || chapIdx >= chapters.length) return;
    unlockMobileAudioSubsystem();
    window.speechSynthesis.cancel();

    // Find the first narration item for this chapter
    const queue = allItemsRef.current;
    const targetItem = queue.find((it) => it.chapterIndex === chapIdx);
    const targetIdx = targetItem ? targetItem.globalIndex : 0;

    setCurrentGlobalIndex(targetIdx);

    const chap = chapters[chapIdx];
    if (chap && autoScrollRef.current) {
      scrollToChapter(chap.number);
    }
    if (onChapterSelect) {
      onChapterSelect(chapIdx);
    }

    if (isPlaying || isPaused) {
      setIsPlaying(true);
      setIsPaused(false);
      isPlayingRef.current = true;
      isPausedRef.current = false;
      acquireWakeLock();
      playItem(targetIdx, true);
    }
  };

  const handleNextChapter = () => {
    const queue = allItemsRef.current;
    const currentItem = queue[currentGlobalIndex] || queue[0];
    const currentChapIdx = currentItem ? currentItem.chapterIndex : 0;
    if (currentChapIdx + 1 < chapters.length) {
      handleSelectChapter(currentChapIdx + 1);
    }
  };

  const handlePrevChapter = () => {
    const queue = allItemsRef.current;
    const currentItem = queue[currentGlobalIndex] || queue[0];
    const currentChapIdx = currentItem ? currentItem.chapterIndex : 0;
    if (currentChapIdx > 0) {
      handleSelectChapter(currentChapIdx - 1);
    }
  };

  const handleRestartCurrentChapter = () => {
    const queue = allItemsRef.current;
    const currentItem = queue[currentGlobalIndex] || queue[0];
    const currentChapIdx = currentItem ? currentItem.chapterIndex : 0;
    handleSelectChapter(currentChapIdx);
  };

  const handlePrevParagraph = () => {
    if (currentGlobalIndex > 0) {
      playItem(currentGlobalIndex - 1, true);
    }
  };

  const handleNextParagraph = () => {
    if (currentGlobalIndex + 1 < allItemsRef.current.length) {
      playItem(currentGlobalIndex + 1, true);
    }
  };

  const handleRestartFromBeginning = () => {
    if (!requireAuthForPodcast()) return;
    unlockMobileAudioSubsystem();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentGlobalIndex(0);
    currentGlobalIndexRef.current = 0;
    try {
      localStorage.removeItem(docStorageKey);
    } catch {
      // Ignore
    }
    if (chapters.length > 0 && autoScrollRef.current) {
      scrollToChapter(chapters[0].number);
    }
    if (onChapterSelect) {
      onChapterSelect(0);
    }
    setIsPlaying(true);
    setIsPaused(false);
    isPlayingRef.current = true;
    isPausedRef.current = false;
    acquireWakeLock();
    ambientSynth.playIntroChime();
    if (musicEnabledRef.current) {
      ambientSynth.setThemeForDocumentary(documentaryTitle);
      ambientSynth.start(musicVolumeRef.current);
    }
    setTimeout(() => {
      playItem(0, true);
    }, 200);
  };

  // Register Mobile Lockscreen & Bluetooth MediaSession action handlers
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      try {
        navigator.mediaSession.setActionHandler('play', () => {
          handlePlayPause();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
          handlePlayPause();
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
          handlePrevChapter();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          handleNextChapter();
        });
      } catch {
        // MediaSession actions not supported
      }
    }
  }, []);

  // Sync OS lock screen playback state
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      if (isPlaying && !isPaused) {
        navigator.mediaSession.playbackState = 'playing';
      } else {
        navigator.mediaSession.playbackState = 'paused';
      }
    }
  }, [isPlaying, isPaused]);

  // Smooth scroll active subtitle paragraph into view
  useEffect(() => {
    if (showMobileSheet) {
      // Small timeout to allow sheet DOM to be fully mounted
      const timer = setTimeout(() => {
        const activeEl = document.getElementById(`sub-item-${currentGlobalIndex}`);
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentGlobalIndex, showMobileSheet]);

  // Sound Test Tool for Mobile Users
  const handleTestSound = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!requireAuthForPodcast()) return;
    unlockMobileAudioSubsystem();
    window.speechSynthesis.cancel();
    setTestSoundState('testing');

    const testText =
      voiceGenderRef.current === 'male'
        ? 'Narrador en español de España activado. Listo para escuchar el documental en tu celular.'
        : 'Narradora en español de España activada. Lista para escuchar el documental en tu celular.';

    const testUtterance = new SpeechSynthesisUtterance(testText);
    testUtterance.rate = rateRef.current;
    testUtterance.pitch = pitchRef.current;
    testUtterance.volume = 1.0;
    testUtterance.lang = selectedVoiceRef.current?.lang || 'es-ES';
    if (selectedVoiceRef.current) {
      testUtterance.voice = selectedVoiceRef.current;
    }

    testUtterance.onend = () => {
      setTestSoundState('success');
      setTimeout(() => setTestSoundState('idle'), 3500);
    };

    testUtterance.onerror = () => {
      setTestSoundState('idle');
    };

    window.speechSynthesis.speak(testUtterance);
  };

  const queue = allItemsRef.current;
  const currentItem = queue[currentGlobalIndex] || queue[0] || {
    chapterIndex: 0,
    chapterNumber: chapters[0]?.number || '01',
    chapterTitle: chapters[0]?.title || '',
    chapterSubtitle: chapters[0]?.subtitle || '',
    text: '',
    isChapterHeader: true,
  };

  const activeChap = chapters[currentItem.chapterIndex] || chapters[0];
  const totalItems = Math.max(1, queue.length);
  const globalProgressPercent = Math.min(100, Math.round(((currentGlobalIndex + 1) / totalItems) * 100));

  // Auto-scroll active lyric line to center inside Spotify Lyrics Modal
  useEffect(() => {
    if (showMobileSheet) {
      const timer = setTimeout(() => {
        const activeEl = document.getElementById(`sub-item-${currentGlobalIndex}`);
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentGlobalIndex, showMobileSheet]);

  if (!isSupported) {
    return (
      <aside
        aria-label="Aviso de compatibilidad"
        className="w-full bg-[#1c0809] border-y border-amber-500/30 p-3 text-center text-xs font-mono text-amber-200"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <VolumeX className="w-4 h-4 text-amber-400" />
          <span>La síntesis de voz no está habilitada en este navegador. Utiliza Google Chrome o Safari para escuchar los documentales.</span>
        </div>
      </aside>
    );
  }

  const isGoogleVoice =
    (selectedVoice?.name || '').toLowerCase().includes('google') ||
    (selectedVoice?.name || '').toLowerCase().includes('android');

  // ==========================================
  // 1. SPOTIFY-STYLE SUBTITLES & LIVE LYRICS MODAL SHEET
  // ==========================================
  const renderSubtitlesModalSheet = () => {
    if (!showMobileSheet) return null;

    // Filter narration items for active chapter
    const currentChapterItems = allItemsRef.current.filter(
      (item) => item.chapterIndex === currentItem.chapterIndex
    );

    return (
      <div
        className="fixed inset-0 z-[1000] bg-[#030712]/95 backdrop-blur-3xl flex flex-col items-center justify-between animate-in fade-in duration-300"
        style={{
          background: `radial-gradient(circle at 50% 12%, ${accentColor}25 0%, rgba(15, 23, 42, 0.6) 45%, #030712 85%)`,
        }}
        onClick={() => setShowMobileSheet(false)}
      >
        {/* TOP BAR / HEADER */}
        <header
          className="w-full max-w-4xl px-4 sm:px-6 pt-4 pb-3 flex items-center justify-between border-b border-white/10 bg-slate-950/40 backdrop-blur-xl shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Track / Documentary Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-lg overflow-hidden relative"
              style={{
                backgroundColor: `${accentColor}25`,
                borderColor: `${accentColor}70`,
                color: accentColor,
              }}
            >
              <Disc className={`w-4 h-4 ${isPlaying && !isPaused ? 'animate-spin-slow' : ''}`} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-[#8ea4be] truncate block">
                  {documentaryTitle}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30 hidden xs:inline-block" />
                <span className="text-[9px] font-mono text-amber-400/90 uppercase hidden xs:inline-block">
                  AutoArchive Audio
                </span>
              </div>
              <h2 className="text-xs sm:text-sm font-black text-white truncate flex items-center gap-2">
                <span>Capítulo {activeChap?.number}: {activeChap?.title}</span>
              </h2>
            </div>
          </div>

          {/* Center Indicator & Close Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isPlaying && !isPaused && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s] h-2" />
                  <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s] h-3" />
                  <span className="w-0.5 bg-amber-400 rounded-full animate-bounce h-1.5" />
                </div>
                <span className="text-[9px] font-mono font-black tracking-widest text-amber-400 uppercase hidden sm:inline">
                  EN LOCUCIÓN
                </span>
              </div>
            )}

            <button
              onClick={() => setShowMobileSheet(false)}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer border border-white/10"
              title="Cerrar letras"
              aria-label="Cerrar vista de letras"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {/* CHAPTER QUICK SWITCHER PILLS */}
        <nav
          aria-label="Selector rápido de capítulos"
          className="w-full max-w-4xl px-4 sm:px-6 pt-3 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {chapters.map((chap, idx) => {
            const isSelected = idx === currentItem.chapterIndex;
            return (
              <button
                key={chap.number}
                onClick={() => handleSelectChapter(idx)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-black scale-105 border border-amber-300'
                    : 'bg-white/5 hover:bg-white/15 text-white/70 border border-white/10 hover:border-white/20'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />}
                <span>Cap. {chap.number}</span>
              </button>
            );
          })}
        </nav>

        {/* MAIN LYRICS SCROLLER (SPOTIFY IMMERSIVE DECORATED LYRICS) */}
        <main
          className="w-full max-w-3xl flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-8 py-5 flex flex-col gap-3.5 sm:gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          {currentChapterItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
              <p className="text-xs text-white/40 font-mono">Cargando la letra y transcripción...</p>
            </div>
          ) : (
            currentChapterItems.map((item, idx) => {
              const isActive = item.globalIndex === currentGlobalIndex;
              const isPast = item.globalIndex < currentGlobalIndex;

              return (
                <button
                  key={`${item.chapterNumber}-${idx}`}
                  id={`sub-item-${item.globalIndex}`}
                  onClick={() => playItem(item.globalIndex, true)}
                  className={`text-left transition-all duration-300 outline-none focus:outline-none cursor-pointer block w-full rounded-2xl group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/15 via-white/[0.05] to-transparent border border-amber-400/40 border-l-4 border-l-amber-400 p-4 sm:p-5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md scale-[1.01]'
                      : isPast
                      ? 'p-3 text-white/55 hover:text-white/80 hover:bg-white/[0.03] border border-transparent hover:border-white/5'
                      : 'p-3 text-white/25 hover:text-white/60 hover:bg-white/[0.03] border border-transparent hover:border-white/5'
                  }`}
                >
                  {isActive && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-end gap-0.5 h-2">
                        <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s] h-1.5" />
                        <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s] h-2.5" />
                        <span className="w-0.5 bg-amber-400 rounded-full animate-bounce h-1.5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-amber-400/90 uppercase">
                        REPRODUCIENDO AHORA
                      </span>
                    </div>
                  )}

                  <p
                    className={`leading-relaxed sm:leading-relaxed tracking-tight select-none transition-all ${
                      isActive
                        ? 'text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]'
                        : 'font-semibold text-sm sm:text-base md:text-lg'
                    }`}
                  >
                    {isActive ? renderHighlightedText(item.text, spokenCharIndex) : item.text}
                  </p>
                </button>
              );
            })
          )}
        </main>

        {/* BOTTOM INTEGRATED SPOTIFY PLAYBACK CONTROLS DOCK */}
        <footer
          className="w-full max-w-3xl px-4 sm:px-6 py-3 bg-slate-950/90 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] shrink-0 flex items-center justify-between gap-2.5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Chapter navigation jump */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevParagraph}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
              title="Párrafo anterior"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={handlePrevChapter}
              disabled={currentItem.chapterIndex === 0}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 disabled:opacity-20 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Capítulo anterior"
            >
              <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Central Play/Pause button with glowing accent ring */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-all cursor-pointer ring-2 ring-white/20 hover:ring-white/40"
              style={{
                backgroundColor: !user ? '#e62628' : isPlaying ? '#ffffff' : accentColor,
              }}
              title={!user ? 'Inicia sesión para escuchar' : isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {!user ? (
                <Lock className="w-4 h-4 text-white" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-black fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Next Chapter navigation & Speed / Music */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleNextChapter}
              disabled={currentItem.chapterIndex >= chapters.length - 1}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 disabled:opacity-20 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Siguiente capítulo"
            >
              <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={handleNextParagraph}
              disabled={currentGlobalIndex >= allItemsRef.current.length - 1}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 disabled:opacity-20 text-white/70 hover:text-white transition-all cursor-pointer"
              title="Siguiente párrafo"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Speed Pill */}
            <button
              onClick={() => {
                const speeds = [1.0, 1.2, 1.5];
                const nextIdx = (speeds.indexOf(rate) + 1) % speeds.length;
                const newSpeed = speeds[nextIdx];
                setRate(newSpeed);
                rateRef.current = newSpeed;
              }}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-white/90 border border-white/10 text-[11px] font-mono font-bold transition-all cursor-pointer ml-1"
              title="Velocidad de locución"
            >
              {rate}x
            </button>

            {/* Ambient Music button */}
            <button
              onClick={toggleMusic}
              className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer hidden sm:flex ${
                musicEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
                  : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
              }`}
              title={musicEnabled ? 'Desactivar música ambiental' : 'Activar música ambiental'}
            >
              <Music className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </div>
    );
  };

  // ==========================================
  // 2. ALWAYS DOCKED BOTTOM PLAYER BAR
  // ==========================================
  return (
    <>
      {renderSubtitlesModalSheet()}

      {/* In-Documentary Podcast Auth Notice Banner */}
      {!user && (
        <div className="w-full bg-gradient-to-r from-[#1c0809] via-[#0b1420] to-[#1c0809] border-y border-[#e62628]/40 px-3 sm:px-6 py-2.5 sm:py-3 transition-all animate-fadeIn">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-8 h-8 rounded-xl bg-[#e62628]/20 border border-[#e62628]/50 flex items-center justify-center text-[#ffd451] shrink-0 shadow-md">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
                  <span className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
                    INICIA SESIÓN PARA ESCUCHAR LOS PODCAST
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-bold">
                    ✓ Lectura 100% Libre
                  </span>
                </div>
                <p className="text-[#8bb4d9] text-[11px] font-sans mt-0.5">
                  La lectura y datos técnicos son gratuitos. Para activar la locución en audio HD y música de fondo, ingresa a tu cuenta.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  if (onOpenAuthModal) {
                    onOpenAuthModal('INICIA SESIÓN PARA ESCUCHAR LOS PODCAST');
                  } else {
                    setShowPodcastLockModal(true);
                  }
                }}
                className="py-2 px-4 bg-[#e62628] hover:bg-[#ff3b3e] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-red-900/40 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>INICIAR SESIÓN / REGISTRARSE</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. UNIFIED FLOATING SPOTIFY-STYLE BOTTOM PLAYER BAR */}
      <aside
        aria-label="Reproductor de audio Spotify"
        className="fixed bottom-[78px] md:bottom-6 left-3 right-3 sm:left-4 sm:right-4 md:left-1/2 md:-translate-x-1/2 md:w-[92%] md:max-w-5xl z-[980] animate-in slide-in-from-bottom-6 duration-300"
      >
        {/* Floating Mini-Subtitle Ticker Ribbon attached right above the player capsule */}
        {currentItem?.text && (
          <div
            onClick={() => setShowMobileSheet(true)}
            className="mb-1.5 w-full max-w-xl mx-auto bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 hover:from-slate-900 hover:to-slate-900 backdrop-blur-2xl border border-amber-400/50 shadow-[0_4px_25px_rgba(251,191,36,0.15)] rounded-full px-3.5 sm:px-4 py-1.5 flex items-center justify-between gap-2.5 transition-all cursor-pointer group hover:scale-[1.01] hover:border-amber-400"
            title="Toca para abrir la vista completa de Letras Spotify"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="flex items-end gap-0.5 h-2.5 shrink-0">
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s] h-2" />
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s] h-3" />
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce h-1.5" />
              </div>
              <span className="text-[9px] font-mono font-black uppercase text-amber-400 tracking-wider shrink-0 hidden xs:inline">
                LETRA:
              </span>
              <p className="text-[11px] sm:text-xs font-medium text-white truncate min-w-0">
                {isPlaying && !isPaused
                  ? renderHighlightedText(currentItem.text, spokenCharIndex)
                  : currentItem.text}
              </p>
            </div>

            <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40 shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all flex items-center gap-1 shadow-sm">
              <span>LETRAS</span>
              <span className="text-[10px]">↗</span>
            </span>
          </div>
        )}

        {/* Main Spotify Capsule Layout */}
        <div
          className="bg-slate-950/90 backdrop-blur-2xl border border-white/20 shadow-[0_12px_35px_rgba(0,0,0,0.9)] rounded-full px-3.5 sm:px-6 md:px-7 py-2 sm:py-2.5 flex items-center justify-between gap-2.5 md:gap-3.5 relative overflow-hidden"
          style={{ borderLeftWidth: '5px', borderLeftColor: accentColor }}
        >
          {/* 1. Left Column: Album Art & Chapter Info */}
          <div className="flex items-center gap-2.5 min-w-0 max-w-[140px] xs:max-w-[190px] sm:max-w-[250px] md:max-w-[310px]">
            {/* Spinning Disc / Cover */}
            <div
              className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shrink-0 border shadow-md relative overflow-hidden ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              style={{
                backgroundColor: `${accentColor}25`,
                borderColor: `${accentColor}70`,
                color: accentColor,
              }}
            >
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s] h-2" />
                  <span className="w-0.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s] h-3" />
                  <span className="w-0.5 bg-emerald-400 rounded-full animate-bounce h-1.5" />
                </div>
              ) : (
                <Headphones className="w-3.5 h-3.5" />
              )}
            </div>

            {/* Title & Chapter Sub-details */}
            <div className="min-w-0 flex flex-col">
              <span className="text-[8px] sm:text-[9px] font-mono font-black tracking-widest text-[#8ea4be] uppercase truncate">
                {documentaryTitle}
              </span>
              <span className="text-[11px] sm:text-xs font-black text-white truncate leading-tight mt-0.5 font-sans">
                Cap. {activeChap?.number}: {activeChap?.title}
              </span>
            </div>
          </div>

          {/* 2. Center Column: Spotify-style 3-button oval controls */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Prev Chapter (⏮️) */}
            <button
              onClick={handlePrevChapter}
              disabled={currentItem.chapterIndex === 0}
              className="p-1 sm:p-2 rounded-full hover:bg-white/10 disabled:opacity-20 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Capítulo Anterior"
              aria-label="Capítulo anterior"
            >
              <SkipBack className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>

            {/* Central Play / Pause round button */}
            <button
              onClick={handlePlayPause}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-md cursor-pointer shrink-0"
              style={{
                backgroundColor: !user ? '#e62628' : isPlaying ? '#ffffff' : accentColor,
              }}
              title={!user ? 'Inicia sesión para escuchar' : isPlaying ? 'Pausar' : 'Reproducir'}
              aria-label={!user ? 'Inicia sesión para escuchar' : isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {!user ? (
                <Lock className="w-3.5 h-3.5 text-white" />
              ) : isPlaying ? (
                <Pause className="w-3.5 h-3.5 md:w-4 md:h-4 text-black fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-black fill-current ml-0.5" />
              )}
            </button>

            {/* Next Chapter (⏭️) */}
            <button
              onClick={handleNextChapter}
              disabled={currentItem.chapterIndex >= chapters.length - 1}
              className="p-1 sm:p-2 rounded-full hover:bg-white/10 disabled:opacity-20 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Siguiente Capítulo"
              aria-label="Siguiente capítulo"
            >
              <SkipForward className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          {/* 3. Right Column: Music & Subtitles */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            {/* Background Music toggle */}
            <button
              onClick={toggleMusic}
              className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer hidden sm:flex ${
                musicEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
                  : 'bg-white/5 border-white/10 text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title={musicEnabled ? 'Desactivar música ambiental' : 'Activar música ambiental'}
            >
              <Music className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </button>

            {/* Spotify Lyrics / Subtitles Button */}
            <button
              onClick={() => setShowMobileSheet(true)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/40 text-emerald-300 hover:text-white font-mono font-bold text-[9px] md:text-[11px] flex items-center gap-1.5 active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Abrir Letras y Subtítulos Spotify en vivo"
            >
              <FileText className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-400" />
              <span className="font-mono">SUBTÍTULOS</span>
              {isPlaying && !isPaused && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping hidden xs:inline-block" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Podcast Auth Lock Modal */}
      {showPodcastLockModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0a121c] border border-[#2a4365] rounded-2xl shadow-2xl overflow-hidden text-white">
            {/* Top Accent Bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#e62628] via-[#ffd451] to-[#4ea0ff]" />

            {/* Close Button */}
            <button
              onClick={() => setShowPodcastLockModal(false)}
              className="absolute top-4 right-4 p-2 text-[#8bb4d9] hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ffd451]/10 border border-[#ffd451]/40 rounded-full text-xs font-mono font-bold tracking-wider text-[#ffd451] mb-4">
                <Headphones className="w-4 h-4 text-[#ffd451]" />
                <span>ACCESO AL PÓDCAST Y NARRACIÓN</span>
              </div>

              {/* Headline */}
              <h3 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white mb-3 leading-snug">
                INICIA SESIÓN PARA ESCUCHAR LOS PODCAST
              </h3>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#8bb4d9] leading-relaxed mb-6 font-sans">
                Puedes continuar leyendo todo el contenido y fichas técnicas de <strong className="text-white">{documentaryTitle}</strong> 100% gratis. Para activar la narración en audio pódcast con locución HD y música ambiental, inicia sesión o crea tu cuenta gratis.
              </p>

              {/* Feature Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
                {/* Reading Card */}
                <div className="p-3.5 bg-[#060d17] border border-[#1b324d] rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>LECTURA LIBRE</span>
                    </div>
                    <p className="text-[11px] text-[#718dae] leading-snug font-sans">
                      Capítulos, imágenes, especificaciones y galerías 100% abiertas sin cuenta.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#13253b] text-[10px] text-emerald-400 font-bold">
                    ✓ 100% LIBRE SIN CUENTA
                  </div>
                </div>

                {/* Podcast Card */}
                <div className="p-3.5 bg-[#172538]/60 border border-[#4ea0ff]/40 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#4ea0ff] font-bold mb-1.5">
                      <Headphones className="w-4 h-4 shrink-0" />
                      <span>PÓDCAST HD</span>
                    </div>
                    <p className="text-[11px] text-[#8bb4d9] leading-snug font-sans">
                      Locución hablada (1.20x), subtítulos en vivo y música de fondo.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#203a5a] text-[10px] text-[#ffd451] font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> REQUIERE REGISTRO
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setShowPodcastLockModal(false);
                    if (onOpenAuthModal) {
                      onOpenAuthModal('INICIA SESIÓN PARA ESCUCHAR LOS PODCAST');
                    }
                  }}
                  className="w-full sm:flex-1 py-3 px-5 bg-gradient-to-r from-[#e62628] via-[#e62628] to-[#b81d1f] hover:from-[#ff3335] hover:to-[#e62628] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-red-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>INICIAR SESIÓN / REGISTRARSE</span>
                </button>

                <button
                  onClick={() => setShowPodcastLockModal(false)}
                  className="w-full sm:w-auto py-3 px-4 bg-white/5 hover:bg-white/10 text-[#8bb4d9] hover:text-white font-mono font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Continuar Leyendo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
