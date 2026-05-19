import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { UserGreeting } from "@/components/dashboard/UserGreeting";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | SecureGate",
  description: "Manage your SecureGate account",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <UserGreeting />
        
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Security Overview
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Your account is protected by SecureGate authentication.</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
