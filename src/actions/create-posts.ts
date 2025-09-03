"use server"
import {z} from "zod"
import {auth} from "@/src/auth";
import {prisma} from "@/src/prisma";
import {redirect} from "next/navigation";
import {Post} from ".prisma/client";


interface CreatePostsFormState {
  errors: {
    title?: string[],
    content?: string[],
    _form?: string[],
  }
}

const createPostsSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10).max(4747),
})

export async function createPosts(name: string, pervState: CreatePostsFormState, formData: FormData): Promise<CreatePostsFormState> {
  // await sleep(3000)
  const title = formData.get("title")
  const content = formData.get("content")
  const result = createPostsSchema.safeParse({
    title,
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

  const topic = await prisma.topic.findFirst({
    where: {name: name}
  })
  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic"],
      }
    }
  }
  let post: Post;
  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id
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
  redirect(`/topics/${topic.name}/posts/${post.id}`)

}