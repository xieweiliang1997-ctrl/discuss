"use server"

import {z} from "zod"
import {auth} from "@/src/auth";
import {prisma} from "@/src/prisma";
import {redirect} from "next/navigation";
import {Topic} from ".prisma/client";
import {sleep} from "@/src/utils";

interface CreateTopicFormState {
  errors:{
    name?:string[],
    description?:string[],
    _form?:string[],
  }
}

const createTopicSchema = z.object({
  name:z.string().min(3).regex(/^[a-zA-Z0-9_]+$/,{
    message:"Name must be at least 3 characters long"
  }),
  description:z.string().min(10).max(4747),
})

export async function createTopic(pervState:CreateTopicFormState,formData:FormData):Promise<CreateTopicFormState> {
  await sleep(3000)
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

  const session =await auth()
  if (!session||!session.user){
    return {
      errors:{
        _form:['You must be signed in to do this.'],
      }
    }
  }

  // console.log('session.user.id:',session.user.id)
  let topic :Topic;
  try {
    topic = await prisma.topic.create({
      data:{
        name:result.data.name,
        description:result.data.description,
        userId:session.user.id,
      }
    })
  }catch (err:unknown){
    if (err instanceof Error){
      return {
        errors:{
          _form:[err.message],
        }
      }
    }else{
      return {
        errors:{
          _form:["Something went wrong"],
        }
      }
    }
  }
  redirect(`/topics/${topic.name}`)

}