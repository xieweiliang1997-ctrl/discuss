import PostShow from "@/src/components/posts/post-show";
import {Suspense} from "react";
import PostShowLoading from "@/src/components/posts/post-show-loading";
import CommentCreateForm from "@/src/components/comments/comment-create-form";
import CommentList from "@/src/components/comments/comment-list";

interface PostShowPageProps {
  params: {
    name: string,
    postId: string
  }
}

export default async function PostShowPage({params}: PostShowPageProps) {
  const {name, postId} = await params;

  return (
    <div className={"space-y-3"}>
      <Suspense fallback={<PostShowLoading/>}>
        <PostShow postId={postId}/>
      </Suspense>
      <CommentCreateForm postId={postId}/>
      <CommentList postId={postId}/>
    </div>
  )
}