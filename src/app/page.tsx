import { Button } from "@heroui/button";
import SignButton from "@/src/components/sign-button";
import UserAvatar from "@/src/components/UserAvatar";
import { SignOutButton } from "../components/signout-button";

export default function Home() {
  return (
    <div>
      <UserAvatar></UserAvatar>
      <SignButton></SignButton>
      <SignOutButton></SignOutButton> 

    </div>
  );
}
