import Image from "next/image";
import {CommentWithUser} from "@/src/prisma/query/comment";
import dayjs from "dayjs";

export default function  CommentShow({comment}:{comment:CommentWithUser}){

  return (
    <div className={"border mt-2 p-4 rounded"}>
      <div className={"flex gap-2"}>
        <img width={10} height={10} src={comment?.User?.image||'/avatar.png'} className={"w-10 h-10 rounded "} alt={'user Avatar'}/>
        <div className={"flex-1"}>
          <p className={"text-sm font-medium text-gray-500"}>{comment?.User?.name}</p>
          <p className={"flex justify-between items-center"}>
            <span className={"flex-1 text-gray-900"}>{comment?.content}</span>
            <span className={'w[150px] text-right text-gray-400 text-sm'}>
              {
              dayjs(comment?.createAt).format("DD-MM-YYYY")

              }
            </span>
          </p>
        </div>
      </div>

    </div>
  )
};