/**
 * بەشی ڕێنمایی حەج و عومرە.
 */
import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Heart,
  CheckCircle2,
  Info,
  Calendar,
  Moon
} from 'lucide-react';
import { Language } from '../types';
import { HAJJ_STEPS } from '../data/hajjData';

interface HajjViewProps {
  lang: Language;
}

export const HajjView: React.FC<HajjViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';
  const [activeTab, setActiveTab] = useState<'umrah' | 'hajj'>('umrah');
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const filteredSteps = HAJJ_STEPS.filter(step => step.type === activeTab);

  return (
    <div 
      className="w-full max-w-3xl mx-auto space-y-5 animate-fadeIn pb-28 text-(--text-main) font-kurdish"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ===== کارتی سەرەوە ===== */}
      <div 
        className="p-5 rounded-3xl border shadow-lg space-y-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />

        <div className="flex items-center gap-3 relative z-10">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0 relative"
            style={{ backgroundColor: 'var(--color-gold-muted)' }}
          >
            <Compass className="w-7 h-7 text-(--color-gold)" />
            <Sparkles className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
          </div>
          <div>
            <h1 
              className="text-2xl font-bold font-naskh tracking-tight"
              style={{ color: 'var(--color-gold)' }}
            >
              حەج و عومرە
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              ڕێنمایی هەنگاو بە هەنگاو بەپێی سوننەت
            </p>
          </div>
        </div>
      </div>

      {/* ===== تابەکان ===== */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => { setActiveTab('umrah'); setExpandedStep(1); }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border text-sm font-bold transition-all cursor-pointer active:scale-[0.98] ${
            activeTab === 'umrah' ? 'shadow-md' : 'text-(--text-muted)'
          }`}
          style={
            activeTab === 'umrah'
              ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
              : { backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }
          }
        >
          <Moon className="w-4 h-4" />
          <span className="font-naskh">عومرە</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('hajj'); setExpandedStep(5); }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border text-sm font-bold transition-all cursor-pointer active:scale-[0.98] ${
            activeTab === 'hajj' ? 'shadow-md' : 'text-(--text-muted)'
          }`}
          style={
            activeTab === 'hajj'
              ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
              : { backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }
          }
        >
          <Heart className="w-4 h-4" />
          <span className="font-naskh">حەج</span>
        </button>
      </div>

      {/* ===== لیستی هەنگاوەکان ===== */}
      <div className="space-y-3">
        {filteredSteps.map((step) => {
          const isExpanded = expandedStep === step.id;
          return (
            <div
              key={step.id}
              className="rounded-3xl border shadow-sm overflow-hidden transition-all"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: isExpanded ? 'var(--color-gold)' : 'var(--border-theme)' }}
            >
              {/* ناونیشان */}
              <button
                type="button"
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                className="w-full p-4 text-start flex items-center gap-3 cursor-pointer"
              >
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold font-mono shadow-sm shrink-0"
                  style={{ backgroundColor: isExpanded ? 'var(--color-gold)' : 'var(--color-gold-muted)', color: isExpanded ? '#031F3C' : 'var(--color-gold)' }}
                >
                  {step.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-bold font-naskh ${isExpanded ? 'text-(--color-gold)' : 'text-(--text-main)'}`}>
                    {step.title}
                  </h3>
                  {step.location && (
                    <span className="flex items-center gap-1 text-[10px] text-(--text-muted) font-kurdish mt-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      {step.location}
                    </span>
                  )}
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-(--color-gold)" /> : <ChevronDown className="w-4 h-4 text-(--text-muted)" />}
              </button>

              {/* وردەکاری */}
              {isExpanded && (
                <div className="p-4 pt-0 space-y-3 animate-fadeIn">
                  <div className="w-full h-px bg-(--border-theme) mb-3" />
                  <p className="text-xs text-(--text-muted) leading-relaxed font-kurdish">
                    {step.description}
                  </p>
                  
                  {step.arabicDua && (
                    <div className="p-3 rounded-2xl border" style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'rgba(242, 201, 76, 0.3)' }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-(--color-gold)" />
                        <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-gold)' }}>دوعا:</span>
                      </div>
                      <p className="text-sm text-(--text-main) font-naskh text-right leading-loose" dir="rtl">
                        {step.arabicDua}
                      </p>
                      {step.kurdishDua && (
                        <p className="text-[11px] text-(--text-muted) font-kurdish leading-relaxed mt-2 pt-2 border-t border-(--color-gold)/20">
                          {step.kurdishDua}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===== تێبینی گرنگ ===== */}
      <div 
        className="p-4 rounded-2xl border text-[11px] text-(--text-muted) leading-relaxed flex gap-2"
        style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
      >
        <Info className="w-4 h-4 text-(--color-gold) shrink-0 mt-0.5" />
        <p>
          <strong className="text-(--color-gold)">تێبینی:</strong> ئەم ڕێنماییانە تەنها بۆ زانیاری گشتییە. پێش چوونە حەج، تکایە بە زانای ئایینی یان ڕێبەری حەج بگەڕێیت بۆ ڕوونکردنەوەی وردەکارییەکان و فەتواکانی نوێ.
        </p>
      </div>
    </div>
  );
};