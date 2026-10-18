/**
 * داتای سوورەت و ئایەتەکانی قورئان کە ئەپەکە بەکاریان دەهێنێت.
 */
import { SurahMeta, AyahItem } from '../types';

export const SURAH_LIST: SurahMeta[] = [
  { number: 1, nameAr: 'الفَاتِحَة', nameKu: 'فاتیحە', nameEn: 'Al-Faatiha', englishTranslation: 'The Opening', revelationType: 'Meccan', numberOfAyahs: 7 },
  { number: 2, nameAr: 'البَقَرَة', nameKu: 'بەقەرە', nameEn: 'Al-Baqara', englishTranslation: 'The Cow', revelationType: 'Medinan', numberOfAyahs: 286 },
  { number: 3, nameAr: 'آل عِمْرَان', nameKu: 'ئالی عیمران', nameEn: 'Aal-i-Imraan', englishTranslation: 'Family of Imran', revelationType: 'Medinan', numberOfAyahs: 200 },
  { number: 4, nameAr: 'النِّسَاء', nameKu: 'نیساء', nameEn: 'An-Nisaa', englishTranslation: 'The Women', revelationType: 'Medinan', numberOfAyahs: 176 },
  { number: 5, nameAr: 'المَائِدَة', nameKu: 'مائیدە', nameEn: 'Al-Maaida', englishTranslation: 'The Table Spread', revelationType: 'Medinan', numberOfAyahs: 120 },
  { number: 6, nameAr: 'الأَنْعَام', nameKu: 'ئەنعام', nameEn: 'Al-An\'aam', englishTranslation: 'The Cattle', revelationType: 'Meccan', numberOfAyahs: 165 },
  { number: 7, nameAr: 'الأَعْرَاف', nameKu: 'ئەعراف', nameEn: 'Al-A\'raaf', englishTranslation: 'The Heights', revelationType: 'Meccan', numberOfAyahs: 206 },
  { number: 8, nameAr: 'الأَنْفَال', nameKu: 'ئەنفال', nameEn: 'Al-Anfaal', englishTranslation: 'The Spoils of War', revelationType: 'Medinan', numberOfAyahs: 75 },
  { number: 9, nameAr: 'التَّوْبَة', nameKu: 'تەوبە', nameEn: 'At-Tawba', englishTranslation: 'The Repentance', revelationType: 'Medinan', numberOfAyahs: 129 },
  { number: 10, nameAr: 'يُونُس', nameKu: 'یونس', nameEn: 'Yunus', englishTranslation: 'Jonah', revelationType: 'Meccan', numberOfAyahs: 109 },
  { number: 11, nameAr: 'هُود', nameKu: 'هود', nameEn: 'Hud', englishTranslation: 'Hud', revelationType: 'Meccan', numberOfAyahs: 123 },
  { number: 12, nameAr: 'يُوسُف', nameKu: 'یوسف', nameEn: 'Yusuf', englishTranslation: 'Joseph', revelationType: 'Meccan', numberOfAyahs: 111 },
  { number: 13, nameAr: 'الرَّعْد', nameKu: 'ڕەعد', nameEn: 'Ar-Ra\'d', englishTranslation: 'The Thunder', revelationType: 'Medinan', numberOfAyahs: 43 },
  { number: 14, nameAr: 'إِبْرَاهِيم', nameKu: 'ئیبراهیم', nameEn: 'Ibrahim', englishTranslation: 'Abraham', revelationType: 'Meccan', numberOfAyahs: 52 },
  { number: 15, nameAr: 'الحِجْر', nameKu: 'حیجر', nameEn: 'Al-Hijr', englishTranslation: 'The Rocky Tract', revelationType: 'Meccan', numberOfAyahs: 99 },
  { number: 16, nameAr: 'النَّحْل', nameKu: 'نەحل', nameEn: 'An-Nahl', englishTranslation: 'The Bee', revelationType: 'Meccan', numberOfAyahs: 128 },
  { number: 17, nameAr: 'الإِسْرَاء', nameKu: 'ئیسراء', nameEn: 'Al-Israa', englishTranslation: 'The Night Journey', revelationType: 'Meccan', numberOfAyahs: 111 },
  { number: 18, nameAr: 'الكَهْف', nameKu: 'کەهف', nameEn: 'Al-Kahf', englishTranslation: 'The Cave', revelationType: 'Meccan', numberOfAyahs: 110 },
  { number: 19, nameAr: 'مَرْيَم', nameKu: 'مەریەم', nameEn: 'Maryam', englishTranslation: 'Mary', revelationType: 'Meccan', numberOfAyahs: 98 },
  { number: 20, nameAr: 'طه', nameKu: 'تاها', nameEn: 'Taa-Haa', englishTranslation: 'Ta-Ha', revelationType: 'Meccan', numberOfAyahs: 135 },
  { number: 21, nameAr: 'الأَنْبِيَاء', nameKu: 'ئەنبیاء', nameEn: 'Al-Anbiyaa', englishTranslation: 'The Prophets', revelationType: 'Meccan', numberOfAyahs: 112 },
  { number: 22, nameAr: 'الحَجّ', nameKu: 'حەج', nameEn: 'Al-Hajj', englishTranslation: 'The Pilgrimage', revelationType: 'Medinan', numberOfAyahs: 78 },
  { number: 23, nameAr: 'المُؤْمِنُون', nameKu: 'مئمینون', nameEn: 'Al-Mu\'minoon', englishTranslation: 'The Believers', revelationType: 'Meccan', numberOfAyahs: 118 },
  { number: 24, nameAr: 'النُّور', nameKu: 'نوور', nameEn: 'An-Noor', englishTranslation: 'The Light', revelationType: 'Medinan', numberOfAyahs: 64 },
  { number: 25, nameAr: 'الفُرْقَان', nameKu: 'فورقان', nameEn: 'Al-Furqaan', englishTranslation: 'The Criterion', revelationType: 'Meccan', numberOfAyahs: 77 },
  { number: 26, nameAr: 'الشُّعَرَاء', nameKu: 'شوعەراء', nameEn: 'Ash-Shu\'araa', englishTranslation: 'The Poets', revelationType: 'Meccan', numberOfAyahs: 227 },
  { number: 27, nameAr: 'النَّمْل', nameKu: 'نەمل', nameEn: 'An-Naml', englishTranslation: 'The Ant', revelationType: 'Meccan', numberOfAyahs: 93 },
  { number: 28, nameAr: 'القَصَص', nameKu: 'قەسەس', nameEn: 'Al-Qasas', englishTranslation: 'The Stories', revelationType: 'Meccan', numberOfAyahs: 88 },
  { number: 29, nameAr: 'العَنْكَبُوت', nameKu: 'عەنکەبووت', nameEn: 'Al-Ankaboot', englishTranslation: 'The Spider', revelationType: 'Meccan', numberOfAyahs: 69 },
  { number: 30, nameAr: 'الرُّوم', nameKu: 'ڕووم', nameEn: 'Ar-Room', englishTranslation: 'The Romans', revelationType: 'Meccan', numberOfAyahs: 60 },
  { number: 31, nameAr: 'لُقْمَان', nameKu: 'لوقمان', nameEn: 'Luqman', englishTranslation: 'Luqman', revelationType: 'Meccan', numberOfAyahs: 34 },
  { number: 32, nameAr: 'السَّجْدَة', nameKu: 'سەجدە', nameEn: 'As-Sajda', englishTranslation: 'The Prostration', revelationType: 'Meccan', numberOfAyahs: 30 },
  { number: 33, nameAr: 'الأَحْزَاب', nameKu: 'ئەحزاب', nameEn: 'Al-Ahzaab', englishTranslation: 'The Combined Forces', revelationType: 'Medinan', numberOfAyahs: 73 },
  { number: 34, nameAr: 'سَبَأ', nameKu: 'سەبەئـ', nameEn: 'Saba', englishTranslation: 'Sheba', revelationType: 'Meccan', numberOfAyahs: 54 },
  { number: 35, nameAr: 'فَاطِر', nameKu: 'فاتر', nameEn: 'Faatir', englishTranslation: 'The Originator', revelationType: 'Meccan', numberOfAyahs: 45 },
  { number: 36, nameAr: 'يس', nameKu: 'یاسین', nameEn: 'Yaseen', englishTranslation: 'Ya-Seen', revelationType: 'Meccan', numberOfAyahs: 83 },
  { number: 37, nameAr: 'الصَّافَّات', nameKu: 'سافات', nameEn: 'As-Saaffaat', englishTranslation: 'Those who set the Ranks', revelationType: 'Meccan', numberOfAyahs: 182 },
  { number: 38, nameAr: 'ص', nameKu: 'ساد', nameEn: 'Saad', englishTranslation: 'The Letter Saad', revelationType: 'Meccan', numberOfAyahs: 88 },
  { number: 39, nameAr: 'الزُّمَر', nameKu: 'زومەر', nameEn: 'Az-Zumar', englishTranslation: 'The Troops', revelationType: 'Meccan', numberOfAyahs: 75 },
  { number: 40, nameAr: 'غَافِر', nameKu: 'غافیر', nameEn: 'Ghafir', englishTranslation: 'The Forgiver', revelationType: 'Meccan', numberOfAyahs: 85 },
  { number: 41, nameAr: 'فُصِّلَت', nameKu: 'فوسیلەت', nameEn: 'Fussilat', englishTranslation: 'Explained in Detail', revelationType: 'Meccan', numberOfAyahs: 54 },
  { number: 42, nameAr: 'الشُّورَى', nameKu: 'شوورا', nameEn: 'Ash-Shura', englishTranslation: 'The Consultation', revelationType: 'Meccan', numberOfAyahs: 53 },
  { number: 43, nameAr: 'الزُّخْرُف', nameKu: 'زوخروف', nameEn: 'Az-Zukhruf', englishTranslation: 'The Ornaments of Gold', revelationType: 'Meccan', numberOfAyahs: 89 },
  { number: 44, nameAr: 'الدُّخَان', nameKu: 'دوخان', nameEn: 'Ad-Dukhan', englishTranslation: 'The Smoke', revelationType: 'Meccan', numberOfAyahs: 59 },
  { number: 45, nameAr: 'الجَاثِيَة', nameKu: 'جاسیە', nameEn: 'Al-Jaathiya', englishTranslation: 'The Crouching', revelationType: 'Meccan', numberOfAyahs: 37 },
  { number: 46, nameAr: 'الأَحْقَاف', nameKu: 'ئەحقاف', nameEn: 'Al-Ahqaf', englishTranslation: 'The Curved Sand-dunes', revelationType: 'Meccan', numberOfAyahs: 35 },
  { number: 47, nameAr: 'مُحَمَّد', nameKu: 'موحەممەد', nameEn: 'Muhammad', englishTranslation: 'Muhammad', revelationType: 'Medinan', numberOfAyahs: 38 },
  { number: 48, nameAr: 'الفَتْح', nameKu: 'فەتح', nameEn: 'Al-Fath', englishTranslation: 'The Victory', revelationType: 'Medinan', numberOfAyahs: 29 },
  { number: 49, nameAr: 'الحُجُرَات', nameKu: 'حوجورات', nameEn: 'Al-Hujuraat', englishTranslation: 'The Rooms', revelationType: 'Medinan', numberOfAyahs: 18 },
  { number: 50, nameAr: 'ق', nameKu: 'قاف', nameEn: 'Qaaf', englishTranslation: 'The Letter Qaf', revelationType: 'Meccan', numberOfAyahs: 45 },
  { number: 51, nameAr: 'الذَّارِيَات', nameKu: 'زاریات', nameEn: 'Adh-Dhaariyat', englishTranslation: 'The Winnowing Winds', revelationType: 'Meccan', numberOfAyahs: 60 },
  { number: 52, nameAr: 'الطُّور', nameKu: 'توور', nameEn: 'At-Toor', englishTranslation: 'The Mount', revelationType: 'Meccan', numberOfAyahs: 49 },
  { number: 53, nameAr: 'النَّجْم', nameKu: 'نەجم', nameEn: 'An-Najm', englishTranslation: 'The Star', revelationType: 'Meccan', numberOfAyahs: 62 },
  { number: 54, nameAr: 'القَمَر', nameKu: 'قەمەر', nameEn: 'Al-Qamar', englishTranslation: 'The Moon', revelationType: 'Meccan', numberOfAyahs: 55 },
  { number: 55, nameAr: 'الرَّحْمَن', nameKu: 'ڕەحمان', nameEn: 'Ar-Rahmaan', englishTranslation: 'The Beneficent', revelationType: 'Medinan', numberOfAyahs: 78 },
  { number: 56, nameAr: 'الوَاقِعَة', nameKu: 'واقیعه', nameEn: 'Al-Waaqia', englishTranslation: 'The Inevitable', revelationType: 'Meccan', numberOfAyahs: 96 },
  { number: 57, nameAr: 'الحَدِيد', nameKu: 'حەدید', nameEn: 'Al-Hadid', englishTranslation: 'The Iron', revelationType: 'Medinan', numberOfAyahs: 29 },
  { number: 58, nameAr: 'المُجَادَلَة', nameKu: 'موجادەلە', nameEn: 'Al-Mujaadila', englishTranslation: 'The Pleading Woman', revelationType: 'Medinan', numberOfAyahs: 22 },
  { number: 59, nameAr: 'الحَشْر', nameKu: 'حەشر', nameEn: 'Al-Hashr', englishTranslation: 'The Exile', revelationType: 'Medinan', numberOfAyahs: 24 },
  { number: 60, nameAr: 'المُمْتَحَنَة', nameKu: 'مومتەحەنە', nameEn: 'Al-Mumtahana', englishTranslation: 'She that is to be examined', revelationType: 'Medinan', numberOfAyahs: 13 },
  { number: 61, nameAr: 'الصَّفّ', nameKu: 'سەف', nameEn: 'As-Saff', englishTranslation: 'The Ranks', revelationType: 'Medinan', numberOfAyahs: 14 },
  { number: 62, nameAr: 'الجُمُعَة', nameKu: 'جومعە', nameEn: 'Al-Jumu\'a', englishTranslation: 'Friday', revelationType: 'Medinan', numberOfAyahs: 11 },
  { number: 63, nameAr: 'المُنَافِقُون', nameKu: 'مونافیقون', nameEn: 'Al-Munaafiqoon', englishTranslation: 'The Hypocrites', revelationType: 'Medinan', numberOfAyahs: 11 },
  { number: 64, nameAr: 'التَّغَابُن', nameKu: 'تەغابون', nameEn: 'At-Taghaabun', englishTranslation: 'The Mutual Disillusion', revelationType: 'Medinan', numberOfAyahs: 18 },
  { number: 65, nameAr: 'الطَّلَاق', nameKu: 'تەڵاق', nameEn: 'At-Talaaq', englishTranslation: 'The Divorce', revelationType: 'Medinan', numberOfAyahs: 12 },
  { number: 66, nameAr: 'التَّحْرِيم', nameKu: 'تەحریم', nameEn: 'At-Tahrim', englishTranslation: 'The Prohibition', revelationType: 'Medinan', numberOfAyahs: 12 },
  { number: 67, nameAr: 'المُلْك', nameKu: 'مولک', nameEn: 'Al-Mulk', englishTranslation: 'The Sovereignty', revelationType: 'Meccan', numberOfAyahs: 30 },
  { number: 68, nameAr: 'القَلَم', nameKu: 'قەڵەم', nameEn: 'Al-Qalam', englishTranslation: 'The Pen', revelationType: 'Meccan', numberOfAyahs: 52 },
  { number: 69, nameAr: 'الحَاقَّة', nameKu: 'حاقە', nameEn: 'Al-Haaqqa', englishTranslation: 'The Inevitable Reality', revelationType: 'Meccan', numberOfAyahs: 52 },
  { number: 70, nameAr: 'المَعَارِج', nameKu: 'مەعاریج', nameEn: 'Al-Ma\'aarij', englishTranslation: 'The Ascending Stairways', revelationType: 'Meccan', numberOfAyahs: 44 },
  { number: 71, nameAr: 'نُوح', nameKu: 'نووح', nameEn: 'Nooh', englishTranslation: 'Noah', revelationType: 'Meccan', numberOfAyahs: 28 },
  { number: 72, nameAr: 'الجِنّ', nameKu: 'جن', nameEn: 'Al-Jinn', englishTranslation: 'The Jinn', revelationType: 'Meccan', numberOfAyahs: 28 },
  { number: 73, nameAr: 'المُزَّمِّل', nameKu: 'موزەمیل', nameEn: 'Al-Muzzammil', englishTranslation: 'The Enshrouded One', revelationType: 'Meccan', numberOfAyahs: 20 },
  { number: 74, nameAr: 'المُدَّثِّر', nameKu: 'مودەسیر', nameEn: 'Al-Muddathir', englishTranslation: 'The Cloaked One', revelationType: 'Meccan', numberOfAyahs: 56 },
  { number: 75, nameAr: 'القِيَامَة', nameKu: 'قیامەت', nameEn: 'Al-Qiyaama', englishTranslation: 'The Resurrection', revelationType: 'Meccan', numberOfAyahs: 40 },
  { number: 76, nameAr: 'الإِنْسَان', nameKu: 'ئینسان', nameEn: 'Al-Insaan', englishTranslation: 'Man', revelationType: 'Medinan', numberOfAyahs: 31 },
  { number: 77, nameAr: 'المُرْسَلَات', nameKu: 'مورسەلات', nameEn: 'Al-Mursalaat', englishTranslation: 'The Emissaries', revelationType: 'Meccan', numberOfAyahs: 50 },
  { number: 78, nameAr: 'النَّبَأ', nameKu: 'نەبەئـ', nameEn: 'An-Naba', englishTranslation: 'The Tidings', revelationType: 'Meccan', numberOfAyahs: 40 },
  { number: 79, nameAr: 'النَّازِعَات', nameKu: 'نازیعات', nameEn: 'An-Naazi\'aat', englishTranslation: 'Those who drag forth', revelationType: 'Meccan', numberOfAyahs: 46 },
  { number: 80, nameAr: 'عَبَسَ', nameKu: 'عەبەسە', nameEn: 'Abasa', englishTranslation: 'He Frowned', revelationType: 'Meccan', numberOfAyahs: 42 },
  { number: 81, nameAr: 'التَّكْوِير', nameKu: 'تەکویر', nameEn: 'At-Takwir', englishTranslation: 'The Overthrowing', revelationType: 'Meccan', numberOfAyahs: 29 },
  { number: 82, nameAr: 'الانْفِطَار', nameKu: 'ئینفیتار', nameEn: 'Al-Infitaar', englishTranslation: 'The Cleaving', revelationType: 'Meccan', numberOfAyahs: 19 },
  { number: 83, nameAr: 'المُطَفِّفِين', nameKu: 'موتەفیفین', nameEn: 'Al-Mutaffifin', englishTranslation: 'Defrauding', revelationType: 'Meccan', numberOfAyahs: 36 },
  { number: 84, nameAr: 'الانْشِقَاق', nameKu: 'ئینشيقاق', nameEn: 'Al-Inshiqaaq', englishTranslation: 'The Splitting Asunder', revelationType: 'Meccan', numberOfAyahs: 25 },
  { number: 85, nameAr: 'البُرُوج', nameKu: 'بورووج', nameEn: 'Al-Burooj', englishTranslation: 'The Mansions of the Stars', revelationType: 'Meccan', numberOfAyahs: 22 },
  { number: 86, nameAr: 'الطَّارِق', nameKu: 'تاریق', nameEn: 'At-Taariq', englishTranslation: 'The Morning Star', revelationType: 'Meccan', numberOfAyahs: 17 },
  { number: 87, nameAr: 'الأَعْلَى', nameKu: 'ئەعلا', nameEn: 'Al-A\'laa', englishTranslation: 'The Most High', revelationType: 'Meccan', numberOfAyahs: 19 },
  { number: 88, nameAr: 'الغَاشِيَة', nameKu: 'غاشیە', nameEn: 'Al-Ghaashiya', englishTranslation: 'The Overwhelming Event', revelationType: 'Meccan', numberOfAyahs: 26 },
  { number: 89, nameAr: 'الفَجْر', nameKu: 'فەجر', nameEn: 'Al-Fajr', englishTranslation: 'The Dawn', revelationType: 'Meccan', numberOfAyahs: 30 },
  { number: 90, nameAr: 'البَلَد', nameKu: 'بەلەد', nameEn: 'Al-Balad', englishTranslation: 'The City', revelationType: 'Meccan', numberOfAyahs: 20 },
  { number: 91, nameAr: 'الشَّمْس', nameKu: 'شەمس', nameEn: 'Ash-Shams', englishTranslation: 'The Sun', revelationType: 'Meccan', numberOfAyahs: 15 },
  { number: 92, nameAr: 'اللَّيْل', nameKu: 'لەیل', nameEn: 'Al-Lail', englishTranslation: 'The Night', revelationType: 'Meccan', numberOfAyahs: 21 },
  { number: 93, nameAr: 'الضُّحَى', nameKu: 'زووحا', nameEn: 'Ad-Dhuhaa', englishTranslation: 'The Morning Hours', revelationType: 'Meccan', numberOfAyahs: 11 },
  { number: 94, nameAr: 'الشَّرْح', nameKu: 'شەرح', nameEn: 'Ash-Sharh', englishTranslation: 'The Relief', revelationType: 'Meccan', numberOfAyahs: 8 },
  { number: 95, nameAr: 'التِّين', nameKu: 'تین', nameEn: 'At-Teen', englishTranslation: 'The Fig', revelationType: 'Meccan', numberOfAyahs: 8 },
  { number: 96, nameAr: 'العَلَق', nameKu: 'عەلەق', nameEn: 'Al-Alaq', englishTranslation: 'The Clot', revelationType: 'Meccan', numberOfAyahs: 19 },
  { number: 97, nameAr: 'القَدْر', nameKu: 'قەدر', nameEn: 'Al-Qadr', englishTranslation: 'The Power', revelationType: 'Meccan', numberOfAyahs: 5 },
  { number: 98, nameAr: 'البَيِّنَة', nameKu: 'بەیینە', nameEn: 'Al-Bayyina', englishTranslation: 'The Clear Proof', revelationType: 'Medinan', numberOfAyahs: 8 },
  { number: 99, nameAr: 'الزَّلْزَلَة', nameKu: 'زەلزەلە', nameEn: 'Az-Zalzala', englishTranslation: 'The Earthquake', revelationType: 'Medinan', numberOfAyahs: 8 },
  { number: 100, nameAr: 'العَادِيَات', nameKu: 'عادیات', nameEn: 'Al-Aadiyaat', englishTranslation: 'The Courser', revelationType: 'Meccan', numberOfAyahs: 11 },
  { number: 101, nameAr: 'القَارِعَة', nameKu: 'قاریعە', nameEn: 'Al-Qaari\'a', englishTranslation: 'The Calamity', revelationType: 'Meccan', numberOfAyahs: 11 },
  { number: 102, nameAr: 'التَّكَاثُر', nameKu: 'تەکاسور', nameEn: 'At-Takaathur', englishTranslation: 'The Rivalry in World Increase', revelationType: 'Meccan', numberOfAyahs: 8 },
  { number: 103, nameAr: 'العَصْر', nameKu: 'عەسر', nameEn: 'Al-Asr', englishTranslation: 'The Declining Day', revelationType: 'Meccan', numberOfAyahs: 3 },
  { number: 104, nameAr: 'الهُمَزَة', nameKu: 'هومەزە', nameEn: 'Al-Humaza', englishTranslation: 'The Traducer', revelationType: 'Meccan', numberOfAyahs: 9 },
  { number: 105, nameAr: 'الفِيل', nameKu: 'فیل', nameEn: 'Al-Feel', englishTranslation: 'The Elephant', revelationType: 'Meccan', numberOfAyahs: 5 },
  { number: 106, nameAr: 'قُرَيْش', nameKu: 'قورەیش', nameEn: 'Quraish', englishTranslation: 'Quraysh', revelationType: 'Meccan', numberOfAyahs: 4 },
  { number: 107, nameAr: 'المَاعُون', nameKu: 'ماعوون', nameEn: 'Al-Maa\'oon', englishTranslation: 'The Small Kindness', revelationType: 'Meccan', numberOfAyahs: 7 },
  { number: 108, nameAr: 'الكَوْثَر', nameKu: 'کەوسەر', nameEn: 'Al-Kawthar', englishTranslation: 'The Abundance', revelationType: 'Meccan', numberOfAyahs: 3 },
  { number: 109, nameAr: 'الكَافِرُون', nameKu: 'کافیروون', nameEn: 'Al-Kaafiroon', englishTranslation: 'The Disbelievers', revelationType: 'Meccan', numberOfAyahs: 6 },
  { number: 110, nameAr: 'النَّصْر', nameKu: 'نەسر', nameEn: 'An-Nasr', englishTranslation: 'The Divine Support', revelationType: 'Medinan', numberOfAyahs: 3 },
  { number: 111, nameAr: 'المَسَد', nameKu: 'مەسەد', nameEn: 'Al-Masad', englishTranslation: 'The Palm Fibre', revelationType: 'Meccan', numberOfAyahs: 5 },
  { number: 112, nameAr: 'الإِخْلَاص', nameKu: 'ئیخلاس', nameEn: 'Al-Ikhlaas', englishTranslation: 'The Sincerity', revelationType: 'Meccan', numberOfAyahs: 4 },
  { number: 113, nameAr: 'الفَلَق', nameKu: 'فەلەق', nameEn: 'Al-Falaq', englishTranslation: 'The Daybreak', revelationType: 'Meccan', numberOfAyahs: 5 },
  { number: 114, nameAr: 'النَّاس', nameKu: 'ناس', nameEn: 'An-Naas', englishTranslation: 'Mankind', revelationType: 'Meccan', numberOfAyahs: 6 },
];

// Offline built-in verses for primary Surahs
export const PRELOADED_SURAHS: Record<number, AyahItem[]> = {
  1: [
    {
      numberInSurah: 1,
      textAr: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationKu: 'بە ناوی خوای بەخشندەی میهرەبان',
      translationEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3'
    },
    {
      numberInSurah: 2,
      textAr: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translationKu: 'هەموو ستایش و سوپاسێک شایستەی خوایە کە پەروەردگاری جیهانیانە',
      translationEn: 'All praise is due to Allah, Lord of the worlds.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3'
    },
    {
      numberInSurah: 3,
      textAr: 'الرَّحْمَٰنِ الرَّحِيمِ',
      translationKu: 'بەخشندەی میهرەبان',
      translationEn: 'The Entirely Merciful, the Especially Merciful.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3'
    },
    {
      numberInSurah: 4,
      textAr: 'مَالِكِ يَوْمِ الدِّينِ',
      translationKu: 'خاوەن و فەرمانڕەوای ڕۆژی پاداشت و لێپرسینەوەیە',
      translationEn: 'Sovereign of the Day of Recompense.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3'
    },
    {
      numberInSurah: 5,
      textAr: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      translationKu: 'تەنها تۆ دەپەرستین و تەنها لە تۆش داوای یارمەتی و کۆمەک دەکەین',
      translationEn: 'It is You we worship and You we ask for help.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3'
    },
    {
      numberInSurah: 6,
      textAr: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      translationKu: 'شارەزامان بکە و ڕێنموونیمان بکە بۆ ڕێگای ڕاست و دروست',
      translationEn: 'Guide us to the straight path.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3'
    },
    {
      numberInSurah: 7,
      textAr: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      translationKu: 'ڕێگای ئەو کەسانەی کە نیعمەتت ڕژاندووە بەسەریاندا، نەک ئەوانەی تووڕەییت لێ گرتوون و نە گومڕابووان',
      translationEn: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3'
    }
  ],
  112: [
    {
      numberInSurah: 1,
      textAr: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      translationKu: 'ئەی پێغەمبەر بڵێ: ئەو، خوای تاقانە و بێ هاوتایە',
      translationEn: 'Say: He is Allah, [who is] One,',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6221.mp3'
    },
    {
      numberInSurah: 2,
      textAr: 'اللَّهُ الصَّمَدُ',
      translationKu: 'خوایەک کە هەمووان پێویستیان پێیەتی و ئەو پێویستی بە کەس نییە',
      translationEn: 'Allah, the Eternal Refuge.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3'
    },
    {
      numberInSurah: 3,
      textAr: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      translationKu: 'نە کەسی لێ بووە و نە لە کەسیش بووە',
      translationEn: 'He neither begets nor is born,',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3'
    },
    {
      numberInSurah: 4,
      textAr: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      translationKu: 'و هیچ هاوتا و هاوشێوەیەکی نییە',
      translationEn: 'Nor is there to Him any equivalent.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3'
    }
  ],
  113: [
    {
      numberInSurah: 1,
      textAr: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
      translationKu: 'بڵێ پەنا دەگرم بە پەروەردگاری سپێدە',
      translationEn: 'Say: I seek refuge in the Lord of daybreak',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3'
    },
    {
      numberInSurah: 2,
      textAr: 'مِن شَرِّ مَا خَلَقَ',
      translationKu: 'لە شەڕ و خراپەی هەرچی دروستی کردووە',
      translationEn: 'From the evil of that which He created',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3'
    },
    {
      numberInSurah: 3,
      textAr: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
      translationKu: 'و لە خراپەی تاریکی شەو کاتێک دادەدات',
      translationEn: 'And from the evil of darkness when it settles',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3'
    },
    {
      numberInSurah: 4,
      textAr: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
      translationKu: 'و لە خراپەی ئەو ژنانەی پف دەکەنە گرێکان (سیحربازەکان)',
      translationEn: 'And from the evil of the blowers in knots',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6228.mp3'
    },
    {
      numberInSurah: 5,
      textAr: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      translationKu: 'و لە شەڕ و زیانی حەسوود کاتێک حەسوودی دەبات',
      translationEn: 'And from the evil of an envier when he envies.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6229.mp3'
    }
  ],
  114: [
    {
      numberInSurah: 1,
      textAr: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
      translationKu: 'بڵێ پەنا دەگرم بە پەروەردگاری مرۆڤەکان',
      translationEn: 'Say: I seek refuge in the Lord of mankind',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3'
    },
    {
      numberInSurah: 2,
      textAr: 'مَلِكِ النَّاسِ',
      translationKu: 'پاشا و فەرمانڕەوای مرۆڤەکان',
      translationEn: 'The Sovereign of mankind',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3'
    },
    {
      numberInSurah: 3,
      textAr: 'إِلَٰهِ النَّاسِ',
      translationKu: 'پەرستراوی ڕاستەقینەی مرۆڤەکان',
      translationEn: 'The God of mankind',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3'
    },
    {
      numberInSurah: 4,
      textAr: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
      translationKu: 'لە شەڕ و خراپەی وەسوەسەدەری پاشەکشێکەر (شەیتان)',
      translationEn: 'From the evil of the retreating whisperer',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3'
    },
    {
      numberInSurah: 5,
      textAr: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
      translationKu: 'ئەوەی کە وەسوەسە دەخاتە دڵی خەڵکییەوە',
      translationEn: 'Who whispers evil into the breasts of mankind',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6234.mp3'
    },
    {
      numberInSurah: 6,
      textAr: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
      translationKu: 'جا چ لە جنۆکە بێت یان لە مرۆڤەکان',
      translationEn: 'From among the jinn and mankind.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6235.mp3'
    }
  ]
};

// Dynamic Surah Fetcher from API with local cache
export async function fetchSurahVerses(surahNumber: number): Promise<AyahItem[]> {
  // If preloaded, return immediately
  if (PRELOADED_SURAHS[surahNumber]) {
    return PRELOADED_SURAHS[surahNumber];
  }

  const cacheKey = `sirat_surah_${surahNumber}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    // ignore
  }

  try {
    // AlQuran Cloud API: uthmani text + English translation + audio
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.asad`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.length >= 2) {
        const arabicVerses = json.data[0].ayahs;
        const englishVerses = json.data[1].ayahs;

        const verses: AyahItem[] = arabicVerses.map((a: { numberInSurah: number; text: string; number: number }, index: number) => {
          return {
            numberInSurah: a.numberInSurah,
            textAr: a.text,
            translationKu: `ئایەتی ${a.numberInSurah} لە سوورەتی پیرۆز`,
            translationEn: englishVerses[index]?.text || '',
            audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.number}.mp3`
          };
        });

        try {
          localStorage.setItem(cacheKey, JSON.stringify(verses));
        } catch (e) {
          // ignore
        }

        return verses;
      }
    }
  } catch {
    // Graceful silent fallback
  }

  // Graceful fallback for missing surah
  return [
    {
      numberInSurah: 1,
      textAr: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationKu: 'بە ناوی خوای بەخشندەی میهرەبان',
      translationEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3'
    }
  ];
}
