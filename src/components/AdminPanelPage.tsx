import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { RoutePage } from '../types';
import {
  Users,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Database,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Calendar
} from 'lucide-react';

interface AdminPanelPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenBroadcastModal: () => void;
}

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({
  onNavigate,
  onOpenBroadcastModal,
}) => {
  const { user, userProfile, isAdmin, subscribersList, subscribersCount, broadcastsList } = useAuth();
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'subscribers' | 'broadcasts'>('subscribers');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#080b10] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0e1622] border border-white/10 p-8 rounded-2xl text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black font-mono uppercase tracking-tight">Acceso Restringido</h2>
          <p className="text-xs text-[#8bb4d9] font-mono leading-relaxed">
            Este panel de administración está reservado exclusivamente para la cuenta oficial <strong className="text-white">autonoticiascontacto@gmail.com</strong>.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3 bg-[#185a9d] hover:bg-[#2072c4] text-white font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const allEmailsString = subscribersList.map((s) => s.email).filter(Boolean).join(', ');

  const handleCopyEmails = () => {
    navigator.clipboard.writeText(allEmailsString);
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 3000);
  };

  const handleCopySampleText = () => {
    const sample = `¡HAY NOVEDADES EN AUTOARCHIVE!
Hola, lector de AutoArchive.

Se han publicado nuevos expedientes y documentales en el archivo histórico del automovilismo clásico.

Visita nuestra plataforma oficial para descubrirlos:
https://ais-dev-n73ekycyr5bkf2nio2rs55-534265128238.us-west2.run.app/

Atentamente,
AutoNoticias Oficial (autonoticiascontacto@gmail.com)`;

    navigator.clipboard.writeText(sample);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-white selection:bg-[#ffd451] selection:text-black pb-24">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 grid-blueprint opacity-10 pointer-events-none fixed" />

      {/* Top Header Section */}
      <div className="relative border-b border-white/10 bg-[#0a111a]/80 backdrop-blur-md pt-12 pb-8 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#185a9d]/20 border border-[#4ea0ff]/30 rounded-full text-[11px] font-mono font-bold tracking-widest text-[#72b9ff] uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffd451]" />
              <span>PANEL DE CONTROL ADMINISTRATIVO · AUTONOTICIAS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
              Gestión de Suscriptores & Emisión
            </h1>
            <p className="text-xs sm:text-sm text-[#8bb4d9] mt-2 font-mono">
              Cuenta administradora activa: <strong className="text-white">{user?.email || 'autonoticiascontacto@gmail.com'}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBroadcastModal}
              className="px-5 py-3.5 bg-[#e62628] hover:bg-[#ff3b3e] text-white font-mono text-xs font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(230,38,40,0.5)] flex items-center gap-2 border border-white/20 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#ffd451]" />
              <span>¡ENVIAR NUEVO CORREO!</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-[#a0c5ea] hover:text-white font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all"
            >
              Volver a la Web
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-10 relative z-10 space-y-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0e1622] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute right-3 top-3 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#4ea0ff]">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-[11px] font-mono tracking-widest text-[#8bb4d9] uppercase">
              Suscriptores Totales
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mt-2">
              {subscribersCount}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
              <span>● Listos para recibir correos</span>
            </div>
          </div>

          <div className="bg-[#0e1622] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute right-3 top-3 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#ffd451]">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-[11px] font-mono tracking-widest text-[#8bb4d9] uppercase">
              Correo Remitente Oficial
            </div>
            <div className="text-sm font-extrabold font-mono text-white mt-2 truncate">
              autonoticiascontacto@gmail.com
            </div>
            <div className="text-[10px] font-mono text-[#ffd451] mt-2">
              ✓ Cuenta principal verificada
            </div>
          </div>

          <div className="bg-[#0e1622] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute right-3 top-3 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-[11px] font-mono tracking-widest text-[#8bb4d9] uppercase">
              Boletines Enviados
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mt-2">
              {broadcastsList.length}
            </div>
            <div className="text-[10px] font-mono text-purple-300 mt-2">
              Historial en Firestore DB
            </div>
          </div>

          <div className="bg-[#0e1622] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute right-3 top-3 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div className="text-[11px] font-mono tracking-widest text-[#8bb4d9] uppercase">
              Estado Base de Datos
            </div>
            <div className="text-lg font-extrabold font-mono text-emerald-400 mt-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Firestore Activo
            </div>
            <div className="text-[10px] font-mono text-[#8bb4d9] mt-2">
              Sincronización en tiempo real
            </div>
          </div>
        </div>

        {/* Quick Actions Card for Email Copying */}
        <div className="bg-gradient-to-r from-[#0d1c2e] to-[#0a1420] border border-[#1f3652] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ffd451]">
              <Mail className="w-4 h-4" />
              <span>COPIA RÁPIDA DE DESTINATARIOS (BCC)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-mono text-white">
              Copia la lista completa de {subscribersCount} correos electrónicos inscritos
            </h3>
            <p className="text-xs text-[#8bb4d9] font-mono max-w-2xl leading-relaxed">
              Usa este botón para copiar todos los correos en portapapeles y pegarlos en el campo **CCO (Copia Oculta)** de tu cliente de Gmail (`autonoticiascontacto@gmail.com`).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleCopyEmails}
              className="flex-1 lg:flex-none px-6 py-3.5 bg-[#185a9d] hover:bg-[#2072c4] text-white font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {copiedEmails ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡CORREOS COPIADOS!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#ffd451]" />
                  <span>COPIAR {subscribersCount} EMAILS</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopySampleText}
              className="flex-1 lg:flex-none px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-[#a0c5ea] hover:text-white font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡TEXTO COPIADO!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPIAR PLANTILLA EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setSelectedTab('subscribers')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              selectedTab === 'subscribers'
                ? 'bg-[#185a9d] text-white shadow-lg border border-[#4ea0ff]/40'
                : 'bg-white/5 text-[#8bb4d9] hover:bg-white/10 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-[#ffd451]" />
            <span>Lista de Suscriptores ({subscribersList.length})</span>
          </button>

          <button
            onClick={() => setSelectedTab('broadcasts')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              selectedTab === 'broadcasts'
                ? 'bg-[#185a9d] text-white shadow-lg border border-[#4ea0ff]/40'
                : 'bg-white/5 text-[#8bb4d9] hover:bg-white/10 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4 text-[#ffd451]" />
            <span>Historial de Boletines ({broadcastsList.length})</span>
          </button>
        </div>

        {/* Tab Content: Subscribers List */}
        {selectedTab === 'subscribers' && (
          <div className="bg-[#0e1622] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold font-mono text-white">Correos Registrados en la Base de Datos</h3>
                <p className="text-xs text-[#8bb4d9] font-mono mt-1">
                  Usuarios inscritos para recibir alertas desde autonoticiascontacto@gmail.com
                </p>
              </div>
              <div className="text-xs font-mono text-[#ffd451] bg-[#ffd451]/10 px-3 py-1.5 rounded-lg border border-[#ffd451]/20">
                Total: {subscribersList.length} suscriptores activos
              </div>
            </div>

            <div className="divide-y divide-white/10 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#080e18] text-[#8bb4d9] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-6">#</th>
                    <th className="py-3.5 px-6">Nombre / Perfil</th>
                    <th className="py-3.5 px-6">Correo Electrónico</th>
                    <th className="py-3.5 px-6">Rol</th>
                    <th className="py-3.5 px-6">Alertas Docs</th>
                    <th className="py-3.5 px-6">Fecha Registro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {subscribersList.map((sub, idx) => (
                    <tr key={sub.uid || idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 text-[#5b7a9e]">{idx + 1}</td>
                      <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#185a9d] text-white flex items-center justify-center text-[10px]">
                          {sub.displayName.charAt(0).toUpperCase()}
                        </div>
                        <span>{sub.displayName}</span>
                      </td>
                      <td className="py-4 px-6 text-[#72b9ff]">
                        <a href={`mailto:${sub.email}`} className="hover:underline flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#ffd451]" />
                          {sub.email}
                        </a>
                      </td>
                      <td className="py-4 px-6">
                        {sub.role === 'admin' ? (
                          <span className="px-2 py-0.5 bg-[#ffd451]/20 text-[#ffd451] text-[10px] font-bold rounded border border-[#ffd451]/30">
                            ADMIN
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-white/5 text-[#8bb4d9] text-[10px] rounded">
                            SUSCRIPTOR
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-emerald-400">
                        {sub.receiveDocumentaryAlerts !== false ? '✓ Activadas' : 'Desactivadas'}
                      </td>
                      <td className="py-4 px-6 text-[#8bb4d9]">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'Reciente'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Broadcasts History */}
        {selectedTab === 'broadcasts' && (
          <div className="space-y-4">
            {broadcastsList.length === 0 ? (
              <div className="bg-[#0e1622] border border-white/10 rounded-2xl p-12 text-center space-y-3">
                <Mail className="w-12 h-12 text-[#8bb4d9] mx-auto opacity-50" />
                <h3 className="text-base font-bold font-mono text-white">No hay boletines enviados todavía</h3>
                <p className="text-xs text-[#8bb4d9] font-mono max-w-sm mx-auto">
                  Haz clic en el botón rojo de enviar novedades para despachar el primer comunicado oficial a los suscriptores.
                </p>
              </div>
            ) : (
              broadcastsList.map((broadcast) => (
                <div key={broadcast.id} className="bg-[#0e1622] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-[#185a9d]/30 text-[#72b9ff] text-[10px] font-mono font-bold uppercase rounded border border-[#4ea0ff]/30">
                          {broadcast.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#8bb4d9]">
                          Enviado por: <strong className="text-white">{broadcast.senderEmail}</strong>
                        </span>
                      </div>
                      <h4 className="text-lg font-bold font-mono text-white">{broadcast.subject}</h4>
                    </div>

                    <div className="text-right font-mono text-xs text-[#8bb4d9]">
                      <div className="flex items-center gap-1 text-emerald-400 justify-end">
                        <Users className="w-3.5 h-3.5" />
                        <span>{broadcast.recipientCount} Destinatarios</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 justify-end text-[10px]">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(broadcast.sentAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#070b12] border border-white/5 rounded-xl text-xs font-mono text-[#a2b2c4] whitespace-pre-wrap leading-relaxed">
                    {broadcast.body}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
