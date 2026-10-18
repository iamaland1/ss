/**
 * بەشی تەسبیحی ئەلیکترۆنی و ژماردنی زیکر.
 */
import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  Sparkles, 
  Award, 
  Plus, 
  Settings2,
  Check,
  Copy,
  Undo2,
  X,
  CheckCircle2,
  Flame,
  Volume1,
  Edit3,
  BookmarkCheck,
  Layers
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { soundEffects } from '../services/soundEffects';

interface TasbihViewProps {
  lang: Language;
}

interface DhikrPreset {
  id: string;
  ar: string;
  ku: string;
  en: string;
  virtueKu?: string;
}

const DEFAULT_DHIKRS: DhikrPreset[] = [
  { 
    id: '1',
    ar: 'سُبْحَانَ اللَّهِ', 
    ku: 'پاک و بێگەردی بۆ پەروەردگار', 
    en: 'Glory be to Allah',
    virtueKu: 'پاکی خودا لە هەموو کەمکوڕییەک، چاندنی دارێکە لە بەهەشتدا.'
  },
  { 
    id: '2',
    ar: 'الْحَمْدُ لِلَّهِ', 
    ku: 'ستایش و سوپاسگوزاری شایستەی خودایە', 
    en: 'Praise be to Allah',
    virtueKu: 'تەرازووی چاکەکان پڕ دەکات لە ڕۆژی دواییدا.'
  },
  { 
    id: '3',
    ar: 'لَا إِلَهَ إِلَّا اللَّهُ', 
    ku: 'هیچ خوایەکی شایستەی پەرستن نییە بێجگە لە ئەڵڵا', 
    en: 'There is no god but Allah',
    virtueKu: 'گەورەترین وتەی تەوحید و کلیل و بنچینەی بەهەشتە.'
  },
  { 
    id: '4',
    ar: 'اللَّهُ أَكْبَرُ', 
    ku: 'خودا لە هەموو شتێک گەورەتر و مەزنترە', 
    en: 'Allah is the Greatest',
    virtueKu: 'گەورەکردنی خودا لە دڵ و وتە و هەموو کردەوەکانی ژیاندا.'
  },
  { 
    id: '5',
    ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', 
    ku: 'داوای لێخۆشبوون لە خوا دەکەم و دەگەڕێمەوە بۆ لای', 
    en: 'I seek forgiveness from Allah',
    virtueKu: 'ڕزق و بەرەکەت زیاد دەکات و دڵەکان لە گوناهـ پاک دەکاتەوە.'
  },
  { 
    id: '6',
    ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', 
    ku: 'خوایە دروود و سڵاوات بڕێژە بەسەر پێغەمبەر و ئالەکەی', 
    en: 'Blessings upon Prophet Muhammad',
    virtueKu: 'هەرکەسێک یەک سڵاوات بنێرێت، خودا دە سڵاواتی بەسەردا دەڕێژێت.'
  },
  { 
    id: '7',
    ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', 
    ku: 'هیچ هێز و توانایەک نییە جگە بە دەستی خودا', 
    en: 'No power nor strength except with Allah',
    virtueKu: 'گەنجینەیەکە لە گەنجینە نایابەکانی بەهەشت.'
  },
  { 
    id: '8',
    ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ', 
    ku: 'پاکی و سوپاس بۆ خودا، پاکی بۆ خودای مەزن و بەتوانا', 
    en: 'Glory and praise be to Allah the Tremendous',
    virtueKu: 'دوو وتەی سووک لەسەر زمان، قورس لەسەر تەرازوو، خۆشەویست لای خودا.'
  },
  { 
    id: '9',
    ar: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ', 
    ku: 'ئەی زیندووی ڕاگری هەموو بوونەوەر! بە بەزەیی تۆ هانا دەبەم', 
    en: 'O Ever-Living, O Sustainer, by Your mercy I seek help',
    virtueKu: 'دەرمانی خەم و پەژارە و ئاسانکاری کارە سەختەکانە.'
  },
  { 
    id: '10',
    ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', 
    ku: 'خودامان بەسە و چاکترین پاڵپشت و سەرپەرشتیارە', 
    en: 'Sufficient for us is Allah, and He is the best Disposer of affairs',
    virtueKu: 'پارێزەری باوەڕداران لە ترس و ناڕەحەتی.'
  }
];

export const TasbihView: React.FC<TasbihViewProps> = ({ lang }) => {
  const t = translations[lang] || translations.ckb;
  const isRtl = lang === 'ckb' || lang === 'ar';

  // State
  const [count, setCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sirat_tasbih_current_count');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [target, setTarget] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sirat_tasbih_target');
      return saved ? parseInt(saved, 10) : 33;
    } catch {
      return 33;
    }
  });

  const [laps, setLaps] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sirat_tasbih_laps');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [todayCount, setTodayCount] = useState<number>(() => {
    try {
      const savedDate = localStorage.getItem('sirat_tasbih_date');
      const todayStr = new Date().toISOString().slice(0, 10);
      if (savedDate === todayStr) {
        return parseInt(localStorage.getItem('sirat_tasbih_today_count') || '0', 10);
      }
      return 0;
    } catch {
      return 0;
    }
  });

  const [totalLifetime, setTotalLifetime] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('sirat_lifetime_tasbih') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [selectedDhikr, setSelectedDhikr] = useState<DhikrPreset>(() => {
    try {
      const saved = localStorage.getItem('sirat_selected_dhikr');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_DHIKRS[0];
  });

  const [customDhikrs, setCustomDhikrs] = useState<DhikrPreset[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_custom_dhikrs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sirat_tasbih_sound');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sirat_tasbih_vibrate');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // UI Modals
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);
  const [newArabicText, setNewArabicText] = useState<string>('');
  const [newKurdishText, setNewKurdishText] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedDhikrId, setCopiedDhikrId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sirat_tasbih_current_count', count.toString());
      localStorage.setItem('sirat_tasbih_target', target.toString());
      localStorage.setItem('sirat_tasbih_laps', laps.toString());
      localStorage.setItem('sirat_lifetime_tasbih', totalLifetime.toString());
      localStorage.setItem('sirat_selected_dhikr', JSON.stringify(selectedDhikr));
      localStorage.setItem('sirat_tasbih_sound', JSON.stringify(soundEnabled));
      localStorage.setItem('sirat_tasbih_vibrate', JSON.stringify(vibrationEnabled));
      localStorage.setItem('sirat_custom_dhikrs', JSON.stringify(customDhikrs));
      
      const todayStr = new Date().toISOString().slice(0, 10);
      localStorage.setItem('sirat_tasbih_date', todayStr);
      localStorage.setItem('sirat_tasbih_today_count', todayCount.toString());
    } catch {}
  }, [count, target, laps, totalLifetime, selectedDhikr, soundEnabled, vibrationEnabled, customDhikrs, todayCount]);

  // Main Tap Handler (+1)
  const handleTap = () => {
    if (soundEnabled) {
      soundEffects.playTasbihClick();
    }
    if (vibrationEnabled) {
      soundEffects.vibrate(28);
    }

    const nextCount = count + 1;
    const nextTotal = totalLifetime + 1;
    const nextToday = todayCount + 1;

    setTotalLifetime(nextTotal);
    setTodayCount(nextToday);

    // Reached target
    if (target > 0 && nextCount >= target) {
      setCount(0);
      setLaps(l => l + 1);
      if (soundEnabled) soundEffects.playGoalChime();
      if (vibrationEnabled) soundEffects.vibrateSuccess();
      showToast('پیرۆزە! خولەی زیکر تەواو بوو ✨');
    } else {
      setCount(nextCount);
    }
  };

  // Undo Tap (-1)
  const handleUndo = () => {
    if (count <= 0) return;
    if (soundEnabled) soundEffects.playTasbihClick();
    if (vibrationEnabled) soundEffects.vibrate(18);

    setCount(prev => Math.max(0, prev - 1));
    setTotalLifetime(prev => Math.max(0, prev - 1));
    setTodayCount(prev => Math.max(0, prev - 1));
    showToast('یەک ژمارە کەمکرایەوە (-١)');
  };

  // Fast Step +10
  const handleAddTen = () => {
    if (soundEnabled) soundEffects.playTasbihClick();
    if (vibrationEnabled) soundEffects.vibrate(35);

    const nextCount = count + 10;
    const nextTotal = totalLifetime + 10;
    const nextToday = todayCount + 10;

    setTotalLifetime(nextTotal);
    setTodayCount(nextToday);

    if (target > 0 && nextCount >= target) {
      const extraLaps = Math.floor(nextCount / target);
      const remainder = nextCount % target;
      setCount(remainder);
      setLaps(l => l + extraLaps);
      if (soundEnabled) soundEffects.playGoalChime();
      if (vibrationEnabled) soundEffects.vibrateSuccess();
      showToast(`+10 زیادکرا (خولەی نوێ: ${laps + extraLaps})`);
    } else {
      setCount(nextCount);
      showToast('+10 زیادکرا ✓');
    }
  };

  // Reset current cycle or all
  const handleConfirmReset = () => {
    setCount(0);
    setLaps(0);
    setShowResetModal(false);
    showToast('ژماردن سەرلەنوێ دانرایەوە ✓');
  };

  // Copy Dhikr
  const handleCopyDhikr = async (dhikr: DhikrPreset) => {
    const text = `${dhikr.ar}\n${dhikr.ku}\n\n— ئەپی سیرات (تەسبیح)`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedDhikrId(dhikr.id);
        setTimeout(() => setCopiedDhikrId(null), 2000);
        showToast('زیکرەکە بە سەرکەوتوویی کۆپی کرا ✓');
      } catch {
        showToast('نەتوانرا کۆپی بکرێت');
      }
    }
  };

  // Web Speech TTS pronunciation of Dhikr
  const handlePlayDhikrAudio = (arabicText: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('دەنگی خودکار لەم ئامێرەدا بەردەست نییە');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(arabicText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  // Add Custom Dhikr
  const handleSaveCustomDhikr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArabicText.trim()) return;

    const newDhikr: DhikrPreset = {
      id: Date.now().toString(),
      ar: newArabicText.trim(),
      ku: newKurdishText.trim() || 'زیکری تایبەت',
      en: 'Custom Dhikr'
    };

    setCustomDhikrs(prev => [newDhikr, ...prev]);
    setSelectedDhikr(newDhikr);
    setCount(0);
    setNewArabicText('');
    setNewKurdishText('');
    setShowAddCustomModal(false);
    showToast('زیکری نوێ زیادکرا و هەڵبژێردرا ✨');
  };

  // Progress percentage
  const progressPercent = target > 0 ? Math.min(100, (count / target) * 100) : 0;
  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progressPercent / 100) * ringCircumference;

  const allDhikrsList = [...customDhikrs, ...DEFAULT_DHIKRS];

  return (
    <div 
      className="w-full max-w-xl mx-auto space-y-5 animate-fadeIn pb-24 text-(--text-main) font-kurdish"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 inset-x-4 z-50 flex justify-center pointer-events-none animate-fadeIn">
          <div 
            className="border text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 max-w-sm pointer-events-auto"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--color-gold)', 
              color: 'var(--text-main)' 
            }}
          >
            <CheckCircle2 className="w-4 h-4 text-(--color-gold) shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP CONTROLS BAR (Sound, Vibrate, Target Presets, Reset) */}
      {/* ========================================================================= */}
      <div 
        className="p-4 rounded-3xl border shadow-lg flex items-center justify-between gap-2 flex-wrap"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        {/* Sound & Vibration Toggles */}
        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              showToast(next ? 'دەنگی کلیل چالاک کرا 🔔' : 'دەنگی کلیل بێدەنگ کرا 🔕');
            }}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:border-(--accent-yellow) hover:text-(--accent-yellow)"
            style={{ 
              backgroundColor: soundEnabled ? 'var(--color-gold-muted)' : 'var(--bg-chip)',
              color: soundEnabled ? 'var(--accent-yellow)' : 'var(--text-muted)',
              border: soundEnabled ? '1px solid var(--accent-yellow)' : '1px solid var(--border-theme)'
            }}
            title={t.soundToggle || 'دەنگی کلیل'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Vibration Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !vibrationEnabled;
              setVibrationEnabled(next);
              if (next) soundEffects.vibrate(30);
              showToast(next ? 'لەرزین (Vibration) چالاک کرا 📳' : 'لەرزین ناچالاک کرا');
            }}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:border-(--accent-yellow) hover:text-(--accent-yellow)"
            style={{ 
              backgroundColor: vibrationEnabled ? 'var(--color-gold-muted)' : 'var(--bg-chip)',
              color: vibrationEnabled ? 'var(--accent-yellow)' : 'var(--text-muted)',
              border: vibrationEnabled ? '1px solid var(--accent-yellow)' : '1px solid var(--border-theme)'
            }}
            title={t.vibrationToggle || 'لەرزینی تەسبیح'}
          >
            <Vibrate className="w-4 h-4" />
          </button>
        </div>

        {/* Target Goal Presets ([33, 99, 100, 1000, 0]) */}
        <div 
          className="flex items-center gap-1 p-1 rounded-2xl border text-xs font-mono font-bold"
          style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
        >
          {[33, 99, 100, 1000, 0].map((num) => {
            const isSelected = target === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setTarget(num);
                  setCount(0);
                  showToast(num === 0 ? 'ئامانج: بێسنوور (∞)' : `ئامانج دیاریکرا بۆ: ${num}`);
                }}
                className={`px-2.5 py-1 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 border ${
                  isSelected 
                    ? 'shadow-sm font-extrabold border-(--accent-yellow)' 
                    : 'border-transparent text-(--text-muted) hover:border-(--accent-yellow) hover:text-(--accent-yellow) hover:bg-(--color-gold-muted)'
                }`}
                style={isSelected ? { 
                  backgroundColor: 'var(--accent-yellow)', 
                  color: '#031F3C' 
                } : {}}
              >
                {num === 0 ? '∞' : num}
              </button>
            );
          })}
        </div>

        {/* Reset Button */}
        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 border border-transparent hover:border-(--accent-yellow) text-rose-400 hover:text-(--accent-yellow) hover:bg-(--color-gold-muted)"
          style={{ backgroundColor: 'var(--bg-chip)' }}
          title={t.resetTasbih || 'سەرلەنوێ دانانەوە'}
        >
          <RotateCcw className="w-4 h-4 transition-transform duration-200" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. SELECTED DHIKR CARD (Clean, readable, with Audio & Copy) */}
      {/* ========================================================================= */}
      <div 
        className="p-6 rounded-3xl border shadow-xl relative overflow-hidden text-center space-y-3 card-hover transition-all duration-200"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'rgba(242, 201, 76, 0.3)' 
        }}
      >
        {/* Subtle decorative background glow */}
        <div 
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: 'var(--accent-yellow)' }}
        />

        <div className="flex items-center justify-between">
          <span 
            className="text-[11px] font-bold px-3 py-1 rounded-full border font-naskh flex items-center gap-1.5"
            style={{ 
              backgroundColor: 'var(--color-gold-muted)', 
              borderColor: 'rgba(242, 201, 76, 0.25)',
              color: 'var(--accent-yellow)' 
            }}
          >
            <Sparkles className="w-3 h-3" />
            <span>{t.presetDhikr || 'زیکری دیاریکراو'}</span>
          </span>

          <div className="flex items-center gap-1">
            {/* Audio pronunciation button */}
            <button
              type="button"
              onClick={() => handlePlayDhikrAudio(selectedDhikr.ar)}
              className={`p-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 border border-transparent hover:border-(--accent-yellow) hover:text-(--accent-yellow) ${
                isPlayingAudio ? 'bg-(--accent-yellow) text-slate-950 animate-pulse' : 'text-(--text-muted)'
              }`}
              style={{ backgroundColor: isPlayingAudio ? 'var(--accent-yellow)' : 'var(--bg-chip)' }}
              title="گوێگرتن لە دەقی زیکرەکە"
            >
              <Volume1 className="w-4 h-4" />
            </button>

            {/* Copy button */}
            <button
              type="button"
              onClick={() => handleCopyDhikr(selectedDhikr)}
              className="p-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 border border-transparent hover:border-(--accent-yellow) hover:text-(--accent-yellow) text-(--text-muted)"
              style={{ backgroundColor: 'var(--bg-chip)' }}
              title="کۆپیکردنی دەق"
            >
              {copiedDhikrId === selectedDhikr.id ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Big Arabic Dhikr Text */}
        <h2 
          className="font-quran-verse text-2xl sm:text-3xl font-bold leading-relaxed tracking-wide pt-1"
          style={{ color: 'var(--color-gold)' }}
        >
          {selectedDhikr.ar}
        </h2>

        {/* Kurdish Translation */}
        <p className="text-sm text-(--text-main)/90 font-medium max-w-md mx-auto leading-relaxed">
          {lang === 'ckb' ? selectedDhikr.ku : lang === 'ar' ? selectedDhikr.ar : selectedDhikr.en}
        </p>

        {selectedDhikr.virtueKu && (
          <p className="text-xs text-(--text-muted) italic pt-1 border-t border-(--border-theme)">
            ✨ {selectedDhikr.virtueKu}
          </p>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN DIGITAL CIRCULAR TAP BEAD / BUTTON */}
      {/* ========================================================================= */}
      <div className="relative py-4 flex flex-col items-center justify-center select-none">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Animated SVG Progress Ring */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r={ringRadius}
              className="text-white/10 stroke-current"
              strokeWidth="5"
              fill="transparent"
            />
            {/* Active Progress */}
            {target > 0 && (
              <circle
                cx="50"
                cy="50"
                r={ringRadius}
                stroke="var(--color-gold)"
                strokeWidth="5"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-300 ease-out"
              />
            )}
          </svg>

          {/* Central Touch Button (Tappable Bead) */}
          <button
            type="button"
            onClick={handleTap}
            className="absolute inset-5 rounded-full shadow-2xl flex flex-col items-center justify-center active:scale-95 transition-all duration-150 cursor-pointer border-4 group"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-theme)' 
            }}
          >
            {/* Top Prompt */}
            <span 
              className="text-[11px] font-bold uppercase tracking-widest mb-1 font-naskh transition-colors group-hover:text-(--color-gold)"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.tapHere || 'داگرە بۆ ژماردن'}
            </span>

            {/* Giant Count Number */}
            <span 
              className="text-5xl sm:text-6xl font-black font-mono tracking-tight transition-transform group-hover:scale-105"
              style={{ color: 'var(--color-gold)' }}
            >
              {count}
            </span>

            {/* Target Display */}
            {target > 0 && (
              <span className="text-xs font-mono font-bold text-(--text-muted) mt-1">
                / {target}
              </span>
            )}

            {/* Laps Tag */}
            {laps > 0 && (
              <div 
                className="mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border"
                style={{ 
                  backgroundColor: 'var(--color-gold-muted)', 
                  borderColor: 'rgba(242, 201, 76, 0.3)',
                  color: 'var(--color-gold)' 
                }}
              >
                خولە: {laps}
              </div>
            )}
          </button>
        </div>

        {/* Auxiliary Controls under the dial: Undo -1, +10 Fast, Reset */}
        <div className="flex items-center gap-3 pt-4">
          {/* Undo -1 */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={count === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm hover:border-(--accent-yellow) hover:text-(--accent-yellow)"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
            title="پاشەکشێ یەک ژمارە"
          >
            <Undo2 className="w-3.5 h-3.5 text-(--accent-yellow)" />
            <span>کەمکردنەوە (-١)</span>
          </button>

          {/* +10 Fast Button */}
          <button
            type="button"
            onClick={handleAddTen}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:border-(--accent-yellow) hover:text-(--accent-yellow)"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
            title="زیادکردنی خێرای دە ژمارە"
          >
            <Plus className="w-3.5 h-3.5 text-(--accent-yellow)" />
            <span className="font-mono">+10</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. LIFETIME & DAILY STATS ROW */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Today's Taps */}
        <div 
          className="p-4 rounded-3xl border shadow-sm flex flex-col justify-between card-hover transition-all duration-200"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <div className="flex items-center gap-2 text-xs text-(--text-muted) font-medium">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>تەسبیحی ئەمڕۆ</span>
          </div>
          <span 
            className="text-2xl font-extrabold font-mono pt-2"
            style={{ color: 'var(--accent-yellow)' }}
          >
            {todayCount.toLocaleString()}
          </span>
        </div>

        {/* Completed Laps */}
        <div 
          className="p-4 rounded-3xl border shadow-sm flex flex-col justify-between card-hover transition-all duration-200"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <div className="flex items-center gap-2 text-xs text-(--text-muted) font-medium">
            <Layers className="w-4 h-4 text-(--color-teal)" />
            <span>خولە تەواوکراوەکان</span>
          </div>
          <span className="text-2xl font-extrabold font-mono pt-2 text-(--color-teal)">
            {laps.toLocaleString()}
          </span>
        </div>

        {/* All-time Lifetime Taps */}
        <div 
          className="col-span-2 sm:col-span-1 p-4 rounded-3xl border shadow-sm flex flex-col justify-between card-hover transition-all duration-200"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <div className="flex items-center gap-2 text-xs text-(--text-muted) font-medium">
            <Award className="w-4 h-4 text-(--accent-yellow)" />
            <span>کۆی گشتی تەسبیحات</span>
          </div>
          <span 
            className="text-2xl font-extrabold font-mono pt-2"
            style={{ color: 'var(--accent-yellow)' }}
          >
            {totalLifetime.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. PRESET DHIKRS LIST (کەپڵ / 2-Columns Grid) */}
      {/* ========================================================================= */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold font-naskh text-(--text-main)">
              {t.presetDhikr || 'زیکرە دیاریکراوەکان'}
            </h3>
            <span className="text-xs text-(--text-muted) font-mono">
              ({allDhikrsList.length})
            </span>
          </div>

          {/* Add Custom Dhikr Button */}
          <button
            type="button"
            onClick={() => setShowAddCustomModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 shadow-sm hover:border-(--accent-yellow) hover:bg-(--accent-yellow) hover:text-[#031F3C]"
            style={{ 
              backgroundColor: 'var(--color-gold-muted)', 
              borderColor: 'rgba(242, 201, 76, 0.3)',
              color: 'var(--accent-yellow)' 
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>زیکری نوێ</span>
          </button>
        </div>

        {/* Grid of Dhikrs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allDhikrsList.map((d) => {
            const isSelected = selectedDhikr.id === d.id;
            return (
              <div
                key={d.id}
                onClick={() => {
                  setSelectedDhikr(d);
                  setCount(0);
                  soundEffects.playTasbihClick();
                  showToast(`زیکر گۆڕدرا بۆ: ${d.ar}`);
                }}
                className="p-4 rounded-2xl border transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-between gap-3 shadow-sm card-hover relative group"
                style={{ 
                  backgroundColor: 'var(--bg-card)', 
                  borderColor: isSelected ? 'var(--accent-yellow)' : 'var(--border-theme)' 
                }}
              >
                <div className="truncate space-y-0.5 flex-1 text-start">
                  <span 
                    className="font-quran-verse text-base block font-bold truncate group-hover:text-(--accent-yellow) transition-colors duration-200"
                    style={{ color: isSelected ? 'var(--accent-yellow)' : 'var(--text-main)' }}
                  >
                    {d.ar}
                  </span>
                  <span className="text-xs text-(--text-muted) block truncate font-naskh group-hover:text-(--text-main) transition-colors duration-200">
                    {lang === 'ckb' ? d.ku : d.en}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {isSelected && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-slate-950 shadow-sm"
                      style={{ backgroundColor: 'var(--accent-yellow)' }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. RESET CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-theme)' 
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-rose-400"
                style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)' }}
              >
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-(--text-main) font-naskh">
                  سفرکردنەوەی ژماردن؟
                </h3>
                <p className="text-xs text-(--text-muted)">
                  ئایا دڵنیایت لە سفرکردنەوەی ژمارە و خولەکانی ئەم خولە؟
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:bg-white/10 cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
              >
                پەشیمانبوونەوە
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 text-white bg-rose-600 hover:bg-rose-700"
              >
                بەڵێ، سفرکردنەوە
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. ADD CUSTOM DHIKR MODAL */}
      {/* ========================================================================= */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <form 
            onSubmit={handleSaveCustomDhikr}
            className="w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--color-gold)' 
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-(--text-main) font-naskh flex items-center gap-2">
                <Plus className="w-4 h-4 text-(--color-gold)" />
                <span>زیادکردنی زیکری تایبەت</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddCustomModal(false)}
                className="p-1 rounded-full text-(--text-muted) hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-(--text-muted) block mb-1 font-naskh">
                  دەقی زیکر بە عەرەبی:
                </label>
                <input
                  type="text"
                  required
                  value={newArabicText}
                  onChange={(e) => setNewArabicText(e.target.value)}
                  placeholder="وەک: سُبْحَانَ اللَّهِ الْعَظِيمِ"
                  className="w-full px-3.5 py-2.5 rounded-2xl border text-sm text-(--text-main) placeholder-(--text-muted) outline-none focus:border-(--color-gold)"
                  style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                />
              </div>

              <div>
                <label className="text-xs text-(--text-muted) block mb-1 font-naskh">
                  ماناکەی بە کوردی (ئارەزوومەندانە):
                </label>
                <input
                  type="text"
                  value={newKurdishText}
                  onChange={(e) => setNewKurdishText(e.target.value)}
                  placeholder="ماناکەی بە کوردی بنووسە..."
                  className="w-full px-3.5 py-2.5 rounded-2xl border text-sm text-(--text-main) placeholder-(--text-muted) outline-none focus:border-(--color-gold)"
                  style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCustomModal(false)}
                className="px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:bg-white/10 cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
              >
                داخستن
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95"
                style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
              >
                پاشەکەوتکردن
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
