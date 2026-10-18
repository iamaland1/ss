/**
 * بەشی پەیام و ڕاگەیاندنەکانی ئەپ.
 */
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Bell, 
  Pin, 
  Share2, 
  Check, 
  Sparkles, 
  Flame, 
  Clock, 
  Info,
  AlertCircle,
  MessageSquare,
  BookOpen,
  Search,
  X,
  Inbox,
  ChevronDown
} from 'lucide-react';
import { Announcement, Language } from '../types';
import { translations } from '../data/translations';

interface MessagesViewProps {
  lang: Language;
  announcements: Announcement[];
}

type CategoryKey = 'all' | 'friday' | 'hadith' | 'announcement' | 'update';

export const MessagesView: React.FC<MessagesViewProps> = ({
  lang,
  announcements,
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ckb' || lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_msg_read_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // پاشەکەوتکردنی خوێندنەوەکان
  useEffect(() => {
    try {
      localStorage.setItem('sirat_msg_read_ids', JSON.stringify(readIds));
    } catch {}
  }, [readIds]);

  // ===== پۆلەکان =====
  const categories: { key: CategoryKey; label: string; icon: any }[] = [
    { key: 'all', label: 'هەموو پەیامەکان', icon: MessageSquare },
    { key: 'friday', label: 'ڕۆژی جومعە', icon: Sparkles },
    { key: 'hadith', label: 'فەرموودە', icon: BookOpen },
    { key: 'announcement', label: 'ئاگاداری گشتی', icon: Info },
    { key: 'update', label: 'نوێکردنەوە', icon: Flame },
  ];

  // ===== ئامارەکان =====
  const stats = useMemo(() => {
    return {
      total: announcements.length,
      pinned: announcements.filter(a => a.isPinned).length,
      urgent: announcements.filter(a => a.priority === 'urgent').length,
      friday: announcements.filter(a => a.category === 'friday').length,
      unread: announcements.filter(a => !readIds.includes(a.id)).length,
    };
  }, [announcements, readIds]);

  // ===== فلتەرکردن =====
  const filteredAnnouncements = useMemo(() => {
    let list = selectedCategory === 'all'
      ? announcements
      : announcements.filter(item => item.category === selectedCategory);

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.message.toLowerCase().includes(q) ||
        (a.author || '').toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
      if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [announcements, selectedCategory, searchQuery]);

  // ===== کاتی زیرەکانە =====
  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffHour = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHour / 24);

      if (diffMin < 1) return 'ئێستا';
      if (diffMin < 60) return `${diffMin} خولەک لەمەوبەر`;
      if (diffHour < 24) return `${diffHour} کاتژمێر لەمەوبەر`;
      if (diffDay < 7) return `${diffDay} ڕۆژ لەمەوبەر`;

      const locale = lang === 'ckb' ? 'ku' : lang === 'ar' ? 'ar' : 'en';
      return d.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  // ===== هاوبەشکردن =====
  const handleShare = async (item: Announcement) => {
    const textToCopy = `${item.title}\n\n${item.message}\n\n— لە بەرنامەی سیراتەوە (Sirat)`;

    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text: textToCopy });
        return;
      } catch {}
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {}
    }
  };

  // ===== نیشانکردن وەک خوێندراو =====
  const toggleRead = (id: string) => {
    setReadIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div 
      className="w-full max-w-md mx-auto min-h-screen text-(--text-main) font-kurdish pb-28 relative space-y-5"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ============ ناونیشان ============ */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner shrink-0 relative"
            style={{ backgroundColor: 'var(--bg-icon-tile)' }}
          >
            <Bell className="w-6 h-6 text-(--color-gold)" />
            {stats.unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md ring-2 ring-(--bg-card)">
                {stats.unread > 9 ? '9+' : stats.unread}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-naskh tracking-tight text-(--text-main)">
              پەیام و ڕاگەیاندنەکان
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              هەموو پەیام و ئاگادارییە گرنگەکانی سیرات
            </p>
          </div>
        </div>
      </div>

      {/* ============ ئامارەکان ============ */}
      <div className="grid grid-cols-4 gap-2">
        <div 
          className="p-3 rounded-2xl border text-center"
          style={{ 
            backgroundColor: 'var(--color-gold-muted)', 
            borderColor: 'rgba(242, 201, 76, 0.3)' 
          }}
        >
          <Inbox className="w-4 h-4 text-(--color-gold) mx-auto mb-1" />
          <span 
            className="text-lg font-black font-mono block leading-none"
            style={{ color: 'var(--color-gold)' }}
          >
            {stats.total}
          </span>
          <span className="text-[9px] text-(--text-muted) font-kurdish font-bold mt-0.5 block">
            کۆی پەیام
          </span>
        </div>

        <div 
          className="p-3 rounded-2xl border text-center"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <Pin className="w-4 h-4 text-(--color-gold) rotate-45 mx-auto mb-1" />
          <span className="text-lg font-black font-mono block leading-none text-(--text-main)">
            {stats.pinned}
          </span>
          <span className="text-[9px] text-(--text-muted) font-kurdish font-bold mt-0.5 block">
            چەسپێنراو
          </span>
        </div>

        <div 
          className="p-3 rounded-2xl border text-center"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <AlertCircle className="w-4 h-4 text-rose-400 mx-auto mb-1" />
          <span className="text-lg font-black font-mono block leading-none text-rose-400">
            {stats.urgent}
          </span>
          <span className="text-[9px] text-(--text-muted) font-kurdish font-bold mt-0.5 block">
            بەپەلە
          </span>
        </div>

        <div 
          className="p-3 rounded-2xl border text-center"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <Sparkles className="w-4 h-4 text-(--color-teal) mx-auto mb-1" />
          <span className="text-lg font-black font-mono block leading-none text-(--color-teal)">
            {stats.friday}
          </span>
          <span className="text-[9px] text-(--text-muted) font-kurdish font-bold mt-0.5 block">
            جومعە
          </span>
        </div>
      </div>

      {/* ============ گەڕان ============ */}
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
          placeholder="گەڕان لە نێو پەیامەکان..."
          className="w-full bg-transparent text-xs text-(--text-main) placeholder-(--text-muted) outline-none font-kurdish"
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

      {/* ============ فلتەر تابەکان ============ */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = selectedCategory === c.key;
          const count = c.key === 'all' 
            ? stats.total 
            : announcements.filter(a => a.category === c.key).length;

          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedCategory(c.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 border ${
                isActive
                  ? 'shadow-md scale-[1.02]'
                  : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={
                isActive
                  ? { 
                      backgroundColor: 'var(--color-gold)', 
                      color: '#031F3C', 
                      borderColor: 'var(--color-gold)' 
                    }
                  : { backgroundColor: 'var(--bg-chip)' }
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="font-naskh">{c.label}</span>
              {count > 0 && (
                <span 
                  className={`text-[10px] px-1.5 rounded-full font-mono ${
                    isActive ? 'bg-black/20' : 'bg-white/10'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ============ لیستی پەیامەکان ============ */}
      {filteredAnnouncements.length === 0 ? (
        <div 
          className="p-8 rounded-3xl border text-center space-y-3 shadow-sm"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <div 
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-inner"
            style={{ backgroundColor: 'var(--bg-icon-tile)' }}
          >
            <Bell className="w-8 h-8 text-(--color-gold) opacity-70" />
          </div>
          <h4 className="text-base font-bold text-(--text-main) font-naskh">
            {searchQuery ? 'هیچ پەیامێک نەدۆزرایەوە' : 'هیچ پەیامێک نییە'}
          </h4>
          <p className="text-xs text-(--text-muted) max-w-xs mx-auto font-kurdish">
            {searchQuery 
              ? 'تکایە وشەیەکی تر تاقی بکەرەوە' 
              : 'لەم پۆلەدا هێشتا هیچ پەیامێک نەنێردراوە'}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95"
              style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
            >
              پاککردنەوەی گەڕان
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredAnnouncements.map((item) => {
            const isFriday = item.category === 'friday';
            const isUrgent = item.priority === 'urgent';
            const isPinned = item.isPinned;
            const isCopied = copiedId === item.id;
            const isRead = readIds.includes(item.id);
            const isExpanded = expandedId === item.id;
            const isLong = item.message.length > 180;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isRead) toggleRead(item.id);
                  setExpandedId(isExpanded ? null : item.id);
                }}
                className="p-4 rounded-3xl border transition-all relative overflow-hidden shadow-lg cursor-pointer"
                style={{
                  backgroundColor: isPinned 
                    ? 'var(--color-gold-muted)' 
                    : isUrgent 
                    ? 'rgba(244, 63, 94, 0.06)' 
                    : 'var(--bg-card)',
                  borderColor: isPinned 
                    ? 'var(--color-gold)' 
                    : isUrgent 
                    ? 'rgba(244, 63, 94, 0.4)' 
                    : 'var(--border-theme)'
                }}
              >
                {/* خاڵی نەخوێندراو */}
                {!isRead && (
                  <span 
                    className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full"
                    style={{ 
                      backgroundColor: 'var(--color-gold)',
                      boxShadow: '0 0 8px var(--color-gold)' 
                    }}
                  />
                )}

                {/* ===== سەرەوەی کارت ===== */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-(--border-theme) flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {isPinned && (
                      <span 
                        className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm"
                        style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
                      >
                        <Pin className="w-3 h-3 rotate-45" />
                        <span className="font-kurdish">چەسپێنراو</span>
                      </span>
                    )}

                    {isFriday && (
                      <span 
                        className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ 
                          backgroundColor: 'var(--color-gold-muted)', 
                          color: 'var(--color-gold)',
                          border: '1px solid var(--color-gold)'
                        }}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span className="font-kurdish">جومعە</span>
                      </span>
                    )}

                    {isUrgent && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                        <AlertCircle className="w-3 h-3" />
                        <span className="font-kurdish">بەپەلە</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-(--text-muted) font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(item.createdAt)}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item);
                      }}
                      className="w-7 h-7 rounded-xl flex items-center justify-center text-(--text-muted) hover:text-(--color-gold) transition-colors cursor-pointer active:scale-95"
                      style={{ backgroundColor: 'var(--bg-icon-tile)' }}
                      title="هاوبەشکردن"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ===== ناونیشان ===== */}
                <h3 className="font-bold text-sm text-(--text-main) font-naskh mb-2">
                  {item.title}
                </h3>

                {/* ===== دەقی پەیام ===== */}
                <p 
                  className={`text-[11px] text-(--text-muted) leading-relaxed whitespace-pre-line font-kurdish ${
                    !isExpanded && isLong ? 'line-clamp-3' : ''
                  }`}
                >
                  {item.message}
                </p>

                {/* ===== زیاتر/کەمتر ===== */}
                {isLong && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(isExpanded ? null : item.id);
                    }}
                    className="mt-2 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    <ChevronDown 
                      className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    />
                    <span className="font-kurdish">{isExpanded ? 'کەمتر' : 'زیاتر بخوێنەرەوە'}</span>
                  </button>
                )}

                {/* ===== ناوی نێردەر ===== */}
                <div className="pt-2 mt-2 border-t border-(--border-theme) flex items-center justify-between">
                  <span className="text-[10px] text-(--text-muted) font-kurdish font-medium">
                    {item.author || 'بەڕێوەبەری سیرات'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};