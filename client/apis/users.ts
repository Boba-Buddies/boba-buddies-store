import request from 'superagent'
import { UpdateUser, User } from '../../models/Users'

const baseUrl = '/api/v1/users'

export async function fetchUser() {
  try {
    const response = await request.get(`${baseUrl}`)
    const userData = response.body as User
    return userData
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function updateUserDetails(updatedUserDetails: UpdateUser) {
  request
    .patch(`${baseUrl}/edit-profile`)
    .send(updatedUserDetails)
    .then((response) => {
      if (response.status === 200) {
        console.log('User details updated successfully')
      } else {
        console.error('Unable to update user details')
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error)
    })
}
