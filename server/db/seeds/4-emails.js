exports.seed = async function (knex) {
  await knex('emails').insert([
    {
      id: 1,
      user_id: 'auth0|abc12345',
      is_read: false,
      title: 'Appreciation for Great Service',
      description:
        "Dear Emma, I wanted to extend my gratitude for the excellent service I received from your team. My order arrived on July 25, 2023, and I'm delighted with the products' quality. The entire shopping experience was smooth and enjoyable. Thank you for providing outstanding service! Best regards, Emma Johnson",
      created_at: '2023-07-25 9:30:00',
    },
    {
      id: 2,
      user_id: 'auth0|def67890',
      is_read: false,
      title: 'Great Customer Service',
      description:
        'Hello Customer Support, I just wanted to take a moment to commend your excellent customer service. I had an issue with my order, and your team was quick to respond and resolve it. The support representative was friendly and helpful, making the whole process stress-free. Thank you for going above and beyond to assist me. Regards, Liam Smith',
      created_at: '2023-07-20 14:20:00',
    },
    {
      id: 3,
      user_id: 'auth0|xyz45678',
      is_read: false,
      title: 'Product Inquiry',
      description:
        'Hi there, I have a question about one of the products I recently ordered. I received my order on July 22, 2023, and everything looks great except for one item. It seems to be a different variant from what I expected. Could you please clarify this for me? Thank you, Olivia Williams',
      created_at: '2023-07-22 11:10:00',
    },
    {
      id: 4,
      user_id: 'auth0|pqr98765',
      is_read: false,
      title: 'Inquiry About Return',
      description:
        'Hi, I hope you can help me with a return inquiry. I received my order on July 23, 2023, and unfortunately, one of the products is not suitable for my needs. I would like to initiate a return and get a refund. Could you please guide me through the return process? Thanks, Noah Jones',
      created_at: '2023-07-23 15:20:00',
    },
    {
      id: 5,
      user_id: 'auth0|lmn65432',
      is_read: false,
      title: 'Order Delay',
      description:
        "Hello, I'm reaching out about my recent order, which was supposed to arrive on July 24, 2023. Unfortunately, it seems to be delayed, and I haven't received it yet. Can you please check the status and update me? Thank you, Ava Brown",
      created_at: '2023-07-24 18:05:00',
    },
    {
      id: 6,
      user_id: 'auth0|ghi32109',
      is_read: false,
      title: 'Excellent Product Packaging',
      description:
        'Hello, I wanted to express my appreciation for the excellent packaging of my recent order. I received the items on July 30, 2023, and they were all securely packed, ensuring they arrived in perfect condition. Thank you for taking care of the packaging to ensure a great customer experience. Best regards, Oliver Taylor',
      created_at: '2023-07-30 8:45:00',
    },
    {
      id: 7,
      user_id: 'auth0|uvw54321',
      is_read: false,
      title: 'Feedback on Delivery',
      description:
        "Dear Support Team, I received my order on July 29, 2023, and I'm satisfied with the products' quality. However, I noticed that one of the items was missing from the package. Could you please investigate this and arrange for the missing item to be sent to me? Thank you, Isla Davis",
      created_at: '2023-07-29 16:30:00',
    },
    {
      id: 8,
      user_id: 'auth0|hij23456',
      is_read: false,
      title: 'Disappointed with Product',
      description:
        "Hello, I'm writing to express my disappointment with one of the products I ordered. The item I received on July 28, 2023, does not meet my expectations in terms of quality. I would like to request a refund for this product. Kindly assist me with the return process. Regards, Jack Evans",
      created_at: '2023-07-28 13:50:00',
    },
    {
      id: 9,
      user_id: 'auth0|klm78901',
      is_read: false,
      title: 'Positive Feedback',
      description:
        'Hello Team, I just wanted to drop a quick note to express my satisfaction with my recent purchase. The products I received on July 31, 2023, are of excellent quality, and the shipping was faster than expected. I am impressed with the overall shopping experience. Keep up the good work! Best regards, Charlotte Wilson',
      created_at: '2023-07-31 12:40:00',
    },
    {
      id: 10,
      user_id: 'auth0|bcd34567',
      is_read: false,
      title: 'Issue with Order',
      description:
        "Hi, I hope you can help me with an issue I encountered with my order. The products I received on July 26, 2023, were in good condition, but I didn't receive the correct quantity for one of the items. Can you please assist me in resolving this? Thank you, Leo Moore",
      created_at: '2023-07-26 9:15:00',
    },
    {
      id: 11,
      user_id: 'auth0|abc12345',
      is_read: false,
      title: 'Praise for Fast Shipping',
      description:
        "Dear Emma, I'm writing to let you know that I'm impressed with the fast shipping of my recent order. The products arrived on July 27, 2023, and everything is as expected. Thank you for the excellent service! Best regards, Emma Johnson",
      created_at: '2023-07-27 14:55:00',
    },
    {
      id: 12,
      user_id: 'auth0|def67890',
      is_read: false,
      title: 'Positive Review',
      description:
        'Hello, I just wanted to leave a positive review for the products I purchased. The order was delivered on July 23, 2023, and the quality of the items exceeded my expectations. I will definitely recommend your store to my friends. Thank you, Liam Smith',
      created_at: '2023-07-23 11:30:00',
    },
    {
      id: 13,
      user_id: 'auth0|xyz45678',
      is_read: false,
      title: 'Complaint About Damaged Product',
      description:
        "Hi, I received my order on July 22, 2023, and unfortunately, one of the items arrived damaged. The product's packaging seemed intact, so it might have occurred during shipping. Can you please assist me with a replacement? Thanks, Olivia Williams",
      created_at: '2023-07-22 16:20:00',
    },
    {
      id: 14,
      user_id: 'auth0|uvw54321',
      is_read: false,
      title: 'Issue with Payment',
      description:
        "Dear Support, I'm having trouble with my recent order payment. I placed the order on July 29, 2023, but my card was charged twice for the same purchase. Kindly rectify this issue and refund the extra amount. Best regards, Isla Davis",
      created_at: '2023-07-29 9:45:00',
    },
    {
      id: 15,
      user_id: 'auth0|hij23456',
      is_read: false,
      title: 'Great Product Variety',
      description:
        "Hello, I'm delighted with the wide variety of products available in your store. I made a purchase on July 28, 2023, and I'm happy with the items' quality. Your store has become my go-to for tea and beverage needs. Thank you, Jack Evans",
      created_at: '2023-07-28 19:35:00',
    },
  ])
}
