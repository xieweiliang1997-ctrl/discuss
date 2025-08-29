import PostsCrateForm from "@/src/components/posts/posts-crate-form";
import PostList from "@/src/components/posts/post-list";
import {fetchPostsByTopicName} from "@/src/prisma/query/posts";

interface TopicShowPageProps{
  params:Promise<{name:string}>
}

export default async function TopicShowPage({params}:TopicShowPageProps){
  const name = (await params).name;
  const posts = await fetchPostsByTopicName(name)
  return (
    <div className="flex justify-between">
      <div className='w-3/5'>
        <h1 className='text-xl mt-2'>{name}</h1>
        <PostList posts={posts}/>
      </div>
      <div>
        <PostsCrateForm name={name}/>
      </div>
    </div>
  )
}