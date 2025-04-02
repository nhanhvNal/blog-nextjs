import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function OAuthButton({
  isSignUp,
}: Readonly<{ isSignUp: boolean }>) {
  return (
    <>
      <div className="flex items-center my-4">
        <hr className="flex-1" />
        <span className="mx-2">OR</span>
        <hr className="flex-1" />
      </div>
      <button
        className="w-full flex items-center justify-center py-3 rounded-md mb-2"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <FcGoogle className="text-xl mr-2" />
        {isSignUp ? "Sign Up with Google" : "Login with Google"}
      </button>
    </>
  );
}
