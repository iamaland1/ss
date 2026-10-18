/**
 * بەشی کاتی نوێژەکان و زانیاریی پەیوەندیدار بە بانگ.
 */
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Sun, 
  Sunrise, 
  Sunset, 
  Moon, 
  Compass,
  CheckCircle2,
  CalendarDays,
  Calendar,
  Hash,
  Info,
  TrendingUp,
  BookOpen,
  Heart,
  Zap,
  Settings as SettingsIcon,
  ArrowRight,
  Target,
  BarChart3,
  Scale,
  Coins,
  Headphones,
  Camera,
  Image as ImageIcon,
  Baby,
  Crown,
  Layers,
  RotateCcw,
  Unlock,
  Lock
} from 'lucide-react';
import { CityInfo, Language, PrayerTimings, TabType } from '../types';
import { CITIES } from '../data/cities';
import { ADHAN_VOICES } from '../data/adhanVoices';
import { translations } from '../data/translations';
import { getNextPrayerInfo } from '../services/prayerTimes';
import { fetchPrayerTimes } from '../services/prayerTimesApi';
import { getHijriDate } from '../services/hijriCalendar';
import { soundEffects } from '../services/soundEffects';
import { useAutoAdhan } from '../hooks/useAutoAdhan';

interface PrayerTimesViewProps {
  lang: Language;
  selectedCity: CityInfo;
  onSelectCity: (city: CityInfo) => void;
  isPlayingAzan: boolean;
  setIsPlayingAzan: (playing: boolean) => void;
  onNavigate?: (tab: TabType) => void;
  notificationSettings?: { adhanSoundEnabled: boolean; selectedDefaultVoice: string };
}

const WEEKDAYS_KU = ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە'];
const WEEKDAYS_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const WEEKDAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS_KU = ['کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەممووز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم'];
const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const PrayerTimesView: React.FC<PrayerTimesViewProps> = ({
  lang,
  selectedCity,
  onSelectCity,
  isPlayingAzan,
  setIsPlayingAzan,
  onNavigate,
  notificationSettings = { adhanSoundEnabled: true, selectedDefaultVoice: 'makkah' }
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [now, setNow] = useState(new Date());
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(() => {
    return notificationSettings.selectedDefaultVoice || 'makkah';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // دۆخی چالاککردنی دەنگ (بۆ وێبگەڕ)
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(() => {
    try {
      return localStorage.getItem('sirat_audio_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  // کاتی نوێکردنەوە هەر چرکەیەک
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // چالاککردنی دەنگ بە کلیک
  const unlockAudio = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      setIsAudioUnlocked(true);
      localStorage.setItem('sirat_audio_unlocked', 'true');
      showToast('دەنگ چالاک کرا. ئێستا بانگەکان خۆکارانە لێدەدرێن ✓');
    } catch (e) {
      showToast('کێشەیەک لە چالاککردنی دەنگ ڕوویدا');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // بارکردنی کاتەکان لە API
  const loadTimings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchPrayerTimes(selectedCity);
      if (result) {
        setTimings(result);
        setError(null);
      } else {
        setError('نەتوانرا کاتەکان بار بکرێن');
      }
    } catch (err) {
      setError('هەڵە لە پەیوەندی بە سێرڤەر');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTimings();
  }, [selectedCity]);

  // ===== چاودێری کاتی بانگ بۆ لێدانی خۆکارانە =====
  useAutoAdhan(
    timings,
    notificationSettings.adhanSoundEnabled,
    selectedVoiceId,
    isAudioUnlocked,
    () => {
      setIsPlayingAzan(true);
      showToast('🕌 کاتی بانگ هات! دەنگی بانگ لێدەدرێت...');
    },
    () => {
      setIsPlayingAzan(false);
    }
  );

  // GPS
  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      showToast('GPS لەم وێبگەڕەدا پشتگیری ناکرێت');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const customCity: CityInfo = {
          id: 'custom-gps',
          nameKu: 'شوێنی ئێستات',
          nameAr: 'موقعك الحالي',
          nameEn: 'Current Location',
          countryKu: 'شوێنی ئێستا',
          countryAr: 'الموقع الحالي',
          countryEn: 'Current Location',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          timezone: 'Asia/Baghdad',
        };
        onSelectCity(customCity);
        setIsLocating(false);
        showToast('شوێنی ئێستات دیاریکرا ✓');
      },
      () => {
        setIsLocating(false);
        showToast('نەتوانرا شوێن دیاری بکرێت');
      },
      { timeout: 8000 }
    );
  };

  const handleToggleAzan = () => {
    if (isPlayingAzan) {
      soundEffects.stopAzan();
      setIsPlayingAzan(false);
      showToast('بانگ وەستێنرا');
    } else {
      soundEffects.playAdhanVoice(selectedVoiceId, undefined, () => setIsPlayingAzan(false));
      setIsPlayingAzan(true);
      showToast('بانگ دەستی پێکرد');
    }
  };

  const hijri = getHijriDate(now);
  const nextInfo = timings ? getNextPrayerInfo(timings, now) : null;

  const prayerCards = [
    { key: 'fajr', label: t.fajr, icon: Sunrise },
    { key: 'sunrise', label: t.sunrise, icon: Sun },
    { key: 'dhuhr', label: t.dhuhr, icon: Sun },
    { key: 'asr', label: t.asr, icon: Sunset },
    { key: 'maghrib', label: t.maghrib, icon: Sunset },
    { key: 'isha', label: t.isha, icon: Moon },
  ];

  const cityName = lang === 'ckb' ? selectedCity.nameKu : lang === 'ar' ? selectedCity.nameAr : selectedCity.nameEn;
  const hijriFormatted = lang === 'ckb' ? hijri.formattedKu : lang === 'ar' ? hijri.formattedAr : hijri.formattedEn;

  const hours24 = now.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const pad = (n: number) => n.toString().padStart(2, '0');

  const weekdayIdx = now.getDay();
  const day = now.getDate();
  const monthIdx = now.getMonth();
  const year = now.getFullYear();

  const weekdayKu = WEEKDAYS_KU[weekdayIdx];
  const monthKu = MONTHS_KU[monthIdx];
  const gregorianKu = `${weekdayKu}، ${day}ی ${monthKu} ${year}`;

  const weekdayAr = WEEKDAYS_AR[weekdayIdx];
  const monthAr = MONTHS_AR[monthIdx];
  const gregorianAr = `${weekdayAr}، ${day} ${monthAr} ${year}`;

  const weekdayEn = WEEKDAYS_EN[weekdayIdx];
  const monthEn = MONTHS_EN[monthIdx];
  const gregorianEn = `${weekdayEn}, ${day} ${monthEn} ${year}`;

  const gregorianLocalized = lang === 'ckb' ? gregorianKu : lang === 'ar' ? gregorianAr : gregorianEn;

  const startOfYear = new Date(year, 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weekOfYear = Math.ceil((dayOfYear + startOfYear.getDay()) / 7);

  const secondsSinceMidnight = hours24 * 3600 + minutes * 60 + seconds;
  const dayProgress = (secondsSinceMidnight / 86400) * 100;

  const navSections: { key: TabType; title: string; subtitle: string; icon: React.ReactNode; color: string }[] = [
    { key: 'quran', title: 'قورئانی پیرۆز', subtitle: '١١٤ سوورەت بە تەفسیر', icon: <BookOpen className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'audioQuran', title: 'قورئانی دەنگی', subtitle: 'گوێگرتن لە قورئانخوێنان', icon: <Headphones className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'adhkar', title: 'دوعا و زیکر', subtitle: 'دوعای ڕۆژانە و زیکر', icon: <Heart className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'tasbih', title: 'تەسبیح', subtitle: 'ژمێرەری زیرەک', icon: <Sparkles className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'qibla', title: 'قیبلەنما', subtitle: 'ئاراستەی کەعبە', icon: <Compass className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'arQibla', title: 'قیبلەی AR', subtitle: 'بە کامێرا ببینە', icon: <Camera className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'nearbyMosques', title: 'نزیکترین مزگەوت', subtitle: 'مزگەوتەکان لە دەوروبەرت', icon: <MapPin className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'planner', title: 'پلانەر', subtitle: 'پلانی خوێندنەوە', icon: <Target className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'stats', title: 'ئامارەکان', subtitle: 'کاتی بەکارهێنان', icon: <BarChart3 className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'names', title: 'ناوەکان', subtitle: 'ناوی ئاینی', icon: <Baby className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'prophets', title: 'پێغەمبەران', subtitle: '٢٥ پێغەمبەر', icon: <Crown className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'asma', title: 'ناوەکانی خودا', subtitle: '٩٩ ناوی پیرۆز', icon: <Sparkles className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'mirath', title: 'میرات', subtitle: 'حیسابکردنی فەرائز', icon: <Scale className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'zakat', title: 'زەکات', subtitle: 'حیسابکردنی زەکات', icon: <Coins className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'hajj', title: 'حەج و عومرە', subtitle: 'ڕێنمایی هەنگاو بە هەنگاو', icon: <Navigation className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'fasting', title: 'ڕۆژوو', subtitle: 'تۆمارکردنی ڕۆژوو', icon: <Moon className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'shareImage', title: 'وێنەی ئایەت', subtitle: 'دروستکردنی وێنە', icon: <ImageIcon className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'calendar', title: 'تەقویم', subtitle: 'بەرواری کۆچی', icon: <CalendarDays className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'messages', title: 'پەیامەکان', subtitle: 'ئاگادارییەکان', icon: <Clock className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
    { key: 'settings', title: 'ڕێکخستن', subtitle: 'ڕێکخستنی ئەپ', icon: <SettingsIcon className="w-6 h-6 text-(--color-gold)" />, color: 'gold' },
  ];

  return (
    <div 
      className="w-full max-w-3xl mx-auto space-y-5 animate-fadeIn pb-28 text-(--text-main) font-kurdish"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {toastMessage && (
        <div className="fixed top-6 inset-x-4 z-50 flex justify-center animate-fadeIn pointer-events-none">
          <div className="border text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-gold)', color: 'var(--text-main)' }}>
            <CheckCircle2 className="w-4 h-4 text-(--color-gold)" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ===== دوگمەی چالاککردنی دەنگ (ئەگەر چالاک نەکرابێت) ===== */}
      {!isAudioUnlocked && (
        <div 
          className="p-4 rounded-3xl border-2 border-dashed shadow-sm flex flex-col items-center gap-3 text-center"
          style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'var(--color-gold)' }}
        >
          <Lock className="w-8 h-8 text-(--color-gold)" />
          <div>
            <h3 className="text-sm font-bold text-(--text-main) font-naskh">
              دەنگ چالاک نەکراوە
            </h3>
            <p className="text-[11px] text-(--text-muted) font-kurdish mt-1">
              بۆ ئەوەی بانگەکان خۆکارانە لێبدرێن لە کاتی نوێژدا، تکایە کلیک بکە:
            </p>
          </div>
          <button
            onClick={unlockAudio}
            className="px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
          >
            <Unlock className="w-4 h-4" />
            <span className="font-naskh">چالاککردنی دەنگی بانگ</span>
          </button>
        </div>
      )}

      {/* ===== ١. کارتی کات + بەروار ===== */}
      <div 
        className="sticky top-16 z-30 p-5 rounded-3xl border shadow-lg backdrop-blur-xl space-y-4"
        style={{ background: 'linear-gradient(135deg, var(--color-gold-muted) 0%, var(--bg-card) 100%)', borderColor: 'var(--color-gold)' }}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--color-gold)' }}>
              <CalendarDays className="w-5 h-5 text-[#031F3C]" />
            </div>
            <div>
              <div className="text-sm font-bold font-naskh leading-tight" style={{ color: 'var(--color-gold)' }}>
                {lang === 'ckb' ? weekdayKu : lang === 'ar' ? weekdayAr : weekdayEn}
              </div>
              <div className="text-[10px] text-(--text-muted) font-mono">
                {gregorianLocalized}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-mono font-bold" style={{ backgroundColor: 'var(--color-gold-muted)', color: 'var(--color-gold)', border: '1px solid rgba(242, 201, 76, 0.3)' }}>
              <Hash className="w-2.5 h-2.5" /> ڕۆژی {dayOfYear}
            </span>
            <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-mono font-bold" style={{ backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)', border: '1px solid var(--border-theme)' }}>
              <TrendingUp className="w-2.5 h-2.5" /> هەفتەی {weekOfYear}
            </span>
          </div>
        </div>

        {/* کاتژمێر */}
        <div className="flex items-center justify-center gap-2 py-2 flex-row-reverse" dir="ltr">
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums" style={{ color: 'var(--color-teal)' }}>
              {pad(seconds)}
            </span>
            <span className="text-[9px] text-(--text-muted) font-kurdish font-bold mt-0.5">چرکە</span>
          </div>
          <span className="text-3xl font-black font-mono self-start pt-1" style={{ color: 'var(--color-gold)', opacity: 0.5 }}>:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums" style={{ color: 'var(--color-gold)' }}>
              {pad(minutes)}
            </span>
            <span className="text-[9px] text-(--text-muted) font-kurdish font-bold mt-0.5">خولەک</span>
          </div>
          <span className="text-3xl font-black font-mono self-start pt-1" style={{ color: 'var(--color-gold)', opacity: 0.5 }}>:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums" style={{ color: 'var(--color-gold)' }}>
              {pad(hours12)}
            </span>
            <span className="text-[9px] text-(--text-muted) font-kurdish font-bold mt-0.5">کاتژمێر</span>
          </div>
          <span className="text-xs sm:text-sm font-bold font-mono self-start pt-2" style={{ color: 'var(--text-muted)' }}>{ampm}</span>
        </div>

        {/* شریتی پێشکەوتنی ڕۆژ */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[9px] text-(--text-muted) font-kurdish">
            <span>پێشکەوتنی ڕۆژ</span>
            <span className="font-mono font-bold" style={{ color: 'var(--color-gold)' }}>{dayProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-chip)' }}>
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${dayProgress}%`, background: 'linear-gradient(90deg, var(--color-gold), var(--color-teal))' }} />
          </div>
        </div>

        {/* بەرواری کۆچی + شوێن */}
        <div className="flex items-center justify-between pt-2 border-t border-(--border-theme)">
          <div className="flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-(--color-gold)" />
            <span className="text-[10px] text-(--text-muted) font-kurdish">کۆچی:</span>
            <span className="text-[10px] font-bold font-naskh" style={{ color: 'var(--color-gold)' }}>{hijriFormatted}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-(--color-gold)" />
            <span className="text-[10px] font-bold font-naskh" style={{ color: 'var(--color-gold)' }}>{cityName}</span>
          </div>
        </div>
      </div>

      {/* ===== ٢. کارتی نوێژی داهاتوو ===== */}
      {nextInfo && timings && (
        <div className="relative overflow-hidden rounded-3xl border shadow-xl p-5" style={{ background: 'linear-gradient(135deg, var(--color-gold-muted) 0%, var(--bg-card) 100%)', borderColor: 'var(--color-gold)' }}>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: 'var(--color-gold)' }}>
                  <Zap className="w-5 h-5 text-[#031F3C]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-gold)' }}>{t.nextPrayer}</div>
                  <div className="text-2xl font-bold font-naskh" style={{ color: 'var(--color-gold)' }}>{t[nextInfo.nextKey] || nextInfo.nextKey}</div>
                </div>
              </div>
              <div className="text-end">
                <div className="text-3xl font-black font-mono" style={{ color: 'var(--color-gold)' }}>{nextInfo.nextTime}</div>
                <div className="text-[10px] text-(--text-muted) font-kurdish">کاتی بانگ</div>
              </div>
            </div>

            <div className="pt-3 border-t border-(--border-theme)">
              <div className="text-[11px] text-(--text-muted) font-kurdish mb-2 text-center">{t.timeRemaining} {t[nextInfo.nextKey]}:</div>
              <div className="flex items-center justify-center gap-2 flex-row-reverse">
                <div className="flex flex-col items-center px-3 py-2 rounded-2xl min-w-17.5" style={{ backgroundColor: 'var(--color-gold)' }}>
                  <span className="text-2xl font-black font-mono text-[#031F3C] tabular-nums">{String(nextInfo.secsLeft).padStart(2, '0')}</span>
                  <span className="text-[9px] text-[#031F3C] font-kurdish mt-0.5 font-bold">چرکە</span>
                </div>
                <span className="text-2xl font-black" style={{ color: 'var(--color-gold)' }}>:</span>
                <div className="flex flex-col items-center px-3 py-2 rounded-2xl min-w-17.5" style={{ backgroundColor: 'var(--bg-chip)', border: '1px solid var(--border-theme)' }}>
                  <span className="text-2xl font-black font-mono tabular-nums" style={{ color: 'var(--color-gold)' }}>{String(nextInfo.minsLeft).padStart(2, '0')}</span>
                  <span className="text-[9px] text-(--text-muted) font-kurdish mt-0.5">خولەک</span>
                </div>
                <span className="text-2xl font-black" style={{ color: 'var(--color-gold)' }}>:</span>
                <div className="flex flex-col items-center px-3 py-2 rounded-2xl min-w-17.5" style={{ backgroundColor: 'var(--bg-chip)', border: '1px solid var(--border-theme)' }}>
                  <span className="text-2xl font-black font-mono tabular-nums" style={{ color: 'var(--color-gold)' }}>{String(nextInfo.hoursLeft).padStart(2, '0')}</span>
                  <span className="text-[9px] text-(--text-muted) font-kurdish mt-0.5">کاتژمێر</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-(--text-muted) mb-1.5 font-kurdish">
                <span>{t[nextInfo.previousKey] || nextInfo.previousKey}</span>
                <span className="font-mono font-bold" style={{ color: 'var(--color-gold)' }}>{Math.round(nextInfo.progress)}%</span>
                <span>{t[nextInfo.nextKey] || nextInfo.nextKey}</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-chip)' }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${nextInfo.progress}%`, background: 'linear-gradient(90deg, var(--color-gold), var(--color-teal))' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== ٣. کۆنترۆڵی دەنگ و شار ===== */}
      <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-4 h-4 text-(--color-gold)" />
          <h3 className="text-xs font-bold text-(--text-main) font-naskh">ڕێکخستنی بانگ و شوێن</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 rounded-2xl border flex items-center gap-2" style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}>
            <MapPin className="w-4 h-4 text-(--color-gold) shrink-0" />
            <select value={selectedCity.id} onChange={(e) => { const found = CITIES.find(c => c.id === e.target.value); if (found) onSelectCity(found); }} className="bg-transparent w-full font-bold text-xs text-(--text-main) cursor-pointer focus:outline-none font-naskh">
              {CITIES.map((c) => (<option key={c.id} value={c.id} className="text-black">{lang === 'ckb' ? c.nameKu : lang === 'ar' ? c.nameAr : c.nameEn}</option>))}
            </select>
          </div>
          <button type="button" onClick={handleUseGPS} disabled={isLocating} className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50" style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'rgba(242, 201, 76, 0.3)', color: 'var(--color-gold)' }}>
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span className="font-naskh hidden sm:inline">{isLocating ? 'دەدۆزرێتەوە...' : 'GPS'}</span>
          </button>
          <button type="button" onClick={loadTimings} disabled={isLoading} className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50" style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}>
            <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="font-naskh hidden sm:inline">نوێکردنەوە</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 rounded-2xl border flex items-center gap-2" style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}>
            <Volume2 className="w-4 h-4 text-(--color-gold) shrink-0" />
            <select value={selectedVoiceId} onChange={(e) => setSelectedVoiceId(e.target.value)} className="bg-transparent w-full font-bold text-xs text-(--text-main) cursor-pointer focus:outline-none font-naskh">
              {ADHAN_VOICES.map((v) => (<option key={v.id} value={v.id} className="text-black">{v.nameKu}</option>))}
            </select>
          </div>
          <button type="button" onClick={handleToggleAzan} className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm ${isPlayingAzan ? 'animate-pulse' : ''}`} style={isPlayingAzan ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' } : { backgroundColor: 'var(--color-gold-muted)', color: 'var(--color-gold)' }}>
            {isPlayingAzan ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="font-naskh">{isPlayingAzan ? 'وەستاندن' : 'گوێگرتن'}</span>
          </button>
        </div>
      </div>

      {/* ===== ٤. کاتی پێنج نوێژەکە ===== */}
      {error && (
        <div className="p-4 rounded-3xl border text-center space-y-2" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          <p className="text-sm text-rose-400 font-kurdish">{error}</p>
          <button type="button" onClick={loadTimings} className="px-4 py-2 rounded-2xl text-xs font-bold" style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}>
            هەوڵدانەوە
          </button>
        </div>
      )}

      {isLoading && !timings && (
        <div className="p-8 rounded-3xl border text-center space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          <div className="w-10 h-10 border-4 border-(--color-gold) border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-(--text-muted) font-kurdish">بارکردنی کاتەکانی بانگ...</p>
        </div>
      )}

      {timings && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <Clock className="w-4 h-4 text-(--color-gold)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">کاتی نوێژەکانی ئەمڕۆ</h3>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: 'var(--color-gold-muted)', color: 'var(--color-gold)', border: '1px solid rgba(242, 201, 76, 0.3)' }}>{cityName}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {prayerCards.map((item) => {
              const time = timings ? timings[item.key] : '--:--';
              const isNext = nextInfo?.nextKey === item.key;
              const Icon = item.icon;
              return (
                <div key={item.key} className="relative p-3 rounded-2xl border transition-all flex flex-col justify-between" style={{ backgroundColor: isNext ? 'var(--color-gold-muted)' : 'var(--bg-card)', borderColor: isNext ? 'var(--color-gold)' : 'var(--border-theme)' }}>
                  {isNext && (<div className="absolute top-2 right-2"><span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--color-gold)' }} /><span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--color-gold)' }} /></span></div>)}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: isNext ? 'var(--color-gold)' : 'var(--bg-chip)' }}>
                      <Icon className="w-4 h-4" style={{ color: isNext ? '#031F3C' : 'var(--color-gold)' }} />
                    </div>
                    <span className="text-[11px] font-bold font-naskh truncate" style={{ color: isNext ? 'var(--color-gold)' : 'var(--text-main)' }}>{item.label}</span>
                  </div>
                  <div>
                    <div className="text-lg font-black font-mono tracking-tight" style={{ color: isNext ? 'var(--color-gold)' : 'var(--text-main)' }}>{time}</div>
                    <div className="text-[9px] text-(--text-muted) font-kurdish mt-0.5">{isNext ? t.nextPrayer : item.key === 'sunrise' ? 'شروق' : 'فەرز'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== ٥. کارتی ڕۆژوو ===== */}
      {timings && (
        <div className="p-4 rounded-3xl border shadow-sm" style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'rgba(242, 201, 76, 0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0" style={{ backgroundColor: 'var(--color-gold)' }}>
              <Moon className="w-6 h-6 text-[#031F3C]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold font-naskh flex items-center gap-1.5" style={{ color: 'var(--color-gold)' }}><Sparkles className="w-3.5 h-3.5" /> تایبەت بە ڕۆژووەوانان</h4>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Sunrise className="w-3.5 h-3.5 text-(--color-gold)" />
                  <span className="text-[11px] text-(--text-muted) font-kurdish">پارشێو:</span>
                  <span className="text-[11px] font-bold font-mono" style={{ color: 'var(--color-gold)' }}>{timings.fajr}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sunset className="w-3.5 h-3.5 text-(--color-gold)" />
                  <span className="text-[11px] text-(--text-muted) font-kurdish">بەربانگ:</span>
                  <span className="text-[11px] font-bold font-mono" style={{ color: 'var(--color-gold)' }}>{timings.maghrib}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== ٦. هەموو بەشەکانی ئەپ ===== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
              <Layers className="w-4 h-4 text-(--color-gold)" />
            </div>
            <h3 className="text-sm font-bold text-(--text-main) font-naskh">هەموو بەشەکانی ئەپ</h3>
          </div>
          <span className="text-[10px] text-(--text-muted) font-kurdish">کلیک بکە بۆ کردنەوە</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {navSections.map((section) => (
            <button key={section.key} type="button" onClick={() => onNavigate?.(section.key)} className="p-3 rounded-2xl border shadow-sm transition-all cursor-pointer active:scale-[0.98] hover:shadow-md text-start flex flex-col gap-2 group" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                {section.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-(--text-main) font-naskh">{section.title}</h4>
                <p className="text-[10px] text-(--text-muted) font-kurdish mt-0.5 line-clamp-1">{section.subtitle}</p>
              </div>
              <div className="flex items-center gap-1 mt-auto pt-1">
                <span className="text-[10px] font-bold font-kurdish transition-colors" style={{ color: 'var(--color-gold)' }}>بکەرەوە</span>
                <ArrowRight className="w-3 h-3 text-(--color-gold)" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ===== ٧. زانیاری زیاتر ===== */}
      <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
            <Info className="w-4 h-4 text-(--color-gold)" />
          </div>
          <h3 className="text-sm font-bold text-(--text-main) font-naskh">زانیاری زیاتر</h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl border flex items-center gap-2" style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}>
            <Calendar className="w-4 h-4 text-(--color-gold) shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-(--text-muted) font-kurdish">بەرواری زایینی</div>
              <div className="text-[10px] font-bold font-kurdish truncate" style={{ color: 'var(--text-main)' }}>{gregorianLocalized}</div>
            </div>
          </div>
          <div className="p-3 rounded-2xl border flex items-center gap-2" style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}>
            <Moon className="w-4 h-4 text-(--color-gold) shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-(--text-muted) font-kurdish">بەرواری کۆچی</div>
              <div className="text-[10px] font-bold font-naskh truncate" style={{ color: 'var(--color-gold)' }}>{hijriFormatted}</div>
            </div>
          </div>
          <div className="p-3 rounded-2xl border flex items-center gap-2" style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}>
            <Hash className="w-4 h-4 text-(--color-gold) shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-(--text-muted) font-kurdish">ڕۆژی ساڵ</div>
              <div className="text-[10px] font-bold font-mono truncate" style={{ color: 'var(--text-main)' }}>{dayOfYear} / 365</div>
            </div>
          </div>
          <div className="p-3 rounded-2xl border flex items-center gap-2" style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}>
            <TrendingUp className="w-4 h-4 text-(--color-gold) shrink-0" />
            <div className="min-w-0">
              <div className="text-[9px] text-(--text-muted) font-kurdish">هەفتەی ساڵ</div>
              <div className="text-[10px] font-bold font-mono truncate" style={{ color: 'var(--text-main)' }}>{weekOfYear} / 52</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};