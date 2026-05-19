"use client";

import { AuthCard } from "@/components/ui/AuthCard";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailNoticePage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (sessionStatus === "loading") {
    return null;
  }

  // If unauthenticated, they shouldn't be here (middleware handles this but just in case)
  if (!session) {
    router.replace("/login");
    return null;
  }

  // If already verified, go to dashboard
  if (session.user.emailVerified) {
    router.replace("/dashboard");
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
    } catch (err) {
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
    >
      <div className="mt-8 space-y-6">
        {status === "success" && <AlertBanner type="success" message={message} />}
        {status === "error" && <AlertBanner type="error" message={message} />}
        
        <div className="text-center text-sm text-gray-600">
          Didn't receive the email? Check your spam folder or try resending.
        </div>
        
        <div>
          <LoadingButton
            onClick={handleResend}
            isLoading={isLoading}
            className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
          >
            Resend verification email
          </LoadingButton>
        </div>
      </div>
    </AuthCard>
  );
}
