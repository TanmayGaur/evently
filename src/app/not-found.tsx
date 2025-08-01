import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </div>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            Go Back Home
          </Link>

          <div>
            <Link
              href="/events"
              className="text-purple-600 hover:text-purple-800 underline ml-4"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
