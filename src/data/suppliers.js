const suppliers = [
  {
    id: 'more-i-sol',
    name: 'Море и Соль',
    region: 'Москва',
    city: 'Москва',
    address: 'г. Москва, ул. Никулинская 33 стр 1',
    products: ['Икра', 'Рыба'],
    logo: '/images/more-i-sol.png',
    verified: true,
    shortDescription: 'Поставщик морепродуктов премиум-класса',
    fullDescription:
      '“Море и Соль” — надёжный поставщик красной икры и рыбы, оптом и в розницу. Гарантируем высокое качество, свежесть продукции и своевременную доставку. Работает с крупнейшими переработчиками и экспортёрами, контролирует все этапы поставки.',
    volumes: 'Объемы поставок: 10 тонн в месяц. Сезонность: круглый год',
    priceList: '/files/more-i-sol-price.pdf',
    contacts: {
      telegram: '@moreisol_yg',
      phone: '+7 985 550 57 47',
      email: 'info@moreisol.ru',
    },
    certs: ['Честный знак', 'Меркурий'],
    gallery: [
      '/images/more-i-sol-1.jpg',
      '/images/more-i-sol-2.jpg',
    ],
  },
];

export default suppliers;
