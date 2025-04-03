export default function LoadingPage({
  isLoading,
}: Readonly<{ isLoading: boolean }>) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
