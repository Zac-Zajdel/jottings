import { object, string } from 'yup'

const jotSchema = object({
  title: string().required().min(1).max(255),
})

export default jotSchema
