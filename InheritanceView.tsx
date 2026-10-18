/**
 * بەشی حیسابکردنی میرات (فەرائز) بەپێی شەریعەتی ئیسلامی.
 */
import React, { useState } from 'react';
import { 
  Calculator, 
  Scale, 
  Info, 
  User, 
  Users, 
  Baby,
  Heart,
  RotateCcw,
  Sparkles,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { Language, HeirCounts } from '../types';
import { calculateInheritance } from '../data/inheritance';

interface InheritanceViewProps {
  lang: Language;
}

export const InheritanceView: React.FC<InheritanceViewProps> = ({ lang }) => {
  const isRtl = lang === 'ckb' || lang === 'ar';

  const [counts, setCounts] = useState<HeirCounts>({
    husband: 0, wife: 0, father: 0, mother: 0,
    son: 0, daughter: 0, grandson: 0, granddaughter: 0,
    fullBrother: 0, fullSister: 0, paternalBrother: 0, paternalSister: 0,
    maternalBrother: 0, maternalSister: 0, grandfather: 0, grandmother: 0,
  });

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const handleChange = (key: keyof HeirCounts, value: number) => {
    setCounts(prev => ({ ...prev, [key]: Math.max(0, value) }));
    setHasCalculated(false);
  };

  const handleReset = () => {
    setCounts({
      husband: 0, wife: 0, father: 0, mother: 0,
      son: 0, daughter: 0, grandson: 0, granddaughter: 0,
      fullBrother: 0, fullSister: 0, paternalBrother: 0, paternalSister: 0,
      maternalBrother: 0, maternalSister: 0, grandfather: 0, grandmother: 0,
    });
    setHasCalculated(false);
  };

  const result = calculateInheritance(counts);

  const heirGroups = [
    {
      title: 'هاوسەر',
      icon: Heart,
      items: [
        { key: 'husband' as keyof HeirCounts, label: 'مێرد' },
        { key: 'wife' as keyof HeirCounts, label: 'ژن' },
      ]
    },
    {
      title: 'دایک و باوک',
      icon: User,
      items: [
        { key: 'father' as keyof HeirCounts, label: 'باوک' },
        { key: 'mother' as keyof HeirCounts, label: 'دایک' },
        { key: 'grandfather' as keyof HeirCounts, label: 'باپیر' },
        { key: 'grandmother' as keyof HeirCounts, label: 'دایکە' },
      ]
    },
    {
      title: 'منداڵان',
      icon: Baby,
      items: [
        { key: 'son' as keyof HeirCounts, label: 'کوڕ' },
        { key: 'daughter' as keyof HeirCounts, label: 'کچ' },
        { key: 'grandson' as keyof HeirCounts, label: 'کوڕی کوڕ' },
        { key: 'granddaughter' as keyof HeirCounts, label: 'کچی کوڕ' },
      ]
    },
    {
      title: 'برایان و خوشکان',
      icon: Users,
      items: [
        { key: 'fullBrother' as keyof HeirCounts, label: 'برای تەواو' },
        { key: 'fullSister' as keyof HeirCounts, label: 'خوشکی تەواو' },
        { key: 'paternalBrother' as keyof HeirCounts, label: 'برای باوکی' },
        { key: 'paternalSister' as keyof HeirCounts, label: 'خوشکی باوکی' },
        { key: 'maternalBrother' as keyof HeirCounts, label: 'برای دایکی' },
        { key: 'maternalSister' as keyof HeirCounts, label: 'خوشکی دایکی' },
      ]
    },
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
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />

        <div className="flex items-center gap-3 relative z-10">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0 relative"
            style={{ backgroundColor: 'var(--color-gold-muted)' }}
          >
            <Scale className="w-7 h-7 text-(--color-gold)" />
            <Sparkles className="w-3 h-3 text-(--color-gold) absolute -top-0.5 -right-0.5 opacity-70" />
          </div>
          <div>
            <h1 
              className="text-2xl font-bold font-naskh tracking-tight"
              style={{ color: 'var(--color-gold)' }}
            >
              حیسابکردنی میرات
            </h1>
            <p className="text-xs text-(--text-muted) font-kurdish">
              فەرائز • دابەشکردنی میرات بەپێی شەریعەتی ئیسلامی
            </p>
          </div>
        </div>

        <div 
          className="p-3 rounded-2xl border text-[11px] text-(--text-muted) leading-relaxed relative z-10 flex gap-2"
          style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
        >
          <Info className="w-4 h-4 text-(--color-gold) shrink-0 mt-0.5" />
          <p>
            تکایە ژمارەی هەر میراتگرێک لە خشتەی خوارەوە بنووسە. سیستەمەکە خۆکارانە بەشەکانی هەر کەسێک حیساب دەکات بەپێی یاساکانی فەرائز لە فیقهی ئیسلامیدا.
          </p>
        </div>
      </div>

      {/* ===== فۆرمی میراتگرەکان ===== */}
      <div className="space-y-4">
        {heirGroups.map((group, idx) => {
          const GroupIcon = group.icon;
          return (
            <div 
              key={idx}
              className="p-4 rounded-3xl border shadow-sm space-y-3"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-(--border-theme)">
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-gold-muted)' }}
                >
                  <GroupIcon className="w-4 h-4 text-(--color-gold)" />
                </div>
                <h3 className="text-sm font-bold text-(--text-main) font-naskh">
                  {group.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {group.items.map((item) => (
                  <div 
                    key={item.key}
                    className="p-2.5 rounded-2xl border flex items-center justify-between gap-2"
                    style={{ backgroundColor: 'var(--bg-chip)', borderColor: 'var(--border-theme)' }}
                  >
                    <span className="text-xs font-bold text-(--text-main) font-naskh truncate">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleChange(item.key, counts[item.key] - 1)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/10 text-(--text-main) hover:bg-white/20 transition-all font-bold text-sm cursor-pointer"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={counts[item.key]}
                        onChange={(e) => handleChange(item.key, parseInt(e.target.value) || 0)}
                        className="w-10 text-center bg-transparent text-(--color-gold) font-mono font-bold text-sm outline-none"
                        min="0"
                      />
                      <button
                        type="button"
                        onClick={() => handleChange(item.key, counts[item.key] + 1)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/10 text-(--text-main) hover:bg-white/20 transition-all font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== دوگمەکانی کردار ===== */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setHasCalculated(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-md cursor-pointer"
          style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
        >
          <Calculator className="w-4 h-4" />
          <span className="font-naskh">حیسابکردن</span>
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border text-sm font-bold transition-all active:scale-[0.98] cursor-pointer"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)', color: 'var(--text-muted)' }}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="font-naskh">سفرکردنەوە</span>
        </button>
      </div>

      {/* ===== ئەنجام ===== */}
      {hasCalculated && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2 px-1">
            <Scale className="w-4 h-4 text-(--color-gold)" />
            <h3 className="text-sm font-bold text-(--text-main) font-naskh">
              ئەنجامی دابەشکردن
            </h3>
          </div>

          {result.results.length === 0 ? (
            <div 
              className="p-8 rounded-3xl border text-center space-y-2"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            >
              <AlertCircle className="w-8 h-8 text-(--color-gold) opacity-70 mx-auto" />
              <p className="text-xs text-(--text-muted) font-kurdish">
                تکایە لانیکەم یەک میراتگر دیاری بکە
              </p>
            </div>
          ) : (
            <div 
              className="rounded-3xl border shadow-lg overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-theme)' }}
            >
              {result.results.map((r, idx) => (
                <div
                  key={idx}
                  className="p-4 border-b last:border-b-0 border-(--border-theme) space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shadow-sm"
                        style={{ backgroundColor: 'var(--color-gold)', color: '#031F3C' }}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-(--text-main) font-naskh">
                          {r.label}
                        </h4>
                        {r.count > 1 && (
                          <span className="text-[10px] text-(--text-muted) font-kurdish">
                            {r.count} کەس (هەر یەکێک {(r.sharePercent / r.count).toFixed(2)}%)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-end">
                      <span 
                        className="text-lg font-black font-mono"
                        style={{ color: 'var(--color-gold)' }}
                      >
                        {r.sharePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div 
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--bg-chip)' }}
                  >
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${r.sharePercent}%`,
                        background: 'linear-gradient(90deg, var(--color-gold), var(--color-teal))'
                      }}
                    />
                  </div>

                  <p className="text-[10px] text-(--text-muted) font-kurdish leading-relaxed">
                    <Info className="w-2.5 h-2.5 inline mr-1" />
                    {r.reason}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div 
            className="p-3 rounded-2xl border text-[11px] text-(--text-muted) leading-relaxed flex gap-2"
            style={{ backgroundColor: 'var(--color-gold-muted)', borderColor: 'rgba(242, 201, 76, 0.3)' }}
          >
            <BookOpen className="w-3.5 h-3.5 text-(--color-gold) shrink-0 mt-0.5" />
            <p>
              <strong className="text-(--color-gold)">تێبینی:</strong> ئەم حیسابانە بەپێی یاسا گشتییەکانی فەرائزە. لە حاڵەتە ئاڵۆزەکاندا (وەک عەول، ڕەد، حەجب) ڕەنگە پێویست بە گەڕانەوە بۆ زانای فەرائز بێت. هەروەها ئەم حیسابانە بۆ تەرەکەیەکە کە مافی وەسیەت و قەرز لێ دەرنەچووە.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};