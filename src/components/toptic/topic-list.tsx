import {Chip} from "@heroui/chip";
import {Link} from "@heroui/link";
import {prisma} from "@/src/prisma";
import {ReactNode} from "react";
import {Badge} from "@heroui/badge";
import {fetchTopics} from "@/src/prisma/query/topics";

export const ListBoxWrapper = ({children}:{children:ReactNode} ) => {
  return <div className="max-w-[260px] p-3 rounded-small border-2 mt-4 flex gap-3 flex-wrap">
    {children}
  </div>
}


export default async function TopicList() {
  const topicList = await fetchTopics()
  console.log(topicList)
  return (
      <ListBoxWrapper>
       {
         topicList.map((topic) => {
           return<Badge color="secondary" shape={"circle"} size={"sm"} key={topic.id} content={topic._count.posts}><Chip  variant={"shadow"}>
             <Link href={`/topics/${topic.name}`}>{topic.name}</Link>
           </Chip>
           </Badge>
         })
       }
      </ListBoxWrapper>
  )

}