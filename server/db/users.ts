import db from './connection'
import { User, UpdateUser, NewUser, NewUserBackend } from '../../models/Users'

//GET: getUserById(userId : string)

export async function getUserById(userId: string) {
  return (await db('users')
    .where('auth0_id', userId)
    .first(
      'auth0_id as userId',
      'first_name as firstName',
      'last_name as lastName',
      'user_name as userName',
      'phone_number as phoneNumber',
      'email_address as emailAddress',
      'address',
      'city',
      'country',
      'zip_code as zipCode',
    )) as User
}

//GET: getUserNameById(userId: string)
