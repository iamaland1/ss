/**
 * ڕێکخەری سەرەکی ئەپەکە.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home,
  BookOpen, 
  BookMarked,
  Sparkles, 
  HeartHandshake,
  Compass, 
  Calendar, 
  Bell, 
  Settings,
  Baby,
  Crown,
  Scale,
  Coins,
  Headphones,
  Camera,
  Map,
  Moon,
  Image as ImageIcon,
  Target,
  BarChart3,
  MapPin
} from 'lucide-react';
import { CityInfo, Language, TabType, Announcement, AppearanceMode, AppUsageStats } from './types';
import { CITIES } from './data/cities';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { PrayerTimesView } from './components/PrayerTimes';
import { QuranView } from './components/Quran';
import { QuranDuasView } from './components/QuranDuas';
import { TasbihView } from './components/TasbihView';
import { QiblaView } from './components/QiblaView';
import { ARQiblaView } from './components/ARQiblaView';
import { CalendarView } from './components/CalendarView';
import { MessagesView } from './components/MessagesView';
import { IslamicNames } from './components/IslamicNames';
import { ProphetsView } from './components/ProphetsView';
import { DivineNamesView } from './components/DivineNamesView';
import { InheritanceView } from './components/InheritanceView';
import { ZakatView } from './components/ZakatView';
import { HajjView } from './components/HajjView';
import { FastingView } from './components/FastingView';
import { ShareImageGenerator } from './components/ShareImageGenerator';
import { MyPlannerView } from './components/PlannerView';
import { AppStatsView } from './components/AppStatsView';
import { NearbyMosquesView } from './components/NearbyMosquesView';
import { QuranPlayerView } from './components/QuranPlayerView';
import { SettingsView } from './components/Settings';
import { AdminDashboard } from './components/AdminDashboard';
import { SettingsModal } from './components/SettingsModal';
import { SplashScreen } from './components/SplashScreen'; // <--- زیادکرا
import { fetchAnnouncements } from './services/announcementsService';
import { soundEffects } from './services/soundEffects';

const USAGE_STATS_STORAGE_KEY = 'sirat_app_usage_stats';

function getUsageDateKeys(date: Date) {
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const weekKey = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;
  return { dateKey, weekKey, monthKey: dateKey.slice(0, 7) };
}

function isAppUsageStats(value: unknown): value is AppUsageStats {
  if (!value || typeof value !== 'object') return false;
  const stats = value as Record<string, unknown>;
  const isUsageMap = (map: unknown) =>
    !!map &&
    typeof map === 'object' &&
    Object.values(map).every((seconds) => typeof seconds === 'number' && Number.isFinite(seconds));

  return (
    typeof stats.totalSeconds === 'number' &&
    Number.isFinite(stats.totalSeconds) &&
    isUsageMap(stats.dailyUsage) &&
    isUsageMap(stats.weeklyUsage) &&
    isUsageMap(stats.monthlyUsage)
  );
}

export default function App() {
  // ============================================
  // ١. دۆخی شاشەی پێشوەخت (Splash Screen)
  // ============================================
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // ============================================
  // ٢. دۆخی ڕێگای ئەدمین
  // ============================================
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.location.pathname === '/admin' ||
        window.location.pathname.startsWith('/admin') ||
        window.location.search.includes('admin') ||
        window.location.hash === '#admin'
      );
    }
    return false;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const isAdm = (
        window.location.pathname === '/admin' ||
        window.location.pathname.startsWith('/admin') ||
        window.location.search.includes('admin') ||
        window.location.hash === '#admin'
      );
      setIsAdminRoute(isAdm);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // ============================================
  // ٣. دۆخی ناڤیگەیشن
  // ============================================
  const [currentTab, setCurrentTab] = useState<TabType>('prayer');
  const [selectedCity, setSelectedCity] = useState<CityInfo>(CITIES[0]);
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sirat_language') as Language;
      if (saved === 'ckb' || saved === 'ar' || saved === 'en') return saved;
    } catch {}
    return 'ckb';
  });

  // ============================================
  // ٤. دۆخی ڕووکار
  // ============================================
  const [appearanceMode, setAppearanceMode] = useState<AppearanceMode>(() => {
    try {
      const saved = localStorage.getItem('sirat_appearance_mode') as AppearanceMode;
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch {}
    return 'dark';
  });
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPlayingAzan, setIsPlayingAzan] = useState(false);
  const [stats, setStats] = useState<AppUsageStats>(() => {
    try {
      const saved = localStorage.getItem(USAGE_STATS_STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (isAppUsageStats(parsed)) return parsed;
      }
    } catch {
      // Start fresh if browser storage is unavailable or contains invalid data.
    }
    return { totalSeconds: 0, dailyUsage: {}, weeklyUsage: {}, monthlyUsage: {} };
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      const { dateKey, weekKey, monthKey } = getUsageDateKeys(new Date());

      setStats((current) => {
        return {
          totalSeconds: current.totalSeconds + 15,
          dailyUsage: { ...current.dailyUsage, [dateKey]: (current.dailyUsage[dateKey] || 0) + 15 },
          weeklyUsage: { ...current.weeklyUsage, [weekKey]: (current.weeklyUsage[weekKey] || 0) + 15 },
          monthlyUsage: { ...current.monthlyUsage, [monthKey]: (current.monthlyUsage[monthKey] || 0) + 15 },
        };
      });
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(USAGE_STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Keep statistics in memory if browser storage is unavailable.
    }
  }, [stats]);

  // ============================================
  // ٥. دۆخی ڕێکخستنەکانی ئاگادارکردنەوە (بۆ Auto Adhan)
  // ============================================
  const [notificationSettings] = useState<{
    adhanSoundEnabled: boolean;
    selectedDefaultVoice: string;
  }>(() => {
    try {
      const saved = localStorage.getItem('sirat_notifications_config');
      return saved ? JSON.parse(saved) : { 
        adhanSoundEnabled: true, 
        selectedDefaultVoice: 'makkah' 
      };
    } catch {
      return { adhanSoundEnabled: true, selectedDefaultVoice: 'makkah' };
    }
  });

  // ============================================
  // ٦. پاشەکەوتکردنی زمان
  // ============================================
  useEffect(() => {
    try {
      localStorage.setItem('sirat_language', lang);
    } catch {}
  }, [lang]);

  // ============================================
  // ٧. ڕێکخستنی ڕووکار
  // ============================================
  useEffect(() => {
    try {
      localStorage.setItem('sirat_appearance_mode', appearanceMode);
    } catch {}

    const applyTheme = () => {
      let isDarkTheme = true;
      if (appearanceMode === 'dark') {
        isDarkTheme = true;
      } else if (appearanceMode === 'light') {
        isDarkTheme = false;
      } else {
        isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      setIsDark(isDarkTheme);
      if (isDarkTheme) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    };

    applyTheme();

    if (appearanceMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [appearanceMode]);

  // ============================================
  // ٨. پەیامەکان
  // ============================================
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [readMessageIds, setReadMessageIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sirat_read_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sirat_read_messages', JSON.stringify(readMessageIds));
    } catch {}
  }, [readMessageIds]);

  // ============================================
  // ٩. بارکردنی پەیامەکان
  // ============================================
  const loadAnnouncements = useCallback(() => {
    fetchAnnouncements().then(data => setAnnouncements(data));
  }, []);

  useEffect(() => {
    loadAnnouncements();
    const interval = setInterval(loadAnnouncements, 30000);
    return () => clearInterval(interval);
  }, [loadAnnouncements]);

  // ============================================
  // ١٠. RTL/LTR
  // ============================================
  useEffect(() => {
    const isRtl = lang === 'ckb' || lang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // ============================================
  // ١١. گۆڕینی تاب
  // ============================================
  const handleTabChange = useCallback((tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'messages') {
      const allIds = announcements.map(a => a.id);
      setReadMessageIds(allIds);
    }
  }, [announcements]);

  const t = translations[lang];

  // ============================================
  // ١٢. ناڤیگەیشنی Desktop
  // ============================================
  const desktopNavItems = [
    { key: 'prayer' as TabType, label: t.navHome || 'سەرەکی', icon: Home },
    { key: 'quran' as TabType, label: t.navQuran, icon: BookOpen },
    { key: 'audioQuran' as TabType, label: 'قورئانی دەنگی', icon: Headphones },
    { key: 'tasbih' as TabType, label: t.navTasbih, icon: BookMarked },
    { key: 'qibla' as TabType, label: t.navQibla, icon: Compass },
    { key: 'arQibla' as TabType, label: 'قیبلەی AR', icon: Camera },
    { key: 'nearbyMosques' as TabType, label: 'مزگەوتەکان', icon: MapPin },
    { key: 'adhkar' as TabType, label: t.navDua || 'دوعا', icon: HeartHandshake },
    { key: 'planner' as TabType, label: 'پلانەر', icon: Target },
    { key: 'stats' as TabType, label: 'ئامارەکان', icon: BarChart3 },
    { key: 'names' as TabType, label: 'ناوەکان', icon: Baby },
    { key: 'prophets' as TabType, label: 'پێغەمبەران', icon: Crown },
    { key: 'asma' as TabType, label: 'ناوەکانی خودا', icon: Sparkles },
    { key: 'mirath' as TabType, label: 'میرات', icon: Scale },
    { key: 'zakat' as TabType, label: 'زەکات', icon: Coins },
    { key: 'hajj' as TabType, label: 'حەج و عومرە', icon: Map },
    { key: 'fasting' as TabType, label: 'ڕۆژوو', icon: Moon },
    { key: 'shareImage' as TabType, label: 'وێنەی ئایەت', icon: ImageIcon },
    { key: 'calendar' as TabType, label: t.navCalendar, icon: Calendar },
    { key: 'messages' as TabType, label: t.navMessages, icon: Bell, badge: announcements.filter(a => !readMessageIds.includes(a.id)).length },
    { key: 'settings' as TabType, label: t.navSettings, icon: Settings },
  ];

  // ============================================
  // ١٣. ناڤیگەیشنی Mobile
  // ============================================
  const mobileNavTabs = [
    { key: 'prayer' as TabType, label: t.navHome || 'سەرەکی', icon: Home },
    { key: 'quran' as TabType, label: t.navQuran, icon: BookOpen },
    { key: 'audioQuran' as TabType, label: 'قورئانی دەنگی', icon: Headphones },
    { key: 'tasbih' as TabType, label: t.navTasbih, icon: BookMarked },
    { key: 'qibla' as TabType, label: t.navQibla, icon: Compass },
    { key: 'settings' as TabType, label: t.navSettings, icon: Settings },
  ];

  // ============================================
  // ١٤. شاشەی پێشوەخت (Splash Screen)
  // ============================================
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // ============================================
  // ١٥. ڕێگای ئەدمین
  // ============================================
  if (isAdminRoute) {
    return (
      <AdminDashboard
        lang={lang}
        announcements={announcements}
        onRefreshAnnouncements={loadAnnouncements}
        onExitToUserApp={() => {
          if (window.history.pushState) {
            window.history.pushState({}, '', '/');
          } else {
            window.location.pathname = '/';
          }
          setIsAdminRoute(false);
        }}
      />
    );
  }

  // ============================================
  // ١٦. ڕێندەرکردن
  // ============================================
  return (
    <div 
      className="min-h-screen flex flex-col islamic-pattern font-kurdish transition-colors"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-main)' }}
    >
      {/* AR Qibla - لە دەرەوەی main بۆ ئەوەی تەواوی شاشە بگرێت */}
      {currentTab === 'arQibla' && (
        <ARQiblaView lang={lang} selectedCity={selectedCity} />
      )}

      <Navbar
        currentTab={currentTab}
        setTab={handleTabChange}
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
        pinnedAnnouncement={announcements.find(a => a.isPinned) || null}
        isPlayingAzan={isPlayingAzan}
        stopAzan={() => {
          soundEffects.stopAzan();
          setIsPlayingAzan(false);
        }}
        unreadMessagesCount={announcements.filter(a => !readMessageIds.includes(a.id)).length}
      />

      {/* Desktop Navigation */}
      {currentTab !== 'arQibla' && (
        <div 
          className="hidden md:block border-b backdrop-blur-md sticky top-16 z-30 transition-colors"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-1 overflow-x-auto py-2">
            <div className="flex items-center gap-1">
              {desktopNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleTabChange(item.key)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? 'shadow-md scale-105'
                        : 'border-transparent text-(--text-muted) hover:border-(--color-gold) hover:text-(--color-gold) hover:bg-(--color-gold-muted)'
                    }`}
                    style={
                      isActive 
                        ? { 
                            backgroundColor: 'var(--color-gold)', 
                            color: '#031F3C',
                            borderColor: 'var(--color-gold)',
                            boxShadow: '0 4px 18px -2px rgba(242, 201, 76, 0.45)'
                          }
                        : undefined
                    }
                  >
                    <Icon className="w-4 h-4 transition-transform duration-200" />
                    <span className="font-naskh">{item.label}</span>
                    {item.badge && item.badge > 0 ? (
                      <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentTab !== 'arQibla' && (
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6 pb-24 md:pb-12">
          {currentTab === 'prayer' && (
            <PrayerTimesView
              lang={lang}
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
              isPlayingAzan={isPlayingAzan}
              setIsPlayingAzan={setIsPlayingAzan}
              onNavigate={handleTabChange}
              notificationSettings={notificationSettings}
            />
          )}

          {currentTab === 'quran' && <QuranView lang={lang} />}
          {currentTab === 'audioQuran' && <QuranPlayerView lang={lang} />}
          {currentTab === 'adhkar' && <QuranDuasView lang={lang} />}
          {currentTab === 'tasbih' && <TasbihView lang={lang} />}
          {currentTab === 'qibla' && <QiblaView lang={lang} selectedCity={selectedCity} onSelectCity={setSelectedCity} />}
          {currentTab === 'names' && <IslamicNames lang={lang} />}
          {currentTab === 'prophets' && <ProphetsView lang={lang} />}
          {currentTab === 'asma' && <DivineNamesView lang={lang} />}
          {currentTab === 'mirath' && <InheritanceView lang={lang} />}
          {currentTab === 'zakat' && <ZakatView lang={lang} />}
          {currentTab === 'hajj' && <HajjView lang={lang} />}
          {currentTab === 'fasting' && <FastingView lang={lang} />}
          {currentTab === 'shareImage' && <ShareImageGenerator lang={lang} />}
          {currentTab === 'planner' && <MyPlannerView lang={lang} />}
          {currentTab === 'stats' && <AppStatsView lang={lang} stats={stats} />}
          {currentTab === 'nearbyMosques' && <NearbyMosquesView lang={lang} />}
          {currentTab === 'calendar' && <CalendarView lang={lang} />}
          {currentTab === 'messages' && <MessagesView lang={lang} announcements={announcements} />}
          {currentTab === 'settings' && (
            <SettingsView
              lang={lang}
              setLang={setLang}
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
              appearanceMode={appearanceMode}
              setAppearanceMode={setAppearanceMode}
            />
          )}
        </main>
      )}

      {/* Mobile Bottom Navigation */}
      {currentTab !== 'arQibla' && (
        <nav 
          className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur-xl px-2 py-1 shadow-2xl safe-area-bottom"
          style={{ 
            backgroundColor: isDark ? '#01162B' : '#FFFFFF', 
            borderColor: 'var(--border-theme)' 
          }}
        >
          <div className="flex items-center justify-around max-w-md mx-auto">
            {mobileNavTabs.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.key;

              if (isActive) {
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleTabChange(item.key)}
                    className="relative flex flex-col items-center justify-center -mt-6 group transition-all duration-200 cursor-pointer min-w-14 sm:min-w-16"
                  >
                    <div 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 scale-105 nav-active-glow"
                      style={{
                        backgroundColor: 'var(--color-gold)',
                        color: '#031F3C',
                        boxShadow: '0 10px 28px -2px rgba(242, 201, 76, 0.65)',
                        border: `4px solid ${isDark ? '#031F3C' : '#F6F3EA'}`
                      }}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#031F3C] drop-shadow-sm transition-transform duration-200" />
                    </div>
                    <span 
                      className="text-[10px] mt-1 font-bold font-naskh transition-colors duration-200"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleTabChange(item.key)}
                  className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer min-h-12 min-w-12 group text-(--text-muted) hover:text-(--color-gold)"
                >
                  <div className="relative">
                    <Icon className="w-6 h-6 text-(--text-muted) group-hover:text-(--color-gold) group-hover:scale-110 transition-all duration-200" />
                  </div>
                  <span className="text-[10px] mt-0.5 font-naskh font-medium text-(--text-muted) group-hover:text-(--color-gold) transition-colors duration-200">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
        setLang={setLang}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        appearanceMode={appearanceMode}
        setAppearanceMode={setAppearanceMode}
      />
    </div>
  );
}