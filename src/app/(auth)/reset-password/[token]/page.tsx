import { AuthCard } from "@/components/ui/AuthCard";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | SecureGate",
  description: "Set a new password for your SecureGate account",
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = await params;
  return (
    <AuthCard
      title="Reset your password"
      description="Please enter your new password below."
    >
      <ResetPasswordForm token={resolvedParams.token} />
    </AuthCard>
  );
}
