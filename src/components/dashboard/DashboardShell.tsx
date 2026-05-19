"use client";

import { signOut } from "next-auth/react";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { useState } from "react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">SecureGate</span>
            </div>
            <div>
              <LoadingButton
                onClick={handleSignOut}
                isLoading={isSigningOut}
                className="w-auto bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500"
              >
                Sign out
              </LoadingButton>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
