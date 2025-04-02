"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <p className="block text-sm font-medium text-gray-600">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mt-4">
            <p className="block text-sm font-medium text-gray-600">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1" />
          <span className="mx-2">OR</span>
          <hr className="flex-1" />
        </div>

        <button
          className="w-full flex items-center justify-center py-3 rounded-md mb-2 "
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <FcGoogle className="text-xl mr-2" />
          {isSignUp ? "Sign Up with Google" : "Login with Google"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
