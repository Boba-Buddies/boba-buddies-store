import request from 'superagent'
import { NewEmail, UpdateEmailReadStatus } from '../../models/Emails'

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
    return res.body.emails
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

// fetchEmailbyToday

export async function fetchAmountOfUnreadEmailsByToday(token: string) {
  try {
    const response = await request
      .get(`${rootUrl}/emails/today`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    return response.body.unreadEmailCount
  } catch (error) {
    console.error('Error fetching user email', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//fetchEmailbyId
export async function fetchEmailById(token: string, emailId: number) {
  try {
    const response = await request
      .get(`${rootUrl}/emails/${emailId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    return response.body.email
  } catch (error) {
    console.error(
      'Error fetching user email by email id',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

//modifyEmailStatus

export async function modifyEmailById(
  token: string,
  emailId: number,
  updatedEmailStatus: UpdateEmailReadStatus,
) {
  try {
    const response = await request
      .patch(`${rootUrl}/emails/${emailId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(updatedEmailStatus)

    return response.body
  } catch (error) {
    console.error(
      'Error updating user email status by email id',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}
