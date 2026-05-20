import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            404 - Page Not Found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
