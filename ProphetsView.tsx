/**
 * بەشی پێغەمبەران - هەموو پێغەمبەرانی ئیسلام لەگەڵ تەمەن و موعجیزەکان.
 */
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Check, 
  Copy, 
  Share2, 
  Heart,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Info,
  User,
  Clock,
  MapPin,
  Star,
  Crown,
  Zap,
  Calendar,
  Hash,
  TrendingUp,
  Shield,
  Users
} from 'lucide-react';
import { ProphetItem, Language } from '../types';
import { 
  PROPHETS_DATA,
  TOTAL_PROPHETS,
  TOTAL_QURAN_PROPHETS,
  AVERAGE_AGE
} from '../data/prophets';

interface ProphetsViewProps {
  lang: Language;
}

type SortBy = 'order' | 'age' | 'name';

export const ProphetsView: React.FC<ProphetsViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('order');
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_prophets_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // پاشەکەوتکردنی دڵخوازەکان
  React.useEffect(() => {
    try {
      localStorage.setItem('sirat_prophets_favs', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // فلتەر و ڕێکخستن
  const filteredProphets = useMemo(() => {
    let list = [...PROPHETS_DATA];

    // گەڕان
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.nameAr.toLowerCase().includes(q) ||
        p.nameKu.toLowerCase().includes(q) ||
        p.transliteration.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.story.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // ڕێکخستن
    if (sortBy === 'age') {
      list.sort((a, b) => (b.age || 0) - (a.age || 0));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.nameKu.localeCompare(b.nameKu, 'ku'));
    }

    return list;
  }, [searchQuery, sortBy]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCopy = async (item: ProphetItem) => {
    const text = `${item.nameAr} (${item.nameKu})\n${item.title}\n\nتەمەن: ${item.ageNote || 'نەزانراوە'}\n\nموعجیزەکان:\n${item.miracles.map(m => `• ${m}`).join('\n')}\n\nئەپی سیرات`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {}
    }
  };

  const handleShare = async (item: ProphetItem) => {
    const text = `${item.nameAr} (${item.nameKu})\n${item.title}\n\nتەمەن: ${item.ageNote || 'نەزانراوە'}\n\nموعجیزەکان:\n${item.miracles.map(m => `• ${m}`).join('\n')}\n\nئەپی سیرات`;
    if (navigator.share) {
      try {
        await navigator.share({ title: item.nameAr, text });
        return;
      } catch {}
    }
    handleCopy(item);
  };

  return (
    <div 
      className="w-full max-w-2xl mx-auto space-y-5 animate-fadeIn pb-28 text-(--text-main) font-kurdish"
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
            <Crown className="w-7 h-7 text-(--color-gold)" />
            <Sparkles className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
          </div>
          <div>
            <h1 
              className="text-2xl font-bold font-naskh tracking-tight"
              style={{ color: 'var(--color-gold)' }}
            >
              پێغەمبەرانی خودا
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              لە ئادەمەوە بۆ موحەممەد ﷺ
            </p>
          </div>
        </div>

        {/* ئامارەکان */}
        <div className="grid grid-cols-3 gap-2 pt-2 relative z-10">
          <div 
            className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1"
            style={{ 
              backgroundColor: 'var(--color-gold-muted)', 
              borderColor: 'rgba(242, 201, 76, 0.25)' 
            }}
          >
            <Users className="w-4 h-4 text-(--color-gold)" />
            <span className="text-lg font-black font-mono" style={{ color: 'var(--color-gold)' }}>
              {TOTAL_PROPHETS}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
              کۆی پێغەمبەران
            </span>
          </div>

          <div 
            className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            <BookOpen className="w-4 h-4 text-(--color-teal)" />
            <span className="text-lg font-black font-mono" style={{ color: 'var(--color-teal)' }}>
              {TOTAL_QURAN_PROPHETS}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
              لە قورئاندا
            </span>
          </div>

          <div 
            className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            <TrendingUp className="w-4 h-4 text-(--color-gold)" />
            <span className="text-lg font-black font-mono" style={{ color: 'var(--color-gold)' }}>
              {AVERAGE_AGE}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
              تەمەنی ناوسەر
            </span>
          </div>
        </div>

        {/* گەڕان */}
        <div 
          className="rounded-2xl border px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm transition-all focus-within:border-(--color-gold) relative z-10"
          style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
        >
          <Search className="w-4 h-4 text-(--color-gold) shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="گەڕان بەپێی ناو یان موعجیزە..."
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
      </div>

      {/* ===== فلتەری ڕێکخستن ===== */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {[
          { key: 'order' as SortBy, label: 'ڕێکخستنی سروشتی', icon: Hash },
          { key: 'age' as SortBy, label: 'بەپێی تەمەن', icon: Clock },
          { key: 'name' as SortBy, label: 'بەپێی ناو', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = sortBy === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSortBy(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 border ${
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
              <span className="font-naskh">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===== لیستی پێغەمبەران ===== */}
      {filteredProphets.length === 0 ? (
        <div 
          className="p-12 rounded-3xl border text-center space-y-3"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <div 
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-inner"
            style={{ backgroundColor: 'var(--bg-chip)' }}
          >
            <Search className="w-8 h-8 text-(--color-gold) opacity-70" />
          </div>
          <h4 className="text-base font-bold text-(--text-main) font-naskh">
            هیچ پێغەمبەرێک نەدۆزرایەوە
          </h4>
          <p className="text-xs text-(--text-muted) font-kurdish">
            تکایە وشەیەکی تر تاقی بکەرەوە
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredProphets.map((item) => {
            const isFav = favorites.includes(item.id);
            const isCopied = copiedId === item.id;
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="p-4 rounded-3xl border transition-all shadow-sm cursor-pointer hover:shadow-md"
                style={{
                  backgroundColor: isFav ? 'var(--color-gold-muted)' : 'var(--bg-card)',
                  borderColor: isFav ? 'var(--color-gold)' : 'var(--border-theme)'
                }}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                {/* سەرەوە */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* ژمارە */}
                    <div 
                      className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm relative"
                      style={{ 
                        backgroundColor: 'var(--color-gold)',
                        color: '#031F3C'
                      }}
                    >
                      <Hash className="w-3 h-3 opacity-60 absolute top-1" />
                      <span className="font-bold text-sm font-mono mt-2">{item.id}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 
                          className="text-lg font-bold font-naskh"
                          style={{ color: 'var(--color-gold)' }}
                        >
                          {item.nameAr}
                        </h3>
                        <span className="text-sm font-bold text-(--text-main) font-naskh">
                          {item.nameKu}
                        </span>
                      </div>

                      <p className="text-[10px] text-(--text-muted) font-mono mt-0.5">
                        {item.transliteration}
                      </p>

                      {/* نازناو */}
                      <div className="mt-1.5">
                        <span 
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold font-naskh"
                          style={{ 
                            backgroundColor: 'var(--color-gold-muted)', 
                            color: 'var(--color-gold)',
                            border: '1px solid rgba(242, 201, 76, 0.3)'
                          }}
                        >
                          <Crown className="w-2.5 h-2.5" />
                          {item.title}
                        </span>
                      </div>

                      {/* تاگەکان */}
                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        <span 
                          className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{ 
                            backgroundColor: 'rgba(61, 190, 156, 0.15)', 
                            color: 'var(--color-teal)',
                            border: '1px solid rgba(61, 190, 156, 0.3)'
                          }}
                        >
                          <BookOpen className="w-2.5 h-2.5" />
                          {item.mentionedInQuran} جار لە قورئاندا
                        </span>
                        {item.age && (
                          <span 
                            className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                            style={{ 
                              backgroundColor: 'var(--bg-chip)', 
                              color: 'var(--text-muted)',
                              border: '1px solid var(--border-theme)'
                            }}
                          >
                            <Clock className="w-2.5 h-2.5" />
                            {item.age} ساڵ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* دوگمەکان */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95"
                      style={{ 
                        backgroundColor: 'var(--bg-chip)',
                        color: isFav ? 'var(--color-gold)' : 'var(--text-muted)'
                      }}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item);
                      }}
                      className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/10 text-(--text-muted)"
                      style={{ backgroundColor: 'var(--bg-chip)' }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item);
                      }}
                      className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:bg-white/10 text-(--text-muted)"
                      style={{ backgroundColor: 'var(--bg-chip)' }}
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* موعجیزەکان بە کورتە */}
                <div className="mt-3 pt-3 border-t border-(--border-theme)">
                  <div className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-(--color-gold) shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-gold)' }}>
                        موعجیزەی سەرەکی:
                      </span>
                      <p className="text-[11px] text-(--text-muted) leading-relaxed font-kurdish mt-0.5">
                        {item.miracles[0]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* وردەکاری زیاتر */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-dashed border-(--border-theme) space-y-3 animate-fadeIn">
                    {/* تەمەن و شوێن */}
                    <div className="grid grid-cols-2 gap-2">
                      {item.age && (
                        <div 
                          className="p-3 rounded-2xl border"
                          style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <Clock className="w-3 h-3 text-(--color-gold)" />
                            <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-gold)' }}>
                              تەمەن:
                            </span>
                          </div>
                          <p className="text-[11px] font-bold text-(--text-main) font-kurdish">
                            {item.ageNote || `${item.age} ساڵ`}
                          </p>
                        </div>
                      )}

                      <div 
                        className="p-3 rounded-2xl border"
                        style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <MapPin className="w-3 h-3 text-(--color-gold)" />
                          <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-gold)' }}>
                            نێردراوە بۆ:
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-(--text-main) font-kurdish">
                          {item.sentTo}
                        </p>
                      </div>
                    </div>

                    {/* شوێنی گۆڕ */}
                    {item.grave && (
                      <div 
                        className="p-3 rounded-2xl border"
                        style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <MapPin className="w-3 h-3 text-(--color-teal)" />
                          <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-teal)' }}>
                            شوێنی گۆڕ:
                          </span>
                        </div>
                        <p className="text-[11px] text-(--text-main) font-kurdish">
                          {item.grave}
                        </p>
                      </div>
                    )}

                    {/* موعجیزەکان */}
                    <div 
                      className="p-3 rounded-2xl border"
                      style={{ 
                        backgroundColor: 'var(--color-gold-muted)', 
                        borderColor: 'rgba(242, 201, 76, 0.3)' 
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <Zap className="w-3 h-3 text-(--color-gold)" />
                        <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-gold)' }}>
                          موعجیزەکان:
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {item.miracles.map((m, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-(--text-main) font-kurdish">
                            <Star className="w-2.5 h-2.5 text-(--color-gold) shrink-0 mt-1 fill-current" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* چیرۆک */}
                    <div 
                      className="p-3 rounded-2xl border"
                      style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Info className="w-3 h-3 text-(--color-gold)" />
                        <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-gold)' }}>
                          چیرۆکی کورت:
                        </span>
                      </div>
                      <p className="text-[11px] text-(--text-main) leading-relaxed font-kurdish">
                        {item.story}
                      </p>
                    </div>

                    {/* سوورەتەکان */}
                    {item.quranSurahs.length > 0 && (
                      <div 
                        className="p-3 rounded-2xl border"
                        style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <BookOpen className="w-3 h-3 text-(--color-teal)" />
                          <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-teal)' }}>
                            لەم سوورەتانەدا هاتووە:
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          {item.quranSurahs.map((surah, i) => (
                            <span 
                              key={i} 
                              className="text-[10px] px-2 py-0.5 rounded-full font-naskh font-bold"
                              style={{ 
                                backgroundColor: 'rgba(61, 190, 156, 0.15)', 
                                color: 'var(--color-teal)',
                                border: '1px solid rgba(61, 190, 156, 0.3)'
                              }}
                            >
                              {surah}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* داخستن */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-(--text-muted) font-kurdish">
                        کلیک بکە بۆ داخستن
                      </span>
                      <ChevronUp className="w-3.5 h-3.5 text-(--text-muted)" />
                    </div>
                  </div>
                )}

                {!isExpanded && (
                  <div className="flex items-center justify-end mt-2">
                    <ChevronDown className="w-3.5 h-3.5 text-(--text-muted)" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};