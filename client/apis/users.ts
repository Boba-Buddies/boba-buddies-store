import request from 'superagent'
import { UpdateUser, User } from '../../models/Users'

const baseUrl = '/api/v1/users'

export async function fetchUser(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${token}`)

    const userData = response.body as User
    console.log('API Response Data:', userData)

    return userData
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchIsUserAdmin(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/isAdmin`)
      .set('Authorization', `Bearer ${token}`)

    const isAdmin: boolean = response.body
    return isAdmin
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function modifyUserDetails(
  updatedUser: UpdateUser,
  token: string,
) {
  try {
    await request
      .patch(`${baseUrl}/edit`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
  } catch (error) {
    console.error('Error modifying user details:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
