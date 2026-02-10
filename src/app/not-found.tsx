import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-gray-400 mb-6">This page could not be found.</p>
        <Link
          href="/home"
          className="text-sm text-gray-300 underline hover:text-white"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
