// seed_reviews.js

exports.seed = async function (knex) {
  await knex('reviews').insert([
    {
      id: 1,
      product_id: 1,
      description: 'Absolutely love the Pearl Milk Tea!',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|abc12345',
      created_at: '2023-07-21 9:15:00',
    },
    {
      id: 2,
      product_id: 1,
      description: 'The Pearl Milk Tea was disappointing.',
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|def67890',
      created_at: '2023-07-20 14:30:00',
    },
    {
      id: 3,
      product_id: 2,
      description: 'The Original Milk Tea is a classic favorite!',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|xyz45678',
      created_at: '2023-07-19 11:45:00',
    },
    {
      id: 4,
      product_id: 2,
      description: 'I found the Original Milk Tea a bit bland.',
      rating: 3,
      is_enabled: true,
      user_id: 'auth0|pqr98765',
      created_at: '2023-07-18 16:00:00',
    },
    {
      id: 5,
      product_id: 3,
      description: 'Oolong Milk Tea has a unique taste that I love!',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|lmn65432',
      created_at: '2023-07-17 10:20:00',
    },
    {
      id: 6,
      product_id: 3,
      description: "Oolong Milk Tea wasn't for me.",
      rating: 2,
      is_enabled: true,
      user_id: 'auth0|ghi32109',
      created_at: '2023-07-16 12:40:00',
    },
    {
      id: 7,
      product_id: 4,
      description: 'The Earl Grey Milk Tea is divine!',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|uvw54321',
      created_at: '2023-07-15 8:10:00',
    },
    {
      id: 8,
      product_id: 4,
      description: 'Not a fan of the Earl Grey Milk Tea.',
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|hij23456',
      created_at: '2023-07-14 17:50:00',
    },
    {
      id: 9,
      product_id: 5,
      description: 'Brown Sugar Milk Tea is a must-try!',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|klm78901',
      created_at: '2023-07-13 13:25:00',
    },
    {
      id: 10,
      product_id: 5,
      description: 'The Brown Sugar Milk Tea was overly sweet for me.',
      rating: 3,
      is_enabled: true,
      user_id: 'auth0|bcd34567',
      created_at: '2023-07-12 9:55:00',
    },
    {
      id: 11,
      product_id: 6,
      description: 'Matcha Milk Tea is a match(a) made in heaven!',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|abc12345',
      created_at: '2023-07-21 9:15:00',
    },
    {
      id: 12,
      product_id: 6,
      description: "I'm not a fan of the Matcha Milk Tea.",
      rating: 2,
      is_enabled: true,
      user_id: 'auth0|def67890',
      created_at: '2023-07-20 14:30:00',
    },
    {
      id: 13,
      product_id: 7,
      description: 'Taro Milk Tea is unique and tasty!',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|xyz45678',
      created_at: '2023-07-19 11:45:00',
    },
    {
      id: 14,
      product_id: 7,
      description: "The Taro Milk Tea wasn't what I expected.",
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|pqr98765',
      created_at: '2023-07-18 16:00:00',
    },
    {
      id: 15,
      product_id: 8,
      description: 'Chocolate Milk Tea is a delightful treat!',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|lmn65432',
      created_at: '2023-07-17 10:20:00',
    },
    {
      id: 16,
      product_id: 8,
      description: "I didn't enjoy the Chocolate Milk Tea.",
      rating: 2,
      is_enabled: true,
      user_id: 'auth0|ghi32109',
      created_at: '2023-07-16 12:40:00',
    },
    {
      id: 17,
      product_id: 9,
      description: 'Coffee Milk Tea is a genius combo!',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|uvw54321',
      created_at: '2023-07-15 8:10:00',
    },
    {
      id: 18,
      product_id: 9,
      description: 'Coffee Milk Tea was a miss for me.',
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|hij23456',
      created_at: '2023-07-14 17:50:00',
    },
    {
      id: 19,
      product_id: 10,
      description: 'Lychee Tea is so refreshing!',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|klm78901',
      created_at: '2023-07-13 13:25:00',
    },
    {
      id: 20,
      product_id: 10,
      description: 'The Lychee Tea was too sweet for my liking.',
      rating: 3,
      is_enabled: true,
      user_id: 'auth0|bcd34567',
      created_at: '2023-07-12 9:55:00',
    },
    {
      id: 21,
      product_id: 11,
      description: 'Green Tea has a refreshing and light flavor.',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|abc12345',
      created_at: '2023-07-21 9:15:00',
    },
    {
      id: 22,
      product_id: 11,
      description: 'Not a fan of the Green Tea taste.',
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|def67890',
      created_at: '2023-07-20 14:30:00',
    },
    {
      id: 23,
      product_id: 12,
      description: 'Jasmine Tea has a lovely floral aroma.',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|xyz45678',
      created_at: '2023-07-19 11:45:00',
    },
    {
      id: 24,
      product_id: 12,
      description: 'I find the Jasmine Tea too fragrant for my taste.',
      rating: 3,
      is_enabled: true,
      user_id: 'auth0|pqr98765',
      created_at: '2023-07-18 16:00:00',
    },
    {
      id: 25,
      product_id: 13,
      description: 'Kiwifruit Tea is delicious! Tastes like real kiwifruit!',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|lmn65432',
      created_at: '2023-07-17 10:20:00',
    },
    {
      id: 26,
      product_id: 13,
      description: 'The Kiwifruit Tea was too tangy for me.',
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|ghi32109',
      created_at: '2023-07-16 12:40:00',
    },
    {
      id: 27,
      product_id: 14,
      description: 'Wintermelon Drink is so refreshing!',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|uvw54321',
      created_at: '2023-07-15 8:10:00',
    },
    {
      id: 28,
      product_id: 14,
      description: 'The Wintermelon Drink lacked sweetness.',
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|hij23456',
      created_at: '2023-07-14 17:50:00',
    },
    {
      id: 29,
      product_id: 15,
      description: 'Honey Lemon Drink is a soothing option.',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|klm78901',
      created_at: '2023-07-13 13:25:00',
    },
    {
      id: 30,
      product_id: 15,
      description: 'The Honey Lemon Drink was too sweet for me.',
      rating: 3,
      is_enabled: true,
      user_id: 'auth0|bcd34567',
      created_at: '2023-07-12 9:55:00',
    },
    {
      id: 31,
      product_id: 16,
      description: 'Red Dragon Fruit Juice is vibrant and exotic.',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|abc12345',
      created_at: '2023-07-21 9:15:00',
    },
    {
      id: 32,
      product_id: 16,
      description: 'I found the Red Dragon Fruit Juice bland.',
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|def67890',
      created_at: '2023-07-20 14:30:00',
    },
    {
      id: 33,
      product_id: 17,
      description: 'Purple Rice Yogurt is a unique and creamy delight.',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|xyz45678',
      created_at: '2023-07-19 11:45:00',
    },
    {
      id: 34,
      product_id: 17,
      description: 'The Purple Rice Yogurt was too thick for me.',
      rating: 3,
      is_enabled: true,
      user_id: 'auth0|pqr98765',
      created_at: '2023-07-18 16:00:00',
    },
    {
      id: 35,
      product_id: 18,
      description: 'Oreo Chocolate Smoothie is a decadent treat.',
      rating: 5,
      is_enabled: true,
      user_id: 'auth0|lmn65432',
      created_at: '2023-07-17 10:20:00',
    },
    {
      id: 36,
      product_id: 18,
      description: 'The Oreo Chocolate Smoothie lacked flavor.',
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|ghi32109',
      created_at: '2023-07-16 12:40:00',
    },
    {
      id: 37,
      product_id: 19,
      description: 'Taro Smoothie is a creamy and purple delight.',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|uvw54321',
      created_at: '2023-07-15 8:10:00',
    },
    {
      id: 38,
      product_id: 19,
      description: "The Taro Smoothie wasn't my cup of tea.",
      rating: 2.5,
      is_enabled: true,
      user_id: 'auth0|hij23456',
      created_at: '2023-07-14 17:50:00',
    },
    {
      id: 39,
      product_id: 20,
      description: 'Mango Smoothie is a tropical and refreshing choice.',
      rating: 4.5,
      is_enabled: true,
      user_id: 'auth0|klm78901',
      created_at: '2023-07-13 13:25:00',
    },
    {
      id: 40,
      product_id: 20,
      description: 'The Mango Smoothie was too pulpy for me.',
      rating: 3,
      is_enabled: true,
      user_id: 'auth0|bcd34567',
      created_at: '2023-07-12 9:55:00',
    },
  ])
}
