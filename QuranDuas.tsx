/**
 * بەشی دوعا قورئانییەکان و دوعا و پاڕانەوە هەڵبژێردراوەکان.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  RotateCcw, 
  Copy, 
  Check, 
  Hand, 
  CheckCircle2, 
  X,
  Volume2,
  VolumeX,
  Share2,
  Search,
  Columns2,
  Rows3,
  BookmarkCheck,
  Flame,
  UserCheck,
  Sun,
  Moon,
  Home,
  LogOut,
  LogIn,
  ShoppingBag,
  Plane,
  Utensils,
  Bed,
  Sunrise,
  Droplets,
  MapPin
} from 'lucide-react';
import { Language, QuranDuaItem } from '../types';
import { translations } from '../data/translations';
import { QURAN_DUAS_DATA } from '../data/quranDuasData';
import { soundEffects } from '../services/soundEffects';

// ============= جۆری دوعای ڕۆژانە =============
interface DailyDuaItem {
  id: number;
  category: DailyCategory;
  title: string;
  occasion: string;
  arabic: string;
  kurdish: string;
  virtue?: string;
  reference?: string;
}

type DailyCategory = 
  | 'after-prayer' 
  | 'exit-home' 
  | 'enter-home' 
  | 'market' 
  | 'travel' 
  | 'eating' 
  | 'sleeping' 
  | 'waking' 
  | 'toilet' 
  | 'wudu' 
  | 'mosque' 
  | 'general';

// ============= داتای دوعاکانی ڕۆژانە =============
const DAILY_DUAS_DATA: DailyDuaItem[] = [
  // ===== دوعای دوای نوێژ =====
  {
    id: 101,
    category: 'after-prayer',
    title: 'دوعای دوای نوێژ - ئەستەغفیروڵا',
    occasion: 'دوای هەر نوێژێکی فەرز',
    arabic: 'أَسْتَغْفِرُ اللَّهَ (٣ جار) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    kurdish: 'داوای لێخۆشبوون لە خودا دەکەم (٣ جار). خودایە تۆ سەلامیت و ئارامی لێیە، پیرۆزی و بەرەکەت لە تۆیە ئەی خاوەنی مەزنی و ڕێز.',
    virtue: 'دوای هەر نوێژێکی فەرز دەخوێنرێت و مەغفیرەتی گوناهەکان دەبەخشێت',
    reference: 'صحیح مسلم'
  },
  {
    id: 102,
    category: 'after-prayer',
    title: 'دوعای دوای نوێژ - ئایەتول کورسی',
    occasion: 'دوای هەر نوێژێکی فەرز',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    kurdish: 'خودا هیچ پەرستراوێک نییە جگە لەو، ئەو ژیارە و ڕاگرە، خەو و خەواڵوویی لێی ناگرێت.',
    virtue: 'هەرکەسێک ئایەتول کورسی دوای هەر نوێژێک بخوێنێت، تەنها مەرگ دەیەوێت',
    reference: 'سونەن نەسائی'
  },
  {
    id: 103,
    category: 'after-prayer',
    title: 'تەسبیحاتی دوای نوێژ',
    occasion: 'دوای هەر نوێژێکی فەرز',
    arabic: 'سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٣) لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    kurdish: 'پاکی بۆ خودا (٣٣ جار)، سوپاس بۆ خودا (٣٣ جار)، خودا گەورەیە (٣٣ جار)، هیچ پەرستراوێک نییە جگە لە خودا تەنها ئەو، هیچ هاوبەشی نییە.',
    virtue: 'گوناهەکانی دەبەخشێت تەنانەت ئەگەر وەک کەفی دەریاش بن',
    reference: 'صحیح مسلم'
  },

  // ===== دوعای دەرچوون لە ماڵ =====
  {
    id: 110,
    category: 'exit-home',
    title: 'دوعای چوونە دەرەوە لە ماڵ',
    occasion: 'کاتی چوونە دەرەوە لە ماڵ',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    kurdish: 'بە ناوی خودا، پشتم بە خودا بەست، و هیچ هێز و توانایەک نییە جگە بە خودا.',
    virtue: 'دەگوترێت: ڕێنمایی کرا، پارێزرا، و شەیتان لێی دوور کەوتەوە',
    reference: 'سونەن ئەبوداود'
  },

  // ===== دوعای چوونە ماڵ =====
  {
    id: 111,
    category: 'enter-home',
    title: 'دوعای چوونە ژوورەوە بۆ ماڵ',
    occasion: 'کاتی چوونە ژوورەوە',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    kurdish: 'بە ناوی خودا چووینە ژوورەوە، و بە ناوی خودا دەرچووین، و پشتمان بە پەروەردگارمان بەست.',
    virtue: 'شەیتان بۆ ئەو ماڵە نایەت ئەگەر بە ناوی خودا بێت',
    reference: 'سونەن ئەبوداود'
  },

  // ===== دوعای چوونە بازار =====
  {
    id: 112,
    category: 'market',
    title: 'دوعای چوونە بازار',
    occasion: 'کاتی چوونە بازار',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    kurdish: 'هیچ پەرستراوێک نییە جگە لە خودا، تەنها ئەو، هیچ هاوبەشی نییە، موڵک هی ئەوە و سوپاس بۆ ئەو، ژیان دەبەخشێت و دەمرێنێت، ئەو ژیارە و نامرێت، خێر بە دەستی ئەوەیە و ئەو بەسەر هەموو شتێکدا بەتوانایە.',
    virtue: 'هەرکەسێک ئەم دوعایە لە بازاردا بخوێنێت، خودا ملیۆن چاکەی بۆ دەنووسێت',
    reference: 'سونەن تیرمیزی'
  },

  // ===== دوعای گەشت =====
  {
    id: 113,
    category: 'travel',
    title: 'دوعای گەشت',
    occasion: 'کاتی گەشتکردن',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    kurdish: 'پاکی بۆ ئەو زاتەی ئەمەی بۆ ئێمە ڕامهێناوە و ئێمە توانای ئەوەمان نەبوو، و بەڕاستی ئێمە بۆ لای پەروەردگارمان دەگەڕێینەوە.',
    virtue: 'پاراستن لە کاتی گەشتدا',
    reference: 'صحیح مسلم'
  },

  // ===== دوعای خواردن =====
  {
    id: 114,
    category: 'eating',
    title: 'دوعای پێش خواردن',
    occasion: 'کاتی دەستپێکردنی خواردن',
    arabic: 'بِسْمِ اللَّهِ',
    kurdish: 'بە ناوی خودا.',
    virtue: 'شەیتان شەریک نابێت لە خواردنەکەدا',
    reference: 'سونەن تیرمیزی'
  },
  {
    id: 115,
    category: 'eating',
    title: 'دوعای دوای خواردن',
    occasion: 'دوای تەواوکردنی خواردن',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    kurdish: 'سوپاس بۆ ئەو خودایەی کە خواردووی و خواردنەوەی پێ بەخشین و کردینی بە موسڵمان.',
    virtue: 'وەڵامدانەوەی خواردن',
    reference: 'سونەن تیرمیزی'
  },

  // ===== دوعای خەو =====
  {
    id: 116,
    category: 'sleeping',
    title: 'دوعای پێش خەو',
    occasion: 'کاتی چوونە سەر جێگا',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    kurdish: 'بە ناوی تۆ خودایە دەمرم و ژیان دەکەم.',
    virtue: 'پاراستن لە کاتی خەودا',
    reference: 'صحیح بخاری'
  },

  // ===== دوعای هەڵسان =====
  {
    id: 117,
    category: 'waking',
    title: 'دوعای هەڵسان لە خەو',
    occasion: 'کاتی هەڵسان',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    kurdish: 'سوپاس بۆ ئەو خودایەی کە ژیانی پێ بەخشین دوای ئەوەی کە مراندینی و بۆ لای ئەو دەگەڕێینەوە.',
    virtue: 'یادکردنی خودا لە سەرەتای ڕۆژەکە',
    reference: 'صحیح بخاری'
  },

  // ===== دوعای تەوالێت =====
  {
    id: 118,
    category: 'toilet',
    title: 'دوعای چوونە تەوالێت',
    occasion: 'کاتی چوونە ژوورەوەی تەوالێت',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    kurdish: 'خودایە من پەنا دەگرم پێت لە شەیتانە نێر و مێیەکان.',
    virtue: 'پاراستن لە شەیتان',
    reference: 'صحیح بخاری'
  },
  {
    id: 119,
    category: 'toilet',
    title: 'دوعای دەرچوون لە تەوالێت',
    occasion: 'کاتی دەرچوون لە تەوالێت',
    arabic: 'غُفْرَانَكَ',
    kurdish: 'داوای لێخۆشبوونت دەکەم.',
    virtue: 'داواکردنی مەغفیرەت',
    reference: 'سونەن ئەبوداود'
  },

  // ===== دوعای دەستنوێژ =====
  {
    id: 120,
    category: 'wudu',
    title: 'دوعای دوای دەستنوێژ',
    occasion: 'دوای تەواوکردنی دەستنوێژ',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    kurdish: 'شایەتی دەدەم کە هیچ پەرستراوێک نییە جگە لە خودا، و شایەتی دەدەم کە موحەممەد بەندە و نێردراوی ئەوە. خودایە من لە تەوبەکاران و پاکانم دابنێ.',
    virtue: 'دەرگاکانی بەهەشت بۆ دەکرێنەوە',
    reference: 'صحیح مسلم'
  },

  // ===== دوعای مزگەوت =====
  {
    id: 121,
    category: 'mosque',
    title: 'دوعای چوونە مزگەوت',
    occasion: 'کاتی ڕۆیشتن بۆ مزگەوت',
    arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ لِي نُورًا',
    kurdish: 'خودایە لە دڵم ڕووناکی دابنێ، و لە زمانم ڕووناکی، و بۆ من ڕووناکی دابنێ.',
    virtue: 'ڕووناکی لە ڕۆژی دواییدا',
    reference: 'صحیح بخاری'
  },

  // ===== دوعای گشتی =====
  {
    id: 122,
    category: 'general',
    title: 'دوعای خێر و بەرەکەت',
    occasion: 'بۆ هەموو کاتێک',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَىٰ وَالتُّقَىٰ وَالْعَفَافَ وَالْغِنَىٰ',
    kurdish: 'خودایە من داوای ڕێنمایی و تەقوا و پاکی و دەوڵەمەندی لێت دەکەم.',
    virtue: 'دوعایەکی گشتگیرە بۆ خێری دونیاو قیامەت',
    reference: 'صحیح مسلم'
  },
  {
    id: 123,
    category: 'general',
    title: 'دوعای دڵنیایی و ئارامی',
    occasion: 'کاتی خەم و پەژارە',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ',
    kurdish: 'خودایە من پەنا دەگرم پێت لە خەم و پەژارە، و لە بێتوانایی و تەمبەڵی.',
    virtue: 'دەرمانی خەم و پەژارە',
    reference: 'صحیح بخاری'
  },
  {
    id: 124,
    category: 'general',
    title: 'دوعای دایک و باوک',
    occasion: 'بۆ دایک و باوک',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    kurdish: 'پەروەردگارا ڕەحمیان پێ بکە وەک چۆن منیان گەورە کردم لە منداڵیەوە.',
    virtue: 'دوعای قورئانی بۆ دایک و باوک',
    reference: 'سورەتی ئیسرا - ٢٤'
  },
  {
    id: 125,
    category: 'general',
    title: 'دوعای داوای زانست',
    occasion: 'پێش خوێندن',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    kurdish: 'پەروەردگارا زانستم بۆ زیاد بکە.',
    virtue: 'دوعای قورئانی بۆ زیادکردنی زانست',
    reference: 'سورەتی تاها - ١١٤'
  },
];

// ============= ڕێکخستنی پۆلەکانی دوعای ڕۆژانە =============
const DAILY_CATEGORIES: { id: DailyCategory; label: string; icon: any }[] = [
  { id: 'after-prayer', label: 'دوای نوێژ', icon: BookOpen },
  { id: 'exit-home', label: 'دەرچوون لە ماڵ', icon: LogOut },
  { id: 'enter-home', label: 'چوونە ماڵ', icon: LogIn },
  { id: 'market', label: 'بازار', icon: ShoppingBag },
  { id: 'travel', label: 'گەشت', icon: Plane },
  { id: 'eating', label: 'خواردن', icon: Utensils },
  { id: 'sleeping', label: 'خەو', icon: Bed },
  { id: 'waking', label: 'هەڵسان', icon: Sunrise },
  { id: 'toilet', label: 'تەوالێت', icon: Droplets },
  { id: 'wudu', label: 'دەستنوێژ', icon: Droplets },
  { id: 'mosque', label: 'مزگەوت', icon: MapPin },
  { id: 'general', label: 'گشتی', icon: Sparkles },
];

interface QuranDuasViewProps {
  lang: Language;
}

type FilterCategory = 'all' | 'rabbana' | 'prophet' | 'forgiveness' | 'parents' | 'favorites';
type ContentType = 'quran' | 'daily';

export const QuranDuasView: React.FC<QuranDuasViewProps> = ({ lang }) => {
  const t = translations[lang] || translations.ckb;
  const isRtl = lang === 'ckb' || lang === 'ar';

  // ===== جۆری ناوەڕۆک: قورئان / دوعای ڕۆژانە =====
  const [contentType, setContentType] = useState<ContentType>('quran');

  // ===== پۆلی دوعای ڕۆژانە =====
  const [dailyCategory, setDailyCategory] = useState<DailyCategory | 'all'>('all');

  // ===== فلتەری قورئان =====
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_duas_cat') as FilterCategory;
      if (['all', 'rabbana', 'prophet', 'forgiveness', 'parents', 'favorites'].includes(saved)) return saved;
    } catch {}
    return 'all';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isCoupleMode, setIsCoupleMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_duas_couple_mode');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [fontScale, setFontScale] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_duas_fontsize');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_duas_favs');
      return saved ? JSON.parse(saved) : [1, 2, 4, 5, 18, 20, 24, 27, 35, 60, 73, 75, 78, 83];
    } catch {
      return [1, 2, 4, 5, 18, 20, 24, 27, 35, 60, 73, 75, 78, 83];
    }
  });

  const [counters, setCounters] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_duas_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [targets, setTargets] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_duas_targets');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedList, setCompletedList] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_duas_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [targetSelectorDuaId, setTargetSelectorDuaId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  // Auto-Save
  useEffect(() => {
    try { localStorage.setItem('sirat_quran_duas_cat', activeCategory); } catch {}
  }, [activeCategory]);

  useEffect(() => {
    try { localStorage.setItem('sirat_quran_duas_couple_mode', JSON.stringify(isCoupleMode)); } catch {}
  }, [isCoupleMode]);

  useEffect(() => {
    try { localStorage.setItem('sirat_quran_duas_fontsize', fontScale.toString()); } catch {}
  }, [fontScale]);

  useEffect(() => {
    try { localStorage.setItem('sirat_quran_duas_favs', JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  useEffect(() => {
    try { localStorage.setItem('sirat_quran_duas_counts', JSON.stringify(counters)); } catch {}
  }, [counters]);

  useEffect(() => {
    try { localStorage.setItem('sirat_quran_duas_targets', JSON.stringify(targets)); } catch {}
  }, [targets]);

  useEffect(() => {
    try { localStorage.setItem('sirat_quran_duas_completed', JSON.stringify(completedList)); } catch {}
  }, [completedList]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ===== فەنکشنەکان =====
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(fId => fId !== id));
      showToast('لە دڵخوازەکان لادرا');
    } else {
      setFavorites(prev => [...prev, id]);
      showToast('زیادکرا بۆ دڵخوازەکان ✓');
    }
  };

  const handleCopyFormatted = async (dua: QuranDuaItem) => {
    const formattedText = 
`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
«${dua.arabic}» ﴿${dua.ayahNumber}﴾
[${dua.surahAr} - ئایەتی ${dua.ayahNumber}]

ماناکەی بە کوردی:
${dua.kurdish}

— ئەپی سیرات (Sirat)`;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(formattedText);
        setCopiedId(dua.id);
        setTimeout(() => setCopiedId(null), 2000);
        showToast('دەقی پیرۆزی نزاکە بە جوانی کۆپی کرا ✓');
      } catch {
        showToast('نەتوانرا دەقەکە کۆپی بکرێت');
      }
    }
  };

  const handleShareDua = async (dua: QuranDuaItem) => {
    const shareTitle = `نزای پیرۆز لە ${dua.surahAr} (${dua.ayahNumber})`;
    const shareText = 
`«${dua.arabic}» ﴿${dua.ayahNumber}﴾
[${dua.surahAr} - ${dua.ayahNumber}]

ماناکەی بە کوردی:
${dua.kurdish}

لە ڕێگەی ئەپی سیراتەوە (Sirat)`;

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText });
        showToast('نزاکە هاوبەش کرا ✓');
      } catch {
        handleCopyFormatted(dua);
      }
    } else {
      handleCopyFormatted(dua);
    }
  };

  const handleToggleRecitation = (dua: QuranDuaItem) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('دەنگی خودکار لەم وێبگەڕەدا بەردەست نییە');
      return;
    }

    if (playingAudioId === dua.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(dua.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;
    utterance.onend = () => setPlayingAudioId(null);
    utterance.onerror = () => setPlayingAudioId(null);
    setPlayingAudioId(dua.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleIncrement = (duaId: number) => {
    const current = counters[duaId] || 0;
    const target = targets[duaId] || 3;
    const nextCount = current + 1;

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(28); } catch {}
    }

    soundEffects.playTasbihClick();

    setCounters(prev => ({ ...prev, [duaId]: nextCount }));

    if (nextCount >= target && !completedList.includes(duaId)) {
      setCompletedList(prev => [...prev, duaId]);
      showToast('پیرۆزە! نزا بەسەرکەوتوویی تەواو کرا ✨');
      soundEffects.playGoalChime();
    }
  };

  const handleSelectTarget = (duaId: number, target: number) => {
    setTargets(prev => ({ ...prev, [duaId]: target }));
    setTargetSelectorDuaId(null);
    showToast(`ئامانج: ${target}`);
  };

  const handleConfirmReset = () => {
    setCounters({});
    setCompletedList([]);
    setShowResetModal(false);
    showToast('ژمێردراوەکانی ئەمڕۆ سفر کرانەوە ✓');
  };

  // ===== فلتەری دوعاکانی قورئان =====
  const filteredDuas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return QURAN_DUAS_DATA.filter(dua => {
      let matchesCategory = true;
      if (activeCategory === 'rabbana') {
        matchesCategory = dua.tag === 'rabbana' || dua.arabic.trim().startsWith('رَبَّنَا') || dua.arabic.trim().startsWith('رَبِّ');
      } else if (activeCategory === 'prophet') {
        matchesCategory = dua.tag === 'prophet';
      } else if (activeCategory === 'forgiveness') {
        matchesCategory = dua.tag === 'forgiveness' || dua.arabic.includes('اغْفِرْ') || dua.kurdish.includes('خۆش ببە') || dua.kurdish.includes('ببورە');
      } else if (activeCategory === 'parents') {
        matchesCategory = dua.tag === 'parents' || dua.arabic.includes('وَالِدَيَّ') || dua.arabic.includes('ذُرِّيَّتِي') || dua.kurdish.includes('دایک') || dua.kurdish.includes('باوک');
      } else if (activeCategory === 'favorites') {
        matchesCategory = favorites.includes(dua.id);
      }
      if (!matchesCategory) return false;

      if (q) {
        return (
          dua.arabic.toLowerCase().includes(q) ||
          dua.kurdish.toLowerCase().includes(q) ||
          dua.surah.toLowerCase().includes(q) ||
          dua.surahAr.toLowerCase().includes(q) ||
          String(dua.ayahNumber).includes(q) ||
          String(dua.id) === q ||
          dua.en.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery, favorites]);

  // ===== فلتەری دوعاکانی ڕۆژانە =====
  const filteredDailyDuas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DAILY_DUAS_DATA.filter(dua => {
      if (dailyCategory !== 'all' && dua.category !== dailyCategory) return false;
      if (q) {
        return (
          dua.title.toLowerCase().includes(q) ||
          dua.arabic.toLowerCase().includes(q) ||
          dua.kurdish.toLowerCase().includes(q) ||
          dua.occasion.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [dailyCategory, searchQuery]);

  const totalCount = QURAN_DUAS_DATA.length;
  const completedCount = completedList.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalCount) * 100));

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div 
      className={`w-full mx-auto min-h-screen text-(--text-main) font-kurdish pb-32 space-y-5 animate-fadeIn transition-all ${
        isCoupleMode ? 'max-w-5xl' : 'max-w-md'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Toast */}
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

      {/* ============ HEADER ============ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 px-1">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h1 
              className="text-2xl sm:text-3xl font-bold font-naskh tracking-tight"
              style={{ color: 'var(--color-gold)' }}
            >
              نزاکانی قورئان و دوعاکان
            </h1>
            <span 
              className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border"
              style={{ 
                backgroundColor: 'var(--color-gold-muted)', 
                borderColor: 'rgba(242, 201, 76, 0.3)',
                color: 'var(--color-gold)' 
              }}
            >
              {contentType === 'quran' ? `${totalCount} نزا` : `${DAILY_DUAS_DATA.length} دوعا`}
            </span>
          </div>
          <p className="text-xs text-(--text-muted) font-medium">
            نزاکانی پیرۆزی قورئان و دوعاکانی ڕۆژانە
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => {
              setIsCoupleMode(prev => !prev);
              showToast(isCoupleMode ? 'دۆخی تاک' : 'دۆخی کەپڵ');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            style={{ 
              backgroundColor: isCoupleMode ? 'var(--color-gold-muted)' : 'var(--bg-card)', 
              borderColor: isCoupleMode ? 'var(--color-gold)' : 'var(--border-theme)',
              color: isCoupleMode ? 'var(--color-gold)' : 'var(--text-main)'
            }}
          >
            {isCoupleMode ? (
              <>
                <Columns2 className="w-3.5 h-3.5" />
                <span className="font-naskh">کەپڵ</span>
              </>
            ) : (
              <>
                <Rows3 className="w-3.5 h-3.5" />
                <span className="font-naskh">تاک</span>
              </>
            )}
          </button>

          <div 
            className="flex items-center rounded-full border px-1 py-0.5 shadow-sm text-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <button
              type="button"
              onClick={() => setFontScale(prev => Math.max(-4, prev - 2))}
              disabled={fontScale <= -4}
              className="px-2 py-1 text-xs font-bold text-(--text-muted) hover:text-(--text-main) disabled:opacity-30 cursor-pointer active:scale-95 transition-all"
            >
              A-
            </button>
            <span className="w-px h-3.5 bg-(--border-theme)" />
            <button
              type="button"
              onClick={() => setFontScale(prev => Math.min(8, prev + 2))}
              disabled={fontScale >= 8}
              className="px-2 py-1 text-xs font-bold text-(--color-gold) hover:brightness-110 disabled:opacity-30 cursor-pointer active:scale-95 transition-all"
            >
              A+
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-theme)',
              color: 'var(--text-main)'
            }}
          >
            <RotateCcw className="w-3.5 h-3.5 text-(--color-gold)" />
            <span className="hidden sm:inline font-naskh">سەرلەنوێ</span>
          </button>
        </div>
      </div>

      {/* ============ تابەکانی سەرەکی: قورئان / ڕۆژانە ============ */}
      <div 
        className="flex items-center gap-1 p-1 rounded-2xl border"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-theme)' 
        }}
      >
        <button
          type="button"
          onClick={() => setContentType('quran')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            contentType === 'quran' ? 'shadow-md scale-[1.02]' : 'text-(--text-muted) hover:text-(--text-main)'
          }`}
          style={
            contentType === 'quran'
              ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
              : {}
          }
        >
          <BookOpen className="w-4 h-4" />
          <span className="font-naskh">نزاکانی قورئان</span>
        </button>

        <button
          type="button"
          onClick={() => setContentType('daily')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            contentType === 'daily' ? 'shadow-md scale-[1.02]' : 'text-(--text-muted) hover:text-(--text-main)'
          }`}
          style={
            contentType === 'daily'
              ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
              : {}
          }
        >
          <Hand className="w-4 h-4" />
          <span className="font-naskh">دوعاکانی ڕۆژانە</span>
        </button>
      </div>

      {/* ============ SEARCH BAR ============ */}
      <div 
        className="rounded-2xl border px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm transition-all focus-within:border-(--color-gold)"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-theme)' 
        }}
      >
        <Search className="w-4 h-4 text-(--color-gold) shrink-0 opacity-80" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="گەڕان لە نێو نزا و دوعاکان..."
          className="w-full bg-transparent text-xs sm:text-sm text-(--text-main) placeholder-(--text-muted) outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="p-1 rounded-full text-(--text-muted) hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ============ دۆخی نزاکانی قورئان ============ */}
      {/* ========================================================================= */}
      {contentType === 'quran' && (
        <>
          {/* فلتەر تابەکان */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            {/* هەموو */}
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
                activeCategory === 'all'
                  ? 'shadow-md scale-[1.02]'
                  : 'hover:bg-white/10 text-(--text-main) border border-(--border-theme)'
              }`}
              style={
                activeCategory === 'all'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="font-naskh">هەموو نزاکان</span>
              <span className="text-[10px] px-1.5 rounded-full opacity-80 font-mono">
                {totalCount}
              </span>
            </button>

            {/* ڕەببەنا */}
            <button
              type="button"
              onClick={() => setActiveCategory('rabbana')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 border ${
                activeCategory === 'rabbana'
                  ? 'shadow-md scale-[1.02]'
                  : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={
                activeCategory === 'rabbana'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-naskh">نزای ڕەببەنا</span>
            </button>

            {/* پەیامبەران */}
            <button
              type="button"
              onClick={() => setActiveCategory('prophet')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 border ${
                activeCategory === 'prophet'
                  ? 'shadow-md scale-[1.02]'
                  : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={
                activeCategory === 'prophet'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span className="font-naskh">پەیامبەران</span>
            </button>

            {/* لێخۆشبوون */}
            <button
              type="button"
              onClick={() => setActiveCategory('forgiveness')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 border ${
                activeCategory === 'forgiveness'
                  ? 'shadow-md scale-[1.02]'
                  : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={
                activeCategory === 'forgiveness'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <Flame className="w-3.5 h-3.5" />
              <span className="font-naskh">لێخۆشبوون</span>
            </button>

            {/* دایک و باوک */}
            <button
              type="button"
              onClick={() => setActiveCategory('parents')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 border ${
                activeCategory === 'parents'
                  ? 'shadow-md scale-[1.02]'
                  : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={
                activeCategory === 'parents'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="font-naskh">دایک و باوک</span>
            </button>

            {/* دڵخوازەکان */}
            <button
              type="button"
              onClick={() => setActiveCategory('favorites')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 border ${
                activeCategory === 'favorites'
                  ? 'shadow-md scale-[1.02]'
                  : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={
                activeCategory === 'favorites'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <Heart className={`w-3.5 h-3.5 ${activeCategory === 'favorites' ? 'fill-current' : ''}`} />
              <span className="font-naskh">دڵخوازەکان</span>
              <span className="text-[10px] px-1.5 rounded-full opacity-80 font-mono">
                {favorites.length}
              </span>
            </button>
          </div>

          {/* کارتی پێشکەوتن */}
          <div 
            className="p-5 rounded-3xl border shadow-lg flex items-center justify-between relative overflow-hidden"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-theme)' 
            }}
          >
            <div className="space-y-1">
              <div className="flex items-baseline gap-2 font-mono">
                <span 
                  className="text-3xl font-extrabold tracking-tight"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {completedCount}
                </span>
                <span className="text-sm text-(--text-muted) font-medium">
                  / {totalCount}
                </span>
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">
                پێشکەوتنی نزاکان
              </h3>
              <p className="text-xs text-(--text-muted)">
                نزای تەواوکراو لە کۆی {totalCount}
              </p>
            </div>

            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-white/10"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="var(--color-gold)"
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <span 
                className="absolute font-mono font-bold text-xs"
                style={{ color: 'var(--color-gold)' }}
              >
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* لیستی نزاکانی قورئان */}
          {filteredDuas.length === 0 ? (
            <div 
              className="p-8 rounded-3xl border text-center space-y-3 my-6 shadow-sm"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-inner"
                style={{ backgroundColor: 'var(--bg-chip)' }}
              >
                <Heart className="w-8 h-8 text-(--color-gold) opacity-70" />
              </div>
              <h4 className="text-base font-bold text-(--text-main) font-naskh">
                {searchQuery ? 'هیچ نزایەک نەدۆزرایەوە' : 'هیچ نزایەکی دڵخوازت نییە'}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
              >
                هەموو نزاکان پیشان بدە
              </button>
            </div>
          ) : (
            <div className={`transition-all duration-300 ${
              isCoupleMode ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'
            }`}>
              {filteredDuas.map((dua) => {
                const isFav = favorites.includes(dua.id);
                const currentCount = counters[dua.id] || 0;
                const targetCount = targets[dua.id] || 3;
                const isCompleted = currentCount >= targetCount;
                const duaProgress = Math.min(100, Math.round((currentCount / targetCount) * 100));
                const isCopied = copiedId === dua.id;
                const isPlayingAudio = playingAudioId === dua.id;
                const localizedMeaning = lang === 'ar' ? dua.ar : lang === 'en' ? dua.en : dua.kurdish;
                const localizedSurah = isRtl ? dua.surahAr : (dua.surahEn || dua.surah);

                return (
                  <div
                    key={dua.id}
                    className="rounded-3xl border shadow-lg p-5 flex flex-col justify-between transition-all duration-200 hover:border-white/20 relative overflow-hidden h-full"
                    style={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: isCompleted ? 'rgba(242, 201, 76, 0.4)' : 'var(--border-theme)' 
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-xs shadow-sm shrink-0"
                            style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
                          >
                            {dua.id}
                          </div>
                          <div 
                            className="px-3 py-1 rounded-full border text-xs font-bold font-naskh flex items-center gap-1.5"
                            style={{ 
                              backgroundColor: 'var(--color-gold-muted)', 
                              borderColor: 'rgba(242, 201, 76, 0.25)', 
                              color: 'var(--color-gold)' 
                            }}
                          >
                            <span>{localizedSurah}</span>
                            <span className="text-[10px] opacity-75 font-mono">({dua.ayahNumber})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleToggleRecitation(dua)}
                            className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                              isPlayingAudio 
                                ? 'bg-(--color-gold) text-slate-950 animate-pulse' 
                                : 'hover:bg-white/10 text-(--text-muted)'
                            }`}
                            style={{ backgroundColor: isPlayingAudio ? 'var(--color-gold)' : 'var(--bg-chip)' }}
                          >
                            {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleShareDua(dua)}
                            className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/10 text-(--text-muted)"
                            style={{ backgroundColor: 'var(--bg-chip)' }}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyFormatted(dua)}
                            className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                              isCopied ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/10 text-(--text-muted)'
                            }`}
                            style={{ backgroundColor: isCopied ? undefined : 'var(--bg-chip)' }}
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleFavorite(dua.id)}
                            className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/10"
                            style={{ 
                              backgroundColor: 'var(--bg-chip)', 
                              color: isFav ? 'var(--color-gold)' : 'var(--text-muted)' 
                            }}
                          >
                            <Heart className={`w-3.5 h-3.5 transition-all ${isFav ? 'fill-(--color-gold) scale-110' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <div className="pt-1">
                        <p 
                          className="font-quran-verse text-right leading-[2.1] text-white select-text text-balance"
                          style={{ fontSize: `${Math.max(22, (isCoupleMode ? 27 : 32) + fontScale)}px` }}
                        >
                          {dua.arabic} 
                          <span 
                            className="inline-block mx-1.5 text-base sm:text-lg font-mono font-bold select-none"
                            style={{ color: 'var(--color-gold)' }}
                          >
                            ﴿{dua.ayahNumber}﴾
                          </span>
                        </p>
                      </div>

                      <div className="w-full h-px my-1 opacity-70" style={{ backgroundColor: 'var(--border-theme)' }} />

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold block font-naskh" style={{ color: 'var(--color-gold)' }}>
                          مانای نزاکە:
                        </span>
                        <p 
                          className="text-(--text-main)/90 text-justify leading-relaxed"
                          style={{ 
                            fontSize: `${Math.max(13, (isCoupleMode ? 15 : 16) + fontScale * 0.5)}px`,
                            lineHeight: '1.85'
                          }}
                        >
                          {localizedMeaning}
                        </p>
                      </div>
                    </div>

                    {/* Tap Counter */}
                    <div className="pt-4 space-y-2">
                      <div 
                        onClick={() => handleIncrement(dua.id)}
                        className="w-full min-h-12.5 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all duration-200 active:scale-[0.98] select-none shadow-sm"
                        style={{ 
                          backgroundColor: isCompleted ? 'rgba(61, 190, 156, 0.15)' : 'var(--bg-chip)',
                          border: isCompleted ? '1px solid var(--color-teal)' : '1px solid var(--border-theme)'
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                            {isCompleted ? (
                              <div 
                                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-md"
                                style={{ backgroundColor: 'var(--color-gold)' }}
                              >
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              </div>
                            ) : (
                              <svg className="w-7 h-7 transform -rotate-90">
                                <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="3" className="text-white/10" fill="transparent" />
                                <circle
                                  cx="14" cy="14" r="11"
                                  stroke="var(--color-gold)" strokeWidth="3"
                                  strokeDasharray={2 * Math.PI * 11}
                                  strokeDashoffset={2 * Math.PI * 11 - (duaProgress / 100) * (2 * Math.PI * 11)}
                                  strokeLinecap="round" fill="transparent"
                                  className="transition-all duration-300"
                                />
                              </svg>
                            )}
                          </div>

                          <div className="text-start">
                            <span className="text-xs font-bold block text-(--text-main) font-naskh">
                              {isCompleted ? 'تەواوبوو ✓' : 'داگرە بۆ ژماردن'}
                            </span>
                            <span className="text-[10px] text-(--text-muted) font-mono">
                              {currentCount} / {targetCount}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTargetSelectorDuaId(dua.id);
                            }}
                            className="px-2 py-0.5 rounded-lg text-[10px] font-bold border border-white/10 hover:border-white/20 transition-all text-(--color-gold) cursor-pointer"
                            style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
                          >
                            {targetCount}x
                          </button>

                          <div 
                            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform active:scale-90 ${
                              isCompleted ? 'text-(--color-teal)' : 'text-(--color-gold)'
                            }`}
                          >
                            <Hand className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {targetSelectorDuaId === dua.id && (
                        <div 
                          className="p-2.5 rounded-2xl border flex items-center justify-between gap-1 shadow-lg animate-fadeIn text-xs"
                          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-gold)' }}
                        >
                          <span className="text-xs font-bold text-(--text-main) font-naskh">ئامانج:</span>
                          <div className="flex items-center gap-1.5">
                            {[1, 3, 7, 33, 100].map(cnt => (
                              <button
                                key={cnt}
                                type="button"
                                onClick={() => handleSelectTarget(dua.id, cnt)}
                                className={`px-2 py-0.5 rounded-lg font-bold font-mono transition-all cursor-pointer text-xs ${
                                  targetCount === cnt 
                                    ? 'bg-(--color-gold) text-slate-950 shadow-sm' 
                                    : 'bg-white/10 hover:bg-white/15 text-(--text-main)'
                                }`}
                              >
                                {cnt}
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setTargetSelectorDuaId(null)}
                            className="p-1 rounded-lg text-(--text-muted) hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* ============ دۆخی دوعاکانی ڕۆژانە ============ */}
      {/* ========================================================================= */}
      {contentType === 'daily' && (
        <div className="space-y-4 animate-fadeIn">
          {/* فلتەر تابی دوعاکانی ڕۆژانە */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            {/* هەموو */}
            <button
              type="button"
              onClick={() => setDailyCategory('all')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 border ${
                dailyCategory === 'all'
                  ? 'shadow-md scale-[1.02]'
                  : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={
                dailyCategory === 'all'
                  ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-naskh">هەموو</span>
              <span className="text-[10px] px-1.5 rounded-full opacity-80 font-mono">
                {DAILY_DUAS_DATA.length}
              </span>
            </button>

            {/* پۆلەکانی تر */}
            {DAILY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = dailyCategory === cat.id;
              const count = DAILY_DUAS_DATA.filter(d => d.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setDailyCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 border ${
                    isActive
                      ? 'shadow-md scale-[1.02]'
                      : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' }
                      : { backgroundColor: 'var(--bg-chip)' }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-naskh">{cat.label}</span>
                  <span className="text-[10px] px-1.5 rounded-full opacity-80 font-mono">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* لیستی دوعاکانی ڕۆژانە */}
          {filteredDailyDuas.length === 0 ? (
            <div 
              className="p-8 rounded-3xl border text-center space-y-3 my-6 shadow-sm"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-inner"
                style={{ backgroundColor: 'var(--bg-chip)' }}
              >
                <Hand className="w-8 h-8 text-(--color-gold) opacity-70" />
              </div>
              <h4 className="text-base font-bold text-(--text-main) font-naskh">
                هیچ دوعایەک نەدۆزرایەوە
              </h4>
              <p className="text-xs text-(--text-muted)">
                تکایە پۆلێکی تر هەڵبژێرە
              </p>
            </div>
          ) : (
            <div className={isCoupleMode ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
              {filteredDailyDuas.map((dua) => (
                <div
                  key={dua.id}
                  className="rounded-3xl border shadow-lg p-5 flex flex-col justify-between transition-all duration-200 hover:border-white/20"
                  style={{ 
                    backgroundColor: 'var(--bg-card)', 
                    borderColor: 'var(--border-theme)' 
                  }}
                >
                  <div className="space-y-4">
                    {/* سەرەوەی کارت */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-xs shadow-sm shrink-0"
                          style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
                        >
                          {dua.id - 100}
                        </div>
                        <div 
                          className="px-3 py-1 rounded-full border text-xs font-bold font-naskh"
                          style={{ 
                            backgroundColor: 'var(--color-gold-muted)', 
                            borderColor: 'rgba(242, 201, 76, 0.25)', 
                            color: 'var(--color-gold)' 
                          }}
                        >
                          {dua.occasion}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={async () => {
                            const formattedText = `${dua.title}\n\n«${dua.arabic}»\n\nماناکەی بە کوردی:\n${dua.kurdish}${dua.virtue ? `\n\nفەزیلەت: ${dua.virtue}` : ''}${dua.reference ? `\n\nسەرچاوە: ${dua.reference}` : ''}\n\n— ئەپی سیرات (Sirat)`;
                            if (navigator.clipboard) {
                              await navigator.clipboard.writeText(formattedText);
                              showToast('دوعاکە کۆپی کرا ✓');
                            }
                          }}
                          className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/10 text-(--text-muted)"
                          style={{ backgroundColor: 'var(--bg-chip)' }}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            const shareText = `${dua.title}\n\n«${dua.arabic}»\n\nماناکەی بە کوردی:\n${dua.kurdish}\n\n— ئەپی سیرات (Sirat)`;
                            if (navigator.share) {
                              try {
                                await navigator.share({ title: dua.title, text: shareText });
                                showToast('دوعاکە هاوبەش کرا ✓');
                              } catch {}
                            } else if (navigator.clipboard) {
                              await navigator.clipboard.writeText(shareText);
                              showToast('دوعاکە کۆپی کرا ✓');
                            }
                          }}
                          className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/10 text-(--text-muted)"
                          style={{ backgroundColor: 'var(--bg-chip)' }}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* ناونیشان */}
                    <h3 className="font-bold text-base text-(--text-main) font-naskh text-right">
                      {dua.title}
                    </h3>

                    {/* دەقی عەرەبی */}
                    <div className="pt-1">
                      <p 
                        className="font-quran-verse text-right leading-[2.1] text-white select-text"
                        style={{ fontSize: `${Math.max(20, (isCoupleMode ? 24 : 28) + fontScale)}px` }}
                      >
                        {dua.arabic}
                      </p>
                    </div>

                    <div className="w-full h-px my-1 opacity-70" style={{ backgroundColor: 'var(--border-theme)' }} />

                    {/* مانای کوردی */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold block font-naskh" style={{ color: 'var(--color-gold)' }}>
                        مانای دوعاکە:
                      </span>
                      <p 
                        className="text-(--text-main)/90 text-justify leading-relaxed"
                        style={{ 
                          fontSize: `${Math.max(13, (isCoupleMode ? 15 : 16) + fontScale * 0.5)}px`,
                          lineHeight: '1.85'
                        }}
                      >
                        {dua.kurdish}
                      </p>
                    </div>

                    {/* فەزیلەت */}
                    {dua.virtue && (
                      <div 
                        className="p-3 rounded-2xl border space-y-1"
                        style={{ 
                          backgroundColor: 'var(--color-gold-muted)', 
                          borderColor: 'rgba(242, 201, 76, 0.3)' 
                        }}
                      >
                        <span className="text-[10px] font-bold block" style={{ color: 'var(--color-gold)' }}>
                          فەزیلەت:
                        </span>
                        <p className="text-[11px] text-(--text-main) leading-relaxed">
                          {dua.virtue}
                        </p>
                      </div>
                    )}

                    {/* سەرچاوە */}
                    {dua.reference && (
                      <p className="text-[10px] text-(--text-muted) font-mono text-right">
                        سەرچاوە: {dua.reference}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============ MODAL: سەرلەنوێ ============ */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--bg-chip)' }}
              >
                <RotateCcw className="w-5 h-5 text-(--color-gold)" />
              </div>
              <div>
                <h3 className="text-base font-bold text-(--text-main) font-naskh">
                  سەرلەنوێ دەستپێکردنەوە؟
                </h3>
                <p className="text-xs text-(--text-muted)">
                  ئایا دڵنیایت لە سەرلەنوێ دانانەوەی ژمێردراوەکان؟
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
                className="px-5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95"
                style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
              >
                بەڵێ، سەرلەنوێ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};