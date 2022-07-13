import { object, string } from 'yup'

export const createJot = object({
  title: string().required().min(1).max(255),
})
