
import CommentShow from "@/src/components/comments/comment-show";
import {fetchCommentsByPostId} from "@/src/prisma/query/comment";

export default async function CommentList({postId}: {postId: string}) {
  const comments = await fetchCommentsByPostId(postId)
  const topLevelComments =comments.filter((comment) => {
    return comment.parentId === null;
  })
  return(
    <div className={"space-y-3"}>
      <div className={"text-lg font-bold"}>All 20 comments</div>
      {
        topLevelComments.map(comment =><CommentShow key={comment.id} comment={comment}/>)
      }
    </div>
  )
}