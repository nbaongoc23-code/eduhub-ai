/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback, Suspense, lazy } from 'react';
import {
  Landmark,
  Languages,
  ExternalLink,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  Settings,
  GraduationCap,
  Zap,
} from 'lucide-react';
import {
  DEFAULT_GRADE_PORTAL_DATA,
  GradeGroup,
  GradeAppItem,
} from './data/portalData';
import { Header } from './components/Header';
import { OfflineIndicator } from './components/OfflineIndicator';

// Code Splitting & Lazy Loading for heavy settings modal
const LinkEditorModal = lazy(() =>
  import('./components/LinkEditorModal').then((module) => ({
    default: module.LinkEditorModal,
  }))
);

export default function App() {
  const [activeGrade, setActiveGrade] = useState<10 | 11 | 12>(12);

  // Load portal data from localStorage or fallback
  const [gradeData, setGradeData] = useState<GradeGroup[]>(() => {
    try {
      const saved = localStorage.getItem('eduhub_grade_data_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_GRADE_PORTAL_DATA;
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pre-resolve DNS on hover to speed up instant navigation to AI apps
  const preconnectUrl = useCallback((url: string) => {
    try {
      const origin = new URL(url).origin;
      const existing = document.querySelector(`link[rel="preconnect"][href="${origin}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = origin;
        document.head.appendChild(link);
      }
    } catch {
      // ignore invalid URLs
    }
  }, []);

  const currentGradeGroup = useMemo(() => {
    return gradeData.find((g) => g.grade === activeGrade) || gradeData[2];
  }, [gradeData, activeGrade]);

  const handleSaveData = useCallback((newData: GradeGroup[]) => {
    setGradeData(newData);
    try {
      localStorage.setItem('eduhub_grade_data_v2', JSON.stringify(newData));
    } catch {
      // ignore
    }
  }, []);

  const handleCopy = useCallback((id: string, url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }, []);

  const renderSubjectCard = (item: GradeAppItem) => {
    const isHistory = item.subjectId === 'history';
    const cardId = `${item.subjectId}-${item.grade}`;
    const isCopied = copiedId === cardId;

    return (
      <div
        key={item.subjectId}
        className="fast-card group relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
      >
        <div>
          {/* Card Top Pill & Icon */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs ${
                  isHistory ? 'bg-amber-700' : 'bg-sky-600'
                }`}
              >
                {isHistory ? (
                  <Landmark className="w-5 h-5" />
                ) : (
                  <Languages className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {item.subjectName}
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  {item.tag}
                </span>
              </div>
            </div>

            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                isHistory
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-sky-50 text-sky-800 border border-sky-200'
              }`}
            >
              Khối {item.grade}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
            {item.subtitle}
          </p>

          {/* URL Box */}
          <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-[11px] text-slate-500 truncate select-all">
            {item.url}
          </div>
        </div>

        {/* Action Controls - Direct new tab without iframe blocking */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => handleCopy(cardId, item.url, e)}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs transition-colors cursor-pointer"
              title="Sao chép liên kết ứng dụng"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Direct Launch Button: target="_blank" with preconnect for instant launch */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => preconnectUrl(item.url)}
            onTouchStart={() => preconnectUrl(item.url)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all cursor-pointer ${
              isHistory
                ? 'bg-amber-700 hover:bg-amber-800 active:scale-[0.98]'
                : 'bg-sky-600 hover:bg-sky-700 active:scale-[0.98]'
            }`}
          >
            <span>Mở Ứng Dụng Ngay</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. Header */}
      <Header
        activeGrade={activeGrade}
        onSelectGrade={setActiveGrade}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* 2. Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Cổng Điều Hướng AI · Lịch Sử & Tiếng Anh</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <Zap className="w-3 h-3 text-emerald-600" />
              <span>Tải tức thì</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ứng Dụng Học Tập Cấp 3
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Chọn khối lớp bên dưới để mở trực tiếp ứng dụng AI của môn Lịch sử và Tiếng Anh trong tab mới độc lập.
          </p>
        </div>

        {/* GRADE FILTER BAR AT THE TOP (Khối 10, Khối 11, Khối 12) */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="p-1.5 bg-slate-200/70 rounded-2xl grid grid-cols-3 gap-1.5 shadow-inner">
            {([10, 11, 12] as const).map((g) => {
              const isSelected = activeGrade === g;
              return (
                <button
                  key={g}
                  onClick={() => setActiveGrade(g)}
                  className={`py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <GraduationCap
                    className={`w-4 h-4 ${
                      isSelected ? 'text-sky-600' : 'text-slate-400'
                    }`}
                  />
                  <span>Khối Lớp {g}</span>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-2.5 text-xs text-slate-500 font-medium">
            Đang hiển thị ứng dụng dành riêng cho:{' '}
            <strong className="text-slate-900">
              {currentGradeGroup.label}
            </strong>{' '}
            ({currentGradeGroup.desc})
          </div>
        </div>

        {/* 2 MAIN SUBJECT CARDS FOR SELECTED GRADE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
          {renderSubjectCard(currentGradeGroup.historyApp)}
          {renderSubjectCard(currentGradeGroup.englishApp)}
        </div>

        {/* QUICK JUMP TABLE FOR ALL 3 GRADES */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Toàn bộ liên kết ứng dụng theo khối lớp
            </h3>
            <button
              onClick={() => setSettingsOpen(true)}
              className="text-xs text-sky-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Chỉnh sửa URL</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {gradeData.map((g) => (
              <div
                key={g.grade}
                onClick={() => setActiveGrade(g.grade)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeGrade === g.grade
                    ? 'border-slate-800 bg-white ring-1 ring-slate-800 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">
                    {g.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">2 ứng dụng</span>
                </div>

                <div className="space-y-2">
                  <a
                    href={g.historyApp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => preconnectUrl(g.historyApp.url)}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-amber-800 group"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Landmark className="w-3 h-3 text-amber-700 shrink-0" />
                      <span className="truncate">Lịch Sử {g.grade}</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-700 shrink-0 ml-1" />
                  </a>

                  <a
                    href={g.englishApp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => preconnectUrl(g.englishApp.url)}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-sky-700 group"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Languages className="w-3 h-3 text-sky-600 shrink-0" />
                      <span className="truncate">Tiếng Anh {g.grade}</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-700 shrink-0 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Cổng Điều Hướng AI · 2 Môn: Lịch Sử & Tiếng Anh · Khối 10, 11, 12
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">
              Bộ nhớ đệm (Cache Storage) đã kích hoạt
            </span>
            <button
              onClick={() => setSettingsOpen(true)}
              className="hover:text-slate-800 transition-colors cursor-pointer font-medium"
            >
              Quản lý liên kết
            </button>
          </div>
        </div>
      </footer>

      {/* 4. Link Editor Modal - Lazy loaded via React.Suspense */}
      {settingsOpen && (
        <Suspense fallback={null}>
          <LinkEditorModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            gradeData={gradeData}
            onSaveData={handleSaveData}
          />
        </Suspense>
      )}

      {/* 5. Offline Connectivity Indicator */}
      <OfflineIndicator />
    </div>
  );
}
