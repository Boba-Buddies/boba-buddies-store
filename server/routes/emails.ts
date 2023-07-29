import { Router } from 'express'
import * as db from '../db/emails'
import { logError } from '../logger'
import { newEmailSchema } from '../../models/Emails'

const router = Router()

router.get('/today', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10)

  try {
    const unreadNumber = await db.getAmountOfUnreadEmailsByDate(today)
    res.status(200).json(unreadNumber)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'failed to get number of unread emails' })
  }
})

router.get('/', async (req, res) => {
  // check auth0_id, if it has admin access
  try {
    const emails = await db.getAllEmails()
    res.status(200).json({ emails })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'failed to get emails data from database' })
  }
})

router.get('/:id', async (req, res) => {
  // check auth0_id, if it has admin access
  const emailId = Number(req.params.id)
  try {
    const email = await db.getEmailById(emailId)
    res.status(200).json({ email })
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'failed to get emails data from database' })
  }
})

router.post('/', async (req, res) => {
  // check if it is logged in, has to be singed in to send the email.

  const userId = 'auth0|abc12345' // replace this with actual user_id from authentication

  const newEmail = req.body

  try {
    const result = newEmailSchema.safeParse(newEmail)

    if (!result.success) {
      res.status(400).json({ message: 'Please provide a valid email form' })
      return
    }

    await db.sendEmailByUserId(newEmail, userId)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to insert new email to database' })
  }
})


router.patch('/:id', async (req, res) => {
  // check if it is logged in, has to be singed in as admin to read the email.
  try {
    const id = Number(req.params.id)
    await db.updateEmailReadStatusById(id)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: 'Unable to update read status to database' })
  }
})



export default router