import { AuthCard } from "@/components/ui/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an Account | SecureGate",
  description: "Sign up for a new SecureGate account",
};

export default function SignupPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Start your secure journey with us today."
    >
      <SignupForm />
    </AuthCard>
  );
}
