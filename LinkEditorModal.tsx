import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Save, Check, ExternalLink, Link as LinkIcon, Landmark, Languages } from 'lucide-react';
import { GradeGroup, DEFAULT_GRADE_PORTAL_DATA } from '../data/portalData';

interface LinkEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  gradeData: GradeGroup[];
  onSaveData: (data: GradeGroup[]) => void;
}

export const LinkEditorModal: React.FC<LinkEditorModalProps> = ({
  isOpen,
  onClose,
  gradeData,
  onSaveData,
}) => {
  const [editingData, setEditingData] = useState<GradeGroup[]>(gradeData);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEditingData(gradeData);
    setSuccess(false);
  }, [gradeData, isOpen]);

  if (!isOpen) return null;

  const handleUrlChange = (grade: 10 | 11 | 12, subject: 'history' | 'english', newUrl: string) => {
    setEditingData((prev) =>
      prev.map((g) => {
        if (g.grade !== grade) return g;
        if (subject === 'history') {
          return {
            ...g,
            historyApp: { ...g.historyApp, url: newUrl },
          };
        } else {
          return {
            ...g,
            englishApp: { ...g.englishApp, url: newUrl },
          };
        }
      })
    );
  };

  const handleSave = () => {
    onSaveData(editingData);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false),
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    setEditingData(DEFAULT_GRADE_PORTAL_DATA);
    onSaveData(DEFAULT_GRADE_PORTAL_DATA);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl max-h-[88vh] rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Quản lý 6 liên kết ứng dụng AI (Lịch sử & Tiếng Anh)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success toast */}
        {success && (
          <div className="px-5 py-2 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đã cập nhật các liên kết thành công!</span>
          </div>
        )}

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
          {editingData.map((g) => (
            <div key={g.grade} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">
                  {g.label} ({g.desc})
                </span>
                <span className="text-[11px] text-slate-500 font-mono">2 ứng dụng</span>
              </div>

              {/* History link */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-amber-700" />
                    <span>Lịch Sử {g.grade}</span>
                  </span>
                  <a
                    href={g.historyApp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Mở thử</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="url"
                  value={g.historyApp.url}
                  onChange={(e) => handleUrlChange(g.grade, 'history', e.target.value)}
                  className="w-full font-mono text-[11px] p-2 bg-white rounded-lg border border-slate-300 focus:border-amber-700 outline-none"
                />
              </div>

              {/* English link */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-sky-600" />
                    <span>Tiếng Anh {g.grade}</span>
                  </span>
                  <a
                    href={g.englishApp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Mở thử</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="url"
                  value={g.englishApp.url}
                  onChange={(e) => handleUrlChange(g.grade, 'english', e.target.value)}
                  className="w-full font-mono text-[11px] p-2 bg-white rounded-lg border border-slate-300 focus:border-sky-600 outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer controls */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Khôi phục mặc định</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs"
            >
              Đóng
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
