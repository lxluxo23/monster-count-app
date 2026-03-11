const fr = {
  tabs: {
    home: 'Accueil',
    history: 'Historique',
    community: 'Communauté',
    profile: 'Profil',
    homeTitle: 'Monster Counter',
  },
  home: {
    heroTitle: 'Lequel as-tu bu ?',
    heroSubtitle: 'Enregistre chaque Monster que tu bois',
    today: "Aujourd'hui",
    total: 'Total',
    selectMonster: 'Choisis ton Monster',
    dailyGoal: 'Objectif du jour',
    dailyGoalDone: 'Objectif atteint !',
    longPressHint: 'Appui long pour les infos nutritionnelles',
    caffeineWarning: "Tu as dépassé les 400 mg de caféine recommandés aujourd'hui",
    caffeineDismiss: 'Fermer',
    weeklySummary: 'Résumé hebdomadaire',
    weeklyCompare: '{{change}} vs semaine dernière',
    weeklyCans: '{{count}} canettes',
    weeklyCaffeine: '{{amount}} mg de caféine',
  },
  history: {
    loading: 'Chargement…',
    emptyTitle: "Pas encore de Monsters dans l'historique.",
    emptySubtitle: "Ajoutes-en un depuis l'onglet Accueil.",
    filterAll: 'Tous',
    records_one: '{{count}} entrée',
    records_other: '{{count}} entrées',
    deleteTitle: "Supprimer l'entrée",
    deleteMessage: 'Supprimer {{name}} ?',
    cancel: 'Annuler',
    delete: 'Supprimer',
    today: "Aujourd'hui",
    emptyFilter: 'Aucune entrée pour ce parfum',
  },
  profile: {
    greeting: 'Salut, {{name}} !',
    syncActive: 'Synchronisation active ☁️',
    syncInactive: 'Ton résumé Monster',
    authBannerTitle: 'Activer la synchronisation',
    authBannerSub: 'Connecte-toi avec Google pour sauvegarder dans le cloud',
    googleBtn: 'Google',
    totalLabel: 'Total canettes',
    todayLabel: "Aujourd'hui",
    streak_one: '{{count}} jour consécutif',
    streak_other: '{{count}} jours consécutifs',
    streakLabel: 'Série active · continue comme ça !',
    favoriteLabel: 'Ton favori',
    favoriteUnit: '{{count}} fois',
    menuTitle: 'Options',
    menuGroupAccount: 'COMPTE',
    menuGroupApp: 'APPLI',
    editName: 'Mon profil',
    statsDetail: 'Statistiques détaillées',
    settings: 'Paramètres',
    logout: 'Se déconnecter',
    logoutTitle: 'Se déconnecter',
    logoutMsg: 'Tu es sûr ? Tes données locales seront conservées.',
    logoutCancel: 'Annuler',
    logoutConfirm: 'Se déconnecter',
    editModalTitle: 'Modifier le nom',
    editPlaceholder: 'Entre ton nom',
    editCancel: 'Annuler',
    editSave: 'Enregistrer',
    footer: 'Monster Counter · v1.7.2',
  },
  publicProfile: {
    title: 'Profil',
    statsPrivate: 'Cet utilisateur a masqué ses statistiques',
    achievementsPrivate: 'Cet utilisateur a masqué ses succès',
    loginRequired: "Connecte-toi pour voir les profils d'autres utilisateurs",
  },
  comunidad: {
    achievementsTitle: 'Succès',
    unlocked: '{{count}} sur {{total}} débloqués',
    communityTitle: 'Communauté',
    communityTotal: 'canettes enregistrées au total',
    error: 'Impossible de charger les données de la communauté',
    flavorRanking: 'Parfums les plus populaires',
    topDrinkers: 'Top buveurs',
    flavorRequests: 'Demandes de parfums',
    requestNewFlavor: 'Demander un parfum',
    requestName: 'Nom du parfum',
    requestNamePlaceholder: 'Ex. : Monster Ultra Rosa',
    requestDescription: 'Description (optionnel)',
    requestDescriptionPlaceholder: 'Pourquoi veux-tu ce parfum ?',
    requestPhoto: 'Joindre une photo (optionnel)',
    requestPhotoChange: 'Changer la photo',
    removePhoto: 'Retirer',
    requestSubmit: 'Envoyer la demande',
    requestBy: 'par {{name}}',
    requestLoginToVote: 'Connecte-toi pour voter',
    requestLoginToSubmit: 'Connecte-toi pour demander des parfums',
    requestEmpty: 'Pas encore de demandes. Sois le premier !',
    requestVote_one: '{{count}} vote',
    requestVote_other: '{{count}} votes',
    requestPhotoCamera: 'Prendre une photo',
    requestPhotoGallery: 'Choisir depuis la galerie',
    requestDeleteTitle: 'Supprimer la demande',
    requestDeleteMsg: 'Supprimer « {{name}} » ?',
    requestDelete: 'Supprimer',
    requestErrorTitle: "Erreur d'envoi",
    requestErrorGeneric: "Impossible d'envoyer la demande. Réessaie.",
    photoPending: 'En attente',
    approvePhoto: 'Approuver',
  },
  stats: {
    title: 'Statistiques',
    totalCans: 'Total canettes',
    verifiedCans: 'Vérifiées (caméra)',
    activeDays: 'Jours actifs',
    avgPerDay: 'Moy. / jour',
    avgPerWeek: 'Moy. / semaine',
    last7Days: '7 derniers jours',
    hourOfDay: 'Heure de la journée',
    monthlyTrend: 'Tendance mensuelle',
    personalRecord: 'Record personnel',
    cansInDay: 'canettes en un jour · {{date}}',
    startTracking: 'Commence à enregistrer pour voir ton record',
    byFlavor: 'Par parfum',
    noData: 'Pas encore de données',
    earlyMorning: 'Petit matin',
    morning: 'Matin',
    afternoon: 'Après-midi',
    night: 'Nuit',
    days: { '0': 'Dim', '1': 'Lun', '2': 'Mar', '3': 'Mer', '4': 'Jeu', '5': 'Ven', '6': 'Sam' },
    months: {
      '0': 'Jan',
      '1': 'Fév',
      '2': 'Mar',
      '3': 'Avr',
      '4': 'Mai',
      '5': 'Juin',
      '6': 'Juil',
      '7': 'Aoû',
      '8': 'Sep',
      '9': 'Oct',
      '10': 'Nov',
      '11': 'Déc',
    },
  },
  settings: {
    title: 'Paramètres',
    dailyGoalSection: 'OBJECTIF QUOTIDIEN',
    dailyGoal: 'Objectif de canettes par jour',
    dailyGoalDesc: "Affiche une barre de progression à l'accueil. 0 = désactivé.",
    dailyGoalOff: 'Désactivé',
    notificationsSection: 'NOTIFICATIONS',
    dailyReminder: 'Rappel quotidien',
    reminderTime: 'Heure du rappel',
    privacySection: 'CONFIDENTIALITÉ',
    showInRanking: 'Apparaître dans le classement global',
    showInRankingDesc: 'Ton nom apparaît dans le Top buveurs de la communauté',
    showAchievements: 'Afficher mes succès',
    showAchievementsDesc: "D'autres utilisateurs peuvent voir tes succès débloqués sur ton profil",
    showStats: 'Afficher mes statistiques',
    showStatsDesc:
      "D'autres utilisateurs peuvent voir ton total, ta série et ton favori sur ton profil",
    appearanceSection: 'APPARENCE',
    darkMode: 'Sombre',
    lightMode: 'Clair',
    systemMode: 'Système',
    languageSection: 'LANGUE',
    languageAuto: 'Auto',
    weeklySummary: 'Résumé hebdomadaire',
    weeklySummaryDesc: 'Reçois un résumé chaque lundi',
    audioSection: 'AUDIO MOOD',
    audioMood: "Musique à l'ouverture des détails",
    audioMoodDesc: "Joue un aperçu de chanson à l'ouverture des détails d'un Monster.",
    audioVolume: 'Volume',
    aboutSection: 'À PROPOS',
    appName: 'Monster Counter',
    version: 'Version 1.7.2',
    copyright: 'Application pour suivre tes canettes de Monster Energy.\n© 2026',
  },
  detail: {
    legend: 'LA LÉGENDE',
    nutritionTitle: 'INFOS NUTRITIONNELLES · {{volume}} ml',
    calories: 'Calories',
    caffeine: 'Caféine',
    sugar: 'Sucre',
    sodium: 'Sodium',
    disclaimer:
      '⚠️ Maximum recommandé : 400 mg de caféine par jour pour les adultes en bonne santé.',
  },
  achievements: {
    firstCan: {
      title: 'Première canette',
      desc: 'Enregistre ta première canette de Monster',
    },
    tenCans: {
      title: '10 canettes',
      desc: 'Cumule 10 canettes enregistrées',
    },
    fiftyCans: {
      title: '50 canettes',
      desc: 'Cumule 50 canettes enregistrées',
    },
    hundredCans: {
      title: '100 canettes',
      desc: 'Cumule 100 canettes enregistrées',
    },
    streak7: {
      title: 'Série de 7 jours',
      desc: '7 jours consécutifs avec au moins un Monster',
    },
    streak30: {
      title: 'Série de 30 jours',
      desc: '30 jours consécutifs avec au moins un Monster',
    },
    collector: {
      title: 'Collectionneur',
      desc: 'Essaie les {{count}} parfums de Monster',
    },
    earlyBird: {
      title: 'Lève-tôt',
      desc: 'Enregistre un Monster avant 8h00',
    },
    withYourNoctulo: {
      title: 'Oiseau de nuit',
      desc: 'Enregistre un Monster après 23h00',
    },
  },
  scanner: {
    title: 'Scanner le code-barres',
    hint: 'Pointe vers le code-barres de la canette',
    permissionNeeded: 'Permission caméra nécessaire pour scanner',
    grantPermission: 'Accorder la permission',
    unknownTitle: 'Code inconnu',
    unknownMessage: "Le code {{code}} n'est pas dans la base de données. Ajouter manuellement ?",
    addManually: 'Ajouter manuellement',
    adding: 'Enregistrement…',
    rescan: 'Scanner à nouveau',
    registered: 'Enregistré !',
  },
  rateLimit: {
    title: 'Limite atteinte',
    exceeded: "Attends {{minutes}} min avant d'enregistrer une autre canette.",
  },
  notification: {
    title: 'Monster Counter',
    body: "As-tu enregistré ton Monster aujourd'hui ? 🥤",
  },
  monsters: {
    ultraZeroWhite: {
      name: 'Monster Ultra Zero White',
      description:
        "Zéro sucre, zéro calorie. Saveur douce avec des notes d'agrumes et une finition ultra propre. Le favori de ceux qui surveillent leur ligne sans sacrifier l'énergie.",
      legend:
        "Certaines personnes sont impossibles à satisfaire. Dès qu'elles obtiennent ce qu'elles veulent, elles cherchent de nouveaux défis. Nos riders et Monster Girls ne sont pas différents... ils nous ont donné des indices depuis un moment. Ils voulaient un nouveau Monster. Quelque chose de moins sucré, plus léger, zéro calorie, mais avec toute la puissance de notre mélange énergétique Monster. Le blanc est le nouveau noir. On s'est compliqué la tâche : Monster Energy Zero Ultra.",
    },
    originalGreen: {
      name: 'Monster Original Green OG',
      description:
        'Le classique original. Saveur intense et sucrée avec la formule énergétique qui a tout commencé en 2002. Une canette, un héritage.',
      legend:
        'Ouvre une canette de la boisson énergétique la plus féroce de la planète : Monster Energy. Ça passe tout seul, avec une saveur légèrement sucrée. La combinaison idéale des bons ingrédients dans les bonnes proportions pour te donner ce coup de fouet Monster. Unleash the Beast !',
    },
    ultraBlueHawaiian: {
      name: 'Monster Ultra Blue Hawaiian',
      description:
        "Saveur tropicale ananas et fruit de la passion. Zéro sucre, zéro calorie. Te transporte directement sur les plages d'Hawaï à chaque gorgée.",
      legend:
        "Que tu sois en mode bête, en mode vacances ou simplement en mode chill à l'hawaïenne, Ultra Blue Hawaiian va t'enflammer pour donner le meilleur de toi-même. Léger, rafraîchissant et très facile à boire, avec un twist tropical tiki. Blue Hawaiian est une combinaison brutale de saveurs de fruits polynésiens exotiques avec un grand goût mais zéro sucre.",
    },
    classicZeroSugar: {
      name: 'Monster Energy Classic Zero Sugar',
      description:
        'Le goût du Monster original mais sans sucre ni calories. Le meilleur des deux mondes pour ceux qui ne veulent pas renoncer au classique.',
      legend:
        'Monster Zero Sugar a la combinaison idéale des bons ingrédients dans les proportions exactes pour te donner exactement le coup de boost dont tu as besoin – avec le même goût OG mais Zéro Sucre. Combats la fatigue avec la caféine et améliore tes performances mentales et ta concentration. Tout le Monster, zéro sucre.',
    },
    mangoLoco: {
      name: 'Juice Monster Mango Loco',
      description:
        '50% de jus de fruits tropicaux avec mangue et lulo. Sucré, fruité et explosif. Pour ceux qui préfèrent quelque chose de plus naturel et juteux.',
      legend:
        "La veille du 31 octobre de chaque année, amis et famille se réunissent pour célébrer le Día de los Muertos. Soucis, mysticisme et souvenirs, combinés avec nourriture et boissons, invitent les esprits des défunts à rejoindre la fête. Mango Loco est un mélange céleste de jus exotiques capable d'attirer même l'esprit le plus têtu. Un goût vraiment loco, avec juste la bonne dose de magie Monster pour faire durer la fête pendant des jours.",
    },
    aussieLemonade: {
      name: 'Monster Energy Aussie Lemonade',
      description:
        "Saveur de limonade australienne rafraîchissante. Zéro sucre, zéro calorie. Agrumé, vif et avec toute l'énergie Monster. Parfait pour l'été.",
      legend:
        "Inspirés par le pays des antipodes, avec plus de 10 000 plages, la Grande Barrière de Corail et les agrumes les plus exotiques de la planète, nous avons créé Aussie Style Lemonade. La version Monster de la limonade classique : nous avons trouvé l'équilibre parfait entre acide et sucré avec une explosion d'agrumes frais. Comme toujours, chargée de notre mélange énergétique Monster mondialement célèbre. Ouvre-en une bien glacée et fonce. Unleash the Beast !",
    },
    ultraPeachyKeen: {
      name: 'Monster Ultra Peachy Keen',
      description:
        'Saveur de pêche douce et naturelle. Zéro sucre, zéro calorie. Rafraîchissant et juteux, parfait pour les amateurs de pêches.',
      legend:
        'Monster Ultra Peachy Keen combine la saveur douce de la pêche mûre avec la formule Ultra – zéro sucre, zéro calorie. Léger, frais et facile à boire.',
    },
    ultraParadise: {
      name: 'Monster Ultra Paradise',
      description:
        'Saveur tropicale kiwi et fraise. Zéro sucre, zéro calorie. Vert, vif et rafraîchissant comme un paradis en canette.',
      legend:
        "Monster Ultra Paradise t'emmène dans un paradis tropical avec sa combinaison kiwi-fraise. Zéro sucre, zéro calorie, toute l'énergie Monster.",
    },
    ultraGoldenPineapple: {
      name: 'Monster Ultra Golden Pineapple',
      description:
        "Saveur d'ananas doré tropical. Zéro sucre, zéro calorie. Sucré, tropical et avec la touche Monster Ultra.",
      legend:
        "Monster Ultra Golden Pineapple capture le goût de l'ananas le plus sucré dans une version Ultra sans sucre ni calories.",
    },
    juiceRipper: {
      name: 'Juice Monster Ripper',
      description:
        '50% de jus de fruits avec mangue, orange et fruit de la passion. Sucré, tropical et explosif. La gamme Juice à son meilleur.',
      legend:
        "Juice Monster Ripper combine des jus tropicaux exotiques avec l'énergie Monster. Un goût dingue qui te transporte directement sous les tropiques.",
    },
    juicePipelinePunch: {
      name: 'Juice Monster Pipeline Punch',
      description:
        'Mélange tropical de fruits avec goyave, orange et fruit de la passion. Sucré, fruité et avec 50% de vrai jus de fruits.',
      legend:
        "Juice Monster Pipeline Punch est une explosion de saveurs tropicales. Goyave, orange et fruit de la passion à chaque gorgée, avec toute l'énergie Monster.",
    },
    juicePacificPunch: {
      name: 'Juice Monster Pacific Punch',
      description:
        'Mélange tropical de fruits du Pacifique. 50% de jus de fruits, sucré et rafraîchissant.',
      legend:
        "Juice Monster Pacific Punch combine les saveurs tropicales du Pacifique avec l'énergie Monster.",
    },
    juiceBadApple: {
      name: 'Juice Monster Bad Apple',
      description:
        'Saveur de pomme verte acidulée. 50% de jus de fruits, sucré et rafraîchissant avec une touche acide.',
      legend:
        'Juice Monster Bad Apple est la pomme interdite version Monster. Sucré, acide et explosif.',
    },
    juiceKhaotic: {
      name: 'Juice Monster Khaotic',
      description:
        'Mélange chaotique de saveurs tropicales. 50% de jus de fruits avec mangue et orange.',
      legend:
        "Juice Monster Khaotic est une explosion chaotique de saveurs tropicales avec toute l'énergie Monster.",
    },
    ultraViolet: {
      name: 'Monster Ultra Violet',
      description:
        'Saveur de raisin violet. Zéro sucre, zéro calorie. Sucré, fruité et avec la touche Ultra.',
      legend:
        'Monster Ultra Violet capture la saveur du raisin le plus sucré en version Ultra sans sucre ni calories.',
    },
    ultraRosa: {
      name: 'Monster Ultra Rosa',
      description:
        'Saveur de pamplemousse rose. Zéro sucre, zéro calorie. Agrumé, rafraîchissant et avec la touche Ultra.',
      legend:
        'Monster Ultra Rosa combine la saveur du pamplemousse rose avec la formule Ultra – zéro sucre, zéro calorie.',
    },
    ultraWatermelon: {
      name: 'Monster Ultra Watermelon',
      description:
        "Saveur de pastèque fraîche. Zéro sucre, zéro calorie. Sucré, rafraîchissant et parfait pour l'été.",
      legend:
        'Monster Ultra Watermelon est la pastèque la plus sucrée en version Ultra. Zéro sucre, zéro calorie.',
    },
    ultraStrawberryDreams: {
      name: 'Monster Ultra Strawberry Dreams',
      description:
        'Saveur de fraise de rêve. Zéro sucre, zéro calorie. Sucré, crémeux et avec la touche Ultra.',
      legend:
        'Monster Ultra Strawberry Dreams te transporte dans un rêve de fraises avec la formule Ultra.',
    },
    ultraFiestaMango: {
      name: 'Monster Ultra Fiesta Mango',
      description:
        'Saveur de mangue festive. Zéro sucre, zéro calorie. Tropical, sucré et avec la touche Ultra.',
      legend:
        'Monster Ultra Fiesta Mango est une fiesta de mangue en version Ultra sans sucre ni calories.',
    },
  },
} as const;

export default fr;
