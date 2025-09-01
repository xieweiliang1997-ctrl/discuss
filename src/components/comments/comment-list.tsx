
import CommentShow from "@/src/components/comments/comment-show";
import {fetchCommentsByPostId} from "@/src/prisma/query/comment";

export default async function CommentList({postId}: {postId: string}) {
  const comments = await fetchCommentsByPostId(postId)
  return(
    <div className={"space-y-3"}>
      <div className={"text-lg font-bold"}>All 20 comments</div>
      {
        comments.map(comment =><CommentShow key={comment?.id} comment={comment}/>)
      }
    </div>
  )
}