const pt = {
  tabs: {
    home: 'Início',
    history: 'Histórico',
    community: 'Comunidade',
    profile: 'Perfil',
    homeTitle: 'Monster Counter',
  },
  home: {
    heroTitle: 'Qual você tomou?',
    heroSubtitle: 'Registre cada Monster que você tomar',
    today: 'Hoje',
    total: 'Total',
    selectMonster: 'Selecione seu Monster',
    dailyGoal: 'Meta de hoje',
    dailyGoalDone: 'Meta alcançada!',
    longPressHint: 'Mantenha pressionado para ver informações nutricionais',
    caffeineWarning: 'Você ultrapassou os 400 mg de cafeína recomendados hoje',
    caffeineDismiss: 'Fechar',
    weeklySummary: 'Resumo semanal',
    weeklyCompare: '{{change}} vs semana anterior',
    weeklyCans: '{{count}} latas',
    weeklyCaffeine: '{{amount}} mg cafeína',
  },
  history: {
    loading: 'Carregando…',
    emptyTitle: 'Ainda não há Monsters no histórico.',
    emptySubtitle: 'Adicione um na aba Início.',
    filterAll: 'Todos',
    records_one: '{{count}} registro',
    records_other: '{{count}} registros',
    deleteTitle: 'Excluir registro',
    deleteMessage: 'Excluir {{name}}?',
    cancel: 'Cancelar',
    delete: 'Excluir',
    today: 'Hoje',
    emptyFilter: 'Sem registros deste sabor',
  },
  profile: {
    greeting: 'Olá, {{name}}!',
    syncActive: 'Sincronização ativa ☁️',
    syncInactive: 'Seu resumo de Monsters',
    authBannerTitle: 'Ative a sincronização',
    authBannerSub: 'Entre com o Google para salvar na nuvem',
    googleBtn: 'Google',
    totalLabel: 'Total de latas',
    todayLabel: 'Hoje',
    streak_one: '{{count}} dia seguido',
    streak_other: '{{count}} dias seguidos',
    streakLabel: 'Sequência ativa · continue assim!',
    favoriteLabel: 'Seu favorito',
    favoriteUnit: '{{count}} vezes',
    menuTitle: 'Opções',
    menuGroupAccount: 'CONTA',
    menuGroupApp: 'APP',
    editName: 'Meus dados',
    statsDetail: 'Estatísticas detalhadas',
    settings: 'Configurações',
    logout: 'Sair',
    logoutTitle: 'Sair',
    logoutMsg: 'Tem certeza? Seus dados locais serão mantidos.',
    logoutCancel: 'Cancelar',
    logoutConfirm: 'Sair',
    editModalTitle: 'Editar nome',
    editPlaceholder: 'Digite seu nome',
    editCancel: 'Cancelar',
    editSave: 'Salvar',
    footer: 'Monster Counter · v1.7.2',
  },
  publicProfile: {
    title: 'Perfil',
    statsPrivate: 'Este usuário ocultou suas estatísticas',
    achievementsPrivate: 'Este usuário ocultou suas conquistas',
    loginRequired: 'Entre para ver perfis de outros usuários',
  },
  comunidad: {
    achievementsTitle: 'Conquistas',
    unlocked: '{{count}} de {{total}} desbloqueadas',
    communityTitle: 'Comunidade',
    communityTotal: 'latas registradas no total',
    error: 'Não foi possível carregar os dados da comunidade',
    flavorRanking: 'Sabores mais populares',
    topDrinkers: 'Top bebedores',
    flavorRequests: 'Solicitar sabores',
    requestNewFlavor: 'Solicitar sabor',
    requestName: 'Nome do sabor',
    requestNamePlaceholder: 'Ex: Monster Ultra Rosa',
    requestDescription: 'Descrição (opcional)',
    requestDescriptionPlaceholder: 'Por que você quer esse sabor?',
    requestPhoto: 'Anexar foto (opcional)',
    requestPhotoChange: 'Trocar foto',
    removePhoto: 'Remover',
    requestSubmit: 'Enviar solicitação',
    requestBy: 'por {{name}}',
    requestLoginToVote: 'Faça login para votar',
    requestLoginToSubmit: 'Faça login para solicitar sabores',
    requestEmpty: 'Nenhuma solicitação ainda. Seja o primeiro!',
    requestVote_one: '{{count}} voto',
    requestVote_other: '{{count}} votos',
    requestPhotoCamera: 'Tirar foto',
    requestPhotoGallery: 'Escolher da galeria',
    requestDeleteTitle: 'Excluir solicitação',
    requestDeleteMsg: 'Excluir "{{name}}"?',
    requestDelete: 'Excluir',
    requestErrorTitle: 'Erro ao enviar',
    requestErrorGeneric: 'Não foi possível enviar a solicitação. Tente novamente.',
    photoPending: 'Pendente',
    approvePhoto: 'Aprovar',
  },
  stats: {
    title: 'Estatísticas',
    totalCans: 'Total de latas',
    verifiedCans: 'Verificadas (câmera)',
    activeDays: 'Dias ativos',
    avgPerDay: 'Média / dia',
    avgPerWeek: 'Média / semana',
    last7Days: 'Últimos 7 dias',
    hourOfDay: 'Hora do dia',
    monthlyTrend: 'Tendência mensal',
    personalRecord: 'Recorde pessoal',
    cansInDay: 'latas em um dia · {{date}}',
    startTracking: 'Comece a registrar para ver seu recorde',
    byFlavor: 'Por sabor',
    noData: 'Sem dados ainda',
    earlyMorning: 'Madrugada',
    morning: 'Manhã',
    afternoon: 'Tarde',
    night: 'Noite',
    days: { '0': 'Dom', '1': 'Seg', '2': 'Ter', '3': 'Qua', '4': 'Qui', '5': 'Sex', '6': 'Sáb' },
    months: {
      '0': 'Jan',
      '1': 'Fev',
      '2': 'Mar',
      '3': 'Abr',
      '4': 'Mai',
      '5': 'Jun',
      '6': 'Jul',
      '7': 'Ago',
      '8': 'Set',
      '9': 'Out',
      '10': 'Nov',
      '11': 'Dez',
    },
  },
  settings: {
    title: 'Configurações',
    dailyGoalSection: 'OBJETIVO DIÁRIO',
    dailyGoal: 'Meta de latas por dia',
    dailyGoalDesc: 'Mostra uma barra de progresso no Início. 0 = desativado.',
    dailyGoalOff: 'Off',
    notificationsSection: 'NOTIFICAÇÕES',
    dailyReminder: 'Lembrete diário',
    reminderTime: 'Horário do lembrete',
    privacySection: 'PRIVACIDADE',
    showInRanking: 'Aparecer no ranking global',
    showInRankingDesc: 'Seu nome aparece no Top bebedores da comunidade',
    showAchievements: 'Mostrar minhas conquistas',
    showAchievementsDesc: 'Outros usuários podem ver suas conquistas desbloqueadas no seu perfil',
    showStats: 'Mostrar minhas estatísticas',
    showStatsDesc: 'Outros usuários podem ver seu total, sequência e favorito no seu perfil',
    appearanceSection: 'APARÊNCIA',
    darkMode: 'Escuro',
    lightMode: 'Claro',
    systemMode: 'Sistema',
    languageSection: 'IDIOMA',
    languageAuto: 'Auto',
    weeklySummary: 'Resumo semanal',
    weeklySummaryDesc: 'Receba um resumo toda segunda-feira',
    audioSection: 'AUDIO MOOD',
    audioMood: 'Música ao abrir detalhe',
    audioMoodDesc: 'Reproduz um trecho de música ao abrir o detalhe de um Monster.',
    audioVolume: 'Volume',
    aboutSection: 'SOBRE',
    appName: 'Monster Counter',
    version: 'Versão 1.7.2',
    copyright: 'Aplicativo para registrar suas latas de Monster Energy.\n© 2026',
  },
  detail: {
    legend: 'A LENDA',
    nutritionTitle: 'INFORMAÇÃO NUTRICIONAL · {{volume}} ml',
    calories: 'Calorias',
    caffeine: 'Cafeína',
    sugar: 'Açúcar',
    sodium: 'Sódio',
    disclaimer: '⚠️ Consumo máximo recomendado: 400 mg de cafeína por dia para adultos saudáveis.',
  },
  achievements: {
    firstCan: {
      title: 'Primeira lata',
      desc: 'Registre sua primeira lata de Monster',
    },
    tenCans: {
      title: '10 latas',
      desc: 'Acumule 10 latas registradas',
    },
    fiftyCans: {
      title: '50 latas',
      desc: 'Acumule 50 latas registradas',
    },
    hundredCans: {
      title: '100 latas',
      desc: 'Acumule 100 latas registradas',
    },
    streak7: {
      title: 'Sequência de 7 dias',
      desc: '7 dias seguidos com pelo menos um Monster',
    },
    streak30: {
      title: 'Sequência de 30 dias',
      desc: '30 dias seguidos com pelo menos um Monster',
    },
    collector: {
      title: 'Colecionador',
      desc: 'Experimente os {{count}} sabores de Monster',
    },
    earlyBird: {
      title: 'Madrugador',
      desc: 'Registre um Monster antes das 8:00',
    },
    withYourNoctulo: {
      title: 'Coruja noturna',
      desc: 'Registre um Monster depois das 23:00',
    },
  },
  scanner: {
    title: 'Escanear código',
    hint: 'Aponte para o código de barras da lata',
    permissionNeeded: 'Permissão de câmera necessária para escanear',
    grantPermission: 'Conceder permissão',
    unknownTitle: 'Código desconhecido',
    unknownMessage: 'O código {{code}} não está no banco de dados. Adicionar manualmente?',
    addManually: 'Adicionar manualmente',
    adding: 'Registrando…',
    rescan: 'Escanear novamente',
    registered: 'Registrada!',
  },
  rateLimit: {
    title: 'Limite atingido',
    exceeded: 'Aguarde {{minutes}} min antes de registrar outra lata.',
  },
  notification: {
    title: 'Monster Counter',
    body: 'Você já registrou seu Monster hoje? 🥤',
  },
  monsters: {
    ultraZeroWhite: {
      name: 'Monster Ultra Zero White',
      description:
        'Zero açúcar, zero calorias. Sabor suave com toque cítrico e acabamento ultra limpo. O favorito de quem cuida da forma sem abrir mão da energia.',
      legend:
        'Algumas pessoas são impossíveis de agradar. Assim que conseguem o que querem, vão atrás de novos desafios. Nossos riders e Monster Girls não são diferentes... faz tempo que estão nos dando pistas. Pediam um novo Monster. Algo menos doce, mais leve, sem calorias, mas com toda a potência da nossa mistura energética Monster. O branco é o novo preto. Nos desafiamos: Monster Energy Zero Ultra.',
    },
    originalGreen: {
      name: 'Monster Original Green OG',
      description:
        'O clássico original. Sabor intenso e doce com a fórmula energética que começou tudo em 2002. Uma lata, um legado.',
      legend:
        'Abra caminho com a bebida energética mais poderosa do planeta: Monster Energy. Vai fundo, mas desce suave, com um sabor fácil de beber. É a combinação perfeita dos ingredientes certos nas proporções certas para te dar aquele boost descomunal que só a Monster consegue dar. Unleash the Beast!',
    },
    ultraBlueHawaiian: {
      name: 'Monster Ultra Blue Hawaiian',
      description:
        'Sabor tropical de abacaxi e maracujá. Zero açúcar, zero calorias. Te transporta direto para as praias do Havaí a cada gole.',
      legend:
        'Seja no modo fera, de férias ou simplesmente relaxando ao estilo ilhéu, o Ultra Blue Hawaiian vai te acender para dar o melhor de você. Leve, refrescante e muito fácil de beber, com um toque tiki tropical. O Blue Hawaiian é uma combinação incrível de sabores de frutas polinésias exóticas com muito sabor, mas sem nenhum açúcar.',
    },
    classicZeroSugar: {
      name: 'Monster Energy Classic Zero Sugar',
      description:
        'O sabor do Monster Original, mas sem açúcar nem calorias. O melhor dos dois mundos para quem não quer abrir mão do clássico.',
      legend:
        'Monster Zero Sugar tem a combinação ideal dos ingredientes certos nas proporções exatas para te dar exatamente o impulso que você precisa, com o mesmo sabor do OG, mas com Zero Açúcar. Combata o cansaço com cafeína e melhore o desempenho mental e a concentração. Tudo do Monster, nada do açúcar.',
    },
    mangoLoco: {
      name: 'Juice Monster Mango Loco',
      description:
        '50% de suco de frutas tropicais com manga e maracujá amarelo. Doce, frutado e explosivo. Para quem prefere algo mais natural e suculento.',
      legend:
        'Na véspera do Día de los Muertos, amigos e família se reúnem para celebrar. As calêndulas, o misticismo e as memórias, combinados com comida e bebida, convidam os espíritos dos falecidos para a festa. O Mango Loco é uma mistura celestial de sucos exóticos capaz de atrair até o espírito mais teimoso. Sabor louco de verdade, com a magia certa da Monster para manter a festa por dias.',
    },
    aussieLemonade: {
      name: 'Monster Energy Aussie Lemonade',
      description:
        'Sabor de limonada australiana refrescante. Zero açúcar, zero calorias. Cítrico, vibrante e com toda a energia da Monster. Ideal para o verão.',
      legend:
        'Inspirados pela terra dos antípodas, com mais de 10.000 praias, a Grande Barreira de Corais e os cítricos mais exóticos do planeta, criamos a Aussie Style Lemonade. A versão Monster da limonada clássica: encontramos o equilíbrio perfeito entre ácido e doce com uma explosão de cítrico fresco. Como sempre, repleta da nossa famosa mistura energética Monster. Abra bem gelada e vai fundo. Unleash the Beast!',
    },
    ultraPeachyKeen: {
      name: 'Monster Ultra Peachy Keen',
      description:
        'Sabor doce e natural de pêssego. Zero açúcar, zero calorias. Refrescante e suculento, perfeito para quem ama pêssego.',
      legend:
        'Monster Ultra Peachy Keen combina o sabor doce do pêssego maduro com a fórmula Ultra sem açúcar nem calorias. Leve, fresco e fácil de beber.',
    },
    ultraParadise: {
      name: 'Monster Ultra Paradise',
      description:
        'Sabor tropical de kiwi e morango. Zero açúcar, zero calorias. Verde, vibrante e refrescante como um paraíso em lata.',
      legend:
        'Monster Ultra Paradise leva você a um paraíso tropical com sua combinação de kiwi e morango. Zero açúcar, zero calorias, toda a energia Monster.',
    },
    ultraGoldenPineapple: {
      name: 'Monster Ultra Golden Pineapple',
      description:
        'Sabor tropical de abacaxi dourado. Zero açúcar, zero calorias. Doce, tropical e com o toque Ultra da Monster.',
      legend:
        'Monster Ultra Golden Pineapple captura o sabor do abacaxi mais doce em uma versão Ultra sem açúcar nem calorias.',
    },
    juiceRipper: {
      name: 'Juice Monster Ripper',
      description:
        '50% suco de frutas com manga, laranja e maracujá. Doce, tropical e explosivo. A linha Juice no seu melhor.',
      legend:
        'Juice Monster Ripper combina sucos tropicais exóticos com a energia Monster. Um sabor louco que te leva direto ao trópico.',
    },
    juicePipelinePunch: {
      name: 'Juice Monster Pipeline Punch',
      description:
        'Mistura tropical de frutas com goiaba, laranja e maracujá. Doce, frutado e com 50% suco de frutas reais.',
      legend:
        'Juice Monster Pipeline Punch é uma explosão de sabores tropicais. Goiaba, laranja e maracujá em cada gole, com toda a energia Monster.',
    },
    juicePacificPunch: {
      name: 'Juice Monster Pacific Punch',
      description:
        'Mistura tropical do Pacífico com frutas exóticas. 50% suco de frutas, doce e refrescante.',
      legend:
        'Juice Monster Pacific Punch combina sabores tropicais do Pacífico com a energia Monster.',
    },
    juiceBadApple: {
      name: 'Juice Monster Bad Apple',
      description:
        'Sabor de maçã verde ácida. 50% suco de frutas, doce e refrescante com toque ácido.',
      legend:
        'Juice Monster Bad Apple é a maçã proibida em versão Monster. Doce, ácida e explosiva.',
    },
    juiceKhaotic: {
      name: 'Juice Monster Khaotic',
      description: 'Mistura caótica de sabores tropicais. 50% suco de frutas com manga e laranja.',
      legend:
        'Juice Monster Khaotic é uma explosão caótica de sabores tropicais com toda a energia Monster.',
    },
    ultraViolet: {
      name: 'Monster Ultra Violet',
      description:
        'Sabor de uva violeta. Zero açúcar, zero calorias. Doce, frutado e com o toque Ultra.',
      legend:
        'Monster Ultra Violet captura o sabor da uva mais doce em versão Ultra sem açúcar nem calorias.',
    },
    ultraRosa: {
      name: 'Monster Ultra Rosa',
      description:
        'Sabor de toranja rosa. Zero açúcar, zero calorias. Cítrico, refrescante e com o toque Ultra.',
      legend:
        'Monster Ultra Rosa combina o sabor da toranja rosa com a fórmula Ultra sem açúcar nem calorias.',
    },
    ultraWatermelon: {
      name: 'Monster Ultra Watermelon',
      description:
        'Sabor de melancia fresca. Zero açúcar, zero calorias. Doce, refrescante e perfeito para o verão.',
      legend:
        'Monster Ultra Watermelon é a melancia mais doce em versão Ultra. Zero açúcar, zero calorias.',
    },
    ultraStrawberryDreams: {
      name: 'Monster Ultra Strawberry Dreams',
      description:
        'Sabor de morango dos sonhos. Zero açúcar, zero calorias. Doce, cremoso e com o toque Ultra.',
      legend: 'Monster Ultra Strawberry Dreams te leva a um sonho de morangos com a fórmula Ultra.',
    },
    ultraFiestaMango: {
      name: 'Monster Ultra Fiesta Mango',
      description:
        'Sabor de manga festivo. Zero açúcar, zero calorias. Tropical, doce e com o toque Ultra.',
      legend:
        'Monster Ultra Fiesta Mango é uma festa de manga em versão Ultra sem açúcar nem calorias.',
    },
  },
} as const;

export default pt;
