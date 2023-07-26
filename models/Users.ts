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

export const UpdatedUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
})

export type User = z.infer<typeof UserSchema>
export type UpdatedUser = z.infer<typeof UpdatedUserSchema>
