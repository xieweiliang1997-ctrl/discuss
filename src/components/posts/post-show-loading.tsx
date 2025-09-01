import {Skeleton} from "@heroui/skeleton";

export default function PostShowLoading() {
  return (
    <div>
      <div className={"my-2"}>
        <Skeleton className={'h-8 w-48'}/>
      </div>
      <div className={"p-4 border rounded"}>
        <Skeleton className={'h-8 w-48'}/>u
      </div>
    </div>
  )
}