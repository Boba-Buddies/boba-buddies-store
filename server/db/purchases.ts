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


export async function getOrdersByUserId(userId : string) {
  //returns an array of objects.
  //Each object represents an order from the given userId that looks like this:  {orderId : number,  purchasedAt : string, totalAmount : number }
  //the totalAmount would be calculated here, by taking the product_id to access the price of the associated product in the products table, and multiplying it by the quantity in the purchase row. And then adding all the purchase rows that are linked together by the same order_id. 
  //Since the purchased_at is the same for each purchase that is in the same order, we can just take the first purchased_at value in each order.
}