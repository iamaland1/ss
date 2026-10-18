/**
 * بەشی حیسابکردنی زەکات (پارە، کشتوکاڵ، ئاژەڵ، فیتڕ).
 */
import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Coins, 
  Scale, 
  Info, 
  RotateCcw,
  Sparkles,
  BookOpen,
  AlertCircle,
  Wallet,
  Gem,
  ShoppingBag,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sprout,
  PawPrint,
  Moon
} from 'lucide-react';
import { Language, ZakatInputs } from '../types';
import { 
  calculateZakat, 
  NISAB_EXPLANATION,
  ZAKAT_RATE,
  NISAB_CROPS_KG,
  calculateCropZakat,
  calculateLivestockZakat,
  calculateFitrZakat,
  FITR_ZAKAT_KG
} from '../data/zakat';

interface ZakatViewProps {
  lang: Language;
}

type ZakatTab = 'wealth' | 'crops' | 'livestock' | 'fitr';

export const ZakatView: React.FC<ZakatViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [activeTab, setActiveTab] = useState<ZakatTab>('wealth');

  // State بۆ پارە
  const [inputs, setInputs] = useState<ZakatInputs>({
    cash: 0, goldGrams: 0, goldPricePerGram: 0, silverGrams: 0,
    silverPricePerGram: 0, businessValue: 0, debts: 0,
  });
  const [hasCalculated, setHasCalculated] = useState(false);

  // State بۆ کشتوکاڵ
  const [cropKg, setCropKg] = useState(0);
  const [isRainFed, setIsRainFed] = useState(true);
  const [hasCropCalculated, setHasCropCalculated] = useState(false);

  // State بۆ ئاژەڵ
  const [livestockType, setLivestockType] = useState<'sheep' | 'cow' | 'camel'>('sheep');
  const [livestockCount, setLivestockCount] = useState(0);
  const [hasLivestockCalculated, setHasLivestockCalculated] = useState(false);

  // State بۆ فیتڕ
  const [familySize, setFamilySize] = useState(1);
  const [pricePerKg, setPricePerKg] = useState(0);
  const [hasFitrCalculated, setHasFitrCalculated] = useState(false);

  const [showNisabInfo, setShowNisabInfo] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);

  const handleChange = (key: keyof ZakatInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: Math.max(0, value) }));
    setHasCalculated(false);
  };

  const handleReset = () => {
    if (activeTab === 'wealth') {
      setInputs({ cash: 0, goldGrams: 0, goldPricePerGram: 0, silverGrams: 0, silverPricePerGram: 0, businessValue: 0, debts: 0 });
      setHasCalculated(false);
    } else if (activeTab === 'crops') {
      setCropKg(0); setIsRainFed(true); setHasCropCalculated(false);
    } else if (activeTab === 'livestock') {
      setLivestockCount(0); setLivestockType('sheep'); setHasLivestockCalculated(false);
    } else if (activeTab === 'fitr') {
      setFamilySize(1); setPricePerKg(0); setHasFitrCalculated(false);
    }
  };

  const wealthResult = useMemo(() => calculateZakat(inputs), [inputs]);
  const cropResult = useMemo(() => calculateCropZakat(cropKg, isRainFed), [cropKg, isRainFed]);
  const livestockResult = useMemo(() => calculateLivestockZakat(livestockType, livestockCount), [livestockType, livestockCount]);
  const fitrResult = useMemo(() => calculateFitrZakat(familySize, pricePerKg), [familySize, pricePerKg]);

  const formatNumber = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

  const tabs: { key: ZakatTab; label: string; icon: any }[] = [
    { key: 'wealth', label: 'پارە و ئاڵتوون', icon: Coins },
    { key: 'crops', label: 'کشتوکاڵ', icon: Sprout },
    { key: 'livestock', label: 'ئاژەڵ', icon: PawPrint },
    { key: 'fitr', label: 'زەکاتی فیتڕ', icon: Moon },
  ];

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
            <Coins className="w-7 h-7 text-(--color-gold)" />
            <Sparkles className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-naskh tracking-tight" style={{ color: 'var(--color-gold)' }}>
              حیسابکردنی زەکات
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              پارە، کشتوکاڵ، ئاژەڵ و فیتڕ
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowNisabInfo(!showNisabInfo)}
          className="w-full p-3 rounded-2xl border text-[11px] text-(--text-muted) leading-relaxed relative z-10 flex gap-2 text-start cursor-pointer"
          style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
        >
          <Info className="w-4 h-4 text-(--color-gold) shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-(--color-gold)">زانیاری نەسیاب:</span>
            <p className="mt-1">{NISAB_EXPLANATION.condition}</p>
          </div>
          {showNisabInfo ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
        </button>

        {showNisabInfo && (
          <div className="p-3 rounded-2xl bg-(--color-gold-muted) border border-(--color-gold)/30 text-[11px] text-(--text-main) space-y-1.5 relative z-10">
            <p>• {NISAB_EXPLANATION.gold}</p>
            <p>• {NISAB_EXPLANATION.silver}</p>
            <p>• {NISAB_EXPLANATION.rate}</p>
            <p>• نەسیابی کشتوکاڵ: {NISAB_CROPS_KG} کیلۆگرام.</p>
            <p>• زەکاتی فیتڕ: {FITR_ZAKAT_KG} کیلۆگرام لە هەر کەسێک.</p>
            <p className="text-(--color-gold) font-bold">نەسیابی کەمتر بەکاردەهێنرێت بۆ ئاسانکاری بۆ هەژاران.</p>
          </div>
        )}
      </div>

      {/* ===== تابەکان ===== */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
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

      {/* ============================================= */}
      {/* ١. تاب: پارە و ئاڵتوون */}
      {/* ============================================= */}
      {activeTab === 'wealth' && (
        <div className="space-y-4 animate-fadeIn">
          {/* پارە */}
          <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <Wallet className="w-4 h-4 text-(--color-gold)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">پارە (کاش)</h3>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inputs.cash || ''}
                onChange={(e) => handleChange('cash', parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="flex-1 bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-4 py-3 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)"
              />
              <span className="text-xs text-(--text-muted) font-kurdish">دینار</span>
            </div>
          </div>

          {/* ئاڵتوون */}
          <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <Gem className="w-4 h-4 text-(--color-gold)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">ئاڵتوون</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">گرام</label>
                <input type="number" value={inputs.goldGrams || ''} onChange={(e) => handleChange('goldGrams', parseFloat(e.target.value) || 0)} placeholder="0" className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-3 py-2.5 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
              </div>
              <div>
                <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">نرخی گرام (دینار)</label>
                <input type="number" value={inputs.goldPricePerGram || ''} onChange={(e) => handleChange('goldPricePerGram', parseFloat(e.target.value) || 0)} placeholder="0" className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-3 py-2.5 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
              </div>
            </div>
          </div>

          {/* زیو */}
          <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <Scale className="w-4 h-4 text-(--color-gold)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">زیو</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">گرام</label>
                <input type="number" value={inputs.silverGrams || ''} onChange={(e) => handleChange('silverGrams', parseFloat(e.target.value) || 0)} placeholder="0" className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-3 py-2.5 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
              </div>
              <div>
                <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">نرخی گرام (دینار)</label>
                <input type="number" value={inputs.silverPricePerGram || ''} onChange={(e) => handleChange('silverPricePerGram', parseFloat(e.target.value) || 0)} placeholder="0" className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-3 py-2.5 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
              </div>
            </div>
          </div>

          {/* کاڵای بازرگانی */}
          <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <ShoppingBag className="w-4 h-4 text-(--color-gold)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">کاڵای بازرگانی</h3>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" value={inputs.businessValue || ''} onChange={(e) => handleChange('businessValue', parseFloat(e.target.value) || 0)} placeholder="0" className="flex-1 bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-4 py-3 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
              <span className="text-xs text-(--text-muted) font-kurdish">دینار</span>
            </div>
          </div>

          {/* قەرزەکان */}
          <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)' }}>
                <AlertCircle className="w-4 h-4 text-rose-400" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">قەرزەکان (کەمکردنەوە)</h3>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" value={inputs.debts || ''} onChange={(e) => handleChange('debts', parseFloat(e.target.value) || 0)} placeholder="0" className="flex-1 bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-4 py-3 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
              <span className="text-xs text-(--text-muted) font-kurdish">دینار</span>
            </div>
          </div>

          {/* دوگمەکان */}
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setHasCalculated(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer" style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}>
              <Calculator className="w-4 h-4" />
              <span className="font-naskh">حیسابکردن</span>
            </button>
            <button type="button" onClick={handleReset} className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border text-sm font-bold transition-all active:scale-[0.98] cursor-pointer" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}>
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* ئەنجام */}
          {hasCalculated && (
            <div className="space-y-3 animate-fadeIn">
              {!wealthResult.meetsNisab ? (
                <div className="p-6 rounded-3xl border text-center space-y-2" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
                  <AlertCircle className="w-8 h-8 text-(--color-gold) opacity-70 mx-auto" />
                  <p className="text-sm font-bold text-(--text-main) font-naskh">سەروەتەکەت نەگەیشتووەتە نەسیاب</p>
                  <p className="text-xs text-(--text-muted) font-kurdish">نەسیابی پێویست: {formatNumber(wealthResult.nisabUsed)} دینار</p>
                </div>
              ) : (
                <div className="rounded-3xl border shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
                  <div className="p-5 text-center space-y-1" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                    <span className="text-[11px] text-(--text-muted) font-kurdish font-bold">کۆی زەکاتی واجب</span>
                    <div className="text-3xl font-black font-mono" style={{ color: 'var(--color-gold)' }}>{formatNumber(wealthResult.totalZakat)}</div>
                    <span className="text-xs text-(--text-muted) font-kurdish">دینار</span>
                  </div>
                  <div className="p-4 space-y-2 border-t border-(--border-theme)">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-(--text-muted) font-kurdish">سەروەتی خاڵی</span>
                      <span className="font-mono font-bold text-(--text-main)">{formatNumber(wealthResult.totalAssets)} دینار</span>
                    </div>
                    {wealthResult.cashZakat > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-(--text-muted) font-kurdish">زەکاتی پارە</span>
                        <span className="font-mono font-bold text-(--color-gold)">{formatNumber(wealthResult.cashZakat)} دینار</span>
                      </div>
                    )}
                    {wealthResult.goldZakat > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-(--text-muted) font-kurdish">زەکاتی ئاڵتوون (گرام)</span>
                        <span className="font-mono font-bold text-(--color-gold)">{formatNumber(wealthResult.goldZakat)} گرام</span>
                      </div>
                    )}
                    {wealthResult.silverZakat > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-(--text-muted) font-kurdish">زەکاتی زیو (گرام)</span>
                        <span className="font-mono font-bold text-(--color-gold)">{formatNumber(wealthResult.silverZakat)} گرام</span>
                      </div>
                    )}
                    {wealthResult.businessZakat > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-(--text-muted) font-kurdish">زەکاتی کاڵای بازرگانی</span>
                        <span className="font-mono font-bold text-(--color-gold)">{formatNumber(wealthResult.businessZakat)} دینار</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================= */}
      {/* ٢. تاب: کشتوکاڵ */}
      {/* ============================================= */}
      {activeTab === 'crops' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <Sprout className="w-4 h-4 text-(--color-gold)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">زەکاتی کشتوکاڵ</h3>
            </div>
            <p className="text-[10px] text-(--text-muted) font-kurdish">نەسیاب: {NISAB_CROPS_KG} کیلۆگرام لە بەرهەمی کشتوکاڵ.</p>
            
            <div>
              <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">بەرهەم بە کیلۆگرام</label>
              <input type="number" value={cropKg || ''} onChange={(e) => { setCropKg(parseFloat(e.target.value) || 0); setHasCropCalculated(false); }} placeholder="0" className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-4 py-3 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={() => { setIsRainFed(true); setHasCropCalculated(false); }} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${isRainFed ? 'shadow-sm' : 'opacity-70'}`} style={isRainFed ? { backgroundColor: 'var(--color-gold-muted)', borderColor: 'var(--color-gold)', color: 'var(--color-gold)' } : { backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}>
                بە باران (١٠٪)
              </button>
              <button type="button" onClick={() => { setIsRainFed(false); setHasCropCalculated(false); }} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${!isRainFed ? 'shadow-sm' : 'opacity-70'}`} style={!isRainFed ? { backgroundColor: 'var(--color-gold-muted)', borderColor: 'var(--color-gold)', color: 'var(--color-gold)' } : { backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}>
                بە ئاوی دەستکرد (٥٪)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setHasCropCalculated(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer" style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}>
              <Calculator className="w-4 h-4" />
              <span className="font-naskh">حیسابکردن</span>
            </button>
            <button type="button" onClick={handleReset} className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border text-sm font-bold cursor-pointer" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}>
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {hasCropCalculated && (
            <div className="rounded-3xl border shadow-lg overflow-hidden animate-fadeIn" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
              {!cropResult.meetsNisab ? (
                <div className="p-6 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-(--color-gold) opacity-70 mx-auto" />
                  <p className="text-sm font-bold text-(--text-main) font-naskh">بەرهەمەکەت نەگەیشتووەتە نەسیاب</p>
                  <p className="text-xs text-(--text-muted) font-kurdish">نەسیابی پێویست: {NISAB_CROPS_KG} کیلۆگرام</p>
                </div>
              ) : (
                <div className="p-5 text-center space-y-1" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                  <span className="text-[11px] text-(--text-muted) font-kurdish font-bold">زەکاتی کشتوکاڵی واجب</span>
                  <div className="text-3xl font-black font-mono" style={{ color: 'var(--color-gold)' }}>{formatNumber(cropResult.zakatKg)}</div>
                  <span className="text-xs text-(--text-muted) font-kurdish">کیلۆگرام ({cropResult.rate * 100}%)</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================= */}
      {/* ٣. تاب: ئاژەڵ */}
      {/* ============================================= */}
      {activeTab === 'livestock' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <PawPrint className="w-4 h-4 text-(--color-gold)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">زەکاتی ئاژەڵ</h3>
            </div>
            
            <div>
              <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">جۆری ئاژەڵ</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'sheep' as const, label: 'مەڕ' },
                  { key: 'cow' as const, label: 'مانگا' },
                  { key: 'camel' as const, label: 'وشتر' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => { setLivestockType(t.key); setHasLivestockCalculated(false); }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${livestockType === t.key ? 'shadow-sm' : 'opacity-70'}`}
                    style={livestockType === t.key ? { backgroundColor: 'var(--color-gold-muted)', borderColor: 'var(--color-gold)', color: 'var(--color-gold)' } : { backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">ژمارەی ئاژەڵ</label>
              <input type="number" value={livestockCount || ''} onChange={(e) => { setLivestockCount(parseFloat(e.target.value) || 0); setHasLivestockCalculated(false); }} placeholder="0" className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-4 py-3 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setHasLivestockCalculated(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer" style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}>
              <Calculator className="w-4 h-4" />
              <span className="font-naskh">حیسابکردن</span>
            </button>
            <button type="button" onClick={handleReset} className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border text-sm font-bold cursor-pointer" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}>
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {hasLivestockCalculated && (
            <div className="rounded-3xl border shadow-lg overflow-hidden animate-fadeIn" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
              {livestockResult.zakat === 0 ? (
                <div className="p-6 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-(--color-gold) opacity-70 mx-auto" />
                  <p className="text-sm font-bold text-(--text-main) font-naskh">{livestockResult.description}</p>
                </div>
              ) : (
                <div className="p-5 text-center space-y-1" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                  <span className="text-[11px] text-(--text-muted) font-kurdish font-bold">زەکاتی ئاژەڵی واجب</span>
                  <div className="text-3xl font-black font-mono" style={{ color: 'var(--color-gold)' }}>{formatNumber(livestockResult.zakat)}</div>
                  <span className="text-xs text-(--text-muted) font-kurdish">({livestockResult.description})</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================= */}
      {/* ٤. تاب: زەکاتی فیتڕ */}
      {/* ============================================= */}
      {activeTab === 'fitr' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-3xl border shadow-sm space-y-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
            <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <Moon className="w-4 h-4 text-(--color-gold)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-main) font-naskh">زەکاتی فیتڕ</h3>
            </div>
            <p className="text-[10px] text-(--text-muted) font-kurdish">نزیکەی {FITR_ZAKAT_KG} کیلۆگرام لە خواردنی سەرەکی (گەنم، برنج...) بۆ هەر کەسێک.</p>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">ژمارەی کەسەکان</label>
                <input type="number" value={familySize || ''} onChange={(e) => { setFamilySize(parseFloat(e.target.value) || 0); setHasFitrCalculated(false); }} placeholder="1" className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-3 py-2.5 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
              </div>
              <div>
                <label className="text-[10px] text-(--text-muted) font-kurdish block mb-1">نرخی کیلۆیەک (دینار)</label>
                <input type="number" value={pricePerKg || ''} onChange={(e) => { setPricePerKg(parseFloat(e.target.value) || 0); setHasFitrCalculated(false); }} placeholder="0" className="w-full bg-(--bg-chip) border border-(--border-theme) rounded-2xl px-3 py-2.5 text-sm text-(--text-main) font-mono outline-none focus:border-(--color-gold)" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setHasFitrCalculated(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer" style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}>
              <Calculator className="w-4 h-4" />
              <span className="font-naskh">حیسابکردن</span>
            </button>
            <button type="button" onClick={handleReset} className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border text-sm font-bold cursor-pointer" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}>
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {hasFitrCalculated && (
            <div className="rounded-3xl border shadow-lg overflow-hidden animate-fadeIn" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
              <div className="p-5 text-center space-y-1" style={{ backgroundColor: 'var(--color-gold-muted)' }}>
                <span className="text-[11px] text-(--text-muted) font-kurdish font-bold">زەکاتی فیتڕ</span>
                <div className="text-3xl font-black font-mono" style={{ color: 'var(--color-gold)' }}>{formatNumber(fitrResult.totalCash)}</div>
                <span className="text-xs text-(--text-muted) font-kurdish">دینار ({formatNumber(fitrResult.totalKg)} کیلۆگرام)</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== ڕوونکردنەوەی شایستەکان ===== */}
      <button
        type="button"
        onClick={() => setShowRecipients(!showRecipients)}
        className="w-full p-4 rounded-3xl border text-start flex items-center gap-2 cursor-pointer"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
      >
        <Users className="w-4 h-4 text-(--color-gold) shrink-0" />
        <span className="text-xs font-bold text-(--text-main) font-naskh flex-1">
          ئەو کەسانەی شایستەی وەرگرتنی زەکاتن (٨ پۆل)
        </span>
        {showRecipients ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showRecipients && (
        <div className="p-4 rounded-3xl border space-y-2 animate-fadeIn" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}>
          {[
            'هەژاران (الفقیر)',
            'نەداران (المسکین)',
            'کارمەندانی کۆکردنەوەی زەکات (العاملین علیها)',
            'ئەوانەی دڵیان نەرم دەکرێت (المؤلفة قلوبهم)',
            'ئازادکردنی کۆیلەکان (فی الرقاب)',
            'قەرزداران (الغارمین)',
            'لە ڕێگای خودا (فی سبیل الله)',
            'ڕێبوارانی لە ڕێگا ماوە (ابن السبیل)',
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-(--text-muted) font-kurdish">
              <CheckCircle2 className="w-3 h-3 text-(--color-gold) shrink-0" />
              <span>{r}</span>
            </div>
          ))}
          <p className="text-[10px] text-(--text-muted) pt-2 border-t border-(--border-theme) leading-relaxed">
            زەکات نادرێت بە: دایک و باوک، منداڵان، هاوسەر، یان ئەوانەی کەسەرپەرشتی دەکەیت (چونکە سەرپەرشتییان لەسەر تۆیە).
          </p>
        </div>
      )}
    </div>
  );
};