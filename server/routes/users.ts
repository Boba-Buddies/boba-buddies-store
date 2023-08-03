import express from 'express'

import * as db from '../db/users'
// import { validateAccessToken } from '../auth0'
import { logError } from '../logger'

const router = express.Router()

// GET /api/v1/users?userId=your_user_id_here

router.get('/', async (req, res) => {
  const userId = req.query.userId as string
  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' })
    }

    const user = await db.getUserById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get the data from the database' })
  }
})

// GET userName by userId
// http://localhost:5173/api/v1/users/username/user_id_here

router.get('/username/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' })
    }

    const userName = await db.getUserName(userId)
    if (!userName) {
      return res.status(404).json({ message: 'UserName not found' })
    }

    res.status(200).json(userName)
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get the data from the database' })
  }
})

// PATCH route to update the use details by user id
// http://localhost:5173/api/v1/users/edit/user_id_here

router.patch('/edit/:userId', async (req, res) => {
  const userId = req.params.userId
  const updatedUserDetails = req.body

  try {
    await db.updateUserDetailsById(userId, updatedUserDetails)
    res.status(200).json({ message: 'User details updated successfully' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to update user details' })
  }
})

// GET: checkIfUserExists(userId:string)
// http://localhost:5173/api/v1/users/check/user_id_here

router.post('/api/v1/user/check', async (req, res) => {
  try {
    const auth0Id = req.body.auth0Id

    const status = await db.checkIfUserExists(auth0Id)
    res.json(status)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to check if user exists' })
  }
})

export default router
