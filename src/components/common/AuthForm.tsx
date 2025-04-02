import { Form } from "react-bootstrap";
import AuthFields from "./AuthFields";

interface AuthFormProps {
  isSignUp: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  register?: any;
  watch?: any;
  errors?: any;
}

export default function AuthForm({
  isSignUp,
  onSubmit,
  register,
  watch,
  errors,
}: Readonly<AuthFormProps>) {
  return (
    <Form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
      <AuthFields
        isSignUp={isSignUp}
        register={register}
        watch={watch}
        errors={errors}
      />
      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
      >
        {isSignUp ? "Sign Up" : "Login"}
      </button>
    </Form>
  );
}
