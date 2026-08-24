import { useState } from 'react';
import { Bell, X, LogIn, UserPlus, Sparkles, Headphones, BookOpen, Lock } from 'lucide-react';

interface WelcomeNotificationModalProps {
  onOpenAuthModal: (reason?: string) => void;
}

export function WelcomeNotificationModal({ onOpenAuthModal }: WelcomeNotificationModalProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0e1622] border border-white/15 rounded-2xl p-5 sm:p-7 shadow-2xl overflow-hidden text-white">
        {/* Decorative blueprint glow */}
        <div className="absolute top-0 right-0 w-36 h-36 sm:w-48 sm:h-48 bg-[#185a9d]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 sm:w-48 sm:h-48 bg-[#ffd451]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3.5 right-3.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-[#8bb4d9] hover:text-white transition-colors active:scale-95 cursor-pointer"
          title="Cerrar y continuar leyendo"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Badges */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffd451]/10 border border-[#ffd451]/30 flex items-center justify-center text-[#ffd451] shadow-lg shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e62628]/20 border border-[#e62628]/40 rounded-full text-[10px] font-mono font-bold tracking-widest text-[#ff8082] uppercase">
            <Lock className="w-3 h-3" />
            <span>ACCESO EXCLUSIVO A AUDIO</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2.5">
          <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white leading-snug">
            INICIA SESIÓN PARA ESCUCHAR LOS PODCAST
          </h3>
          <p className="text-xs sm:text-sm text-[#8bb4d9] font-mono leading-relaxed">
            Puedes <strong className="text-emerald-400">leer y ver toda la página libremente</strong> sin costo. Para activar la narración en audio pódcast de los documentales y recibir notificaciones cuando publiquemos nuevo contenido, inicia sesión o regístrate gratis.
          </p>
        </div>

        {/* Comparison Pills */}
        <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-white/10 font-mono text-xs">
          <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lectura Libre</span>
            </div>
            <p className="text-[10px] text-[#8bb4d9] leading-tight font-sans">
              Lee todos los expedientes, datos técnicos y galerías 100% gratis.
            </p>
          </div>
          <div className="p-2.5 bg-[#14263b] border border-[#4ea0ff]/30 rounded-xl">
            <div className="flex items-center gap-1.5 text-[#ffd451] font-bold text-[11px] mb-1">
              <Headphones className="w-3.5 h-3.5" />
              <span>Audio Pódcast</span>
            </div>
            <p className="text-[10px] text-[#8bb4d9] leading-tight font-sans">
              Locución HD, velocidad 1.1x y banda sonora al iniciar sesión.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              setDismissed(true);
              onOpenAuthModal('INICIA SESIÓN PARA ESCUCHAR LOS PODCAST');
            }}
            className="w-full sm:flex-1 py-3 px-4 bg-[#e62628] hover:bg-[#ff3b3e] text-white font-mono text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(230,38,40,0.4)] flex items-center justify-center gap-2 border border-white/20 active:scale-95 cursor-pointer min-h-[44px]"
          >
            <UserPlus className="w-4 h-4 text-[#ffd451]" />
            <span>REGISTRARSE GRATIS</span>
          </button>

          <button
            onClick={() => {
              setDismissed(true);
              onOpenAuthModal('INICIA SESIÓN PARA ESCUCHAR LOS PODCAST');
            }}
            className="w-full sm:flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer min-h-[44px]"
          >
            <LogIn className="w-4 h-4 text-[#4ea0ff]" />
            <span>INICIAR SESIÓN</span>
          </button>
        </div>

        <div className="mt-3 text-center">
          <button
            onClick={() => setDismissed(true)}
            className="text-[11px] text-[#8bb4d9] hover:text-white font-mono underline underline-offset-4 cursor-pointer"
          >
            Continuar leyendo sin iniciar sesión →
          </button>
        </div>
      </div>
    </div>
  );
}
