/**
 * بەشی قورئانی پیرۆز بۆ بینین و خوێندنەوەی سوورەت و ئایەتەکان.
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BookOpen as QuranIcon,
  Search, 
  Play, 
  Pause, 
  Bookmark, 
  BookmarkCheck, 
  Volume2, 
  VolumeX,
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Share2,
  Copy,
  Check,
  Star,
  ChevronLeft,
  Eye,
  Type,
  X,
  Hash,
  CircleDot,
  Heart,
  MoonStar,
  Sun,
  Gem,
  Award,
  Crown,
  Feather,
  Layers,
  Zap
} from 'lucide-react';
import { Language, SurahMeta, AyahItem } from '../types';
import { SURAH_LIST, fetchSurahVerses } from '../data/quranData';
import { translations } from '../data/translations';
interface QuranViewProps {
  lang: Language;
}

export const QuranView: React.FC<QuranViewProps> = ({ lang }) => {
  const t = translations[lang];
  const isRtl = lang === 'ckb' || lang === 'ar';

  // ===== دۆخەکان =====
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSurah, setActiveSurah] = useState<SurahMeta | null>(null);
  const [verses, setVerses] = useState<AyahItem[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_fontsize');
      return saved ? parseInt(saved, 10) : 26;
    } catch {
      return 26;
    }
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [lastRead, setLastRead] = useState<{surah: number; ayah: number} | null>(() => {
    try {
      const saved = localStorage.getItem('sirat_quran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Playback
  const [playingAyahIndex, setPlayingAyahIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ===== پاشەکەوتکردن =====
  useEffect(() => {
    try {
      localStorage.setItem('sirat_quran_fontsize', fontSize.toString());
    } catch {}
  }, [fontSize]);

  useEffect(() => {
    try {
      localStorage.setItem('sirat_quran_bookmarks', JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  useEffect(() => {
    try {
      if (lastRead) {
        localStorage.setItem('sirat_quran_last_read', JSON.stringify(lastRead));
      }
    } catch {}
  }, [lastRead]);

  // ===== بارکردنی ئایەتەکان =====
  useEffect(() => {
    if (!activeSurah) {
      setVerses([]);
      stopAudio();
      return;
    }

    setIsLoadingVerses(true);
    fetchSurahVerses(activeSurah.number).then((data) => {
      setVerses(data);
      setIsLoadingVerses(false);
    });

    return () => {
      stopAudio();
    };
  }, [activeSurah]);

  // ===== کۆنترۆڵی دەنگ =====
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAyahIndex(null);
    setIsPlayingAll(false);
  };

  const playAyahAudio = (index: number) => {
    if (playingAyahIndex === index) {
      stopAudio();
      return;
    }

    stopAudio();
    const ayah = verses[index];
    if (!ayah || !ayah.audioUrl) return;

    const audio = new Audio(ayah.audioUrl);
    audioRef.current = audio;
    setPlayingAyahIndex(index);

    audio.play().catch(() => {
      setPlayingAyahIndex(null);
    });

    audio.onended = () => {
      if (isPlayingAll && index + 1 < verses.length) {
        playAyahAudio(index + 1);
      } else {
        stopAudio();
      }
    };
  };

  const handlePlayFullSurah = () => {
    if (isPlayingAll) {
      stopAudio();
    } else {
      setIsPlayingAll(true);
      playAyahAudio(0);
    }
  };

  // ===== نیشانکردن =====
  const toggleBookmark = (surahNum: number, ayahNum: number) => {
    const key = `${surahNum}:${ayahNum}`;
    const updated = bookmarks.includes(key)
      ? bookmarks.filter(b => b !== key)
      : [...bookmarks, key];
    setBookmarks(updated);
    showToast(bookmarks.includes(key) ? 'لە دڵخوازەکان لادرا' : 'زیادکرا بۆ دڵخوازەکان ✓');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ===== کۆپی ئایەت =====
  const handleCopyAyah = async (ayah: AyahItem, surah: SurahMeta) => {
    const text = `${ayah.textAr}\n\n[${surah.nameAr} - ئایەتی ${ayah.numberInSurah}]\n\n${ayah.translationKu}\n\n— ئەپی سیرات`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedAyah(ayah.numberInSurah);
        setTimeout(() => setCopiedAyah(null), 2000);
        showToast('ئایەتەکە کۆپی کرا ✓');
      } catch {}
    }
  };

  // ===== هاوبەشکردن =====
  const handleShareAyah = async (ayah: AyahItem, surah: SurahMeta) => {
    const text = `${ayah.textAr}\n\n[${surah.nameAr} - ئایەتی ${ayah.numberInSurah}]\n\n${ayah.translationKu}\n\n— ئەپی سیرات`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${surah.nameAr} - ${ayah.numberInSurah}`, text });
        return;
      } catch {}
    }
    handleCopyAyah(ayah, surah);
  };

  // ===== کردارەکانی سورە =====
  const handleOpenSurah = (surah: SurahMeta) => {
    setActiveSurah(surah);
    setLastRead({ surah: surah.number, ayah: 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSurahs = () => {
    setActiveSurah(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== فلترکردنی سورەکان =====
  const filteredSurahs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = SURAH_LIST;

    if (showBookmarksOnly) {
      const bookmarkedSurahs = new Set(
        bookmarks.map(b => parseInt(b.split(':')[0], 10))
      );
      list = list.filter(s => bookmarkedSurahs.has(s.number));
    }

    if (q) {
      list = list.filter((s) => {
        return (
          s.number.toString() === q ||
          s.nameAr.includes(q) ||
          s.nameKu.includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.englishTranslation.toLowerCase().includes(q)
        );
      });
    }

    return list;
  }, [searchQuery, showBookmarksOnly, bookmarks]);

  // ===== ئامارەکان =====
  const stats = useMemo(() => ({
    total: SURAH_LIST.length,
    makki: SURAH_LIST.filter(s => s.revelationType === 'Meccan').length,
    madani: SURAH_LIST.filter(s => s.revelationType === 'Medinan').length,
    bookmarks: bookmarks.length,
  }), [bookmarks]);

  return (
    <div 
      className="w-full max-w-2xl mx-auto space-y-5 animate-fadeIn pb-28 text-(--text-main) font-kurdish"
      dir={isRtl ? 'rtl' : 'ltr'}
    >

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 inset-x-4 z-50 flex justify-center animate-fadeIn pointer-events-none">
          <div 
            className="border text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--color-gold)', 
              color: 'var(--text-main)' 
            }}
          >
            <Check className="w-4 h-4 text-(--color-gold)" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* لیستی سورەکان */}
      {/* ============================================ */}
      {!activeSurah && (
        <>
          {/* کارتی سەرەوە */}
          <div 
            className="p-5 rounded-3xl border shadow-lg space-y-4 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <div 
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: 'var(--color-gold)' }}
            />

            <div className="flex items-center justify-between gap-3 relative z-10 flex-wrap">
              <div className="flex items-center gap-3">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0 relative"
                  style={{ backgroundColor: 'var(--color-gold-muted)' }}
                >
                  <QuranIcon size={32} className="text-(--color-gold)" />
                  <Feather className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
                </div>
                <div>
                  <h1 
                    className="text-2xl font-bold font-naskh tracking-tight flex items-center gap-2"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    قورئانی پیرۆز
                  </h1>
                  <p className="text-xs text-(--text-muted) font-kurdish flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    ١١٤ سوورەت • دەقی عوسمانی • تەفسیری کوردی
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowBookmarksOnly(prev => !prev)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                  showBookmarksOnly
                    ? 'shadow-md'
                    : 'hover:border-(--color-gold) hover:text-(--color-gold)'
                }`}
                style={
                  showBookmarksOnly
                    ? { 
                        backgroundColor: 'var(--color-gold)', 
                        color: '#031F3C', 
                        borderColor: 'var(--color-gold)' 
                      }
                    : { 
                        backgroundColor: 'var(--bg-chip)', 
                        borderColor: 'var(--border-theme)',
                        color: 'var(--text-main)'
                      }
                }
              >
                <Heart className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
                <span className="font-naskh">دڵخوازەکان</span>
                {stats.bookmarks > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px] px-1.5 rounded-full bg-black/20 font-mono">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {stats.bookmarks}
                  </span>
                )}
              </button>
            </div>

            <div 
              className="rounded-2xl border px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm transition-all focus-within:border-(--color-gold) relative z-10"
              style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
            >
              <Search className="w-4 h-4 text-(--color-gold) shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="گەڕان بەپێی ناوی سورە یان ژمارە..."
                className="w-full bg-transparent text-xs sm:text-sm text-(--text-main) placeholder-(--text-muted) outline-none font-kurdish"
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

            <div className="grid grid-cols-3 gap-2 pt-2 relative z-10">
              <div 
                className="p-3 rounded-2xl text-center border flex flex-col items-center gap-1"
                style={{ 
                  backgroundColor: 'var(--color-gold-muted)', 
                  borderColor: 'rgba(242, 201, 76, 0.25)' 
                }}
              >
                <QuranIcon size={20} className="text-(--color-gold)" />
                <span 
                  className="text-lg font-black font-mono block leading-none"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {stats.total}
                </span>
                <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
                  کۆی سورەکان
                </span>
              </div>

              <div 
                className="p-3 rounded-2xl text-center border flex flex-col items-center gap-1"
                style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
              >
                <MoonStar className="w-5 h-5 text-(--color-teal)" />
                <span className="text-lg font-black font-mono block leading-none text-(--color-teal)">
                  {stats.makki}
                </span>
                <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
                  مەککی
                </span>
              </div>

              <div 
                className="p-3 rounded-2xl text-center border flex flex-col items-center gap-1"
                style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
              >
                <Sun className="w-5 h-5 text-(--color-gold)" />
                <span className="text-lg font-black font-mono block leading-none text-(--text-main)">
                  {stats.madani}
                </span>
                <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
                  مەدەنی
                </span>
              </div>
            </div>
          </div>

          {/* لیستی سورەکان */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSurahs.map((surah) => {
              const isMakki = surah.revelationType === 'Meccan';
              const surahBookmarks = bookmarks.filter(b => b.startsWith(`${surah.number}:`)).length;
              const isLastRead = lastRead?.surah === surah.number;

              return (
                <button
                  key={surah.number}
                  type="button"
                  onClick={() => handleOpenSurah(surah)}
                  className={`p-4 rounded-3xl border transition-all text-start flex items-center justify-between gap-3 group cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-md ${
                    isLastRead ? 'shadow-md' : ''
                  }`}
                  style={{
                    backgroundColor: isLastRead ? 'var(--color-gold-muted)' : 'var(--bg-card)',
                    borderColor: isLastRead ? 'var(--color-gold)' : 'var(--border-theme)'
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* ئایکۆنی قورئان لە جێی ژمارە */}
                    <div 
                      className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm relative"
                      style={{ 
                        backgroundColor: 'var(--color-gold-muted)',
                        border: '1.5px solid var(--color-gold)'
                      }}
                    >
                      <QuranIcon size={28} className="text-(--color-gold)" />
                      <span 
                        className="text-[9px] font-bold font-mono absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                        style={{ 
                          backgroundColor: 'var(--color-gold)', 
                          color: '#031F3C',
                          border: '1.5px solid var(--bg-card)'
                        }}
                      >
                        {surah.number}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-sm text-(--text-main) font-naskh truncate">
                          {lang === 'ckb' ? surah.nameKu : surah.nameAr}
                        </h3>
                        {isLastRead && (
                          <span 
                            className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                            style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
                          >
                            <Eye className="w-2.5 h-2.5" />
                            <span>ئێرە بوویت</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span 
                          className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{
                            backgroundColor: isMakki ? 'var(--color-gold-muted)' : 'rgba(61, 190, 156, 0.15)',
                            color: isMakki ? 'var(--color-gold)' : 'var(--color-teal)',
                            border: `1px solid ${isMakki ? 'rgba(242, 201, 76, 0.3)' : 'rgba(61, 190, 156, 0.3)'}`
                          }}
                        >
                          {isMakki ? <MoonStar className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                          <span>{isMakki ? 'مەککی' : 'مەدەنی'}</span>
                        </span>

                        <span className="flex items-center gap-1 text-[10px] text-(--text-muted) font-kurdish">
                          <Layers className="w-2.5 h-2.5" />
                          {surah.numberOfAyahs} ئایەت
                        </span>

                        {surahBookmarks > 0 && (
                          <span 
                            className="flex items-center gap-0.5 text-[10px] font-mono"
                            style={{ color: 'var(--color-gold)' }}
                          >
                            <Bookmark className="w-2.5 h-2.5 fill-current" />
                            {surahBookmarks}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* دەقی عەرەبی سورە */}
                  <div className="text-end shrink-0">
                    <span 
                      className="font-quran-verse text-base sm:text-lg font-bold block"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      {surah.nameAr}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ئەگەر هیچ نەدۆزرایەوە */}
          {filteredSurahs.length === 0 && (
            <div 
              className="p-12 rounded-3xl border text-center space-y-3"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-inner"
                style={{ backgroundColor: 'var(--bg-chip)' }}
              >
                {showBookmarksOnly ? (
                  <Heart className="w-8 h-8 text-(--color-gold) opacity-70" />
                ) : (
                  <Search className="w-8 h-8 text-(--color-gold) opacity-70" />
                )}
              </div>
              <h4 className="text-base font-bold text-(--text-main) font-naskh">
                {showBookmarksOnly ? 'هیچ دڵخوازێک نییە' : 'هیچ سورەیەک نەدۆزرایەوە'}
              </h4>
              <p className="text-xs text-(--text-muted) font-kurdish">
                {showBookmarksOnly 
                  ? 'ئایەتێک نیشان بکە بۆ ئەوەی لێرە دەربکەوێت' 
                  : 'تکایە وشەیەکی تر تاقی بکەرەوە'}
              </p>
              {showBookmarksOnly && (
                <button
                  type="button"
                  onClick={() => setShowBookmarksOnly(false)}
                  className="px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                  style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
                >
                  بینینی هەموو سورەکان
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* ============================================ */}
      {/* بینینی سورەی چالاک */}
      {/* ============================================ */}
      {activeSurah && (
        <>
          {/* کۆنترۆڵەکان */}
          <div 
            className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-3xl border shadow-sm sticky top-20 z-30 backdrop-blur-md"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
          >
            <button
              type="button"
              onClick={handleBackToSurahs}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer active:scale-95"
              style={{ 
                backgroundColor: 'var(--bg-chip)', 
                borderColor: 'var(--border-theme)',
                color: 'var(--text-main)'
              }}
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span className="font-naskh">گەڕانەوە</span>
            </button>

            <div className="text-center hidden sm:flex flex-col items-center flex-1">
              <h3 
                className="font-bold text-sm font-naskh truncate flex items-center gap-1.5"
                style={{ color: 'var(--color-gold)' }}
              >
                <Gem className="w-3.5 h-3.5" />
                {activeSurah.nameAr} • {activeSurah.nameKu}
              </h3>
              <p className="text-[10px] text-(--text-muted) font-kurdish flex items-center gap-1.5">
                <Layers className="w-2.5 h-2.5" />
                {activeSurah.numberOfAyahs} ئایەت • 
                {activeSurah.revelationType === 'Meccan' ? (
                  <><MoonStar className="w-2.5 h-2.5 inline" /> مەککی</>
                ) : (
                  <><Sun className="w-2.5 h-2.5 inline" /> مەدەنی</>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayFullSurah}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm ${
                  isPlayingAll ? 'animate-pulse' : ''
                }`}
                style={
                  isPlayingAll 
                    ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
                    : { backgroundColor: 'var(--color-gold-muted)', color: 'var(--color-gold)' }
                }
              >
                {isPlayingAll ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                <span className="font-naskh hidden sm:inline">
                  {isPlayingAll ? 'وەستاندن' : 'گوێگرتن'}
                </span>
              </button>

              <div 
                className="flex items-center rounded-2xl border px-1 py-0.5 text-xs"
                style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
              >
                <button
                  type="button"
                  onClick={() => setFontSize(Math.max(18, fontSize - 2))}
                  disabled={fontSize <= 18}
                  className="px-2 py-1 text-xs font-bold text-(--text-muted) hover:text-(--text-main) disabled:opacity-30 cursor-pointer flex items-center gap-0.5"
                >
                  <Type className="w-3 h-3" />
                  <span>-</span>
                </button>
                <span className="w-px h-3.5 bg-(--border-theme)" />
                <button
                  type="button"
                  onClick={() => setFontSize(Math.min(40, fontSize + 2))}
                  disabled={fontSize >= 40}
                  className="px-2 py-1 text-xs font-bold text-(--color-gold) disabled:opacity-30 cursor-pointer flex items-center gap-0.5"
                >
                  <Type className="w-3 h-3" />
                  <span>+</span>
                </button>
              </div>
            </div>
          </div>

          {/* کارتی سەرەوەی سورە */}
          <div 
            className="p-6 sm:p-8 rounded-3xl border text-center space-y-4 shadow-lg relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, var(--color-gold-muted) 0%, var(--bg-card) 100%)',
              borderColor: 'var(--color-gold)'
            }}
          >
            <div 
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: 'var(--color-gold)' }}
            />

            <div className="relative z-10 space-y-3">
              <div className="flex justify-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                >
                  <QuranIcon size={38} className="text-[#031F3C]" />
                  <Crown className="w-4 h-4 text-[#031F3C] absolute -top-1 -right-1 opacity-70" />
                </div>
              </div>

              <h1 
                className="text-3xl sm:text-4xl font-bold font-naskh"
                style={{ color: 'var(--color-gold)' }}
              >
                {activeSurah.nameAr}
              </h1>

              <p className="text-sm text-(--text-muted) font-kurdish flex items-center justify-center gap-2 flex-wrap">
                <span>{activeSurah.nameKu}</span>
                <span className="text-(--color-gold)">•</span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {activeSurah.numberOfAyahs} ئایەت
                </span>
                <span className="text-(--color-gold)">•</span>
                <span className="flex items-center gap-1">
                  {activeSurah.revelationType === 'Meccan' ? (
                    <><MoonStar className="w-3 h-3" /> مەککی</>
                  ) : (
                    <><Sun className="w-3 h-3" /> مەدەنی</>
                  )}
                </span>
              </p>

              {activeSurah.number !== 9 && (
                <div className="pt-4 border-t border-(--border-theme) max-w-md mx-auto">
                  <p 
                    className="font-quran-verse text-2xl sm:text-3xl"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* لیستی ئایەتەکان */}
          {isLoadingVerses ? (
            <div className="py-20 text-center space-y-3">
              <div 
                className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                style={{ 
                  borderColor: 'var(--color-gold)', 
                  borderTopColor: 'transparent' 
                }}
              />
              <p className="text-sm text-(--text-muted) font-kurdish flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-(--color-gold)" />
                بارکردنی ئایەتەکان...
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {verses.map((ayah, idx) => {
                const isPlaying = playingAyahIndex === idx;
                const isBookmarked = bookmarks.includes(`${activeSurah.number}:${ayah.numberInSurah}`);
                const isCopied = copiedAyah === ayah.numberInSurah;

                return (
                  <div
                    key={ayah.numberInSurah}
                    className="p-5 rounded-3xl border transition-all shadow-sm"
                    style={{
                      backgroundColor: isPlaying ? 'var(--color-gold-muted)' : 'var(--bg-card)',
                      borderColor: isPlaying ? 'var(--color-gold)' : 'var(--border-theme)'
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-(--border-theme) flex-wrap">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 relative"
                          style={{ 
                            backgroundColor: 'var(--color-gold-muted)',
                            border: '1.5px solid var(--color-gold)'
                          }}
                        >
                          <QuranIcon size={22} className="text-(--color-gold)" />
                          <span 
                            className="text-[8px] font-bold font-mono absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ 
                              backgroundColor: 'var(--color-gold)', 
                              color: '#031F3C',
                              border: '1px solid var(--bg-card)'
                            }}
                          >
                            {ayah.numberInSurah}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-(--text-muted) font-kurdish font-bold flex items-center gap-1">
                            <Award className="w-2.5 h-2.5" />
                            {activeSurah.nameKu}
                          </span>
                          <span className="text-[10px] text-(--text-muted) font-kurdish">
                            ئایەتی {ayah.numberInSurah}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {ayah.audioUrl && (
                          <button
                            type="button"
                            onClick={() => playAyahAudio(idx)}
                            className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                              isPlaying 
                                ? 'bg-(--color-gold) text-slate-950' 
                                : 'hover:bg-white/10 text-(--text-muted)'
                            }`}
                            style={{ 
                              backgroundColor: isPlaying ? 'var(--color-gold)' : 'var(--bg-chip)' 
                            }}
                            title={isPlaying ? 'وەستاندن' : 'گوێگرتن'}
                          >
                            {isPlaying ? (
                              <VolumeX className="w-3.5 h-3.5" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleCopyAyah(ayah, activeSurah)}
                          className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/10 text-(--text-muted)"
                          style={{ backgroundColor: 'var(--bg-chip)' }}
                          title="کۆپی"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShareAyah(ayah, activeSurah)}
                          className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/10 text-(--text-muted)"
                          style={{ backgroundColor: 'var(--bg-chip)' }}
                          title="هاوبەشکردن"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleBookmark(activeSurah.number, ayah.numberInSurah)}
                          className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95"
                          style={{ 
                            backgroundColor: 'var(--bg-chip)',
                            color: isBookmarked ? 'var(--color-gold)' : 'var(--text-muted)'
                          }}
                          title={isBookmarked ? 'لە دڵخوازەکان لابە' : 'نیشان بکە'}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div 
                      className="font-quran-verse text-end text-(--text-main) leading-loose py-3 select-text"
                      style={{ fontSize: `${fontSize}px`, lineHeight: '2.2' }}
                    >
                      {ayah.textAr}
                      <span 
                        className="inline-flex items-center justify-center w-9 h-9 mx-2 rounded-full border-2 text-xs font-mono font-bold align-middle"
                        style={{ 
                          borderColor: 'var(--color-gold)', 
                          color: 'var(--color-gold)',
                          backgroundColor: 'var(--color-gold-muted)'
                        }}
                      >
                        {ayah.numberInSurah}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-dashed border-(--border-theme) space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-(--color-gold)" />
                        <span 
                          className="text-[10px] font-bold font-kurdish"
                          style={{ color: 'var(--color-gold)' }}
                        >
                          تەفسیر:
                        </span>
                      </div>
                      <p 
                        className="text-sm font-medium leading-relaxed"
                        style={{ 
                          color: 'var(--text-main)', 
                          fontSize: `${Math.max(13, fontSize * 0.55)}px` 
                        }}
                      >
                        {ayah.translationKu}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={handleBackToSurahs}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer active:scale-95"
              style={{ 
                backgroundColor: 'var(--bg-card)', 
                borderColor: 'var(--border-theme)',
                color: 'var(--text-main)'
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              <QuranIcon size={14} className="text-(--color-gold)" />
              <span className="font-naskh">گەڕانەوە بۆ لیستی سورەکان</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};