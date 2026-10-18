/**
 * بەشی ناوە جوانەکانی خودای گەورە (أسماء الله الحسنى)
 */
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  Check, 
  Copy, 
  Share2, 
  Heart,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Info,
  Crown,
  Star,
  Hash,
  Zap,
  HeartHandshake,
  Brain,
  Power,
  Layers
} from 'lucide-react';
import { DivineNameItem, Language } from '../types';
import { 
  DIVINE_NAMES,
  TOTAL_DIVINE_NAMES,
  QURAN_MENTIONED_COUNT
} from '../data/divineNames';

interface DivineNamesViewProps {
  lang: Language;
}

type CategoryFilter = 'all' | 'mercy' | 'power' | 'knowledge' | 'creation' | 'kingship' | 'other';

export const DivineNamesView: React.FC<DivineNamesViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_divine_names_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sirat_divine_names_favs', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const filteredNames = useMemo(() => {
    let list = DIVINE_NAMES;

    if (categoryFilter !== 'all') {
      list = list.filter(n => n.category === categoryFilter);
    }

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
  }, [categoryFilter, searchQuery]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCopy = async (item: DivineNameItem) => {
    const text = `${item.nameAr} (${item.nameKu})\n\nمانا: ${item.meaningKu}\n\n${item.explanationKu}\n\nئەپی سیرات`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {}
    }
  };

  const handleShare = async (item: DivineNameItem) => {
    const text = `${item.nameAr} (${item.nameKu})\n\nمانا: ${item.meaningKu}\n\n${item.explanationKu}\n\nئەپی سیرات`;
    if (navigator.share) {
      try {
        await navigator.share({ title: item.nameAr, text });
        return;
      } catch {}
    }
    handleCopy(item);
  };

  const categories: { key: CategoryFilter; label: string; icon: any }[] = [
    { key: 'all', label: 'هەموو', icon: Layers },
    { key: 'mercy', label: 'بەزەیی', icon: HeartHandshake },
    { key: 'power', label: 'توانا', icon: Power },
    { key: 'knowledge', label: 'زانست', icon: Brain },
    { key: 'creation', label: 'دروستکردن', icon: Sparkles },
    { key: 'kingship', label: 'پاشایەتی', icon: Crown },
    { key: 'other', label: 'تر', icon: Star },
  ];

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
              ناوە جوانەکانی خودا
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              أسماء الله الحسنى • ٩٩ ناوی پیرۆز
            </p>
          </div>
        </div>

        {/* ئامارەکان */}
        <div className="grid grid-cols-2 gap-2 pt-2 relative z-10">
          <div 
            className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1"
            style={{ 
              backgroundColor: 'var(--color-gold-muted)', 
              borderColor: 'rgba(242, 201, 76, 0.25)' 
            }}
          >
            <Crown className="w-4 h-4 text-(--color-gold)" />
            <span className="text-lg font-black font-mono" style={{ color: 'var(--color-gold)' }}>
              {TOTAL_DIVINE_NAMES}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
              کۆی ناوەکان
            </span>
          </div>

          <div 
            className="p-3 rounded-2xl border text-center flex flex-col items-center gap-1"
            style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
          >
            <BookOpen className="w-4 h-4 text-(--color-teal)" />
            <span className="text-lg font-black font-mono" style={{ color: 'var(--color-teal)' }}>
              {QURAN_MENTIONED_COUNT}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish font-bold">
              لە قورئاندا
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

      {/* ===== فلتەری پۆل ===== */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = categoryFilter === cat.key;
          const count = cat.key === 'all' 
            ? TOTAL_DIVINE_NAMES 
            : DIVINE_NAMES.filter(n => n.category === cat.key).length;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategoryFilter(cat.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 border ${
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
              <span className={`text-[10px] px-1.5 rounded-full font-mono ${isActive ? 'bg-black/20' : 'bg-white/10'}`}>
                {count}
              </span>
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

                      {/* مانا */}
                      <p className="text-[11px] text-(--text-muted) leading-relaxed font-kurdish mt-1.5">
                        {item.meaningKu}
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
                        {item.tags.slice(0, 2).map((tag, i) => (
                          <span 
                            key={i}
                            className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                            style={{ 
                              backgroundColor: 'var(--bg-chip)', 
                              color: 'var(--text-muted)',
                              border: '1px solid var(--border-theme)'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
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

                {/* وردەکاری زیاتر */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-dashed border-(--border-theme) space-y-2 animate-fadeIn">
                    {/* ڕوونکردنەوە */}
                    <div 
                      className="p-3 rounded-2xl border"
                      style={{ 
                        backgroundColor: 'var(--color-gold-muted)', 
                        borderColor: 'rgba(242, 201, 76, 0.3)' 
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Info className="w-3 h-3 text-(--color-gold)" />
                        <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-gold)' }}>
                          ڕوونکردنەوە:
                        </span>
                      </div>
                      <p className="text-[11px] text-(--text-main) leading-relaxed font-kurdish">
                        {item.explanationKu}
                      </p>
                    </div>

                    {/* مانای عەرەبی */}
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

                    {/* ناوە پەیوەندیدارەکان */}
                    {item.relatedNames && item.relatedNames.length > 0 && (
                      <div 
                        className="p-3 rounded-2xl border"
                        style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <Zap className="w-3 h-3 text-(--color-teal)" />
                          <span className="text-[10px] font-bold font-kurdish" style={{ color: 'var(--color-teal)' }}>
                            ناوە پەیوەندیدارەکان:
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          {item.relatedNames.map((name, i) => (
                            <span 
                              key={i} 
                              className="text-[10px] px-2 py-0.5 rounded-full font-naskh font-bold"
                              style={{ 
                                backgroundColor: 'rgba(61, 190, 156, 0.15)', 
                                color: 'var(--color-teal)',
                                border: '1px solid rgba(61, 190, 156, 0.3)'
                              }}
                            >
                              {name}
                            </span>
                          ))}
                        </div>
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