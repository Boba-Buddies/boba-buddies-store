import { Router } from 'express'
import * as db from '../db/emails'
import { logError } from '../logger'

const router = Router()


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

// router.post()

//router.patch()





export default router