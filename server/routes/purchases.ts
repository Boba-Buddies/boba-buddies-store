import { Router } from 'express'
import * as db from '../db/purchases'
import { logError } from '../logger'
const router = Router()

// GET /api/v1/purchases/latest-order/:userId
//db.getLatestOrderByUserId(userId : string)


//POST /api/v1/purchases
//db.addCartToPurchasesByUserId (userId : string, transferedCart : [{ productId : number, quantity : number, shippingId : number}])



//GET /api/v1/purchases/orders-by-date/:adminUserId/:date
//db.getAmountOfOrdersByDate(date : string (year-month-day), adminUserId : string)



//GET /api/v1/purchases/user-orders/:userId
//db.getOrdersByUserId(userId : string)




//GET /api/v1/purchases/:adminUserId
//db.getAllOrders(adminUserId : string)



//GET /api/v1/purchases/order
//db.getOrderByOrderId(orderId : number, adminUserId : string)