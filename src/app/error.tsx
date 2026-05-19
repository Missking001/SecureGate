"use client";

import { useEffect } from "react";
import { LoadingButton } from "@/components/ui/LoadingButton";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error securely to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Something went wrong!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've encountered an unexpected error. Please try again.
          </p>
        </div>
        <div>
          <LoadingButton onClick={() => reset()}>
            Try again
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
