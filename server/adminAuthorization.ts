import { Request, Response, NextFunction } from 'express'
import { isUserAdmin } from './db/users'

const adminUserId = 'auth0|abc12345'

export async function authorizeAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!(await isUserAdmin(adminUserId))) {
      // directly use the hardcoded adminUserId
      res.status(401).json({ error: 'Unauthorized' })
      return // Just return without any value
    }
    next()
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
    return // Just return without any value
  }
}
