import * as z from 'zod'

export const UserSchema = z.object({
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

export const UpdateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
})

export const NewUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  email: z.string().email(),
})

export const NewUserBackendSchema = z.object({
  auth0Id: z.string(),
})

export type User = z.infer<typeof UserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type NewUser = z.infer<typeof NewUserSchema>
export type NewUserBackend = z.infer<typeof NewUserBackendSchema>
