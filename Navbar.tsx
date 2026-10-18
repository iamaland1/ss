/**
 * شریتی سەرەوە: ناسنامەی سیرات، گۆڕینی زمان و ڕووکار، ئاگادارکردنەوەکان و دەستگەیشتن بە ڕێکخستنەکان.
 */
import React, { useState } from 'react';
import { 
  Moon, 
  Sun, 
  Globe, 
  Settings, 
  Bell, 
  Volume2, 
  VolumeX,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { Language, TabType, Announcement } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentTab: TabType;
  setTab: (tab: TabType) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onOpenSettings: () => void;
  pinnedAnnouncement: Announcement | null;
  isPlayingAzan: boolean;
  stopAzan: () => void;
  unreadMessagesCount: number;
}

const LANG_NAMES = {
  ckb: 'کوردی',
  ar: 'العربية',
  en: 'English',
};

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setTab,
  lang,
  setLang,
  isDark,
  toggleTheme,
  onOpenSettings,
  pinnedAnnouncement,
  isPlayingAzan,
  stopAzan,
  unreadMessagesCount
}) => {
  const t = translations[lang];
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header 
      className="sticky top-0 z-40 backdrop-blur-xl transition-all shadow-sm"
      style={{ 
        backgroundColor: isDark ? 'rgba(3, 31, 60, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid var(--border-theme)'
      }}
    >
      {/* ===== شریتی سەرەوە بۆ پەیامی چەسپێنراو ===== */}
      {pinnedAnnouncement && (
        <div
          onClick={() => setTab('messages')}
          className="w-full px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer transition-all hover:opacity-90"
          style={{ 
            background: 'linear-gradient(90deg, #F2C94C 0%, #E5B834 50%, #D4A51E 100%)',
            color: '#031F3C'
          }}
        >
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0"
              style={{ backgroundColor: '#031F3C', color: '#F2C94C' }}
            >
              {pinnedAnnouncement.category === 'friday' ? '✨ جومعە' : '📢 گرنگ'}
            </span>
            <span className="font-bold truncate">{pinnedAnnouncement.title}</span>
            <span className="hidden sm:inline opacity-80 truncate">- {pinnedAnnouncement.message}</span>
          </div>
          <span className="text-[11px] underline font-bold shrink-0">
            {t.readMore || 'زیاتر بخوێنەرەوە'}
          </span>
        </div>
      )}

      {/* ===== شریتی سەرەکی ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-17 flex items-center justify-between gap-4">
        
        {/* لۆگۆ و ناو */}
        <div 
          onClick={() => setTab('prayer')}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 overflow-hidden border-2"
            style={{ 
              borderColor: 'var(--color-gold)',
              boxShadow: '0 4px 20px -2px rgba(242, 201, 76, 0.4)'
            }}
          >
            <img 
              src="/sirat-logo.png" 
              alt="Sirat Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-(--text-main) font-naskh">
              {t.appName || 'سیرات'}
            </span>
            <span className="text-[10px] text-(--text-muted) font-kurdish">
              السلام و علیکم
            </span>
          </div>
        </div>

        {/* ===== دوگمەکانی سەرەکی (Desktop) ===== */}
        <div className="hidden md:flex items-center gap-1.5">
          {isPlayingAzan && (
            <button
              onClick={stopAzan}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold animate-pulse shadow-md transition-all cursor-pointer"
              style={{ backgroundColor: '#F2C94C', color: '#031F3C' }}
            >
              <VolumeX className="w-4 h-4" />
              <span>{t.stopAzan || 'وەستاندن'}</span>
            </button>
          )}

          <button
            onClick={() => setTab('messages')}
            className={`relative p-2.5 rounded-xl transition-all cursor-pointer ${
              currentTab === 'messages'
                ? 'text-(--color-gold) bg-(--color-gold-muted)'
                : 'text-(--text-muted) hover:text-(--color-gold) hover:bg-(--bg-chip)'
            }`}
            title={t.navMessages || 'پەیامەکان'}
          >
            <Bell className="w-5 h-5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md border-2 border-(--bg-card)">
                {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 p-2.5 rounded-xl text-(--text-muted) hover:text-(--color-gold) hover:bg-(--bg-chip) transition-all cursor-pointer"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold uppercase">{LANG_NAMES[lang]}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                <div 
                  className="absolute inset-e-0 top-full mt-2 w-40 rounded-2xl shadow-2xl border py-1.5 z-50 overflow-hidden animate-fadeIn"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
                >
                  {(['ckb', 'ar', 'en'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setShowLangMenu(false); }}
                      className={`w-full text-start px-4 py-2.5 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        lang === l ? '' : 'hover:bg-(--bg-chip)'
                      }`}
                      style={lang === l ? { color: 'var(--color-gold)', backgroundColor: 'var(--color-gold-muted)' } : { color: 'var(--text-main)' }}
                    >
                      <span>{LANG_NAMES[l]}</span>
                      {lang === l && <span className="text-(--color-gold)">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-(--text-muted) hover:text-(--color-gold) hover:bg-(--bg-chip) transition-all cursor-pointer"
            title={isDark ? 'دۆخی ڕووناک' : 'دۆخی تاریک'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setTab('settings')}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              currentTab === 'settings' 
                ? 'text-(--color-gold) bg-(--color-gold-muted)' 
                : 'text-(--text-muted) hover:text-(--color-gold) hover:bg-(--bg-chip)'
            }`}
            title={t.navSettings || 'ڕێکخستن'}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* ===== دوگمەی مێنیو بۆ مۆبایل ===== */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2.5 rounded-xl text-(--text-muted) hover:text-(--color-gold) hover:bg-(--bg-chip) transition-all cursor-pointer"
        >
          {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ===== مێنیوی مۆبایل ===== */}
      {showMobileMenu && (
        <div 
          className="md:hidden border-t px-4 py-3 space-y-2 animate-fadeIn"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          {isPlayingAzan && (
            <button
              onClick={() => { stopAzan(); setShowMobileMenu(false); }}
              className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-bold animate-pulse shadow-md"
              style={{ backgroundColor: '#F2C94C', color: '#031F3C' }}
            >
              <VolumeX className="w-4 h-4" />
              <span>{t.stopAzan || 'وەستاندنی بانگ'}</span>
            </button>
          )}

          <button
            onClick={() => { setTab('messages'); setShowMobileMenu(false); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ backgroundColor: 'var(--bg-chip)', color: 'var(--text-main)' }}
          >
            <Bell className="w-5 h-5 text-(--color-gold)" />
            <span className="flex-1 text-start">{t.navMessages || 'پەیامەکان'}</span>
            {unreadMessagesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { setTab('settings'); setShowMobileMenu(false); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ backgroundColor: 'var(--bg-chip)', color: 'var(--text-main)' }}
          >
            <Settings className="w-5 h-5 text-(--color-gold)" />
            <span className="flex-1 text-start">{t.navSettings || 'ڕێکخستن'}</span>
          </button>

          <div className="pt-2 border-t" style={{ borderColor: 'var(--border-theme)' }}>
            <p className="text-[10px] text-(--text-muted) mb-2 font-kurdish">زمان</p>
            <div className="grid grid-cols-3 gap-2">
              {(['ckb', 'ar', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setShowMobileMenu(false); }}
                  className="py-2 rounded-xl text-xs font-bold transition-all"
                  style={
                    lang === l
                      ? { backgroundColor: 'var(--color-gold)', color: '#031F3C' }
                      : { backgroundColor: 'var(--bg-chip)', color: 'var(--text-muted)' }
                  }
                >
                  {LANG_NAMES[l]}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { toggleTheme(); setShowMobileMenu(false); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ backgroundColor: 'var(--bg-chip)', color: 'var(--text-main)' }}
          >
            {isDark ? <Sun className="w-5 h-5 text-(--color-gold)" /> : <Moon className="w-5 h-5 text-(--color-gold)" />}
            <span className="flex-1 text-start">{isDark ? 'دۆخی ڕووناک' : 'دۆخی تاریک'}</span>
          </button>
        </div>
      )}
    </header>
  );
};