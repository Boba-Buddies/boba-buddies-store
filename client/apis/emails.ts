import request from 'superagent'
import { NewEmail } from '../../models/Emails'

const rootUrl = '/api/v1'

// export function fetchAllEmails() {
//   return request.get(rootUrl + '/emails').then((res) => { return res.body })
// }

// OR

export async function fetchAllEmails(token: string) {
  try {
    const res = await request
      .get(rootUrl + '/emails')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return res.body
  } catch (error) {
    console.error('Error fetching all emails:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

export async function createNewEmail(newEmail: NewEmail, token: string) {
  try {
    await request
      .post(rootUrl + '/emails')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(newEmail)
  } catch (error) {
    console.error('Error creating new email:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
