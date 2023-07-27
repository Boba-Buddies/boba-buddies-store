exports.seed = async function (knex) {
  await knex('products').insert([
    {
      id: 1,
      name: 'Pearl Milk Tea',
      img: '/images/pearl-milk-tea.svg',
      price: 7.5,
      description:
        'Pearl milk tea is a delightful and refreshing beverage blending black tea, milk, and chewy tapioca pearls, creating a creamy and enjoyable experience with every sip.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 2,
      name: 'Original Milk Tea',
      img: '/images/original-milk-tea.svg',
      price: 7,
      description:
        'Milk tea is a delightful and comforting beverage that combines the richness of black tea with the smoothness of milk, creating a harmonious blend that offers a soothing and enjoyable experience with every sip.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 3,
      name: 'Oolong Milk Tea',
      img: '/images/oolong-milk-tea.svg',
      price: 6.5,
      description:
        'Oolong milk tea is a delightful beverage that combines the intricate taste of oolong tea with creamy milk, creating a harmonious and satisfying drink.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.25,
    },
    {
      id: 4,
      name: 'Earl Grey Milk Tea',
      img: '/images/earl-grey-milk-tea.svg',
      price: 6.5,
      description:
        'Earl Grey milk tea is a delightful beverage that blends the distinctive flavor of Earl Grey tea with creamy milk, creating a harmonious and comforting drink.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 5,
      name: 'Brown Sugar Milk Tea and Pearls',
      img: '/images/brown-sugar-milk-tea-and-pearls.svg',
      price: 8.9,
      description:
        'Brown sugar milk tea is a delectable beverage made by combining aromatic black tea with rich brown sugar, creamy milk, and chewy tapioca pearls, resulting in a lusciously sweet and indulgent drink with delightful textural elements.',
      stock: 200,
      is_enabled: true,
      average_rating: 4,
    },
    {
      id: 6,
      name: 'Matcha Milk Tea',
      img: '/images/matcha-milk-tea.svg',
      price: 8,
      description:
        'A creamy fusion of Japanese matcha green tea and milk, offering a harmonious balance of earthy and sweet flavors.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.25,
    },
    {
      id: 7,
      name: 'Taro Milk Tea and pearls',
      img: '/images/taro-milk-tea-and-pearls.svg',
      price: 7.6,
      description:
        'Taro Milk Tea is a delightful blend of taro root, milk, and black tea, providing a unique and appealing purple-hued drink with a hint of nutty sweetness.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 8,
      name: 'Chocolate Milk Tea and pearls',
      img: '/images/chocolate-milk-tea-and-pearls.svg',
      price: 6.4,
      description:
        'Chocolate Milk Tea is a rich and indulgent combination of chocolate and black tea, creating a satisfying beverage for chocolate lovers.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.25,
    },
    {
      id: 9,
      name: 'Coffee Milk Tea',
      img: '/images/coffee-milk-tea.svg',
      price: 6.4,
      description:
        'The perfect marriage of robust coffee and milk tea, giving a delightful caffeine-infused twist to the classic drink.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.25,
    },
    {
      id: 10,
      name: 'Lychee Tea',
      img: '/images/lychee-tea.svg',
      price: 7,
      description:
        "A refreshing blend of fragrant lychee fruit and tea, offering a sweet and floral taste that's perfect for warm days.",
      stock: 200,
      is_enabled: true,
      average_rating: 4,
    },
    {
      id: 11,
      name: 'Green Tea',
      img: '/images/green-tea.svg',
      price: 5.99,
      description:
        'A classic and wholesome drink made from steeping green tea leaves, known for its fresh and grassy flavor.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.5,
    },
    {
      id: 12,
      name: 'Jasmine Tea',
      img: '/images/jasmine-tea.svg',
      price: 5.5,
      description:
        'A delicate and aromatic beverage made by infusing jasmine flowers with tea leaves, resulting in a soothing and floral taste.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 13,
      name: 'Kiwifruit Tea',
      img: '/images/kiwi-fruit-tea.svg',
      price: 7,
      description:
        'A zesty and revitalizing combination of kiwifruit and tea, providing a tangy and invigorating drink experience.',
      stock: 4,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 14,
      name: 'Wintermelon Drink',
      img: '/images/wintermelon-drink.svg',
      price: 7,
      description:
        'A cooling and lightly sweetened beverage made from wintermelon, delivering a refreshing choice for hot weather.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.5,
    },
    {
      id: 15,
      name: 'Honey Lemon Drink',
      img: '/images/honey-lemon-drink.svg',
      price: 7.5,
      description:
        'A revitalizing mix of honey and lemon in tea or water, offering a soothing and naturally sweet option.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 16,
      name: 'Red Dragon Fruit Juice',
      img: '/images/red-dragon-fruit-juice.svg',
      price: 8.6,
      description:
        'A vibrant and visually striking juice made from red dragon fruit, providing a refreshingly exotic and mildly sweet taste.',
      stock: 4,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 17,
      name: 'Purple Rice Yogurt',
      img: '/images/purple-rice-yogurt.svg',
      price: 7.8,
      description:
        'A creamy and wholesome drink featuring purple rice blended with yogurt, offering a unique and nutritious treat.',
      stock: 200,
      is_enabled: true,
      average_rating: 4,
    },
    {
      id: 18,
      name: 'Oreo Chocolate Smoothie',
      img: '/images/oreo-chocolate-smoothie.svg',
      price: 8.5,
      description:
        'An indulgent and creamy smoothie combining Oreo cookies and chocolate, delivering a rich and satisfying dessert-like drink.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.75,
    },
    {
      id: 19,
      name: 'Taro Smoothie',
      img: '/images/taro-smoothie.svg',
      price: 7.8,
      description:
        'A velvety smoothie crafted with taro root, resulting in a delightful and naturally purple beverage with a hint of sweetness.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.5,
    },
    {
      id: 20,
      name: 'Mango Smoothie',
      img: '/images/mango-smoothie.svg',
      price: 7.5,
      description:
        'A tropical and fruity delight made with ripe mangoes, presenting a lusciously sweet and refreshing option.',
      stock: 200,
      is_enabled: true,
      average_rating: 3.75,
    },
  ])
}
