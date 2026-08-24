import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Send, Users, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';

interface AdminTopBroadcastBarProps {
  onOpenBroadcastModal: () => void;
}

export const AdminTopBroadcastBar: React.FC<AdminTopBroadcastBarProps> = ({
  onOpenBroadcastModal,
}) => {
  const { user, isAdmin, subscribersCount } = useAuth();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isAdmin) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="px-3.5 py-2 bg-[#ffd451] hover:bg-[#ffdf6d] text-black font-mono font-black text-xs uppercase rounded-xl shadow-2xl flex items-center gap-2 border-2 border-black transition-all hover:scale-105 active:scale-95"
          title="Mostrar barra de administrador"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>ADMINISTRADOR</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <aside
      id="admin-top-broadcast-bar"
      aria-label="Barra de administración de avisos"
      className="w-full bg-gradient-to-r from-[#261704] via-[#3d2906] to-[#142338] border-b-2 border-[#ffd451] text-white px-4 sm:px-8 py-2.5 z-40 sticky top-0 backdrop-blur-lg bg-opacity-95 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#ffd451] text-black font-mono font-black text-[10px] tracking-wider uppercase rounded shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            ADMINISTRADOR
          </span>

          <span className="text-xs font-mono text-[#ffd451] font-bold">
            {user?.email || 'autonoticiascontacto@gmail.com'}
          </span>

          <span className="text-[#6582a4] text-xs hidden md:inline">|</span>

          <span className="text-[11px] font-mono text-[#8bb4d9] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#38d39f]" />
            <strong className="text-white">{subscribersCount}</strong> suscriptores registrados
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            id="admin-bar-novedades-btn"
            type="button"
            onClick={onOpenBroadcastModal}
            className="w-full sm:w-auto px-4 py-2 bg-[#e62628] hover:bg-[#ff3437] active:scale-95 text-white font-mono text-xs font-black tracking-wider uppercase rounded-lg transition-all shadow-[0_0_15px_rgba(230,38,40,0.5)] flex items-center justify-center gap-2 border border-white/20 group"
          >
            <Sparkles className="w-4 h-4 text-[#ffd451] group-hover:rotate-12 transition-transform" />
            <span>¡HAY NOVEDADES EN AUTOARCHIVE!</span>
            <Send className="w-3.5 h-3.5 text-white" />
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 bg-white/10 hover:bg-white/20 text-[#ffd451] rounded-lg transition-all"
            title="Ocultar barra superior"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
