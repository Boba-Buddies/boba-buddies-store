import { Router } from 'express'
import * as db from '../db/purchases'
import { logError } from '../logger'
import { validateAccessToken } from '../auth0'
import { isUserAdmin } from '../db/users'
const router = Router()


//!CHANGE SCHEMA FOR REQ.BODY's, SO USERID DOESN'T NEED TO BE PASSED FROM THE FRONT END

//GET LATEST ORDER BY USER ID
//GET /api/v1/purchases/latest-order
router.get('/latest-order', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
  
  try {
    const orderId = await db.getLatestOrderIdByUserId(userId)
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
router.post('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
  try {
    const shippingId = req.body.shippingId as number
    const cartTransferInfo = { userId, shippingId }
    await db.addCartToPurchasesByUserId(cartTransferInfo)
    res.status(200).json({ message: 'Cart successfully added to purchases' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to add the cart to purchases' })
  }
})

//GET ALL ORDERS BY DATE
//GET /api/v1/purchases/orders-by-date/:date
//!ADMIN ONLY
router.get('/orders-by-date/:date', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (await isUserAdmin(userId)) {
    try {
      const amountOfOrders = await db.getAmountOfOrdersByDate(req.params.date)
      res.status(200).json({ amountOfOrders })
    } catch (error) {
      logError(error)
      res
        .status(500)
        .json({ message: 'Unable to get the amount of orders by date' })
    }
  } else {
      res.status(401).json({ message: 'user is not authorized as admin' })
    }
  
})

//GET ORDERS BY USER
//GET /api/v1/purchases/user-orders
router.get('/user-orders', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
  try {
    const orders = await db.getOrdersByUserId(userId)
    res.status(200).json({ orders })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to get user orders from database' })
  }
})

//GET ALL ORDERS
//GET /api/v1/purchases
//!ADMIN ONLY
router.get('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (await isUserAdmin(userId)) {
    try {
      const orders = await db.getAllOrders()
      res.status(200).json({ orders })
    } catch (error) {
      logError(error)
      res.status(500).json({ message: 'Unable to get all orders from database' })
    }
  } else {
      res.status(401).json({ message: 'user is not authorized as admin' })
    }
  
})

//GET ORDER BY ORDER ID
//GET /api/v1/purchases/order
//!ADMIN ONLY
router.get('/order/:orderId', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (await isUserAdmin(userId)) {
    try {
      const order = await db.getOrderByOrderId(req.params.orderId)
      res.status(200).json({ order })
    } catch (error) {
      logError(error)
      res
        .status(500)
        .json({ message: 'Unable to get order by orderId from database' })
    }
  } else {
      res.status(401).json({ message: 'user is not authorized as admin' })
    }

  
})

export default router
