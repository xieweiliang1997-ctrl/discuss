"use client"
import {Listbox, ListboxItem} from "@heroui/listbox";
import {PostWithData} from "@/src/prisma/query/posts";
import {Avatar} from "@heroui/avatar";
import {useRouter} from "next/navigation";

interface PostListProps {
  posts: PostWithData[]
}

export default function PostList({posts}: PostListProps) {
  const router = useRouter()
  return <Listbox
    aria-label="Post List"
    itemClasses={{
      base: "border-small border-default-200 mt-4",
    }}
  >
    {
      posts.map(post => {
        const topicName =  post.Topic?.name;
        if (!topicName){
          throw new Error('Need a topic name to link to a post')
        }
        return <ListboxItem
          startContent={post.User?.image&&<div><Avatar src={post.User?.image}/></div>}
          key={post.id}
          endContent={<span className='text-small text-gray-400 whitespace-nowrap self-end'>{post._count.comments}</span>}
          description={<p className='text-small mt-3'>{post.User?.name}</p>}
          onPress={()=>{
            router.push(`topics/${topicName}/posts/${post.id}`)
          }}
        >
          {post.title}
        </ListboxItem>
      })
    }


  </Listbox>
}