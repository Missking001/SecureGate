"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface AuditLog {
  id: string;
  event: string;
  category: "auth" | "security" | "access";
  status: "success" | "warning" | "failed";
  ip: string;
  location: string;
  device: string;
  time: string;
}

export function PremiumDashboard() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState("sg_live_8f3d1a9b2c4e6f8a0e2d4c6b8a0f9e7d");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [logs] = useState<AuditLog[]>([
    {
      id: "1",
      event: "Successful Authentication",
      category: "auth",
      status: "success",
      ip: "102.89.34.12",
      location: "Lagos, Nigeria",
      device: "Chrome / Windows 11",
      time: "Just now"
    },
    {
      id: "2",
      event: "Email Verification Completed",
      category: "security",
      status: "success",
      ip: "102.89.34.12",
      location: "Lagos, Nigeria",
      device: "Chrome / Windows 11",
      time: "10 minutes ago"
    },
    {
      id: "3",
      event: "Session Token Issued",
      category: "auth",
      status: "success",
      ip: "102.89.34.12",
      location: "Lagos, Nigeria",
      device: "Chrome / Windows 11",
      time: "12 minutes ago"
    },
    {
      id: "4",
      event: "Failed Login Attempt",
      category: "auth",
      status: "failed",
      ip: "198.51.100.42",
      location: "Frankfurt, Germany",
      device: "Firefox / Linux",
      time: "2 hours ago"
    },
    {
      id: "5",
      event: "Password Reset Requested",
      category: "security",
      status: "warning",
      ip: "102.89.32.4",
      location: "Abuja, Nigeria",
      device: "Safari / iPhone 15",
      time: "1 day ago"
    }
  ]);

  const handleGenerateKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const chars = "abcdef0123456789";
      let key = "sg_live_";
      for (let i = 0; i < 32; i++) {
        key += chars[Math.floor(Math.random() * chars.length)];
      }
      setApiKey(key);
      setIsGenerating(false);
    }, 800);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome & Health Header */}
      <div className="md:flex md:items-center md:justify-between bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            {/* Shield Check SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Access Control Console
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Active identity: Welcome back, <span className="font-semibold text-gray-700">{session?.user?.name || "User"}</span> (<span className="text-xs text-gray-400 font-mono">{session?.user?.email}</span>)
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

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Security Score</p>
            <div className="rounded-lg bg-green-50 p-2 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">94%</h3>
            <div className="mt-2 flex items-center text-xs">
              <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Optimal</span>
              <span className="text-gray-400 ml-2">All checks passing</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Active Sessions</p>
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H13.5V2.25H10.5V1.5ZM9 3.75V20.25C9 21.0784 9.67157 21.75 10.5 21.75H13.5C14.3284 21.75 15 21.0784 15 20.25V3.75C15 2.92157 14.3284 2.25 13.5 2.25H10.5C9.67157 2.25 9 2.92157 9 3.75Z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">1</h3>
            <div className="mt-2 flex items-center text-xs text-gray-400">
              <span>This Device (Active)</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">MFA / 2FA Status</p>
            <div className={`rounded-lg p-2 ${mfaEnabled ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A11.956 11.956 0 0 0 12 3c1.47 0 2.859.266 4.136.753a11.96 11.96 0 0 1-4.136 2.49c-1.47-.828-2.859-1.656-4.136-2.49ZM21 12c0 5.592-3.824 10.29-9 11.623-5.176-1.332-9-6.03-9-11.622 0-1.31.21-2.571.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight font-sans">
              {mfaEnabled ? "Enabled" : "Disabled"}
            </h3>
            <div className="mt-2 flex items-center text-xs">
              <button 
                onClick={() => setMfaEnabled(!mfaEnabled)}
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                {mfaEnabled ? "Disable settings" : "Enable Multi-Factor"} &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Verification Status</p>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Verified</h3>
            <div className="mt-2 flex items-center text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full w-fit">
              Identity Authenticated
            </div>
          </div>
        </div>
      </div>

      {/* API Key Manager & Account Settings */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* API Token Controller */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>
              SaaS Application API Credentials
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Use this private key to query SecureGate authentication APIs from your backend application.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Secret API Key
            </label>
            <div className="flex rounded-xl bg-gray-50 border border-gray-200 p-1.5 items-center">
              <code className="flex-1 font-mono text-sm px-3 text-gray-800 break-all select-all">
                {apiKey}
              </code>
              <button
                onClick={handleCopyKey}
                className="ml-2 flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Copy API Key"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.4M9 8.25h1.125a.75.75 0 0 0 .75-.75V5.25c0-.414-.336-.75-.75-.75H9m0 3.75v3.75M12 12h3m-3 3h3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleGenerateKey}
              disabled={isGenerating}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Rotate Credentials
                </>
              )}
            </button>
            <span className="text-xs text-gray-400">
              Rotated keys invalidate previous requests immediately.
            </span>
          </div>
        </div>

        {/* Security Checklist Card */}
        <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              Security Hardening
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Verify your setup checklist.
            </p>
          </div>

          <div className="space-y-4">
            {/* Check 1 */}
            <div className="flex items-start space-x-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Email Verified</p>
                <p className="text-xs text-gray-500">Verification token completed.</p>
              </div>
            </div>

            {/* Check 2 */}
            <div className="flex items-start space-x-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Password Strengths</p>
                <p className="text-xs text-gray-500">Complexity requirements strictly met.</p>
              </div>
            </div>

            {/* Check 3 */}
            <div className="flex items-start space-x-3">
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${mfaEnabled ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                {mfaEnabled ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Multi-Factor Auth</p>
                <p className="text-xs text-gray-500">
                  {mfaEnabled ? "MFA status is currently enabled." : "Highly recommended for complete account locks."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Section */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
              </svg>
              Real-time Identity Access Logs
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Audit trail of security and login events registered to this account.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            Live Feed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estimated Location</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Device Platform</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Occurred</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-sm">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-950">{log.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                      log.status === "success" ? "bg-green-50 text-green-700 border border-green-200" : 
                      log.status === "warning" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : 
                      "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-600">{log.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.device}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
