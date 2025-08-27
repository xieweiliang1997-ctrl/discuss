import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import * as actions from "@/src/actions";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {auth} from "@/src/auth";
import {Avatar} from "@heroui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/popover";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default async function Header() {
  const session = await auth()
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
  return (
    <Navbar className='border-b-1 border-gray-200'>
      <NavbarBrand>
      <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Input></Input>
        </NavbarItem>

      </NavbarContent>
      <NavbarContent justify="end">
        {autoContent}
      </NavbarContent>
    </Navbar>
  );
}
