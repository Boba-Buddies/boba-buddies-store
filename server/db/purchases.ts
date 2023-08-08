import { CartTransferInfo } from '../../models/Cart'
import db from './connection'

export async function getLatestOrderIdByUserId(userId: string) {
  const latestPurchase = await db('purchases')
    .where('user_id', userId)
    .orderBy('purchased_at', 'desc') // Order the rows by purchased_at in descending order (newest first)
    .first()

  return latestPurchase.order_id
}

export async function getLatestOrderId() {
  const latestPurchase = await db('purchases')
    .orderBy('order_id', 'desc')
    .first()

  return latestPurchase.order_id
}

export async function addCartToPurchasesByUserId(
  cartTransferInfo: CartTransferInfo,
) {
  const { userId, shippingId } = cartTransferInfo
  const newOrderId = (await getLatestOrderId()) + 1

  const cart = await db('cart')
    .where('user_id', userId)
    .select('user_id', 'product_id', 'quantity')
  //For each object inside transfered cart, add the newOrderId to each one.
  const newPurchases = cart.map((purchase) => {
    return {
      ...purchase,
      order_id: newOrderId,
      shipping_id: shippingId,
    }
  })

  await db('purchases').insert(newPurchases)
  await clearCartByUserId(userId)
}

//Clear cart function (NOTE: WILL BE MOVED TO CART.TS AFTERWARDS)
export async function clearCartByUserId(userId: string) {
  await db('cart').where('user_id', userId).delete()
}

export async function getAmountOfOrdersByDate(
  date: string,
) {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  // Retrieve the total amount of unique order_id on the given date
  const totalOrders = await db('purchases')
    .whereRaw('DATE(purchased_at) = ?', date)
    .countDistinct('order_id as totalOrders')
    .first()

  // Extract the count from the result object and convert it to a number
  if (totalOrders !== undefined) {
    const amountOfOrders = Number(totalOrders.totalOrders)
    return amountOfOrders
  }

  return 0
}

export async function getOrdersByUserId(userId: string) {
  const userOrders = await db('purchases')
    .join('products', 'purchases.product_id', 'products.id')
    .where('purchases.user_id', userId)
    .select(
      'purchases.order_id as orderId',
      'purchases.purchased_at as purchasedAt',
      db.raw('SUM(products.price * purchases.quantity) as totalAmount'),
    )
    .groupBy('purchases.order_id', 'purchases.purchased_at')
    .orderBy('purchases.purchased_at', 'desc')

  return userOrders
}

export async function getAllOrders() {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  const orders = await db('purchases')
    .join('users', 'purchases.user_id', 'users.auth0_id')
    .join('products', 'purchases.product_id', 'products.id')
    .select(
      'users.user_name as userName',
      'purchases.order_id as orderId',
      db.raw('ROUND(SUM(products.price * purchases.quantity), 2) as totalSale'),
      db.raw('MIN(purchases.purchased_at) as purchasedAt'),
    )
    .groupBy('users.user_name', 'purchases.order_id')
    .orderBy('purchases.order_id', 'desc')

  return orders
}

export async function getOrderByOrderId( orderId: string) {
  //Check if user is authorised. If they are not:
  //return "User is not authorized"

  const order = await db('purchases')
    .where('purchases.order_id', orderId)
    .join('users', 'purchases.user_id', '=', 'users.auth0_id')
    .join('products', 'purchases.product_id', '=', 'products.id')
    .join(
      'shipping_options',
      'purchases.shipping_id',
      '=',
      'shipping_options.id',
    )
    .select(
      'purchases.order_id as orderId',
      'users.first_name as userFirstName',
      'users.last_name as userLastName',
      'users.address as userAddress',
      'users.city as userCity',
      'users.country as userCountry',
      'users.zip_code as userZipCode',
      'users.email_address as userEmail',
      'users.phone_number as userPhoneNumber',
      'purchases.purchased_at as orderDate',
      'shipping_options.shipping_type as shippingType',
      'shipping_options.price as shippingPrice',
      db.raw(`ROUND(SUM(purchases.quantity * products.price), 2) as totalSale`),
      db.raw(`SUM(purchases.quantity) as amountOfItems`),
      db.raw(
        `GROUP_CONCAT(json_object('productName', products.name, 'productSale', (purchases.quantity * products.price), 'productImage', products.image, 'itemQuantity', purchases.quantity)) as orderItems`,
      ),
    )
    .groupBy(
      'purchases.order_id',
      'users.first_name',
      'users.last_name',
      'users.address',
      'users.city',
      'users.country',
      'users.zip_code',
      'users.email_address',
      'users.phone_number',
      'purchases.purchased_at',
      'shipping_options.shipping_type',
      'shipping_options.price',
    )
    .first()

  if (order) {
    order.orderItems = JSON.parse(`[${order.orderItems}]`)
  }

  return order
}
