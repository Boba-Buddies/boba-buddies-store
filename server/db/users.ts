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
export async function getUserName(userId: string) {
  return await db('users')
    .where('auth0_id', userId)
    .first('user_name as userName')
}

// PATCH: updateUserDetailsById(updatedUserDetails: UpdateUser)
export async function updateUserDetailsById(
  userId: string,
  updatedUserDetails: UpdateUser,
) {
  await db('users').where('auth0_id', userId).update({
    first_name: updatedUserDetails.firstName,
    last_name: updatedUserDetails.lastName,
    phone_number: updatedUserDetails.phoneNumber,
    address: updatedUserDetails.address,
    city: updatedUserDetails.city,
    country: updatedUserDetails.country,
    zip_code: updatedUserDetails.zipCode,
  })
}

// GET: checkIfUserExists(userId:string)

// POST: addNewUser(newUser:Object)
