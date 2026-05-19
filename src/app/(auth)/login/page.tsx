import { AuthCard } from "@/components/ui/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | SecureGate",
  description: "Sign in to your SecureGate account",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in to your account"
      description="Welcome back! Please enter your details."
    >
      <LoginForm />
    </AuthCard>
  );
}
