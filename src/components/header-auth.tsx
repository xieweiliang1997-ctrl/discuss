"use client"
import { NavbarItem} from "@heroui/navbar";
import * as actions from "@/src/actions";
import {Button} from "@heroui/button";

import {Avatar} from "@heroui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/popover";
import {useSession} from "next-auth/react";

export default  function HeaderAuth() {
  const {data:session} = useSession();
  let autoContent:React.ReactNode
  if(session?.user){
    autoContent = <Popover placement="bottom">
      <PopoverTrigger>
        <Avatar src={session?.user.image ||'https://i.pravatar.cc/150?u=a042581f4e29026024d'} alt="User Avatar" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <form action={actions.signOut}>
            <Button type={"submit"}>退出</Button>
          </form>

        </div>
      </PopoverContent>
    </Popover>
  }else{
    autoContent = <>
      <NavbarItem className="hidden lg:flex">
        <form action={actions.signIn}>
          <Button color="secondary" type={"submit"} href="#" variant="bordered">
            Sign In
          </Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button color="secondary" type={"submit"} href="#">
            Sign Up
          </Button>
        </form>
      </NavbarItem>
    </>
  }
return autoContent;
}
