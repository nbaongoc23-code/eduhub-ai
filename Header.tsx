import React from 'react';
import { Compass, Settings } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  activeGrade: 10 | 11 | 12;
  onSelectGrade: (grade: 10 | 11 | 12) => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeGrade,
  onSelectGrade,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white shadow-xs">
            <Compass className="w-4 h-4" />
          </span>
          <span className="font-extrabold tracking-tight">EduPortal</span>
        </a>

        {/* Zone 2: Grade selector buttons in header */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          {([10, 11, 12] as const).map((g) => (
            <button
              key={g}
              onClick={() => onSelectGrade(g)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeGrade === g
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Khối {g}
            </button>
          ))}
        </div>

        {/* Zone 3: Actions (PWA install + Settings) */}
        <div className="flex items-center gap-2 shrink-0">
          <PWAInstallButton />
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
            title="Quản lý 6 liên kết"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Cài đặt link</span>
          </button>
        </div>
      </div>
    </header>
  );
};

