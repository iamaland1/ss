/**
 * بەشی تەقویم و زانیاریی ڕۆژ و مانگی کۆچی.
 */
import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  Star,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  getHijriDate, 
  formatGregorianDate, 
  ISLAMIC_EVENTS, 
  HIJRI_MONTHS 
} from '../services/hijriCalendar';

interface CalendarViewProps {
  lang: Language;
}

// ناوی ڕۆژەکانی هەفتە بە ئینگلیزی
const WEEKDAYS_EN = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// ناوی مانگەکانی زایینی بە ئینگلیزی
const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// ناوی ڕۆژەکانی هەفتە بە کوردی
const WEEKDAYS_KU = [
  'یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە'
];

// ناوی مانگەکانی زایینی بە کوردی
const MONTHS_KU = [
  'کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران',
  'تەممووز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم'
];

// ناوی ڕۆژەکانی هەفتە بە عەرەبی
const WEEKDAYS_AR = [
  'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
];

// ناوی مانگەکانی زایینی بە عەرەبی
const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

export const CalendarView: React.FC<CalendarViewProps> = ({ lang }) => {
  const t = translations[lang];
  const isRtl = lang === 'ckb' || lang === 'ar';
  const [dayAdjustment, setDayAdjustment] = useState<number>(0);
  const [now, setNow] = useState<Date>(new Date());

  // نوێکردنەوەی کات هەر چرکەیەک
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hijri = getHijriDate(now, dayAdjustment);
  const gregorianStr = formatGregorianDate(now, lang);

  // داڕشتنی کات: سەعات:خولەک:چرکە
  const hours24 = now.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  const pad = (n: number) => n.toString().padStart(2, '0');
  const timeStr = `${pad(hours12)}:${pad(minutes)}:${pad(seconds)}`;
  const timeStr24 = `${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;

  // بەرواری زایینی بە ئینگلیزی
  const weekdayIdx = now.getDay();
  const day = now.getDate();
  const monthIdx = now.getMonth();
  const year = now.getFullYear();

  const weekdayEn = WEEKDAYS_EN[weekdayIdx];
  const monthEn = MONTHS_EN[monthIdx];
  const gregorianEn = `${weekdayEn}, ${day} ${monthEn} ${year}`;

  // بەرواری زایینی بە کوردی
  const weekdayKu = WEEKDAYS_KU[weekdayIdx];
  const monthKu = MONTHS_KU[monthIdx];
  const gregorianKu = `${weekdayKu}، ${day}ی ${monthKu} ${year}`;

  // بەرواری زایینی بە عەرەبی
  const weekdayAr = WEEKDAYS_AR[weekdayIdx];
  const monthAr = MONTHS_AR[monthIdx];
  const gregorianAr = `${weekdayAr}، ${day} ${monthAr} ${year}`;

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto pb-12">

      {/* ===== بەشی سەرەکی: ڕۆژی ئەمڕۆ + کات ===== */}
      <div 
        className="p-6 sm:p-8 rounded-3xl border shadow-lg text-center space-y-5"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-theme)' 
        }}
      >
        {/* تاگی سەرەوە */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
          style={{ 
            backgroundColor: 'var(--color-gold-muted)', 
            color: 'var(--color-gold)',
            border: '1px solid var(--color-gold)'
          }}
        >
          <CalendarDays className="w-4 h-4" />
          <span>{t.todayHijri}</span>
        </div>

        {/* ===== کاتی ئێستا (سەعات:خولەک:چرکە) ===== */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-(--text-muted) text-[11px] font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>کاتی ئێستا</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-mono text-(--color-gold) tracking-wider tabular-nums">
              {timeStr}
            </h1>
            <span className="text-lg sm:text-xl font-bold text-(--text-muted) font-mono">
              {ampm}
            </span>
          </div>

          <p className="text-[11px] text-(--text-muted) font-mono tracking-wider">
            {timeStr24}
          </p>
        </div>

        {/* جیاکەرەوە */}
        <div className="border-t border-(--border-theme) pt-4 space-y-3">

          {/* بەرواری کۆچی */}
          <h2 className="text-2xl sm:text-3xl font-extrabold font-naskh text-(--color-gold) leading-tight">
            {lang === 'ckb' ? hijri.formattedKu : lang === 'ar' ? hijri.formattedAr : hijri.formattedEn}
          </h2>

          {/* بەرواری زایینی بەپێی زمانەکە */}
          <div className="space-y-1">
            <p className="text-xs text-(--text-muted) font-medium">
              {t.gregorian}:
            </p>
            <p className="text-sm font-bold text-(--text-main) font-naskh">
              {lang === 'ckb' ? gregorianKu : lang === 'ar' ? gregorianAr : gregorianEn}
            </p>
            <p className="text-[11px] text-(--text-muted) font-mono tracking-wide">
              {gregorianEn}
            </p>
          </div>
        </div>

        {/* ڕێکخەری ڕۆژ */}
        <div className="pt-4 border-t border-(--border-theme) flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-xs text-(--text-muted) font-semibold">
            {t.dayAdjust}:
          </span>
          <div 
            className="flex items-center gap-1.5 p-1.5 rounded-2xl"
            style={{ backgroundColor: 'var(--bg-icon-tile)' }}
          >
            <button
              onClick={() => setDayAdjustment(d => Math.max(-2, d - 1))}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold bg-white/10 hover:bg-white/20 text-(--text-main) transition-colors active:scale-95"
            >
              −
            </button>
            <span className="px-3 font-mono text-sm font-bold text-(--color-gold) min-w-10 text-center">
              {dayAdjustment > 0 ? `+${dayAdjustment}` : dayAdjustment}
            </span>
            <button
              onClick={() => setDayAdjustment(d => Math.min(2, d + 1))}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold bg-white/10 hover:bg-white/20 text-(--text-main) transition-colors active:scale-95"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* ===== بەشی ڕووداوە ئیسلامییەکان ===== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-gold-muted)' }}
            >
              <Star className="w-4 h-4 text-(--color-gold) fill-(--color-gold)" />
            </div>
            <h3 className="font-bold text-base text-(--text-main) font-naskh">
              {t.islamicEvents}
            </h3>
          </div>
          <span 
            className="text-[11px] font-bold px-3 py-1 rounded-full"
            style={{ 
              backgroundColor: 'var(--color-gold-muted)', 
              color: 'var(--color-gold)',
              border: '1px solid var(--color-gold)'
            }}
          >
            ساڵی {hijri.year} کۆچی
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {ISLAMIC_EVENTS.map((event, idx) => {
            const isCurrentMonth = event.hijriMonth === hijri.month;
            const isToday = isCurrentMonth && event.hijriDay === hijri.day;
            const eventTitle = lang === 'ckb' ? event.titleKu : lang === 'ar' ? event.titleAr : event.titleEn;
            const eventDesc = lang === 'ckb' ? event.descriptionKu : lang === 'ar' ? event.descriptionAr : event.descriptionEn;
            const monthName = HIJRI_MONTHS[lang][event.hijriMonth - 1];

            return (
              <div
                key={idx}
                className="p-4 rounded-2xl border transition-all flex flex-col justify-between"
                style={{
                  backgroundColor: isCurrentMonth ? 'var(--color-gold-muted)' : 'var(--bg-card)',
                  borderColor: isToday || isCurrentMonth 
                    ? 'var(--color-gold)' 
                    : 'var(--border-theme)'
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span 
                      className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg"
                      style={{ 
                        backgroundColor: 'var(--bg-icon-tile)', 
                        color: 'var(--color-gold)',
                        border: '1px solid var(--color-gold)'
                      }}
                    >
                      {event.hijriDay}ی {monthName}
                    </span>
                    {isToday ? (
                      <span className="text-[10px] bg-(--color-gold) text-slate-950 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ئەمڕۆ</span>
                      </span>
                    ) : isCurrentMonth ? (
                      <span 
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ 
                          backgroundColor: 'var(--bg-icon-tile)', 
                          color: 'var(--color-gold)',
                          border: '1px solid var(--color-gold)'
                        }}
                      >
                        لەم مانگەدایە
                      </span>
                    ) : null}
                  </div>

                  <h4 className="font-bold text-sm text-(--text-main) font-naskh mb-1.5">
                    {eventTitle}
                  </h4>

                  <p className="text-[11px] text-(--text-muted) leading-relaxed">
                    {eventDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};