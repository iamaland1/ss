/**
 * داتای دوعا قورئانییەکان.
 */
import { QuranDuaItem } from '../types';

export const QURAN_DUAS_DATA: QuranDuaItem[] = [
  // 1: Al-Fatiha
  {
    id: 1,
    surah: 'فاتیحە',
    surahAr: 'سورة الفاتحة',
    surahEn: 'Al-Fatihah',
    ayahNumber: '6-7',
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ * صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    kurdish: 'خوایە ڕێنموونیمان بکە بۆ ڕێگای ڕاست و دروست؛ ڕێگای ئەوانەی کە نیعمەتت بەسەردا ڕژاندوون، نەک ئەوانەی تووڕەییت لێ گرتوون، و نەک گومڕا و سەرلێشێواوان.',
    ar: 'نسألك يا ربنا أن ترشدنا وتوفقنا إلى الطريق القويم، طريق عبادك الصالحين المنعم عليهم بنعمة الهداية، لا طريق المغضوب عليهم ولا الضالين.',
    en: 'Guide us to the straight path - the path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
    tag: 'general'
  },
  // 2: Al-Baqarah (Rabbana)
  {
    id: 2,
    surah: 'بەقەرە',
    surahAr: 'سورة البقرة',
    ayahNumber: 201,
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    kurdish: 'پەروەردگارمان! لەم دونیایەدا چاکە و خێرمان پێ ببەخشە و لەو دونیاشدا چاکە و بەهەشتمان پێ ببەخشە، و لە ئازار و سزای ئاگری دۆزەخ بمانپارێزە.',
    ar: 'يا ربنا امنحنا في هذه الحياة الدنيا عافية ورزقاً وتوفيقاً، وفي الدار الآخرة الجنة، وأجرنا من عذاب جهنم.',
    en: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
    tag: 'rabbana'
  },
  // 3: Al-Baqarah (Rabbana)
  {
    id: 3,
    surah: 'بەقەرە',
    surahAr: 'سورة البقرة',
    ayahNumber: 250,
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    kurdish: 'پەروەردگارمان! ئارامگری و خۆڕاگری بڕێژە بەسەرماندا و هەنگاوەکانمان جێگیر بکە و سەرکەوتنمان پێ ببەخشە بەسەر کۆمەڵی بێباوەڕاندا.',
    ar: 'يا ربنا أفض علينا صبراً عظيماً عند الشدائد، وثبت أقدامنا في ميدان الحق، وانصرنا على القوم الكافرين.',
    en: 'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.',
    tag: 'rabbana'
  },
  // 4: Al-Baqarah (Rabbana)
  {
    id: 4,
    surah: 'بەقەرە',
    surahAr: 'سورة البقرة',
    ayahNumber: 286,
    arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    kurdish: 'پەروەردگارمان! لێمان مەگرە ئەگەر فەرامۆشمان کرد یان هەڵەمان کرد؛ پەروەردگارمان! بارگرانی مەخەرە سەرمان وەک چۆن خستتە سەر پێشینانمان؛ بارێکمان پێ هەڵمەگرە کە توانامان پێی نییە؛ لێمان ببورە و گوناهمان بشۆ و ڕەحمان پێ بکە، تۆ سەرپەرشتیاری ئێمەیت، دەی سەرکەوتنمان پێ ببەخشە بەسەر کۆمەڵی بێباوەڕاندا.',
    ar: 'يا ربنا لا تعاقبنا إن نسينا أمراً أو أخطأنا بجهالة، ولا تكلفنا من الأعمال ما يشق علينا، واعف عن تقصيرنا واغفر زلاتنا وارحمنا برحمتك الواسعة.',
    en: 'Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.',
    tag: 'rabbana'
  },
  // 5: Aal Imran (Rabbana)
  {
    id: 5,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 8,
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
    kurdish: 'ئەی پەروەردگارمان! دڵەکانمان لامەدە لەسەر ڕێگای ڕاست دوای ئەوەی ڕێنموونیت کردین، و لە لایەن خۆتەوە بەزەیی و ڕەحمەتمان پێ ببەخشە، بەڕاستی تۆ زۆر بەخشندەیت.',
    ar: 'يا ربنا لا تُمِل قلوبنا عن الإيمان والهدى بعد إذ وفقتنا إليه، وامنحنا من فيض فضلك رحمة تثبتنا، إنك أنت صاحب الجود والعطاء الواسع.',
    en: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.',
    tag: 'rabbana'
  },
  // 6: Aal Imran (Rabbana)
  {
    id: 6,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 16,
    arabic: 'رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ',
    kurdish: 'ئەی پەروەردگارمان! بەڕاستی ئێمە باوەڕمان هێناوە، کەواتە لە گوناهەکانمان ببورە و لە سزای ئاگری دۆزەخ بمانپارێزە.',
    ar: 'يا ربنا إننا صدقنا بك وبرسولك وبكتابك، فاستر خطايانا وتجاوز عن سيئاتنا، وأعذنا من حر جهنم وعذابها.',
    en: 'Our Lord, indeed we have believed, so forgive us our sins and protect us from the punishment of the Fire.',
    tag: 'rabbana'
  },
  // 7: Aal Imran (Rabbana)
  {
    id: 7,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 53,
    arabic: 'رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ',
    kurdish: 'ئەی پەروەردگارمان! باوەڕمان هێنا بەوەی کە ناردووتە خوارەوە و شوێن پەیامبەرەکەت کەوتین، کەواتە لە ڕیزی شایەتیدەراندا تۆمارمان بکە.',
    ar: 'يا ربنا آمنا بكل ما أنزلت من وحي واتبعنا نبيك الكريم، فاكتبنا في ديوان الشاهدين بالتوحيد والصدق.',
    en: 'Our Lord, we have believed in what You revealed and have followed the messenger, so register us among the witnesses [to truth].',
    tag: 'rabbana'
  },
  // 8: Aal Imran (Rabbana)
  {
    id: 8,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 147,
    arabic: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    kurdish: 'ئەی پەروەردگارمان! لە گوناهەکانمان خۆش ببە و لەو زیادەڕەوییەی لە کارەکانماندا کردوومانە ببورە، و هەنگاوەکانمان جێگیر بکە و سەرکەوتنمان پێ ببەخشە بەسەر کۆمەڵی بێباوەڕاندا.',
    ar: 'يا ربنا اغفر لنا ما قصرنا وما تجاوزنا فيه من حدود، واجعل أقدامنا راسخة في نصرة دينك، وانصرنا على أهل الكفر والضلال.',
    en: 'Our Lord, forgive us our sins and the excess [committed] in our affairs and plant firmly our feet and give us victory over the disbelieving people.',
    tag: 'rabbana'
  },
  // 9: Aal Imran (Rabbana)
  {
    id: 9,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 191,
    arabic: 'رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ',
    kurdish: 'ئەی پەروەردگارمان! تۆ ئەم گەردوونەت بە بێهوودە و پووچ دروست نەکردووە، پاکی و بێگەردی شایستەی تۆیە، دەی لە سزای ئاگری دۆزەخ بمانپارێزە.',
    ar: 'يا ربنا ما أوجدت هذا الكون العظيم عبثاً، تنزهت عن كل نقص، فنجنا بلطفك من هول جهنم وعذابها.',
    en: 'Our Lord, You did not create this aimlessly; exalted are You [above such a thing]; then protect us from the punishment of the Fire.',
    tag: 'rabbana'
  },
  // 10: Aal Imran (Rabbana)
  {
    id: 10,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 194,
    arabic: 'رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ الْقِيَامَةِ ۗ إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ',
    kurdish: 'ئەی پەروەردگارمان! ئەوەی لەسەر زاری پەیامبەرەکانت بەڵێنت پێداوین پێمان ببەخشە و لە ڕۆژی قیامەتدا شەرمەزارمان مەکە، بەڕاستی تۆ هەرگیز بەڵێنی خۆت ناشکێنیت.',
    ar: 'يا ربنا هب لنا ما وعدت به عبادك المؤمنين على ألسنة رسلك، ولا تفضحنا بين الخلائق يوم البعث، إنك لا تخلف وعدك الحق.',
    en: 'Our Lord, and grant us what You promised us through Your messengers and do not disgrace us on the Day of Resurrection. Indeed, You do not fail in [Your] promise.',
    tag: 'rabbana'
  },
  // 11: Al-A'raf (Rabbana)
  {
    id: 11,
    surah: 'ئەعراف',
    surahAr: 'سورة الأعراف',
    ayahNumber: 23,
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    kurdish: 'ئەی پەروەردگارمان! ئێمە ستەممان لە خۆمان کرد و ئەگەر لێمان خۆش نەبیت و بەزەییت پێماندا نەیەتەوە، بەڕاستی لە خەسارەتمەند و زەرەرمەندان دەبین.',
    ar: 'دعاء أبوينا آدم وحواء: يا ربنا جنينا على أنفسنا بالذنب، وإن لم تغمرنا بمغفرتك ورحمتك لنكونن من الهالكين الخاسرين.',
    en: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
    tag: 'rabbana'
  },
  // 12: Al-A'raf (Rabbana)
  {
    id: 12,
    surah: 'ئەعراف',
    surahAr: 'سورة الأعراف',
    ayahNumber: 47,
    arabic: 'رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ',
    kurdish: 'ئەی پەروەردگارمان! لەگەڵ کۆمەڵی ستەمکاراندا کۆمان مەکەرەوە و دامانمەنێ.',
    ar: 'يا ربنا نعوذ بك أن تحشرنا أو تجعل مصيرنا مع القوم الظالمين المعتدين.',
    en: 'Our Lord, do not place us with the wrongdoing people.',
    tag: 'rabbana'
  },
  // 13: Al-A'raf (Rabbana)
  {
    id: 13,
    surah: 'ئەعراف',
    surahAr: 'سورة الأعراف',
    ayahNumber: 126,
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ',
    kurdish: 'ئەی پەروەردگارمان! ئارامگری و خۆڕاگریمان بەسەردا بڕێژە و لە حاڵەتی موسڵمانێتیدا بمانمرێنە.',
    ar: 'دعاء سحرة فرعون لما آمنوا: يا ربنا أفض علينا صبراً جميلاً وثباتاً على الحق، وتوفنا وأنت راضٍ عنا خاضعين لك بالتوحيد.',
    en: 'Our Lord, pour upon us patience and let us die as Muslims [in submission to You].',
    tag: 'rabbana'
  },
  // 14: Yunus (Rabbana)
  {
    id: 14,
    surah: 'یوونس',
    surahAr: 'سورة يونس',
    ayahNumber: '85-86',
    arabic: 'رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ الظَّالِمِينَ * وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ',
    kurdish: 'ئەی پەروەردگارمان! مۆڵەت مەدە ببینە مایەی تاقیکردنەوە و ستەملێکراوی بەدەستی ستەمکاران؛ و بە بەزەیی خۆت ڕزگارمان بکە لە دەست کۆمەڵی بێباوەڕان.',
    ar: 'يا ربنا لا تسلط علينا الظالمين فيفتنونا عن ديننا، وخلصنا برحمتك وفضلك من أذى الكافرين ومكرهم.',
    en: 'Our Lord, make us not [objects of] trial for the wrongdoing people, and save us by Your mercy from the disbelieving people.',
    tag: 'rabbana'
  },
  // 15: Hud
  {
    id: 15,
    surah: 'هوود',
    surahAr: 'سورة هود',
    ayahNumber: 47,
    arabic: 'رَبِّ إِنِّي أَعُوذُ بِكَ أَنْ أَسْأَلَكَ مَا لَيْسَ لِي بِهِ عِلْمٌ ۖ وَإِلَّا تَغْفِرْ لِي وَتَرْحَمْنِي أَكُن مِّنَ الْخَاسِرِينَ',
    kurdish: 'ئەی پەروەردگارم! پەنات پێ دەگرم لەوەی داوای شتێکت لێ بکەم کە زانستم پێی نەبێت، و ئەگەر لێم خۆش نەبیت و ڕەحمم پێ نەکەیت لە زیانمەندان دەبم.',
    ar: 'دعاء نبي الله نوح: يا ربي إني ألتجئ إليك وأتحصن بك من أن أسألك ما لا أعلم عاقبته، وإن لم تشملني بمغفرتك ورحمتك أكن من الهالكين.',
    en: 'My Lord, I seek refuge in You from asking that of which I have no knowledge. And unless You forgive me and have mercy upon me, I will be among the losers.',
    tag: 'prophet'
  },
  // 16: Yusuf
  {
    id: 16,
    surah: 'یووسف',
    surahAr: 'سورة يوسف',
    ayahNumber: 101,
    arabic: 'فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ أَنتَ وَلِيِّي فِي الدُّنْيَا وَالْآخِرَةِ ۖ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ',
    kurdish: 'ئەی بەدیهێنەری ئاسمانەکان و زەوی! تۆ سەرپەرشتیاری منیت لە دنیا و قیامەتدا، موسڵمان بمانمرێنە و بمخەرە پاڵ کاربەدەستان و چاکەکاران.',
    ar: 'دعاء نبي الله يوسف: يا خالق السماوات والأرض أنت عوني وناصري في الدارين، اقبض روحي على الإسلام وألحقني بزمرة عبادك الصالحين.',
    en: 'Creator of the heavens and earth, You are my protector in this world and in the Hereafter. Cause me to die a Muslim and join me with the righteous.',
    tag: 'prophet'
  },
  // 17: Ibrahim
  {
    id: 17,
    surah: 'ئیبراهیم',
    surahAr: 'سورة إبراهيم',
    ayahNumber: 38,
    arabic: 'رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي وَمَا نُعْلِنُ ۗ وَمَا يَخْفَىٰ عَلَى اللَّهِ مِن شَيْءٍ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ',
    kurdish: 'ئەی پەروەردگارمان! بەڕاستی تۆ دەزانیت بەوەی کە دەیشارینەوە و بەوەش کە ئاشکرای دەکەین، و هیچ شتێک لە زەوی و ئاسماندا لە خودا پۆشراو نییە.',
    ar: 'يا ربنا إنك محيط بما نكنه في ضمائرنا وما نبديه، ولا يغيب عن علمك الواسع مثقال ذرة في الكون كله.',
    en: 'Our Lord, indeed You know what we conceal and what we declare, and nothing is hidden from Allah on the earth or in the heaven.',
    tag: 'rabbana'
  },
  // 18: Ibrahim (Rabbana)
  {
    id: 18,
    surah: 'ئیبراهیم',
    surahAr: 'سورة إبراهيم',
    ayahNumber: 40,
    arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    kurdish: 'ئەی پەروەردگارم! بمکە بە بەرپاکەری نوێژ و لە نەوە و نەوەکانیشم؛ ئەی پەروەردگارمان نزاکەم قبوڵ بفەرموو.',
    ar: 'دعاء نبي الله إبراهيم: يا ربي وفقني للمحافظة على أداء الصلاة بحدودها واجعل من ذريتي من يقيمها، وتقبل دعائي ورجائي.',
    en: 'My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.',
    tag: 'rabbana'
  },
  // 19: Ibrahim (Rabbana)
  {
    id: 19,
    surah: 'ئیبراهیم',
    surahAr: 'سورة إبراهيم',
    ayahNumber: 41,
    arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    kurdish: 'ئەی پەروەردگارمان! لە من و لە دایک و باوکم و لە هەموو باوەڕداران ببورە لەو ڕۆژەی کە لێپرسینەوە و دادپەروەری بەرپا دەبێت.',
    ar: 'يا ربنا استر ذنوبي وتجاوز عن والديّ، واغفر لجميع المؤمنين والمؤمنات يوم يقف الخلائق للحساب بين يديك.',
    en: 'Our Lord, forgive me and my parents and the believers the Day the account is established.',
    tag: 'rabbana'
  },
  // 20: Al-Isra
  {
    id: 20,
    surah: 'ئیسڕا',
    surahAr: 'سورة الإسراء',
    ayahNumber: 24,
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    kurdish: 'ئەی پەروەردگارم! بەزەیی و میهرەبانیت بڕێژە بەسەر دایک و باوکمدا، هەروەک چۆن لە منداڵیدا بە بەزەیی و خۆشەویستی پەروەردەیان کردم.',
    ar: 'يا ربي عطفك ورحمتك لوالديّ جزاء ما بذلاه من إحسان ورعاية لي في صغري وضعفي.',
    en: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    tag: 'general'
  },
  // 21: Al-Isra
  {
    id: 21,
    surah: 'ئیسڕا',
    surahAr: 'سورة الإسراء',
    ayahNumber: 80,
    arabic: 'رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا',
    kurdish: 'ئەی پەروەردگارم! بە چاکە و ڕاستگۆیی بمبەرە ژوورەوە و بە چاکە و سەربەرزی بمهێنە دەرەوە، و لە لایەن خۆتەوە بەڵگە و دەسەڵاتێکی یارمەتیدەرم پێ ببەخشە.',
    ar: 'يا ربي اجعل كل مدخل لي في أموري مدخل خير ورضا، وكل مخرج مخرج صدق، وهب لي من لدنك قوة ونصرة تعينني على الحق.',
    en: 'My Lord, cause me to enter a sound entrance and to exit a sound exit and grant me from Yourself a supporting authority.',
    tag: 'general'
  },
  // 22: Al-Kahf (Rabbana)
  {
    id: 22,
    surah: 'کەهف',
    surahAr: 'سورة الكهف',
    ayahNumber: 10,
    arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    kurdish: 'ئەی پەروەردگارمان! لە لایەن خۆتەوە بەزەیی و ڕەحمەتمان پێ ببەخشە، و لە کارەکانماندا هیدایەت و سەرکەوتن و ڕێگای دروستی بۆ ئامادە بکە.',
    ar: 'دعاء أصحاب الكهف: يا ربنا هب لنا من فيض رحمتك تثبيتاً ووقاية، ووفقنا للصواب والاهتداء في كل شأننا.',
    en: 'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.',
    tag: 'rabbana'
  },
  // 23: Maryam
  {
    id: 23,
    surah: 'مریەم',
    surahAr: 'سورة مريم',
    ayahNumber: 4,
    arabic: 'رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُن بِدُعَائِكَ رَبِّ شَقِيًّا',
    kurdish: 'ئەی پەروەردگارم! بەڕاستی ئێسقانم لاواز بووە و قژم سپی بووە، و هەرگیز لە نزا و پاڕانەوە لێت بێ هیوا و خەسارەتمەند نەبووم.',
    ar: 'دعاء نبي الله زكريا: يا ربي رق عظمي وشاب رأسي بعد تقدم السن، وما عهدت منك إلا الإجابة واللطف، فلا تخيب رجائي.',
    en: 'My Lord, indeed my bones have grown weak, and my head has filled with white, and never have I been in my supplication to You, my Lord, unblessed.',
    tag: 'prophet'
  },
  // 24: Taha
  {
    id: 24,
    surah: 'تاها',
    surahAr: 'سورة طه',
    ayahNumber: '25-28',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي * يَفْقَهُوا قَوْلِي',
    kurdish: 'ئەی پەروەردگارم! سینگم فراوان بکە، و کارەکەم بۆ ئاسان بکە، و گرێی زمانم بکەرەوە تاکو لە وتە و قسەکانم تێبگەن.',
    ar: 'دعاء نبي الله موسى: يا ربي وسّع لي صدري بالنور والحكمة، ويسر أمري في تبليغ رسالتك، وأطلق لساني ببيان فصيح يفهمه السامعون.',
    en: 'My Lord, expand for me my breast [with assurance] and ease for me my task and untie the knot from my tongue that they may understand my speech.',
    tag: 'prophet'
  },
  // 25: Taha
  {
    id: 25,
    surah: 'تاها',
    surahAr: 'سورة طه',
    ayahNumber: 114,
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    kurdish: 'ئەی پەروەردگارم! زانست و تێگەیشتنم بۆ زیاد بکە.',
    ar: 'يا ربي زدني فهماً ومعرفة وبصيرة في دينك وشريعتك ونافع العلوم.',
    en: 'My Lord, increase me in knowledge.',
    tag: 'general'
  },
  // 26: Al-Anbiya
  {
    id: 26,
    surah: 'ئەنبیا',
    surahAr: 'سورة الأنبياء',
    ayahNumber: 83,
    arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    kurdish: 'ئەی پەروەردگارم! بەڕاستی ناڕەحەتی و نەخۆشی ڕووی تێکردووم و تۆش لە هەموو بەزەییداران بەزەییدارتریت.',
    ar: 'دعاء نبي الله أيوب: يا ربي أصابني البلاء والضر وأنت أوسع الراحمين جوداً ولطفاً فاشفني وعافني.',
    en: 'Indeed, adversity has touched me, and you are the Most Merciful of the merciful.',
    tag: 'prophet'
  },
  // 27: Al-Anbiya
  {
    id: 27,
    surah: 'ئەنبیا',
    surahAr: 'سورة الأنبياء',
    ayahNumber: 87,
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    kurdish: 'هیچ خودایەکی ڕاستەقینە نییە جگە لە تۆ، پاکی و بێگەردی شایستەی تۆیە، بەڕاستی من لە ستەمکاران بووم.',
    ar: 'دعاء ذي النون (يونس) في بطن الحوت: لا معبود بحق سواك، تنزهت عن كل نقص، إني اعترفت بخطأي وتقصيري فأجرني.',
    en: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    tag: 'prophet'
  },
  // 28: Al-Anbiya
  {
    id: 28,
    surah: 'ئەنبیا',
    surahAr: 'سورة الأنبياء',
    ayahNumber: 89,
    arabic: 'رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ',
    kurdish: 'ئەی پەروەردگارم! بە تەنها و بێ نەوە بەجێم مەهێڵە، هەرچەندە تۆ لە هەمووان باشترین میراتگریت.',
    ar: 'دعاء نبي الله زكريا طلباً للذرية الصالحة: يا ربي هب لي وارثاً يعينني على الحق ولا تتركني وحيداً، وأنت الباقي بعد فناء الخلق.',
    en: 'My Lord, do not leave me alone [with no heir], while you are the best of inheritors.',
    tag: 'prophet'
  },
  // 29: Al-Hajj
  {
    id: 29,
    surah: 'حەج',
    surahAr: 'سورة الحج',
    ayahNumber: 77,
    arabic: 'رَبِّ احْكُم بِالْحَقِّ ۗ وَرَبُّنَا الرَّحْمَٰنُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ',
    kurdish: 'ئەی پەروەردگارم! بە هەق و دادپەروەری حوکم بفەرموو، و پەروەردگارمان بەخشندەیە و داوای یارمەتی لە ئەو دەکرێت بەرامبەر ئەو بوهتانانەی دەیکەن.',
    ar: 'يا ربي اقض بيننا وبين المكذبين بالعدل، وربنا هو الرحمن الذي نلجأ إليه ونستعين به على افتراءاتهم.',
    en: 'My Lord, judge [between us] in truth. And our Lord is the Most Merciful, the one whose help is sought against that which you describe.',
    tag: 'general'
  },
  // 30: Al-Mu'minun
  {
    id: 30,
    surah: 'موئمینون',
    surahAr: 'سورة المؤمنون',
    ayahNumber: 29,
    arabic: 'رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ',
    kurdish: 'ئەی پەروەردگارم! لە شوێنێکی پیرۆز و پڕ پیت و بەرەکەت دامبەزێنە، و تۆ لە هەمووان چاکترین دابەزێنەریت.',
    ar: 'دعاء نبي الله نوح: يا ربي يسر لي نزولاً آمناً مباركاً فيه الخير والسلامة، وأنت أكرم من أنزل وأسكن عباده.',
    en: 'My Lord, let me land at a blessed landing place, and You are the best to accommodate [us].',
    tag: 'prophet'
  },
  // 31: Al-Mu'minun
  {
    id: 31,
    surah: 'موئمینون',
    surahAr: 'سورة المؤمنون',
    ayahNumber: '97-98',
    arabic: 'رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ * وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ',
    kurdish: 'ئەی پەروەردگارم! پەنات پێ دەگرم لە فێڵ و هاندانی شەیتانەکان؛ و پەنات پێ دەگرم ئەی پەروەردگارم لەوەی کە لە دەوروبەرم ئامادە بن.',
    ar: 'يا ربي إني أعتصم بك من وساوس الشياطين ونزغاتها، وأعوذ بك أن يقربوني في أي حال من أحوالي.',
    en: 'My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me.',
    tag: 'general'
  },
  // 32: Al-Mu'minun (Rabbana)
  {
    id: 32,
    surah: 'موئمینون',
    surahAr: 'سورة المؤمنون',
    ayahNumber: 109,
    arabic: 'رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    kurdish: 'ئەی پەروەردگارمان! باوەڕمان هێناوە، کەواتە لێمان ببورە و ڕەحمان پێ بکە و تۆ لە هەمووان بەبەزەییتریت.',
    ar: 'يا ربنا صدقنا بوعدك وآمنا بك، فاستر خطايانا وارحمنا بلطفك، فأنت أرحم الراحمين بعبادك.',
    en: 'Our Lord, we have believed, so forgive us and have mercy upon us, and You are the best of the merciful.',
    tag: 'rabbana'
  },
  // 33: Al-Mu'minun
  {
    id: 33,
    surah: 'موئمینون',
    surahAr: 'سورة المؤمنون',
    ayahNumber: 118,
    arabic: 'رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    kurdish: 'ئەی پەروەردگارم! لێمان ببورە و ڕەحمان پێ بکە و تۆ چاکترینی بەزەییدارانیت.',
    ar: 'يا ربي امنحنا المغفرة وتغمدنا بالرحمة، فأنت أهل الفضل والجود وأعظم الراحمين.',
    en: 'My Lord, forgive and have mercy, and You are the best of the merciful.',
    tag: 'forgiveness'
  },
  // 34: Al-Furqan (Rabbana)
  {
    id: 34,
    surah: 'فورقان',
    surahAr: 'سورة الفرقان',
    ayahNumber: 65,
    arabic: 'رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا',
    kurdish: 'ئەی پەروەردگارمان! سزای دۆزەخمان لەسەر لا بدە، بەڕاستی سزاکەی بەردەوام و بێ کۆتاییە.',
    ar: 'دعاء عباد الرحمن: يا ربنا ادفع عنا هول عذاب جهنم ونجنا منها، فإن عذابها دائم وملازم لأهله.',
    en: 'Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering.',
    tag: 'rabbana'
  },
  // 35: Al-Furqan (Rabbana)
  {
    id: 35,
    surah: 'فورقان',
    surahAr: 'سورة الفرقان',
    ayahNumber: 74,
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    kurdish: 'ئەی پەروەردگارمان! لە هاوسەرەکانمان و لە نەوەکانمان چاوڕۆشنی و دڵخۆشیمان پێ ببەخشە، و بمانکە بە پێشەوا و نموونە بۆ پارێزکاران.',
    ar: 'يا ربنا أنعم علينا بأزواج وذرية صالحة تقر بها أعيننا في الدين والدنيا، واجعلنا قدوة للمتقين في الخير والبر.',
    en: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.',
    tag: 'rabbana'
  },
  // 36: Ash-Shu'ara
  {
    id: 36,
    surah: 'شوعەرا',
    surahAr: 'سورة الشعراء',
    ayahNumber: '83-85',
    arabic: 'رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ * وَاجْعَل لِّي لِسَانَ صِدْقٍ فِي الْآخِرِينَ * وَاجْعَلْنِي مِن وَرَثَةِ جَنَّةِ النَّعِيمِ',
    kurdish: 'ئەی پەروەردگارم! دانایی و حیکمەتم پێ ببەخشە و بمخەرە پاڵ چاکەکاران، و ناوبانگێکی چاک و یادی خێرم لە نێو نەوەکانی داهاتوودا بۆ دابنێ، و بمکە بە یەکێک لە میراتگرانی بەهەشتی پڕ لە نیعمەت.',
    ar: 'دعاء نبي الله إبراهيم: يا ربي آتني علماً وفهماً وألحقني بالصالحين، واجعل لي ثناء حسناً فيمن بعدي، واجعلني من الفائزين بالجنة.',
    en: 'My Lord, grant me authority and join me with the righteous, and grant me a reputation of honor among later generations, and place me among the inheritors of the Garden of Pleasure.',
    tag: 'prophet'
  },
  // 37: An-Naml
  {
    id: 37,
    surah: 'نەمل',
    surahAr: 'سورة النمل',
    ayahNumber: 19,
    arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
    kurdish: 'ئەی پەروەردگارم! هانم بدە و یاریم بدە کە سوپاسی ئەو نیعمەتەت بکەم کە بەخشیوتە بە من و بە دایک و باوکم، و کردارێکی چاک ئەنجام بدەم کە تۆ لێی ڕازی بیت، و بە بەزەیی خۆت بمخەرە ڕیزی بەندە چاکەکانتەوە.',
    ar: 'دعاء نبي الله سليمان: يا ربي ألهمني ووفقني لشكر نعمك الجزيلة عليّ وعلى والديّ، وأن أعمل خيراً ترتضيه، وأدخلني في زمرة عبادك الصالحين.',
    en: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into [the ranks of] Your righteous servants.',
    tag: 'prophet'
  },
  // 38: Al-Qasas
  {
    id: 38,
    surah: 'قەسەس',
    surahAr: 'سورة القصص',
    ayahNumber: 16,
    arabic: 'رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي',
    kurdish: 'ئەی پەروەردگارم! بەڕاستی من ستەمم لە خۆم کرد، کەواتە لێم ببورە و بمبەخشە.',
    ar: 'دعاء نبي الله موسى معترفاً بذنبه: يا ربي إني قصرت وجنيت على نفسي، فاستر علي وتجاوز عني بمغفرتك.',
    en: 'My Lord, indeed I have wronged myself, so forgive me.',
    tag: 'forgiveness'
  },
  // 39: Al-Qasas
  {
    id: 39,
    surah: 'قەسەس',
    surahAr: 'سورة القصص',
    ayahNumber: 24,
    arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    kurdish: 'ئەی پەروەردگارم! من بۆ هەر خێر و چاکەیەک کە بۆم بنێریت لەوپەڕی پێویستیدام.',
    ar: 'دعاء نبي الله موسى عند ماء مدين: يا ربي إني محتاج ومفتقر إلى كل خير وعطاء وتوفيق تنزله عليّ.',
    en: 'My Lord, indeed I am, for whatever good You would send down to me, in need.',
    tag: 'prophet'
  },
  // 40: Al-Ankabut
  {
    id: 40,
    surah: 'عەنکەبووت',
    surahAr: 'سورة العنكبوت',
    ayahNumber: 30,
    arabic: 'رَبِّ انصُرْنِي عَلَى الْقَوْمِ الْمُفْسِدِينَ',
    kurdish: 'ئەی پەروەردگارم! سەرکەوتنم پێ ببەخشە بەسەر کۆمەڵی گەندەڵکار و تێکدەراندا.',
    ar: 'دعاء نبي الله لوط: يا ربي أيدني بنصرك وتأييدك على القوم المفسدين الذين عاثوا في الأرض فساداً.',
    en: 'My Lord, support me against the corrupting people.',
    tag: 'prophet'
  },
  // 41: As-Saffat
  {
    id: 41,
    surah: 'ساففات',
    surahAr: 'سورة الصافات',
    ayahNumber: 100,
    arabic: 'رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ',
    kurdish: 'ئەی پەروەردگارم! منداڵ و وەچەیەکی چاکەکارم پێ ببەخشە.',
    ar: 'دعاء نبي الله إبراهيم: يا ربي امنحني ولداً صالحاً تقياً يطيعك ويعينني على إقامة دينك.',
    en: 'My Lord, grant me [a child] from among the righteous.',
    tag: 'prophet'
  },
  // 42: Sad
  {
    id: 42,
    surah: 'ساد',
    surahAr: 'سورة ص',
    ayahNumber: 35,
    arabic: 'رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي ۖ إِنَّكَ أَنتَ الْوَهَّابُ',
    kurdish: 'ئەی پەروەردگارم! لێم خۆش ببە و دەسەڵات و پاشایەتییەکم پێ ببەخشە کە دوای من بۆ هیچ کەسێکی تر شیاو نەبێت، بەڕاستی تۆ بەخشندەی بێ هاوتایت.',
    ar: 'دعاء نبي الله سليمان: يا ربي تجاوز عن ذنبي وآتني ملكاً عظيماً لا ينبغي لأحد من بعدي، إنك أنت صاحب الجود والعطاء الجزيل.',
    en: 'My Lord, forgive me and grant me a kingdom such as will not belong to anyone after me. Indeed, You are the Bestower.',
    tag: 'prophet'
  },
  // 43: Ghafir (Rabbana)
  {
    id: 43,
    surah: 'غافیر',
    surahAr: 'سورة غافر',
    ayahNumber: 7,
    arabic: 'رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ وَقِهِمْ عَذَابَ الْجَحِيمِ',
    kurdish: 'ئەی پەروەردگارمان! ڕەحمەت و زانستی تۆ هەموو شتێکی گرتۆتەوە، کەواتە لەوانە خۆش ببە کە تۆبەیان کردووە و شوێن ڕێگاکەی تۆ کەوتوون، و لە سزای ئاگری دۆزەخ بیانپارێزە.',
    ar: 'دعاء الملائكة حملة العرش: يا ربنا شملت كل مخلوق برحمتك وعلمك، فاغفر للتائبين المتبعين لدينك ونجهم من عذاب السعير.',
    en: 'Our Lord, You have encompassed all things in mercy and knowledge, so forgive those who have repented and followed Your way and protect them from the punishment of Hellfire.',
    tag: 'rabbana'
  },
  // 44: Ghafir (Rabbana)
  {
    id: 44,
    surah: 'غافیر',
    surahAr: 'سورة غافر',
    ayahNumber: '8-9',
    arabic: 'رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدتَّهُمْ وَمَن صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ ۚ إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ * وَقِهِمُ السَّيِّئَاتِ',
    kurdish: 'ئەی پەروەردگارمان! بیانخەرە باخەکانی بەهەشتی عەدنەوە کە بەڵێنت پێداون، لەگەڵ هەموو ئەوانەی لە باوکان و هاوسەران و نەوەکانیان چاکەکار بوون، بەڕاستی تۆ بەدەسەڵات و کاربەجێیت، و لە بەڵا و خراپەکان بیانپارێزە.',
    ar: 'يا ربنا أسكنهم جنات الإقامة الدائمة مع من صلح من آبائهم وأزواجهم وذرياتهم، واصرف عنهم كل سوء ومكروه.',
    en: 'Our Lord, and admit them to gardens of perpetual residence which You have promised them and whoever was righteous among their fathers, their spouses and their offspring. Indeed, it is You who is the Exalted in Might, the Wise.',
    tag: 'rabbana'
  },
  // 45: Fussilat
  {
    id: 45,
    surah: 'فوسسیلەت',
    surahAr: 'سورة فصلت',
    ayahNumber: 30,
    arabic: 'رَبَّنَا اللَّهُ ثُمَّ اسْتَقَامُوا تَتَنَزَّلُ عَلَيْهِمُ الْمَلَائِكَةُ أَلَّا تَخَافُوا وَلَا تَحْزَنُوا وَأَبْشِرُوا بِالْجَنَّةِ الَّتِي كُنتُمْ تُوعَدُونَ',
    kurdish: 'ئەی پەروەردگارمان خودایە! پەروەردگارا جێگیرمان بکە لەسەر ڕێگای ڕاست بۆ ئەوەی فریشتەکان مژدەی بەهەشتمان پێ بدەن و پێمان بڵێن مەترسن و دڵتەنگ مەبن.',
    ar: 'يا ربنا ثبتنا على الإيمان والعمل الصالح حتى تنزل علينا الملائكة بالبشارة عند الموت ألا نخاف ولا نحزن ونبشر بالجنة.',
    en: 'Our Lord is Allah, so keep us firm on righteousness that the angels may descend upon us, [saying], "Do not fear and do not grieve but receive good tidings of Paradise."',
    tag: 'rabbana'
  },
  // 46: Az-Zukhruf
  {
    id: 46,
    surah: 'زوخروف',
    surahAr: 'سورة الزخرف',
    ayahNumber: '13-14',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    kurdish: 'پاکی و بێگەردی بۆ ئەو خودایەی ئەمەی بۆ ڕام هێناوین لە کاتێکدا ئێمە توانای ئەوەمان نەبوو، و بەڕاستی ئێمە بۆ لای پەروەردگارمان دەگەڕێینەوە.',
    ar: 'دعاء الركوب والسفر: تنزه الله الذي ذلل لنا هذه المراكب وما كنا قادرين عليها لولا فضله، وإن مصيرنا ورجوعنا إلى ربنا الكريم.',
    en: 'Exalted is He who has subjected this to us, and we could not have [otherwise] subdued it. And indeed we, to our Lord, will [surely] return.',
    tag: 'general'
  },
  // 47: Ad-Dukhan (Rabbana)
  {
    id: 47,
    surah: 'دوخان',
    surahAr: 'سورة الدخان',
    ayahNumber: 12,
    arabic: 'رَّبَّنَا اكْشِفْ عَنَّا الْعَذَابَ إِنَّا مُؤْمِنُونَ',
    kurdish: 'ئەی پەروەردگارمان! سزامان لەسەر هەڵگرە و دووری بخەرەوە، بەڕاستی ئێمە باوەڕدارین.',
    ar: 'يا ربنا ارفع عنا البلاء والعذاب واكشف كربتنا، إنا متبعون لأمرك مؤمنون بوعدك.',
    en: 'Our Lord, avert from us the torment; indeed, we are believers.',
    tag: 'rabbana'
  },
  // 48: Al-Ahqaf
  {
    id: 48,
    surah: 'ئەحقاف',
    surahAr: 'سورة الأحقاف',
    ayahNumber: 15,
    arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ',
    kurdish: 'ئەی پەروەردگارم! هانم بدە و یاریم بدە کە شوکرانەبژێری ئەو نیعمەتەت بم کە بەخشیوتە بە من و بە دایک و باوکم، و کردەوەیەکی چاک بکەم کە تۆ لێی ڕازی بیت، و نەوەکانم چاک و بەپیت بکە؛ بەڕاستی من تۆبەم کرد بۆ لای تۆ و من لە موسڵمانانم.',
    ar: 'يا ربي ألهمني شكر نعمائك، ووفقني لصالح العمل، وبارك في ذريتي وأصلحهم، إني تبت إليك توبة نصوحاً وأسلمت أمري لك.',
    en: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve and make righteous for me my offspring. Indeed, I have repented to You, and indeed, I am of the Muslims.',
    tag: 'general'
  },
  // 49: Al-Fath
  {
    id: 49,
    surah: 'فەتح',
    surahAr: 'سورة الفتح',
    ayahNumber: 4,
    arabic: 'هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ لِيَزْدَادُوا إِيمَانًا مَّعَ إِيمَانِهِمْ',
    kurdish: 'خوایە! ئارامی و هێمنی داببەزێنە بەسەر دڵەکانماندا بۆ ئەوەی باوەڕمان لەسەر باوەڕ زیاد بکات.',
    ar: 'اللهم أنزل السكينة والطمأنينة في قلوبنا وثبتنا على الهدى ليزداد إيماننا ويقيننا بك.',
    en: 'It is He who sent down tranquility into the hearts of the believers that they would add faith to their faith.',
    tag: 'general'
  },
  // 50: Al-Qamar
  {
    id: 50,
    surah: 'قەمەر',
    surahAr: 'سورة القمر',
    ayahNumber: 10,
    arabic: 'أَنِّي مَغْلُوبٌ فَانتَصِرْ',
    kurdish: 'ئەی پەروەردگارم! بەڕاستی من دەستەوەستان و بەزیوم، کەواتە تۆ یارمەتیم بدە و سەرم بخە.',
    ar: 'دعاء نبي الله نوح: يا ربي إني مغلوب ومستضعف أمام قومي، فانتصر لدينك وللحق بقوتك وعزتك.',
    en: 'Indeed, I am overcome, so help.',
    tag: 'prophet'
  },
  // 51: Al-Hashr (Rabbana)
  {
    id: 51,
    surah: 'حەشر',
    surahAr: 'سورة الحشر',
    ayahNumber: 10,
    arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ',
    kurdish: 'ئەی پەروەردگارمان! لە ئێمە و لەو برایانەشمان خۆش ببە کە پێش ئێمە بە باوەڕەوە ڕۆیشتوون، و لە دڵەکانماندا هیچ ڕق و قینێک دامەنێ بەرامبەر ئەوانەی باوەڕیان هێناوە؛ پەروەردگارمان! بەڕاستی تۆ بەسۆز و میهرەبانیت.',
    ar: 'يا ربنا اغفر لنا ولإخواننا الذين سبقونا بالإيمان، وطهر قلوبنا من كل حقد أو غل تجاه المؤمنين، إنك أنت الرؤوف الرحيم.',
    en: 'Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts [any] resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.',
    tag: 'rabbana'
  },
  // 52: Al-Mumtahanah (Rabbana)
  {
    id: 52,
    surah: 'مومتەحەنە',
    surahAr: 'سورة الممتحنة',
    ayahNumber: 4,
    arabic: 'رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ',
    kurdish: 'ئەی پەروەردگارمان! پشتمان تەنها بە تۆ بەستووە و ڕوومان تەنها لە تۆ کردووە و گەڕانەوەمان هەر بۆ لای تۆیە.',
    ar: 'يا ربنا اعتمدنا عليك في جميع شؤوننا، ورجعنا إليك بالتوبة والإنابة، وإليك المرجع والمنقلب.',
    en: 'Our Lord, upon You we have relied, and to You we have returned, and to You is the destination.',
    tag: 'rabbana'
  },
  // 53: Al-Mumtahanah (Rabbana)
  {
    id: 53,
    surah: 'مومتەحەنە',
    surahAr: 'سورة الممتحنة',
    ayahNumber: 5,
    arabic: 'رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا ۖ إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ',
    kurdish: 'ئەی پەروەردگارمان! مۆڵەت مەدە ببینە هۆی سەرلێشێوان و تاقیکردنەوە بۆ ئەوانەی بێباوەڕ بوون، و لێمان خۆش ببە ئەی پەروەردگارمان، بەڕاستی تۆ بەدەسەڵات و کاربەجێیت.',
    ar: 'يا ربنا لا تسلط الكافرين علينا فيفتنونا أو يظنوا أنهم على حق، واغفر خطايانا، إنك أنت القوي الحكيم.',
    en: 'Our Lord, make us not [objects of] torment for the disbelievers and forgive us, our Lord. Indeed, it is You who is the Exalted in Might, the Wise.',
    tag: 'rabbana'
  },
  // 54: At-Tahrim (Rabbana)
  {
    id: 54,
    surah: 'تەحریم',
    surahAr: 'سورة التحريم',
    ayahNumber: 8,
    arabic: 'رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    kurdish: 'ئەی پەروەردگارمان! ڕووناکی و نوورەکەمان بۆ تەواو بکە و لە گوناهەکانمان خۆش ببە، بەڕاستی تۆ بەسەر هەموو شتێکدا توانایت.',
    ar: 'دعاء المؤمنين على الصراط: يا ربنا أتمم لنا نورنا يوم القيامة واغفر زلاتنا، فإنك قادر على كل شيء.',
    en: 'Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.',
    tag: 'rabbana'
  },
  // 55: At-Tahrim
  {
    id: 55,
    surah: 'تەحریم',
    surahAr: 'سورة التحريم',
    ayahNumber: 11,
    arabic: 'رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ وَنَجِّنِي مِن فِرْعَوْنَ وَعَمَلِهِ وَنَجِّنِي مِنَ الْقَوْمِ الظَّالِمِينَ',
    kurdish: 'ئەی پەروەردگارم! لە لای خۆت لە بەهەشتدا ماڵێکم بۆ دروست بکە و لە دەست فیرعەون و کردەوە خراپەکانی ڕزگارم بکە، و لە کۆمەڵی ستەمکاران بمپارێزە.',
    ar: 'دعاء آسية امرأة فرعون: يا ربي ابن لي داراً عندك في الجنة، وخلصني من طغيان فرعون وشره ومن القوم الظالمين.',
    en: 'My Lord, build for me near You a house in Paradise and save me from Pharaoh and his deeds and save me from the wrongdoing people.',
    tag: 'general'
  },
  // 56: Nuh
  {
    id: 56,
    surah: 'نووح',
    surahAr: 'سورة نوح',
    ayahNumber: 28,
    arabic: 'رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ',
    kurdish: 'ئەی پەروەردگارم! لە من و لە دایک و باوکم و لە هەر کەسێک کە بە باوەڕداری هاتبێتە ماڵەکەم و لە هەموو باوەڕدارانی پیاو و ژن خۆش ببە.',
    ar: 'دعاء نبي الله نوح: يا ربي اغفر لي ولوالدي ولمن دخل داري مؤمناً، واشمل بمغفرتك جميع المؤمنين والمؤمنات.',
    en: 'My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.',
    tag: 'prophet'
  },
  // 57: Al-Ikhlas & Mu'awwidhat
  {
    id: 57,
    surah: 'ئیخلاس',
    surahAr: 'سورة الإخلاص',
    ayahNumber: '1-4',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    kurdish: 'بڵێ: ئەو، خوای تاکی بێ هاوتایە؛ خوایەکە هەموان پێویستیان پێیەتی؛ نەکەسی لێ بووە و نەلەکەسی بووە؛ و هیچ کەس هاوتا و وێنەی ئەو نەبووە.',
    ar: 'إخلاص التوحيد لله تعالى: قل هو الله الواحد الأحد، الصمد المقصود في الحوائج، تنزه عن الولد والوالد والكفء.',
    en: 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."',
    tag: 'general'
  },
  // 58: Al-Falaq
  {
    id: 58,
    surah: 'فەلەق',
    surahAr: 'سورة الفلق',
    ayahNumber: '1-5',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِن شَرِّ مَا خَلَقَ * وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    kurdish: 'بڵێ: پەنا دەگرم بە پەروەردگاری بەرەبەیان، لە شەڕی هەموو ئەو دروستکراوانەی دروستی کردوون، و لە شەڕی شەوی تاریک کاتێک دادێت، و لە شەڕی ئەو ژنانەی کە فوو دەکەن لە گرێیەکان (سیحر)، و لە شەڕی چاوپیس و حەسوود کاتێک حەسوودی دەبات.',
    ar: 'الاستعاذة بالله من شرور المخلوقات والظلام والسحرة وأعين الحاسدين وأحقادهم.',
    en: 'Say, "I seek refuge in the Lord of daybreak from the evil of that which He created and from the evil of darkness when it settles and from the evil of the blowers in knots and from the evil of an envier when he envies."',
    tag: 'general'
  },
  // 59: An-Nas
  {
    id: 59,
    surah: 'ناس',
    surahAr: 'سورة الناس',
    ayahNumber: '1-6',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ * مَلِكِ النَّاسِ * إِلَٰهِ النَّاسِ * مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ * الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ * مِنَ الْجِنَّةِ وَالنَّاسِ',
    kurdish: 'بڵێ: پەنا دەگرم بە پەروەردگاری خەڵکی، پاشای خەڵکی، خودای خەڵکی، لە شەڕی وەسوەسەدەری پاشەکشێکەر، ئەوەی لە سینگی خەڵکیدا وەسوەسە دروست دەکات، لە جنۆکە بێت یان لە مرۆڤ.',
    ar: 'التحصن برب الناس وملكهم ومعبودهم من شر الشيطان الموسوس الخناس ومن شياطين الإنس والجن.',
    en: 'Say, "I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer - Who whispers into the breasts of mankind - From among the jinn and mankind."',
    tag: 'general'
  },
  // 60: Ayat al-Kursi
  {
    id: 60,
    surah: 'بەقەرە (ئایەتی کورسی)',
    surahAr: 'سورة البقرة (آية الكرسي)',
    ayahNumber: 255,
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    kurdish: 'خودا کەس نییە شایستەی پەرستن بێت جگە لە ئەو، هەمیشە زیندوو و ڕاگرو بەڕێوەبەری دروستکراوەکانییەتی، نە وەنەوز دەیگرێت و نە خەو؛ چی لە ئاسمانەکان و چی لە زەویدایە هەر بۆ ئەوە؛ کێیە لە لای ئەو تکا بکات بێجگە لە مۆڵەتی خۆی؛ دەزانێت بە ڕابردوو و داهاتوویان، و کەس بە هیچ زانستێکی ئەو دەورە نادات مەگەر ئەوەی خۆی بیەوێت؛ تەختی فەرمانڕەوایی ئاسمانەکان و زەوی گرتۆتەوە و پاراستنیان بۆ ئەو هیچ ماندووبوونی تێدا نییە؛ و ئەو بەرز و بڵند و گەورەیە.',
    ar: 'أعظم آية في كتاب الله: تقرير التوحيد المطلق وكمال القيومية والعلم والقدرة الإلهية الشاملة.',
    en: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
    tag: 'general'
  },
  // 61: Al-Baqarah (Rabbana)
  {
    id: 61,
    surah: 'بەقەرە',
    surahAr: 'سورة البقرة',
    ayahNumber: 127,
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
    kurdish: 'ئەی پەروەردگارمان! ئەم کارە چاکەمان لێ قبوڵ بفەرموو، بەڕاستی تۆ بیسەر و زانایت.',
    ar: 'دعاء إبراهيم وإسماعيل عند بناء الكعبة: يا ربنا تقبل منا طاعتنا وعملنا، إنك أنت السميع لدعائنا العليم بنياتنا.',
    en: 'Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.',
    tag: 'rabbana'
  },
  // 62: Al-Baqarah (Rabbana)
  {
    id: 62,
    surah: 'بەقەرە',
    surahAr: 'سورة البقرة',
    ayahNumber: 128,
    arabic: 'رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا ۖ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ',
    kurdish: 'ئەی پەروەردگارمان! بمانکە بە دوو بەندەی موسڵمان و ملکەچ بۆ فەرمانی خۆت، و لە نەوەکانمان ئوممەتێکی موسڵمان و تەسلیمکراو دروست بکە، و حوکم و شێوازی عیبادەتەکانمان نیشان بدە و تۆبەکەمان قبوڵ بفەرموو، بەڕاستی تۆ تۆبەوەرگر و میهرەبانیت.',
    ar: 'يا ربنا اجعلنا مستسلمين لأمرك واجعل من ذريتنا أمة خاضعة لك، وعلمنا معالم عبادتنا وحجنا وتجاوز عنا، إنك أنت التواب الرحيم.',
    en: 'Our Lord, and make us Muslims [in submission] to You and from our descendants a Muslim nation [in submission] to You. And show us our ways of worship and accept our repentance. Indeed, You are the Accepting of repentance, the Merciful.',
    tag: 'rabbana'
  },
  // 63: Aal Imran (Rabbana)
  {
    id: 63,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 9,
    arabic: 'رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ ۚ إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ',
    kurdish: 'ئەی پەروەردگارمان! بەڕاستی تۆ خەڵکی کۆدەکەیتەوە لە ڕۆژێکدا کە هیچ گومانێکی تێدا نییە؛ بەڕاستی خودا هەرگیز بەڵێنی خۆی ناشکێنێت.',
    ar: 'يا ربنا إنك حاشر الخلائق جميعاً ليوم القيامة الذي لا شك في وقوعه، وإنك لا تخلف ما وعدت به عبادك.',
    en: 'Our Lord, surely You will gather the people for a Day about which there is no doubt. Indeed, Allah does not fail in His promise.',
    tag: 'rabbana'
  },
  // 64: Aal Imran (Rabbana)
  {
    id: 64,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 192,
    arabic: 'رَبَّنَا إِنَّكَ مَن تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ ۖ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ',
    kurdish: 'ئەی پەروەردگارمان! بەڕاستی هەرکەسێک تۆ بیخەیتە ناو ئاگری دۆزەخەوە بێگومان شەرمەزار و ڕیسوات کردووە، و بۆ ستەمکاران هیچ یارمەتیدەرێک نییە.',
    ar: 'يا ربنا إن من ألقيته في النار فقد أهنته وفضحته بالعذاب، وليس لأهل الظلم والشرك من ينقذهم.',
    en: 'Our Lord, indeed whoever You admit to the Fire - You have disgraced him, and for the wrongdoers there are no helpers.',
    tag: 'rabbana'
  },
  // 65: Aal Imran (Rabbana)
  {
    id: 65,
    surah: 'ئالی عیمران',
    surahAr: 'سورة آل عمران',
    ayahNumber: 193,
    arabic: 'رَّبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلْإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا ۚ رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ',
    kurdish: 'ئەی پەروەردگارمان! ئێمە گوێمان لە بانگخوازێک بوو بانگی دەکرد بۆ باوەڕ کە باوەڕ بە پەروەردگارتان بهێنن و باوەڕمان هێنا؛ پەروەردگارمان! لە گوناهەکانمان خۆش ببە و خراپەکانمان بسڕەوە و لەگەڵ چاکەکاراندا بمانمرێنە.',
    ar: 'يا ربنا استجبنا لنداء رسولك الكريم حين دعانا للإيمان فآمنا، فاستر خطايانا وكفّر سيئاتنا وتوفنا في عداد الأبرار المتقين.',
    en: 'Our Lord, indeed we have heard a caller calling to faith, [saying], "Believe in your Lord," and we have believed. Our Lord, so forgive us our sins and remove from us our misdeeds and cause us to die with the righteous.',
    tag: 'rabbana'
  },
  // 66: Al-Ma'idah (Rabbana)
  {
    id: 66,
    surah: 'مائیدە',
    surahAr: 'سورة المائدة',
    ayahNumber: 83,
    arabic: 'رَبَّنَا آمَنَّا فَاكْتُبْنَا مَعَ الشَّاهِدِينَ',
    kurdish: 'ئەی پەروەردگارمان! باوەڕمان هێنا، کەواتە لەگەڵ شایەتیدەراندا ناومان بنووسە و تۆمارمان بکە.',
    ar: 'يا ربنا آمنا بكتابك وحقك، فاكتب أسماءنا في ديوان الشهداء بالحق وأهل الصدق واليقين.',
    en: 'Our Lord, we have believed, so register us among the witnesses.',
    tag: 'rabbana'
  },
  // 67: Al-Ma'idah (Rabbana)
  {
    id: 67,
    surah: 'مائیدە',
    surahAr: 'سورة المائدة',
    ayahNumber: 114,
    arabic: 'رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ ۖ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ',
    kurdish: 'ئەی پەروەردگارمان! خوانێکی خێر و بەرەکەت لە ئاسمانەوە بۆ داببەزێنە تاکو ببێتە جەژن و ئاهەنگ بۆ پێشینان و پاشینانمان و نیشانەیەک بێت لە لایەن تۆوە؛ و ڕۆزیمان پێ ببەخشە و تۆ چاکترینی ڕۆزیدەرانیت.',
    ar: 'دعاء نبي الله عيسى: يا ربنا أنزل علينا مائدة تكون دليلاً وبرهاناً وعيداً لنا، وارزقنا من واسع فضلك وأنت خير الرازقين.',
    en: 'Our Lord, send down to us a table [spread with food] from the heaven to be for us a festival for the first of us and the last of us and a sign from You. And provide for us, and You are the best of providers.',
    tag: 'rabbana'
  },
  // 68: Al-A'raf
  {
    id: 68,
    surah: 'ئەعراف',
    surahAr: 'سورة الأعراف',
    ayahNumber: 89,
    arabic: 'رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنتَ خَيْرُ الْفَاتِحِينَ',
    kurdish: 'ئەی پەروەردگارمان! لە نێوان ئێمە و لە نێوان نەتەوەکەماندا بە حەق و دادپەروەری دادوەری و حوکم بفەرموو، و تۆ لە هەمووان چاکترین دادوەر و سەرکەوتنبەخشیت.',
    ar: 'دعاء نبي الله شعيب: يا ربنا احكم واقضِ بيننا وبين قومنا المكذبين بالعدل، وأنت خير الحاكمين والقاضين.',
    en: 'Our Lord, judge between us and our people in truth, and You are the best of judges.',
    tag: 'rabbana'
  },
  // 69: Al-A'raf
  {
    id: 69,
    surah: 'ئەعراف',
    surahAr: 'سورة الأعراف',
    ayahNumber: 151,
    arabic: 'رَبِّ اغْفِرْ لِي وَلِأَخِي وَأَدْخِلْنَا فِي رَحْمَتِكَ ۖ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    kurdish: 'ئەی پەروەردگارم! لە من و لە براکەم ببورە و بمانخەرە ناو بەزەیی و میهرەبانی خۆتەوە، و تۆ لە هەموو بەزەییداران بەبەزەییتریت.',
    ar: 'دعاء نبي الله موسى لنفسه ولأخيه هارون: يا ربي اغفر لنا وارحمنا برحمتك التي وسعت كل شيء، وأنت أعظم الراحمين.',
    en: 'My Lord, forgive me and my brother and admit us into Your mercy, and You are the most merciful of the merciful.',
    tag: 'prophet'
  },
  // 70: Al-A'raf
  {
    id: 70,
    surah: 'ئەعراف',
    surahAr: 'سورة الأعراف',
    ayahNumber: 155,
    arabic: 'أَنتَ وَلِيُّنَا فَاغْفِرْ لَنَا وَارْحَمْنَا ۖ وَأَنتَ خَيْرُ الْغَافِرِينَ * وَاكْتُبْ لَنَا فِي هَٰذِهِ الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ',
    kurdish: 'تۆ سەرپەرشتیار و پارێزەری ئێمەیت، کەواتە لێمان خۆش ببە و ڕەحمان پێ بکە و تۆ چاکترینی لێخۆشبووانیت؛ و لەم دونیایە و لە ڕۆژی دواییدا چاکە و خێرمان بۆ بنووسە.',
    ar: 'يا ربنا أنت مولانا وناصرنا فتجاوز عن سيئاتنا وارحمنا، واقسم لنا في الدنيا عافية وتوفيقاً وفي الآخرة دار الكرامة والنعيم.',
    en: 'You are our protector, so forgive us and have mercy upon us; and You are the best of forgivers. And decree for us in this world [that which is] good and in the Hereafter.',
    tag: 'forgiveness'
  },
  // 71: Ibrahim (Rabbana)
  {
    id: 71,
    surah: 'ئیبراهیم',
    surahAr: 'سورة إبراهيم',
    ayahNumber: 35,
    arabic: 'رَبِّ اجْعَلْ هَٰذَا الْبَلَدَ آمِنًا وَاجْنُبْنِي وَبَنِيَّ أَن نَّعْبُدَ الْأَصْنَامَ',
    kurdish: 'ئەی پەروەردگارم! ئەم شارە (مەککە) بکە بە شوێنێکی ئارام و پارێزراو، و من و منداڵەکانم دوور بخەرەوە لەوەی بت و پەیکەر بپەرستین.',
    ar: 'دعاء نبي الله إبراهيم لمكة وأهلها: يا ربي اجعل هذا البلد آمناً مطمئناً، واعصمني وذريتي من الشرك وعبادة الأوثان.',
    en: 'My Lord, make this city [Makkah] secure and keep me and my sons away from worshipping idols.',
    tag: 'prophet'
  },
  // 72: Al-Anbiya
  {
    id: 72,
    surah: 'ئەنبیا',
    surahAr: 'سورة الأنبياء',
    ayahNumber: 112,
    arabic: 'قَالَ رَبِّ احْكُم بِالْحَقِّ ۗ وَرَبُّنَا الرَّحْمَٰنُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ',
    kurdish: 'فەرمووی: ئەی پەروەردگارم! بە دادپەروەری و حەق دادوەری بکە، و پەروەردگارمان بەخشندەیە کە هانای بۆ دەبرێت بەرامبەر ئەوەی وەسفی دەکەن.',
    ar: 'يا ربنا اقض بيننا وبين أهل الباطل بالعدل المبين، وأنت الرحمن المستعان على كل ما يفتري الظالمون.',
    en: 'He said, "My Lord, judge [between us] in truth. And our Lord is the Most Merciful, the one whose help is sought against that which you describe."',
    tag: 'general'
  },
  // 73: Al-Kahf (Ashab al-Kahf)
  {
    id: 73,
    surah: 'کەهف',
    surahAr: 'سورة الكهف',
    surahEn: 'Al-Kahf',
    ayahNumber: 10,
    arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    kurdish: 'ئەی پەروەردگارمان! لە لایەن خۆتەوە بەزەیی و ڕەحمەتمان پێ ببەخشە و لە کارەکانماندا هیدایەت و سەرکەوتن و ڕێگای ڕاستمان بۆ ئامادە بکە.',
    ar: 'دعاء فتية الكهف: يا ربنا هب لنا من فيض جودك رحمة واسعة تحفظنا بها، وهيئ لنا في جميع أمورنا طريقاً قويماً موصلاً للنجاح والرشاد.',
    en: 'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.',
    tag: 'rabbana'
  },
  // 74: Maryam (Zakariya)
  {
    id: 74,
    surah: 'مریەم',
    surahAr: 'سورة مريم',
    surahEn: 'Maryam',
    ayahNumber: 4,
    arabic: 'رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُن بِدُعَائِكَ رَبِّ شَقِيًّا',
    kurdish: 'ئەی پەروەردگارم! بەڕاستی ئێسکم بێهێز بووە و پرچم سپی بووە، و هەرگیز لە دوعاکردن لە تۆ بێ هیوا و نائومێد نەبووم.',
    ar: 'دعاء نبي الله زكريا: يا ربي رق عظمي واشتعل المشيب في رأسي، ولم أعهد منك خيبة في دعائي ورجائي بل أنت المجيب الدائم.',
    en: 'My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unblessed.',
    tag: 'prophet'
  },
  // 75: Ta-Ha (Musa)
  {
    id: 75,
    surah: 'تاها',
    surahAr: 'سورة طه',
    surahEn: 'Ta-Ha',
    ayahNumber: '25-28',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي * يَفْقَهُوا قَوْلِي',
    kurdish: 'ئەی پەروەردگارم! سنگم فراوان بکە، و کارەکەم بۆ ئاسان بکە، و گرێی زمانم بکەرەوە تاکو لە قسە و وتەکانم تێبگەن.',
    ar: 'دعاء نبي الله موسى: يا ربي وسّع لي صدري بالنور، ويسر لي كل عسير، وأطلق لساني بالفصاحة والبيان حتى يفهم الناس دعوتي بالحق.',
    en: 'My Lord, expand for me my breast [with assurance] and ease for me my task and untie the knot from my tongue that they may understand my speech.',
    tag: 'prophet'
  },
  // 76: Ta-Ha (Knowledge)
  {
    id: 76,
    surah: 'تاها',
    surahAr: 'سورة طه',
    surahEn: 'Ta-Ha',
    ayahNumber: 114,
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    kurdish: 'ئەی پەروەردگارم! زانست و تێگەیشتنم بۆ زیاد بکە.',
    ar: 'دعاء نبوي عظيم: يا ربي زدني علماً نافعاً وفقهاً في دينك وبصيرة تهتدي بها روحي.',
    en: 'My Lord, increase me in knowledge.',
    tag: 'knowledge'
  },
  // 77: Al-Anbiya (Ayyub)
  {
    id: 77,
    surah: 'ئەنبیا',
    surahAr: 'سورة الأنبياء',
    surahEn: 'Al-Anbiya',
    ayahNumber: 83,
    arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    kurdish: 'ئەی پەروەردگارم! بەڕاستی نەخۆشی و ناڕەحەتی تووشم بووە، و تۆ لە هەمووان بەبەزەییتریت بۆ ڕزگارکردنم.',
    ar: 'دعاء نبي الله أيوب عند البلاء والمرض: يا ربي أصابني الضر والألم، وأنت أوسع الراحمين لطفاً وعافية وفضلاً.',
    en: 'Indeed, adversity has touched me, and You are the most merciful of the merciful.',
    tag: 'prophet'
  },
  // 78: Al-Anbiya (Yunus / Dhu an-Nun)
  {
    id: 78,
    surah: 'ئەنبیا',
    surahAr: 'سورة الأنبياء',
    surahEn: 'Al-Anbiya',
    ayahNumber: 87,
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    kurdish: 'هیچ خوایەکی شایستەی پەرستن نییە بێجگە لە تۆ، پاکی و بێگەردی بۆ تۆیە، بەڕاستی من لە ستەمکاران و کەمترتەرخەمان بووم.',
    ar: 'دعاء ذي النون في ظلمات بطن الحوت: لا معبود بحق إلا أنت تنزهت عن كل نقص، إني أعترف بتقصيري فنجني مما أنا فيه.',
    en: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    tag: 'prophet'
  },
  // 79: Al-Anbiya (Zakariya)
  {
    id: 79,
    surah: 'ئەنبیا',
    surahAr: 'سورة الأنبياء',
    surahEn: 'Al-Anbiya',
    ayahNumber: 89,
    arabic: 'رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ',
    kurdish: 'ئەی پەروەردگارم! بە تەنیا و بێ وەچە جێم مەهێڵە، و تۆ چاکترینی میراتگرانیت.',
    ar: 'دعاء نبي الله زكريا لطلب الذرية الطيبة: يا ربي لا تتركني بلا ولد يرثني في الدعوة إلى دينك، وأنت الباقي بعد فناء خلقك.',
    en: 'My Lord, do not leave me alone [with no heir], while You are the best of inheritors.',
    tag: 'prophet'
  },
  // 80: Al-Mu'minun (Refuge from Satan)
  {
    id: 80,
    surah: 'مومنون',
    surahAr: 'سورة المؤمنون',
    surahEn: 'Al-Mu\'minun',
    ayahNumber: '97-98',
    arabic: 'رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ * وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ',
    kurdish: 'ئەی پەروەردگارم! پەنات پێ دەگرم لە فیتنە و وسوەسەی شەیتانەکان، و پەنات پێ دەگرم لەوەی کە لێم نزیک ببنەوە.',
    ar: 'يا ربي إني أعتصم بك وألتجئ إليك من وساوس الشياطين ونزغاتها، وأعوذ بك أن يقربوني في أي شأن من شؤوني.',
    en: 'My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me.',
    tag: 'general'
  },
  // 81: Al-Mu'minun (Forgiveness and Mercy)
  {
    id: 81,
    surah: 'مومنون',
    surahAr: 'سورة المؤمنون',
    surahEn: 'Al-Mu\'minun',
    ayahNumber: 118,
    arabic: 'رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    kurdish: 'ئەی پەروەردگارم! لێمان خۆش ببە و بەزەییمان پێدا بهێنەرەوە، و تۆ لە هەمووان چاکتر و بەبەزەییتریت.',
    ar: 'يا ربي اعف عن زلاتنا وتغمدنا بواسع رحمتك، وأنت أرحم بكل مخلوق من أمه وأبيه.',
    en: 'My Lord, forgive and have mercy, and You are the best of the merciful.',
    tag: 'forgiveness'
  },
  // 82: Al-Furqan (Protection from Hellfire)
  {
    id: 82,
    surah: 'فورقان',
    surahAr: 'سورة الفرقان',
    surahEn: 'Al-Furqan',
    ayahNumber: 65,
    arabic: 'رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا',
    kurdish: 'ئەی پەروەردگارمان! سزای دۆزەخمان لەسەر دوور بخەرەوە، چونکە بەڕاستی سزاکەی سزایەکی هەمیشەیی و سەخت و نەبڕاوەیە.',
    ar: 'دعاء عباد الرحمن: يا ربنا ادفع عنا عذاب جهنم ونجنا منه، فإن عذابها دائم وملازم لأصحابه لا ينقطع.',
    en: 'Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering.',
    tag: 'rabbana'
  },
  // 83: Al-Furqan (Righteous Spouse and Offspring)
  {
    id: 83,
    surah: 'فورقان',
    surahAr: 'سورة الفرقان',
    surahEn: 'Al-Furqan',
    ayahNumber: 74,
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    kurdish: 'ئەی پەروەردگارمان! لە هاوسەرەکانمان و لە نەوەکانمان مایەی دڵخۆشی و ڕۆشنایی چاومان پێ ببەخشە، و بمانکە بە پێشەوا و ڕێبەری پارێزگاران.',
    ar: 'دعاء عباد الرحمن: يا ربنا ارزقنا من أزواجنا وأولادنا صلاحاً وتقوى تقر به أعيننا، واجعلنا قدوة للمتقين في الخير والهدى.',
    en: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.',
    tag: 'rabbana'
  },
  // 84: Ash-Shu'ara (Ibrahim)
  {
    id: 84,
    surah: 'شوعەرا',
    surahAr: 'سورة الشعراء',
    surahEn: 'Ash-Shu\'ara',
    ayahNumber: '83-85',
    arabic: 'رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ * وَاجْعَل لِّي لِسَانَ صِدْقٍ فِي الْآخِرِينَ * وَاجْعَلْنِي مِن وَرَثَةِ جَنَّةِ النَّعِيمِ',
    kurdish: 'ئەی پەروەردگارم! دانایی و حیکمەتم پێ ببەخشە و بمخەرە پاڵ چاکەکاران، و ناوبانگێکی چاک و یادی خێرم لە نێو پاشیناندا بۆ دابنێ، و بمکە بە میراتگری بەهەشتی پڕ لە نیعمەت.',
    ar: 'دعاء نبي الله إبراهيم: يا ربي آتني حكمة وفهماً وألحقني بعبادك الأخيار، واجعل لي ذكراً طيباً وثناءً حسناً فيمن يأتي بعدي، واجعلني من الفائزين بجنات النعيم.',
    en: 'My Lord, grant me authority and join me with the righteous, and grant me a reputation of honor among later generations, and place me among the inheritors of the Garden of Pleasure.',
    tag: 'prophet'
  },
  // 85: An-Naml (Sulayman)
  {
    id: 85,
    surah: 'نەمل',
    surahAr: 'سورة النمل',
    surahEn: 'An-Naml',
    ayahNumber: 19,
    arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
    kurdish: 'ئەی پەروەردگارم! یارمەتیم بدە و ئیلهامم پێ ببەخشە تاکو شوکرانەبژێری ئەو نیعمەتەت بم کە بەسەر من و بەسەر دایک و باوکمدا ڕژاندووتە، و کردەوەی چاکەی وا بکەم کە تۆ لێی ڕازی بیت، و بە بەزەیی خۆت بمخەرە نێو بەندە چاکەکارەکانتەوە.',
    ar: 'دعاء نبي الله سليمان: يا ربي ألهمني ووفقني لشكر نعمك التي أنعمت بها عليّ وعلى والديّ، وأن أعمل عملاً صالحاً يرضيك عني، وأدخلني برحمتك في زمرة عبادك الصالحين.',
    en: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into [the ranks of] Your righteous servants.',
    tag: 'prophet'
  },
  // 86: Al-Qasas (Musa - Forgiveness)
  {
    id: 86,
    surah: 'قەسەس',
    surahAr: 'سورة القصص',
    surahEn: 'Al-Qasas',
    ayahNumber: 16,
    arabic: 'رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي',
    kurdish: 'ئەی پەروەردگارم! بەڕاستی من ستەمم لە خۆم کرد، کەواتە لێم خۆش ببە.',
    ar: 'دعاء نبي الله موسى معترفاً بالذنب ومستغفراً: يا ربي إني قصرت وجنيت على نفسي فاغفر لي زلتي.',
    en: 'My Lord, indeed I have wronged myself, so forgive me.',
    tag: 'forgiveness'
  },
  // 87: Al-Qasas (Musa - Seeking Provision & Good)
  {
    id: 87,
    surah: 'قەسەس',
    surahAr: 'سورة القصص',
    surahEn: 'Al-Qasas',
    ayahNumber: 24,
    arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    kurdish: 'ئەی پەروەردگارم! بەڕاستی من بۆ هەر خێر و بەرەکەتێک کە بۆم داببەزێنیت، زۆر هەژار و پێویستم.',
    ar: 'دعاء نبي الله موسى عند خروجه إلى مدين: يا ربي إني محتاج إلى كل فضل ورزق وعون تنزله عليّ.',
    en: 'My Lord, indeed I am, for whatever good You would send down to me, in need.',
    tag: 'prophet'
  },
  // 88: Al-Ahqaf (Gratitude and Righteous Family)
  {
    id: 88,
    surah: 'ئەحقاف',
    surahAr: 'سورة الأحقاف',
    surahEn: 'Al-Ahqaf',
    ayahNumber: 15,
    arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ',
    kurdish: 'ئەی پەروەردگارم! هانم بدە و فێرم بکە کە سوپاسی ئەو نیعمەتە بکەم کە بەسەر من و باوانمدا ڕژاندووتە، و کردەوەی چاک بکەم کە تۆ پێی ڕازی بیت، و نەوەکانم بۆ چاک بکە و بپارێزە؛ بەڕاستی من تەوبەم بۆ لای تۆ هێناوە و لە ڕیزی موسڵمانانم.',
    ar: 'يا ربي ألهمني أن أشكر نعمك العظيمة عليّ وعلى والديّ، وأن أعمل الصالحات، وأصلح شأن ذريتي، إني رجعت إليك تائباً وخاضعاً لحكمك.',
    en: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve and make righteous for me my offspring. Indeed, I have repented to You, and indeed, I am of the Muslims.',
    tag: 'parents'
  },
  // 89: Al-Hashr (Love and Unity of Believers)
  {
    id: 89,
    surah: 'حەشر',
    surahAr: 'سورة الحشر',
    surahEn: 'Al-Hashr',
    ayahNumber: 10,
    arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ',
    kurdish: 'ئەی پەروەردگارمان! لە ئێمە و لەو برایانەمان ببورە کە پێش ئێمە باوەڕیان هێناوە، و لە دڵەکانماندا هیچ کینە و ڕقێک بەرامبەر باوەڕداران دامەنێ؛ پەروەردگارمان! بەڕاستی تۆ زۆر بەبەزەیی و میهرەبانیت.',
    ar: 'يا ربنا اغفر ذنوبنا وذنوب إخواننا السابقين بالإيمان، وطهر قلوبنا من كل حقد وحسد على المؤمنين، إنك أنت الرؤوف الرحيم.',
    en: 'Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts [any] resentment toward those who have believed. Our Lord, indeed You are Full of Kindness and Merciful.',
    tag: 'rabbana'
  },
  // 90: At-Tahrim (Asiyah's Dua for a Home in Paradise)
  {
    id: 90,
    surah: 'تەحریم',
    surahAr: 'سورة التحريم',
    surahEn: 'At-Tahrim',
    ayahNumber: 11,
    arabic: 'رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ وَنَجِّنِي مِن فِرْعَوْنَ وَعَمَلِهِ وَنَجِّنِي مِنَ الْقَوْمِ الظَّالِمِينَ',
    kurdish: 'ئەی پەروەردگارم! لە نزیک خۆتەوە لە بەهەشتدا ماڵێکم بۆ دروست بکە، و لە فیرعەون و کردەوە خراپەکانی ڕزگارم بکە، و لە کۆمەڵی ستەمکاران بمانپارێزە.',
    ar: 'دعاء آسية امرأة فرعون: يا ربي ابنِ لي عندك قصراً ومستقراً في جنات الفردوس، وأنقذني من بطش فرعون وظلمه، ونجني من كيد القوم الظالمين.',
    en: 'My Lord, build for me near You a house in Paradise and save me from Pharaoh and his deeds and save me from the wrongdoing people.',
    tag: 'prophet'
  }
];
