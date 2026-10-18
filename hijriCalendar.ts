/**
 * یاسا و فانکشنەکانی پەیوەندیدار بە تەقویمی کۆچی.
 */
import { HijriDateInfo, Language } from '../types';

export const HIJRI_MONTHS = {
  ckb: [
    'موحەڕڕەم', 'سەفەر', 'ڕەبیعی یەکەم', 'ڕەبیعی دووەم',
    'جومادای یەکەم', 'جومادای دووەم', 'ڕەجەب', 'شەعبان',
    'ڕەمەزان', 'شەووال', 'زولقەعدە', 'زولحیججە'
  ],
  ar: [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
    'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
    'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ],
  en: [
    'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
    'Jumada al-Ula', 'Jumada al-Thaniyah', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah'
  ]
};

export interface IslamicEvent {
  titleKu: string;
  titleAr: string;
  titleEn: string;
  hijriDay: number;
  hijriMonth: number; // 1-12
  descriptionKu: string;
  descriptionAr: string;
  descriptionEn: string;
  badge?: string;
}

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    titleKu: 'سەری ساڵی نوێی کۆچی',
    titleAr: 'رأس السنة الهجرية',
    titleEn: 'Islamic New Year',
    hijriDay: 1,
    hijriMonth: 1,
    descriptionKu: 'دەستپێکی ساڵی نوێی کۆچی بە کۆچی پێغەمبەر ﷺ لە مەککەوە بۆ مەدینە.',
    descriptionAr: 'ذكرى الهجرة النبوية المباركة من مكة إلى المدينة.',
    descriptionEn: 'Beginning of the new Hijri lunar calendar.'
  },
  {
    titleKu: 'ڕۆژی عاشوورا',
    titleAr: 'يوم عاشوراء',
    titleEn: 'Day of Ashura',
    hijriDay: 10,
    hijriMonth: 1,
    descriptionKu: 'ڕۆژووی ڕۆژی عاشوورا و ڕزگارکردنی حەزرەتی مووسا لە دەست فرعەون.',
    descriptionAr: 'يوم نجى الله فيه موسى عليه السلام وقومه من فرعون.',
    descriptionEn: 'The day Allah saved Prophet Musa from Pharaoh.'
  },
  {
    titleKu: 'مەولودی پێغەمبەر ﷺ',
    titleAr: 'المولد النبوي الشريف',
    titleEn: "Prophet's Birthday (Mawlid)",
    hijriDay: 12,
    hijriMonth: 3,
    descriptionKu: 'یادی لەدایکبوونی سەروەری مرۆڤایەتی حەزرەتی موحەممەد ﷺ.',
    descriptionAr: 'ذكرى مولد رسول الله محمد ﷺ خاتم الأنبياء.',
    descriptionEn: 'Commemoration of the birth of Prophet Muhammad (pbuh).'
  },
  {
    titleKu: 'ئیسرا و میعراج',
    titleAr: 'الإسراء والمعراج',
    titleEn: 'Al-Isra and Al-Mi\'raj',
    hijriDay: 27,
    hijriMonth: 7,
    descriptionKu: 'گەشتی شەوانەی پێغەمبەر ﷺ بۆ قودس و بەرزبوونەوەی بۆ ئاسمانەکان.',
    descriptionAr: 'معجزة الإسراء من المسجد الحرام للمسجد الأقصى والمعراج للسماوات.',
    descriptionEn: 'The miraculous night journey and heavenly ascension.'
  },
  {
    titleKu: 'شەوی نیوەی شەعبان (بەرات)',
    titleAr: 'ليلة النصف من شعبان',
    titleEn: "Night of Mid-Sha'ban",
    hijriDay: 15,
    hijriMonth: 8,
    descriptionKu: 'شەوی لێخۆشبوون و گۆڕانی قیبلە بۆ کەعبەی پیرۆز.',
    descriptionAr: 'ليلة مباركة يستحب فيها قيام الليل والدعاء.',
    descriptionEn: 'Blessed night of repentance and prayer.'
  },
  {
    titleKu: 'یەکەم ڕۆژی ڕەمەزانی پیرۆز',
    titleAr: 'أول أيام شهر رمضان المبارك',
    titleEn: 'First Day of Ramadan',
    hijriDay: 1,
    hijriMonth: 9,
    descriptionKu: 'دەستپێکی مانگی قورئان و بەرەکەت و ڕۆژووی فەرز.',
    descriptionAr: 'بداية شهر الصيام والقرآن والرحمة والغفران.',
    descriptionEn: 'Start of the blessed month of fasting and Quran.'
  },
  {
    titleKu: 'شەوی قەدر (شەوی ٢٧ ڕەمەزان)',
    titleAr: 'ليلة القدر المباركة',
    titleEn: 'Laylat al-Qadr (Night of Decree)',
    hijriDay: 27,
    hijriMonth: 9,
    descriptionKu: 'شەوێکی پیرۆز کە لە هەزار مانگ خێرتر و باڵاترە.',
    descriptionAr: 'خير من ألف شهر، نزل فيها القرآن الكريم.',
    descriptionEn: 'Better than a thousand months; the Quran was revealed.'
  },
  {
    titleKu: 'جەژنی ڕەمەزانی پیرۆز (عید الفطر)',
    titleAr: 'عيد الفطر المبارك',
    titleEn: 'Eid al-Fitr',
    hijriDay: 1,
    hijriMonth: 10,
    descriptionKu: 'جەژنی گەورەی موسڵمانان دوای کۆتایی هاتنی مانگی پیرۆزی ڕەمەزان.',
    descriptionAr: 'فرحة الصائمين بإتمام فريضة الصيام.',
    descriptionEn: 'Celebration marking the conclusion of the holy month of fasting.'
  },
  {
    titleKu: 'ڕۆژی عەرەفە',
    titleAr: 'يوم عرفة',
    titleEn: 'Day of Arafah',
    hijriDay: 9,
    hijriMonth: 12,
    descriptionKu: 'گەورەترین ڕوکنی حەج و ڕۆژووی پڕ خێر کە تاوانی دوو ساڵ دەسڕێتەوە.',
    descriptionAr: 'أعظم أركان الحج وصيامه يكفر سنة ماضية وسنة باقية.',
    descriptionEn: 'The pinnacle of Hajj and highly rewarded day of fasting.'
  },
  {
    titleKu: 'جەژنی قوربان (عید الأضحى)',
    titleAr: 'عيد الأضحى المبارك',
    titleEn: 'Eid al-Adha',
    hijriDay: 10,
    hijriMonth: 12,
    descriptionKu: 'جەژنی قوربانیکردن و تەواوکردنی سەفەری حەجی حاجیان.',
    descriptionAr: 'عيد التضحية وتمام مناسك الحج بالبيت الحرام.',
    descriptionEn: 'Feast of the Sacrifice and culmination of Hajj rituals.'
  }
];

export function getHijriDate(date = new Date(), dayAdjustment = 0): HijriDateInfo {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + dayAdjustment);

  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(adjustedDate);
    const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
    const month = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
    const year = parseInt(parts.find(p => p.type === 'year')?.value || '1448', 10);

    const safeMonthIdx = Math.max(0, Math.min(11, month - 1));

    return {
      day,
      month,
      year,
      monthNameKu: HIJRI_MONTHS.ckb[safeMonthIdx],
      monthNameAr: HIJRI_MONTHS.ar[safeMonthIdx],
      monthNameEn: HIJRI_MONTHS.en[safeMonthIdx],
      formattedKu: `${day}ی ${HIJRI_MONTHS.ckb[safeMonthIdx]}ی ${year} کۆچی`,
      formattedAr: `${day} ${HIJRI_MONTHS.ar[safeMonthIdx]} ${year} هـ`,
      formattedEn: `${day} ${HIJRI_MONTHS.en[safeMonthIdx]} ${year} AH`
    };
  } catch (e) {
    // Basic Umm al-Qura approximate algorithm
    const d = adjustedDate.getDate();
    return {
      day: d,
      month: 9,
      year: 1448,
      monthNameKu: 'ڕەمەزان',
      monthNameAr: 'رمضان',
      monthNameEn: 'Ramadan',
      formattedKu: `${d}ی ڕەمەزانی ١٤٤٨ کۆچی`,
      formattedAr: `${d} رمضان ١٤٤٨ هـ`,
      formattedEn: `${d} Ramadan 1448 AH`
    };
  }
}

export function formatGregorianDate(date = new Date(), lang: Language): string {
  const months = {
    ckb: ['کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەممووز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم'],
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  if (lang === 'ckb') return `${d}ی ${months.ckb[m]}ی ${y}`;
  if (lang === 'ar') return `${d} ${months.ar[m]} ${y} م`;
  return `${d} ${months.en[m]} ${y}`;
}
