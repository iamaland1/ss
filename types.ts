export type Language = 'ckb' | 'ar' | 'en';

export interface CityInfo {
  id: string;
  nameKu: string;
  nameAr: string;
  nameEn: string;
  countryKu: string;
  countryAr: string;
  countryEn: string;
  latitude: number;
  longitude: number;
  timezone: string;
  offsetMinutes?: {
    fajr?: number;
    dhuhr?: number;
    asr?: number;
    maghrib?: number;
    isha?: number;
  };
}

export interface PrayerTimings {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  [key: string]: string;
}

export interface HijriDateInfo {
  day: number;
  month: number;
  year: number;
  monthNameKu: string;
  monthNameAr: string;
  monthNameEn: string;
  formattedKu: string;
  formattedAr: string;
  formattedEn: string;
}

export interface SurahMeta {
  number: number;
  nameAr: string;
  nameKu: string;
  nameEn: string;
  englishTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
}

export interface AyahItem {
  numberInSurah: number;
  textAr: string;
  translationKu: string;
  translationEn: string;
  audioUrl?: string;
}

export interface QuranDuaItem {
  id: number;
  surah: string;
  surahAr: string;
  surahEn?: string;
  ayahNumber: number | string;
  arabic: string;
  kurdish: string;
  ar: string;
  en: string;
  tag: string;
}

export interface DhikrItem {
  id: string;
  category: 'morning' | 'evening' | 'after_prayer' | 'sleep' | 'daily';
  arabic: string;
  kurdish: string;
  english: string;
  targetCount: number;
  virtueKu?: string;
  virtueAr?: string;
  virtueEn?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  category: 'friday' | 'reminder' | 'hadith' | 'announcement' | 'update';
  priority: 'urgent' | 'normal';
  createdAt: string;
  scheduledAt?: string;
  isPinned?: boolean;
  author?: string;
}

export interface AdhanVoice {
  id: string;
  nameKu: string;
  nameAr: string;
  nameEn: string;
  descriptionKu: string;
  audioUrl: string;
  region: 'kurdish' | 'islamic' | 'default';
}

export interface PrayerAdhanMapping {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface NotificationSettings {
  adhanSoundEnabled: boolean;
  selectedDefaultVoice: string;
  prayerVoices: PrayerAdhanMapping;
  prayers: {
    fajr: boolean;
    sunrise: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  prePrayerAlert: boolean;
  prePrayerMinutes: number;
  quranDailyReminder: boolean;
  adhkarReminder: boolean;
  fastingReminder: boolean;
  silentModeDuringPrayer: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  type: 'bug' | 'suggestion' | 'question' | 'feedback';
  subject: string;
  details: string;
  createdAt: string;
}

export type AppearanceMode = 'light' | 'dark' | 'system';

export type TabType =
  | 'prayer'
  | 'quran'
  | 'adhkar'
  | 'tasbih'
  | 'qibla'
  | 'arQibla'
  | 'names'
  | 'prophets'
  | 'asma'
  | 'mirath'
  | 'zakat'
  | 'hajj'
  | 'fasting'
  | 'shareImage'
  | 'planner'
  | 'stats'
  | 'nearbyMosques'
  | 'audioQuran'
  | 'calendar'
  | 'messages'
  | 'settings'
  | 'admin';

export interface DailyDuaItem {
  id: number;
  category:
    | 'after-prayer'
    | 'exit-home'
    | 'enter-home'
    | 'market'
    | 'travel'
    | 'eating'
    | 'sleeping'
    | 'waking'
    | 'toilet'
    | 'wudu'
    | 'mosque'
    | 'general';
  title: string;
  occasion: string;
  arabic: string;
  kurdish: string;
  virtue?: string;
  reference?: string;
}

export interface IslamicNameItem {
  id: number;
  gender: 'boy' | 'girl';
  nameAr: string;
  nameKu: string;
  transliteration: string;
  meaningKu: string;
  meaningAr: string;
  origin: string;
  quranMentioned: boolean;
  sahabaOrFigure?: string;
  tags: string[];
}

export interface ProphetItem {
  id: number;
  nameAr: string;
  nameKu: string;
  transliteration: string;
  title: string;
  age?: number;
  ageNote?: string;
  era: string;
  sentTo: string;
  mentionedInQuran: number;
  miracles: string[];
  story: string;
  quranSurahs: string[];
  grave?: string;
  tags: string[];
}

export interface DivineNameItem {
  id: number;
  nameAr: string;
  nameKu: string;
  transliteration: string;
  meaningKu: string;
  meaningAr: string;
  explanationKu: string;
  quranMentioned: boolean;
  category: 'mercy' | 'power' | 'knowledge' | 'creation' | 'kingship' | 'other';
  relatedNames?: string[];
  tags: string[];
}

export type HeirType = 
  | 'husband' | 'wife' 
  | 'father' | 'mother' 
  | 'son' | 'daughter' 
  | 'grandson' | 'granddaughter' 
  | 'fullBrother' | 'fullSister' 
  | 'paternalBrother' | 'paternalSister' 
  | 'maternalBrother' | 'maternalSister' 
  | 'grandfather' | 'grandmother';

export interface HeirCounts {
  husband: number;
  wife: number;
  father: number;
  mother: number;
  son: number;
  daughter: number;
  grandson: number;
  granddaughter: number;
  fullBrother: number;
  fullSister: number;
  paternalBrother: number;
  paternalSister: number;
  maternalBrother: number;
  maternalSister: number;
  grandfather: number;
  grandmother: number;
}

export interface HeirResult {
  type: HeirType;
  label: string;
  count: number;
  shareFraction: string;
  sharePercent: number;
  reason: string;
}

export interface ZakatInputs {
  cash: number;
  goldGrams: number;
  goldPricePerGram: number;
  silverGrams: number;
  silverPricePerGram: number;
  businessValue: number;
  debts: number;
}

export interface ZakatResult {
  cashZakat: number;
  goldZakat: number;
  silverZakat: number;
  businessZakat: number;
  totalZakat: number;
  totalAssets: number;
  nisabGold: number;
  nisabSilver: number;
  nisabUsed: number;
  meetsNisab: boolean;
  nisabType: 'gold' | 'silver';
}

export interface Reciter {
  id: string;
  nameKu: string;
  nameAr: string;
  nameEn: string;
  serverUrl: string;
}

export type FastingType = 'fard' | 'sunnah' | 'qada' | 'none';

export interface FastingRecord {
  date: string;
  type: FastingType;
  note?: string;
}

export interface CustomPlan {
  id: string;
  name: string;
  totalDays: number;
  startDate: string;
  endDate: string;
  fromSurah: number;
  toSurah: number;
  fromJuz?: number;
  toJuz?: number;
  dailyPages: number;
  currentPage: number;
  completedPages: number;
  completedDays: number;
  mode: ReadingMode;
}

export type ReadingMode = 'reading' | 'tafsir';

export interface AppUsageStats {
  totalSeconds: number;
  dailyUsage: { [date: string]: number };
  weeklyUsage: { [week: string]: number };
  monthlyUsage: { [month: string]: number };
}

export interface Mosque {
  id: string;
  name: string;
  nameAr?: string;
  latitude: number;
  longitude: number;
  distance: number;
  address?: string;
}