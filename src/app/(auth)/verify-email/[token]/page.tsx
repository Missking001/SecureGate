"use client";

import { useEffect, useState } from "react";
import { AuthCard } from "@/components/ui/AuthCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AlertBanner } from "@/components/ui/AlertBanner";
import Link from "next/link";
import { use } from "react";

export default function VerifyEmailPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: resolvedParams.token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.error);
        }
      } catch (err) {
        setStatus("error");
        setMessage("An unexpected error occurred");
      }
    };

    verify();
  }, [resolvedParams.token]);

  return (
    <AuthCard
      title="Email Verification"
      description={
        status === "loading"
          ? "Please wait while we verify your email..."
          : status === "success"
          ? "Thank you for verifying your email."
          : "We couldn't verify your email."
      }
    >
      <div className="mt-8 flex flex-col items-center justify-center space-y-6">
        {status === "loading" && <LoadingSpinner className="h-12 w-12 text-blue-600" />}
        {status === "success" && (
          <>
            <AlertBanner type="success" message={message} />
            <Link
              href="/dashboard"
              className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Continue to Dashboard
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <AlertBanner type="error" message={message} />
            <Link
              href="/login"
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </AuthCard>
  );
}
