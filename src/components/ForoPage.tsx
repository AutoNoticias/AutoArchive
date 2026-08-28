import React from 'react';
import { motion } from 'motion/react';
import { RoutePage } from '../types';
import { Logo } from './Logo';
import { UserAccountNav } from './UserAccountNav';
import { 
  Wrench, 
  Hammer, 
  Construction, 
  BookOpen, 
  Lightbulb, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Car, 
  Flame, 
  CheckCircle2, 
  ShieldAlert,
  Clock
} from 'lucide-react';

interface Props {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenBroadcastModal?: () => void;
}

export const ForoPage: React.FC<Props> = ({
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenBroadcastModal,
}) => {
  return (
    <div className="min-h-screen bg-[#070e17] text-[#edf5ff] flex flex-col selection:bg-[#ff4500] selection:text-white pb-24 md:pb-12">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-12 md:px-28 py-3 sm:py-4 border-b border-[#ff4500]/20 bg-[#070e17]/95 backdrop-blur-md">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group hover:scale-[1.02] transition-all"
        >
          <Logo size="md" />
        </button>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            id="autochat-header-home-btn"
            onClick={() => onNavigate('home')}
            className="text-[13px] font-bold tracking-[0.2em] text-[#8fb9e4] hover:text-white uppercase transition-all hover:scale-105 hidden sm:inline"
          >
            ← Inicio
          </button>
          <button
            id="autochat-header-doc-btn"
            onClick={() => onNavigate('documentales')}
            className="px-4 py-2 border border-[#4ea0ff]/40 bg-[#4ea0ff]/10 text-[#4ea0ff] hover:bg-[#4ea0ff] hover:text-black text-[11px] font-black tracking-[0.2em] uppercase transition-all rounded-lg hidden sm:inline-block hover:scale-105"
          >
            Documentales
          </button>
          <button
            id="autochat-header-datos-btn"
            onClick={() => onNavigate('datos')}
            className="px-4 py-2 border border-[#ffd451]/40 bg-[#ffd451]/10 text-[#ffd451] hover:bg-[#ffd451] hover:text-black text-[11px] font-black tracking-[0.2em] uppercase transition-all rounded-lg hidden sm:inline-block hover:scale-105"
          >
            Datos Curiosos
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

      {/* Main Working On It Section */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-[#0b1420] border-2 border-[#ff4500]/50 rounded-3xl p-6 sm:p-12 shadow-[0_0_50px_rgba(255,69,0,0.2)] relative overflow-hidden space-y-8"
        >
          {/* Top Decorative Stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#ff4500] via-[#ffd451] to-[#ff4500] animate-pulse" />

          {/* Construction / Workshop Icon Animation */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#ff4500]/20 blur-2xl animate-ping opacity-40" />
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#1a0f0a] to-[#0d0705] border-2 border-[#ff4500] flex items-center justify-center text-[#ff4500] shadow-[0_0_30px_rgba(255,69,0,0.4)] relative z-10">
              <Construction className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.8] animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#ffd451] text-black shadow-lg z-20">
              <Wrench className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ff4500]/20 border border-[#ff4500]/40 text-[#ff7043] text-xs font-mono font-black uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              Módulo Temporalmente Desactivado
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
              AutoChat // v2.0 en desarrollo
            </span>
          </div>

          {/* Main Huge Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-md">
              ¡TRABAJANDO EN ELLO!
            </h1>
            <p className="text-sm sm:text-base text-[#9fb3cc] max-w-xl mx-auto leading-relaxed">
              Estamos reconstruyendo y optimizando la sección del foro y chat comunitario para ofrecerte una experiencia mucho más rápida, interactiva y enriquecida con debates técnicos de motor.
            </p>
          </div>

          {/* Roadmap Feature Preview */}
          <div className="bg-[#070e17] border border-white/10 rounded-2xl p-5 sm:p-6 text-left space-y-4 max-w-xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ffd451] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Novedades en Construcción</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Próximamente
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#8a9db5]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#ff4500] shrink-0 mt-0.5" />
                <span><strong>Hilos de telemetría y banco de potencia:</strong> Espacios especializados para compartir curvas de potencia y reglajes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#ff4500] shrink-0 mt-0.5" />
                <span><strong>Consultas directas a especialistas:</strong> Sistema de respuestas destacadas y verificación de datos mecánicos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#ff4500] shrink-0 mt-0.5" />
                <span><strong>Integración fluida con los Documentales:</strong> Debate y aporta anécdotas en cada monografía editorial.</span>
              </li>
            </ul>
          </div>

          {/* Navigation CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="goto-documentales-btn"
              onClick={() => onNavigate('documentales')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#4ea0ff] hover:bg-[#388be3] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_25px_rgba(78,160,255,0.35)] flex items-center justify-center gap-2 hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar 11 Documentales</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="goto-datos-btn"
              onClick={() => onNavigate('datos')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#ffd451]/10 hover:bg-[#ffd451]/20 border border-[#ffd451]/40 text-[#ffd451] font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Ver 20 Datos Curiosos</span>
            </button>

            <button
              id="goto-home-btn"
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Inicio</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
