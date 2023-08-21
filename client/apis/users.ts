import request from 'superagent'
import { UpdateUser } from '../../models/Users'
const baseUrl = '/api/v1/users'

export async function modifyUserDetails(updatedUser: UpdateUser) {
  try {
    await request.patch(`${baseUrl}/edit`).send(updatedUser)
  } catch (error) {
    console.error('Error modifying user details:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
