// src/data/suppliers.js

const suppliers = [
  {
    id: 'more-i-sol',
    name: 'Море и Соль',
    region: 'Москва',
    products: ['Икра', 'Рыба'], // ← вот так!
    logo: '/images/more-i-sol.png',
    verified: true,
    shortDescription: 'Поставщик морепродуктов премиум-класса',
    fullDescription: 'Компания “Море и Соль” — прямые поставки с Дальнего Востока. Работают с крупнейшими переработчиками и экспортёрами. Поставка в любой регион России. Контроль качества, документы, соблюдение сроков.',
    contacts: {
      telegram: '@moreisol',
      phone: '+7 900 123 45 67',
      email: 'info@moreisol.ru'
    },
    certs: ['Честный знак', 'Меркурий'],
    gallery: [
      '/images/more-i-sol-1.jpg',
      '/images/more-i-sol-2.jpg'
    ]
  },
];

export default suppliers;
