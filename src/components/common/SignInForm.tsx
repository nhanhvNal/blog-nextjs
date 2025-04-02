"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

export interface FormDataSignUp {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  isSignUp?: boolean;
}

interface AuthFormProps {
  onSubmit: (formData: any) => void;
  isSignUp: boolean;
  setIsSignUp: (value: boolean) => void;
}

export default function SignInForm({
  onSubmit,
  isSignUp,
  setIsSignUp,
}: Readonly<AuthFormProps>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (
    formData: any,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <Form
          onSubmit={handleSubmit(handleFormSubmit as any)}
          className="space-y-4 md:space-y-6"
        >
          {errorMessage && (
            <Alert className="py-2 px-3" variant="danger">
              {errorMessage}
            </Alert>
          )}

          <Form.Group className="flex flex-col">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              placeholder="Enter your email"
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email.message?.toString()}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="flex flex-col">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password.message?.toString()}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {isSignUp && (
            <Form.Group className="flex flex-col">
              <Form.Label htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <Form.Control
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm your password"
                isInvalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword.message?.toString()}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </Form>

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
