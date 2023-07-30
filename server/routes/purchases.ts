import { Router } from 'express'
import * as db from '../db/purchases'
import { logError } from '../logger'
const router = Router()

//TESTED - WORKING
// GET /api/v1/purchases/latest-order/:userId
//db.getLatestOrderByUserId(userId : string)
router.get('/latest-order/:userId', async (req, res) => {
  try {
    const orderId = await db.getLatestOrderIdByUserId(req.params.userId)
    res.status(200).json({ orderId })
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get the latest order from database' })
  }
})


//POST /api/v1/purchases
//db.addCartToPurchasesByUserId (userId : string, transferedCart : [{ productId : number, quantity : number, shippingId : number}])
router.post('/', async (req, res) => {
  try {
    await db.addCartToPurchasesByUserId(
      req.body.userId,
      req.body.transferedCart,
    )
    res.status(200).json({ message: 'Cart successfully added to purchases' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to add the cart to purchases' })
  }
})

//TESTED - WORKING
//GET /api/v1/purchases/orders-by-date/:adminUserId/:date
//db.getAmountOfOrdersByDate(date : string (year-month-day), adminUserId : string)
router.get('/orders-by-date/:adminUserId/:date', async (req, res) => {
  try {
    const amountOfOrders = await db.getAmountOfOrdersByDate(
      req.params.date,
      req.params.adminUserId,
    )
    res.status(200).json({ amountOfOrders })
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get the amount of orders by date' })
  }
})

//TESTED - WORKING
//GET /api/v1/purchases/user-orders/:userId
//db.getOrdersByUserId(userId : string)
router.get('/user-orders/:userId', async (req, res) => {
  try {
    const orders = await db.getOrdersByUserId(req.params.userId)
    res.status(200).json({ orders })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get user orders from database' })
  }
})

//TESTED - WORKING
//GET /api/v1/purchases/:adminUserId
//db.getAllOrders(adminUserId : string)
router.get('/:adminUserId', async (req, res) => {
  try {
    const orders = await db.getAllOrders(req.params.adminUserId)
    res.status(200).json({ orders })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get all orders from database' })
  }
})

//GET /api/v1/purchases/order
//db.getOrderByOrderId(orderId : number, adminUserId : string)
router.get('/order/:orderId', async (req, res) => {
  try {
    const order = await db.getOrderByOrderId(Number(req.params.orderId))
    res.status(200).json({ order })
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get order by orderId from database' })
  }
})

export default router
