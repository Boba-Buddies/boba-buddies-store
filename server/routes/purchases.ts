import { Router } from 'express'
import * as db from '../db/purchases'
import { logError } from '../logger'
const router = Router()

//GET LATEST ORDER BY USER ID
//GET /api/v1/purchases/latest-order/:userId
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

//TRANSFER USER'S CART TO PURCHASES
//POST /api/v1/purchases
router.post('/', async (req, res) => {
  try {
    await db.addCartToPurchasesByUserId(req.body)
    res.status(200).json({ message: 'Cart successfully added to purchases' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to add the cart to purchases' })
  }
})

//GET ALL ORDERS BY DATE
//GET /api/v1/purchases/orders-by-date/:adminUserId/:date
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

//GET ORDERS BY USER
//GET /api/v1/purchases/user-orders/:userId
router.get('/user-orders/:userId', async (req, res) => {
  try {
    const orders = await db.getOrdersByUserId(req.params.userId)
    res.status(200).json({ orders })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get user orders from database' })
  }
})

//GET ALL ORDERS
//GET /api/v1/purchases/:adminUserId
router.get('/:adminUserId', async (req, res) => {
  try {
    const orders = await db.getAllOrders(req.params.adminUserId)
    res.status(200).json({ orders })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get all orders from database' })
  }
})

//GET ORDER BY ORDER ID
//GET /api/v1/purchases/order
router.get('/order/:adminUserId/:orderId', async (req, res) => {
  try {
    const order = await db.getOrderByOrderId(
      req.params.adminUserId,
      req.params.orderId,
    )
    res.status(200).json({ order })
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get order by orderId from database' })
  }
})

export default router
