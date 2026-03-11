const hr = {
  tabs: {
    home: 'Početna',
    history: 'Povijest',
    community: 'Zajednica',
    profile: 'Profil',
    homeTitle: 'Monster Counter',
  },
  home: {
    heroTitle: 'Koji si popio?',
    heroSubtitle: 'Bilježi svaki Monster koji popiješ',
    today: 'Danas',
    total: 'Ukupno',
    selectMonster: 'Odaberi svog Monstera',
    dailyGoal: 'Današnji cilj',
    dailyGoalDone: 'Cilj postignut!',
    longPressHint: 'Dugi pritisak za nutritivne informacije',
    caffeineWarning: 'Danas si premašio preporučenih 400 mg kofeina',
    caffeineDismiss: 'Zatvori',
    weeklySummary: 'Tjedni pregled',
    weeklyCompare: '{{change}} vs prošli tjedan',
    weeklyCans: '{{count}} limenki',
    weeklyCaffeine: '{{amount}} mg kofeina',
  },
  history: {
    loading: 'Učitavanje…',
    emptyTitle: 'Još nema Monstera u povijesti.',
    emptySubtitle: 'Dodaj jednog s kartice Početna.',
    filterAll: 'Svi',
    records_one: '{{count}} unos',
    records_other: '{{count}} unosa',
    deleteTitle: 'Obriši unos',
    deleteMessage: 'Obrisati {{name}}?',
    cancel: 'Odustani',
    delete: 'Obriši',
    today: 'Danas',
    emptyFilter: 'Nema unosa za ovaj okus',
  },
  profile: {
    greeting: 'Hej, {{name}}!',
    syncActive: 'Sinkronizacija aktivna ☁️',
    syncInactive: 'Tvoj Monster pregled',
    authBannerTitle: 'Uključi sinkronizaciju',
    authBannerSub: 'Prijavi se s Googleom za spremanje u oblak',
    googleBtn: 'Google',
    totalLabel: 'Ukupno limenki',
    todayLabel: 'Danas',
    streak_one: '{{count}} dan zaredom',
    streak_other: '{{count}} dana zaredom',
    streakLabel: 'Aktivni niz · nastavi tako!',
    favoriteLabel: 'Tvoj favorit',
    favoriteUnit: '{{count}} puta',
    menuTitle: 'Opcije',
    menuGroupAccount: 'RAČUN',
    menuGroupApp: 'APLIKACIJA',
    editName: 'Moj profil',
    statsDetail: 'Detaljne statistike',
    settings: 'Postavke',
    logout: 'Odjavi se',
    logoutTitle: 'Odjavi se',
    logoutMsg: 'Jesi li siguran? Tvoji lokalni podaci će biti sačuvani.',
    logoutCancel: 'Odustani',
    logoutConfirm: 'Odjavi se',
    editModalTitle: 'Uredi ime',
    editPlaceholder: 'Unesi svoje ime',
    editCancel: 'Odustani',
    editSave: 'Spremi',
    footer: 'Monster Counter · v1.7.2',
  },
  publicProfile: {
    title: 'Profil',
    statsPrivate: 'Ovaj korisnik je sakrio svoje statistike',
    achievementsPrivate: 'Ovaj korisnik je sakrio svoja postignuća',
    loginRequired: 'Prijavi se za pregled profila drugih korisnika',
  },
  comunidad: {
    achievementsTitle: 'Postignuća',
    unlocked: '{{count}} od {{total}} otključano',
    communityTitle: 'Zajednica',
    communityTotal: 'limenki zabilježeno ukupno',
    error: 'Nije moguće učitati podatke zajednice',
    flavorRanking: 'Najpopularniji okusi',
    topDrinkers: 'Top konzumenti',
    flavorRequests: 'Zahtjevi za okuse',
    requestNewFlavor: 'Zatraži okus',
    requestName: 'Naziv okusa',
    requestNamePlaceholder: 'Npr.: Monster Ultra Rosa',
    requestDescription: 'Opis (neobavezno)',
    requestDescriptionPlaceholder: 'Zašto želiš ovaj okus?',
    requestPhoto: 'Priloži fotografiju (neobavezno)',
    requestPhotoChange: 'Promijeni fotografiju',
    removePhoto: 'Ukloni',
    requestSubmit: 'Pošalji zahtjev',
    requestBy: 'od {{name}}',
    requestLoginToVote: 'Prijavi se za glasanje',
    requestLoginToSubmit: 'Prijavi se za zahtjeve okusa',
    requestEmpty: 'Još nema zahtjeva. Budi prvi!',
    requestVote_one: '{{count}} glas',
    requestVote_other: '{{count}} glasova',
    requestPhotoCamera: 'Snimi fotografiju',
    requestPhotoGallery: 'Odaberi iz galerije',
    requestDeleteTitle: 'Obriši zahtjev',
    requestDeleteMsg: 'Obrisati "{{name}}"?',
    requestDelete: 'Obriši',
    requestErrorTitle: 'Greška pri slanju',
    requestErrorGeneric: 'Nije moguće poslati zahtjev. Pokušaj ponovno.',
    photoPending: 'Na čekanju',
    approvePhoto: 'Odobri',
  },
  stats: {
    title: 'Statistike',
    totalCans: 'Ukupno limenki',
    verifiedCans: 'Verificirano (kamera)',
    activeDays: 'Aktivni dani',
    avgPerDay: 'Prosj. / dan',
    avgPerWeek: 'Prosj. / tjedan',
    last7Days: 'Zadnjih 7 dana',
    hourOfDay: 'Doba dana',
    monthlyTrend: 'Mjesečni trend',
    personalRecord: 'Osobni rekord',
    cansInDay: 'limenki u danu · {{date}}',
    startTracking: 'Počni bilježiti da vidiš svoj rekord',
    byFlavor: 'Po okusu',
    noData: 'Još nema podataka',
    earlyMorning: 'Rano jutro',
    morning: 'Jutro',
    afternoon: 'Popodne',
    night: 'Noć',
    days: { '0': 'Ned', '1': 'Pon', '2': 'Uto', '3': 'Sri', '4': 'Čet', '5': 'Pet', '6': 'Sub' },
    months: {
      '0': 'Sij',
      '1': 'Velj',
      '2': 'Ožu',
      '3': 'Tra',
      '4': 'Svi',
      '5': 'Lip',
      '6': 'Srp',
      '7': 'Kol',
      '8': 'Ruj',
      '9': 'Lis',
      '10': 'Stu',
      '11': 'Pro',
    },
  },
  settings: {
    title: 'Postavke',
    dailyGoalSection: 'DNEVNI CILJ',
    dailyGoal: 'Dnevni cilj limenki',
    dailyGoalDesc: 'Prikazuje traku napretka na Početnoj. 0 = isključeno.',
    dailyGoalOff: 'Isključeno',
    notificationsSection: 'OBAVIJESTI',
    dailyReminder: 'Dnevni podsjetnik',
    reminderTime: 'Vrijeme podsjetnika',
    privacySection: 'PRIVATNOST',
    showInRanking: 'Prikaži u globalnom rangiranju',
    showInRankingDesc: 'Tvoje ime se pojavljuje u Top konzumentima zajednice',
    showAchievements: 'Prikaži moja postignuća',
    showAchievementsDesc:
      'Drugi korisnici mogu vidjeti tvoja otključana postignuća na tvom profilu',
    showStats: 'Prikaži moje statistike',
    showStatsDesc: 'Drugi korisnici mogu vidjeti tvoj ukupni broj, niz i favorit na tvom profilu',
    appearanceSection: 'IZGLED',
    darkMode: 'Tamno',
    lightMode: 'Svijetlo',
    systemMode: 'Sustav',
    languageSection: 'JEZIK',
    languageAuto: 'Auto',
    weeklySummary: 'Tjedni pregled',
    weeklySummaryDesc: 'Primi pregled svakog ponedjeljka',
    audioSection: 'AUDIO MOOD',
    audioMood: 'Glazba pri otvaranju detalja',
    audioMoodDesc: 'Reproducira isječak pjesme pri otvaranju detalja Monstera.',
    audioVolume: 'Glasnoća',
    aboutSection: 'O APLIKACIJI',
    appName: 'Monster Counter',
    version: 'Verzija 1.7.2',
    copyright: 'Aplikacija za praćenje tvojih limenki Monster Energy.\n© 2026',
  },
  detail: {
    legend: 'LEGENDA',
    nutritionTitle: 'NUTRITIVNE INFORMACIJE · {{volume}} ml',
    calories: 'Kalorije',
    caffeine: 'Kofein',
    sugar: 'Šećer',
    sodium: 'Natrij',
    disclaimer: '⚠️ Preporučeni maksimum: 400 mg kofeina dnevno za zdrave odrasle osobe.',
  },
  achievements: {
    firstCan: {
      title: 'Prva limenka',
      desc: 'Zabilježi svoju prvu limenku Monstera',
    },
    tenCans: {
      title: '10 limenki',
      desc: 'Skupi 10 zabilježenih limenki',
    },
    fiftyCans: {
      title: '50 limenki',
      desc: 'Skupi 50 zabilježenih limenki',
    },
    hundredCans: {
      title: '100 limenki',
      desc: 'Skupi 100 zabilježenih limenki',
    },
    streak7: {
      title: 'Niz od 7 dana',
      desc: '7 uzastopnih dana s barem jednim Monsterom',
    },
    streak30: {
      title: 'Niz od 30 dana',
      desc: '30 uzastopnih dana s barem jednim Monsterom',
    },
    collector: {
      title: 'Kolekcionar',
      desc: 'Isprobaj svih {{count}} okusa Monstera',
    },
    earlyBird: {
      title: 'Ranoranilac',
      desc: 'Zabilježi Monstera prije 8:00',
    },
    withYourNoctulo: {
      title: 'Noćna ptica',
      desc: 'Zabilježi Monstera nakon 23:00',
    },
  },
  scanner: {
    title: 'Skeniraj barkod',
    hint: 'Usmjeri kameru na barkod limenke',
    permissionNeeded: 'Potrebna dozvola kamere za skeniranje',
    grantPermission: 'Daj dozvolu',
    unknownTitle: 'Nepoznati kod',
    unknownMessage: 'Kod {{code}} nije u bazi podataka. Dodati ručno?',
    addManually: 'Dodaj ručno',
    adding: 'Bilježenje…',
    rescan: 'Skeniraj ponovno',
    registered: 'Zabilježeno!',
  },
  rateLimit: {
    title: 'Dosegnut limit',
    exceeded: 'Pričekaj {{minutes}} min prije bilježenja sljedeće limenke.',
  },
  notification: {
    title: 'Monster Counter',
    body: 'Jesi li danas zabilježio svog Monstera? 🥤',
  },
  monsters: {
    ultraZeroWhite: {
      name: 'Monster Ultra Zero White',
      description:
        'Nula šećera, nula kalorija. Nježan okus s citrusnim notama i ultra čistim završetkom. Favorit onih koji paze na liniju bez žrtvovanja energije.',
      legend:
        'Neke ljude je nemoguće zadovoljiti. Čim dobiju što žele, traže nove izazove. Naši rideri i Monster Girls nisu drugačiji... već neko vrijeme su nam davali naznake. Tražili su novog Monstera. Nešto manje slatko, lakše, nula kalorija, ali s punom snagom naše Monster energetske mješavine. Bijela je nova crna. Otežali smo si: Monster Energy Zero Ultra.',
    },
    originalGreen: {
      name: 'Monster Original Green OG',
      description:
        'Originalni klasik. Intenzivan i sladak okus s energetskom formulom koja je sve započela 2002. Jedna limenka, jedna ostavština.',
      legend:
        'Otvori limenku najžešćeg energetskog pića na planetu: Monster Energy. Glatko klizi, s blago slatkim okusom. Idealna kombinacija pravih sastojaka u pravim omjerima da ti da taj Monster udarac. Unleash the Beast!',
    },
    ultraBlueHawaiian: {
      name: 'Monster Ultra Blue Hawaiian',
      description:
        'Tropski okus ananasa i marakuje. Nula šećera, nula kalorija. Prenosi te ravno na havajske plaže sa svakim gutljajem.',
      legend:
        'Bilo da si u beast modu, na odmoru ili se samo opuštaš na otočki način – Ultra Blue Hawaiian će te zapaliti da daš sve od sebe. Lagan, osvježavajući i vrlo lak za piće, s tropskim tiki twistom. Blue Hawaiian je brutalna kombinacija egzotičnih polinezijskih voćnih okusa s velikim okusom, ali nula šećera.',
    },
    classicZeroSugar: {
      name: 'Monster Energy Classic Zero Sugar',
      description:
        'Okus originalnog Monstera, ali bez šećera i kalorija. Najbolje iz oba svijeta za one koji ne žele odustati od klasika.',
      legend:
        'Monster Zero Sugar ima idealnu kombinaciju pravih sastojaka u točnim omjerima da ti da upravo onaj poticaj koji trebaš – s istim OG okusom, ali Zero Šećera. Bori se protiv umora kofeinom i poboljšaj mentalnu izvedbu i koncentraciju. Sav Monster, ništa šećera.',
    },
    mangoLoco: {
      name: 'Juice Monster Mango Loco',
      description:
        '50% tropskog voćnog soka s mangom i lulom. Sladak, voćan i eksplozivan. Za one koji preferiraju nešto prirodnije i sočnije.',
      legend:
        'U predvečerje 31. listopada svake godine, prijatelji i obitelj se okupljaju da proslave Día de los Muertos. Neveni, misticizam i sjećanja, kombinirani s hranom i pićem, pozivaju duhove preminulih da se pridruže fešti. Mango Loco je nebeska mješavina egzotičnih sokova sposobna privući čak i najtvrdoglavijeg duha. Istinski ludi okus, s upravo pravom količinom Monster magije da zabava traje danima.',
    },
    aussieLemonade: {
      name: 'Monster Energy Aussie Lemonade',
      description:
        'Osvježavajući okus australske limunade. Nula šećera, nula kalorija. Citrusi, živahan i s punom Monster energijom. Savršen za ljeto.',
      legend:
        'Inspirirani zemljom s druge strane svijeta, s više od 10.000 plaža, Velikim koraljnim grebenima i najegzotičnijim citrusima na planetu, stvorili smo Aussie Style Lemonade. Monster verzija klasične limunade: pronašli smo savršenu ravnotežu između kiselog i slatkog s eksplozijom svježeg citrusa. Kao i uvijek, napunjena našom svjetski poznatom Monster energetskom mješavinom. Otvori jednu ledeno hladnu i daj gas. Unleash the Beast!',
    },
    ultraPeachyKeen: {
      name: 'Monster Ultra Peachy Keen',
      description:
        'Sladak, prirodan okus breskve. Nula šećera, nula kalorija. Osvježavajući i sočan, savršen za ljubitelje breskvi.',
      legend:
        'Monster Ultra Peachy Keen kombinira sladak okus zrele breskve s Ultra formulom – nula šećera, nula kalorija. Lagan, svjež i lak za piće.',
    },
    ultraParadise: {
      name: 'Monster Ultra Paradise',
      description:
        'Tropski okus kivija i jagode. Nula šećera, nula kalorija. Zelen, živahan i osvježavajući poput raja u limenci.',
      legend:
        'Monster Ultra Paradise vodi te u tropski raj svojom kombinacijom kivija i jagode. Nula šećera, nula kalorija, puna Monster energija.',
    },
    ultraGoldenPineapple: {
      name: 'Monster Ultra Golden Pineapple',
      description:
        'Zlatni tropski okus ananasa. Nula šećera, nula kalorija. Sladak, tropski i s Monster Ultra dodirom.',
      legend:
        'Monster Ultra Golden Pineapple hvata okus najslađeg ananasa u Ultra verziji bez šećera i kalorija.',
    },
    juiceRipper: {
      name: 'Juice Monster Ripper',
      description:
        '50% voćnog soka s mangom, narančom i marakujom. Sladak, tropski i eksplozivan. Juice linija u svom najboljem izdanju.',
      legend:
        'Juice Monster Ripper kombinira egzotične tropske sokove s Monster energijom. Ludi okus koji te prenosi ravno u tropske krajeve.',
    },
    juicePipelinePunch: {
      name: 'Juice Monster Pipeline Punch',
      description:
        'Tropska mješavina voća s guavom, narančom i marakujom. Sladak, voćan i s 50% pravog voćnog soka.',
      legend:
        'Juice Monster Pipeline Punch je eksplozija tropskih okusa. Guava, naranča i marakuja u svakom gutljaju, s punom Monster energijom.',
    },
    juicePacificPunch: {
      name: 'Juice Monster Pacific Punch',
      description: 'Tropska mješavina voća Pacifika. 50% voćnog soka, sladak i osvježavajući.',
      legend: 'Juice Monster Pacific Punch kombinira tropske okuse Pacifika s Monster energijom.',
    },
    juiceBadApple: {
      name: 'Juice Monster Bad Apple',
      description:
        'Kiseli okus zelene jabuke. 50% voćnog soka, sladak i osvježavajući s kiselim twistom.',
      legend:
        'Juice Monster Bad Apple je zabranjeno jabuka u Monster obliku. Sladak, kiseo i eksplozivan.',
    },
    juiceKhaotic: {
      name: 'Juice Monster Khaotic',
      description: 'Kaotična mješavina tropskih okusa. 50% voćnog soka s mangom i narančom.',
      legend:
        'Juice Monster Khaotic je kaotična eksplozija tropskih okusa s punom Monster energijom.',
    },
    ultraViolet: {
      name: 'Monster Ultra Violet',
      description:
        'Ljubičasti okus grožđa. Nula šećera, nula kalorija. Sladak, voćan i s Ultra dodirom.',
      legend:
        'Monster Ultra Violet hvata najslađi okus grožđa u Ultra verziji bez šećera i kalorija.',
    },
    ultraRosa: {
      name: 'Monster Ultra Rosa',
      description:
        'Okus ružičastog grejpa. Nula šećera, nula kalorija. Citrusi, osvježavajući i s Ultra dodirom.',
      legend:
        'Monster Ultra Rosa kombinira okus ružičastog grejpa s Ultra formulom – nula šećera, nula kalorija.',
    },
    ultraWatermelon: {
      name: 'Monster Ultra Watermelon',
      description:
        'Svjež okus lubenice. Nula šećera, nula kalorija. Sladak, osvježavajući i savršen za ljeto.',
      legend:
        'Monster Ultra Watermelon je najslađa lubenica u Ultra verziji. Nula šećera, nula kalorija.',
    },
    ultraStrawberryDreams: {
      name: 'Monster Ultra Strawberry Dreams',
      description:
        'Sanjivi okus jagode. Nula šećera, nula kalorija. Sladak, kremast i s Ultra dodirom.',
      legend: 'Monster Ultra Strawberry Dreams prenosi te u jagodini san s Ultra formulom.',
    },
    ultraFiestaMango: {
      name: 'Monster Ultra Fiesta Mango',
      description:
        'Svečani okus manga. Nula šećera, nula kalorija. Tropski, sladak i s Ultra dodirom.',
      legend: 'Monster Ultra Fiesta Mango je mango fiesta u Ultra verziji bez šećera i kalorija.',
    },
  },
} as const;

export default hr;
