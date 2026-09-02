import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Headphones, Shield, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Mail, Lock, User, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  customMessage?: string;
}

export function AuthModal({ isOpen, onClose, initialMode = 'login', customMessage }: AuthModalProps) {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, loginAsGuest } = useAuth();
  const [mode, setMode] = useState<'google' | 'email-login' | 'email-register' | 'guest'>(initialMode === 'register' ? 'email-register' : 'google');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [guestAlias, setGuestAlias] = useState('');

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
      }, 300);
    } catch (err: unknown) {
      const error = err as { message?: string; code?: string };
      console.error('Google Auth Error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Ventana de autenticación cerrada. Por favor inténtalo de nuevo.');
      } else if (error.code === 'auth/unauthorized-domain') {
        setErrorMsg('Dominio no autorizado para Google OAuth. Puedes ingresar con Correo o como Invitado en las pestañas arriba.');
      } else if (error.code === 'auth/popup-blocked') {
        setErrorMsg('El navegador bloqueó la ventana emergente. Habilita popups o ingresa con Correo / Invitado.');
      } else {
        setErrorMsg(error.message || 'Error al conectar con Google. Puedes usar la pestaña Correo o Invitado.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      setSuccessMsg('¡Sesión iniciada con éxito!');
      setTimeout(() => onClose(), 500);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMsg(error.message || 'Error al iniciar sesión con correo.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setErrorMsg('Por favor completa tu nombre, correo y contraseña.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      await registerWithEmail(email, password, name);
      setSuccessMsg('¡Cuenta creada e iniciada con éxito!');
      setTimeout(() => onClose(), 500);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMsg(error.message || 'Error al crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await loginAsGuest(guestAlias);
      setSuccessMsg('¡Acceso como invitado exitoso!');
      setTimeout(() => onClose(), 500);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMsg(error.message || 'Error al iniciar como invitado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div 
        id="auth-modal-card"
        className="relative w-full max-w-md bg-[#0d0d14] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-white my-auto flex flex-col"
      >
        {/* Top Decorative Accent */}
        <div className="h-1 bg-gradient-to-r from-white via-white/40 to-transparent shrink-0" />

        {/* Close Button */}
        <button
          id="auth-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#94a3b8] hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors z-10 cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          {/* Custom Context Message Banner */}
          {customMessage && (
            <div className="flex items-center gap-2.5 p-3.5 mb-5 bg-white/5 border border-white/15 rounded-xl text-xs font-mono font-bold text-white shadow-lg animate-fadeIn">
              <Headphones className="w-5 h-5 text-white shrink-0" />
              <span>{customMessage}</span>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 rounded-full text-[10px] font-mono font-bold tracking-widest text-[#cbd5e1] uppercase mb-3">
              <Shield className="w-3.5 h-3.5 text-white" />
              <span>AUTOARCHIVE // SUSCRIPCIÓN & ACCESO</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
              {mode === 'email-register' ? 'Crear Cuenta' : mode === 'guest' ? 'Acceso Invitado' : 'Iniciar Sesión'}
            </h3>
            <p className="text-xs text-[#94a3b8] mt-2 max-w-xs mx-auto font-mono leading-relaxed">
              Disfruta de la experiencia completa de archivo automotriz, comentarios y audios.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 mb-6 p-1 bg-[#070709] border border-white/10 rounded-xl text-[11px] font-mono">
            <button
              onClick={() => { setMode('google'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${mode === 'google' ? 'bg-white text-black shadow font-extrabold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              Google
            </button>
            <button
              onClick={() => { setMode('email-login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${mode === 'email-login' || mode === 'email-register' ? 'bg-white text-black shadow font-extrabold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              Correo
            </button>
            <button
              onClick={() => { setMode('guest'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${mode === 'guest' ? 'bg-white text-black shadow font-extrabold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              Invitado
            </button>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3 mb-5 bg-[#250d0e] border border-white/20 rounded-xl text-xs text-[#fca5a5] animate-fadeIn font-mono">
              <AlertCircle className="w-4 h-4 text-[#f87171] shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start gap-2.5 p-3 mb-5 bg-[#0e2417] border border-white/20 rounded-xl text-xs text-[#86efac] animate-fadeIn font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* GOOGLE MODE */}
          {mode === 'google' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#070709] border border-white/10 rounded-xl space-y-2.5 text-xs font-mono">
                <div className="flex items-center gap-2.5 text-[#cbd5e1]">
                  <Sparkles className="w-4 h-4 text-white shrink-0" />
                  <span>Acceso rápido con un solo clic</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#cbd5e1]">
                  <Headphones className="w-4 h-4 text-white shrink-0" />
                  <span>Narrador y sincronización automática</span>
                </div>
              </div>

              <button
                id="auth-google-btn"
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-3.5 px-4 bg-white hover:bg-[#e2e8f0] active:scale-[0.98] text-black font-mono text-sm font-bold tracking-wide rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="text-xs text-black font-bold">Conectando...</span>
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Continuar con Google</span>
                    <ArrowRight className="w-4 h-4 text-black ml-auto" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-[#64748b] pt-2 font-mono">
                ¿Problemas de red o dominio? Usa la pestaña <b>Correo</b> o <b>Invitado</b> arriba.
              </p>
            </div>
          )}

          {/* EMAIL LOGIN / REGISTER MODE */}
          {mode === 'email-login' && (
            <form onSubmit={handleEmailLogin} className="space-y-4 font-mono">
              <div>
                <label className="block text-[11px] text-[#cbd5e1] mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#64748b]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#070709] border border-white/15 rounded-xl text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#cbd5e1] mb-1">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#64748b]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-[#070709] border border-white/15 rounded-xl text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white hover:bg-[#e2e8f0] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión con Correo'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setMode('email-register'); setErrorMsg(''); }}
                  className="text-xs text-[#cbd5e1] hover:text-white underline cursor-pointer"
                >
                  ¿No tienes cuenta? Regístrate aquí
                </button>
              </div>
            </form>
          )}

          {mode === 'email-register' && (
            <form onSubmit={handleEmailRegister} className="space-y-4 font-mono">
              <div>
                <label className="block text-[11px] text-[#cbd5e1] mb-1">Nombre o Alias</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#64748b]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu Nombre"
                    className="w-full pl-10 pr-4 py-3 bg-[#070709] border border-white/15 rounded-xl text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#cbd5e1] mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#64748b]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#070709] border border-white/15 rounded-xl text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#cbd5e1] mb-1">Contraseña (mínimo 6 caracteres)</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#64748b]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-[#070709] border border-white/15 rounded-xl text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white hover:bg-[#e2e8f0] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? 'Creando cuenta...' : 'Registrarme'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setMode('email-login'); setErrorMsg(''); }}
                  className="text-xs text-[#cbd5e1] hover:text-white underline cursor-pointer"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </form>
          )}

          {/* GUEST MODE */}
          {mode === 'guest' && (
            <form onSubmit={handleGuestLogin} className="space-y-4 font-mono">
              <div className="p-3 bg-[#070709] border border-white/10 rounded-xl text-xs text-[#94a3b8]">
                Entra de forma instantánea sin contraseña ni correo electrónico.
              </div>

              <div>
                <label className="block text-[11px] text-[#cbd5e1] mb-1">Tu Alias o Nombre (Opcional)</label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-[#64748b]" />
                  <input
                    type="text"
                    value={guestAlias}
                    onChange={(e) => setGuestAlias(e.target.value)}
                    placeholder="Ej. Entusiasta_99"
                    className="w-full pl-10 pr-4 py-3 bg-[#070709] border border-white/15 rounded-xl text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white hover:bg-[#e2e8f0] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Entrar como Invitado'}
              </button>
            </form>
          )}

          {/* Footer note */}
          <p className="text-[10px] text-center text-[#64748b] mt-6 font-mono">
            Autenticación segura respaldada por Firebase Auth.
          </p>
        </div>
      </div>
    </div>
  );
}
