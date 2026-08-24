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
  Edit3,
  UserCheck
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
          className="flex items-center gap-1 px-2.5 py-1 bg-[#d92f31] hover:bg-[#b82325] text-white text-[10px] font-mono font-bold rounded-md transition-all shadow-sm uppercase tracking-wider active:scale-95"
        >
          <UserIcon className="w-3 h-3" />
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
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e62628] hover:bg-[#ff3b3e] text-white text-[11px] font-mono font-black rounded-lg border border-white/20 transition-all shadow-[0_0_15px_rgba(230,38,40,0.4)] active:scale-95 uppercase tracking-wider"
          title="Enviar novedades a los correos de los suscriptores"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ffd451]" />
          <span className="hidden md:inline">¡HAY NOVEDADES EN AUTOARCHIVE!</span>
          <span className="md:hidden">¡NOVEDADES!</span>
        </button>
      )}

      {/* User Avatar Dropdown Button */}
      <div className="relative">
        <button
          id="user-profile-menu-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#185a9d] to-[#4ea0ff] text-white text-xs font-bold font-mono flex items-center justify-center uppercase">
            {(userProfile?.displayName || user.email || 'U').charAt(0)}
          </div>
          <span className="hidden md:inline text-xs font-mono font-bold text-white max-w-[110px] truncate">
            {userProfile?.displayName || user.email?.split('@')[0]}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#8bb4d9]" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#0a121c] border border-[#1f3652] rounded-xl shadow-2xl z-50 overflow-hidden text-white animate-fadeIn">
            {/* User Header */}
            <button
              onClick={() => {
                setDropdownOpen(false);
                if (onOpenAccountModal) onOpenAccountModal();
              }}
              className="w-full text-left p-3.5 border-b border-[#1b3452] bg-[#060c14] hover:bg-[#0a1522] transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold font-mono text-white truncate group-hover:text-[#4ea0ff]">
                  {userProfile?.displayName || 'Suscriptor'}
                </div>
                <Edit3 className="w-3.5 h-3.5 text-[#5f7d9c] group-hover:text-[#4ea0ff]" />
              </div>
              <div className="text-[11px] text-[#8bb4d9] truncate font-mono">
                {user.email}
              </div>
              <div className="mt-1.5">
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ffd451]/15 text-[#ffd451] text-[9px] font-mono font-bold rounded border border-[#ffd451]/30">
                    <ShieldCheck className="w-3 h-3" /> ADMINISTRADOR OFICIAL
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#12283e] text-[#72b9ff] text-[9px] font-mono rounded">
                    <Mail className="w-2.5 h-2.5 text-[#38d39f]" /> SUSCRIPCIÓN ACTIVA
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
                  className="w-full px-3 py-2 text-left text-white hover:bg-white/5 rounded-lg flex items-center justify-between transition-colors font-bold bg-[#185a9d]/30 border border-[#4ea0ff]/30"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#4ea0ff]" />
                    <span>PANEL ADMINISTRATIVO</span>
                  </div>
                  <span className="text-[10px] bg-[#4ea0ff]/20 px-1.5 py-0.5 rounded text-[#72b9ff]">
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
                  className="w-full px-3 py-2 text-left text-[#ffd451] hover:bg-white/5 rounded-lg flex items-center justify-between transition-colors font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ffd451]" />
                    <span>¡HAY NOVEDADES!</span>
                  </div>
                  <span className="text-[10px] bg-[#ffd451]/20 px-1.5 py-0.5 rounded text-[#ffd451]">
                    {subscribersCount}
                  </span>
                </button>
              )}
            </div>

            {/* Logout */}
            <div className="p-1.5 border-t border-[#1b3452]">
              <button
                id="user-logout-btn"
                onClick={async () => {
                  setDropdownOpen(false);
                  await logout();
                }}
                className="w-full px-3 py-2 text-left text-[#ff8082] hover:bg-[#3d1215] rounded-lg flex items-center gap-2.5 text-xs font-mono transition-colors"
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
