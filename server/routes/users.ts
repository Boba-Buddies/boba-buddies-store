import express from 'express'

import * as db from '../db/users'
// import { validateAccessToken } from '../auth0'
import { logError } from '../logger'

const router = express.Router()

// GET /api/v1/users/?userId=your_user_id_here

router.get('/', async (req, res) => {
  const userId = req.query.userId as string
  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' })
    }

    const user = await db.getUserById(userId)
    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get the data from the database' })
  }
})

export default router
