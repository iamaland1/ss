import React, { useMemo } from 'react';
import { Activity, CalendarDays, Clock3, TrendingUp } from 'lucide-react';
import { AppUsageStats, Language } from '../types';

interface AppStatsViewProps {
  lang: Language;
  stats: AppUsageStats;
}

function formatDuration(seconds: number, lang: Language) {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (lang === 'en') return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  if (lang === 'ar') return hours > 0 ? `${hours} س ${minutes} د` : `${minutes} د`;
  return hours > 0 ? `${hours} کاتژمێر ${minutes} خولەک` : `${minutes} خولەک`;
}

function getDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export const AppStatsView: React.FC<AppStatsViewProps> = ({ lang, stats }) => {
  const isEnglish = lang === 'en';
  const isArabic = lang === 'ar';
  const labels = isEnglish
    ? {
        title: 'Your activity',
        subtitle: 'A summary of your time in Sirat',
        total: 'Total time',
        today: 'Today',
        week: 'This week',
        month: 'This month',
        last7Days: 'Daily activity · last 7 days',
        noUsage: 'Your activity will appear here as you use the app.',
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      }
    : isArabic
      ? {
          title: 'إحصائيات الاستخدام',
          subtitle: 'ملخص وقتك في تطبيق سيرات',
          total: 'إجمالي الوقت',
          today: 'اليوم',
          week: 'هذا الأسبوع',
          month: 'هذا الشهر',
          last7Days: 'النشاط اليومي · آخر ٧ أيام',
          noUsage: 'ستظهر إحصائياتك هنا أثناء استخدام التطبيق.',
          days: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        }
      : {
          title: 'ئاماری بەکارهێنان',
          subtitle: 'پوختەی کاتی بەکارهێنانی ئەپی سیرات',
          total: 'کۆی کات',
          today: 'ئەمڕۆ',
          week: 'ئەم هەفتەیە',
          month: 'ئەم مانگە',
          last7Days: 'چالاکی ڕۆژانە · ٧ ڕۆژی ڕابردوو',
          noUsage: 'ئامارەکانت لێرە دەردەکەون کاتێک ئەپەکە بەکاردەهێنیت.',
          days: ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە'],
        };

  const dailyActivity = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      return {
        date,
        seconds: stats.dailyUsage[getDateKey(date)] || 0,
      };
    });
  }, [stats.dailyUsage]);

  const maxDailySeconds = Math.max(...dailyActivity.map(day => day.seconds), 1);
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const weekKey = getDateKey(weekStart);
  const monthKey = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  const todayKey = getDateKey(new Date());
  const cards = [
    { label: labels.total, value: formatDuration(stats.totalSeconds, lang), icon: Clock3 },
    { label: labels.today, value: formatDuration(stats.dailyUsage[todayKey] || 0, lang), icon: Activity },
    { label: labels.week, value: formatDuration(stats.weeklyUsage[weekKey] || 0, lang), icon: TrendingUp },
    { label: labels.month, value: formatDuration(stats.monthlyUsage[monthKey] || 0, lang), icon: CalendarDays },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto space-y-5 pb-12 text-(--text-main) font-kurdish" dir={isEnglish ? 'ltr' : 'rtl'}>
      <header className="space-y-1">
        <h1 className="text-2xl font-bold font-naskh text-(--color-gold)">{labels.title}</h1>
        <p className="text-xs text-(--text-muted)">{labels.subtitle}</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {cards.map(({ label, value, icon: Icon }) => (
          <article
            key={label}
            className="rounded-2xl border p-4 space-y-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div className="flex items-center gap-2 text-(--text-muted)">
              <Icon className="w-4 h-4 text-(--color-gold)" />
              <span className="text-xs">{label}</span>
            </div>
            <p className="text-lg font-bold text-(--text-main)">{value}</p>
          </article>
        ))}
      </div>

      <article
        className="rounded-2xl border p-4 space-y-5"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <h2 className="text-sm font-bold font-naskh">{labels.last7Days}</h2>
        <div className="flex items-end justify-between gap-2 min-h-36">
          {dailyActivity.map(({ date, seconds }) => {
            const barHeight = seconds > 0 ? Math.max((seconds / maxDailySeconds) * 100, 8) : 4;
            return (
              <div key={getDateKey(date)} className="flex flex-1 flex-col items-center justify-end gap-2 h-36">
                <span className="text-[9px] text-(--text-muted)">{formatDuration(seconds, lang)}</span>
                <div
                  className="w-full max-w-8 rounded-t-lg bg-(--color-gold) transition-all"
                  style={{ height: `${barHeight}%`, opacity: seconds ? 1 : 0.2 }}
                  title={`${labels.days[date.getDay()]}: ${formatDuration(seconds, lang)}`}
                />
                <span className="text-[9px] text-(--text-muted)">{labels.days[date.getDay()].slice(0, 3)}</span>
              </div>
            );
          })}
        </div>
        {stats.totalSeconds === 0 && (
          <p className="text-xs text-(--text-muted) text-center">{labels.noUsage}</p>
        )}
      </article>
    </section>
  );
};
