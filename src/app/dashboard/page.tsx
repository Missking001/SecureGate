import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PremiumDashboard } from "@/components/dashboard/PremiumDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | SecureGate",
  description: "Manage your SecureGate account",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PremiumDashboard />
    </DashboardShell>
  );
}
