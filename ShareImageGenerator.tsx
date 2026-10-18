/**
 * بەشی دروستکردنی وێنە لە ئایەت، فەرموودە، دوعا و زیکر.
 */
import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Share2, 
  Sparkles, 
  Image as ImageIcon,
  X,
  BookOpen,
  Heart,
  Crown,
  Quote,
  Palette,
  Type,
  Layout,
  Loader2,
  ChevronDown
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { Language } from '../types';
import { QURAN_DUAS_DATA } from '../data/quranDuasData';
import { ADHKAR_LIST } from '../data/adhkarData';
import { DIVINE_NAMES } from '../data/divineNames';

interface ShareImageGeneratorProps {
  lang: Language;
}

type ContentSource = 'verse' | 'hadith' | 'dhikr' | 'asma';
type BackgroundTheme = 'gold-blue' | 'emerald' | 'midnight' | 'rose' | 'sand';

interface ImageContent {
  id: string;
  text: string;
  translation: string;
  reference: string;
  source: ContentSource;
}

const HADITHS: ImageContent[] = [
  { id: 'h1', source: 'hadith', text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', translation: 'بەڕاستی کردەوەکان بەپێی نیەتن، و بەڕاستی بۆ هەر کەسێک ئەوە هەیە کە نیەتی خستووەتەوە.', reference: 'صحیح بخاری و مسلم' },
  { id: 'h2', source: 'hadith', text: 'الدِّينُ النَّصِيحَةُ', translation: 'ئاین ڕێنمایی و دڵسۆزییە.', reference: 'صحیح مسلم' },
  { id: 'h3', source: 'hadith', text: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', translation: 'هەرکەس باوەڕی بە خودا و ڕۆژی دوایی هەیە، با شتێکی خێر بڵێت یان بێدەنگ بێت.', reference: 'صحیح بخاری' },
  { id: 'h4', source: 'hadith', text: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', translation: 'باشترینتان ئەو کەسەیە کە قورئان فێر بێت و فێری کەسانی تر بکات.', reference: 'صحیح بخاری' },
  { id: 'h5', source: 'hadith', text: 'الْمُسْلِمُ مِرْآةُ أَخِيهِ', translation: 'موسڵمان ئاوێنەی برایەتییە.', reference: 'سنن أبی داود' },
  { id: 'h6', source: 'hadith', text: 'مَنْ لَا يَرْحَمُ لَا يُرْحَمُ', translation: 'هەرکەس ڕەحم نەکات، ڕەحمی پێ ناکرێت.', reference: 'صحیح بخاری' },
];

export const ShareImageGenerator: React.FC<ShareImageGeneratorProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [sourceTab, setSourceTab] = useState<ContentSource>('verse');
  const [selectedContent, setSelectedContent] = useState<ImageContent | null>(null);
  const [theme, setTheme] = useState<BackgroundTheme>('gold-blue');
  const [fontSize, setFontSize] = useState<number>(32);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState<string>('');
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedContent) {
      if (sourceTab === 'verse' && QURAN_DUAS_DATA.length > 0) {
        const first = QURAN_DUAS_DATA[0];
        setSelectedContent({
          id: String(first.id),
          source: 'verse',
          text: first.arabic,
          translation: first.kurdish,
          reference: `${first.surahAr} - ئایەتی ${first.ayahNumber}`
        });
      } else if (sourceTab === 'hadith' && HADITHS.length > 0) {
        setSelectedContent(HADITHS[0]);
      } else if (sourceTab === 'dhikr' && ADHKAR_LIST.length > 0) {
        const first = ADHKAR_LIST[0];
        setSelectedContent({
          id: first.id,
          source: 'dhikr',
          text: first.arabic,
          translation: first.kurdish,
          reference: 'زیکر'
        });
      } else if (sourceTab === 'asma' && DIVINE_NAMES.length > 0) {
        const first = DIVINE_NAMES[0];
        setSelectedContent({
          id: String(first.id),
          source: 'asma',
          text: first.nameAr,
          translation: `${first.meaningKu}\n\n${first.explanationKu}`,
          reference: `ناوی ${first.id}ی خودا`
        });
      }
    }
  }, [sourceTab, selectedContent]);

  const generateImage = async () => {
    if (!imageRef.current) return;
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const canvas = await html2canvas(imageRef.current, {
        scale: 3,
        backgroundColor: null,
        foreignObjectRendering: true,
        useCORS: true,
        logging: false,
        onclone: (clonedDocument, clonedElement) => {
          clonedDocument.documentElement.style.backgroundColor = 'transparent';
          if (clonedDocument.body) {
            clonedDocument.body.style.backgroundColor = 'transparent';
          }
          clonedElement.removeAttribute('class');
          clonedElement.querySelectorAll('[class]').forEach(element => element.removeAttribute('class'));
        },
      });
      const dataUrl = canvas.toDataURL('image/png');
      setGeneratedImage(dataUrl);
    } catch (err) {
      console.error('Failed to generate image', err);
      setGenerationError(
        isRtl
          ? 'دروستکردنی وێنە سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەرەوە.'
          : 'Could not generate the image. Please try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.download = `sirat-image-${Date.now()}.png`;
    link.href = generatedImage;
    link.click();
  };

  const shareImage = async () => {
    if (!generatedImage) return;
    try {
      const blob = await (await fetch(generatedImage)).blob();
      const file = new File([blob], 'sirat-image.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'سیرات',
          text: 'وێنەیەک لە ئەپی سیرات',
        });
      } else {
        downloadImage();
      }
    } catch {
      downloadImage();
    }
  };

  const themes: { key: BackgroundTheme; name: string; gradient: string; textColor: string; accent: string }[] = [
    { 
      key: 'gold-blue', 
      name: 'زێڕین و شین', 
      gradient: 'linear-gradient(135deg, #031F3C 0%, #0a2d52 50%, #132942 100%)', 
      textColor: '#F2C94C',
      accent: '#F2C94C'
    },
    { 
      key: 'emerald', 
      name: 'سەوزی بەهەشت', 
      gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #065f46 100%)', 
      textColor: '#a7f3d0',
      accent: '#34d399'
    },
    { 
      key: 'midnight', 
      name: 'شەوی تاریک', 
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0a0a0a 100%)', 
      textColor: '#F2C94C',
      accent: '#F2C94C'
    },
    { 
      key: 'rose', 
      name: 'گوڵی سوور', 
      gradient: 'linear-gradient(135deg, #4c0519 0%, #881337 50%, #9f1239 100%)', 
      textColor: '#fecdd3',
      accent: '#fb7185'
    },
    { 
      key: 'sand', 
      name: 'بیابان', 
      gradient: 'linear-gradient(135deg, #44403c 0%, #57534e 50%, #78716c 100%)', 
      textColor: '#F2C94C',
      accent: '#F2C94C'
    },
  ];

  const currentTheme = themes.find(t => t.key === theme)!;

  return (
    <div 
      className="w-full max-w-3xl mx-auto space-y-5 animate-fadeIn pb-28 text-(--text-main) font-kurdish"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ===== کارتی سەرەوە ===== */}
      <div 
        className="p-5 rounded-3xl border shadow-lg space-y-4 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: 'var(--color-gold)' }} />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0 relative" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
            <ImageIcon className="w-7 h-7 text-(--color-gold)" />
            <Sparkles className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-naskh tracking-tight" style={{ color: 'var(--color-gold)' }}>
              دروستکردنی وێنە
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              ئایەت، فەرموودە، دوعا و زیکر بکە بە وێنە
            </p>
          </div>
        </div>
      </div>

      {/* ===== تابەکانی جۆری ناوەڕۆک ===== */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {[
          { key: 'verse' as ContentSource, label: 'ئایەتی قورئان', icon: BookOpen },
          { key: 'hadith' as ContentSource, label: 'فەرموودە', icon: Quote },
          { key: 'dhikr' as ContentSource, label: 'زیکر', icon: Heart },
          { key: 'asma' as ContentSource, label: 'ناوی خودا', icon: Crown },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = sourceTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => { setSourceTab(tab.key); setSelectedContent(null); setGeneratedImage(null); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95 border ${
                isActive ? 'shadow-md scale-[1.02]' : 'border-(--border-theme) text-(--text-main) hover:border-(--color-gold) hover:text-(--color-gold)'
              }`}
              style={isActive ? { backgroundColor: 'var(--color-gold)', color: '#031F3C', borderColor: 'var(--color-gold)' } : { backgroundColor: 'var(--bg-chip)' }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="font-naskh">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===== هەڵبژاردنی ناوەڕۆک ===== */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="w-full p-4 rounded-3xl border shadow-sm flex items-center justify-between gap-3 cursor-pointer transition-all hover:border-(--color-gold)"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
              <Type className="w-5 h-5 text-(--color-gold)" />
            </div>
            <div className="text-start">
              <span className="text-[10px] text-(--text-muted) font-kurdish block">ناوەڕۆکی هەڵبژێردراو</span>
              <span className="text-sm font-bold text-(--text-main) font-naskh truncate block max-w-60">
                {selectedContent ? selectedContent.text.substring(0, 30) + '...' : 'هیچ هەڵنەبژێردراوە'}
              </span>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-(--text-muted) transition-transform ${showPicker ? 'rotate-180' : ''}`} />
        </button>

        {showPicker && (
          <div className="p-3 rounded-3xl border shadow-lg max-h-80 overflow-y-auto space-y-1.5 animate-fadeIn" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            {sourceTab === 'verse' && QURAN_DUAS_DATA.slice(0, 30).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedContent({
                    id: String(item.id),
                    source: 'verse',
                    text: item.arabic,
                    translation: item.kurdish,
                    reference: `${item.surahAr} - ئایەتی ${item.ayahNumber}`
                  });
                  setShowPicker(false);
                  setGeneratedImage(null);
                }}
                className="w-full p-3 rounded-2xl text-start hover:bg-(--bg-chip) transition-all cursor-pointer"
              >
                <p className="text-sm font-naskh text-(--color-gold) truncate">{item.arabic}</p>
                <p className="text-[10px] text-(--text-muted) mt-1 truncate">{item.surahAr} - {item.ayahNumber}</p>
              </button>
            ))}

            {sourceTab === 'hadith' && HADITHS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { setSelectedContent(item); setShowPicker(false); setGeneratedImage(null); }}
                className="w-full p-3 rounded-2xl text-start hover:bg-(--bg-chip) transition-all cursor-pointer"
              >
                <p className="text-sm font-naskh text-(--color-gold) truncate">{item.text}</p>
                <p className="text-[10px] text-(--text-muted) mt-1 truncate">{item.reference}</p>
              </button>
            ))}

            {sourceTab === 'dhikr' && ADHKAR_LIST.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedContent({
                    id: item.id,
                    source: 'dhikr',
                    text: item.arabic,
                    translation: item.kurdish,
                    reference: 'زیکر'
                  });
                  setShowPicker(false);
                  setGeneratedImage(null);
                }}
                className="w-full p-3 rounded-2xl text-start hover:bg-(--bg-chip) transition-all cursor-pointer"
              >
                <p className="text-sm font-naskh text-(--color-gold) truncate">{item.arabic}</p>
                <p className="text-[10px] text-(--text-muted) mt-1 truncate">{item.category}</p>
              </button>
            ))}

            {sourceTab === 'asma' && DIVINE_NAMES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedContent({
                    id: String(item.id),
                    source: 'asma',
                    text: item.nameAr,
                    translation: item.meaningKu,
                    reference: `ناوی ${item.id}ی خودا`
                  });
                  setShowPicker(false);
                  setGeneratedImage(null);
                }}
                className="w-full p-3 rounded-2xl text-start hover:bg-(--bg-chip) transition-all cursor-pointer"
              >
                <p className="text-sm font-naskh text-(--color-gold) truncate">{item.nameAr}</p>
                <p className="text-[10px] text-(--text-muted) mt-1 truncate">{item.meaningKu}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===== کۆنترۆڵەکان ===== */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          <label className="text-[10px] text-(--text-muted) font-kurdish mb-1 flex items-center gap-1">
            <Palette className="w-3 h-3" /> ڕەنگ
          </label>
          <div className="flex items-center gap-1 flex-wrap">
            {themes.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => { setTheme(t.key); setGeneratedImage(null); }}
                className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${theme === t.key ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                style={{ background: t.gradient, borderColor: theme === t.key ? 'var(--color-gold)' : 'transparent' }}
                title={t.name}
              />
            ))}
          </div>
        </div>

        <div className="p-3 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          <label className="text-[10px] text-(--text-muted) font-kurdish mb-1 flex items-center gap-1">
            <Type className="w-3 h-3" /> فۆنت: {fontSize}
          </label>
          <input
            type="range"
            min="20"
            max="48"
            value={fontSize}
            onChange={(e) => { setFontSize(Number(e.target.value)); setGeneratedImage(null); }}
            className="w-full accent-(--color-gold) cursor-pointer"
          />
        </div>
      </div>

      {/* ===== پێشبینین ===== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-(--text-main) font-naskh flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-(--color-gold)" />
            پێشبینین
          </span>
          <label className="flex items-center gap-2 text-xs text-(--text-muted) cursor-pointer">
            <input
              type="checkbox"
              checked={showTranslation}
              onChange={(e) => { setShowTranslation(e.target.checked); setGeneratedImage(null); }}
              className="w-4 h-4 accent-(--color-gold)"
            />
            <span className="font-kurdish">وەرگێڕان</span>
          </label>
        </div>

        {selectedContent ? (
          <div className="flex justify-center">
            <div
              ref={imageRef}
              className="relative overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '4/5',
                background: currentTheme.gradient,
                borderRadius: '24px',
                boxShadow: '0 20px 60px -10px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px 24px',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.06,
                backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
              }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '40px', height: '2px', background: currentTheme.accent, borderRadius: '2px' }} />
                <span style={{ fontSize: '11px', color: currentTheme.textColor, fontFamily: 'Noto Naskh Arabic, serif', opacity: 0.7, letterSpacing: '1px' }}>
                  {selectedContent.source === 'verse' ? 'قورئانی پیرۆز' : 
                   selectedContent.source === 'hadith' ? 'فەرموودەی پێغەمبەر ﷺ' : 
                   selectedContent.source === 'dhikr' ? 'زیکر' : 'ناوی خودا'}
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'center' }}>
                <p style={{
                  fontSize: `${fontSize}px`,
                  color: currentTheme.textColor,
                  fontFamily: 'Amiri, Noto Naskh Arabic, serif',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  direction: 'rtl',
                }}>
                  {selectedContent.text}
                </p>
                
                {showTranslation && selectedContent.translation && (
                  <p style={{
                    fontSize: '14px',
                    color: currentTheme.textColor,
                    opacity: 0.85,
                    fontFamily: 'Noto Kufi Arabic, sans-serif',
                    textAlign: 'center',
                    lineHeight: 1.8,
                    maxWidth: '90%',
                    direction: 'rtl',
                  }}>
                    {selectedContent.translation}
                  </p>
                )}

                {customNote && (
                  <p style={{ fontSize: '11px', color: currentTheme.textColor, opacity: 0.6, fontFamily: 'Noto Kufi Arabic, sans-serif', textAlign: 'center', fontStyle: 'italic' }}>
                    {customNote}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '12px', color: currentTheme.textColor, fontFamily: 'Noto Naskh Arabic, serif', fontWeight: 'bold' }}>
                  {selectedContent.reference}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '1px', background: currentTheme.accent, opacity: 0.5 }} />
                  <span style={{ fontSize: '10px', color: currentTheme.textColor, opacity: 0.6, fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
                    ئەپی سیرات
                  </span>
                  <div style={{ width: '20px', height: '1px', background: currentTheme.accent, opacity: 0.5 }} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-3xl border text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <ImageIcon className="w-12 h-12 text-(--color-gold) opacity-50 mx-auto mb-2" />
            <p className="text-xs text-(--text-muted) font-kurdish">تکایە ناوەڕۆکێک هەڵبژێرە</p>
          </div>
        )}

        {selectedContent && (
          <div className="p-3 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">نوسینی زیاتر (ئارەزوومەندانە)</label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => { setCustomNote(e.target.value); setGeneratedImage(null); }}
              placeholder="وەک: لە یادی دایکمدا..."
              className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-xl px-3 py-2 text-xs text-(--text-main) font-kurdish outline-none focus:border-(--color-gold)"
            />
          </div>
        )}
      </div>

      {/* ===== دوگمەکانی کردار ===== */}
      {selectedContent && (
        <div className="space-y-2">
        {generationError && (
          <p role="alert" className="text-xs text-red-500 font-kurdish">
            {generationError}
          </p>
        )}
        {!generatedImage ? (
            <button
              type="button"
              onClick={generateImage}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer disabled:opacity-60"
              style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="font-naskh">دروستکردن...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span className="font-naskh">دروستکردنی وێنە بە کوالیتی بەرز</span>
                </>
              )}
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={downloadImage}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer"
                style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
              >
                <Download className="w-4 h-4" />
                <span className="font-naskh">داگرتن</span>
              </button>
              <button
                type="button"
                onClick={shareImage}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer"
                style={{ backgroundColor: 'var(--color-teal)', color: '#031F3C' }}
              >
                <Share2 className="w-4 h-4" />
                <span className="font-naskh">هاوبەشکردن</span>
              </button>
            </div>
          )}

          {generatedImage && (
            <button
              type="button"
              onClick={() => setGeneratedImage(null)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold cursor-pointer"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}
            >
              <X className="w-3.5 h-3.5" />
              <span className="font-naskh">دروستکردنی وێنەی تر</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};