"use client";

import { signOut, useSession } from "next-auth/react";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { useState } from "react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span className="text-xl font-bold text-gray-900 tracking-tight">SecureGate</span>
            </div>
            <div className="flex items-center space-x-4">
              {session?.user && (
                <div className="flex items-center space-x-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm leading-none">
                    {session.user.name ? session.user.name[0].toUpperCase() : session.user.email?.[0].toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
                    {session.user.name || session.user.email}
                  </span>
                </div>
              )}
              <LoadingButton
                onClick={handleSignOut}
                isLoading={isSigningOut}
                className="w-auto"
              >
                Sign out
              </LoadingButton>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
