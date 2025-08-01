"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-6xl font-bold text-red-500 mb-4">Oops!</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">
            We encountered an unexpected error. Don&apos;t worry, our team has
            been notified.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-colors"
          >
            Try again
          </button>

          <Link
            href="/"
            className="block text-red-600 hover:text-red-800 underline"
          >
            Go back to homepage
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-gray-700 bg-gray-100 p-4 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
