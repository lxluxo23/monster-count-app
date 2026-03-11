const de = {
  tabs: {
    home: 'Start',
    history: 'Verlauf',
    community: 'Community',
    profile: 'Profil',
    homeTitle: 'Monster Counter',
  },
  home: {
    heroTitle: 'Welchen hast du getrunken?',
    heroSubtitle: 'Erfasse jeden Monster, den du trinkst',
    today: 'Heute',
    total: 'Gesamt',
    selectMonster: 'Wähle deinen Monster',
    dailyGoal: 'Tagesziel',
    dailyGoalDone: 'Ziel erreicht!',
    longPressHint: 'Lange drücken für Nährwertinfos',
    caffeineWarning: 'Du hast heute die empfohlenen 400 mg Koffein überschritten',
    caffeineDismiss: 'Schließen',
    weeklySummary: 'Wochenübersicht',
    weeklyCompare: '{{change}} vs letzte Woche',
    weeklyCans: '{{count}} Dosen',
    weeklyCaffeine: '{{amount}} mg Koffein',
  },
  history: {
    loading: 'Laden…',
    emptyTitle: 'Noch keine Monsters im Verlauf.',
    emptySubtitle: 'Füge einen über den Start-Tab hinzu.',
    filterAll: 'Alle',
    records_one: '{{count}} Eintrag',
    records_other: '{{count}} Einträge',
    deleteTitle: 'Eintrag löschen',
    deleteMessage: '{{name}} löschen?',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    today: 'Heute',
    emptyFilter: 'Keine Einträge für diese Geschmacksrichtung',
  },
  profile: {
    greeting: 'Hey, {{name}}!',
    syncActive: 'Synchronisierung aktiv ☁️',
    syncInactive: 'Deine Monster-Übersicht',
    authBannerTitle: 'Synchronisierung aktivieren',
    authBannerSub: 'Mit Google anmelden, um in der Cloud zu speichern',
    googleBtn: 'Google',
    totalLabel: 'Dosen gesamt',
    todayLabel: 'Heute',
    streak_one: '{{count}} Tag in Folge',
    streak_other: '{{count}} Tage in Folge',
    streakLabel: 'Aktive Serie · weiter so!',
    favoriteLabel: 'Dein Favorit',
    favoriteUnit: '{{count}} Mal',
    menuTitle: 'Optionen',
    menuGroupAccount: 'KONTO',
    menuGroupApp: 'APP',
    editName: 'Mein Profil',
    statsDetail: 'Detaillierte Statistiken',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    logoutTitle: 'Abmelden',
    logoutMsg: 'Bist du sicher? Deine lokalen Daten bleiben erhalten.',
    logoutCancel: 'Abbrechen',
    logoutConfirm: 'Abmelden',
    editModalTitle: 'Name bearbeiten',
    editPlaceholder: 'Gib deinen Namen ein',
    editCancel: 'Abbrechen',
    editSave: 'Speichern',
    footer: 'Monster Counter · v1.7.2',
  },
  publicProfile: {
    title: 'Profil',
    statsPrivate: 'Dieser Benutzer hat seine Statistiken ausgeblendet',
    achievementsPrivate: 'Dieser Benutzer hat seine Erfolge ausgeblendet',
    loginRequired: 'Melde dich an, um Profile anderer Benutzer zu sehen',
  },
  comunidad: {
    achievementsTitle: 'Erfolge',
    unlocked: '{{count}} von {{total}} freigeschaltet',
    communityTitle: 'Community',
    communityTotal: 'Dosen insgesamt erfasst',
    error: 'Community-Daten konnten nicht geladen werden',
    flavorRanking: 'Beliebteste Geschmacksrichtungen',
    topDrinkers: 'Top-Trinker',
    flavorRequests: 'Geschmacksanfragen',
    requestNewFlavor: 'Geschmack anfragen',
    requestName: 'Name der Geschmacksrichtung',
    requestNamePlaceholder: 'Z.B.: Monster Ultra Rosa',
    requestDescription: 'Beschreibung (optional)',
    requestDescriptionPlaceholder: 'Warum möchtest du diese Geschmacksrichtung?',
    requestPhoto: 'Foto anhängen (optional)',
    requestPhotoChange: 'Foto ändern',
    removePhoto: 'Entfernen',
    requestSubmit: 'Anfrage senden',
    requestBy: 'von {{name}}',
    requestLoginToVote: 'Melde dich an, um abzustimmen',
    requestLoginToSubmit: 'Melde dich an, um Geschmacksrichtungen anzufragen',
    requestEmpty: 'Noch keine Anfragen. Sei der Erste!',
    requestVote_one: '{{count}} Stimme',
    requestVote_other: '{{count}} Stimmen',
    requestPhotoCamera: 'Foto aufnehmen',
    requestPhotoGallery: 'Aus Galerie wählen',
    requestDeleteTitle: 'Anfrage löschen',
    requestDeleteMsg: '"{{name}}" löschen?',
    requestDelete: 'Löschen',
    requestErrorTitle: 'Fehler beim Senden',
    requestErrorGeneric: 'Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.',
    photoPending: 'Ausstehend',
    approvePhoto: 'Genehmigen',
  },
  stats: {
    title: 'Statistiken',
    totalCans: 'Dosen gesamt',
    verifiedCans: 'Verifiziert (Kamera)',
    activeDays: 'Aktive Tage',
    avgPerDay: 'Ø / Tag',
    avgPerWeek: 'Ø / Woche',
    last7Days: 'Letzte 7 Tage',
    hourOfDay: 'Tageszeit',
    monthlyTrend: 'Monatlicher Trend',
    personalRecord: 'Persönlicher Rekord',
    cansInDay: 'Dosen an einem Tag · {{date}}',
    startTracking: 'Beginne zu erfassen, um deinen Rekord zu sehen',
    byFlavor: 'Nach Geschmacksrichtung',
    noData: 'Noch keine Daten',
    earlyMorning: 'Früher Morgen',
    morning: 'Morgen',
    afternoon: 'Nachmittag',
    night: 'Nacht',
    days: { '0': 'So', '1': 'Mo', '2': 'Di', '3': 'Mi', '4': 'Do', '5': 'Fr', '6': 'Sa' },
    months: {
      '0': 'Jan',
      '1': 'Feb',
      '2': 'Mär',
      '3': 'Apr',
      '4': 'Mai',
      '5': 'Jun',
      '6': 'Jul',
      '7': 'Aug',
      '8': 'Sep',
      '9': 'Okt',
      '10': 'Nov',
      '11': 'Dez',
    },
  },
  settings: {
    title: 'Einstellungen',
    dailyGoalSection: 'TAGESZIEL',
    dailyGoal: 'Tägliches Dosenziel',
    dailyGoalDesc: 'Zeigt einen Fortschrittsbalken auf dem Startbildschirm. 0 = aus.',
    dailyGoalOff: 'Aus',
    notificationsSection: 'BENACHRICHTIGUNGEN',
    dailyReminder: 'Tägliche Erinnerung',
    reminderTime: 'Erinnerungszeit',
    privacySection: 'DATENSCHUTZ',
    showInRanking: 'Im globalen Ranking erscheinen',
    showInRankingDesc: 'Dein Name erscheint bei den Top-Trinkern der Community',
    showAchievements: 'Meine Erfolge anzeigen',
    showAchievementsDesc:
      'Andere Benutzer können deine freigeschalteten Erfolge in deinem Profil sehen',
    showStats: 'Meine Statistiken anzeigen',
    showStatsDesc:
      'Andere Benutzer können dein Gesamt, deine Serie und deinen Favoriten in deinem Profil sehen',
    appearanceSection: 'DARSTELLUNG',
    darkMode: 'Dunkel',
    lightMode: 'Hell',
    systemMode: 'System',
    languageSection: 'SPRACHE',
    languageAuto: 'Auto',
    weeklySummary: 'Wochenübersicht',
    weeklySummaryDesc: 'Erhalte jeden Montag eine Zusammenfassung',
    audioSection: 'AUDIO MOOD',
    audioMood: 'Musik beim Öffnen der Details',
    audioMoodDesc: 'Spielt eine Song-Vorschau beim Öffnen der Monster-Details ab.',
    audioVolume: 'Lautstärke',
    aboutSection: 'ÜBER',
    appName: 'Monster Counter',
    version: 'Version 1.7.2',
    copyright: 'App zur Erfassung deiner Monster Energy Dosen.\n© 2026',
  },
  detail: {
    legend: 'DIE LEGENDE',
    nutritionTitle: 'NÄHRWERTANGABEN · {{volume}} ml',
    calories: 'Kalorien',
    caffeine: 'Koffein',
    sugar: 'Zucker',
    sodium: 'Natrium',
    disclaimer: '⚠️ Empfohlenes Maximum: 400 mg Koffein pro Tag für gesunde Erwachsene.',
  },
  achievements: {
    firstCan: {
      title: 'Erste Dose',
      desc: 'Erfasse deine erste Monster-Dose',
    },
    tenCans: {
      title: '10 Dosen',
      desc: 'Sammle 10 erfasste Dosen',
    },
    fiftyCans: {
      title: '50 Dosen',
      desc: 'Sammle 50 erfasste Dosen',
    },
    hundredCans: {
      title: '100 Dosen',
      desc: 'Sammle 100 erfasste Dosen',
    },
    streak7: {
      title: '7-Tage-Serie',
      desc: '7 aufeinanderfolgende Tage mit mindestens einem Monster',
    },
    streak30: {
      title: '30-Tage-Serie',
      desc: '30 aufeinanderfolgende Tage mit mindestens einem Monster',
    },
    collector: {
      title: 'Sammler',
      desc: 'Probiere alle {{count}} Monster-Geschmacksrichtungen',
    },
    earlyBird: {
      title: 'Frühaufsteher',
      desc: 'Erfasse einen Monster vor 8:00 Uhr',
    },
    withYourNoctulo: {
      title: 'Nachteule',
      desc: 'Erfasse einen Monster nach 23:00 Uhr',
    },
  },
  scanner: {
    title: 'Barcode scannen',
    hint: 'Richte die Kamera auf den Barcode der Dose',
    permissionNeeded: 'Kameraberechtigung zum Scannen benötigt',
    grantPermission: 'Berechtigung erteilen',
    unknownTitle: 'Unbekannter Code',
    unknownMessage: 'Code {{code}} ist nicht in der Datenbank. Manuell hinzufügen?',
    addManually: 'Manuell hinzufügen',
    adding: 'Wird erfasst…',
    rescan: 'Erneut scannen',
    registered: 'Erfasst!',
  },
  rateLimit: {
    title: 'Limit erreicht',
    exceeded: 'Warte {{minutes}} Min. bevor du eine weitere Dose erfasst.',
  },
  notification: {
    title: 'Monster Counter',
    body: 'Hast du deinen Monster heute schon erfasst? 🥤',
  },
  monsters: {
    ultraZeroWhite: {
      name: 'Monster Ultra Zero White',
      description:
        'Kein Zucker, keine Kalorien. Milder Geschmack mit Zitrusnoten und einem ultra-sauberen Abgang. Der Favorit für alle, die auf ihre Figur achten, ohne auf Energie zu verzichten.',
      legend:
        'Manche Menschen sind einfach nicht zufrieden zu stellen. Sobald sie bekommen, was sie wollen, suchen sie neue Herausforderungen. Unsere Rider und Monster Girls sind da nicht anders... sie haben schon eine Weile Hinweise fallen lassen. Sie wollten einen neuen Monster. Etwas weniger süß, leichter, null Kalorien, aber mit der vollen Power unserer Monster Energy Mischung. Weiß ist das neue Schwarz. Wir haben es uns schwer gemacht: Monster Energy Zero Ultra.',
    },
    originalGreen: {
      name: 'Monster Original Green OG',
      description:
        'Der ursprüngliche Klassiker. Intensiver und süßer Geschmack mit der Energieformel, die 2002 alles begann. Eine Dose, ein Vermächtnis.',
      legend:
        'Reiß eine Dose des härtesten Energy-Drinks auf dem Planeten auf: Monster Energy. Es geht geschmeidig runter, mit einem leicht süßen Geschmack. Die perfekte Kombination der richtigen Zutaten in den richtigen Verhältnissen, um dir den Monster-Kick zu geben. Unleash the Beast!',
    },
    ultraBlueHawaiian: {
      name: 'Monster Ultra Blue Hawaiian',
      description:
        'Tropischer Ananas- und Maracuja-Geschmack. Kein Zucker, keine Kalorien. Versetzt dich mit jedem Schluck direkt an die Strände von Hawaii.',
      legend:
        'Ob du im Beast-Modus bist, im Urlaubsmodus oder einfach nur im Inselstil chillst – Ultra Blue Hawaiian feuert dich an, dein Bestes zu geben. Leicht, erfrischend und sehr leicht trinkbar, mit einem tropischen Tiki-Twist. Blue Hawaiian ist eine brutale Kombination aus exotischen polynesischen Fruchtaromen mit großem Geschmack aber null Zucker.',
    },
    classicZeroSugar: {
      name: 'Monster Energy Classic Zero Sugar',
      description:
        'Der Geschmack des Original Monster, aber ohne Zucker und Kalorien. Das Beste aus beiden Welten für alle, die nicht auf den Klassiker verzichten wollen.',
      legend:
        'Monster Zero Sugar hat die ideale Kombination der richtigen Zutaten in den exakten Verhältnissen, um dir genau den Schub zu geben, den du brauchst – mit dem gleichen OG-Geschmack, aber Zero Zucker. Bekämpfe Müdigkeit mit Koffein und verbessere geistige Leistung und Konzentration. Der ganze Monster, keiner vom Zucker.',
    },
    mangoLoco: {
      name: 'Juice Monster Mango Loco',
      description:
        '50% tropischer Fruchtsaft mit Mango und Lulo. Süß, fruchtig und explosiv. Für alle, die etwas Natürlicheres und Saftigeres bevorzugen.',
      legend:
        'Am Vorabend des 31. Oktober versammeln sich jedes Jahr Freunde und Familie, um den Día de los Muertos zu feiern. Ringelblumen, Mystik und Erinnerungen, kombiniert mit Essen und Trinken, laden die Geister der Verstorbenen ein, sich der Fiesta anzuschließen. Mango Loco ist eine himmlische Mischung exotischer Säfte, die selbst den hartnäckigsten Geist anziehen kann. Wirklich verrückter Geschmack, mit genau der richtigen Monster-Magie, um die Party tagelang am Laufen zu halten.',
    },
    aussieLemonade: {
      name: 'Monster Energy Aussie Lemonade',
      description:
        'Erfrischender australischer Limonaden-Geschmack. Kein Zucker, keine Kalorien. Zitrusfrisch, lebendig und mit der vollen Monster-Energie. Perfekt für den Sommer.',
      legend:
        'Inspiriert vom Land am anderen Ende der Welt, mit über 10.000 Stränden, dem Great Barrier Reef und den exotischsten Zitrusfrüchten des Planeten, haben wir Aussie Style Lemonade kreiert. Die Monster-Version der klassischen Limonade: Wir fanden die perfekte Balance zwischen sauer und süß mit einem Schuss frischer Zitrus. Wie immer geladen mit unserer weltberühmten Monster Energy Mischung. Knack eine eiskalte auf und gib Gas. Unleash the Beast!',
    },
    ultraPeachyKeen: {
      name: 'Monster Ultra Peachy Keen',
      description:
        'Süßer, natürlicher Pfirsichgeschmack. Kein Zucker, keine Kalorien. Erfrischend und saftig, perfekt für Pfirsichliebhaber.',
      legend:
        'Monster Ultra Peachy Keen kombiniert den süßen Geschmack von reifem Pfirsich mit der Ultra-Formel – kein Zucker, keine Kalorien. Leicht, frisch und leicht trinkbar.',
    },
    ultraParadise: {
      name: 'Monster Ultra Paradise',
      description:
        'Tropischer Kiwi- und Erdbeergeschmack. Kein Zucker, keine Kalorien. Grün, lebendig und erfrischend wie ein Paradies in der Dose.',
      legend:
        'Monster Ultra Paradise nimmt dich mit in ein tropisches Paradies mit seiner Kiwi-Erdbeere-Kombination. Kein Zucker, keine Kalorien, volle Monster-Energie.',
    },
    ultraGoldenPineapple: {
      name: 'Monster Ultra Golden Pineapple',
      description:
        'Goldener tropischer Ananasgeschmack. Kein Zucker, keine Kalorien. Süß, tropisch und mit dem Monster Ultra Touch.',
      legend:
        'Monster Ultra Golden Pineapple fängt den Geschmack der süßesten Ananas in einer Ultra-Version ohne Zucker und Kalorien ein.',
    },
    juiceRipper: {
      name: 'Juice Monster Ripper',
      description:
        '50% Fruchtsaft mit Mango, Orange und Maracuja. Süß, tropisch und explosiv. Die Juice-Linie in ihrer besten Form.',
      legend:
        'Juice Monster Ripper kombiniert exotische tropische Säfte mit Monster-Energie. Ein verrückter Geschmack, der dich direkt in die Tropen versetzt.',
    },
    juicePipelinePunch: {
      name: 'Juice Monster Pipeline Punch',
      description:
        'Tropische Fruchtmischung mit Guave, Orange und Maracuja. Süß, fruchtig und mit 50% echtem Fruchtsaft.',
      legend:
        'Juice Monster Pipeline Punch ist eine Explosion tropischer Aromen. Guave, Orange und Maracuja in jedem Schluck, mit voller Monster-Energie.',
    },
    juicePacificPunch: {
      name: 'Juice Monster Pacific Punch',
      description: 'Tropische Fruchtmischung aus dem Pazifik. 50% Fruchtsaft, süß und erfrischend.',
      legend:
        'Juice Monster Pacific Punch kombiniert tropische Geschmacksrichtungen des Pazifiks mit Monster-Energie.',
    },
    juiceBadApple: {
      name: 'Juice Monster Bad Apple',
      description:
        'Säuerlicher grüner Apfelgeschmack. 50% Fruchtsaft, süß und erfrischend mit einer sauren Note.',
      legend:
        'Juice Monster Bad Apple ist der verbotene Apfel in Monster-Form. Süß, sauer und explosiv.',
    },
    juiceKhaotic: {
      name: 'Juice Monster Khaotic',
      description:
        'Chaotische Mischung tropischer Geschmacksrichtungen. 50% Fruchtsaft mit Mango und Orange.',
      legend:
        'Juice Monster Khaotic ist eine chaotische Explosion tropischer Aromen mit voller Monster-Energie.',
    },
    ultraViolet: {
      name: 'Monster Ultra Violet',
      description:
        'Violetter Traubengeschmack. Kein Zucker, keine Kalorien. Süß, fruchtig und mit dem Ultra-Touch.',
      legend:
        'Monster Ultra Violet fängt den süßesten Traubengeschmack in der Ultra-Version ohne Zucker und Kalorien ein.',
    },
    ultraRosa: {
      name: 'Monster Ultra Rosa',
      description:
        'Pink-Grapefruit-Geschmack. Kein Zucker, keine Kalorien. Zitrusfrisch, erfrischend und mit dem Ultra-Touch.',
      legend:
        'Monster Ultra Rosa kombiniert den Geschmack von Pink Grapefruit mit der Ultra-Formel – kein Zucker, keine Kalorien.',
    },
    ultraWatermelon: {
      name: 'Monster Ultra Watermelon',
      description:
        'Frischer Wassermelonengeschmack. Kein Zucker, keine Kalorien. Süß, erfrischend und perfekt für den Sommer.',
      legend:
        'Monster Ultra Watermelon ist die süßeste Wassermelone in Ultra-Version. Kein Zucker, keine Kalorien.',
    },
    ultraStrawberryDreams: {
      name: 'Monster Ultra Strawberry Dreams',
      description:
        'Traumhafter Erdbeergeschmack. Kein Zucker, keine Kalorien. Süß, cremig und mit dem Ultra-Touch.',
      legend:
        'Monster Ultra Strawberry Dreams versetzt dich in einen Erdbeertraum mit der Ultra-Formel.',
    },
    ultraFiestaMango: {
      name: 'Monster Ultra Fiesta Mango',
      description:
        'Festlicher Mangogeschmack. Kein Zucker, keine Kalorien. Tropisch, süß und mit dem Ultra-Touch.',
      legend:
        'Monster Ultra Fiesta Mango ist eine Mango-Fiesta in Ultra-Version ohne Zucker und Kalorien.',
    },
  },
} as const;

export default de;
