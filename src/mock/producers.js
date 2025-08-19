// src/mock/producers.js
export const MOCK_PRODUCERS = [
  {
    id: '1',
    name: 'ООО "Корякморепродукт"',
    region: 'Камчатка',
    logo: '/images/koryak.webp',
    description:
      'Один из крупнейших рыбопромышленных холдингов Камчатки. Полный цикл: добыча и переработка.',
    fullDescription:
      '«Корякморепродукт» — лидер камчатского промысла. Современное оборудование, международные стандарты качества. Экспорт икры, рыбы и морепродуктов по России и за рубеж.',
    site: 'https://koryakmoreprodukt.ru',
    address:
      '683017, Россия, Камчатский край, Петропавловск-Камчатский, просп. Рыбаков, 32, оф. 312',
    contacts: {
      phone: '+7 (4152) 20-10-02',
      email: 'kmp-office@bk.ru',
    },
    categories: ['Икра', 'Рыба', 'Морепродукты'],
    badges: ['Проверенный', 'Честный знак', 'Меркурий'],
    gallery: ['/images/koryak-1.webp', '/images/koryak-2.webp', '/images/koryak-3.webp'],
    founded: 2006,
    productionCapacity: 'до 120 т/сутки',
    exportMarkets: ['Россия', 'Корея', 'Япония', 'Китай', 'ЕС'],
  },

  {
    id: '2',
    name: 'ООО "Витязь Авто"',
    region: 'Камчатка',
    logo: '/images/VA.webp',
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
    id: '6',
    name: 'ООО "Фирма Жупанова"',
    region: 'Камчатка',
    logo: '/images/zhupanova.webp',
    description: 'Лососевая рыба и икра. Основано в 1996 г.',
    fullDescription:
      'Производство и реализация высококачественной лососевой рыбы и икры. Восточное побережье Камчатки.',
    site: '',
    address: 'г. Елизово, ул. Сопочная, 13. Офис: П-Камчатский, ул. Ларина, 38, оф. 66',
    contacts: {
      phone: '8-961-965-35-95',
      Владивосток: '8-914-705-19-10',
    },
    categories: ['Икра лососевая', 'Мороженая рыба'],
    badges: [],
    gallery: ['/images/zhupanova.webp'],
    founded: 1996,
    productionCapacity: '',
    exportMarkets: [],
  },
];
