import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Headphones, Shield, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  customMessage?: string;
}

export function AuthModal({ isOpen, onClose, customMessage }: AuthModalProps) {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      setSuccessMsg('¡Sesión iniciada con éxito!');
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err: unknown) {
      const error = err as { message?: string; code?: string };
      console.error('Google Auth Error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Ventana de autenticación cerrada. Por favor inténtalo de nuevo.');
      } else if (error.code === 'auth/unauthorized-domain') {
        setErrorMsg('Dominio no autorizado en Firebase. Agrega tu dominio de GitHub Pages en Firebase Console > Authentication > Settings > Authorized domains.');
      } else if (error.code === 'auth/popup-blocked') {
        setErrorMsg('El navegador bloqueó la ventana emergente de Google. Permite las ventanas emergentes (popups) para este sitio.');
      } else {
        setErrorMsg(error.message || 'Error al iniciar sesión con Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        id="auth-modal-card"
        className="relative w-full max-w-md bg-[#0a121c] border border-[#2a4365]/70 rounded-2xl shadow-2xl overflow-hidden text-white my-auto flex flex-col"
      >
        {/* Top Decorative Accent */}
        <div className="h-1.5 bg-gradient-to-r from-[#4ea0ff] via-[#ffd451] to-[#e62628] shrink-0" />

        {/* Close Button */}
        <button
          id="auth-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8bb4d9] hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors z-10 cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Custom Context Message Banner */}
          {customMessage && (
            <div className="flex items-center gap-2.5 p-3.5 mb-5 bg-[#ffd451]/10 border border-[#ffd451]/40 rounded-xl text-xs font-mono font-bold text-[#ffd451] shadow-lg animate-fadeIn">
              <Headphones className="w-5 h-5 text-[#ffd451] shrink-0" />
              <span>{customMessage}</span>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12283e] border border-[#4ea0ff]/30 rounded-full text-[10px] font-mono font-bold tracking-widest text-[#72b9ff] uppercase mb-3">
              <Shield className="w-3.5 h-3.5 text-[#ffd451]" />
              <span>AUTOARCHIVE // COMUNIDAD</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white">
              Iniciar Sesión con Google
            </h3>
            <p className="text-xs text-[#8bb4d9] mt-2 max-w-xs mx-auto font-mono leading-relaxed">
              Accede con tu cuenta de Google para disfrutar de la experiencia completa y recibir novedades automotrices.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="mb-6 p-4 bg-[#060c14] border border-[#192b42] rounded-xl space-y-2.5 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-[#a0c5ea]">
              <Sparkles className="w-4 h-4 text-[#ffd451] shrink-0" />
              <span>Acceso total a todos los documentales y audios</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#a0c5ea]">
              <Headphones className="w-4 h-4 text-[#4ea0ff] shrink-0" />
              <span>Narrador de audio con voz en español (es-ES)</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#a0c5ea]">
              <Shield className="w-4 h-4 text-[#38d39f] shrink-0" />
              <span>Sincronización rápida y segura con 1 clic</span>
            </div>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3 mb-5 bg-[#3d1215] border border-[#ff5356]/40 rounded-xl text-xs text-[#ffb0b2] animate-fadeIn font-mono">
              <AlertCircle className="w-4 h-4 text-[#ff5356] shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start gap-2.5 p-3 mb-5 bg-[#0d2e1c] border border-[#38d39f]/40 rounded-xl text-xs text-[#a0f0d2] animate-fadeIn font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#38d39f] shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Google Sign-in Main Button */}
          <button
            id="auth-google-btn"
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 active:scale-[0.98] text-[#0a121c] font-mono text-sm font-bold tracking-wide rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="text-xs text-slate-700 font-bold">Conectando con Google...</span>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continuar con Google</span>
                <ArrowRight className="w-4 h-4 text-slate-700 ml-auto" />
              </>
            )}
          </button>

          {/* Footer note */}
          <p className="text-[10px] text-center text-[#587391] mt-4 font-mono">
            Autenticación segura proporcionada por Google Identity.
          </p>
        </div>
      </div>
    </div>
  );
}
