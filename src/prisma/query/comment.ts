import {prisma} from "@/src/prisma";
export type CommentWithUser ={User:
{name: string | null,
  image: string | null}
| null} &
Comment
export function fetchCommentsByPostId(postId: string):Promise<CommentWithUser[]> {
  return prisma.comment.findMany({
    where:{postId},
    include:{
      User:{
        select:{
          name:true,
          image:true
        }
      }
    }
  })
}