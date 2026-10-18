/**
 * بەشی My Planner - پلانی تایبەت بە بەکارهێنەر.
 */
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Award,
  BookMarked,
  BookOpenCheck,
  Layers
} from 'lucide-react';
import { Language, CustomPlan, ReadingMode } from '../types';
import { SURAH_PAGES, JUZ_LIST } from '../data/plannerData';

interface MyPlannerViewProps {
  lang: Language;
}

type PlanType = 'surah' | 'juz';

export const MyPlannerView: React.FC<MyPlannerViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [plans, setPlans] = useState<CustomPlan[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_custom_plans');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sirat_custom_plans', JSON.stringify(plans));
  }, [plans]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [planType, setPlanType] = useState<PlanType>('surah');
  
  // فۆرمی پلان
  const [newPlanName, setNewPlanName] = useState('');
  const [customDays, setCustomDays] = useState<string>('30');
  const [fromSurah, setFromSurah] = useState<number>(1);
  const [toSurah, setToSurah] = useState<number>(114);
  const [fromJuz, setFromJuz] = useState<number>(1);
  const [toJuz, setToJuz] = useState<number>(30);
  const [readingMode, setReadingMode] = useState<ReadingMode>('reading');

  // ===== کردارەکان =====
  const createPlan = () => {
    if (!newPlanName.trim()) return;
    const days = parseInt(customDays);
    if (isNaN(days) || days <= 0) return;

    let startPage, endPage;

    if (planType === 'surah') {
      startPage = SURAH_PAGES.find(s => s.number === fromSurah)?.startPage || 1;
      endPage = SURAH_PAGES.find(s => s.number === toSurah)?.endPage || 604;
    } else {
      startPage = JUZ_LIST.find(j => j.number === fromJuz)?.startPage || 1;
      endPage = JUZ_LIST.find(j => j.number === toJuz)?.endPage || 604;
    }

    const totalPages = endPage - startPage + 1;
    const dailyPages = Math.ceil(totalPages / days);

    const newPlan: CustomPlan = {
      id: `plan-${Date.now()}`,
      name: newPlanName,
      totalDays: days,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + days * 86400000).toISOString().split('T')[0],
      fromSurah: planType === 'surah' ? fromSurah : 1,
      toSurah: planType === 'surah' ? toSurah : 114,
      fromJuz: planType === 'juz' ? fromJuz : undefined,
      toJuz: planType === 'juz' ? toJuz : undefined,
      dailyPages,
      currentPage: startPage - 1,
      completedPages: 0,
      completedDays: 0,
      mode: readingMode,
    };

    setPlans(prev => [...prev, newPlan]);
    setShowCreateForm(false);
    setNewPlanName('');
    setCustomDays('30');
    setFromSurah(1);
    setToSurah(114);
    setFromJuz(1);
    setToJuz(30);
    setReadingMode('reading');
  };

  const togglePlanProgress = (planId: string) => {
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      
      let startPage, endPage;
      if (p.fromJuz) {
        startPage = JUZ_LIST.find(j => j.number === p.fromJuz)?.startPage || 1;
        endPage = JUZ_LIST.find(j => j.number === p.toJuz)?.endPage || 604;
      } else {
        startPage = SURAH_PAGES.find(s => s.number === p.fromSurah)?.startPage || 1;
        endPage = SURAH_PAGES.find(s => s.number === p.toSurah)?.endPage || 604;
      }

      const newPage = Math.min(p.currentPage + p.dailyPages, endPage);
      return {
        ...p,
        currentPage: newPage,
        completedPages: newPage - startPage + 1,
        completedDays: p.completedDays + 1,
      };
    }));
  };

  const deletePlan = (id: string) => {
    if (confirm('ئایا دڵنیایت لە سڕینەوەی ئەم پلانە؟')) {
      setPlans(prev => prev.filter(p => p.id !== id));
    }
  };

  const getPlanProgress = (plan: CustomPlan) => {
    let startPage, endPage;
    if (plan.fromJuz) {
      startPage = JUZ_LIST.find(j => j.number === plan.fromJuz)?.startPage || 1;
      endPage = JUZ_LIST.find(j => j.number === plan.toJuz)?.endPage || 604;
    } else {
      startPage = SURAH_PAGES.find(s => s.number === plan.fromSurah)?.startPage || 1;
      endPage = SURAH_PAGES.find(s => s.number === plan.toSurah)?.endPage || 604;
    }
    const totalPages = endPage - startPage + 1;
    return Math.round((plan.completedPages / totalPages) * 100);
  };

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
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: 'var(--color-gold)' }} />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0 relative" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
            <Target className="w-7 h-7 text-(--color-gold)" />
            <Sparkles className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-naskh tracking-tight" style={{ color: 'var(--color-gold)' }}>
              پلانەر
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              پلانی خوێندنەوەی قورئان (سوورەت یان جوزئی)
            </p>
          </div>
        </div>
      </div>

      {/* ===== دوگمەی دروستکردن ===== */}
      <button
        type="button"
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="w-full p-4 rounded-3xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer active:scale-[0.98]"
        style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'var(--color-gold)', color: 'var(--color-gold)' }}
      >
        <Plus className="w-4 h-4" />
        <span className="font-naskh">دروستکردنی پلانی نوێ</span>
      </button>

      {/* ===== فۆرمی دروستکردن ===== */}
      {showCreateForm && (
        <div className="p-4 rounded-3xl border shadow-lg space-y-4 animate-fadeIn" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          <h3 className="text-sm font-bold text-(--text-main) font-naskh flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-(--color-gold)" />
            پلانی نوێ
          </h3>

          {/* ناوی پلان */}
          <div>
            <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">ناوی پلان</label>
            <input
              type="text"
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              placeholder="بۆ نموونە: ختمی قورئان بۆ خێزانم"
              className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-4 py-3 text-sm text-(--text-main) font-kurdish outline-none focus:border-(--color-gold)"
            />
          </div>

          {/* جۆری پلان */}
          <div>
            <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">شێوازی پلان</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPlanType('surah')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  planType === 'surah' ? 'shadow-sm' : ''
                }`}
                style={
                  planType === 'surah'
                    ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
                    : { backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }
                }
              >
                <BookOpen className="w-3.5 h-3.5" />
                بەپێی سوورەت
              </button>
              <button
                type="button"
                onClick={() => setPlanType('juz')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  planType === 'juz' ? 'shadow-sm' : ''
                }`}
                style={
                  planType === 'juz'
                    ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
                    : { backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }
                }
              >
                <Layers className="w-3.5 h-3.5" />
                بەپێی جوزئی
              </button>
            </div>
          </div>

          {/* هەڵبژاردنی سوورەت یان جوزئی */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">
                لە {planType === 'surah' ? 'سوورەتی' : 'جوزئی'} (From)
              </label>
              <select
                value={planType === 'surah' ? fromSurah : fromJuz}
                onChange={(e) => planType === 'surah' ? setFromSurah(parseInt(e.target.value)) : setFromJuz(parseInt(e.target.value))}
                className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-3 py-2.5 text-sm text-(--text-main) font-naskh outline-none focus:border-(--color-gold) cursor-pointer"
              >
                {planType === 'surah' 
                  ? SURAH_PAGES.map(s => <option key={s.number} value={s.number}>{s.number}. {s.nameAr}</option>)
                  : JUZ_LIST.map(j => <option key={j.number} value={j.number}>الجُزْء {j.number}</option>)
                }
              </select>
            </div>
            <div>
              <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">
                بۆ {planType === 'surah' ? 'سوورەتی' : 'جوزئی'} (To)
              </label>
              <select
                value={planType === 'surah' ? toSurah : toJuz}
                onChange={(e) => planType === 'surah' ? setToSurah(parseInt(e.target.value)) : setToJuz(parseInt(e.target.value))}
                className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-3 py-2.5 text-sm text-(--text-main) font-naskh outline-none focus:border-(--color-gold) cursor-pointer"
              >
                {planType === 'surah'
                  ? SURAH_PAGES.filter(s => s.number >= fromSurah).map(s => <option key={s.number} value={s.number}>{s.number}. {s.nameAr}</option>)
                  : JUZ_LIST.filter(j => j.number >= fromJuz).map(j => <option key={j.number} value={j.number}>الجُزْء {j.number}</option>)
                }
              </select>
            </div>
          </div>

          {/* ماوە بە ئارەزووی خۆت */}
          <div>
            <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">ماوە بە ڕۆژ (بە ئارەزووی خۆت)</label>
            <input
              type="number"
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
              placeholder="30"
              min="1"
              max="365"
              className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-4 py-3 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)"
            />
          </div>

          {/* شێوازی خوێندنەوە */}
          <div>
            <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">شێوازی خوێندنەوە</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setReadingMode('reading')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  readingMode === 'reading' ? 'shadow-sm' : ''
                }`}
                style={
                  readingMode === 'reading'
                    ? { backgroundColor: 'var(--color-teal)', color: '#031F3C' }
                    : { backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }
                }
              >
                <BookOpen className="w-3.5 h-3.5" />
                تەنها خوێندنەوە
              </button>
              <button
                type="button"
                onClick={() => setReadingMode('tafsir')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  readingMode === 'tafsir' ? 'shadow-sm' : ''
                }`}
                style={
                  readingMode === 'tafsir'
                    ? { backgroundColor: 'var(--color-teal)', color: '#031F3C' }
                    : { backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }
                }
              >
                <BookOpenCheck className="w-3.5 h-3.5" />
                لەگەڵ تەفسیر
              </button>
            </div>
          </div>

          {/* پێشبینینی پلان */}
          {(() => {
            let startPage, endPage;
            if (planType === 'surah') {
              startPage = SURAH_PAGES.find(s => s.number === fromSurah)?.startPage || 1;
              endPage = SURAH_PAGES.find(s => s.number === toSurah)?.endPage || 604;
            } else {
              startPage = JUZ_LIST.find(j => j.number === fromJuz)?.startPage || 1;
              endPage = JUZ_LIST.find(j => j.number === toJuz)?.endPage || 604;
            }
            const totalPages = endPage - startPage + 1;
            const days = parseInt(customDays) || 1;
            const dailyPages = Math.ceil(totalPages / days);
            return (
              <div className="p-3 rounded-2xl bg-(--color-gold-muted) border border-(--color-gold)/30 text-[11px] text-(--text-main) font-kurdish">
                <span className="font-bold text-(--color-gold)">پێشبینین: </span>
                {dailyPages} پەڕە لە ڕۆژێکدا بۆ ماوەی {days} ڕۆژ
                {readingMode === 'tafsir' && ' (لەگەڵ تەفسیر)'}
              </div>
            );
          })()}

          {/* دوگمەکان */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={createPlan}
              disabled={!newPlanName.trim()}
              className="flex-1 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer active:scale-[0.98] shadow-md disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
            >
              دروستکردن
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-3 rounded-2xl border text-sm font-bold cursor-pointer"
              style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}
            >
              پەشیمانبوونەوە
            </button>
          </div>
        </div>
      )}

      {/* ===== لیستی پلانەکان ===== */}
      {plans.length === 0 ? (
        <div className="p-8 rounded-3xl border text-center space-y-2" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          <BookOpen className="w-12 h-12 text-(--color-gold) opacity-50 mx-auto" />
          <p className="text-xs text-(--text-muted) font-kurdish">هێشتا هیچ پلانێکت دروست نەکردووە</p>
        </div>
      ) : (
        plans.map((plan) => {
          const progress = getPlanProgress(plan);
          
          let planLabel = '';
          if (plan.fromJuz) {
            planLabel = `الجُزْء ${plan.fromJuz} - ${plan.toJuz}`;
          } else {
            const fromName = SURAH_PAGES.find(s => s.number === plan.fromSurah)?.nameAr || '';
            const toName = SURAH_PAGES.find(s => s.number === plan.toSurah)?.nameAr || '';
            planLabel = `${fromName} - ${toName}`;
          }

          return (
            <div key={plan.id} className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-(--text-main) font-naskh truncate">{plan.name}</h3>
                  <p className="text-[10px] text-(--text-muted) font-kurdish mt-0.5" dir="rtl">
                    {planLabel} • {plan.totalDays} ڕۆژ
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span 
                      className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                      style={{ 
                        backgroundColor: plan.mode === 'tafsir' ? 'rgba(61, 190, 156, 0.2)' : 'rgba(242, 201, 76, 0.2)',
                        color: plan.mode === 'tafsir' ? 'var(--color-teal)' : 'var(--color-gold)'
                      }}
                    >
                      {plan.mode === 'tafsir' ? '📖 لەگەڵ تەفسیر' : '📖 تەنها خوێندنەوە'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deletePlan(plan.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-400/10 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-(--text-muted) font-kurdish">پێشکەوتن</span>
                <span className="font-black font-mono" style={{ color: 'var(--color-gold)' }}>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-chip)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--color-gold), var(--color-teal))' }} />
              </div>

              <div className="flex items-center justify-between text-[10px] text-(--text-muted) font-kurdish">
                <span>{plan.completedPages} پەڕە خوێندراوە</span>
                <span>{plan.dailyPages} پەڕە/ڕۆژ</span>
              </div>

              {progress < 100 && (
                <button
                  type="button"
                  onClick={() => togglePlanProgress(plan.id)}
                  className="w-full py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: 'var(--color-teal)', color: '#031F3C' }}
                >
                  <Check className="w-3.5 h-3.5" />
                  تەواوکردنی ئەمڕۆ ({plan.dailyPages} پەڕە)
                </button>
              )}
              {progress >= 100 && (
                <div className="w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5" style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}>
                  <Award className="w-4 h-4" />
                  پلان تەواو بوو! 🎉
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};