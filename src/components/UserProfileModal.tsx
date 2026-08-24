import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { RoutePage } from '../types';
import {
  X,
  User,
  Mail,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Save,
  LogOut,
  Calendar,
  Sparkles,
  LayoutDashboard,
  Inbox,
  ExternalLink,
  Edit3
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: RoutePage) => void;
  onOpenBroadcastModal?: () => void;
}

export function UserProfileModal({
  isOpen,
  onClose,
  onNavigate,
  onOpenBroadcastModal
}: UserProfileModalProps) {
  const {
    user,
    userProfile,
    isAdmin,
    logout,
    updateUserProfile,
    notifications,
    unreadCount,
    markAllNotificationsAsRead,
    markNotificationAsRead
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'inbox'>('profile');
  const [displayNameInput, setDisplayNameInput] = useState('');
  const [docAlerts, setDocAlerts] = useState(true);
  const [factsAlerts, setFactsAlerts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
      setDisplayNameInput(userProfile.displayName || '');
      setDocAlerts(userProfile.receiveDocumentaryAlerts ?? true);
      setFactsAlerts(userProfile.receiveFactsAlerts ?? true);
    } else if (user) {
      setDisplayNameInput(user.displayName || user.email?.split('@')[0] || '');
    }
  }, [userProfile, user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await updateUserProfile({
        displayName: displayNameInput,
        receiveDocumentaryAlerts: docAlerts,
        receiveFactsAlerts: factsAlerts,
      });

      setSuccessMessage('¡Tu perfil ha sido actualizado correctamente!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error al actualizar el perfil. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Reciente';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#08101a] border border-[#1d3550] rounded-2xl shadow-2xl overflow-hidden my-auto text-white">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#182f47] bg-[#050b12] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d92f31] via-[#185a9d] to-[#4ea0ff] p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full rounded-full bg-[#08101a] flex items-center justify-center font-mono font-bold text-base text-white uppercase">
                {(displayNameInput || user.email || 'U').charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Mi Cuenta & Perfil
                </h2>
                {isAdmin ? (
                  <span className="px-2 py-0.5 bg-[#ffd451]/15 border border-[#ffd451]/40 text-[#ffd451] text-[9px] font-mono font-bold rounded uppercase">
                    Admin
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-[#122c47] border border-[#4ea0ff]/30 text-[#70b7ff] text-[9px] font-mono rounded uppercase">
                    Suscriptor
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8bb4d9] font-mono truncate max-w-[240px] sm:max-w-xs">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8bb4d9] hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#182f47] bg-[#060d17] font-mono text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-bold transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-[#4ea0ff] text-[#4ea0ff] bg-[#4ea0ff]/10'
                : 'border-transparent text-[#8bb4d9] hover:text-white hover:bg-white/5'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>MODIFICAR PERFIL</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-bold transition-colors border-b-2 ${
              activeTab === 'inbox'
                ? 'border-[#4ea0ff] text-[#4ea0ff] bg-[#4ea0ff]/10'
                : 'border-transparent text-[#8bb4d9] hover:text-white hover:bg-white/5'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>BANDEJA AVISOS</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#e62628] text-white text-[10px] font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-5">

          {/* Messages Alert */}
          {successMessage && (
            <div className="p-3 bg-[#103a27] border border-[#22c55e]/40 rounded-xl text-xs font-mono text-[#4ade80] flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-[#3d1215] border border-[#ff5254]/40 rounded-xl text-xs font-mono text-[#ff8082] flex items-center gap-2 animate-fadeIn">
              <X className="w-4 h-4 text-[#ff5254] shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: MODIFICAR PERFIL */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              
              {/* Profile Details Block */}
              <div className="p-4 bg-[#050c14] border border-[#162a40] rounded-xl space-y-4">
                <div className="text-xs font-mono font-bold tracking-widest text-[#4ea0ff] uppercase flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>DATOS DE LA CUENTA</span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8bb4d9] mb-1.5 font-semibold">
                    Nombre o Apodo de Usuario:
                  </label>
                  <input
                    type="text"
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                    placeholder="Escribe tu nombre..."
                    className="w-full px-3.5 py-2.5 bg-[#0a1624] border border-[#203a57] focus:border-[#4ea0ff] rounded-xl text-sm font-mono text-white outline-none transition-all"
                    required
                  />
                  <p className="mt-1 text-[11px] font-mono text-[#5f7d9c]">
                    Este nombre aparecerá en tus interacciones y comunicados oficiales.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 bg-[#0a1522] border border-[#182e45] rounded-lg">
                    <span className="text-[10px] text-[#5f7d9c] uppercase block">Correo Registrado</span>
                    <span className="text-white font-bold truncate block">{user.email}</span>
                  </div>

                  <div className="p-3 bg-[#0a1522] border border-[#182e45] rounded-lg">
                    <span className="text-[10px] text-[#5f7d9c] uppercase block flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#4ea0ff]" /> Miembro Desde
                    </span>
                    <span className="text-white font-bold block">{formatDate(userProfile?.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Preferences Block */}
              <div className="p-4 bg-[#050c14] border border-[#162a40] rounded-xl space-y-3">
                <div className="text-xs font-mono font-bold tracking-widest text-[#ffd451] uppercase flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>ALERTAS POR CORREO ELECTRÓNICO</span>
                </div>

                <p className="text-xs font-mono text-[#8bb4d9] leading-relaxed">
                  Recibirás las avisos desde el remitente oficial <strong>autonoticiascontacto@gmail.com</strong>:
                </p>

                <div className="space-y-2.5 pt-1 font-mono text-xs">
                  <label className="flex items-center justify-between p-3 bg-[#0a1522] border border-[#182e45] rounded-xl cursor-pointer hover:border-[#4ea0ff]/40 transition-colors">
                    <div className="flex items-center gap-2.5 pr-2">
                      <Mail className="w-4 h-4 text-[#4ea0ff] shrink-0" />
                      <div>
                        <span className="text-white font-bold block">Documentales de Automovilismo</span>
                        <span className="text-[11px] text-[#8bb4d9]">Alertas al publicar monografías completas</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={docAlerts}
                      onChange={(e) => setDocAlerts(e.target.checked)}
                      className="w-4 h-4 accent-[#4ea0ff] cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-[#0a1522] border border-[#182e45] rounded-xl cursor-pointer hover:border-[#ffd451]/40 transition-colors">
                    <div className="flex items-center gap-2.5 pr-2">
                      <Sparkles className="w-4 h-4 text-[#ffd451] shrink-0" />
                      <div>
                        <span className="text-white font-bold block">Datos Curiosos y Secretos</span>
                        <span className="text-[11px] text-[#8bb4d9]">Avisos de expedientes e hitos mecánicos</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={factsAlerts}
                      onChange={(e) => setFactsAlerts(e.target.checked)}
                      className="w-4 h-4 accent-[#ffd451] cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Admin or Special Action Buttons */}
              {isAdmin && (
                <div className="p-3.5 bg-[#ffd451]/10 border border-[#ffd451]/30 rounded-xl flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#ffd451]">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Posees rango de Administrador Oficial</span>
                  </div>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate('admin-panel');
                      }}
                      className="px-3 py-1.5 bg-[#ffd451] text-[#08101a] font-bold rounded-lg hover:bg-[#ffe07d] transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>PANEL ADMIN</span>
                    </button>
                  )}
                </div>
              )}

              {/* Save Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#185a9d] to-[#4ea0ff] hover:from-[#1b64ae] hover:to-[#63acff] text-white font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? 'GUARDANDO CAMBIOS...' : 'GUARDAR MODIFICACIONES'}</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: INBOX / COMUNICADOS */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#8bb4d9]">
                  Mensajes oficiales de <strong className="text-white">autonoticiascontacto@gmail.com</strong>
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[#4ea0ff] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Marcar todos como leídos</span>
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="p-8 text-center bg-[#050c14] border border-[#162a40] rounded-xl font-mono">
                  <Inbox className="w-8 h-8 text-[#5f7d9c] mx-auto mb-2" />
                  <p className="text-xs text-[#8bb4d9] font-bold">No tienes avisos en tu bandeja.</p>
                  <p className="text-[11px] text-[#5f7d9c] mt-1">
                    Cada vez que emitamos un boletín desde autonoticiascontacto@gmail.com, aparecerá aquí.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-4 border rounded-xl font-mono transition-all ${
                        notif.read
                          ? 'bg-[#050c14] border-[#162a40] text-[#8bb4d9]'
                          : 'bg-[#0d1e30] border-[#4ea0ff]/40 text-white shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded font-bold text-[#ffd451]">
                          {notif.senderName || 'AutoNoticias Oficial'}
                        </span>
                        <span className="text-[10px] text-[#5f7d9c]">
                          {formatDate(notif.receivedAt)}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white mb-1">
                        {notif.subject}
                      </h4>

                      <p className="text-xs text-[#8bb4d9] leading-relaxed whitespace-pre-line mb-3">
                        {notif.body}
                      </p>

                      {notif.targetName && onNavigate && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                            if (notif.targetUrl && notif.targetUrl !== '#') {
                              onNavigate(notif.targetUrl as RoutePage);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#185a9d] hover:bg-[#2072c4] text-white text-[10px] font-bold rounded-lg transition-colors"
                        >
                          <span>VER {notif.targetName}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-[#182f47] bg-[#050b12] flex items-center justify-between">
          <button
            onClick={async () => {
              onClose();
              await logout();
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#3d1215] hover:bg-[#57191d] text-[#ff8082] text-xs font-mono font-bold rounded-xl transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>CERRAR SESIÓN</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#8bb4d9] hover:text-white text-xs font-mono rounded-xl transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
