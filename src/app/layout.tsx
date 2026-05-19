import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecureGate",
  description: "Secure authentication built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen bg-gray-50 text-gray-900">
        <SessionProvider>{children}</SessionProvider>
      </body >
    </html >
  );
}
