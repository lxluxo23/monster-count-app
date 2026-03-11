const es = {
  tabs: {
    home: 'Inicio',
    history: 'Historial',
    community: 'Comunidad',
    profile: 'Perfil',
    homeTitle: 'Monster Counter',
  },
  home: {
    heroTitle: '¿Cuál te tomaste?',
    heroSubtitle: 'Registra cada Monster que tomes',
    today: 'Hoy',
    total: 'Total',
    selectMonster: 'Selecciona tu Monster',
    dailyGoal: 'Meta de hoy',
    dailyGoalDone: '¡Meta cumplida!',
    longPressHint: 'Mantén pulsado para ver info nutricional',
    caffeineWarning: 'Has superado los 400 mg de cafeína recomendados hoy',
    caffeineDismiss: 'Cerrar',
    weeklySummary: 'Resumen semanal',
    weeklyCompare: '{{change}} vs semana anterior',
    weeklyCans: '{{count}} latas',
    weeklyCaffeine: '{{amount}} mg cafeína',
  },
  history: {
    loading: 'Cargando…',
    emptyTitle: 'Aún no hay Monsters en el historial.',
    emptySubtitle: 'Añade una desde la pestaña Inicio.',
    filterAll: 'Todos',
    records_one: '{{count}} registro',
    records_other: '{{count}} registros',
    deleteTitle: 'Eliminar registro',
    deleteMessage: '¿Eliminar {{name}}?',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    today: 'Hoy',
    emptyFilter: 'Sin registros de este sabor',
  },
  profile: {
    greeting: '¡Hola, {{name}}!',
    syncActive: 'Sincronización activa ☁️',
    syncInactive: 'Tu resumen de Monsters',
    authBannerTitle: 'Activa la sincronización',
    authBannerSub: 'Inicia sesión con Google para guardar en la nube',
    googleBtn: 'Google',
    totalLabel: 'Total latas',
    todayLabel: 'Hoy',
    streak_one: '{{count}} día seguido',
    streak_other: '{{count}} días seguidos',
    streakLabel: 'Racha activa · ¡sigue así!',
    favoriteLabel: 'Tu favorito',
    favoriteUnit: '{{count}} veces',
    menuTitle: 'Opciones',
    menuGroupAccount: 'CUENTA',
    menuGroupApp: 'APP',
    editName: 'Mis datos',
    statsDetail: 'Estadísticas detalladas',
    settings: 'Ajustes',
    logout: 'Cerrar sesión',
    logoutTitle: 'Cerrar sesión',
    logoutMsg: '¿Seguro? Tus datos locales se conservarán.',
    logoutCancel: 'Cancelar',
    logoutConfirm: 'Cerrar sesión',
    editModalTitle: 'Editar nombre',
    editPlaceholder: 'Escribe tu nombre',
    editCancel: 'Cancelar',
    editSave: 'Guardar',
    footer: 'Monster Counter · v1.7.2',
  },
  publicProfile: {
    title: 'Perfil',
    statsPrivate: 'Este usuario ha ocultado sus estadísticas',
    achievementsPrivate: 'Este usuario ha ocultado sus logros',
    loginRequired: 'Inicia sesión para ver perfiles de otros usuarios',
  },
  comunidad: {
    achievementsTitle: 'Logros',
    unlocked: '{{count}} de {{total}} desbloqueados',
    communityTitle: 'Comunidad',
    communityTotal: 'latas registradas en total',
    error: 'No se pudieron cargar los datos de la comunidad',
    flavorRanking: 'Sabores más populares',
    topDrinkers: 'Top bebedores',
    flavorRequests: 'Solicitar sabores',
    requestNewFlavor: 'Solicitar sabor',
    requestName: 'Nombre del sabor',
    requestNamePlaceholder: 'Ej: Monster Ultra Rosa',
    requestDescription: 'Descripción (opcional)',
    requestDescriptionPlaceholder: '¿Por qué quieres este sabor?',
    requestPhoto: 'Adjuntar foto (opcional)',
    requestPhotoChange: 'Cambiar foto',
    removePhoto: 'Quitar',
    requestSubmit: 'Enviar solicitud',
    requestBy: 'por {{name}}',
    requestLoginToVote: 'Inicia sesión para votar',
    requestLoginToSubmit: 'Inicia sesión para solicitar sabores',
    requestEmpty: 'Aún no hay solicitudes. ¡Sé el primero!',
    requestVote_one: '{{count}} voto',
    requestVote_other: '{{count}} votos',
    requestPhotoCamera: 'Tomar foto',
    requestPhotoGallery: 'Elegir de galería',
    requestDeleteTitle: 'Eliminar solicitud',
    requestDeleteMsg: '¿Eliminar "{{name}}"?',
    requestDelete: 'Eliminar',
    requestErrorTitle: 'Error al enviar',
    requestErrorGeneric: 'No se pudo enviar la solicitud. Intenta de nuevo.',
    photoPending: 'Pendiente',
    approvePhoto: 'Aprobar',
  },
  stats: {
    title: 'Estadísticas',
    totalCans: 'Total latas',
    verifiedCans: 'Verificadas (cámara)',
    activeDays: 'Días activos',
    avgPerDay: 'Media / día',
    avgPerWeek: 'Media / semana',
    last7Days: 'Últimos 7 días',
    hourOfDay: 'Hora del día',
    monthlyTrend: 'Tendencia mensual',
    personalRecord: 'Récord personal',
    cansInDay: 'latas en un día · {{date}}',
    startTracking: 'Empieza a registrar para ver tu récord',
    byFlavor: 'Por sabor',
    noData: 'Sin datos aún',
    earlyMorning: 'Madrugada',
    morning: 'Mañana',
    afternoon: 'Tarde',
    night: 'Noche',
    days: { '0': 'Dom', '1': 'Lun', '2': 'Mar', '3': 'Mié', '4': 'Jue', '5': 'Vie', '6': 'Sáb' },
    months: {
      '0': 'Ene',
      '1': 'Feb',
      '2': 'Mar',
      '3': 'Abr',
      '4': 'May',
      '5': 'Jun',
      '6': 'Jul',
      '7': 'Ago',
      '8': 'Sep',
      '9': 'Oct',
      '10': 'Nov',
      '11': 'Dic',
    },
  },
  settings: {
    title: 'Ajustes',
    dailyGoalSection: 'OBJETIVO DIARIO',
    dailyGoal: 'Meta de latas al día',
    dailyGoalDesc: 'Muestra una barra de progreso en Inicio. 0 = desactivado.',
    dailyGoalOff: 'Off',
    notificationsSection: 'NOTIFICACIONES',
    dailyReminder: 'Recordatorio diario',
    reminderTime: 'Hora del recordatorio',
    privacySection: 'PRIVACIDAD',
    showInRanking: 'Aparecer en el ranking global',
    showInRankingDesc: 'Tu nombre aparece en el Top bebedores de la comunidad',
    showAchievements: 'Mostrar mis logros',
    showAchievementsDesc: 'Otros usuarios pueden ver tus logros desbloqueados en tu perfil',
    showStats: 'Mostrar mis estadísticas',
    showStatsDesc: 'Otros usuarios pueden ver tu total, racha y favorito en tu perfil',
    appearanceSection: 'APARIENCIA',
    darkMode: 'Oscuro',
    lightMode: 'Claro',
    systemMode: 'Sistema',
    languageSection: 'IDIOMA',
    languageAuto: 'Auto',
    weeklySummary: 'Resumen semanal',
    weeklySummaryDesc: 'Recibe un resumen cada lunes',
    audioSection: 'AUDIO MOOD',
    audioMood: 'Música al abrir detalle',
    audioMoodDesc: 'Reproduce un fragmento de canción al abrir el detalle de un Monster.',
    audioVolume: 'Volumen',
    aboutSection: 'ACERCA DE',
    appName: 'Monster Counter',
    version: 'Versión 1.7.2',
    copyright: 'Aplicación para llevar registro de tus latas de Monster Energy.\n© 2026',
  },
  detail: {
    legend: 'LA LEYENDA',
    nutritionTitle: 'INFORMACIÓN NUTRICIONAL · {{volume}} ml',
    calories: 'Calorías',
    caffeine: 'Cafeína',
    sugar: 'Azúcar',
    sodium: 'Sodio',
    disclaimer: '⚠️ Consumo máximo recomendado: 400 mg de cafeína al día para adultos sanos.',
  },
  achievements: {
    firstCan: {
      title: 'Primera lata',
      desc: 'Registra tu primera lata de Monster',
    },
    tenCans: {
      title: '10 latas',
      desc: 'Acumula 10 latas registradas',
    },
    fiftyCans: {
      title: '50 latas',
      desc: 'Acumula 50 latas registradas',
    },
    hundredCans: {
      title: '100 latas',
      desc: 'Acumula 100 latas registradas',
    },
    streak7: {
      title: 'Racha de 7 días',
      desc: '7 días seguidos con al menos un Monster',
    },
    streak30: {
      title: 'Racha de 30 días',
      desc: '30 días seguidos con al menos un Monster',
    },
    collector: {
      title: 'Coleccionista',
      desc: 'Prueba los {{count}} sabores de Monster',
    },
    earlyBird: {
      title: 'Madrugador',
      desc: 'Registra un Monster antes de las 8:00',
    },
    withYourNoctulo: {
      title: 'Con tu noctulo',
      desc: 'Tómate una Monster con tu noctulo después de las 23:00',
    },
  },
  scanner: {
    title: 'Escanear código',
    hint: 'Apunta el código de barras de la lata',
    permissionNeeded: 'Se necesita permiso de cámara para escanear',
    grantPermission: 'Conceder permiso',
    unknownTitle: 'Código no reconocido',
    unknownMessage: 'El código {{code}} no está en la base de datos. ¿Añadir manualmente?',
    addManually: 'Añadir manualmente',
    adding: 'Registrando…',
    rescan: 'Escanear de nuevo',
    registered: '¡Registrada!',
  },
  rateLimit: {
    title: 'Límite alcanzado',
    exceeded: 'Espera {{minutes}} min antes de registrar otra lata.',
  },
  notification: {
    title: 'Monster Counter',
    body: '¿Ya registraste tu Monster de hoy? 🥤',
  },
  monsters: {
    ultraZeroWhite: {
      name: 'Monster Ultra Zero White',
      description:
        'Zero sugar, zero calorías. Sabor suave con toques cítricos y un acabado ultra limpio. El favorito de quienes cuidan la línea sin sacrificar la energía.',
      legend:
        'Algunas personas son imposibles de complacer. En cuanto consiguen lo que quieren van por nuevos retos. Nuestros riders y Monster Girls no son diferentes... llevan un tiempo dándonos pistas. Nos pedían una nueva Monster. Algo menos dulce, más ligero, sin calorías, pero con toda la carga de nuestra mezcla energética Monster. Claro, el blanco es el nuevo negro. Nos lo pusimos difícil: Monster Energy Zero Ultra.',
    },
    originalGreen: {
      name: 'Monster Original Green OG',
      description:
        'El clásico original. Sabor intenso y dulce con la fórmula energética que empezó todo en 2002. Una lata, un legado.',
      legend:
        'Ábrete paso con la bebida energética más bestia del planeta: Monster Energy. Golpea fuerte pero entra suave, con un sabor fácil de beber. Es la combinación perfecta de los ingredientes correctos en las proporciones correctas para darte ese subidón descomunal que solo Monster puede dar. ¡Unleash the Beast!',
    },
    ultraBlueHawaiian: {
      name: 'Monster Ultra Blue Hawaiian',
      description:
        'Sabor tropical a piña y maracuyá. Zero sugar, zero calorías. Te transporta directo a las playas de Hawaii en cada sorbo.',
      legend:
        'Tanto si estás en modo bestia, modo vacaciones o simplemente relajándote al estilo isleño, Ultra Blue Hawaiian te va a encender para dar lo mejor de ti. Ligero, fresco y muy fácil de beber, con un giro tiki tropical. Blue Hawaiian es una combinación brutal de sabores de frutas polinesicas exóticas con mucho sabor pero sin nada de azúcar.',
    },
    classicZeroSugar: {
      name: 'Monster Energy Classic Zero Sugar',
      description:
        'El sabor del Monster Original pero sin azúcar ni calorías. Lo mejor de ambos mundos para los que no quieren renunciar al clásico.',
      legend:
        'Monster Zero Sugar tiene la combinación ideal de los ingredientes correctos en las proporciones exactas para darte exactamente el empuje que necesitas, con el mismo sabor del OG pero con Zero Azúcar. Combate la fatiga con cafeína y mejora el rendimiento mental y la concentración. Todo el Monster, nada del azúcar.',
    },
    mangoLoco: {
      name: 'Juice Monster Mango Loco',
      description:
        '50% jugo de frutas tropicales con mango y naranjilla. Dulce, afrutado y explosivo. Para los que prefieren algo más natural y jugoso.',
      legend:
        'En la víspera del 31 de octubre de cada año, amigos y familia se reúnen para celebrar el Día de los Muertos. Las caléndulas, el misticismo y los recuerdos, combinados con comida y bebida, invitan a los espíritus de los difuntos a unirse a la fiesta. Mango Loco es una mezcla celestial de jugos exóticos capaz de atraer hasta al espíritu más terco. Sabor loco de verdad, con la magia justa de Monster para mantener la fiesta días enteros.',
    },
    aussieLemonade: {
      name: 'Monster Energy Aussie Lemonade',
      description:
        'Sabor a limonada australiana refrescante. Zero sugar, zero calorías. Cítrico, vibrante y con toda la energía de Monster. Ideal para el verano.',
      legend:
        'Inspirados por la tierra de los antípodas, con más de 10.000 playas, la Gran Barrera de Coral y los cítricos más exóticos del planeta, creamos Aussie Style Lemonade. La versión Monster de la limonada clásica: encontramos el equilibrio perfecto entre ácido y dulce con un estallido de cítrico fresco. Como siempre, repleta de nuestra mundialmente famosa mezcla energética Monster. Destapa una bien fría y dale caña. ¡Unleash the Beast!',
    },
    ultraPeachyKeen: {
      name: 'Monster Ultra Peachy Keen',
      description:
        'Sabor a melocotón dulce y natural. Zero sugar, zero calorías. Refrescante y jugoso, perfecto para los amantes del fruto.',
      legend:
        'Monster Ultra Peachy Keen combina el sabor dulce de melocotón maduro con la fórmula Ultra sin azúcar ni calorías. Ligero, fresco y fácil de beber.',
    },
    ultraParadise: {
      name: 'Monster Ultra Paradise',
      description:
        'Sabor tropical a kiwi y fresa. Zero sugar, zero calorías. Verde, vibrante y refrescante como un paraíso en lata.',
      legend:
        'Monster Ultra Paradise te lleva a un paraíso tropical con su combinación de kiwi y fresa. Zero azúcar, zero calorías, toda la energía Monster.',
    },
    ultraGoldenPineapple: {
      name: 'Monster Ultra Golden Pineapple',
      description:
        'Sabor a piña dorada tropical. Zero sugar, zero calorías. Dulce, tropical y con el toque Ultra de Monster.',
      legend:
        'Monster Ultra Golden Pineapple captura el sabor de la piña más dulce en una versión Ultra sin azúcar ni calorías.',
    },
    juiceRipper: {
      name: 'Juice Monster Ripper',
      description:
        '50% jugo de frutas con mango, naranja y maracuyá. Dulce, tropical y explosivo. La línea Juice en su máxima expresión.',
      legend:
        'Juice Monster Ripper combina jugos tropicales exóticos con la energía Monster. Un sabor loco que te transporta directo al trópico.',
    },
    juicePipelinePunch: {
      name: 'Juice Monster Pipeline Punch',
      description:
        'Mezcla tropical de frutas con guayaba, naranja y maracuyá. Dulce, afrutado y con 50% jugo de frutas reales.',
      legend:
        'Juice Monster Pipeline Punch es una explosión de sabores tropicales. Guayaba, naranja y maracuyá en cada sorbo, con toda la energía Monster.',
    },
    juicePacificPunch: {
      name: 'Juice Monster Pacific Punch',
      description:
        'Mezcla tropical del Pacífico con frutas exóticas. 50% jugo de frutas, dulce y refrescante.',
      legend:
        'Juice Monster Pacific Punch combina sabores tropicales del Pacífico con la energía Monster.',
    },
    juiceBadApple: {
      name: 'Juice Monster Bad Apple',
      description:
        'Sabor a manzana verde ácida. 50% jugo de frutas, dulce y refrescante con un toque ácido.',
      legend:
        'Juice Monster Bad Apple es la manzana prohibida en versión Monster. Dulce, ácida y explosiva.',
    },
    juiceKhaotic: {
      name: 'Juice Monster Khaotic',
      description: 'Mezcla caótica de sabores tropicales. 50% jugo de frutas con mango y naranja.',
      legend:
        'Juice Monster Khaotic es una explosión caótica de sabores tropicales con toda la energía Monster.',
    },
    ultraViolet: {
      name: 'Monster Ultra Violet',
      description:
        'Sabor a uva violeta. Zero sugar, zero calorías. Dulce, afrutado y con el toque Ultra.',
      legend:
        'Monster Ultra Violet captura el sabor de la uva más dulce en versión Ultra sin azúcar ni calorías.',
    },
    ultraRosa: {
      name: 'Monster Ultra Rosa',
      description:
        'Sabor a pomelo rosa. Zero sugar, zero calorías. Cítrico, refrescante y con el toque Ultra.',
      legend:
        'Monster Ultra Rosa combina el sabor del pomelo rosa con la fórmula Ultra sin azúcar ni calorías.',
    },
    ultraWatermelon: {
      name: 'Monster Ultra Watermelon',
      description:
        'Sabor a sandía fresca. Zero sugar, zero calorías. Dulce, refrescante y perfecto para el verano.',
      legend:
        'Monster Ultra Watermelon es la sandía más dulce en versión Ultra. Zero azúcar, zero calorías.',
    },
    ultraStrawberryDreams: {
      name: 'Monster Ultra Strawberry Dreams',
      description:
        'Sabor a fresa de ensueño. Zero sugar, zero calorías. Dulce, cremoso y con el toque Ultra.',
      legend:
        'Monster Ultra Strawberry Dreams te transporta a un sueño de fresas con la fórmula Ultra.',
    },
    ultraFiestaMango: {
      name: 'Monster Ultra Fiesta Mango',
      description:
        'Sabor a mango festivo. Zero sugar, zero calorías. Tropical, dulce y con el toque Ultra.',
      legend:
        'Monster Ultra Fiesta Mango es una fiesta de mango en versión Ultra sin azúcar ni calorías.',
    },
  },
} as const;

export default es;
