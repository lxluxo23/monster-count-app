const pl = {
  tabs: {
    home: 'Start',
    history: 'Historia',
    community: 'Społeczność',
    profile: 'Profil',
    homeTitle: 'Monster Counter',
  },
  home: {
    heroTitle: 'Którego wypiłeś?',
    heroSubtitle: 'Zapisuj każdego wypitego Monstera',
    today: 'Dziś',
    total: 'Łącznie',
    selectMonster: 'Wybierz swojego Monstera',
    dailyGoal: 'Cel na dziś',
    dailyGoalDone: 'Cel osiągnięty!',
    longPressHint: 'Przytrzymaj, aby zobaczyć wartości odżywcze',
    caffeineWarning: 'Przekroczyłeś dziś zalecaną dawkę 400 mg kofeiny',
    caffeineDismiss: 'Zamknij',
    weeklySummary: 'Podsumowanie tygodnia',
    weeklyCompare: '{{change}} vs poprzedni tydzień',
    weeklyCans: '{{count}} puszek',
    weeklyCaffeine: '{{amount}} mg kofeiny',
  },
  history: {
    loading: 'Ładowanie…',
    emptyTitle: 'Brak Monsterów w historii.',
    emptySubtitle: 'Dodaj jednego z zakładki Start.',
    filterAll: 'Wszystkie',
    records_one: '{{count}} wpis',
    records_other: '{{count}} wpisów',
    deleteTitle: 'Usuń wpis',
    deleteMessage: 'Usunąć {{name}}?',
    cancel: 'Anuluj',
    delete: 'Usuń',
    today: 'Dziś',
    emptyFilter: 'Brak wpisów dla tego smaku',
  },
  profile: {
    greeting: 'Hej, {{name}}!',
    syncActive: 'Synchronizacja aktywna ☁️',
    syncInactive: 'Twoje podsumowanie Monsterów',
    authBannerTitle: 'Włącz synchronizację',
    authBannerSub: 'Zaloguj się przez Google, aby zapisywać w chmurze',
    googleBtn: 'Google',
    totalLabel: 'Puszek łącznie',
    todayLabel: 'Dziś',
    streak_one: '{{count}} dzień z rzędu',
    streak_other: '{{count}} dni z rzędu',
    streakLabel: 'Aktywna seria · tak trzymaj!',
    favoriteLabel: 'Twój ulubiony',
    favoriteUnit: '{{count}} razy',
    menuTitle: 'Opcje',
    menuGroupAccount: 'KONTO',
    menuGroupApp: 'APLIKACJA',
    editName: 'Mój profil',
    statsDetail: 'Szczegółowe statystyki',
    settings: 'Ustawienia',
    logout: 'Wyloguj się',
    logoutTitle: 'Wyloguj się',
    logoutMsg: 'Na pewno? Twoje lokalne dane zostaną zachowane.',
    logoutCancel: 'Anuluj',
    logoutConfirm: 'Wyloguj się',
    editModalTitle: 'Edytuj imię',
    editPlaceholder: 'Wpisz swoje imię',
    editCancel: 'Anuluj',
    editSave: 'Zapisz',
    footer: 'Monster Counter · v1.7.2',
  },
  publicProfile: {
    title: 'Profil',
    statsPrivate: 'Ten użytkownik ukrył swoje statystyki',
    achievementsPrivate: 'Ten użytkownik ukrył swoje osiągnięcia',
    loginRequired: 'Zaloguj się, aby zobaczyć profile innych użytkowników',
  },
  comunidad: {
    achievementsTitle: 'Osiągnięcia',
    unlocked: '{{count}} z {{total}} odblokowanych',
    communityTitle: 'Społeczność',
    communityTotal: 'puszek zarejestrowanych łącznie',
    error: 'Nie udało się załadować danych społeczności',
    flavorRanking: 'Najpopularniejsze smaki',
    topDrinkers: 'Top pijący',
    flavorRequests: 'Prośby o smaki',
    requestNewFlavor: 'Poproś o smak',
    requestName: 'Nazwa smaku',
    requestNamePlaceholder: 'Np.: Monster Ultra Rosa',
    requestDescription: 'Opis (opcjonalnie)',
    requestDescriptionPlaceholder: 'Dlaczego chcesz ten smak?',
    requestPhoto: 'Dołącz zdjęcie (opcjonalnie)',
    requestPhotoChange: 'Zmień zdjęcie',
    removePhoto: 'Usuń',
    requestSubmit: 'Wyślij prośbę',
    requestBy: 'od {{name}}',
    requestLoginToVote: 'Zaloguj się, aby głosować',
    requestLoginToSubmit: 'Zaloguj się, aby prosić o smaki',
    requestEmpty: 'Brak próśb. Bądź pierwszy!',
    requestVote_one: '{{count}} głos',
    requestVote_other: '{{count}} głosów',
    requestPhotoCamera: 'Zrób zdjęcie',
    requestPhotoGallery: 'Wybierz z galerii',
    requestDeleteTitle: 'Usuń prośbę',
    requestDeleteMsg: 'Usunąć "{{name}}"?',
    requestDelete: 'Usuń',
    requestErrorTitle: 'Błąd wysyłania',
    requestErrorGeneric: 'Nie udało się wysłać prośby. Spróbuj ponownie.',
    photoPending: 'Oczekujące',
    approvePhoto: 'Zatwierdź',
  },
  stats: {
    title: 'Statystyki',
    totalCans: 'Puszek łącznie',
    verifiedCans: 'Zweryfikowane (kamera)',
    activeDays: 'Aktywne dni',
    avgPerDay: 'Śr. / dzień',
    avgPerWeek: 'Śr. / tydzień',
    last7Days: 'Ostatnie 7 dni',
    hourOfDay: 'Pora dnia',
    monthlyTrend: 'Trend miesięczny',
    personalRecord: 'Rekord osobisty',
    cansInDay: 'puszek w ciągu dnia · {{date}}',
    startTracking: 'Zacznij rejestrować, aby zobaczyć swój rekord',
    byFlavor: 'Według smaku',
    noData: 'Brak danych',
    earlyMorning: 'Wczesny ranek',
    morning: 'Rano',
    afternoon: 'Popołudnie',
    night: 'Noc',
    days: { '0': 'Nd', '1': 'Pn', '2': 'Wt', '3': 'Śr', '4': 'Cz', '5': 'Pt', '6': 'Sb' },
    months: {
      '0': 'Sty',
      '1': 'Lut',
      '2': 'Mar',
      '3': 'Kwi',
      '4': 'Maj',
      '5': 'Cze',
      '6': 'Lip',
      '7': 'Sie',
      '8': 'Wrz',
      '9': 'Paź',
      '10': 'Lis',
      '11': 'Gru',
    },
  },
  settings: {
    title: 'Ustawienia',
    dailyGoalSection: 'CEL DZIENNY',
    dailyGoal: 'Dzienny cel puszek',
    dailyGoalDesc: 'Pokazuje pasek postępu na ekranie startowym. 0 = wyłączony.',
    dailyGoalOff: 'Wył.',
    notificationsSection: 'POWIADOMIENIA',
    dailyReminder: 'Codzienne przypomnienie',
    reminderTime: 'Czas przypomnienia',
    privacySection: 'PRYWATNOŚĆ',
    showInRanking: 'Pokaż w globalnym rankingu',
    showInRankingDesc: 'Twoje imię pojawi się w Top pijących społeczności',
    showAchievements: 'Pokaż moje osiągnięcia',
    showAchievementsDesc: 'Inni użytkownicy mogą zobaczyć Twoje odblokowane osiągnięcia w profilu',
    showStats: 'Pokaż moje statystyki',
    showStatsDesc:
      'Inni użytkownicy mogą zobaczyć Twoje podsumowanie, serię i ulubiony smak w profilu',
    appearanceSection: 'WYGLĄD',
    darkMode: 'Ciemny',
    lightMode: 'Jasny',
    systemMode: 'System',
    languageSection: 'JĘZYK',
    languageAuto: 'Auto',
    weeklySummary: 'Podsumowanie tygodnia',
    weeklySummaryDesc: 'Otrzymuj podsumowanie w każdy poniedziałek',
    audioSection: 'AUDIO MOOD',
    audioMood: 'Muzyka przy otwieraniu szczegółów',
    audioMoodDesc: 'Odtwarza podgląd piosenki przy otwieraniu szczegółów Monstera.',
    audioVolume: 'Głośność',
    aboutSection: 'O APLIKACJI',
    appName: 'Monster Counter',
    version: 'Wersja 1.7.2',
    copyright: 'Aplikacja do rejestrowania puszek Monster Energy.\n© 2026',
  },
  detail: {
    legend: 'LEGENDA',
    nutritionTitle: 'WARTOŚCI ODŻYWCZE · {{volume}} ml',
    calories: 'Kalorie',
    caffeine: 'Kofeina',
    sugar: 'Cukier',
    sodium: 'Sód',
    disclaimer: '⚠️ Zalecane maksimum: 400 mg kofeiny dziennie dla zdrowych dorosłych.',
  },
  achievements: {
    firstCan: {
      title: 'Pierwsza puszka',
      desc: 'Zarejestruj swoją pierwszą puszkę Monstera',
    },
    tenCans: {
      title: '10 puszek',
      desc: 'Zbierz 10 zarejestrowanych puszek',
    },
    fiftyCans: {
      title: '50 puszek',
      desc: 'Zbierz 50 zarejestrowanych puszek',
    },
    hundredCans: {
      title: '100 puszek',
      desc: 'Zbierz 100 zarejestrowanych puszek',
    },
    streak7: {
      title: 'Seria 7 dni',
      desc: '7 kolejnych dni z co najmniej jednym Monsterem',
    },
    streak30: {
      title: 'Seria 30 dni',
      desc: '30 kolejnych dni z co najmniej jednym Monsterem',
    },
    collector: {
      title: 'Kolekcjoner',
      desc: 'Wypróbuj wszystkie {{count}} smaków Monstera',
    },
    earlyBird: {
      title: 'Ranny ptaszek',
      desc: 'Zarejestruj Monstera przed 8:00',
    },
    withYourNoctulo: {
      title: 'Nocny marek',
      desc: 'Zarejestruj Monstera po 23:00',
    },
  },
  scanner: {
    title: 'Skanuj kod kreskowy',
    hint: 'Skieruj na kod kreskowy puszki',
    permissionNeeded: 'Potrzebne uprawnienie kamery do skanowania',
    grantPermission: 'Udziel uprawnienia',
    unknownTitle: 'Nieznany kod',
    unknownMessage: 'Kod {{code}} nie znajduje się w bazie danych. Dodać ręcznie?',
    addManually: 'Dodaj ręcznie',
    adding: 'Rejestrowanie…',
    rescan: 'Skanuj ponownie',
    registered: 'Zarejestrowano!',
  },
  rateLimit: {
    title: 'Osiągnięto limit',
    exceeded: 'Poczekaj {{minutes}} min przed zarejestrowaniem kolejnej puszki.',
  },
  notification: {
    title: 'Monster Counter',
    body: 'Zarejestrowałeś dziś swojego Monstera? 🥤',
  },
  monsters: {
    ultraZeroWhite: {
      name: 'Monster Ultra Zero White',
      description:
        'Zero cukru, zero kalorii. Łagodny smak z nutami cytrusowymi i ultra czystym wykończeniem. Ulubieniec tych, którzy dbają o figurę bez rezygnacji z energii.',
      legend:
        'Niektórzy ludzie są nie do zadowolenia. Gdy tylko dostają to, czego chcą, szukają nowych wyzwań. Nasi riderzy i Monster Girls nie są inni... od jakiegoś czasu dawali nam wskazówki. Chcieli nowego Monstera. Coś mniej słodkiego, lżejszego, zero kalorii, ale z pełną mocą naszej mieszanki energetycznej Monster. Biel to nowa czerń. Postawiliśmy sobie poprzeczkę wysoko: Monster Energy Zero Ultra.',
    },
    originalGreen: {
      name: 'Monster Original Green OG',
      description:
        'Oryginalny klasyk. Intensywny i słodki smak z formułą energetyczną, która rozpoczęła wszystko w 2002 roku. Jedna puszka, jedna legenda.',
      legend:
        'Otwórz puszkę najostrzejszego napoju energetycznego na planecie: Monster Energy. Wchodzi gładko, z lekko słodkim smakiem. Idealne połączenie odpowiednich składników w odpowiednich proporcjach, aby dać ci ten Monster-kick. Unleash the Beast!',
    },
    ultraBlueHawaiian: {
      name: 'Monster Ultra Blue Hawaiian',
      description:
        'Tropikalny smak ananasa i marakui. Zero cukru, zero kalorii. Przenosi cię prosto na plaże Hawajów z każdym łykiem.',
      legend:
        'Niezależnie czy jesteś w trybie bestii, na wakacjach, czy po prostu relaksujesz się w wyspiarskim stylu – Ultra Blue Hawaiian rozpali cię, byś dał z siebie wszystko. Lekki, orzeźwiający i bardzo łatwy do picia, z tropikalnym tikowym twistem. Blue Hawaiian to brutalna kombinacja egzotycznych polinezyjskich smaków owocowych z wielkim smakiem, ale zero cukru.',
    },
    classicZeroSugar: {
      name: 'Monster Energy Classic Zero Sugar',
      description:
        'Smak oryginalnego Monstera, ale bez cukru i kalorii. To, co najlepsze z obu światów dla tych, którzy nie chcą rezygnować z klasyka.',
      legend:
        'Monster Zero Sugar ma idealną kombinację odpowiednich składników w dokładnych proporcjach, aby dać ci dokładnie taki zastrzyk energii, jakiego potrzebujesz – z tym samym smakiem OG, ale Zero Cukru. Zwalcz zmęczenie kofeiną i popraw wydajność umysłową i koncentrację. Cały Monster, zero cukru.',
    },
    mangoLoco: {
      name: 'Juice Monster Mango Loco',
      description:
        '50% soku z tropikalnych owoców z mango i lulo. Słodki, owocowy i wybuchowy. Dla tych, którzy wolą coś bardziej naturalnego i soczystego.',
      legend:
        'W wigilię 31 października każdego roku przyjaciele i rodzina zbierają się, aby świętować Día de los Muertos. Nagietki, mistycyzm i wspomnienia, w połączeniu z jedzeniem i piciem, zapraszają duchy zmarłych do przyłączenia się do fiesty. Mango Loco to niebiańska mieszanka egzotycznych soków, zdolna przyciągnąć nawet najbardziej upartego ducha. Naprawdę szalony smak, z odpowiednią dawką magii Monster, aby impreza trwała dniami.',
    },
    aussieLemonade: {
      name: 'Monster Energy Aussie Lemonade',
      description:
        'Orzeźwiający smak australijskiej lemoniady. Zero cukru, zero kalorii. Cytrusowy, żywy i z pełną energią Monster. Idealny na lato.',
      legend:
        'Zainspirowani krajem na antypodach, z ponad 10 000 plażami, Wielką Rafą Koralową i najbardziej egzotycznymi owocami cytrusowymi na planecie, stworzyliśmy Aussie Style Lemonade. Monsterowa wersja klasycznej lemoniady: znaleźliśmy idealną równowagę między kwaśnym a słodkim z eksplozją świeżego cytrusu. Jak zawsze, naładowana naszą światowej sławy mieszanką energetyczną Monster. Otwórz lodowatą i daj czadu. Unleash the Beast!',
    },
    ultraPeachyKeen: {
      name: 'Monster Ultra Peachy Keen',
      description:
        'Słodki, naturalny smak brzoskwini. Zero cukru, zero kalorii. Orzeźwiający i soczysty, idealny dla miłośników brzoskwiń.',
      legend:
        'Monster Ultra Peachy Keen łączy słodki smak dojrzałej brzoskwini z formułą Ultra – zero cukru, zero kalorii. Lekki, świeży i łatwy do picia.',
    },
    ultraParadise: {
      name: 'Monster Ultra Paradise',
      description:
        'Tropikalny smak kiwi i truskawki. Zero cukru, zero kalorii. Zielony, żywy i orzeźwiający jak raj w puszce.',
      legend:
        'Monster Ultra Paradise przenosi cię do tropikalnego raju dzięki kombinacji kiwi i truskawki. Zero cukru, zero kalorii, pełna energia Monster.',
    },
    ultraGoldenPineapple: {
      name: 'Monster Ultra Golden Pineapple',
      description:
        'Złoty tropikalny smak ananasa. Zero cukru, zero kalorii. Słodki, tropikalny i z dotykiem Monster Ultra.',
      legend:
        'Monster Ultra Golden Pineapple oddaje smak najsłodszego ananasa w wersji Ultra bez cukru i kalorii.',
    },
    juiceRipper: {
      name: 'Juice Monster Ripper',
      description:
        '50% soku owocowego z mango, pomarańczą i marakują. Słodki, tropikalny i wybuchowy. Linia Juice w najlepszym wydaniu.',
      legend:
        'Juice Monster Ripper łączy egzotyczne tropikalne soki z energią Monster. Szalony smak, który przenosi cię prosto do tropików.',
    },
    juicePipelinePunch: {
      name: 'Juice Monster Pipeline Punch',
      description:
        'Tropikalna mieszanka owoców z guawą, pomarańczą i marakują. Słodka, owocowa i z 50% prawdziwego soku owocowego.',
      legend:
        'Juice Monster Pipeline Punch to eksplozja tropikalnych smaków. Guawa, pomarańcza i marakuja w każdym łyku, z pełną energią Monster.',
    },
    juicePacificPunch: {
      name: 'Juice Monster Pacific Punch',
      description:
        'Tropikalna mieszanka owoców z Pacyfiku. 50% soku owocowego, słodka i orzeźwiająca.',
      legend: 'Juice Monster Pacific Punch łączy tropikalne smaki Pacyfiku z energią Monster.',
    },
    juiceBadApple: {
      name: 'Juice Monster Bad Apple',
      description:
        'Kwaśny smak zielonego jabłka. 50% soku owocowego, słodki i orzeźwiający z kwaśnym akcentem.',
      legend:
        'Juice Monster Bad Apple to zakazane jabłko w wersji Monster. Słodki, kwaśny i wybuchowy.',
    },
    juiceKhaotic: {
      name: 'Juice Monster Khaotic',
      description:
        'Chaotyczna mieszanka tropikalnych smaków. 50% soku owocowego z mango i pomarańczą.',
      legend:
        'Juice Monster Khaotic to chaotyczna eksplozja tropikalnych smaków z pełną energią Monster.',
    },
    ultraViolet: {
      name: 'Monster Ultra Violet',
      description:
        'Fioletowy smak winogron. Zero cukru, zero kalorii. Słodki, owocowy i z dotykiem Ultra.',
      legend:
        'Monster Ultra Violet oddaje najsłodszy smak winogron w wersji Ultra bez cukru i kalorii.',
    },
    ultraRosa: {
      name: 'Monster Ultra Rosa',
      description:
        'Smak różowego grejpfruta. Zero cukru, zero kalorii. Cytrusowy, orzeźwiający i z dotykiem Ultra.',
      legend:
        'Monster Ultra Rosa łączy smak różowego grejpfruta z formułą Ultra – zero cukru, zero kalorii.',
    },
    ultraWatermelon: {
      name: 'Monster Ultra Watermelon',
      description:
        'Świeży smak arbuza. Zero cukru, zero kalorii. Słodki, orzeźwiający i idealny na lato.',
      legend:
        'Monster Ultra Watermelon to najsłodszy arbuz w wersji Ultra. Zero cukru, zero kalorii.',
    },
    ultraStrawberryDreams: {
      name: 'Monster Ultra Strawberry Dreams',
      description:
        'Wymarzony smak truskawki. Zero cukru, zero kalorii. Słodki, kremowy i z dotykiem Ultra.',
      legend: 'Monster Ultra Strawberry Dreams przenosi cię do truskawkowego snu z formułą Ultra.',
    },
    ultraFiestaMango: {
      name: 'Monster Ultra Fiesta Mango',
      description:
        'Świąteczny smak mango. Zero cukru, zero kalorii. Tropikalny, słodki i z dotykiem Ultra.',
      legend: 'Monster Ultra Fiesta Mango to fiesta mango w wersji Ultra bez cukru i kalorii.',
    },
  },
} as const;

export default pl;
