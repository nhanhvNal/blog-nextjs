import { Form } from "react-bootstrap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AuthFieldsProps {
  isSignUp: boolean;
  register: any;
  watch: any;
  errors: any;
}

const renderField = (
  label: string,
  name: string,
  type: string,
  register: any,
  errors: any,
  watch?: any,
  pattern?: RegExp
) => (
  <div className="flex flex-col">
    <Form.Label className="text-sm font-semibold text-gray-700">
      {label}
    </Form.Label>
    <Form.Control
      {...register(name, {
        required: `${label} is required`,
        pattern: pattern,
        minLength:
          type === "password"
            ? {
                value: 6,
                message: "Password must be at least 6 characters long",
              }
            : undefined,
        validate:
          watch && name === "confirmPassword"
            ? (value: any) =>
                value === watch("password") || "Passwords do not match"
            : undefined,
      })}
      type={type}
      placeholder={`Enter your ${label.toLowerCase()}`}
      isInvalid={!!errors[name]}
      className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    {errors[name] && (
      <Form.Control.Feedback
        type="invalid"
        className="text-red-600 text-xs mt-1"
      >
        {errors[name]?.message?.toString()}
      </Form.Control.Feedback>
    )}
  </div>
);

export default function AuthFields({
  isSignUp,
  register,
  watch,
  errors,
}: Readonly<AuthFieldsProps>) {
  return (
    <div className="space-y-4">
      {isSignUp && renderField("Name", "name", "text", register, errors)}
      {renderField(
        "Email",
        "email",
        "email",
        register,
        errors,
        undefined,
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )}
      {renderField("Password", "password", "password", register, errors)}

      {isSignUp &&
        renderField(
          "Confirm Password",
          "confirmPassword",
          "password",
          register,
          errors,
          watch
        )}
    </div>
  );
}
