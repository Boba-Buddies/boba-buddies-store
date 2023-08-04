import { Emails, Email, NewEmail } from '../../models/Emails'
import db from './connection'

// GET: getAllEmails()
export async function getAllEmails() {
  return (await db('emails')
    .join('users', 'users.auth0_id', 'emails.user_id')
    .select(
      'emails.id',
      'users.auth0_id as userName',
      'emails.is_read as isRead',
      'emails.title',
      'emails.created_at as createdAt'
    )) as Emails
}

//GET: getEmailById(id:number)
export async function getEmailById(id: number) {
  return (await db('emails')
    .join('users', 'users.auth0_id', 'emails.user_id')
    .where('id', id)
    .select(
      'emails.id',
      'users.auth0_id as userName',
      'emails.title',
      'emails.created_at as createdAt',
      'emails.description'
    ).first()) as Email
}

//POST: sendEmailByUserId(userId: string, sentEmail: object)
export async function sendEmailByUserId(newEmail: NewEmail, userId: string) {
  return db('emails').insert({
    user_id: userId,
    title: newEmail.title,
    description: newEmail.description,
  })
}


//PATCH: updateEmailReadStatusById(id:number, isRead:boolean)
export function updateEmailReadStatusById(id: number) {
  return db('emails').where('id', id).update('is_read', true)
}


//Delete: deleteEmailById(id:number)
export function deleteEmailById(id: number) {
  return db('emails')
    .where('id', id)
    .delete()
}


//GET: getAmountOfUnreadEmailsByDate(date:format?)
export async function getAmountOfUnreadEmailsByDate(date: string) {
  return (await db('emails')
    .whereRaw('DATE(created_at) = ?', date)
    .where('is_read', 0)
    .count('* as unreadEmailCount')
    .first())
}
//The result will be an object, like {unreadEmailCount: 20}




