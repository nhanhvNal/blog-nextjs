import { Form } from "react-bootstrap";

interface AuthFieldsProps {
  isSignUp: boolean;
  register: any;
  watch: any;
  errors: any;
}

export default function AuthFields({
  isSignUp,
  register,
  watch,
  errors,
}: Readonly<AuthFieldsProps>) {
  return (
    <div className="space-y-4">
      {isSignUp && (
        <div className="flex flex-col">
          <Form.Label className="text-sm font-semibold text-gray-700">
            Name
          </Form.Label>
          <Form.Control
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your Name"
            isInvalid={!!errors.name}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <Form.Control.Feedback
              type="invalid"
              className="text-red-600 text-xs mt-1"
            >
              {errors.name.message?.toString()}
            </Form.Control.Feedback>
          )}
        </div>
      )}

      <div className="flex flex-col">
        <Form.Label className="text-sm font-semibold text-gray-700">
          Email
        </Form.Label>
        <Form.Control
          {...register("email", {
            required: "Email is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          placeholder="Enter your email"
          isInvalid={!!errors.email}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <Form.Control.Feedback
            type="invalid"
            className="text-red-600 text-xs mt-1"
          >
            {errors.email.message?.toString()}
          </Form.Control.Feedback>
        )}
      </div>

      <div className="flex flex-col">
        <Form.Label className="text-sm font-semibold text-gray-700">
          Password
        </Form.Label>
        <Form.Control
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
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <Form.Control.Feedback
            type="invalid"
            className="text-red-600 text-xs mt-1"
          >
            {errors.password.message?.toString()}
          </Form.Control.Feedback>
        )}
      </div>

      {isSignUp && (
        <div className="flex flex-col">
          <Form.Label className="text-sm font-semibold text-gray-700">
            Confirm Password
          </Form.Label>
          <Form.Control
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value: any) =>
                value === watch("password") || "Passwords do not match",
            })}
            type="password"
            placeholder="Confirm your password"
            isInvalid={!!errors.confirmPassword}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <Form.Control.Feedback
              type="invalid"
              className="text-red-600 text-xs mt-1"
            >
              {errors.confirmPassword.message?.toString()}
            </Form.Control.Feedback>
          )}
        </div>
      )}
    </div>
  );
}
