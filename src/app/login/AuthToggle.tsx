export default function AuthToggle({
  isSignUp,
  setIsSignUp,
}: Readonly<{
  isSignUp: boolean;
  setIsSignUp: (value: boolean) => void;
}>) {
  return (
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
            Don&apos;t have an account?{" "}
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
  );
}
