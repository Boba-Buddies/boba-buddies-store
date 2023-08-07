import db from './connection'
import { User, UpdateUser, NewUserBackend } from '../../models/Users'
const adminUserId = 'auth0|def67890'
const userId = 'auth0|abc12345'

export async function isUserAdmin(auth0Id : string) {
  const user = await db('users') // assuming the table name is 'users'
      .select('is_admin')
      .where('auth0_id', auth0Id)
      .first();

  if (!user) {
      throw new Error('User not found');
  }
  
  return user.is_admin === 1; // considering SQLite3 uses 1 for true and 0 for false
}


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
export async function checkIfUserExists(auth0Id: string) {
  const result = await db('users')
    .select('auth0_id')
    .where('auth0_id', auth0Id)
    .first()

  return !!result
}

// POST: addNewUser(newUser:Object)
export async function addUser(newUser: NewUserBackend) {
  return await db('users').insert({
    auth0_Id: newUser.auth0Id,
    first_name: newUser.firstName,
    last_name: newUser.lastName,
    user_name: newUser.userName,
    email_address: newUser.emailAddress,
  })
}
