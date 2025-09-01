import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Input} from "@heroui/input";
import HeaderAuth from "@/src/components/header-auth";
import {Link} from "@heroui/link";

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

  return (
    <Navbar className='border-b-1 border-gray-200'>
      <NavbarBrand>
        <Link href={'/'} className={"flex items-center ml-[-10px]"}>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Input></Input>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth></HeaderAuth>
      </NavbarContent>
    </Navbar>
  );
}
