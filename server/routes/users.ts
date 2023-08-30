import express from 'express'
import * as db from '../db/users'
import { logError } from '../logger'
import { validateAccessToken } from '../auth0'

const router = express.Router()

// GET /api/v1/users/isAdmin
router.get('/isAdmin', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
  try {
    const isAdmin = await db.isUserAdmin(userId)
    return res.status(200).json(isAdmin)
  } catch (error) {
    res.status(400).json({ error })
  }
})

// GET /api/v1/users

router.get('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
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
// /api/v1/users/username

router.get('/username', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
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
// /api/v1/users/edit

router.patch('/edit', validateAccessToken, async (req, res) => {
  const updatedUserDetails = req.body

  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    await db.updateUserDetailsById(userId, updatedUserDetails)
    res.status(200).json({ message: 'User details updated successfully' })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to update user details' })
  }
})

// GET: checkIfUserExists(userId:string)
// /api/v1/users/check

router.get('/check', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
  try {
    const userExists = await db.checkIfUserExists(userId)
    res.json(userExists)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to check if user exists' })
  }
})

// POST : addUser
// /api/v1/users
router.post('/', validateAccessToken, async (req, res) => {
  try {
    const userId = req.auth?.payload.sub

    if (!userId) {
      res.status(400).json({ message: 'Please provide an id' })
      return
    }
    const newUser = req.body

    await db.addUser(newUser)

    res.sendStatus(200)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to add new user' })
  }
})

// {
//   "auth0Id": "auth0|1234chicken",
//   "firstName": "Chicken",
//   "lastName": "Leg",
//   "userName": "chicken.leg",
//   "emailAddress": "chicken@gmail.com"
// }

export default router
