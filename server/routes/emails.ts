import { Router } from 'express'
import * as db from '../db/emails'
import { logError } from '../logger'
import { newEmailSchema } from '../../models/Emails'
import { validateAccessToken } from '../auth0'
import { isUserAdmin } from '../db/users'

const router = Router()

//!ADMIN ONLY
router.get('/today', validateAccessToken, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10)

  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (await isUserAdmin(userId)) {
    try {
      const unreadNumber = await db.getAmountOfUnreadEmailsByDate(today)
      res.status(200).json(unreadNumber)
    } catch (error) {
      logError(error)
      res.status(500).json({ message: 'failed to get number of unread emails' })
    }
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})

//!ADMIN ONLY
router.get('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  if (await isUserAdmin(userId)) {
    try {
      const emails = await db.getAllEmails()
      res.status(200).json({ emails })
    } catch (error) {
      logError(error)
      res
        .status(500)
        .json({ message: 'failed to get emails data from database' })
    }
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})

//!ADMIN ONLY
router.get('/:id', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
  const emailId = Number(req.params.id)
  if (await isUserAdmin(userId)) {
    try {
      const email = await db.getEmailById(emailId)
      res.status(200).json({ email })
    } catch (error) {
      logError(error)
      res
        .status(500)
        .json({ message: 'failed to get emails data from database' })
    }
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})

router.post('/', validateAccessToken, async (req, res) => {
  const newEmail = req.body
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const result = newEmailSchema.safeParse(newEmail)

    if (!result.success) {
      res.status(400).json({ message: 'Please provide a valid email form' })
      return
    }

    await db.sendEmailByUserId(newEmail, userId)
    res.sendStatus(201)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to insert new email to database' })
  }
})

//!ADMIN ONLY
router.patch('/:id', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
  if (await isUserAdmin(userId)) {
    try {
      const id = Number(req.params.id)
      await db.updateEmailReadStatusById(id)
      res.sendStatus(200)
    } catch (error) {
      logError(error)
      res
        .status(500)
        .json({ message: 'Unable to update read status to database' })
    }
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})

//!ADMIN ONLY
router.delete('/:id', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub

  if (!userId) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }
  if (await isUserAdmin(userId)) {
    try {
      const id = Number(req.params.id)
      await db.deleteEmailById(id)
      res.sendStatus(200)
    } catch (error) {
      logError(error)
      res.status(500).json({ message: 'could not delete email' })
    }
  } else {
    res.status(401).json({ message: 'user is not authorized as admin' })
  }
})

export default router
