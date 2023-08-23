import request from 'superagent'
import { NewEmail } from '../../models/Emails'

const rootUrl = '/api/v1'

// export function fetchAllEmails() {
//   return request.get(rootUrl + '/emails').then((res) => { return res.body })
// }

// OR

export async function fetchAllEmails() {
  try {
    const res = await request.get(rootUrl + '/emails')
    return res.body
  } catch (error) {
    console.error('Error fetching all emails:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

export async function createNewEmail(newEmail: NewEmail) {
  try {
    await request.post(rootUrl + '/emails').send(newEmail)
  } catch (error) {
    console.error('Error creating new email:', (error as Error).message)
    return { error: (error as Error).message }
  }
}