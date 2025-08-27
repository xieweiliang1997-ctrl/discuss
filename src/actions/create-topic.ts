"use server"

import {z} from "zod"

interface CreateTopicFormState {
  errors:{
    name?:string[],
    description?:string[],
  }
}

const createTopicSchema = z.object({
  name:z.string().min(3).regex(/^[a-zA-Z0-9_]+$/,{
    message:"Name must be at least 3 characters long"
  }),
  description:z.string().min(10).max(4747),
})

export async function createTopic(pervState:CreateTopicFormState,formData:FormData) {
  const name = formData.get("name")
  const description = formData.get("description")
  const result = createTopicSchema.safeParse({
    name,
    description
  })
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }
  return {errors:{}}
  console.log(name,description)
}