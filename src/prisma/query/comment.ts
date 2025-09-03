import {prisma} from "@/src/prisma";
import type {Comment} from ".prisma/client";
import {cache} from "react";

export type CommentWithUser = {
  User:
    {
      name: string | null,
      image: string | null
    }
    | null
} & Comment
export const fetchCommentsByPostId =cache( (postId: string): Promise<CommentWithUser[]> => {
  console.log(111111)
  return prisma.comment.findMany({
    where: {postId},
    include: {
      User: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
})

