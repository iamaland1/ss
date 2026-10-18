/**
 * بەشی ناوە ئاینییەکان بۆ کچ و کوڕی موسڵمان.
 */
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Star, 
  Check, 
  Copy, 
  Share2, 
  Heart,
  Filter,
  Baby,
  BookOpen,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Info,
  User
} from 'lucide-react';
import { IslamicNameItem, Language } from '../types';
import { 
  ISLAMIC_NAMES, 
  NAMES_BY_GENDER,
  TOTAL_NAMES,
  TOTAL_BOYS,
  TOTAL_GIRLS,
  TOTAL_QURAN_NAMES
} from '../data/islamicNames';

interface IslamicNamesProps {
  lang: Language;
}

type GenderFilter = 'all' | 'boy' | 'girl';
type OriginFilter = 'all' | 'quran' | 'sahaba' | 'arabic' | 'persian';

export const IslamicNames: React.FC<IslamicNamesProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');
  const [originFilter, setOriginFilter] = useState<OriginFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_islamic_names_favs');
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
      localStorage.setItem('sirat_islamic_names_favs', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // ===== فلتەرکردن =====
  const filteredNames = useMemo(() => {
    let list = ISLAMIC_NAMES;

    // فلتەری جۆر
    if (genderFilter !== 'all') {
      list = list.filter(n => n.gender === genderFilter);
    }

    // فلتەری ڕەچەڵەک
    if (originFilter === 'quran') {
      list = list.filter(n => n.quranMentioned);
    } else if (originFilter === 'sahaba') {
      list = list.filter(n => n.sahabaOrFigure);
    } else if (originFilter === 'arabic') {
      list = list.filter(n => n.origin === 'عەرەبی');
    } else if (originFilter === 'persian') {
      list = list.filter(n => n.origin === 'فارسی');
    }

    // گەڕان
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(n =>
        n.nameAr.toLowerCase().includes(q) ||
        n.nameKu.toLowerCase().includes(q) ||
        n.transliteration.toLowerCase().includes(q) ||
        n.meaningKu.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [genderFilter, originFilter, searchQuery]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCopy = async (item: IslamicNameItem) => {
    const text = `${item.nameAr} (${item.nameKu})\n\nمانا: ${item.meaningKu}\n\nئەپی سیرات`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {}
    }
  };

  const handleShare = async (item: IslamicNameItem) => {
    const text = `${item.nameAr} (${item.nameKu})\n\nمانا: ${item.meaningKu}\n\nئەپی سیرات`;
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
            <Baby className="w-7 h-7 text-(--color-gold)" />
            <Sparkles className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
          </div>
          <div>
            <h1 
              className="text-2xl font-bold font-naskh tracking-tight"
              style={{ color: 'var(--color-gold)' }}
            >
              ناوە ئاینییەکان
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              ناوە جوانەکانی کچ و کوڕی موسڵمان
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
            <User className="w-4 h-4 text-(--color-gold)" />
            <span className="text-lg font-black font-mono" style={{ color: 'var(--color-gold)' }}>
              {TOTAL_NAMES}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
              کۆی ناوەکان
            </span>
          </div>

          <div 
            className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            <Award className="w-4 h-4 text-(--color-teal)" />
            <span className="text-lg font-black font-mono" style={{ color: 'var(--color-teal)' }}>
              {TOTAL_BOYS}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
              کوڕان
            </span>
          </div>

          <div 
            className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            <Heart className="w-4 h-4 text-(--color-gold)" />
            <span className="text-lg font-black font-mono" style={{ color: 'var(--color-gold)' }}>
              {TOTAL_GIRLS}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
              کچان
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
            placeholder="گەڕان بەپێی ناو یان مانا..."
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

      {/* ===== فلتەری جۆر ===== */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {[
          { key: 'all' as GenderFilter, label: 'هەموو', icon: User },
          { key: 'boy' as GenderFilter, label: 'کوڕان', icon: Award },
          { key: 'girl' as GenderFilter, label: 'کچان', icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = genderFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setGenderFilter(tab.key)}
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

      {/* ===== فلتەری ڕەچەڵەک ===== */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {[
          { key: 'all' as OriginFilter, label: 'هەموو' },
          { key: 'quran' as OriginFilter, label: 'قورئانی' },
          { key: 'sahaba' as OriginFilter, label: 'سەحابە' },
          { key: 'arabic' as OriginFilter, label: 'عەرەبی' },
          { key: 'persian' as OriginFilter, label: 'فارسی' },
        ].map((tab) => {
          const isActive = originFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setOriginFilter(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 active:scale-95 border ${
                isActive 
                  ? 'shadow-sm' 
                  : 'border-(--border-theme) text-(--text-muted) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={
                isActive
                  ? { backgroundColor: 'var(--color-gold-muted)', color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <Filter className="w-3 h-3" />
              <span className="font-naskh">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===== لیستی ناوەکان ===== */}
      {filteredNames.length === 0 ? (
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
            هیچ ناوێک نەدۆزرایەوە
          </h4>
          <p className="text-xs text-(--text-muted) font-kurdish">
            تکایە وشەیەکی تر تاقی بکەرەوە
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredNames.map((item) => {
            const isFav = favorites.includes(item.id);
            const isCopied = copiedId === item.id;
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-4 rounded-3xl border transition-all shadow-sm cursor-pointer hover:shadow-md"
                style={{
                  backgroundColor: isFav ? 'var(--color-gold-muted)' : 'var(--bg-card)',
                  borderColor: isFav ? 'var(--color-gold)' : 'var(--border-theme)'
                }}
              >
                {/* ===== سەرەوە ===== */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* ئایکۆنی جۆر */}
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ 
                        backgroundColor: item.gender === 'boy' ? 'var(--color-teal)' : 'var(--color-gold)',
                        color: '#031F3C'
                      }}
                    >
                      {item.gender === 'boy' ? (
                        <Award className="w-6 h-6 text-[#031F3C]" />
                      ) : (
                        <Heart className="w-6 h-6 text-[#031F3C] fill-current" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* ناوی عەرەبی + کوردی */}
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

                      {/* دەنگنووسین */}
                      <p className="text-[10px] text-(--text-muted) font-mono mt-0.5">
                        {item.transliteration}
                      </p>

                      {/* تاگەکان */}
                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        {item.quranMentioned && (
                          <span 
                            className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                            style={{ 
                              backgroundColor: 'var(--color-gold-muted)', 
                              color: 'var(--color-gold)',
                              border: '1px solid rgba(242, 201, 76, 0.3)'
                            }}
                          >
                            <BookOpen className="w-2.5 h-2.5" />
                            قورئان
                          </span>
                        )}
                        {item.sahabaOrFigure && (
                          <span 
                            className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                            style={{ 
                              backgroundColor: 'rgba(61, 190, 156, 0.15)', 
                              color: 'var(--color-teal)',
                              border: '1px solid rgba(61, 190, 156, 0.3)'
                            }}
                          >
                            <Award className="w-2.5 h-2.5" />
                            سەحابە
                          </span>
                        )}
                        <span 
                          className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{ 
                            backgroundColor: 'var(--bg-chip)', 
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border-theme)'
                          }}
                        >
                          {item.origin}
                        </span>
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

                {/* ===== مانا ===== */}
                <div className="mt-3 pt-3 border-t border-(--border-theme)">
                  <div className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-(--color-gold) shrink-0 mt-0.5" />
                    <p className="text-[11px] text-(--text-muted) leading-relaxed font-kurdish">
                      {item.meaningKu}
                    </p>
                  </div>
                </div>

                {/* ===== وردەکاری زیاتر ===== */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-dashed border-(--border-theme) space-y-2 animate-fadeIn">
                    <div 
                      className="p-3 rounded-2xl border"
                      style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3 h-3 text-(--color-gold)" />
                        <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-gold)' }}>
                          مانای عەرەبی:
                        </span>
                      </div>
                      <p className="text-[11px] text-(--text-main) font-naskh" dir="rtl">
                        {item.meaningAr}
                      </p>
                    </div>

                    {item.sahabaOrFigure && (
                      <div 
                        className="p-3 rounded-2xl border"
                        style={{ 
                          backgroundColor: 'rgba(61, 190, 156, 0.1)', 
                          borderColor: 'rgba(61, 190, 156, 0.3)' 
                        }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Award className="w-3 h-3 text-(--color-teal)" />
                          <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-teal)' }}>
                            کەسایەتی:
                          </span>
                        </div>
                        <p className="text-[11px] text-(--text-main) font-kurdish">
                          {item.sahabaOrFigure}
                        </p>
                      </div>
                    )}

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