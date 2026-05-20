import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PremiumDashboard } from "@/components/dashboard/PremiumDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | SecureGate",
  description: "Manage your SecureGate account",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.emailVerified) {
    redirect("/verify-email-notice");
  }

  return (
    <DashboardShell>
      <PremiumDashboard />
    </DashboardShell>
  );
}
