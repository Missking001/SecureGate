"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ActivityFeed } from "./ActivityFeed";

interface DashboardData {
  lastLoginAt: string | null;
  memberSince: string;
  emailVerified: string | null;
}

export function PremiumDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);

  const isVerified = !!session?.user?.emailVerified;

  useEffect(() => {
    fetch("/api/activities")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  const lastLogin = data?.lastLoginAt
    ? new Date(data.lastLoginAt).toLocaleString()
    : "First login";

  const memberSince = data?.memberSince
    ? new Date(data.memberSince).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Access Control Console
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Active identity:{" "}
              <span className="font-semibold text-gray-700">
                {session?.user?.name || "User"}
              </span>{" "}
              (<span className="text-xs text-gray-400 font-mono">{session?.user?.email}</span>)
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
            Database Protected
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
            SSL Cipher Active
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Email Verification</p>
            <div className={`rounded-lg p-2 ${isVerified ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
              {isVerified ? "Verified" : "Unverified"}
            </h3>
            <div className="mt-2 flex items-center text-xs">
              <span className={`font-medium px-2 py-0.5 rounded-full ${isVerified ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                {isVerified ? "Identity Confirmed" : "Awaiting Verification"}
              </span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Account</p>
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900">{session?.user?.name || "No name set"}</p>
            <p className="text-xs text-gray-500 mt-1">{session?.user?.email}</p>
            {memberSince && (
              <p className="text-xs text-gray-400 mt-1">Member since {memberSince}</p>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Last Login</p>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H13.5V2.25H10.5V1.5ZM9 3.75V20.25C9 21.0784 9.67157 21.75 10.5 21.75H13.5C14.3284 21.75 15 21.0784 15 20.25V3.75C15 2.92157 14.3284 2.25 13.5 2.25H10.5C9.67157 2.25 9 2.92157 9 3.75Z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-900">{lastLogin}</p>
            <div className="mt-2 flex items-center text-xs text-gray-400">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Session active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />

      {/* Security Status */}
      <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
          Security Status
        </h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-start space-x-3">
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isVerified ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
              {isVerified ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Email Verified</p>
              <p className="text-xs text-gray-500">
                {isVerified ? "Your email has been confirmed." : "Verify your email to access all features."}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Password Set</p>
              <p className="text-xs text-gray-500">Authentication via bcrypt with 12 salt rounds.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Multi-Factor Auth</p>
              <p className="text-xs text-gray-500">Coming in a future update.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
