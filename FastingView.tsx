/**
 * بەشی سەرژمێری ڕۆژوو (Fasting Tracker).
 */
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Moon, 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  BookOpen,
  Sparkles,
  RotateCcw,
  Star,
  RefreshCw
} from 'lucide-react';
import { Language, FastingRecord, FastingType } from '../types';
import { FASTING_RECOMMENDATIONS, FASTING_TYPES } from '../data/fastingData';

interface FastingViewProps {
  lang: Language;
}

const WEEKDAYS_KU = ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە'];
const MONTHS_KU = ['کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەممووز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم'];

export const FastingView: React.FC<FastingViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [records, setRecords] = useState<Record<string, FastingRecord>>(() => {
    try {
      const saved = localStorage.getItem('sirat_fasting_records');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sirat_fasting_records', JSON.stringify(records));
    } catch {}
  }, [records]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = useMemo(() => {
    const arr: (Date | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) arr.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      arr.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }
    return arr;
  }, [currentMonth, daysInMonth, firstDayOfMonth]);

  const monthStats = useMemo(() => {
    let fard = 0, sunnah = 0, qada = 0;
    days.forEach((d) => {
      if (!d) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const rec = records[key];
      if (rec) {
        if (rec.type === 'fard') fard++;
        else if (rec.type === 'sunnah') sunnah++;
        else if (rec.type === 'qada') qada++;
      }
    });
    return { fard, sunnah, qada, total: fard + sunnah + qada };
  }, [days, records]);

  const handleSetFasting = (date: Date, type: FastingType) => {
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (type === 'none') {
      const newRecords = { ...records };
      delete newRecords[key];
      setRecords(newRecords);
    } else {
      setRecords({ ...records, [key]: { date: key, type } });
    }
  };

  const getRecord = (date: Date): FastingRecord | undefined => {
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return records[key];
  };

  const isToday = (date: Date) => {
    const now = new Date();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
  };

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleResetMonth = () => {
    if (!confirm('ئایا دڵنیایت لە سڕینەوەی تۆمارەکانی ئەم مانگە؟')) return;
    const newRecords = { ...records };
    days.forEach((d) => {
      if (!d) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      delete newRecords[key];
    });
    setRecords(newRecords);
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
            <Moon className="w-7 h-7 text-(--color-gold)" />
            <Sparkles className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-naskh tracking-tight" style={{ color: 'var(--color-gold)' }}>
              سەرژمێری ڕۆژوو
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              تۆمارکردنی ڕۆژووەکانی فەرز و سوننەت
            </p>
          </div>
        </div>
      </div>

      {/* ===== کۆنترۆڵی مانگ ===== */}
      <div 
        className="p-4 rounded-3xl border shadow-sm flex items-center justify-between gap-2"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <button
          type="button"
          onClick={goToPrevMonth}
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-(--bg-chip) text-(--text-main) hover:bg-(--color-gold-muted) transition-all cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="text-sm font-bold text-(--text-main) font-naskh">
            {MONTHS_KU[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <p className="text-[10px] text-(--text-muted) font-kurdish mt-0.5">
            {monthStats.total} ڕۆژوو لەم مانگەدا
          </p>
        </div>
        <button
          type="button"
          onClick={goToNextMonth}
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-(--bg-chip) text-(--text-main) hover:bg-(--color-gold-muted) transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* ===== ئاماری مانگ ===== */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1" style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'rgba(242, 201, 76, 0.3)' }}>
          <Moon className="w-4 h-4 text-(--color-gold)" />
          <span className="text-lg font-black font-mono" style={{ color: 'var(--color-gold)' }}>{monthStats.fard}</span>
          <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">فەرز</span>
        </div>
        <div className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          <Star className="w-4 h-4 text-(--color-teal)" />
          <span className="text-lg font-black font-mono" style={{ color: 'var(--color-teal)' }}>{monthStats.sunnah}</span>
          <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">سوننەت</span>
        </div>
        <div className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          <RefreshCw className="w-4 h-4 text-rose-400" />
          <span className="text-lg font-black font-mono text-rose-400">{monthStats.qada}</span>
          <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">قەزا</span>
        </div>
      </div>

      {/* ===== ڕۆژنامەی مانگ ===== */}
      <div 
        className="p-4 rounded-3xl border shadow-sm"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS_KU.map((day) => (
            <div key={day} className="text-center text-[9px] text-(--text-muted) font-kurdish font-bold py-1">
              {day.slice(0, 3)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} />;
            
            const record = getRecord(date);
            const today = isToday(date);
            const type = record?.type;
            
            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => {
                  const types: FastingType[] = ['none', 'fard', 'sunnah', 'qada'];
                  const currentIdx = types.indexOf(type || 'none');
                  const nextType = types[(currentIdx + 1) % types.length];
                  handleSetFasting(date, nextType);
                }}
                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 relative ${
                  today ? 'ring-2 ring-(--color-gold)' : ''
                }`}
                style={{
                  backgroundColor: 
                    type === 'fard' ? 'var(--color-gold)' : 
                    type === 'sunnah' ? 'rgba(61, 190, 156, 0.3)' : 
                    type === 'qada' ? 'rgba(244, 63, 94, 0.2)' : 
                    'var(--bg-chip)',
                  borderColor: 
                    type === 'fard' ? 'var(--color-gold)' : 
                    type === 'sunnah' ? 'var(--color-teal)' : 
                    type === 'qada' ? 'rgb(244, 63, 94)' : 
                    'var(--border-theme)'
                }}
              >
                <span className={`text-xs font-bold font-mono ${
                  type === 'fard' ? 'text-[#031F3C]' : 'text-(--text-main)'
                }`}>
                  {date.getDate()}
                </span>
                {type && (
                  <span className="text-[8px]">
                    {FASTING_TYPES[type].icon}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-(--border-theme) flex-wrap">
          <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">ڕوونکردنەوە:</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--color-gold)' }} />
            <span className="text-[10px] font-kurdish">فەرز</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(61, 190, 156, 0.3)', border: '1px solid var(--color-teal)' }} />
            <span className="text-[10px] font-kurdish">سوننەت</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)', border: '1px solid rgb(244, 63, 94)' }} />
            <span className="text-[10px] font-kurdish">قەزا</span>
          </div>
        </div>
        <p className="text-[9px] text-(--text-muted) font-kurdish mt-1.5">
          کلیک بکە بۆ گۆڕینی جۆری ڕۆژوو: — ← فەرز ← سوننەت ← قەزا
        </p>
      </div>

      {/* ===== دوگمەی سڕینەوە ===== */}
      <button
        type="button"
        onClick={handleResetMonth}
        className="w-full p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}
      >
        <RotateCcw className="w-4 h-4" />
        <span className="font-naskh">سڕینەوەی تۆمارەکانی ئەم مانگە</span>
      </button>

      {/* ===== ڕاسپاردەکانی ڕۆژوو ===== */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <BookOpen className="w-4 h-4 text-(--color-gold)" />
          <h3 className="text-sm font-bold text-(--text-main) font-naskh">
            ڕاسپاردە و فەزیلەتەکانی ڕۆژوو
          </h3>
        </div>

        {FASTING_RECOMMENDATIONS.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-3xl border shadow-sm space-y-2"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <Star className="w-4 h-4 text-(--color-gold)" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-(--text-main) font-naskh">
                  {rec.title}
                </h4>
                <p className="text-[11px] text-(--text-muted) font-kurdish mt-1 leading-relaxed">
                  {rec.description}
                </p>
                <div 
                  className="mt-2 p-2.5 rounded-xl border"
                  style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'rgba(242, 201, 76, 0.3)' }}
                >
                  <p className="text-[10px] text-(--text-main) font-kurdish leading-relaxed">
                    <strong className="text-(--color-gold)">فەزیلەت: </strong>
                    {rec.virtue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== تێبینی گرنگ ===== */}
      <div 
        className="p-3 rounded-2xl border text-[11px] text-(--text-muted) leading-relaxed flex gap-2"
        style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'rgba(242, 201, 76, 0.3)' }}
      >
        <Info className="w-3.5 h-3.5 text-(--color-gold) shrink-0 mt-0.5" />
        <p>
          <strong className="text-(--color-gold)">تێبینی:</strong> ڕۆژووی قەزا بۆ ئەو ڕۆژووانەیە کە لە ڕەمەزاندا نەگیراون بەهۆی نەخۆشی یان سەفەر. تکایە پێش ڕۆژووگرتن لە حاڵەتە تایبەتەکاندا بە زانای ئایینی بگەڕێیت.
        </p>
      </div>
    </div>
  );
};