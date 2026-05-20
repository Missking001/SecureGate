import { AuthCard } from "@/components/ui/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In | SecureGate",
  description: "Sign in to your SecureGate account",
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    if (session.user.emailVerified) {
      redirect("/dashboard");
    }
    redirect("/verify-email-notice");
  }

  return (
    <AuthCard
      title="Sign in to your account"
      description="Welcome back! Please enter your details."
    >
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
