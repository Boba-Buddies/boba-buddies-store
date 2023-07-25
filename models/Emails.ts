import * as z from 'zod'


export const emailSchema = z.object({
  userName: z.string(),
  isRead: z.boolean(),
  title: z.string(),
  createdAt: z.string(),
})

export const emailsSchema = emailSchema.extend({}).array()

export const sendEmailSchema = z.object({
  title: z.string(),
  description: z.string(),
})

export const updateEmailReadStatusSchema = z.object({
  id: z.number(),
  is_read: z.string(),
})



export type Emails = z.infer<typeof emailsSchema>
export type Email = z.infer<typeof emailSchema>
export type SendEmail = z.infer<typeof sendEmailSchema>
export type updateEmailReadStatus = z.infer<typeof updateEmailReadStatusSchema>
