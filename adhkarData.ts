/**
 * داتای زیکرەکان و دەق و ژمارەی خوێندنەوەیان.
 */
import { DhikrItem } from '../types';

export const ADHKAR_LIST: DhikrItem[] = [
  // --- Morning Adhkar (زیکری بەیانیان) ---
  {
    id: 'm-1',
    category: 'morning',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
    kurdish: 'بەیانیمان بەسەردا هات لە کاتێکدا هەموو موڵک و دەسەڵات بۆ خوایە، ستایش بۆ خوایە، هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە ئەڵڵا بە تەنها و بێ هاوبەشە، دەسەڵات و سوپاس هەر بۆ ئەوە و بەسەر هەموو شتێکدا توانای هەیە.',
    english: 'We have entered a new morning and upon this morning all dominion belongs to Allah, and all praise is to Allah. There is none worthy of worship except Allah, alone without partner.',
    targetCount: 1,
    virtueKu: 'پێغەمبەر ﷺ هەموو بەیانییەک ئەمەی دەفەرموو بۆ بەدەستهێنانی پەنا و بەرەکەتی خودا.',
    virtueAr: 'سيد الأذكار الصباحية لطمأنينة القلب والتسليم لله تعالى.',
    virtueEn: 'Morning supplication of devotion and reliance upon Allah.'
  },
  {
    id: 'm-2',
    category: 'morning',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.',
    kurdish: 'گەورەی دوعاکانی لێخۆشبوون (سەیدی ئیستیغفار): خوایە تۆ پەروەردگاری منی، هیچ پەرستراوێک نییە جگە لە تۆ، منت دروستکردووە و من بەندەی تۆم، لەسەر پەیمان و بەڵێنی تۆم تا توانام هەبێت، پەنات پێ دەگرم لە خراپەی کردەوەکانم، دان دەنێم بە چاکە و بەخششت بەسەرمەوە و دان دەنێم بە گوناهەکانم، لێم خۆشبە چونکە کەس لە گوناه خۆش نابێت جگە لە تۆ.',
    english: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your slave. I abide by Your covenant as much as I am able. Forgive me, for none forgives sins except You.',
    targetCount: 1,
    virtueKu: 'پێغەمبەر ﷺ فەرموویەتی: هەرکەس لە بەیانیدا بە دڵنیاییەوە بیخوێنێت و پێش ئێوارە بمرێت، لە ئەهلی بەهەشتە.',
    virtueAr: 'سيد الاستغفار، من قاله موقناً به فمات من يومه قبل أن يمسي دخل الجنة.',
    virtueEn: 'Master of supplications for forgiveness. Whoever recites it with certainty and dies that day enters Paradise.'
  },
  {
    id: 'm-3',
    category: 'morning',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
    kurdish: 'بە ناوی ئەو خوایەی بە ناوی ئەوەوە هیچ شتێک زیان ناگەیەنێت لە زەوی و لە ئاسماندا، و ئەو بیسەر و زانایە.',
    english: 'In the Name of Allah, with Whose Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
    targetCount: 3,
    virtueKu: 'هەرکەس 3 جار لە بەیانی و 3 جار لە ئێواراندا بیخوێنێت هیچ زیانێکی پێ ناگات.',
    virtueAr: 'من قالها ثلاثاً لم يضره شيء حتى يمسي أو يصبح.',
    virtueEn: 'Recite 3 times; nothing can cause harm to the reciter.'
  },
  {
    id: 'm-4',
    category: 'morning',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا.',
    kurdish: 'ڕازیم بەوەی ئەڵڵا پەروەردگارم بێت، و ئیسلام ئاینم بێت، و موحەممەد ﷺ پێغەمبەرم بێت.',
    english: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.',
    targetCount: 3,
    virtueKu: 'مافە لەسەر خوای گەورە لە ڕۆژی دواییدا ڕازی بکات.',
    virtueAr: 'كان حقاً على الله أن يرضيه يوم القيامة.',
    virtueEn: 'Whoever recites it thrice in the morning and evening, Allah guarantees satisfaction on the Day of Judgment.'
  },
  {
    id: 'm-5',
    category: 'morning',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.',
    kurdish: 'پاک و بێگەردی و ستایش بۆ خوایە بە ئەندازەی ژمارەی دروستکراوەکانی، بە ئەندازەی ڕەزامەندی نەفسی خۆی، بە کێشی عەرشەکەی و بە ڕادەی ژمارەی وشەکانی.',
    english: 'Glory be to Allah and all praise is due to Him, by the number of His creation, by His pleasure, by the weight of His Throne, and by the ink of His words.',
    targetCount: 3,
    virtueKu: 'پاداشتەکەی بە هێندەی کاتژمێرەها لە زیکر و تەسبیحە.',
    virtueAr: 'تعدل ساعات طويلة من الذكر والتسبيح بأجر مضاعف.',
    virtueEn: 'Equivalent to long hours of continuous remembrance and praise.'
  },

  // --- Evening Adhkar (زیکری ئێواران) ---
  {
    id: 'e-1',
    category: 'evening',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
    kurdish: 'ئێوارەمان بەسەردا هات لە کاتێکدا هەموو دەسەڵات بۆ خودایە، سوپاس بۆ خودا، هیچ پەرستراوێک نییە جگە لە ئەڵڵا بە تەنها و بێ هاوبەشە، دەسەڵات و ستایش هەر بۆ ئەوە.',
    english: 'We have reached the evening and upon this evening all sovereignty belongs to Allah, and all praise is to Allah.',
    targetCount: 1,
    virtueKu: 'پاراستنی موسڵمان لە تەواوی شەودا تا بەیانی.',
    virtueAr: 'يحفظ المسلم طوال ليلته حتى يصبح.',
    virtueEn: 'Protects the believer throughout the entire night.'
  },
  {
    id: 'e-2',
    category: 'evening',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.',
    kurdish: 'پەنا دەگرم بە وشە تەواو و پیرۆزەکانی خوا لە شەڕ و خراپەی هەرچی دروستی کردووە.',
    english: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    targetCount: 3,
    virtueKu: 'لە هەموو پێوەدان و ژەهر و خراپەیەکی شەوانە دەیپارێزێت.',
    virtueAr: 'يحفظ من الهوام والدواب والسموم وسوء تلك الليلة.',
    virtueEn: 'Protects from harm, venomous creatures, and unseen perils.'
  },
  {
    id: 'e-3',
    category: 'evening',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَـهَ إِلاَّ أَنْتَ.',
    kurdish: 'خوایە لەشم ساغ بکە، خوایە گوێم ساغ بکە، خوایە چاوم سەلامەت و ساغ بکە، هیچ پەرستراوێک نییە جگە لە تۆ.',
    english: 'O Allah, grant health to my body; O Allah, grant health to my hearing; O Allah, grant health to my sight. There is none worthy of worship except You.',
    targetCount: 3,
    virtueKu: 'داواکردنی ساغی و تەنروستی بۆ چاو و گوێ و جەستە.',
    virtueAr: 'دعاء جامع لعافية الجسد والسمع والبصر.',
    virtueEn: 'Supplication for overall physical and sensory well-being.'
  },

  // --- After Prayer Adhkar (زیکری دوای نوێژە فەرزەکان) ---
  {
    id: 'ap-1',
    category: 'after_prayer',
    arabic: 'أَسْتَغْفِرُ اللَّهَ (3 جار)، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.',
    kurdish: 'داوای لێخۆشبوون لە خوا دەکەم (٣ جار)، خوایە تۆ سەلامەتیت و سەلامەتیش لە تۆوەیە، پیرۆز و مەزنی ئەی خاوەنی شکۆ و بەخشندەیی.',
    english: 'I seek the forgiveness of Allah (3 times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.',
    targetCount: 1,
    virtueKu: 'سوننەتی ڕاستەوخۆی دوای سەلامدانەوەی نوێژە.',
    virtueAr: 'أول ما يقال دبر كل صلاة مكتوبة.',
    virtueEn: 'First utterance immediately upon completing the obligatory prayer.'
  },
  {
    id: 'ap-2',
    category: 'after_prayer',
    arabic: 'سُبْحَانَ اللَّهِ (33)، الْحَمْدُ لِلَّهِ (33)، اللَّهُ أَكْبَرُ (33)، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (1).',
    kurdish: 'تەسبیحات و ستایشکردنی پەروەردگار لە دوای نوێژ کە دەبێتە ١٠٠ پەیڤی پڕ بەرەکەت.',
    english: 'SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (33), followed by La ilaha illa Allah alone without partner (1).',
    targetCount: 1,
    virtueKu: 'پێغەمبەر ﷺ فەرموویەتی: هەموو تاوانەکانی دەبەخشرێت تەنانەت ئەگەر وەک کەفی دەریایش بێت.',
    virtueAr: 'غفرت خطاياه وإن كانت مثل زبد البحر.',
    virtueEn: 'Sins forgiven even if they were like the foam of the sea.'
  },
  {
    id: 'ap-3',
    category: 'after_prayer',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ... (آيَةُ الْكُرْسِيِّ)',
    kurdish: 'خوێندنی ئایەتی کورسی (ئایەتی ٢٥٥ لە سوورەتی بەقەرە) لە دوای هەر نوێژێکی فەرز.',
    english: 'Recitation of Ayatul Kursi (Surah Al-Baqarah 2:255) after every obligatory prayer.',
    targetCount: 1,
    virtueKu: 'پێغەمبەر ﷺ فەرموویەتی: هەرکەس دوای هەموو نوێژێکی فەرز ئایەتی کورسی بخوێنێت، هیچ شتێک ڕێگری لێ ناکات بچێتە بەهەشت جگە لە مردن.',
    virtueAr: 'من قرأ آية الكرسي دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا الموت.',
    virtueEn: 'Whoever recites Ayatul Kursi after each prayer, nothing prevents them from entering Paradise except death.'
  },

  // --- Sleep Adhkar (زیکری خەوتن) ---
  {
    id: 's-1',
    category: 'sleep',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.',
    kurdish: 'بە ناوی تۆوە ئەی پەروەردگارم تەنیشتم خست و بە تۆش بەرزی دەکەمەوە، ئەگەر گیانم کێشا ڕەحمی پێ بکە، و ئەگەر هێشتتەوە بیپارێزە بەوەی کە بەندە چاکەکانتی پێ دەپارێزیت.',
    english: 'In Your name, my Lord, I lay down my side and by Your power I raise it. If You take my soul, have mercy on it, and if You release it, protect it as You protect Your righteous slaves.',
    targetCount: 1,
    virtueKu: 'پێغەمبەر ﷺ پێش خەوتن لەسەر لای ڕاست ئەمەی دەفەرموو.',
    virtueAr: 'من أذكار النوم المأثورة للسكينة وحفظ الروح.',
    virtueEn: 'Sunnah before sleeping for peaceful rest and spiritual protection.'
  },
  {
    id: 's-2',
    category: 'sleep',
    arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.',
    kurdish: 'خوایە لە سزاکەت بمپارێزە لەو ڕۆژەی کە بەندەکانت زیندوو دەکەیتەوە.',
    english: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
    targetCount: 3,
    virtueKu: 'پێغەمبەر ﷺ کاتێک دەستی ڕاستی دەخستە ژێر ڕوومەتی ئەمەی ٣ جار دەفەرموو.',
    virtueAr: 'كان النبي ﷺ إذا أراد أن يرقد وضع يده اليمنى تحت خده ثم قالها ثلاثاً.',
    virtueEn: 'Recited 3 times with the right hand placed under the cheek.'
  },

  // --- Daily Duas (دوعاکانی ڕۆژانە) ---
  {
    id: 'd-1',
    category: 'daily',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.',
    kurdish: 'دوعای چوونە دەرەوە لە ماڵ: بە ناوی خوای گەورە، پشتم بە خوا بەست، هیچ گۆڕان و هێزێک نییە جگە لە خوا بە تەنها.',
    english: 'Leaving home: In the name of Allah, I place my trust in Allah; there is no power nor strength except by Allah.',
    targetCount: 1,
    virtueKu: 'پێی دەوترێت: ڕێنوێنی کرایت، بەستتە تەواوی و پارێزراویت، و شەیتان لێت دوور دەکەوێتەوە.',
    virtueAr: 'يقال له: هُديت وكُفيت ووُقيت، وتنحى عنه الشيطان.',
    virtueEn: 'The angels reply: You are guided, defended, and protected, and devil turns away.'
  },
  {
    id: 'd-2',
    category: 'daily',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.',
    kurdish: 'دوعای گشتگیر و مەزن: پەروەردگارمان لە دونیادا چاکە و لە دواڕۆژیشدا چاکەمان پێ ببەخشە و لە سزای ئاگری دۆزەخ بمانپارێزە.',
    english: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
    targetCount: 3,
    virtueKu: 'پڕ سوودترین و زۆرترین دوعایەک کە پێغەمبەر ﷺ دەیکرد.',
    virtueAr: 'أكثر دعاء كان يدعو به النبي ﷺ لشموليته خير الدنيا والآخرة.',
    virtueEn: 'The most frequent supplication made by the Prophet Muhammad (pbuh).'
  },
  {
    id: 'd-3',
    category: 'daily',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ.',
    kurdish: 'دوعای دەربازبوون لە خەم و قەرزداری: خوایە پەنات پێ دەگرم لە خەم و خەفەت، و بێدەسەڵاتی و تەمبەڵی، و ڕەزیلی و ترسنۆکی، و قورسایی قەرز و دەسەڵاتی خەڵکی بەسەرمدا.',
    english: 'O Allah, I seek refuge with You from anxiety and grief, weakness and laziness, miserliness and cowardice, the burden of debts and being overpowered by people.',
    targetCount: 1,
    virtueKu: 'چارەسەری پێغەمبەرانە بۆ دڵتەنگی و قەرزداری و ناڕەحەتی.',
    virtueAr: 'دعاء تفريج الهموم وسداد الديون.',
    virtueEn: 'Supplication for relief from distress, debt, and overwhelm.'
  }
];
