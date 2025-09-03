import {redirect} from "next/navigation";
import {fetchPostsByPnameorcon} from "@/src/prisma/query/posts";
import PostList from "@/src/components/posts/post-list";

interface SearchProps {searchParams:Promise<{pnameorcon:string}>}

export default async function Search({searchParams}:SearchProps) {
  const {pnameorcon} =await searchParams;
  const posts = await fetchPostsByPnameorcon(pnameorcon)
  if (!pnameorcon) {
    redirect('/')
  }
  return(
    <div>
      <PostList posts={posts}></PostList>
    </div>
  )
}