const hi = {
  tabs: {
    home: 'होम',
    history: 'इतिहास',
    community: 'समुदाय',
    profile: 'प्रोफ़ाइल',
    homeTitle: 'Monster Counter',
  },
  home: {
    heroTitle: 'आज कौन सा पिया?',
    heroSubtitle: 'हर Monster को रिकॉर्ड करो',
    today: 'आज',
    total: 'कुल',
    selectMonster: 'अपना Monster चुनो',
    dailyGoal: 'आज का लक्ष्य',
    dailyGoalDone: 'लक्ष्य पूरा!',
    longPressHint: 'पोषण जानकारी के लिए देर तक दबाएँ',
    caffeineWarning: 'आज आपने अनुशंसित 400 mg कैफीन से अधिक ले लिया है',
    caffeineDismiss: 'बंद करें',
    weeklySummary: 'साप्ताहिक सारांश',
    weeklyCompare: '{{change}} vs पिछला सप्ताह',
    weeklyCans: '{{count}} कैन',
    weeklyCaffeine: '{{amount}} mg कैफीन',
  },
  history: {
    loading: 'लोड हो रहा है…',
    emptyTitle: 'इतिहास में अभी कोई Monster नहीं।',
    emptySubtitle: 'होम टैब से एक जोड़ें।',
    filterAll: 'सभी',
    records_one: '{{count}} एंट्री',
    records_other: '{{count}} एंट्रीज़',
    deleteTitle: 'एंट्री हटाएँ',
    deleteMessage: '{{name}} हटाएँ?',
    cancel: 'रद्द करें',
    delete: 'हटाएँ',
    today: 'आज',
    emptyFilter: 'इस फ्लेवर की कोई एंट्री नहीं',
  },
  profile: {
    greeting: 'हे, {{name}}!',
    syncActive: 'सिंक चालू ☁️',
    syncInactive: 'आपका Monster सारांश',
    authBannerTitle: 'सिंक चालू करें',
    authBannerSub: 'क्लाउड में सेव करने के लिए Google से साइन इन करें',
    googleBtn: 'Google',
    totalLabel: 'कुल कैन',
    todayLabel: 'आज',
    streak_one: '{{count}} दिन की स्ट्रीक',
    streak_other: '{{count}} दिन की स्ट्रीक',
    streakLabel: 'सक्रिय स्ट्रीक · जारी रखो!',
    favoriteLabel: 'आपका पसंदीदा',
    favoriteUnit: '{{count}} बार',
    menuTitle: 'विकल्प',
    menuGroupAccount: 'खाता',
    menuGroupApp: 'ऐप',
    editName: 'मेरा प्रोफ़ाइल',
    statsDetail: 'विस्तृत आँकड़े',
    settings: 'सेटिंग्स',
    logout: 'साइन आउट',
    logoutTitle: 'साइन आउट',
    logoutMsg: 'क्या आप निश्चित हैं? आपका स्थानीय डेटा बना रहेगा।',
    logoutCancel: 'रद्द करें',
    logoutConfirm: 'साइन आउट',
    editModalTitle: 'नाम बदलें',
    editPlaceholder: 'अपना नाम दर्ज करें',
    editCancel: 'रद्द करें',
    editSave: 'सेव करें',
    supportAd: 'डेवलपर को एक Monster दिलाओ',
    supportAdSub: 'एक छोटा विज्ञापन देखें · 100% स्वैच्छिक',
    supportThanksTitle: 'धन्यवाद!',
    supportThanks: 'Monster के लिए धन्यवाद! आपका समर्थन बहुत मायने रखता है',
    supportError: 'विज्ञापन लोड नहीं हो सका। बाद में पुनः प्रयास करें।',
    footer: 'Monster Counter · v1.7.3',
  },
  publicProfile: {
    title: 'प्रोफ़ाइल',
    statsPrivate: 'इस उपयोगकर्ता ने अपने आँकड़े छिपाए हैं',
    achievementsPrivate: 'इस उपयोगकर्ता ने अपनी उपलब्धियाँ छिपाई हैं',
    loginRequired: 'अन्य उपयोगकर्ताओं की प्रोफ़ाइल देखने के लिए साइन इन करें',
  },
  comunidad: {
    achievementsTitle: 'उपलब्धियाँ',
    unlocked: '{{total}} में से {{count}} अनलॉक',
    communityTitle: 'समुदाय',
    communityTotal: 'कुल कैन दर्ज',
    error: 'समुदाय डेटा लोड नहीं हो सका',
    flavorRanking: 'सबसे लोकप्रिय फ्लेवर',
    topDrinkers: 'टॉप ड्रिंकर्स',
    flavorRequests: 'फ्लेवर अनुरोध',
    requestNewFlavor: 'फ्लेवर का अनुरोध करें',
    requestName: 'फ्लेवर का नाम',
    requestNamePlaceholder: 'उदा.: Monster Ultra Rosa',
    requestDescription: 'विवरण (वैकल्पिक)',
    requestDescriptionPlaceholder: 'आप यह फ्लेवर क्यों चाहते हैं?',
    requestPhoto: 'फ़ोटो संलग्न करें (वैकल्पिक)',
    requestPhotoChange: 'फ़ोटो बदलें',
    removePhoto: 'हटाएँ',
    requestSubmit: 'अनुरोध भेजें',
    requestBy: '{{name}} द्वारा',
    requestLoginToVote: 'वोट करने के लिए साइन इन करें',
    requestLoginToSubmit: 'फ्लेवर अनुरोध के लिए साइन इन करें',
    requestEmpty: 'अभी कोई अनुरोध नहीं। पहले बनो!',
    requestVote_one: '{{count}} वोट',
    requestVote_other: '{{count}} वोट',
    requestPhotoCamera: 'फ़ोटो लें',
    requestPhotoGallery: 'गैलरी से चुनें',
    requestDeleteTitle: 'अनुरोध हटाएँ',
    requestDeleteMsg: '"{{name}}" हटाएँ?',
    requestDelete: 'हटाएँ',
    requestErrorTitle: 'भेजने में त्रुटि',
    requestErrorGeneric: 'अनुरोध नहीं भेजा जा सका। कृपया पुनः प्रयास करें।',
    photoPending: 'लंबित',
    approvePhoto: 'स्वीकृत करें',
  },
  stats: {
    title: 'आँकड़े',
    totalCans: 'कुल कैन',
    verifiedCans: 'सत्यापित (कैमरा)',
    activeDays: 'सक्रिय दिन',
    avgPerDay: 'औसत / दिन',
    avgPerWeek: 'औसत / सप्ताह',
    last7Days: 'पिछले 7 दिन',
    hourOfDay: 'दिन का समय',
    monthlyTrend: 'मासिक रुझान',
    personalRecord: 'व्यक्तिगत रिकॉर्ड',
    cansInDay: 'एक दिन में कैन · {{date}}',
    startTracking: 'अपना रिकॉर्ड देखने के लिए ट्रैक करना शुरू करें',
    byFlavor: 'फ्लेवर के अनुसार',
    noData: 'अभी कोई डेटा नहीं',
    earlyMorning: 'सुबह-सवेरे',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    night: 'रात',
    days: {
      '0': 'रवि',
      '1': 'सोम',
      '2': 'मंगल',
      '3': 'बुध',
      '4': 'गुरु',
      '5': 'शुक्र',
      '6': 'शनि',
    },
    months: {
      '0': 'जन',
      '1': 'फ़र',
      '2': 'मार्च',
      '3': 'अप्रैल',
      '4': 'मई',
      '5': 'जून',
      '6': 'जुला',
      '7': 'अग',
      '8': 'सित',
      '9': 'अक्टू',
      '10': 'नव',
      '11': 'दिस',
    },
  },
  settings: {
    title: 'सेटिंग्स',
    dailyGoalSection: 'दैनिक लक्ष्य',
    dailyGoal: 'दैनिक कैन लक्ष्य',
    dailyGoalDesc: 'होम पर प्रगति बार दिखाता है। 0 = बंद।',
    dailyGoalOff: 'बंद',
    notificationsSection: 'सूचनाएँ',
    dailyReminder: 'दैनिक रिमाइंडर',
    reminderTime: 'रिमाइंडर का समय',
    privacySection: 'गोपनीयता',
    showInRanking: 'वैश्विक रैंकिंग में दिखें',
    showInRankingDesc: 'आपका नाम समुदाय के टॉप ड्रिंकर्स में दिखता है',
    showAchievements: 'मेरी उपलब्धियाँ दिखाएँ',
    showAchievementsDesc: 'अन्य उपयोगकर्ता आपकी प्रोफ़ाइल पर आपकी अनलॉक उपलब्धियाँ देख सकते हैं',
    showStats: 'मेरे आँकड़े दिखाएँ',
    showStatsDesc: 'अन्य उपयोगकर्ता आपकी प्रोफ़ाइल पर आपका कुल, स्ट्रीक और पसंदीदा देख सकते हैं',
    appearanceSection: 'दिखावट',
    darkMode: 'डार्क',
    lightMode: 'लाइट',
    systemMode: 'सिस्टम',
    languageSection: 'भाषा',
    languageAuto: 'ऑटो',
    weeklySummary: 'साप्ताहिक सारांश',
    weeklySummaryDesc: 'हर सोमवार एक सारांश प्राप्त करें',
    audioSection: 'AUDIO MOOD',
    audioMood: 'विवरण खोलने पर संगीत',
    audioMoodDesc: 'Monster विवरण खोलते समय गाने का प्रीव्यू चलाता है।',
    audioVolume: 'वॉल्यूम',
    aboutSection: 'जानकारी',
    appName: 'Monster Counter',
    version: 'संस्करण 1.7.2',
    copyright: 'आपकी Monster Energy कैन ट्रैक करने का ऐप।\n© 2026',
  },
  detail: {
    legend: 'द लीजेंड',
    nutritionTitle: 'पोषण जानकारी · {{volume}} ml',
    calories: 'कैलोरी',
    caffeine: 'कैफीन',
    sugar: 'शुगर',
    sodium: 'सोडियम',
    disclaimer: '⚠️ स्वस्थ वयस्कों के लिए अनुशंसित अधिकतम: प्रतिदिन 400 mg कैफीन।',
  },
  achievements: {
    firstCan: {
      title: 'पहली कैन',
      desc: 'अपनी पहली Monster कैन रिकॉर्ड करें',
    },
    tenCans: {
      title: '10 कैन',
      desc: '10 कैन रिकॉर्ड जमा करें',
    },
    fiftyCans: {
      title: '50 कैन',
      desc: '50 कैन रिकॉर्ड जमा करें',
    },
    hundredCans: {
      title: '100 कैन',
      desc: '100 कैन रिकॉर्ड जमा करें',
    },
    streak7: {
      title: '7 दिन की स्ट्रीक',
      desc: 'लगातार 7 दिन कम से कम एक Monster के साथ',
    },
    streak30: {
      title: '30 दिन की स्ट्रीक',
      desc: 'लगातार 30 दिन कम से कम एक Monster के साथ',
    },
    collector: {
      title: 'कलेक्टर',
      desc: 'सभी {{count}} Monster फ्लेवर आज़माएँ',
    },
    earlyBird: {
      title: 'सुबह का पंछी',
      desc: 'सुबह 8:00 बजे से पहले Monster रिकॉर्ड करें',
    },
    withYourNoctulo: {
      title: 'रात का उल्लू',
      desc: 'रात 11:00 बजे के बाद Monster रिकॉर्ड करें',
    },
  },
  scanner: {
    title: 'बारकोड स्कैन करें',
    hint: 'कैन के बारकोड पर कैमरा लगाएँ',
    permissionNeeded: 'स्कैन करने के लिए कैमरा अनुमति चाहिए',
    grantPermission: 'अनुमति दें',
    unknownTitle: 'अज्ञात कोड',
    unknownMessage: 'कोड {{code}} डेटाबेस में नहीं है। मैन्युअली जोड़ें?',
    addManually: 'मैन्युअली जोड़ें',
    adding: 'रिकॉर्ड हो रहा है…',
    rescan: 'फिर से स्कैन करें',
    registered: 'रिकॉर्ड हो गया!',
  },
  rateLimit: {
    title: 'सीमा पूरी हुई',
    exceeded: 'अगली कैन रिकॉर्ड करने से पहले {{minutes}} मिनट प्रतीक्षा करें।',
  },
  notification: {
    title: 'Monster Counter',
    body: 'क्या आपने आज अपना Monster रिकॉर्ड किया? 🥤',
  },
  monsters: {
    ultraZeroWhite: {
      name: 'Monster Ultra Zero White',
      description:
        'ज़ीरो शुगर, ज़ीरो कैलोरी। सिट्रस की खुशबू के साथ हल्का स्वाद और अल्ट्रा क्लीन फ़िनिश। फ़िगर का ख्याल रखने वालों का पसंदीदा।',
      legend:
        'कुछ लोगों को खुश करना नामुमकिन है। जैसे ही उन्हें जो चाहिए मिल जाता है, वे नई चुनौतियों की तलाश में निकल पड़ते हैं। हमारे राइडर्स और Monster Girls भी ऐसे ही हैं... वे काफ़ी समय से इशारे कर रहे थे। उन्हें एक नया Monster चाहिए था। कुछ कम मीठा, हल्का, ज़ीरो कैलोरी, लेकिन Monster एनर्जी ब्लेंड की पूरी ताकत के साथ। सफ़ेद नया काला है। हमने खुद के लिए मुश्किल बना ली: Monster Energy Zero Ultra.',
    },
    originalGreen: {
      name: 'Monster Original Green OG',
      description:
        'ओरिजिनल क्लासिक। 2002 से शुरू हुई एनर्जी फ़ॉर्मूला के साथ तीव्र और मीठा स्वाद। एक कैन, एक विरासत।',
      legend:
        'ग्रह पर सबसे दमदार एनर्जी ड्रिंक की कैन खोलो: Monster Energy। हल्के मीठे स्वाद के साथ आसानी से गले से उतरता है। सही सामग्री का सही अनुपात में सही मिश्रण जो आपको Monster किक देता है। Unleash the Beast!',
    },
    ultraBlueHawaiian: {
      name: 'Monster Ultra Blue Hawaiian',
      description:
        'ट्रॉपिकल अनानास और पैशन फ्रूट फ्लेवर। ज़ीरो शुगर, ज़ीरो कैलोरी। हर घूंट में हवाई के समुद्र तटों की सैर।',
      legend:
        'चाहे आप बीस्ट मोड में हों, वेकेशन मोड में हों, या बस आइलैंड स्टाइल में चिल कर रहे हों – Ultra Blue Hawaiian आपको बेस्ट देने के लिए आग लगा देगा। हल्का, ताज़ा और बहुत आसानी से पीने योग्य, ट्रॉपिकल टिकी ट्विस्ट के साथ। Blue Hawaiian एक्ज़ोटिक पोलिनेशियन फ्रूट फ्लेवर्स का एक धमाकेदार कॉम्बो है – ज़बरदस्त स्वाद, ज़ीरो शुगर।',
    },
    classicZeroSugar: {
      name: 'Monster Energy Classic Zero Sugar',
      description:
        'ओरिजिनल Monster का स्वाद लेकिन बिना शुगर और कैलोरी के। क्लासिक से समझौता न करने वालों के लिए दोनों दुनिया का बेस्ट।',
      legend:
        'Monster Zero Sugar में सही सामग्री का आदर्श मिश्रण है जो आपको वही बूस्ट देता है जो आपको चाहिए – वही OG स्वाद लेकिन Zero Sugar। कैफीन से थकान से लड़ें और मानसिक प्रदर्शन और एकाग्रता में सुधार करें। पूरा Monster, बिना शुगर।',
    },
    mangoLoco: {
      name: 'Juice Monster Mango Loco',
      description:
        '50% ट्रॉपिकल फ्रूट जूस, आम और लूलो के साथ। मीठा, फ्रूटी और धमाकेदार। कुछ ज़्यादा नैचुरल और रसीला चाहने वालों के लिए।',
      legend:
        'हर साल 31 अक्टूबर की पूर्व संध्या पर, दोस्त और परिवार Día de los Muertos मनाने के लिए इकट्ठा होते हैं। गेंदे के फूल, रहस्यवाद और यादें, खाने-पीने के साथ मिलकर, दिवंगतों की आत्माओं को फ़िएस्टा में शामिल होने का न्योता देती हैं। Mango Loco एक्ज़ोटिक जूस का एक स्वर्गीय मिश्रण है जो सबसे ज़िद्दी आत्मा को भी आकर्षित कर सकता है। सच में लोको स्वाद, पार्टी दिनों तक चलाने के लिए Monster मैजिक के साथ।',
    },
    aussieLemonade: {
      name: 'Monster Energy Aussie Lemonade',
      description:
        'ताज़ा ऑस्ट्रेलियन लेमोनेड फ्लेवर। ज़ीरो शुगर, ज़ीरो कैलोरी। सिट्रसी, जोशीला और पूरी Monster एनर्जी के साथ। गर्मियों के लिए परफ़ेक्ट।',
      legend:
        '10,000 से ज़्यादा समुद्र तटों, ग्रेट बैरियर रीफ़ और ग्रह के सबसे एक्ज़ोटिक सिट्रस फलों वाली भूमि से प्रेरित होकर, हमने Aussie Style Lemonade बनाई। क्लासिक लेमोनेड का Monster वर्ज़न: खट्टे और मीठे के बीच परफ़ेक्ट बैलेंस, ताज़ा सिट्रस के साथ। हमेशा की तरह, हमारे विश्व प्रसिद्ध Monster एनर्जी ब्लेंड से भरपूर। एक बर्फ़ जैसी ठंडी खोलो और ज़ोर लगाओ। Unleash the Beast!',
    },
    ultraPeachyKeen: {
      name: 'Monster Ultra Peachy Keen',
      description:
        'मीठा, प्राकृतिक आड़ू फ्लेवर। ज़ीरो शुगर, ज़ीरो कैलोरी। ताज़ा और रसीला, आड़ू प्रेमियों के लिए परफ़ेक्ट।',
      legend:
        'Monster Ultra Peachy Keen पके आड़ू के मीठे स्वाद को Ultra फ़ॉर्मूला के साथ जोड़ता है – ज़ीरो शुगर, ज़ीरो कैलोरी। हल्का, ताज़ा और आसानी से पीने योग्य।',
    },
    ultraParadise: {
      name: 'Monster Ultra Paradise',
      description:
        'ट्रॉपिकल कीवी और स्ट्रॉबेरी फ्लेवर। ज़ीरो शुगर, ज़ीरो कैलोरी। हरा, जोशीला और ताज़ा जैसे कैन में जन्नत हो।',
      legend:
        'Monster Ultra Paradise आपको कीवी और स्ट्रॉबेरी कॉम्बो के साथ ट्रॉपिकल जन्नत में ले जाता है। ज़ीरो शुगर, ज़ीरो कैलोरी, पूरी Monster एनर्जी।',
    },
    ultraGoldenPineapple: {
      name: 'Monster Ultra Golden Pineapple',
      description:
        'गोल्डन ट्रॉपिकल अनानास फ्लेवर। ज़ीरो शुगर, ज़ीरो कैलोरी। मीठा, ट्रॉपिकल और Monster Ultra टच के साथ।',
      legend:
        'Monster Ultra Golden Pineapple सबसे मीठे अनानास का स्वाद Ultra वर्ज़न में कैप्चर करता है – बिना शुगर और कैलोरी के।',
    },
    juiceRipper: {
      name: 'Juice Monster Ripper',
      description:
        '50% फ्रूट जूस – आम, संतरा और पैशन फ्रूट। मीठा, ट्रॉपिकल और धमाकेदार। Juice लाइन अपने बेस्ट पर।',
      legend:
        'Juice Monster Ripper एक्ज़ोटिक ट्रॉपिकल जूस को Monster एनर्जी के साथ जोड़ता है। एक पागल स्वाद जो आपको सीधे ट्रॉपिक्स में ले जाता है।',
    },
    juicePipelinePunch: {
      name: 'Juice Monster Pipeline Punch',
      description:
        'अमरूद, संतरा और पैशन फ्रूट का ट्रॉपिकल मिक्स। मीठा, फ्रूटी और 50% असली फ्रूट जूस के साथ।',
      legend:
        'Juice Monster Pipeline Punch ट्रॉपिकल फ्लेवर्स का धमाका है। हर घूंट में अमरूद, संतरा और पैशन फ्रूट, पूरी Monster एनर्जी के साथ।',
    },
    juicePacificPunch: {
      name: 'Juice Monster Pacific Punch',
      description: 'प्रशांत महासागर के ट्रॉपिकल फलों का मिश्रण। 50% फ्रूट जूस, मीठा और ताज़ा।',
      legend:
        'Juice Monster Pacific Punch प्रशांत के ट्रॉपिकल स्वादों को Monster एनर्जी के साथ जोड़ता है।',
    },
    juiceBadApple: {
      name: 'Juice Monster Bad Apple',
      description: 'खट्टे हरे सेब का स्वाद। 50% फ्रूट जूस, मीठा और ताज़ा, खट्टे ट्विस्ट के साथ।',
      legend: 'Juice Monster Bad Apple Monster रूप में वर्जित सेब है। मीठा, खट्टा और धमाकेदार।',
    },
    juiceKhaotic: {
      name: 'Juice Monster Khaotic',
      description: 'ट्रॉपिकल स्वादों का अराजक मिश्रण। 50% फ्रूट जूस, आम और संतरे के साथ।',
      legend:
        'Juice Monster Khaotic पूरी Monster एनर्जी के साथ ट्रॉपिकल स्वादों का अराजक धमाका है।',
    },
    ultraViolet: {
      name: 'Monster Ultra Violet',
      description:
        'बैंगनी अंगूर का स्वाद। ज़ीरो शुगर, ज़ीरो कैलोरी। मीठा, फ्रूटी और Ultra टच के साथ।',
      legend:
        'Monster Ultra Violet सबसे मीठे अंगूर का स्वाद Ultra वर्ज़न में कैप्चर करता है – बिना शुगर और कैलोरी।',
    },
    ultraRosa: {
      name: 'Monster Ultra Rosa',
      description:
        'पिंक ग्रेपफ्रूट फ्लेवर। ज़ीरो शुगर, ज़ीरो कैलोरी। सिट्रसी, ताज़ा और Ultra टच के साथ।',
      legend:
        'Monster Ultra Rosa पिंक ग्रेपफ्रूट के स्वाद को Ultra फ़ॉर्मूला के साथ जोड़ता है – ज़ीरो शुगर, ज़ीरो कैलोरी।',
    },
    ultraWatermelon: {
      name: 'Monster Ultra Watermelon',
      description:
        'ताज़ा तरबूज़ का स्वाद। ज़ीरो शुगर, ज़ीरो कैलोरी। मीठा, ताज़ा और गर्मियों के लिए परफ़ेक्ट।',
      legend:
        'Monster Ultra Watermelon Ultra वर्ज़न में सबसे मीठा तरबूज़ है। ज़ीरो शुगर, ज़ीरो कैलोरी।',
    },
    ultraStrawberryDreams: {
      name: 'Monster Ultra Strawberry Dreams',
      description:
        'सपनों जैसा स्ट्रॉबेरी फ्लेवर। ज़ीरो शुगर, ज़ीरो कैलोरी। मीठा, क्रीमी और Ultra टच के साथ।',
      legend:
        'Monster Ultra Strawberry Dreams आपको Ultra फ़ॉर्मूला के साथ स्ट्रॉबेरी के सपने में ले जाता है।',
    },
    ultraFiestaMango: {
      name: 'Monster Ultra Fiesta Mango',
      description:
        'उत्सवी आम का स्वाद। ज़ीरो शुगर, ज़ीरो कैलोरी। ट्रॉपिकल, मीठा और Ultra टच के साथ।',
      legend: 'Monster Ultra Fiesta Mango बिना शुगर और कैलोरी के Ultra वर्ज़न में आम का उत्सव है।',
    },
  },
} as const;

export default hi;
