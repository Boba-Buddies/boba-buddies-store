import request from 'superagent'
import { User } from '../../models/Users'

const baseUrl = '/api/v1/users'

export async function fetchUser() {
  try {
    const response = await request.get(`${baseUrl}`)
    return response.body.user as User
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
