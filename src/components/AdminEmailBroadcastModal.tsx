import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Send,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Users,
  X,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';

interface AdminEmailBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminEmailBroadcastModal: React.FC<AdminEmailBroadcastModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, subscribersList, subscribersCount, sendBroadcastEmail, refreshSubscribers } = useAuth();
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const senderEmail = 'autonoticiascontacto@gmail.com';
  const emailSubject = '¡HAY NOVEDADES EN AUTOARCHIVE!';

  const emailBody = `¡HAY NOVEDADES EN AUTOARCHIVE!

Hola a todos los suscriptores del Archivo Histórico Automotriz,

Les informamos que se han publicado nuevas entregas desclasificadas en la plataforma de AutoArchive:

★ 5 GRANDES DOCUMENTALES DISPONIBLES:
1. Nissan Skyline GT-R R34 (RB26DETT Twin Turbo, MFD y Tracción Integral)
2. Toyota Supra MK4 A80 (Motor 2JZ-GTE, Biturbo Secuencial y Mito de los 90)
3. Lamborghini Countach LP400 / 5000 QV (Diseño Cuña V12 de Marcello Gandini)
4. Ferrari F40 vs Lamborghini Miura (Duelo de Leyendas: Génesis y Apocalipsis)
5. Jaguar XJ220 (El Dios Caído que rompió el récord a 349.4 km/h en Nardò)

★ 16 DATOS CURIOSOS Y EXPEDIENTES DESCLASIFICADOS:
Secretos técnicos, anécdotas de prototipos y récords mundiales inéditos.

Ingresa ya a leer y explorar todas las monografías:
https://ais-pre-n73ekycyr5bkf2nio2rs55-534265128238.us-west2.run.app

—
AutoArchive · Archivo Histórico Automotriz
Contacto Oficial: ${senderEmail}`;

  // Extract subscriber email list
  const subscriberEmails = subscribersList
    .map((s) => s.email)
    .filter((e) => Boolean(e) && e.includes('@'));

  // Ensure unique list
  const uniqueEmails = Array.from(new Set(subscriberEmails));
  const bccString = uniqueEmails.join(',');

  const handleSendToEmails = async () => {
    setIsSending(true);
    setErrorStatus(null);
    setSuccessStatus(null);

    try {
      // 1. Register broadcast in database
      const res = await sendBroadcastEmail({
        senderEmail,
        senderName: 'AutoNoticias Oficial',
        subject: emailSubject,
        category: 'especial',
        targetAudience: 'all',
        body: emailBody,
        targetUrl: 'home',
        targetName: 'Explorar Novedades en AutoArchive',
      });

      // 2. Open Gmail Web compose with pre-filled BCC, subject and body
      const encodedSubject = encodeURIComponent(emailSubject);
      const encodedBody = encodeURIComponent(emailBody);
      const encodedBcc = encodeURIComponent(bccString);

      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&bcc=${encodedBcc}&su=${encodedSubject}&body=${encodedBody}`;
      
      // Try opening Gmail compose in new tab
      window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');

      // Also trigger mailto as fallback
      const mailtoUri = `mailto:${senderEmail}?bcc=${encodedBcc}&subject=${encodedSubject}&body=${encodedBody}`;
      const mailtoLink = document.createElement('a');
      mailtoLink.href = mailtoUri;
      mailtoLink.style.display = 'none';
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);

      setSuccessStatus(
        `¡Alerta preparada y enviada a los correos electrónicos de los ${res.recipientCount} suscriptores registrados desde ${senderEmail}!`
      );
      await refreshSubscribers();
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorStatus(error.message || 'Error al emitir el correo a los suscriptores.');
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyEmails = () => {
    if (uniqueEmails.length === 0) {
      navigator.clipboard.writeText(senderEmail);
    } else {
      navigator.clipboard.writeText(uniqueEmails.join(', '));
    }
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(emailBody);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        id="admin-email-broadcast-modal"
        className="w-full max-w-2xl bg-[#09111c] border-2 border-[#ffd451] rounded-2xl shadow-[0_0_50px_rgba(255,212,81,0.2)] overflow-hidden text-white animate-scaleUp max-h-[90vh] flex flex-col"
      >
        {/* Top Gradient Line */}
        <div className="h-1.5 bg-gradient-to-r from-[#ffd451] via-[#e62628] to-[#4ea0ff] shrink-0" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#182b42] flex items-center justify-between shrink-0 bg-[#060c14]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffd451]/15 border border-[#ffd451]/40 flex items-center justify-center text-[#ffd451]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 bg-[#ffd451] text-black font-mono font-black uppercase tracking-wider rounded">
                  PANEL ADMIN
                </span>
                <span className="text-xs font-mono text-[#8bb4d9]">
                  {senderEmail}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-mono font-black text-white mt-1">
                Enviar Notificación por Correo Electrónico
              </h2>
            </div>
          </div>

          <button
            id="close-admin-broadcast-modal-btn"
            onClick={onClose}
            className="p-2 text-[#8bb4d9] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Status Messages */}
          {successStatus && (
            <div className="p-4 bg-[#143323] border border-[#38d39f]/50 rounded-xl flex items-start gap-3 text-xs text-[#59eab9]">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#38d39f] mt-0.5" />
              <div>
                <strong className="block text-sm font-bold text-white mb-0.5 font-mono">
                  ¡Notificación Emitida a los Correos!
                </strong>
                <p className="leading-relaxed">{successStatus}</p>
              </div>
            </div>
          )}

          {errorStatus && (
            <div className="p-4 bg-[#3b1216] border border-[#e62628]/50 rounded-xl text-xs text-[#ff8082]">
              {errorStatus}
            </div>
          )}

          {/* Recipient summary card */}
          <div className="bg-[#050c14] border border-[#1b3452] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8bb4d9]">
                <Users className="w-4 h-4 text-[#ffd451]" />
                <span>Suscriptores que recibirán el correo:</span>
                <strong className="text-white bg-[#1a385c] px-2 py-0.5 rounded font-bold">
                  {subscribersCount || uniqueEmails.length} correos registrados
                </strong>
              </div>

              <button
                type="button"
                onClick={handleCopyEmails}
                className="text-[11px] font-mono text-[#72b9ff] hover:text-white flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedEmails ? '¡Correos copiados!' : 'Copiar lista de emails'}</span>
              </button>
            </div>

            {/* Email addresses preview */}
            {uniqueEmails.length > 0 && (
              <div className="max-h-20 overflow-y-auto p-2 bg-[#02060a] border border-white/10 rounded text-[11px] font-mono text-[#8bb4d9] flex flex-wrap gap-1.5">
                {uniqueEmails.map((email, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[#0e1e30] text-[#a0c5ea] rounded border border-[#1d3c60]"
                  >
                    {email}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Email Subject preview */}
          <div>
            <label className="block text-xs font-mono text-[#8bb4d9] uppercase tracking-wider mb-1.5">
              Asunto del Correo Electrónico:
            </label>
            <div className="w-full px-4 py-3 bg-[#050c14] border-2 border-[#ffd451]/70 rounded-xl text-white font-mono font-black text-sm sm:text-base flex items-center justify-between">
              <span>{emailSubject}</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#ffd451] text-black font-bold rounded">
                OFICIAL
              </span>
            </div>
          </div>

          {/* Email Body preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono text-[#8bb4d9] uppercase tracking-wider">
                Contenido que llegará a los correos:
              </label>
              <button
                type="button"
                onClick={handleCopyBody}
                className="text-[11px] font-mono text-[#72b9ff] hover:text-white flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedBody ? '¡Texto copiado!' : 'Copiar texto'}</span>
              </button>
            </div>

            <pre className="w-full p-4 bg-[#050c14] border border-[#1b3452] rounded-xl text-xs font-sans text-[#c8dced] whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
              {emailBody}
            </pre>
          </div>

          <div className="p-3 bg-[#0c1c2e] border border-[#1b3f66] rounded-xl flex items-start gap-2.5 text-[11px] text-[#8bb4d9]">
            <Info className="w-4 h-4 text-[#4ea0ff] shrink-0 mt-0.5" />
            <p>
              Al presionar el botón de emisión, se notificará a las cuentas de correo electrónico de los suscriptores y se abrirá el remitente oficial desde <strong>{senderEmail}</strong> con todos los destinatarios en copia oculta (BCC).
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-[#182b42] bg-[#060c14] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold rounded-xl transition-colors"
          >
            Cerrar
          </button>

          <button
            id="modal-send-broadcast-emails-btn"
            type="button"
            disabled={isSending}
            onClick={handleSendToEmails}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#e62628] hover:bg-[#ff3b3e] active:scale-95 disabled:opacity-50 text-white font-mono text-xs sm:text-sm font-black tracking-wider uppercase rounded-xl transition-all shadow-[0_0_25px_rgba(230,38,40,0.5)] flex items-center justify-center gap-2.5 border border-white/20"
          >
            {isSending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>ENVIANDO A LOS CORREOS...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#ffd451]" />
                <span>¡HAY NOVEDADES EN AUTOARCHIVE!</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
