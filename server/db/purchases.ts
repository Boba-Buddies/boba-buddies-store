import { TransferedCart } from '../../models/Purchases'
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
    .orderBy('purchased_at', 'desc') // Order the rows by purchased_at in descending order (newest first)
    .first()

  return latestPurchase.order_id
}

export async function addCartToPurchasesByUserId(
  userId: string,
  transferedCart: TransferedCart,
) {
  const latestOrderId: number = await getLatestOrderId()
  const newOrderId: number = latestOrderId + 1
  const timestamp = db.fn.now() //get the current time

  //For each object inside transfered cart, insert it to the table, adding the timestamp and newOrderId to each one.
  const dataArray = transferedCart.map((purchase) => {
    return {
      ...purchase,
      user_id: userId,
      order_id: newOrderId,
      purchased_at: timestamp,
    }
  })

  await db('purchases').insert(dataArray)
  await clearCartByUserId(userId)
}

//Clear cart function (NOTE: WILL BE MOVED TO CART.TS AFTERWARDS)
export async function clearCartByUserId(userId: string) {
  await db('cart').where('user_id', userId).delete()
}

export async function getAmountOfOrdersByDate(
  date: string,
  adminUserId: string,
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
  //returns an array of objects, where each objects represents a summary of every order that looks like this:
  //{ userName : string, orderId : number, totalSale : number, purchasedAt : timestamp}
  //we will need use the user_id in the purchases table to link to auth0_id in the users table to get user_name
  //totalSale will need to be calculated by taking the product_id to get the price from the products table, then multiplying it by the quantity. That needs to be done for every purchase in an order linked by the same order_id, and then you need to add the total from each row in that order to get the totalSale.
  //since the purchased_at is the same in every row of the same order, we can just get it from the first purchase.

}