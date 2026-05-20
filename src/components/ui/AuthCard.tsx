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
        <div className="flex flex-col items-center">
          <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          <span className="mt-3 text-2xl font-bold text-gray-900">SecureGate</span>
        </div>
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