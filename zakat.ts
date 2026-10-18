import { ZakatInputs, ZakatResult } from '../types';

export const NISAB_GOLD_GRAMS = 85;
export const NISAB_SILVER_GRAMS = 595;
export const ZAKAT_RATE = 0.025;

// ===== زەکاتی پارە و ئاڵتوون و زیو و کاڵا =====
export const calculateZakat = (inputs: ZakatInputs): ZakatResult => {
  const {
    cash,
    goldGrams,
    goldPricePerGram,
    silverGrams,
    silverPricePerGram,
    businessValue,
    debts,
  } = inputs;

  const totalAssets = cash + (goldGrams * goldPricePerGram) + (silverGrams * silverPricePerGram) + businessValue;
  const netAssets = Math.max(0, totalAssets - debts);

  const nisabGold = NISAB_GOLD_GRAMS * goldPricePerGram;
  const nisabSilver = NISAB_SILVER_GRAMS * silverPricePerGram;

  const nisabUsed = Math.min(nisabGold, nisabSilver);
  const nisabType: 'gold' | 'silver' = nisabGold <= nisabSilver ? 'gold' : 'silver';

  const meetsNisab = netAssets >= nisabUsed;

  if (!meetsNisab) {
    return {
      cashZakat: 0, goldZakat: 0, silverZakat: 0, businessZakat: 0, totalZakat: 0,
      totalAssets: netAssets, nisabGold, nisabSilver, nisabUsed, meetsNisab: false, nisabType,
    };
  }

  const cashZakat = cash * ZAKAT_RATE;
  const goldZakat = goldGrams * ZAKAT_RATE;
  const silverZakat = silverGrams * ZAKAT_RATE;
  const businessZakat = businessValue * ZAKAT_RATE;

  const totalZakat = (cash + businessValue) * ZAKAT_RATE + (goldGrams * goldPricePerGram * ZAKAT_RATE) + (silverGrams * silverPricePerGram * ZAKAT_RATE);

  return {
    cashZakat, goldZakat, silverZakat, businessZakat, totalZakat,
    totalAssets: netAssets, nisabGold, nisabSilver, nisabUsed, meetsNisab: true, nisabType,
  };
};

// ===== زەکاتی کشتوکاڵ =====
export const NISAB_CROPS_KG = 653;
export const CROP_ZAKAT_RATE_RAIN = 0.10;
export const CROP_ZAKAT_RATE_IRRIGATED = 0.05;

export const calculateCropZakat = (kg: number, isRainFed: boolean) => {
  if (kg < NISAB_CROPS_KG) return { zakatKg: 0, rate: 0, meetsNisab: false };
  const rate = isRainFed ? CROP_ZAKAT_RATE_RAIN : CROP_ZAKAT_RATE_IRRIGATED;
  return { zakatKg: kg * rate, rate, meetsNisab: true };
};

// ===== زەکاتی ئاژەڵ =====
export const calculateLivestockZakat = (type: 'sheep' | 'cow' | 'camel', count: number) => {
  if (type === 'sheep') {
    if (count < 40) return { zakat: 0, description: 'کەمترە لە نەسیاب (٤٠ مەڕ)' };
    if (count <= 120) return { zakat: 1, description: '١ مەڕ' };
    if (count <= 200) return { zakat: 2, description: '٢ مەڕ' };
    if (count <= 300) return { zakat: 3, description: '٣ مەڕ' };
    return { zakat: Math.floor(count / 100) + 3, description: `بۆ هەر ١٠٠ مەڕێکی تر، ١ مەڕ` };
  }
  
  if (type === 'cow') {
    if (count < 30) return { zakat: 0, description: 'کەمترە لە نەسیاب (٣٠ مانگا)' };
    if (count <= 39) return { zakat: 1, description: '١ مانگای ساڵانە (تابیع)' };
    if (count <= 59) return { zakat: 1, description: '١ مانگای دوو ساڵان (موسینە)' };
    if (count <= 69) return { zakat: 2, description: '٢ مانگای ساڵان' };
    return { zakat: Math.floor(count / 30), description: `بۆ هەر ٣٠ مانگایەک، ١ مانگا` };
  }

  if (type === 'camel') {
    if (count < 5) return { zakat: 0, description: 'کەمترە لە نەسیاب (٥ وشتر)' };
    if (count <= 9) return { zakat: 1, description: '١ مەڕ' };
    if (count <= 14) return { zakat: 2, description: '٢ مەڕ' };
    if (count <= 19) return { zakat: 3, description: '٣ مەڕ' };
    if (count <= 24) return { zakat: 4, description: '٤ مەڕ' };
    if (count <= 35) return { zakat: 1, description: '١ وشتری ساڵان (بنت مەخاز)' };
    return { zakat: Math.floor(count / 40), description: `بۆ هەر ٤٠ وشترێک، ١ وشتر` };
  }

  return { zakat: 0, description: '' };
};

// ===== زەکاتی فیتڕ =====
export const FITR_ZAKAT_KG = 2.5;
export const calculateFitrZakat = (familySize: number, pricePerKg: number) => {
  const totalKg = familySize * FITR_ZAKAT_KG;
  return {
    totalKg,
    totalCash: totalKg * pricePerKg,
  };
};

// ===== ڕوونکردنەوەی نەسیاب =====
export const NISAB_EXPLANATION = {
  gold: `نەسیابی ئاڵتوون: ${NISAB_GOLD_GRAMS} گرام ئاڵتوونی خاو (عەیار ٢٤).`,
  silver: `نەسیابی زیو: ${NISAB_SILVER_GRAMS} گرام زیوی خاو.`,
  rate: 'ڕێژەی زەکات: ٢.٥٪ (١/٤٠) لە سەروەتەکە.',
  condition: 'مەرجەکان: موسڵمان بێت، سەروەت بگاتە نەسیاب، ساڵێکی تەواو تێپەڕ بێت (حەول).',
};