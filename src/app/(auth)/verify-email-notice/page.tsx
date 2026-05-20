"use client";

import { AuthCard } from "@/components/ui/AuthCard";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailNoticePage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionStatus !== "loading") {
      if (!session) {
        router.replace("/login");
      } else if (session.user.emailVerified) {
        router.replace("/dashboard");
      }
    }
  }, [session, sessionStatus, router]);

  if (sessionStatus === "loading" || !session || session.user.emailVerified) {
    return null;
  }

  const handleResend = async () => {
    setIsLoading(true);
    setStatus("idle");
    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to resend email");
      }
    } catch {
      setStatus("error");
      setMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Check your email"
      description={`We've sent a verification link to ${session.user.email}. Please click the link to verify your account.`}
      backLink={{ href: "/signup", label: "Back" }}
    >
      <div className="mt-4 space-y-6 py-8">
        {status === "success" && <AlertBanner type="success" message={message} />}
        {status === "error" && <AlertBanner type="error" message={message} />}
        
        <div className="text-center text-base text-gray-600">
          Didn&apos;t receive the email? Check your spam folder or try resending.
        </div>
        
        <div className="space-y-3">
          <LoadingButton
            onClick={handleResend}
            isLoading={isLoading}
          >
            Resend verification email
          </LoadingButton>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-center text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors py-2"
          >
            Sign out & use another account
          </button>
        </div>
      </div>
    </AuthCard>
  );
}