import Link from "next/link";

export function AuthCard({
  children,
  title,
  description,
  backLink,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  backLink?: { href: string; label: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        {backLink && (
          <Link
            href={backLink.href}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {backLink.label}
          </Link>
        )}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-base text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}