const producers = [
  {
    id: 1,
    name: 'ООО "Корякморепродукт"',
    region: 'Камчатка',
    logo: '/images/koryak.webp',
    description: 'ООО «Корякморепродукт» — один из крупнейших рыбопромышленных холдингов Камчатского края.',
    site: 'https://koryakmoreprodukt.ru/',
    isPlaceholder: false,
    address: "683017, Россия, Камчатский край, г. Петропавловск-Камчатский, проспект Рыбаков, д. 32, офис 312",
    contacts: {
      phone: "+7 (4152) 20-10-02",
      email: "kmp-office@bk.ru"
    },
    categories: ["Икра", "Рыба", "Морепродукты"],
    badges: ["Проверенный", "Честный знак", "Меркурий"],
    gallery: ["/images/koryak.webp"],
    fullDescription: "Полный цикл добычи и переработки водных биоресурсов..."
  },
  {
    id: 6,
    name: 'ООО "Фирма Жупанова"',
    region: 'Камчатка',
    logo: '/images/zhupanova.webp',
    description: 'Промысел и производство лососевой рыбы и икры. Основано в 1996 г.',
    site: '',
    isPlaceholder: false,
    address: "Юридический адрес: Камчатский край, г. Елизово, ул. Сопочная, 13. Офис: г. Петропавловск-Камчатский, ул. Ларина, 38, оф. 66",
    contacts: {
      "Петропавловск-Камчатский": "8-961-965-35-95",
      "Владивосток": "8-914-705-19-10"
    },
    categories: ["Икра лососевая", "Мороженая рыба"],
    badges: [],
    gallery: ["/images/zhupanova.webp"],
    fullDescription: "ООО Фирма «Жупанова» основано в 1996 году, расположено на Восточном побережье Камчатки. Компания занимается промыслом рыбы лососевых пород, имеет собственные рыболовные участки и завод по производству мороженной рыбопродукции и солёной икры. Юридический адрес: Камчатский край, г. Елизово, ул. Сопочная, 13. Офис: г. Петропавловск-Камчатский, ул. Ларина, 38, оф. 66. Телефоны: Петропавловск-Камчатский 8-961-965-35-95, Владивосток 8-914-705-19-10."
  },
  // ...другие заводы по желанию
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: 100 + i,
    name: 'Место свободно',
    region: 'Камчатка',
    logo: '',
    description: '',
    site: '',
    isPlaceholder: true,
  }))
];

export default producers;
