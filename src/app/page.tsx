import TopicCrateForm from "@/src/components/toptic/topic-crate-form";
import TopicList from "@/src/components/toptic/topic-list";
import {fetchTopPosts} from "@/src/prisma/query/posts";
import PostList from "@/src/components/posts/post-list";

export default async function Home() {
  const posts = await fetchTopPosts()
  return (
    <div className="flex justify-between">
      <div className="w-3/5">
        <h1 className='text-xl mt-2'>Top Posts</h1>
        <PostList posts={posts}></PostList>
      </div>
      <div>
        <TopicCrateForm/>
        <TopicList/>
      </div>
    </div>
  );
}
