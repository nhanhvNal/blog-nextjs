"use client";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import AuthForm from "@/components/common/AuthForm";
import AuthToggle from "@/components/common/AuthToggle";
import OAuthButton from "@/components/common/OAuthButton";
import { FormDataSignUp } from "@/components/common/SignInForm";
import { userService } from "@/services/api";
import { UserModel } from "@/types/user.model";

function AuthContainer() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataSignUp>();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button
          onClick={async () => {
            try {
              await signOut({ redirect: true });
            } catch (error) {}
          }}
        >
          Sign out
        </button>
      </>
    );
  }

  const validateSignUp = (formData: FormDataSignUp): string | null => {
    if (!formData.email?.includes("@")) return "Invalid email.";

    if (formData.password && formData.password.length < 6)
      return "Password must be at least 6 characters.";

    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";

    return null;
  };

  const handleSignUp = async (data: FormDataSignUp) => {
    const errorMessage = validateSignUp(data);
    if (errorMessage) return alert(errorMessage);

    try {
      const result = await userService.createUser({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      const user = (result as { data: UserModel }).data;
      if (user) {
        setIsSignUp(false);
        alert("Sign-up successful!");
      }
    } catch (error) {
      alert("Sign-up failed.");
    }
  };

  const handleLogin = async (data: FormDataSignUp) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        alert(`Login failed: ${result.error}`);
      } else {
        alert("Login successful!");
        router.push("/");
      }
    } catch {
      alert("Login failed.");
    }
  };

  const handleFormSubmit = async (data: FormDataSignUp) => {
    if (isSignUp) {
      await handleSignUp(data);
      return;
    }

    await handleLogin(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <AuthForm
          isSignUp={isSignUp}
          onSubmit={handleSubmit(handleFormSubmit)}
          register={register}
          watch={watch}
          errors={errors}
        />
        <OAuthButton isSignUp={isSignUp} />
        <AuthToggle isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <AuthContainer />
    </SessionProvider>
  );
}
