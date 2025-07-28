const producers = [
  {
    id: 1,
    name: 'ООО "Корякморепродукт"',
    region: 'Камчатка',
    logo: '/images/koryak.webp',
    description: 'Один из крупнейших рыбопромышленных холдингов Камчатки. Полный цикл добычи и переработки. Экспорт в Россию, Корею, Японию, Китай, ЕС. Сертификация Меркурий и Честный знак.',
    fullDescription: "«Корякморепродукт» — лидер рыбного промысла Камчатки. Современное оборудование, международные стандарты качества, экспорт икра, рыбы и морепродуктов по всей стране и за рубеж. ",
    site: 'https://koryakmoreprodukt.ru/',
    isPlaceholder: false,
    address: "683017, Россия, Камчатский край, г. Петропавловск-Камчатский, проспект Рыбаков, д. 32, офис 312",
    contacts: {
      phone: "+7 (4152) 20-10-02",
      email: "kmp-office@bk.ru"
    },
    categories: ["Икра", "Рыба", "Морепродукты"],
    badges: ["Проверенный", "Честный знак", "Меркурий"],
    // Три фото!
    gallery: [
      "/images/koryak.webp",
      "/images/koryak-2.webp",
      "/images/koryak-3.webp"
    ]
  },
  {
    id: 6,
    name: 'ООО "Фирма Жупанова"',
    region: 'Камчатка',
    logo: '/images/zhupanova.webp',
    description: 'Промысел и производство лососевой рыбы и икры. Основано в 1996 г.',
    // Не дублируем адрес и телефоны в fullDescription
    fullDescription: "ООО Фирма «Жупанова» — производство и реализация высококачественной лососевой рыбы и икры. На рынке с 1996 года. Восточное побережье Камчатки.",
    site: '',
    isPlaceholder: false,
    address: "Камчатский край, г. Елизово, ул. Сопочная, 13. Офис: г. Петропавловск-Камчатский, ул. Ларина, 38, оф. 66",
    contacts: {
      "Петропавловск-Камчатский": "8-961-965-35-95",
      "Владивосток": "8-914-705-19-10"
    },
    categories: ["Икра лососевая", "Мороженая рыба"],
    badges: [],
    gallery: ["/images/zhupanova.webp"]
  },
  {
    id: 2,
    name: 'ООО “Витязь Авто”',
    region: 'Камчатка',
    logo: '',
    description: 'Производство красной рыбы (нерка, кета, кижуч), ~120 т/сут. Старейшая компания.',
    site: 'va-salmon.ru',
    isPlaceholder: false,
    gallery: []
  },
  {
    id: 3,
    name: 'ОАО “Озерновский рыбоконсервный завод № 55”',
    region: 'Камчатка',
    logo: '',
    description: 'Крупнейший консервный завод Камчатки, резидент ТОСЭР.',
    site: 'fishnet.ru',
    isPlaceholder: false,
    gallery: []
  },
  {
    id: 4,
    name: 'ООО “Рыбхолкам” (SALMONICA Group)',
    region: 'Камчатка',
    logo: '',
    description: 'Активный рыболовный завод на западном побережье Камчатки, входит в SALMONICA Group.',
    site: 'pkportal.ru',
    isPlaceholder: false,
    gallery: []
  },
  {
    id: 5,
    name: 'ООО “Западный РК” (SALMONICA)',
    region: 'Камчатка',
    logo: '',
    description: 'Завод по переработке дикого лосося, структура SALMONICA.',
    site: '2gis.ru',
    isPlaceholder: false,
    gallery: []
  },
  // ...можешь добавить еще производителей по аналогии!
];

export default producers;
