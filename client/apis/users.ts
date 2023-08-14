import request from 'superagent'
import { User } from '../../models/Users'

const baseUrl = '/api/v1/users'

// export async function fetchUser() {
//   try {
//     const response = await request.get(`${baseUrl}`)
//     return response.body.users as User[]
//   } catch (error) {
//     console.error('An error occurred:', (error as Error).message)
//     return { error: (error as Error).message }
//   }
// }

export async function fetchUser() {
  try {
    const response = await request.get(`${baseUrl}`)
    const userData = response.body as User
    console.log(userData)
    return userData
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
