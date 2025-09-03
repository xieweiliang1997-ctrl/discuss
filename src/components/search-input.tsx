"use client"
import {Input} from "@heroui/input";
import {SearchIcon} from "@/components/icons";
import * as actions from "@/src/actions";
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";

export default function  SearchInput() {
  const searchParams= useSearchParams()

  const [pnameorcon,setPnameorcon] = useState(searchParams.get('pnameorcon')||'')
  useEffect(() => {
    setPnameorcon(searchParams.get('pnameorcon')||'')
  }, [searchParams]);
  return (
    <Suspense  fallback={<p>Loading...</p>}>
      <div
        className="w-[190px] rounded-2xl flex justify-center items-center bg-linear-to-tr from-purple-200 to-white text-white ">
        <form action={actions.search}>
          <Input
            value={pnameorcon}
            name={'pnameorcon'}
            onChange={(e) => setPnameorcon(e.target.value)}
            isClearable
            classNames={{
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "!bg-default-200/50",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "cursor-text!",
              ],
            }}
            placeholder="Type to search..."
            radius="lg"
            startContent={
              <SearchIcon
                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0"/>
            }
          />
        </form>
      </div>
    </Suspense>
  )
}