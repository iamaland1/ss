export interface FastingRecommendation {
  id: string;
  title: string;
  description: string;
  virtue: string;
  dayOfWeek?: number[];
  hijriDay?: number[];
  hijriMonth?: number[];
}

export const FASTING_RECOMMENDATIONS: FastingRecommendation[] = [
  {
    id: 'ramadan',
    title: 'ڕۆژووی مانگی ڕەمەزان',
    description: 'ڕۆژووی مانگی ڕەمەزان فەرزە لەسەر هەموو موسڵمانێکی بالغ و تەندروست.',
    virtue: 'پێغەمبەر ﷺ فەرموویەتی: "هەرکەس ڕۆژووی ڕەمەزان بگرێت بە باوەڕ و ئومێدی پاداشت، گوناهەکانی پێشووی دەبەخشرێت."',
    hijriMonth: [9],
  },
  {
    id: 'monday-thursday',
    title: 'ڕۆژووی دووشەممە و پێنجشەممە',
    description: 'سوننەتە ڕۆژوو بگریت لەم دوو ڕۆژەدا.',
    virtue: 'پێغەمبەر ﷺ زۆرجار لەم دوو ڕۆژەدا ڕۆژوو دەگرت و فەرمووی: "کردەوەکان لەم دوو ڕۆژەدا پیشان دەدرێن، بۆیە حەز دەکەم کاتێک کردەوەکانم پیشان دەدرێن، من ڕۆژووەوان بم."',
    dayOfWeek: [1, 4],
  },
  {
    id: 'white-days',
    title: 'ڕۆژووی ١٣، ١٤، ١٥ی مانگە کۆچییەکە',
    description: 'پێی دەگوترێت "الأيام البيض" (ڕۆژە سپییەکان).',
    virtue: 'پێغەمبەر ﷺ فەرمانی پێکردووە کە ٣ ڕۆژ ڕۆژوو بگریت لە هەر مانگێکدا، باشترە لە ڕۆژانی ١٣، ١٤، ١٥ی مانگی کۆچی.',
    hijriDay: [13, 14, 15],
  },
  {
    id: 'ashura',
    title: 'ڕۆژووی عاشورا',
    description: 'ڕۆژی ١٠ی موحەڕەم (عاشورا) و ڕۆژی پێشووی (تاسوعا - ٩ی موحەڕەم).',
    virtue: 'پێغەمبەر ﷺ فەرموویەتی: "ڕۆژووی عاشورا گوناهەکانی ساڵی ڕابردوو دەبەخشێت."',
    hijriDay: [9, 10],
    hijriMonth: [1],
  },
  {
    id: 'arafah',
    title: 'ڕۆژووی عەرەفە',
    description: 'ڕۆژی ٩ی ذولحیجە (ڕۆژی عەرەفە) بۆ ئەوانەی لە حەجدا نین.',
    virtue: 'پێغەمبەر ﷺ فەرموویەتی: "ڕۆژووی ڕۆژی عەرەفە گوناهەکانی ساڵی ڕابردوو و ساڵی داهاتوو دەبەخشێت."',
    hijriDay: [9],
    hijriMonth: [12],
  },
  {
    id: 'shaban',
    title: 'ڕۆژووی مانگی شەعبان',
    description: 'زۆر ڕۆژوو گرتن لە مانگی شەعبان (مانگی ٨ی کۆچی) سوننەتە.',
    virtue: 'عائیشە (ڕەزای خودای لێ بێت) فەرموویەتی: "پێغەمبەر ﷺ زۆرترین ڕۆژووی لە مانگی شەعبان دەگرت."',
    hijriMonth: [8],
  },
  {
    id: 'six-shawwal',
    title: 'ڕۆژووی ٦ ڕۆژی شەوال',
    description: 'دوای ڕەمەزان، ٦ ڕۆژ ڕۆژوو لە مانگی شەوال.',
    virtue: 'پێغەمبەر ﷺ فەرموویەتی: "هەرکەس ڕەمەزان ڕۆژوو بگرێت و پاشان ٦ ڕۆژ لە شەوال ڕۆژوو بگرێت، وەک ئەوەیە هەموو ساڵێک ڕۆژووی گرتبێت."',
    hijriMonth: [10],
  },
];

export const FASTING_TYPES = {
  fard: { label: 'فەرز', color: 'gold', icon: '🌙' },
  sunnah: { label: 'سوننەت', color: 'teal', icon: '⭐' },
  qada: { label: 'قەزا', color: 'rose', icon: '🔄' },
  none: { label: 'نەگیراو', color: 'gray', icon: '—' },
};