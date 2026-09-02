import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { RoutePage } from '../types';
import {
  Mail,
  User as UserIcon,
  LogOut,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
  Edit3
} from 'lucide-react';

interface UserAccountNavProps {
  onNavigate?: (page: RoutePage) => void;
  onOpenAuthModal: () => void;
  onOpenAccountModal?: () => void;
  onOpenBroadcastModal?: () => void;
}

export function UserAccountNav({
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenBroadcastModal
}: UserAccountNavProps) {
  const { user, userProfile, isAdmin, logout, subscribersCount } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          id="nav-login-btn"
          onClick={onOpenAuthModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black hover:bg-[#e2e8f0] text-[11px] font-mono font-bold rounded-lg transition-all shadow-md uppercase tracking-wider active:scale-95 cursor-pointer"
        >
          <UserIcon className="w-3.5 h-3.5" />
          <span>ACCEDER / SUSCRIPCIÓN</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3" ref={dropdownRef}>
      {/* Admin Fast Broadcast Button */}
      {isAdmin && onOpenBroadcastModal && (
        <button
          id="nav-admin-broadcast-btn"
          onClick={onOpenBroadcastModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono font-bold rounded-lg border border-white/20 transition-all shadow-md active:scale-95 uppercase tracking-wider cursor-pointer"
          title="Enviar novedades a los correos de los suscriptores"
        >
          <Sparkles className="w-3.5 h-3.5 text-white/90" />
          <span className="hidden md:inline">¡HAY NOVEDADES EN AUTOARCHIVE!</span>
          <span className="md:hidden">¡NOVEDADES!</span>
        </button>
      )}

      {/* User Avatar Dropdown Button */}
      <div className="relative">
        <button
          id="user-profile-menu-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-left transition-colors cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold font-mono flex items-center justify-center uppercase border border-white/20">
            {(userProfile?.displayName || user.email || 'U').charAt(0)}
          </div>
          <span className="hidden md:inline text-xs font-mono font-bold text-white max-w-[110px] truncate">
            {userProfile?.displayName || user.email?.split('@')[0]}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#0d0d12] border border-white/15 rounded-xl shadow-2xl z-50 overflow-hidden text-white animate-fadeIn">
            {/* User Header */}
            <button
              onClick={() => {
                setDropdownOpen(false);
                if (onOpenAccountModal) onOpenAccountModal();
              }}
              className="w-full text-left p-3.5 border-b border-white/10 bg-[#070709] hover:bg-[#12121a] transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold font-mono text-white truncate group-hover:text-[#e2e8f0]">
                  {userProfile?.displayName || 'Suscriptor'}
                </div>
                <Edit3 className="w-3.5 h-3.5 text-[#64748b] group-hover:text-white" />
              </div>
              <div className="text-[11px] text-[#94a3b8] truncate font-mono mt-0.5">
                {user.email}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 text-white text-[9px] font-mono font-bold rounded border border-white/20">
                    <ShieldCheck className="w-3 h-3" /> ADMINISTRADOR OFICIAL
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 text-[#e2e8f0] text-[9px] font-mono rounded border border-white/10">
                    <Mail className="w-2.5 h-2.5 text-white/80" /> SUSCRIPCIÓN ACTIVA
                  </span>
                )}
              </div>
            </button>

            {/* Menu Items */}
            <div className="p-1.5 space-y-1 text-xs font-mono">
              {isAdmin && (
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    if (onNavigate) onNavigate('admin-panel');
                  }}
                  className="w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg flex items-center justify-between transition-colors font-bold bg-white/5 border border-white/15 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-white/90" />
                    <span>PANEL ADMINISTRATIVO</span>
                  </div>
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/80">
                    {subscribersCount} emails
                  </span>
                </button>
              )}

              {isAdmin && onOpenBroadcastModal && (
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenBroadcastModal();
                  }}
                  className="w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg flex items-center justify-between transition-colors font-bold bg-white/5 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white/90" />
                    <span>¡HAY NOVEDADES!</span>
                  </div>
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/80">
                    {subscribersCount}
                  </span>
                </button>
              )}

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (onOpenAccountModal) onOpenAccountModal();
                }}
                className="w-full px-3 py-2 text-left text-[#cbd5e1] hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-[#94a3b8]" />
                <span>Editar Perfil & Alias</span>
              </button>
            </div>

            {/* Logout */}
            <div className="p-1.5 border-t border-white/10">
              <button
                id="user-logout-btn"
                onClick={async () => {
                  setDropdownOpen(false);
                  await logout();
                }}
                className="w-full px-3 py-2 text-left text-white/70 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2.5 text-xs font-mono transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
