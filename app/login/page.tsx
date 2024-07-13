import { FcGoogle } from "react-icons/fc";
import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <Button formAction={login}>Log in</Button>
      <Button formAction={signup}>Sign up</Button>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-96 rounded-md border p-5 space-y-5">
          <h1 className="text-2xl font-bold">Next & supabase</h1>
          <p className="text-sm ">Register/Sign-in today</p>
          <div className="flex flex-col gap-5">
            <Button
              className=" w-full flex items-center gap-2"
              variant="outline"
            >
              <FcGoogle />
              Google
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
