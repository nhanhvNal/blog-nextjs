import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
      >
        Return to Home
      </Link>
    </div>
  );
}
