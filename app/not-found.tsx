import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p className="text-gray-900 mb-4">
        oops you shouldn't be seeing this
      </p>
      <p className="text-gray-600 text-sm mb-8">
        please email me at tadkapal [at] usc [dot] edu
      </p>
      <Link
        href="/"
        className="text-sm text-gray-900 underline"
      >
        ← go home
      </Link>
    </div>
  );
}

