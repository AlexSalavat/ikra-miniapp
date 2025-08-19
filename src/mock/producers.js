// src/mock/producers.js
export const MOCK_PRODUCERS = [
  {
    id: '1',
    name: 'ООО "Корякморепродукт"',
    region: 'Камчатка',
    logo: '/images/producers/koryak.webp',
    description:
      'Один из крупнейших рыбопромышленных холдингов Камчатки. Полный цикл: добыча и переработка.',
    fullDescription:
      '«Корякморепродукт» — лидер камчатского промысла. Современное оборудование, международные стандарты качества. Экспорт икры, рыбы и морепродуктов по России и за рубеж.',
    site: 'https://koryakmoreprodukt.ru',
    address:
      '683017, Россия, Камчатский край, Петропавловск-Камчатский, просп. Рыбаков, 32, оф. 312',
    contacts: { phone: '+7 (4152) 20-10-02', email: 'kmp-office@bk.ru' },
    categories: ['Икра', 'Рыба', 'Морепродукты'],
    badges: ['Проверенный', 'Честный знак', 'Меркурий'],
    gallery: [
      '/images/producers/koryak/1.webp',
      '/images/producers/koryak/2.webp',
      '/images/producers/koryak/3.webp',
    ],
    founded: 2006,
    productionCapacity: 'до 120 т/сутки',
    exportMarkets: ['Россия', 'Корея', 'Япония', 'Китай', 'ЕС'],
  },

  {
    id: '2',
    name: 'ООО "Витязь Авто"',
    region: 'Камчатка',
    logo: '/images/producers/VA.webp',
    description: 'Производство красной рыбы (нерка, кета, кижуч).',
    fullDescription:
      'Старейшее предприятие региона. Специализация — дикий лосось и продукция глубокой переработки.',
    site: 'https://va-salmon.ru',
    address: '',
    contacts: {},
    categories: ['Рыба'],
    badges: [],
    gallery: [],
    founded: 1991,
    productionCapacity: '≈120 т/сутки',
    exportMarkets: [],
  },

  {
    id: '3',
    name: 'Озерновский рыбоконсервный завод №55',
    region: 'Камчатка',
    logo: '/images/producers/RKZ.webp',
    description: 'Крупнейший консервный завод Камчатки, резидент ТОСЭР.',
    fullDescription:
      'ОРКЗ-55 — ведущий производитель рыбных консервов на Камчатке. Современные цеха, строгий контроль качества.',
    site: 'https://fishnet.ru', // если есть точный сайт — подставишь
    address: '',
    contacts: {},
    categories: ['Консервы', 'Рыба'],
    badges: [],
    gallery: [],
    founded: undefined,
    productionCapacity: '',
    exportMarkets: [],
  },

  {
    id: '4',
    name: 'ООО "Рыбхолкам" (SALMONICA Group)',
    region: 'Камчатка',
    logo: '',
    description:
      'Активный рыболовный завод на западном побережье Камчатки, входит в SALMONICA Group.',
    fullDescription:
      'Завод по переработке дикого лосося. Современные мощности, экспортная ориентация.',
    site: 'https://pkportal.ru',
    address: '',
    contacts: {},
    categories: ['Рыба', 'Переработка'],
    badges: [],
    gallery: [],
    founded: undefined,
    productionCapacity: '',
    exportMarkets: [],
  },

  {
    id: '5',
    name: 'ООО "Западный РК" (SALMONICA)',
    region: 'Камчатка',
    logo: '',
    description: 'Завод по переработке дикого лосося, структура SALMONICA.',
    fullDescription: 'Переработка лососевых. Современные линии, экспорт готовой продукции.',
    site: 'https://2gis.ru',
    address: '',
    contacts: {},
    categories: ['Рыба', 'Переработка'],
    badges: [],
    gallery: [],
    founded: undefined,
    productionCapacity: '',
    exportMarkets: [],
  },

  {
    id: '6',
    name: 'ООО "Фирма Жупанова"',
    region: 'Камчатка',
    logo: '/images/producers/zhupanova.webp',
    description: 'Лососевая рыба и икра. Основано в 1996 г.',
    fullDescription:
      'Производство и реализация высококачественной лососевой рыбы и икры. Восточное побережье Камчатки.',
    site: '',
    address: 'г. Елизово, ул. Сопочная, 13. Офис: П-Камчатский, ул. Ларина, 38, оф. 66',
    contacts: { phone: '8-961-965-35-95', Владивосток: '8-914-705-19-10' },
    categories: ['Икра лососевая', 'Мороженая рыба'],
    badges: [],
    gallery: ['/images/producers/zhupanova.webp'],
    founded: 1996,
    productionCapacity: '',
    exportMarkets: [],
  },
];
