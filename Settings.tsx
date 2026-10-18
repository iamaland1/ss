/**
 * بەشی ڕێکخستنەکانی سیرات: دەنگی بانگ، شوێن، زمان، ڕووکار، ئاگادارکردنەوە، تایبەتمەندی و زانیاریی ئەپ.
 */
import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  MapPin, 
  Globe, 
  Bell, 
  Mail, 
  ShieldCheck, 
  FileText, 
  Info, 
  RotateCcw, 
  Star, 
  Share2, 
  Trash2, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Play, 
  Pause, 
  ExternalLink,
  ChevronDown,
  Lock,
  X,
  Compass,
  AlertCircle,
  Music,
  Mic2
} from 'lucide-react';
import { CityInfo, Language, AppearanceMode, NotificationSettings } from '../types';
import { ADHAN_VOICES, DEFAULT_NOTIFICATION_SETTINGS } from '../data/adhanVoices';
import { CITIES } from '../data/cities';
import { translations } from '../data/translations';
import { soundEffects } from '../services/soundEffects';
import { triggerNotification } from '../services/announcementsService';
import { InteractiveMapPicker } from './InteractiveMapPicker';

interface SettingsViewProps {
  lang: Language;
  setLang: (lang: Language) => void;
  selectedCity: CityInfo;
  onSelectCity: (city: CityInfo) => void;
  appearanceMode: AppearanceMode;
  setAppearanceMode: (mode: AppearanceMode) => void;
  onClose?: () => void;
}

type SubScreen = 
  | null 
  | 'adhan' 
  | 'location' 
  | 'notifications' 
  | 'privacy' 
  | 'terms' 
  | 'about' 
  | 'additional'
  | 'permissions';

export const SettingsView: React.FC<SettingsViewProps> = ({
  lang,
  setLang,
  selectedCity,
  onSelectCity,
  appearanceMode,
  setAppearanceMode,
  onClose
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [subScreen, setSubScreen] = useState<SubScreen>(null);

  const [showLangSheet, setShowLangSheet] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearCacheConfirm, setShowClearCacheConfirm] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    try {
      const saved = localStorage.getItem('sirat_notifications_config');
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATION_SETTINGS;
    } catch {
      return DEFAULT_NOTIFICATION_SETTINGS;
    }
  });

  const [showMapOnScreen, setShowMapOnScreen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sirat_map_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [activeVoiceTab, setActiveVoiceTab] = useState<'kurdish' | 'islamic'>('kurdish');

  useEffect(() => {
    try {
      localStorage.setItem('sirat_notifications_config', JSON.stringify(notificationSettings));
    } catch (e) {
      // ignore
    }
  }, [notificationSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('sirat_map_enabled', String(showMapOnScreen));
    } catch (e) {
      // ignore
    }
  }, [showMapOnScreen]);

  const handleToggleVoicePreview = (voiceId: string) => {
    if (playingVoiceId === voiceId) {
      soundEffects.stopAzan();
      setPlayingVoiceId(null);
    } else {
      soundEffects.playAdhanVoice(
        voiceId,
        undefined,
        () => setPlayingVoiceId(null),
        () => showToast('نەتوانرا دەنگی بانگ باربکرێت'),
      );
      setPlayingVoiceId(voiceId);
    }
  };

  const handleSelectDefaultVoice = (voiceId: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      selectedDefaultVoice: voiceId
    }));
    showToast('دەنگی بانگبێژ پاشەکەوت کرا ✓');
  };

  const handleSelectPrayerVoice = (prayerKey: keyof typeof notificationSettings.prayerVoices, voiceId: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      prayerVoices: {
        ...prev.prayerVoices,
        [prayerKey]: voiceId
      }
    }));
    showToast('دەنگی نوێژەکە پاشەکەوت کرا ✓');
  };

  const executeResetSettings = () => {
    localStorage.removeItem('sirat_notifications_config');
    setNotificationSettings(DEFAULT_NOTIFICATION_SETTINGS);
    setShowResetConfirm(false);
    showToast('ڕێکخستنەکان گەڕێندرانەوە بۆ دۆخی بنەڕەتی ✓');
  };

  const executeClearCache = () => {
    try {
      localStorage.removeItem('sirat_surah_cache');
      localStorage.removeItem('sirat_announcements_cache');
    } catch {
      // ignore
    }
    setShowClearCacheConfirm(false);
    showToast('فایلە کاتییەکان پاککرانەوە ✓');
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'Sirat — ئەپی ئیسلامی سیرات',
      text: 'بەرنامەی سیرات: کاتی بانگ، قورئانی پیرۆز، دوعا و زیکر، تەسبیح، ئاراستەی قیبلە و تەقویمی کۆچی.',
      url: window.location.origin
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // ignore
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.origin);
      showToast('لینکی ئەپەکە کۆپی کرا ✓');
    }
  };

  const handleContactUs = () => {
    window.location.href = 'mailto:Alandidris0771@gmail.com?subject=Sirat%20App%20Inquiry';
    if (navigator.clipboard) {
      navigator.clipboard.writeText('Alandidris0771@gmail.com');
      showToast('ئیمەیڵ کۆپی کرا (Alandidris0771@gmail.com) ✓');
    }
  };

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'کاتی بانگەکان بە چ پێوەرێک حیساب دەکرێن؟',
      a: 'کاتی بانگەکان بە پێوەری فەرمیی وەزارەتی ئەوقافی هەرێمی کوردستان و هاوکێشە ئەستێرەناسییە باوەڕپێکراوەکان بەپێی شوێنی جوگرافی حیساب دەکرێن.'
    },
    {
      q: 'ئایا ئەپەکە بەبێ ئینتەرنێت کار دەکات؟',
      a: 'بەڵێ! کاتی بانگەکان، تەسبیحی ئەلیکترۆنی، قیبلەنما، سوورەتە سەرەکییەکانی قورئان و هەموو دوعا و زیکرەکان بەبێ ئینتەرنێت کار دەکەن.'
    },
    {
      q: 'چۆن قیبلەنما بە دروستی کالیبرەیت بکەم؟',
      a: 'بۆ ئەنجامی دروست، مۆبایلەکەت لەسەر ڕوویەکی تەخت دابنێ و بە شێوەی ژمارە 8 لە هەوادا بیجوڵێنە تاکو هەستەوەرەکان ڕێک دەبن.'
    },
    {
      q: 'چۆن دەنگی بانگی کوردی هەڵبژێرم؟',
      a: 'لە بەشی دەنگی بانگبێژ، دەتوانیت لە نێوان ٢٠ بانگبێژی جیاواز هەڵبژێریت و گوێ لە نموونەکەی بگریت.'
    }
  ];

  const currentVoiceObj = ADHAN_VOICES.find(v => v.id === notificationSettings.selectedDefaultVoice) || ADHAN_VOICES[0];
  const currentVoiceName = currentVoiceObj.nameKu;
  const currentCityName = selectedCity.nameKu;
  const currentLangLabel = lang === 'ckb' ? 'کوردی سۆرانی' : lang === 'ar' ? 'العربية' : 'English';

  const BackChevron = isRtl ? ChevronRight : ChevronLeft;
  const NextChevron = isRtl ? ChevronLeft : ChevronRight;

  const kurdishVoices = ADHAN_VOICES.filter(v => v.region === 'kurdish');
  const islamicVoices = ADHAN_VOICES.filter(v => v.region === 'islamic');

  return (
    <div className="w-full max-w-md mx-auto min-h-screen text-(--text-main) font-kurdish pb-28 relative">
      {toastMessage && (
        <div className="fixed top-6 inset-x-4 z-50 flex justify-center animate-fadeIn pointer-events-none">
          <div className="bg-[#132942] dark:bg-[#132942] border border-[#F2C94C]/40 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
            <Check className="w-4 h-4 text-[#F2C94C]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ============ MAIN SETTINGS MENU ============ */}
      {subScreen === null && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pt-2 px-1">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"
                style={{ backgroundColor: 'var(--bg-icon-tile)' }}
              >
                <Compass className="w-6 h-6 text-(--color-gold)" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-naskh tracking-tight text-(--text-main)">
                  ڕێکخستن
                </h1>
                <p className="text-xs text-(--text-muted)">
                  ڕێکخستنە هەمەلایەنەکانی ئەپی سیرات
                </p>
              </div>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-2xl bg-white/10 text-(--text-muted) hover:text-(--text-main) transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div 
            className="rounded-3xl border divide-y divide-(--border-theme) shadow-lg overflow-hidden"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-theme)' 
            }}
          >
            {/* ١. دەنگی بانگبێژ */}
            <button
              type="button"
              onClick={() => setSubScreen('adhan')}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <Volume2 className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    دەنگی بانگبێژ
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    {ADHAN_VOICES.length} بانگبێژی جیاواز
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span 
                  className="text-[11px] font-bold px-3 py-1 rounded-full text-(--color-gold) border border-(--color-gold)/20 truncate max-w-27.5"
                  style={{ backgroundColor: 'var(--color-gold-muted)' }}
                >
                  {currentVoiceName}
                </span>
                <NextChevron className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>

            {/* ٢. شوێن و شار */}
            <button
              type="button"
              onClick={() => setSubScreen('location')}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <MapPin className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    شوێن و شار
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    دیاریکردنی شار و نەخشە
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span 
                  className="text-[11px] font-bold px-3 py-1 rounded-full text-(--color-gold) border border-(--color-gold)/20"
                  style={{ backgroundColor: 'var(--color-gold-muted)' }}
                >
                  {currentCityName}
                </span>
                <NextChevron className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>

            {/* ٣. زمان */}
            <button
              type="button"
              onClick={() => setShowLangSheet(true)}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <Globe className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    زمان
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    کوردی، عەرەبی، ئینگلیزی
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span 
                  className="text-[11px] font-bold px-3 py-1 rounded-full text-(--color-gold) border border-(--color-gold)/20"
                  style={{ backgroundColor: 'var(--color-gold-muted)' }}
                >
                  {currentLangLabel}
                </span>
                <NextChevron className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>

            {/* ٤. ئاگادارکردنەوەکان */}
            <button
              type="button"
              onClick={() => setSubScreen('notifications')}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <Bell className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    ئاگادارکردنەوەکان
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    دەنگی بانگ و هۆشیارکەرەوەکان
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span 
                  className="text-[11px] font-bold px-3 py-1 rounded-full text-(--color-gold) border border-(--color-gold)/20"
                  style={{ backgroundColor: 'var(--color-gold-muted)' }}
                >
                  {notificationSettings.adhanSoundEnabled ? 'چالاکە' : 'ناچالاکە'}
                </span>
                <NextChevron className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>

            {/* ٥. پەیوەندی */}
            <button
              type="button"
              onClick={handleContactUs}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <Mail className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    پەیوەندی بە ئێمە
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    Alandidris0771@gmail.com
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <ExternalLink className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>

            {/* ٦. سیاسەتی تایبەتمەندی */}
            <button
              type="button"
              onClick={() => setSubScreen('privacy')}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <ShieldCheck className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    سیاسەتی تایبەتمەندی
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    پاراستنی زانیاری و شوێن
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <NextChevron className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>

            {/* ٧. مەرج و ڕێساکان */}
            <button
              type="button"
              onClick={() => setSubScreen('terms')}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <FileText className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    مەرج و ڕێساکانی بەکارهێنان
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    یاسا و مافەکانی ئەپەکە
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <NextChevron className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>

            {/* ٨. دەربارەی ئێمە */}
            <button
              type="button"
              onClick={() => setSubScreen('about')}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <Info className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    دەربارەی ئێمە
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    سیرات، دروستکەر و ئامانجەکان
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <NextChevron className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>

            {/* ٩. ڕێکخستنەکانی تر */}
            <button
              type="button"
              onClick={() => setSubScreen('additional')}
              className="w-full p-4 flex items-center justify-between gap-3 text-start transition-all duration-200 active:scale-[0.98] hover:bg-white/3 cursor-pointer min-h-16"
            >
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                >
                  <RotateCcw className="w-6 h-6 text-(--color-gold)" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-(--text-main) font-naskh">
                    ڕێکخستنەکانی تر
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    سڕینەوەی کاتی، هەڵسەنگاندن، پرسیارەکان
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <NextChevron className="w-4 h-4 text-(--text-muted)" />
              </div>
            </button>
          </div>

          <div className="text-center pt-6 pb-2 space-y-1">
            <p className="text-xs font-bold text-(--text-main) tracking-wide font-naskh">
              Sirat
            </p>
            <p className="text-[11px] font-mono font-semibold text-(--color-gold)">
              Version 1.0.0
            </p>
            <p className="text-[11px] text-(--text-muted)">
              Developed by Aland Idris Aziz
            </p>
            <p className="text-[10px] text-(--text-muted)/70 font-mono">
               2026 Sirat. All rights reserved.
            </p>
          </div>
        </div>
      )}

      {/* ============ SUB-SCREEN: دەنگی بانگبێژ (٢٠ بانگبێژ) ============ */}
      {subScreen === 'adhan' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-(--border-theme)">
            <button
              type="button"
              onClick={() => {
                soundEffects.stopAzan();
                setPlayingVoiceId(null);
                setSubScreen(null);
              }}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-(--text-main) transition-colors active:scale-95"
            >
              <BackChevron className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold font-naskh text-(--text-main)">
                دەنگی بانگبێژ
              </h2>
              <p className="text-[11px] text-(--text-muted)">
                {ADHAN_VOICES.length} بانگبێژی جیاواز بۆ هەڵبژاردن
              </p>
            </div>
          </div>

          {/* Master Toggle */}
          <div 
            className="p-4 rounded-3xl border flex items-center justify-between"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div>
              <span className="text-xs font-bold block text-(--text-main) font-naskh">
                چالاککردنی دەنگی بانگ لە کاتی نوێژ
              </span>
              <span className="text-[11px] text-(--text-muted)">
                خۆکارانە لە کاتی نوێژەکان دەنگی بانگ لێدەدات
              </span>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.adhanSoundEnabled}
              onChange={(e) => {
                setNotificationSettings(prev => ({ ...prev, adhanSoundEnabled: e.target.checked }));
                showToast(e.target.checked ? 'دەنگی بانگ چالاک کرا' : 'دەنگی بانگ بێدەنگ کرا');
              }}
              className="w-5 h-5 accent-(--color-gold) cursor-pointer"
            />
          </div>

          {/* Tabs: کوردی / ئیسلامی */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveVoiceTab('kurdish')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeVoiceTab === 'kurdish' ? 'shadow-sm' : ''
              }`}
              style={
                activeVoiceTab === 'kurdish'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
                  : { backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }
              }
            >
              <Mic2 className="w-3.5 h-3.5" />
              بانگی کوردی ({kurdishVoices.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveVoiceTab('islamic')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeVoiceTab === 'islamic' ? 'shadow-sm' : ''
              }`}
              style={
                activeVoiceTab === 'islamic'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
                  : { backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }
              }
            >
              <Music className="w-3.5 h-3.5" />
              بانگی ئیسلامی ({islamicVoices.length})
            </button>
          </div>

          {/* لیستی دەنگەکان */}
          <div className="space-y-2.5">
            {(activeVoiceTab === 'kurdish' ? kurdishVoices : islamicVoices).map((voice) => {
              const isSelected = notificationSettings.selectedDefaultVoice === voice.id;
              const isPlaying = playingVoiceId === voice.id;

              return (
                <div
                  key={voice.id}
                  className="p-4 rounded-3xl border transition-all duration-200 flex items-center justify-between gap-3 shadow-sm"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: isSelected ? 'var(--color-gold)' : 'var(--border-theme)'
                  }}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="text-[10px] font-bold text-(--color-gold) flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>سەرەکی</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-(--text-main) font-naskh truncate">
                      {voice.nameKu}
                    </h4>
                    <p className="text-[11px] text-(--text-muted) line-clamp-1">
                      {voice.descriptionKu}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleVoicePreview(voice.id)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                        isPlaying 
                          ? 'bg-(--color-gold) text-slate-950 animate-pulse shadow-md' 
                          : 'bg-white/10 hover:bg-white/15 text-(--text-main)'
                      }`}
                      title={isPlaying ? 'وەستاندن' : 'گوێگرتن'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ms-0.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectDefaultVoice(voice.id)}
                      className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-(--color-gold) text-slate-950 shadow-md'
                          : 'bg-white/10 hover:bg-white/15 text-(--text-main)'
                      }`}
                    >
                      {isSelected ? '✓' : 'هەڵبژاردن'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Per-Prayer Voices */}
          <div 
            className="p-4 rounded-3xl border space-y-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <span className="text-xs font-bold text-(--text-main) font-naskh block">
              دەنگی تایبەت بە هەر نوێژێک:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { key: 'fajr' as const, label: 'بەیانی (فەجر)' },
                { key: 'dhuhr' as const, label: 'نیوەڕۆ' },
                { key: 'asr' as const, label: 'عەسر' },
                { key: 'maghrib' as const, label: 'مەغریب' },
                { key: 'isha' as const, label: 'خەوتنان' },
              ].map((p) => (
                <div key={p.key} className="p-2.5 rounded-2xl bg-white/3 border border-(--border-theme) space-y-1">
                  <span className="text-[11px] font-bold text-(--color-gold) block">
                    {p.label}
                  </span>
                  <select
                    value={notificationSettings.prayerVoices[p.key] || 'abdulrahman'}
                    onChange={(e) => handleSelectPrayerVoice(p.key, e.target.value)}
                    className="w-full text-xs font-medium px-2 py-1.5 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none"
                  >
                    {ADHAN_VOICES.map((v) => (
                      <option key={v.id} value={v.id} className="text-black">
                        {v.nameKu}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ SUB-SCREEN: شوێن و شار ============ */}
      {subScreen === 'location' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-(--border-theme)">
            <button
              type="button"
              onClick={() => setSubScreen(null)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-(--text-main) transition-colors active:scale-95"
            >
              <BackChevron className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold font-naskh text-(--text-main)">
                شوێن و شار
              </h2>
              <p className="text-[11px] text-(--text-muted)">
                دیاریکردنی شاری سەرەکی و نەخشەی جی پی ئێس
              </p>
            </div>
          </div>

          <div 
            className="p-4 rounded-3xl border flex items-center justify-between"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div>
              <span className="text-xs font-bold block text-(--text-main) font-naskh">
                پیشاندانی نەخشە لەناو بەشی شوێن
              </span>
              <span className="text-[11px] text-(--text-muted)">
                چالاککردنی نەخشەی ڕاستەوخۆ بۆ دیاریکردنی شوێن
              </span>
            </div>
            <input
              type="checkbox"
              checked={showMapOnScreen}
              onChange={(e) => setShowMapOnScreen(e.target.checked)}
              className="w-5 h-5 accent-(--color-gold) cursor-pointer"
            />
          </div>

          {showMapOnScreen && (
            <div className="rounded-3xl overflow-hidden border border-(--border-theme)">
              <InteractiveMapPicker 
                selectedCity={selectedCity}
                onSelectCity={(city) => {
                  onSelectCity(city);
                  showToast(`شاری ${city.nameKu} هەڵبژێردرا`);
                }}
                lang={lang}
              />
            </div>
          )}

          <div className="space-y-2">
            <span className="text-xs font-bold text-(--text-muted) uppercase tracking-wider block px-1">
              شارەکانی کوردستان و عێراق:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {CITIES.map((city) => {
                const isSelected = selectedCity.id === city.id;
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => {
                      onSelectCity(city);
                      showToast(`شاری ${city.nameKu} هەڵبژێردرا ✓`);
                    }}
                    className={`p-3.5 rounded-2xl border text-start flex items-center justify-between transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'border-(--color-gold) bg-(--color-gold-muted) text-(--text-main)'
                        : 'border-(--border-theme) bg-(--bg-card) text-(--text-main) hover:bg-white/5'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="font-bold text-xs font-naskh block truncate">
                        {city.nameKu}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-(--color-gold) shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============ SUB-SCREEN: ئاگادارکردنەوەکان ============ */}
      {subScreen === 'notifications' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-(--border-theme)">
            <button
              type="button"
              onClick={() => setSubScreen(null)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-(--text-main) transition-colors active:scale-95"
            >
              <BackChevron className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold font-naskh text-(--text-main)">
                ئاگادارکردنەوەکان
              </h2>
              <p className="text-[11px] text-(--text-muted)">
                ڕێکخستنی دەنگی بانگی نوێژەکان و ئاگادارکردنەوە
              </p>
            </div>
          </div>

          <div 
            className="p-4 rounded-3xl border flex items-center justify-between"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div>
              <span className="text-xs font-bold block text-(--text-main) font-naskh">
                دەنگی بانگ لە کاتی نوێژ
              </span>
              <span className="text-[11px] text-(--text-muted)">
                پەخشکردنی خۆکار بە دەنگی بانگبێژی هەڵبژێردراو
              </span>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.adhanSoundEnabled}
              onChange={(e) => setNotificationSettings(prev => ({ ...prev, adhanSoundEnabled: e.target.checked }))}
              className="w-5 h-5 accent-(--color-gold) cursor-pointer"
            />
          </div>

          <div 
            className="p-4 rounded-3xl border space-y-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <span className="text-xs font-bold text-(--text-main) font-naskh block">
              ئاگادارکردنەوەی کاتی هەر نوێژێک:
            </span>

            <div className="space-y-2">
              {[
                { key: 'fajr' as const, label: 'نوێژی بەیانی (فەجر)' },
                { key: 'dhuhr' as const, label: 'نوێژی نیوەڕۆ' },
                { key: 'asr' as const, label: 'نوێژی عەسر' },
                { key: 'maghrib' as const, label: 'نوێژی ئێوارە' },
                { key: 'isha' as const, label: 'نوێژی خەوتنان' },
              ].map((p) => (
                <div key={p.key} className="flex items-center justify-between p-2.5 rounded-2xl bg-white/3 border border-(--border-theme)">
                  <span className="text-xs font-bold text-(--text-main) font-naskh">
                    {p.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={notificationSettings.prayers[p.key]}
                    onChange={(e) => {
                      const v = e.target.checked;
                      setNotificationSettings(prev => ({
                        ...prev,
                        prayers: { ...prev.prayers, [p.key]: v }
                      }));
                    }}
                    className="w-4 h-4 accent-(--color-gold) cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div 
            className="p-4 rounded-3xl border space-y-2"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold block text-(--text-main) font-naskh">
                  ئاگادارکردنەوە پێش کاتی بانگ
                </span>
                <span className="text-[11px] text-(--text-muted)">
                  بۆ ئامادەکاری دەستنوێژ و ڕۆیشتن بۆ مزگەوت
                </span>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.prePrayerAlert}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, prePrayerAlert: e.target.checked }))}
                className="w-5 h-5 accent-(--color-gold) cursor-pointer"
              />
            </div>

            {notificationSettings.prePrayerAlert && (
              <div className="pt-2 flex items-center gap-2">
                <span className="text-xs text-(--text-muted)">خولەک پێشتر:</span>
                <div className="flex items-center gap-1.5">
                  {[5, 10, 15, 20].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setNotificationSettings(prev => ({ ...prev, prePrayerMinutes: mins }))}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        notificationSettings.prePrayerMinutes === mins
                          ? 'bg-(--color-gold) text-slate-950 font-bold'
                          : 'bg-white/10 text-(--text-main)'
                      }`}
                    >
                      {mins} خ
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div 
            className="p-4 rounded-3xl border space-y-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-(--text-main) font-naskh">
                بیرخستنەوەی ڕۆژانەی قورئان
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.quranDailyReminder}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, quranDailyReminder: e.target.checked }))}
                className="w-4 h-4 accent-(--color-gold) cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-(--border-theme)">
              <span className="text-xs font-bold text-(--text-main) font-naskh">
                بیرخستنەوەی زیکری بەیانیان و ئێواران
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.adhkarReminder}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, adhkarReminder: e.target.checked }))}
                className="w-4 h-4 accent-(--color-gold) cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-(--border-theme)">
              <span className="text-xs font-bold text-(--text-main) font-naskh">
                بیرخستنەوەی ڕۆژوو (پارشێو و بەربانگ)
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.fastingReminder}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, fastingReminder: e.target.checked }))}
                className="w-4 h-4 accent-(--color-gold) cursor-pointer"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              const ok = await triggerNotification('ئاگادارکردنەوەی ئەپی سیرات', 'کاتی بانگ و ئاگادارکردنەوەکان بە سەرکەوتوویی کار دەکەن.');
              if (ok) {
                showToast('ئاگادارکردنەوە بە سەرکەوتوویی نێردرا ✓');
              } else {
                showToast('مۆڵەتی ئاگادارکردنەوە لە وێبگەڕ ڕاگیراوە');
              }
            }}
            className="w-full py-3.5 rounded-2xl bg-(--color-gold) text-slate-950 font-bold text-xs shadow-md transition-all active:scale-[0.98] hover:opacity-90 cursor-pointer"
          >
            ناردنی ئاگادارکردنەوە بۆ دڵنیابوونەوە
          </button>
        </div>
      )}

      {/* ============ SUB-SCREEN: سیاسەتی تایبەتمەندی ============ */}
      {subScreen === 'privacy' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-(--border-theme)">
            <button
              type="button"
              onClick={() => setSubScreen(null)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-(--text-main) transition-colors active:scale-95"
            >
              <BackChevron className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold font-naskh text-(--text-main)">
                سیاسەتی تایبەتمەندی
              </h2>
              <p className="text-[11px] text-(--text-muted)">
                پاراستنی زانیاری و مافی بەکارهێنەران
              </p>
            </div>
          </div>

          <div 
            className="p-5 rounded-3xl border space-y-4 text-xs leading-relaxed"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <p className="text-(--color-gold) font-semibold">
              پاراستنی تایبەتمەندی بەکارهێنەر
            </p>

            <p className="text-(--text-muted)">
              ئەپلیکەیشنی <strong className="text-(--color-gold)">Sirat</strong> بۆ خزمەتکردنی موسڵمانان و ئاسانکردنی بەکارهێنانی خزمەتگوزارییە ئایینییەکان، وەک خوێندنەوەی قورئانی پیرۆز و زانینی کاتەکانی نوێژ و بانگ، دروست کراوە.
            </p>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                زانیارییەکانی بەکارهێنەر
              </h3>
              <p className="text-(--text-muted)">
                ئەپەکە بۆ کارکردنی خزمەتگوزارییە سەرەکییەکانی خۆی تەنها پێویستی بە زانیاریی شوێنی بەکارهێنەر هەیە. هیچ زانیارییەکی کەسیی تری وەک ناو، ژمارەی تەلەفۆن یان ئیمەیڵ داوا ناکات.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                بەکارهێنانی شوێن
              </h3>
              <p className="text-(--text-muted)">
                زانیاریی شوێن بۆ دیاریکردنی کاتەکانی ڕاستی پێنج نوێژ و گونجاندنی خزمەتگوزارییە ئایینییەکان لەگەڵ شوێنی بەکارهێنەر بەکاردەهێنرێت. دەستگەیشتن بە شوێن بە ڕەزامەندی بەکارهێنەرەوە دەبێت.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                پاراستنی تایبەتمەندی
              </h3>
              <p className="text-(--text-muted)">
                ئەپەکە پابەندە بە ڕێزگرتن لە تایبەتمەندی بەکارهێنەر و بەکارهێنانی زانیاریی شوێن تەنها بۆ ئەو مەبەستەی کە بۆی پێویستە.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                هاوبەشکردنی زانیارییەکان
              </h3>
              <p className="text-(--text-muted)">
                ئەپەکە زانیاریی کەسییەکان کۆناکاتەوە و بۆ مەبەستی بازرگانی نایفرۆشێت. زانیاریی شوێنیش تەنها بۆ دابینکردنی خزمەتگوزارییە ئایینییەکانی ئەپ بەکاردەهێنرێت.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                مۆڵەتی شوێن
              </h3>
              <p className="text-(--text-muted)">
                بەکارهێنەر دەتوانێت ڕێگە بە ئەپەکە بدات بۆ دەستگەیشتن بە شوێنی خۆی یان ئەو مۆڵەتە ڕەت بکاتەوە. لە حاڵەتی ڕەتکردنەوەی مۆڵەتی شوێن، ڕەنگە دیاریکردنی وردی کاتەکانی نوێژ بەپێی شوێنی بەکارهێنەر سنووردار بێت.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                گۆڕانکاری لە سیاسەت
              </h3>
              <p className="text-(--text-muted)">
                ئەگەر گۆڕانکارییەک لە سیاسەتی تایبەتمەندی ئەپەکەدا دروست بکرێت، وەشانی نوێی سیاسەتەکە لە ئەپەکەدا بڵاودەکرێتەوە.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                پەیوەندی
              </h3>
              <p className="text-(--text-muted)">
                بۆ پرسیار و داواکارییەکان دەربارەی تایبەتمەندی و پاراستنی زانیارییەکان، دەتوانیت لە ڕێگەی ئیمەیڵی خوارەوە پەیوەندی بکەیت:
              </p>
              <a 
                href="mailto:Alandidris0771@gmail.com" 
                className="font-mono font-bold text-(--color-gold) underline inline-block pt-1"
              >
                Alandidris0771@gmail.com
              </a>
            </div>

            <div className="pt-3 border-t border-(--border-theme) space-y-1 text-[11px]">
              <p className="text-(--text-muted)">
                ناوی ئەپ: <strong className="text-(--color-gold)">Sirat</strong>
              </p>
              <p className="text-(--text-muted)">
                گەشەپێدەر: <strong className="text-(--color-gold)">ئەلەند ایدریس عزیز</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============ SUB-SCREEN: مەرج و ڕێساکانی بەکارهێنان ============ */}
      {subScreen === 'terms' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-(--border-theme)">
            <button
              type="button"
              onClick={() => setSubScreen(null)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-(--text-main) transition-colors active:scale-95"
            >
              <BackChevron className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold font-naskh text-(--text-main)">
                مەرج و ڕێساکانی بەکارهێنان
              </h2>
              <p className="text-[11px] text-(--text-muted)">
                مەرجەکانی بەکارهێنانی خزمەتگوزارییەکان
              </p>
            </div>
          </div>

          <div 
            className="p-5 rounded-3xl border space-y-4 text-xs leading-relaxed"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <p className="text-(--color-gold) font-semibold">
              بەخێربێیت بۆ ئەپی Sirat. بە بەکارهێنانی ئەم ئەپە، ڕەزامەندی خۆت لەسەر مەرج و ڕێساکانی خوارەوە دەردەبڕیت. تکایە پێش بەکارهێنان، ئەم مەرجانە بە وردی بخوێنەرەوە.
            </p>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                ١. مەبەست و خزمەتگوزارییەکان
              </h3>
              <p className="text-(--text-muted)">
                ئەپی Sirat بۆ خزمەتکردنی موسڵمانان و ئاسانکاری لە بەجێهێنانی ئەرکە ئایینییەکان دروست کراوە. ئامانجی ئەپەکە دابینکردنی زانیاری و خزمەتگوزارییە ئایینییەکانە بۆ بەکارهێنەران.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                ٢. بەکارهێنانی خزمەتگوزارییەکان
              </h3>
              <p className="text-(--text-muted)">
                بەکارهێنەر پابەندە بە شێوەیەکی گونجاو و بەرپرسانە سوود لە خزمەتگوزارییەکانی ئەپەکە وەربگرێت و ڕێز لە بەها و ڕێنماییە ئیسلامییەکان بگرێت.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                ٣. وردی کاتەکانی نوێژ
              </h3>
              <p className="text-(--text-muted)">
                کاتەکانی نوێژ بەپێی زانیارییە جوگرافیاییەکان و شێوازی حیسابکردنی هەڵبژێردراو دیاری دەکرێن. بەهۆی جیاوازیی شوێن و شێوازی حیسابکردن، ڕەنگە کاتەکان لەگەڵ هەندێک سەرچاوەی تر جیاوازییان هەبێت. بۆ دڵنیایی زیاتر، باشترە بەراورد لەگەڵ کاتەکانی نوێژی مزگەوتی ناوخۆیی بکرێت.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                ٤. مافی خاوەندارێتیی فیکری
              </h3>
              <p className="text-(--text-muted)">
                ناو، ناسنامە و دیزاینی تایبەت بە ئەپی Sirat و ئەو ناوەڕۆک و بەرهەمانەی مافی خاوەندارێتییان بۆ گەشەپێدەر پارێزراوە، نابێت بەبێ مۆڵەتی پێویست کۆپی بکرێن، بڵاو بکرێنەوە یان بەکاربهێنرێن.
              </p>
              <p className="text-(--text-main) font-semibold pt-1">
                گەشەپێدەر: ئەلەند ئیدریس عەزیز
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                ٥. گۆڕانکاری لە مەرجەکان
              </h3>
              <p className="text-(--text-muted)">
                مافی گەشەپێدەر پارێزراوە بۆ نوێکردنەوە یان گۆڕینی خزمەتگوزارییەکان و مەرج و ڕێساکانی بەکارهێنان، بە مەبەستی باشترکردنی ئەزموونی بەکارهێنەر و چاکسازیی ئەپەکە.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/2 border border-(--border-theme) space-y-2">
              <h3 className="font-bold text-sm text-(--color-gold) font-naskh">
                ٦. ڕەزامەندی بەکارهێنەر
              </h3>
              <p className="text-(--text-muted)">
                بە بەردەوامبوون لە بەکارهێنانی ئەپی Sirat، بەکارهێنەر ڕەزامەندی خۆی لەسەر ئەم مەرج و ڕێسایانە دەردەبڕێت.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============ SUB-SCREEN: دەربارەی ئێمە ============ */}
      {subScreen === 'about' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-(--border-theme)">
            <button
              type="button"
              onClick={() => setSubScreen(null)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-(--text-main) transition-colors active:scale-95"
            >
              <BackChevron className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold font-naskh text-(--text-main)">
                دەربارەی ئێمە
              </h2>
              <p className="text-[11px] text-(--text-muted)">
                ناساندن، ئامانجەکان و پەیام
              </p>
            </div>
          </div>

          <div 
            className="p-6 rounded-3xl border space-y-5 text-xs leading-relaxed"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div className="space-y-3">
              <h3 className="text-base font-bold text-(--color-gold) font-naskh text-center">
                Sirat — ڕێگایەک بەرەو ئارامی و نزیکی لە خودا
              </h3>
              <p className="text-(--text-main)">
                Sirat ئەپێکی ئایینییە کە بە مەبەستی ئاسانکردنی دەستگەیشتن بە خزمەتگوزارییە ئایینییەکان و یارمەتیدانی موسڵمانان بۆ ڕێکخستنی ژیانی ڕۆژانەیان بەپێی کاتەکانی نوێژ و کردارە ئایینییەکان دروست کراوە.
              </p>
              <p className="text-(--text-main)">
                ئەم ئەپە لەلایەن <strong className="text-(--color-gold)">ئەلەند ایدریس عزیز</strong> ـەوە گەشەی پێدراوە، بە ئامانجی بەکارهێنانی تەکنەلۆژیا بۆ ئاسانکردنی کردارە ئایینییەکان و پەرەپێدانی پەیوەندیی ڕۆحی.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-(--border-theme)">
              <h4 className="font-bold text-sm text-(--color-gold) font-naskh">
                ئامانجەکانی Sirat
              </h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/2 border border-(--border-theme)">
                  <span className="text-(--color-gold) font-bold shrink-0">•</span>
                  <span className="text-(--text-muted)">
                    <strong className="text-(--text-main)">کاتەکانی نوێژ:</strong> ئاسانکردنی زانینی کاتی پێنج نوێژەکە بەپێی شوێنی بەکارهێنەر.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/2 border border-(--border-theme)">
                  <span className="text-(--color-gold) font-bold shrink-0">•</span>
                  <span className="text-(--text-muted)">
                    <strong className="text-(--text-main)">قورئانی پیرۆز:</strong> ئاسانکردنی دەستگەیشتن بە قورئان و خوێندنەوەی ئایەتە پیرۆزەکان.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/2 border border-(--border-theme)">
                  <span className="text-(--color-gold) font-bold shrink-0">•</span>
                  <span className="text-(--text-muted)">
                    <strong className="text-(--text-main)">زیکر و دوعاکان:</strong> دابینکردنی دەرفەتی خوێندنەوەی زیکر و دوعاکانی ڕۆژانە.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/2 border border-(--border-theme)">
                  <span className="text-(--color-gold) font-bold shrink-0">•</span>
                  <span className="text-(--text-muted)">
                    <strong className="text-(--text-main)">ئاگادارکردنەوە ئایینییەکان:</strong> یارمەتیدانی بەکارهێنەران بۆ بەبیرهێنانەوەی کاتەکانی نوێژ و کردارە ئایینییەکان.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/2 border border-(--border-theme)">
                  <span className="text-(--color-gold) font-bold shrink-0">•</span>
                  <span className="text-(--text-muted)">
                    <strong className="text-(--text-main)">گونجاندن لەگەڵ شوێن:</strong> دابینکردنی ئەزموونێکی گونجاو بۆ بەکارهێنەران لە شار و ناوچە جیاوازەکان.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/2 border border-(--border-theme)">
                  <span className="text-(--color-gold) font-bold shrink-0">•</span>
                  <span className="text-(--text-muted)">
                    <strong className="text-(--text-main)">پەرەپێدانی ژیانی ڕۆحی:</strong> هاندانی بەکارهێنەران بۆ زیاتر گرنگیدان بە نوێژ، خوێندنەوەی قورئان و کردارە ئایینییەکان.
                  </span>
                </li>
              </ul>
            </div>

            <div 
              className="p-4 rounded-2xl border space-y-2"
              style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'var(--color-gold)' }}
            >
              <h4 className="font-bold text-xs text-(--color-gold) font-naskh">
                پەیامی ئێمە
              </h4>
              <p className="italic text-(--text-main)">
                «با تەکنەلۆژیا ببێتە هۆکارێک بۆ نزیکبوونەوە لە خودا، ڕێکخستنی کاتی نوێژ و گرنگیدان بە ژیانی ڕۆحی.»
              </p>
            </div>

            <div className="pt-3 border-t border-(--border-theme) space-y-2">
              <h4 className="font-bold text-sm text-(--color-gold) font-naskh">
                زانیاریی پەیوەندی
              </h4>
              <div className="space-y-1.5 text-[11px]">
                <p className="text-(--text-muted)">
                  دروستکەر و گەشەپێدەر: <strong className="text-(--color-gold)">Aland Idris Aziz</strong>
                </p>
                <p className="text-(--text-muted)">
                  ئیمەیڵ:{' '}
                  <a 
                    href="mailto:Alandidris0771@gmail.com" 
                    className="font-mono font-bold text-(--color-gold) underline"
                  >
                    Alandidris0771@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ SUB-SCREEN: ڕێکخستنەکانی تر ============ */}
      {subScreen === 'additional' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-(--border-theme)">
            <button
              type="button"
              onClick={() => setSubScreen(null)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-(--text-main) transition-colors active:scale-95"
            >
              <BackChevron className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold font-naskh text-(--text-main)">
                ڕێکخستنەکانی تر
              </h2>
              <p className="text-[11px] text-(--text-muted)">
                سڕینەوەی فایلە کاتییەکان، هەڵسەنگاندن و پرسیارە باوەکان
              </p>
            </div>
          </div>

          <div 
            className="rounded-3xl border divide-y divide-(--border-theme) shadow-lg overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <button
              type="button"
              onClick={() => setShowClearCacheConfirm(true)}
              className="w-full p-4 flex items-center justify-between gap-3 text-start hover:bg-white/3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/5 text-(--text-muted) flex items-center justify-center">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-(--text-main) font-naskh">
                    پاککردنەوەی فایلە کاتییەکان
                  </span>
                  <span className="text-[10px] text-(--text-muted)">
                    سڕینەوەی سوورەت و زانیارییە کاتییە پاشەکەوتکراوەکان
                  </span>
                </div>
              </div>
              <NextChevron className="w-4 h-4 text-(--text-muted)" />
            </button>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="w-full p-4 flex items-center justify-between gap-3 text-start hover:bg-white/3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-red-400 font-naskh">
                    گەڕاندنەوە بۆ دۆخی بنەڕەتی
                  </span>
                  <span className="text-[10px] text-(--text-muted)">
                    گەڕاندنەوەی سەرجەم ڕێکخستنەکان بۆ سەرەتایی
                  </span>
                </div>
              </div>
              <NextChevron className="w-4 h-4 text-(--text-muted)" />
            </button>

            <button
              type="button"
              onClick={() => setShowRatingModal(true)}
              className="w-full p-4 flex items-center justify-between gap-3 text-start hover:bg-white/3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-(--color-gold-muted) text-(--color-gold) flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-(--text-main) font-naskh">
                    هەڵسەنگاندنی ئەپەکە
                  </span>
                  <span className="text-[10px] text-(--text-muted)">
                    پێدانی ئەستێرە و دەربڕینی ڕای خۆت
                  </span>
                </div>
              </div>
              <NextChevron className="w-4 h-4 text-(--text-muted)" />
            </button>

            <button
              type="button"
              onClick={handleShareApp}
              className="w-full p-4 flex items-center justify-between gap-3 text-start hover:bg-white/3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-(--color-gold-muted) text-(--color-gold) flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-(--text-main) font-naskh">
                    هاوبەشکردنی ئەپەکە
                  </span>
                  <span className="text-[10px] text-(--text-muted)">
                    ناردنی لینکی ئەپی سیرات بۆ هاوڕێیان
                  </span>
                </div>
              </div>
              <NextChevron className="w-4 h-4 text-(--text-muted)" />
            </button>

            <button
              type="button"
              onClick={handleContactUs}
              className="w-full p-4 flex items-center justify-between gap-3 text-start hover:bg-white/3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-(--color-gold-muted) text-(--color-gold) flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-(--text-main) font-naskh">
                    ناردنی پێشنیار
                  </span>
                  <span className="text-[10px] text-(--text-muted)">
                    Alandidris0771@gmail.com
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-(--text-muted)" />
            </button>

            <button
              type="button"
              onClick={() => setSubScreen('permissions')}
              className="w-full p-4 flex items-center justify-between gap-3 text-start hover:bg-white/3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-(--color-gold-muted) text-(--color-gold) flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-(--text-main) font-naskh">
                    مۆڵەتەکانی ئەپ
                  </span>
                  <span className="text-[10px] text-(--text-muted)">
                    شوێن، ئاگادارکردنەوە و ڕێکخستنی ئامێر
                  </span>
                </div>
              </div>
              <NextChevron className="w-4 h-4 text-(--text-muted)" />
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-(--text-muted) uppercase tracking-wider block px-1">
              ڕێنەمایی و پرسیارە باوەکان
            </span>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border overflow-hidden transition-all"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3.5 text-start flex items-center justify-between gap-2 font-bold text-xs font-naskh text-(--text-main)"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-(--text-muted) transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-[11px] leading-relaxed text-(--text-muted) border-t border-(--border-theme)/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============ SUB-SCREEN: مۆڵەتەکان ============ */}
      {subScreen === 'permissions' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-(--border-theme)">
            <button
              type="button"
              onClick={() => setSubScreen('additional')}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-(--text-main) transition-colors active:scale-95"
            >
              <BackChevron className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold font-naskh text-(--text-main)">
                مۆڵەتەکانی ئەپ
              </h2>
              <p className="text-[11px] text-(--text-muted)">
                چۆنیەتی بەڕێوەبردنی مۆڵەتەکان لە ئامێردا
              </p>
            </div>
          </div>

          <div 
            className="p-5 rounded-3xl border space-y-4 text-xs leading-relaxed"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-(--color-gold) font-naskh flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>مۆڵەتی شوێن:</span>
              </h4>
              <p className="text-(--text-muted)">
                بۆ دۆزینەوەی شاری تۆ و حیسابکردنی خۆکاری کاتی نوێژەکان و ئاراستەی قیبلە بەکاردێت. ئەگەر بە دەستی شارەکەت هەڵبژێریت پێویست بەم مۆڵەتە ناکات.
              </p>
            </div>

            <div className="space-y-1 pt-3 border-t border-(--border-theme)">
              <h4 className="font-bold text-sm text-(--color-gold) font-naskh flex items-center gap-1.5">
                <Bell className="w-4 h-4" />
                <span>مۆڵەتی ئاگادارکردنەوە:</span>
              </h4>
              <p className="text-(--text-muted)">
                بۆ پەخشکردنی دەنگی بانگ و پێدانی هۆشیارکەرەوە لە کاتی نوێژ و قورئانخوێندندا لە وێبگەڕ یان مۆبایلی بەکارهێنەر بەکاردێت.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/3 border border-(--border-theme) text-[11px] text-(--text-muted)">
               بۆ گۆڕینی مۆڵەتەکان، دەتوانیت لە ڕێکخستنەکانی مۆبایلەکەت بچیتە بەشی Applications &gt; Sirat و مۆڵەتەکان چالاک یان ناچالاک بکەیت.
            </div>
          </div>
        </div>
      )}

      {/* ============ BOTTOM SHEET: زمانی ئەپ ============ */}
      {showLangSheet && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
          onClick={() => setShowLangSheet(false)}
        >
          <div 
            className="w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 border shadow-2xl animate-slideUp"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto sm:hidden" />

            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base font-naskh text-(--text-main)">
                هەڵبژاردنی زمانی ئەپ
              </h3>
              <button 
                type="button" 
                onClick={() => setShowLangSheet(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-(--text-muted)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { id: 'ckb', label: 'کوردی سۆرانی' },
                { id: 'ar', label: 'العربية' },
                { id: 'en', label: 'English' }
              ].map((item) => {
                const isSelected = lang === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setLang(item.id as Language);
                      setShowLangSheet(false);
                      showToast('زمانەکە گۆڕدرا ✓');
                    }}
                    className={`w-full p-4 rounded-2xl border text-start flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-(--color-gold) bg-(--color-gold-muted) text-(--text-main)'
                        : 'border-(--border-theme) bg-white/3 hover:bg-white/5 text-(--text-main)'
                    }`}
                  >
                    <span className="font-bold text-sm font-naskh">{item.label}</span>
                    {isSelected && <Check className="w-5 h-5 text-(--color-gold)" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============ MODAL: گەڕاندنەوە بۆ دۆخی بنەڕەتی ============ */}
      {showResetConfirm && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowResetConfirm(false)}
        >
          <div 
            className="w-full max-w-sm rounded-3xl p-6 space-y-4 border text-center shadow-2xl animate-scaleUp"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base font-naskh text-(--text-main)">
                گەڕاندنەوە بۆ دۆخی بنەڕەتی؟
              </h3>
              <p className="text-xs text-(--text-muted)">
                ئایا دڵنیایت لە گەڕاندنەوەی سەرجەم ڕێکخستنەکان بۆ باری سەرەتایی؟
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-bold text-(--text-main)"
              >
                پەشیمانبوونەوە
              </button>
              <button
                type="button"
                onClick={executeResetSettings}
                className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-xs font-bold text-white shadow-lg"
              >
                بەڵێ، بگەڕێنەرەوە
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ MODAL: پاککردنەوەی فایلە کاتییەکان ============ */}
      {showClearCacheConfirm && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowClearCacheConfirm(false)}
        >
          <div 
            className="w-full max-w-sm rounded-3xl p-6 space-y-4 border text-center shadow-2xl animate-scaleUp"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-(--color-gold-muted) text-(--color-gold) flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base font-naskh text-(--text-main)">
                پاککردنەوەی فایلە کاتییەکان؟
              </h3>
              <p className="text-xs text-(--text-muted)">
                ئەم کردارە فایلە کاتییە پاشەکەوتکراوەکان سڕینەوە دەکات بۆ خێراکردنی ئەپەکە.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearCacheConfirm(false)}
                className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-bold text-(--text-main)"
              >
                پەشیمانبوونەوە
              </button>
              <button
                type="button"
                onClick={executeClearCache}
                className="flex-1 py-3 rounded-2xl bg-(--color-gold) text-black text-xs font-bold shadow-lg"
              >
                پاککردنەوە
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ MODAL: هەڵسەنگاندنی ئەپەکە ============ */}
      {showRatingModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowRatingModal(false)}
        >
          <div 
            className="w-full max-w-sm rounded-3xl p-6 space-y-4 border text-center shadow-2xl animate-scaleUp"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-(--color-gold-muted) text-(--color-gold) flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base font-naskh text-(--text-main)">
                هەڵسەنگاندنی ئەپی سیرات
              </h3>
              <p className="text-xs text-(--text-muted)">
                ڕای خۆت دەرببڕە بۆ باشترکردنی ئەپەکە
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingStars(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star 
                    className={`w-7 h-7 ${
                      star <= ratingStars ? 'text-(--color-gold) fill-current' : 'text-gray-500'
                    }`} 
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRatingModal(false)}
                className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-bold text-(--text-main)"
              >
                داخستن
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRatingModal(false);
                  showToast('سوپاس بۆ هەڵسەنگاندنەکەت! ❤️');
                }}
                className="flex-1 py-3 rounded-2xl bg-(--color-gold) text-black text-xs font-bold shadow-lg"
              >
                ناردنی ڕا
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};