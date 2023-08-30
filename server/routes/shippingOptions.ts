import { Router } from 'express'
import * as db from '../db/shippingOptions'
import { logError } from '../logger'
import { validateAccessToken } from '../auth0'
const router = Router()


// GET /api/v1/shippings/
router.get('/', validateAccessToken, async (req, res) => {
  try {
    const shippingOptions = await db.getAllShippingOptions()
    res.status(200).json({ shippingOptions })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to ge the data from database' })
  }
})

export default router
