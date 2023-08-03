import * as z from 'zod'

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  phoneNumber: z.string(),
  emailAddress: z.string().email(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
})

export const updateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
})

export const newUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  emailAddress: z.string().email(),
})

export const newUserBackendSchema = newUserSchema.extend({
  auth0Id: z.string(),
})

export type User = z.infer<typeof userSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
export type NewUser = z.infer<typeof newUserSchema>
export type NewUserBackend = z.infer<typeof newUserBackendSchema>
