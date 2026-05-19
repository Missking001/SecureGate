"use client";

import { useSession } from "next-auth/react";

export function UserGreeting() {
  const { data: session } = useSession();

  return (
    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Welcome back, {session?.user?.name || "User"}!
      </h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500">
        <p>
          You are currently signed in as {session?.user?.email}.
        </p>
        <p className="mt-1">
          Account Status:{" "}
          {session?.user?.emailVerified ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
              Unverified
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
