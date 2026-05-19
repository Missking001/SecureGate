import { AuthCard } from "@/components/ui/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create an Account | SecureGate",
  description: "Sign up for a new SecureGate account",
};

export default async function SignupPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Create an account"
      description="Start your secure journey with us today."
    >
      <SignupForm />
    </AuthCard>
  );
}
