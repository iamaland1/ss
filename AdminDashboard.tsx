/**
 * داشبۆردی بەڕێوەبەر بۆ بەڕێوەبردنی ڕاگەیاندن و پەیامەکان.
 */
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  Lock, 
  Sparkles, 
  Pin, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Calendar,
  LogOut,
  ExternalLink,
  Eye,
  Smartphone,
  RefreshCw,
  Radio,
  Layers,
  ChevronLeft,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  BarChart3,
  Megaphone,
  Star,
  Zap,
  BookOpen,
  X
} from 'lucide-react';
import { Announcement, Language } from '../types';
import { translations } from '../data/translations';
import { 
  createAnnouncement, 
  deleteAnnouncement, 
  togglePinAnnouncement, 
  checkAdminPin,
  triggerNotification
} from '../services/announcementsService';

interface AdminDashboardProps {
  lang: Language;
  announcements: Announcement[];
  onRefreshAnnouncements: () => void;
  onExitToUserApp: () => void;
}

type AdminTab = 'dashboard' | 'compose' | 'messages' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  announcements,
  onRefreshAnnouncements,
  onExitToUserApp
}) => {
  const t = translations[lang];

  // ===== دۆخی چوونەژوورەوە =====
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sirat_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // ===== تابەکان =====
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // ===== فۆرمی پەیام =====
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'friday' | 'reminder' | 'hadith' | 'announcement' | 'update'>('friday');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');
  const [isPinned, setIsPinned] = useState(false);
  const [author, setAuthor] = useState('بەڕێوەبەری سیرات');
  const [isSending, setIsSending] = useState(false);
  const [successBanner, setSuccessBanner] = useState('');

  // ===== چوونەژوورەوە =====
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const ok = await checkAdminPin(pinInput.trim());
    if (ok) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('sirat_admin_auth', 'true');
    } else {
      setAuthError('کۆدی تێپەڕبوون هەڵەیە! تکایە کۆدی دروست بنووسە (کۆدی سەرەتایی: 1234)');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('sirat_admin_auth');
    setPinInput('');
  };

  // ===== قاڵبە ئامادەکراوەکان =====
  const handleApplyTemplate = (type: 'friday' | 'hadith' | 'update') => {
    if (type === 'friday') {
      setTitle('بیرخستنەوەی ڕۆژی جومعە');
      setMessage('زۆرکردنی دروود و سڵاوات لەسەر پێغەمبەری خودا ﷺ لەم ڕۆژە پیرۆزەدا و خوێندنی سوورەتی الکهف لەبیر مەکەن.');
      setCategory('friday');
      setPriority('urgent');
      setIsPinned(true);
    } else if (type === 'hadith') {
      setTitle('فەرموودەی پیرۆزی پێغەمبەر ﷺ');
      setMessage('قال رسول الله ﷺ: «مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ» (هەرکەس ڕێنوێنی خێر بکات، وەک خێرکەرەکە پاداشتی هەیە).');
      setCategory('hadith');
      setPriority('normal');
      setIsPinned(false);
    } else if (type === 'update') {
      setTitle('نوێکردنەوەی ئەپی سیرات');
      setMessage('وەشانێکی نوێی ئەپی سیرات بەردەستە کە کاتی بانگی شارەکان، قورئانی دەنگی و تەسبیحی تێدایە.');
      setCategory('update');
      setPriority('normal');
      setIsPinned(false);
    }
    setActiveTab('compose');
  };

  // ===== ناردنی پەیام =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSending(true);
    try {
      await createAnnouncement({
        title: title.trim(),
        message: message.trim(),
        category,
        priority,
        isPinned,
        author: author.trim() || 'بەڕێوەبەری سیرات'
      });

      triggerNotification(title, message);

      setSuccessBanner(t.messageSentSuccess);
      setTitle('');
      setMessage('');
      onRefreshAnnouncements();
      setTimeout(() => setSuccessBanner(''), 4500);
      setActiveTab('messages');
    } catch {
      // Handled silently
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('دڵنیایت لە سڕینەوەی ئەم پەیامە؟ بەکارهێنەران چیتر نایبینن.')) {
      await deleteAnnouncement(id);
      onRefreshAnnouncements();
    }
  };

  const handleTogglePin = async (id: string) => {
    await togglePinAnnouncement(id);
    onRefreshAnnouncements();
  };

  // ===== ئامارەکان =====
  const totalMessages = announcements.length;
  const pinnedCount = announcements.filter(a => a.isPinned).length;
  const urgentCount = announcements.filter(a => a.priority === 'urgent').length;
  const fridayCount = announcements.filter(a => a.category === 'friday').length;

  // ===== ئەگەر چوونەژوورەوە نەکرابێت =====
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#031F3C' }}>
        {/* پاشبنەمای ڕازاوە */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#F2C94C' }} />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#3DBE9C' }} />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div 
            className="rounded-3xl p-8 shadow-2xl space-y-6 text-center border-2"
            style={{ 
              backgroundColor: 'rgba(11, 26, 46, 0.95)', 
              borderColor: 'rgba(242, 201, 76, 0.3)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div 
              className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-xl relative"
              style={{ background: 'linear-gradient(135deg, #F2C94C 0%, #D4A51E 100%)' }}
            >
              <Lock className="w-10 h-10 text-[#031F3C]" strokeWidth={2.5} />
              <Sparkles className="w-5 h-5 text-white absolute -top-1 -right-1" />
            </div>

            <div>
              <span 
                className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full inline-block mb-3 border"
                style={{ backgroundColor: 'rgba(242, 201, 76, 0.1)', color: '#F2C94C', borderColor: 'rgba(242, 201, 76, 0.3)' }}
              >
                🔒 بەشی پارێزراو
              </span>
              <h2 className="text-2xl font-bold font-naskh text-white">
                داشبۆردی بەڕێوەبەر
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                ئەم بەشە بە جیا لە ئەپەکە دەکرێتەوە و تەنها تۆ دەستت پێی دەگات.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-start">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  کۆدی نهێنی بەڕێوەبەر:
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-3.5 rounded-2xl text-white focus:outline-none focus:ring-2 transition-all text-center font-mono text-2xl tracking-widest"
                  style={{ 
                    backgroundColor: 'rgba(3, 31, 60, 0.8)', 
                    borderWidth: '2px',
                    borderColor: pinInput ? '#F2C94C' : 'rgba(242, 201, 76, 0.2)'
                  }}
                  autoFocus
                />
                <p className="text-[10px] text-slate-500 mt-2 text-center font-mono">
                  کۆدی سەرەتایی: <span className="text-amber-400 font-bold">1234</span>
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl text-xs text-center border flex items-center justify-center gap-2" style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #F2C94C 0%, #D4A51E 100%)', color: '#031F3C' }}
              >
                <ShieldCheck className="w-4 h-4" />
                چوونە ناو داشبۆرد
              </button>
            </form>

            <div className="pt-4 border-t" style={{ borderColor: 'rgba(242, 201, 76, 0.15)' }}>
              <button
                onClick={onExitToUserApp}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>گەڕانەوە بۆ ئەپی سیرات</span>
              </button>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-500 mt-6">
            © 2026 Sirat — بەشی بەڕێوەبەرایەتی
          </p>
        </div>
      </div>
    );
  }

  // ===== تابەکانی داشبۆرد =====
  const adminTabs = [
    { key: 'dashboard' as AdminTab, label: 'داشبۆرد', icon: LayoutDashboard },
    { key: 'compose' as AdminTab, label: 'ناردنی پەیام', icon: Send },
    { key: 'messages' as AdminTab, label: 'پەیامەکان', icon: MessageSquare },
    { key: 'settings' as AdminTab, label: 'ڕێکخستن', icon: Settings },
  ];

  return (
    <div className="min-h-screen text-slate-100" style={{ backgroundColor: '#031F3C' }}>
      {/* ===== شریتی سەرەوە ===== */}
      <header 
        className="sticky top-0 z-40 border-b backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(3, 31, 60, 0.95)', borderColor: 'rgba(242, 201, 76, 0.2)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* لۆگۆ */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #F2C94C 0%, #D4A51E 100%)' }}
            >
              <ShieldCheck className="w-6 h-6 text-[#031F3C]" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-base font-bold font-naskh text-white">
                داشبۆردی بەڕێوەبەر
              </h1>
              <p className="text-[10px] text-slate-400">سیرات — بەشی پارێزراو</p>
            </div>
          </div>

          {/* دوگمەکان */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExitToUserApp}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
              style={{ backgroundColor: 'rgba(242, 201, 76, 0.1)', color: '#F2C94C', border: '1px solid rgba(242, 201, 76, 0.3)' }}
              title="پیشاندانی ئەپەکە وەک بەکارهێنەر"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">پیشاندانی ئەپ</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-80"
              style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">دەرچوون</span>
            </button>
          </div>
        </div>

        {/* تابەکان */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-2 border-t" style={{ borderColor: 'rgba(242, 201, 76, 0.1)' }}>
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isActive ? 'shadow-md' : ''
                }`}
                style={
                  isActive
                    ? { backgroundColor: '#F2C94C', color: '#031F3C' }
                    : { backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8' }
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="font-naskh">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ===== ناوەڕۆکی سەرەکی ===== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* باندێری سەرکەوتن */}
        {successBanner && (
          <div 
            className="p-4 rounded-2xl font-bold text-sm flex items-center gap-3 shadow-lg animate-fadeIn"
            style={{ backgroundColor: '#3DBE9C', color: '#031F3C' }}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successBanner}</span>
          </div>
        )}

        {/* ===== ١. تاب: داشبۆرد ===== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* کارتەکانی ئامار */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl border" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 font-naskh">کۆی پەیام</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(242, 201, 76, 0.15)' }}>
                    <MessageSquare className="w-4 h-4 text-(--color-gold)" style={{ color: '#F2C94C' }} />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono" style={{ color: '#F2C94C' }}>{totalMessages}</div>
              </div>

              <div className="p-4 rounded-2xl border" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 font-naskh">چەسپێنراو</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(61, 190, 156, 0.15)' }}>
                    <Pin className="w-4 h-4 rotate-45" style={{ color: '#3DBE9C' }} />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono" style={{ color: '#3DBE9C' }}>{pinnedCount}</div>
              </div>

              <div className="p-4 rounded-2xl border" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 font-naskh">بەپەلە</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)' }}>
                    <AlertTriangle className="w-4 h-4" style={{ color: '#f43f5e' }} />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono" style={{ color: '#f43f5e' }}>{urgentCount}</div>
              </div>

              <div className="p-4 rounded-2xl border" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 font-naskh">جومعە</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                    <Sparkles className="w-4 h-4" style={{ color: '#a78bfa' }} />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono" style={{ color: '#a78bfa' }}>{fridayCount}</div>
              </div>
            </div>

            {/* کارتەکانی کارکردن */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('compose')}
                className="p-5 rounded-2xl border text-start transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] group"
                style={{ 
                  backgroundColor: 'rgba(11, 26, 46, 0.8)', 
                  borderColor: 'rgba(242, 201, 76, 0.3)',
                  boxShadow: '0 4px 20px -4px rgba(242, 201, 76, 0.15)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #F2C94C 0%, #D4A51E 100%)' }}>
                    <Send className="w-6 h-6 text-[#031F3C]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-naskh text-white group-hover:text-amber-400 transition-colors">ناردنی پەیامی نوێ</h3>
                    <p className="text-[11px] text-slate-400">پەیامێکی نوێ بنێرە بۆ هەموو بەکارهێنەران</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold" style={{ color: '#F2C94C' }}>
                  <span>دەستپێبکە</span>
                  <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
                </div>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className="p-5 rounded-2xl border text-start transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] group"
                style={{ 
                  backgroundColor: 'rgba(11, 26, 46, 0.8)', 
                  borderColor: 'rgba(61, 190, 156, 0.3)',
                  boxShadow: '0 4px 20px -4px rgba(61, 190, 156, 0.15)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #3DBE9C 0%, #2A9B7E 100%)' }}>
                    <MessageSquare className="w-6 h-6 text-[#031F3C]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-naskh text-white group-hover:text-teal-400 transition-colors">بەڕێوەبردنی پەیامەکان</h3>
                    <p className="text-[11px] text-slate-400">بینین، چەسپاندن و سڕینەوەی پەیامەکان</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold" style={{ color: '#3DBE9C' }}>
                  <span>بینینی لیست</span>
                  <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
                </div>
              </button>
            </div>

            {/* دوایین پەیامەکان */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-naskh text-white flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: '#F2C94C' }} />
                  دوایین پەیامەکان
                </h3>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-[10px] font-bold transition-colors hover:opacity-80"
                  style={{ color: '#F2C94C' }}
                >
                  بینینی هەموو ←
                </button>
              </div>
              {announcements.slice(0, 3).length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">هێشتا هیچ پەیامێک نەنێردراوە</p>
              ) : (
                <div className="space-y-2">
                  {announcements.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-3 rounded-xl border" style={{ backgroundColor: 'rgba(3, 31, 60, 0.6)', borderColor: 'rgba(242, 201, 76, 0.1)' }}>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs font-bold text-white font-naskh truncate">{item.title}</h4>
                        {item.isPinned && <Pin className="w-3 h-3 rotate-45 shrink-0" style={{ color: '#3DBE9C' }} />}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{item.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ٢. تاب: ناردنی پەیام ===== */}
        {activeTab === 'compose' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            {/* فۆرم */}
            <div className="lg:col-span-7 p-6 rounded-3xl border space-y-4" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
              <div className="flex items-center gap-2 pb-3 border-b" style={{ borderColor: 'rgba(242, 201, 76, 0.15)' }}>
                <Send className="w-5 h-5" style={{ color: '#F2C94C' }} />
                <h2 className="text-base font-bold text-white font-naskh">ناردنی پەیامی نوێ</h2>
              </div>

              {/* قاڵبەکان */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 block">قاڵبی ئامادە:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('friday')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:opacity-80"
                    style={{ backgroundColor: 'rgba(242, 201, 76, 0.15)', color: '#F2C94C', border: '1px solid rgba(242, 201, 76, 0.3)' }}
                  >
                    ✨ جومعە
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('hadith')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:opacity-80"
                    style={{ backgroundColor: 'rgba(61, 190, 156, 0.15)', color: '#3DBE9C', border: '1px solid rgba(61, 190, 156, 0.3)' }}
                  >
                    📖 فەرموودە
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate('update')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:opacity-80"
                    style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.3)' }}
                  >
                    🚀 نوێکردنەوە
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">ناونیشان *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ناونیشانی پەیام..."
                    className="w-full px-4 py-2.5 rounded-xl text-white text-sm font-medium outline-none transition-all"
                    style={{ backgroundColor: 'rgba(3, 31, 60, 0.8)', border: '1px solid rgba(242, 201, 76, 0.2)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">دەق *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="دەقی پەیامەکە..."
                    className="w-full px-4 py-2.5 rounded-xl text-white text-sm font-medium outline-none transition-all leading-relaxed resize-none"
                    style={{ backgroundColor: 'rgba(3, 31, 60, 0.8)', border: '1px solid rgba(242, 201, 76, 0.2)' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">پۆل</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl text-white text-xs font-medium outline-none cursor-pointer"
                      style={{ backgroundColor: 'rgba(3, 31, 60, 0.8)', border: '1px solid rgba(242, 201, 76, 0.2)' }}
                    >
                      <option value="friday">✨ جومعە</option>
                      <option value="hadith">📖 فەرموودە</option>
                      <option value="announcement">📢 ئاگاداری</option>
                      <option value="reminder">🤲 دوعا</option>
                      <option value="update">⚙️ نوێکردنەوە</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">گرنگی</label>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPriority('normal')}
                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                        style={priority === 'normal' 
                          ? { backgroundColor: '#F2C94C', color: '#031F3C' } 
                          : { backgroundColor: 'rgba(3, 31, 60, 0.8)', color: '#94a3b8', border: '1px solid rgba(242, 201, 76, 0.2)' }}
                      >
                        ئاسایی
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriority('urgent')}
                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                        style={priority === 'urgent' 
                          ? { backgroundColor: '#f43f5e', color: 'white' } 
                          : { backgroundColor: 'rgba(3, 31, 60, 0.8)', color: '#94a3b8', border: '1px solid rgba(242, 201, 76, 0.2)' }}
                      >
                        ⚠️ بەپەلە
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'rgba(3, 31, 60, 0.8)', border: '1px solid rgba(242, 201, 76, 0.2)' }}>
                  <div className="flex items-center gap-2">
                    <Pin className="w-4 h-4 rotate-45" style={{ color: '#3DBE9C' }} />
                    <div>
                      <span className="text-xs font-bold text-white block">چەسپاندن لە سەرەوەی ئەپ</span>
                      <span className="text-[10px] text-slate-400">وەک شریتی سەرەوە دەردەکەوێت</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                    style={{ accentColor: '#F2C94C' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #F2C94C 0%, #D4A51E 100%)', color: '#031F3C', boxShadow: '0 10px 30px -10px rgba(242, 201, 76, 0.5)' }}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'دەنێردرێت...' : 'ناردن بۆ هەمووان'}</span>
                </button>
              </form>
            </div>

            {/* پێشبینین */}
            <div className="lg:col-span-5 p-6 rounded-3xl border space-y-4" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
              <div className="flex items-center gap-2 pb-3 border-b" style={{ borderColor: 'rgba(242, 201, 76, 0.15)' }}>
                <Smartphone className="w-5 h-5" style={{ color: '#F2C94C' }} />
                <h2 className="text-base font-bold text-white font-naskh">پێشبینینی مۆبایل</h2>
              </div>

              <div className="rounded-3xl p-3 space-y-3" style={{ backgroundColor: 'rgba(3, 31, 60, 0.9)', border: '3px solid rgba(242, 201, 76, 0.3)' }}>
                <div className="w-16 h-1 rounded-full mx-auto" style={{ backgroundColor: 'rgba(242, 201, 76, 0.3)' }} />

                {isPinned && (
                  <div className="p-2 rounded-xl flex items-center gap-1.5" style={{ background: 'linear-gradient(90deg, #F2C94C 0%, #D4A51E 100%)', color: '#031F3C' }}>
                    <span className="text-[9px] font-bold px-1 rounded" style={{ backgroundColor: '#031F3C', color: '#F2C94C' }}>
                      {category === 'friday' ? '✨ جومعە' : '📢 گرنگ'}
                    </span>
                    <span className="font-bold truncate text-[11px]">{title || 'ناونیشان'}</span>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl space-y-2" style={{ backgroundColor: 'rgba(11, 26, 46, 0.9)', border: '1px solid rgba(242, 201, 76, 0.2)' }}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold" style={{ color: '#F2C94C' }}>
                      {category === 'friday' ? '✨ جومعە' : category === 'hadith' ? '📖 فەرموودە' : category === 'update' ? '⚙️ نوێکردنەوە' : '📢 ئاگاداری'}
                    </span>
                    <span className="text-slate-500 font-mono">ئێستا</span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-naskh">{title || 'ناونیشانی پەیام'}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-line">
                    {message || 'دەقی پەیامەکەت لێرە دەردەکەوێت...'}
                  </p>
                  <div className="pt-2 text-[10px] text-slate-500" style={{ borderTop: '1px solid rgba(242, 201, 76, 0.1)' }}>
                    لە لایەن: {author}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ٣. تاب: پەیامەکان ===== */}
        {activeTab === 'messages' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" style={{ color: '#F2C94C' }} />
                <h2 className="text-base font-bold text-white font-naskh">هەموو پەیامەکان ({announcements.length})</h2>
              </div>
              <button
                onClick={onRefreshAnnouncements}
                className="p-2 rounded-xl transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgba(242, 201, 76, 0.1)', color: '#F2C94C', border: '1px solid rgba(242, 201, 76, 0.2)' }}
                title="نوێکردنەوە"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {announcements.length === 0 ? (
              <div className="p-12 rounded-3xl border text-center" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: '#F2C94C' }} />
                <p className="text-sm text-slate-400 font-naskh">هێشتا هیچ پەیامێک نەنێردراوە</p>
              </div>
            ) : (
              <div className="space-y-3">
                {announcements.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 rounded-2xl border flex items-start justify-between gap-4 transition-all hover:shadow-lg"
                    style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}
                  >
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-white font-naskh">{item.title}</h4>
                        {item.isPinned && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ backgroundColor: 'rgba(61, 190, 156, 0.15)', color: '#3DBE9C', border: '1px solid rgba(61, 190, 156, 0.3)' }}>
                            <Pin className="w-2.5 h-2.5 rotate-45" /> چەسپێنراو
                          </span>
                        )}
                        {item.priority === 'urgent' && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                            ⚠️ بەپەلە
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.message}</p>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {new Date(item.createdAt).toLocaleString(lang === 'ckb' ? 'ku' : 'en')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleTogglePin(item.id)}
                        className="p-2 rounded-xl transition-all hover:opacity-80"
                        style={item.isPinned 
                          ? { backgroundColor: 'rgba(61, 190, 156, 0.2)', color: '#3DBE9C', border: '1px solid rgba(61, 190, 156, 0.3)' }
                          : { backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8' }}
                        title={item.isPinned ? 'لابردنی چەسپاندن' : 'چەسپاندن'}
                      >
                        <Pin className="w-4 h-4 rotate-45" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl transition-all hover:opacity-80"
                        style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}
                        title="سڕینەوە"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== ٤. تاب: ڕێکخستن ===== */}
        {activeTab === 'settings' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-6 rounded-3xl border space-y-4" style={{ backgroundColor: 'rgba(11, 26, 46, 0.8)', borderColor: 'rgba(242, 201, 76, 0.2)' }}>
              <h2 className="text-base font-bold text-white font-naskh flex items-center gap-2">
                <Settings className="w-5 h-5" style={{ color: '#F2C94C' }} />
                ڕێکخستنی داشبۆرد
              </h2>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(3, 31, 60, 0.6)', border: '1px solid rgba(242, 201, 76, 0.15)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white font-naskh">لینکی داشبۆرد</h3>
                      <p className="text-[11px] text-slate-400 mt-1">تەنها لەم لینکەوە دەتوانیت بچیتە داشبۆرد</p>
                    </div>
                    <span className="text-[10px] px-3 py-1.5 rounded-lg font-mono font-bold" style={{ backgroundColor: 'rgba(242, 201, 76, 0.15)', color: '#F2C94C' }}>
                      /admin
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(3, 31, 60, 0.6)', border: '1px solid rgba(242, 201, 76, 0.15)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white font-naskh">کۆدی نهێنی</h3>
                      <p className="text-[11px] text-slate-400 mt-1">کۆدی ئێستا: 1234 (لە کۆدەکەدا دەگۆڕدرێت)</p>
                    </div>
                    <ShieldCheck className="w-6 h-6" style={{ color: '#3DBE9C' }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                  <h3 className="text-sm font-bold font-naskh" style={{ color: '#f43f5e' }}>⚠️ ناوچەی مەترسیدار</h3>
                  <p className="text-[11px] text-slate-400 mt-1 mb-3">ئەم کارانە ناتوانرێت بگەڕێنرێنەوە</p>
                  <button
                    onClick={() => {
                      if (confirm('ئایا دڵنیایت لە دەرچوون لە داشبۆرد؟')) handleLogout();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-80"
                    style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' }}
                  >
                    دەرچوون لە داشبۆرد
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};