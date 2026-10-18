import { HeirCounts, HeirResult } from '../types';

// ناوەکانی میراتگرەکان بە کوردی
export const HEIR_LABELS: Record<string, string> = {
  husband: 'مێرد',
  wife: 'ژن',
  father: 'باوک',
  mother: 'دایک',
  son: 'کوڕ',
  daughter: 'کچ',
  grandson: 'کوڕی کوڕ (نەوە)',
  granddaughter: 'کچی کوڕ (نەوە)',
  fullBrother: 'برای تەواو (هەردوو لایەک)',
  fullSister: 'خوشکی تەواو (هەردوو لایەک)',
  paternalBrother: 'برای باوکی',
  paternalSister: 'خوشکی باوکی',
  maternalBrother: 'برای دایکی',
  maternalSister: 'خوشکی دایکی',
  grandfather: 'باپیر (باوکی باوک)',
  grandmother: 'دایکە (دایکی دایک یان باوک)',
};

export const calculateInheritance = (counts: HeirCounts): { 
  results: HeirResult[]; 
  totalBase: number;
  error?: string;
} => {
  const results: HeirResult[] = [];
  
  const hasHusband = counts.husband > 0;
  const hasWife = counts.wife > 0;
  const hasFather = counts.father > 0;
  const hasMother = counts.mother > 0;
  const hasSon = counts.son > 0;
  const hasDaughter = counts.daughter > 0;
  const hasGrandson = counts.grandson > 0;
  const hasGranddaughter = counts.granddaughter > 0;
  const hasFullBrother = counts.fullBrother > 0;
  const hasFullSister = counts.fullSister > 0;
  const hasPaternalBrother = counts.paternalBrother > 0;
  const hasPaternalSister = counts.paternalSister > 0;
  const hasMaternalBrother = counts.maternalBrother > 0;
  const hasMaternalSister = counts.maternalSister > 0;
  const hasGrandfather = counts.grandfather > 0;
  const hasGrandmother = counts.grandmother > 0;

  const hasMaleDescendant = hasSon || hasGrandson;
  const hasAnyDescendant = hasSon || hasDaughter || hasGrandson || hasGranddaughter;

  let fixedShares: { type: string; count: number; fraction: number; reason: string }[] = [];
  let asabaCandidates: { type: string; count: number; ratio: number }[] = [];

  // ١. هاوسەر
  if (hasHusband) {
    if (hasAnyDescendant) {
      fixedShares.push({ type: 'husband', count: 1, fraction: 1/4, reason: 'مێرد (1/4) - چونکە نەوە هەیە' });
    } else {
      fixedShares.push({ type: 'husband', count: 1, fraction: 1/2, reason: 'مێرد (1/2) - چونکە نەوە نییە' });
    }
  }

  if (hasWife) {
    if (hasAnyDescendant) {
      fixedShares.push({ type: 'wife', count: counts.wife, fraction: 1/8, reason: `ژن (1/8) - چونکە نەوە هەیە` });
    } else {
      fixedShares.push({ type: 'wife', count: counts.wife, fraction: 1/4, reason: `ژن (1/4) - چونکە نەوە نییە` });
    }
  }

  // ٢. دایک و باوک
  if (hasMother) {
    const siblingsCount = counts.fullBrother + counts.fullSister + counts.paternalBrother + counts.paternalSister + counts.maternalBrother + counts.maternalSister;
    if (hasAnyDescendant || siblingsCount >= 2) {
      fixedShares.push({ type: 'mother', count: 1, fraction: 1/6, reason: 'دایک (1/6) - چونکە نەوە یان برای/خوشک هەیە' });
    } else {
      fixedShares.push({ type: 'mother', count: 1, fraction: 1/3, reason: 'دایک (1/3) - چونکە نەوە و برای/خوشکی کەم هەیە' });
    }
  }

  if (hasFather) {
    if (hasMaleDescendant) {
      fixedShares.push({ type: 'father', count: 1, fraction: 1/6, reason: 'باوک (1/6) - چونکە کوڕ هەیە' });
    } else {
      fixedShares.push({ type: 'father', count: 1, fraction: 1/6, reason: 'باوک (1/6 فەرز + ئەسەبە)' });
      asabaCandidates.push({ type: 'father', count: 1, ratio: 2 });
    }
  }

  // ٣. کوڕ و کچ
  if (hasSon || hasDaughter) {
    if (hasSon) {
      if (hasDaughter) {
        asabaCandidates.push({ type: 'son', count: counts.son, ratio: 2 });
        asabaCandidates.push({ type: 'daughter', count: counts.daughter, ratio: 1 });
      } else {
        asabaCandidates.push({ type: 'son', count: counts.son, ratio: 1 });
      }
    } else if (hasDaughter) {
      if (counts.daughter === 1) {
        fixedShares.push({ type: 'daughter', count: 1, fraction: 1/2, reason: 'کچ (1/2) - تەنها یەک کچ' });
      } else {
        fixedShares.push({ type: 'daughter', count: counts.daughter, fraction: 2/3, reason: 'کچان (2/3) - دوو کچ یان زیاتر' });
      }
    }
  } else if (hasGrandson || hasGranddaughter) {
    if (hasGrandson) {
      if (hasGranddaughter) {
        asabaCandidates.push({ type: 'grandson', count: counts.grandson, ratio: 2 });
        asabaCandidates.push({ type: 'granddaughter', count: counts.granddaughter, ratio: 1 });
      } else {
        asabaCandidates.push({ type: 'grandson', count: counts.grandson, ratio: 1 });
      }
    } else if (hasGranddaughter) {
      if (counts.granddaughter === 1) {
        fixedShares.push({ type: 'granddaughter', count: 1, fraction: 1/2, reason: 'کچی کوڕ (1/2) - تەنها یەک' });
      } else {
        fixedShares.push({ type: 'granddaughter', count: counts.granddaughter, fraction: 2/3, reason: 'کچانی کوڕ (2/3) - دوو یان زیاتر' });
      }
    }
  }

  // ٤. باپیر و دایکە
  if (!hasFather) {
    if (hasGrandfather) {
      if (hasMaleDescendant) {
        fixedShares.push({ type: 'grandfather', count: 1, fraction: 1/6, reason: 'باپیر (1/6) - چونکە کوڕ هەیە' });
      } else {
        fixedShares.push({ type: 'grandfather', count: 1, fraction: 1/6, reason: 'باپیر (1/6 فەرز + ئەسەبە)' });
        asabaCandidates.push({ type: 'grandfather', count: 1, ratio: 2 });
      }
    }

    if (hasGrandmother) {
      fixedShares.push({ type: 'grandmother', count: counts.grandmother, fraction: 1/6, reason: 'دایکە (1/6)' });
    }
  }

  // ٥. برای/خوشک
  const hasBlockingMale = hasMaleDescendant || hasFather || hasGrandfather;

  if (!hasBlockingMale) {
    if (hasFullBrother || hasFullSister) {
      if (hasFullBrother) {
        if (hasFullSister) {
          asabaCandidates.push({ type: 'fullBrother', count: counts.fullBrother, ratio: 2 });
          asabaCandidates.push({ type: 'fullSister', count: counts.fullSister, ratio: 1 });
        } else {
          asabaCandidates.push({ type: 'fullBrother', count: counts.fullBrother, ratio: 1 });
        }
      } else if (hasFullSister) {
        if (counts.fullSister === 1) {
          fixedShares.push({ type: 'fullSister', count: 1, fraction: 1/2, reason: 'خوشکی تەواو (1/2)' });
        } else {
          fixedShares.push({ type: 'fullSister', count: counts.fullSister, fraction: 2/3, reason: 'خوشکانی تەواو (2/3)' });
        }
      }
    } else if (hasPaternalBrother || hasPaternalSister) {
      if (hasPaternalBrother) {
        if (hasPaternalSister) {
          asabaCandidates.push({ type: 'paternalBrother', count: counts.paternalBrother, ratio: 2 });
          asabaCandidates.push({ type: 'paternalSister', count: counts.paternalSister, ratio: 1 });
        } else {
          asabaCandidates.push({ type: 'paternalBrother', count: counts.paternalBrother, ratio: 1 });
        }
      } else if (hasPaternalSister) {
        if (counts.paternalSister === 1) {
          fixedShares.push({ type: 'paternalSister', count: 1, fraction: 1/2, reason: 'خوشکی باوکی (1/2)' });
        } else {
          fixedShares.push({ type: 'paternalSister', count: counts.paternalSister, fraction: 2/3, reason: 'خوشکانی باوکی (2/3)' });
        }
      }
    }

    if (hasMaternalBrother || hasMaternalSister) {
      const maternalCount = counts.maternalBrother + counts.maternalSister;
      if (maternalCount === 1) {
        fixedShares.push({ 
          type: hasMaternalBrother ? 'maternalBrother' : 'maternalSister', 
          count: 1, 
          fraction: 1/6, 
          reason: 'برای/خوشکی دایکی (1/6) - تەنها یەک کەس' 
        });
      } else {
        fixedShares.push({ 
          type: 'maternalBrother', 
          count: counts.maternalBrother, 
          fraction: 1/3, 
          reason: 'برای دایکی (1/3 بەشدار لەگەڵ خوشک)' 
        });
        fixedShares.push({ 
          type: 'maternalSister', 
          count: counts.maternalSister, 
          fraction: 1/3, 
          reason: 'خوشکی دایکی (1/3 بەشدار لەگەڵ برا)' 
        });
      }
    }
  }

  // ٦. حیسابکردنی کۆی فەرزەکان
  let totalShares = fixedShares.reduce((sum, s) => sum + s.fraction, 0);

  let adjustedFractions: { type: string; count: number; fraction: number; reason: string }[] = [];
  
  if (totalShares > 1) {
    // عەول
    adjustedFractions = fixedShares.map(s => ({
      ...s,
      fraction: s.fraction / totalShares,
      reason: s.reason + ' (عەول)'
    }));
  } else if (totalShares < 1 && asabaCandidates.length === 0) {
    // ڕەد
    const nonSpouseTotal = fixedShares
      .filter(s => s.type !== 'husband' && s.type !== 'wife')
      .reduce((sum, s) => sum + s.fraction, 0);
    
    if (nonSpouseTotal > 0) {
      const spouseTotal = fixedShares
        .filter(s => s.type === 'husband' || s.type === 'wife')
        .reduce((sum, s) => sum + s.fraction, 0);

      adjustedFractions = fixedShares.map(s => {
        if (s.type === 'husband' || s.type === 'wife') {
          return s;
        }
        return {
          ...s,
          fraction: (s.fraction / nonSpouseTotal) * (1 - spouseTotal),
          reason: s.reason + ' (+ ڕەد)'
        };
      });
    } else {
      adjustedFractions = fixedShares;
    }
  } else {
    adjustedFractions = fixedShares;
  }

  // ٧. زیادکردنی ئەسەبەکان
  const asabaTotal = asabaCandidates.reduce((sum, a) => sum + (a.count * a.ratio), 0);
  const remainingShare = Math.max(0, 1 - adjustedFractions.reduce((sum, s) => sum + s.fraction, 0));

  if (asabaTotal > 0 && remainingShare > 0) {
    asabaCandidates.forEach(a => {
      const ratioPortion = (a.count * a.ratio) / asabaTotal;
      const fraction = remainingShare * ratioPortion;
      adjustedFractions.push({
        type: a.type,
        count: a.count,
        fraction: fraction,
        reason: `${HEIR_LABELS[a.type]} (ئەسەبە) - ${a.count} کەس`
      });
    });
  }

  // ٨. دروستکردنی ئەنجام
  adjustedFractions.forEach(s => {
    const existing = results.find(r => r.type === s.type);
    if (existing) {
      existing.sharePercent += s.fraction * 100;
      existing.shareFraction = `${(existing.sharePercent / 100).toFixed(3)}`;
    } else {
      results.push({
        type: s.type as any,
        label: HEIR_LABELS[s.type] || s.type,
        count: s.count,
        shareFraction: `${(s.fraction * 100).toFixed(2)}%`,
        sharePercent: s.fraction * 100,
        reason: s.reason
      });
    }
  });

  results.sort((a, b) => b.sharePercent - a.sharePercent);

  return {
    results,
    totalBase: 1,
  };
};