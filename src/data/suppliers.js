const suppliers = [
  {
    id: 'more-i-sol',
    name: 'ООО "Море и Соль"',
    region: 'Москва',
    city: 'Москва',
    address: 'г. Москва, ул. Никулинская 33 стр 1',
    products: ['Икра', 'Рыба'],
    logo: '/images/more-i-sol.webp',
    verified: true,
    shortDescription: 'Поставщик морепродуктов премиум-класса',
    fullDescription: '“Море и Соль” — надёжный поставщик красной икры и рыбы, оптом и в розницу. Гарантируем высокое качество, свежесть продукции и своевременную доставку. Работает с крупнейшими переработчиками и экспортёрами, контролирует все этапы поставки.',
    volumes: 'Объемы поставок: 10 тонн в месяц. Сезонность: круглый год',
    priceList: '/files/more-i-sol-price.pdf',
    contacts: {
      telegram: '@moreisol_yg',
      phone: '+7 985 550 57 47',
      email: 'info@moreisol.ru',
    },
    certs: ['Честный знак', 'Меркурий'],
    gallery: [
      '/images/more-i-sol-1.webp',
      '/images/more-i-sol-2.webp',
    ],
    mapUrl: 'https://yandex.ru/maps/213/moscow/house/nikulinskaya_ulitsa_33s1/Z04Ycw9hTUYBQFtvfXx0d3xrZg==/?ll=37.447537%2C55.676405&utm_medium=mapframe&utm_source=maps&z=17',
  },
  {
    id: 'morya-i-okeany',
    name: 'ООО "Моря и Океаны"',
    region: 'Москва',
    city: 'Подольск',
    address: 'пр-кт Ленина д.107/49 помещение 1Б, офис 317',
    products: ['Икра', 'Рыба', 'Морепродукты'],
    logo: '/images/fish-logo.webp',
    verified: true,
    shortDescription: 'Поставщик рыбы и морепродуктов. Москва и регионы.',
    fullDescription: 'ООО "Моря и Океаны" — комплексные поставки рыбы и морепродуктов в Москву и регионы. Работаем с проверенными производителями. Доставляем оптом и в розницу.',
    volumes: '',
    priceList: '/files/morya-i-okeany-price.pdf',
    contacts: {
      telegram: '',
      phone: '+7 926 765 30 15',
      email: 'Morya.okeany@mail.ru',
    },
    certs: ['Честный знак', 'Меркурий'],
    gallery: [],
    mapUrl: 'https://yandex.ru/maps/org/olimp_21/1280003836/?utm_medium=mapframe&utm_source=maps',
  }
];

export default suppliers;
