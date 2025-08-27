
import { signIn } from "@/src/auth"
 
export default function signButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with GitHub111</button>
    </form>
  )
} 