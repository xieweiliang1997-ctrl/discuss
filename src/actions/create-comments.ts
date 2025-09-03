"use server"

import {z} from "zod"
import {auth} from "@/src/auth";
import {prisma} from "@/src/prisma";
import {redirect} from "next/navigation";
import {Post} from ".prisma/client";
import {sleep} from "@/src/utils";
import {revalidatePath} from "next/cache";

interface CreateCommentFormState {
  errors: {
    content?: string[],
    _form?: string[],
  };
  success?:boolean;
}

const createCommentSchema = z.object({
  content: z.string().min(10).max(4747),
})

export async function createComment({postId,parentId}: {postId:string,parentId?:string}, pervState: CreateCommentFormState, formData: FormData): Promise<CreateCommentFormState> {
  const content = formData.get("content")
  const result = createCommentSchema.safeParse({

    content
  })
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      }
    }
  }

  try {
   await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id,
        postId,
        parentId
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        }
      }
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        }
      }
    }
  }

  const topic = await prisma.topic.findFirst({
    where: {
      posts:{
        some:{
          id:postId
        }
      }
    }
  })
  if (!topic){
    return {
      errors: {
        _form:['You must be signed in to do this.'],
      }
    }
  }
  revalidatePath(`/topics/${topic.name}/posts/${postId}`)

  return {
    errors: {

    },
    success:true
  }
}