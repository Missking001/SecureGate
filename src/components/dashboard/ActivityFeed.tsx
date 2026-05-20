"use client";

import { useEffect, useState } from "react";

interface Activity {
  id: string;
  action: string;
  details: Record<string, string> | null;
  createdAt: string;
}

const ACTION_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  signup: {
    label: "Account Created",
    icon: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    color: "text-blue-600 bg-blue-50",
  },
  login: {
    label: "Logged In",
    icon: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9",
    color: "text-green-600 bg-green-50",
  },
  logout: {
    label: "Logged Out",
    icon: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9",
    color: "text-gray-600 bg-gray-50",
  },
  email_verified: {
    label: "Email Verified",
    icon: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
    color: "text-emerald-600 bg-emerald-50",
  },
  password_changed: {
    label: "Password Changed",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
    color: "text-amber-600 bg-amber-50",
  },
  verification_resent: {
    label: "Verification Resent",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
    color: "text-purple-600 bg-purple-50",
  },
};

function getActionConfig(action: string) {
  return ACTION_LABELS[action] || {
    label: action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    icon: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z",
    color: "text-gray-600 bg-gray-50",
  };
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/activities");
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) {
          setActivities(data.activities || []);
          setIsOnline(true);
        }
      } catch {
        if (mounted) setIsOnline(false);
      }
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Recent Activity
        </h2>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
          <span className="text-xs text-gray-400">{isOnline ? "Live" : "Offline"}</span>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">
          No activity recorded yet.
        </div>
      ) : (
        <div className="space-y-1">
          {activities.map((activity) => {
            const config = getActionConfig(activity.action);
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{config.label}</p>
                  {activity.details?.ip && (
                    <p className="text-xs text-gray-400">IP: {activity.details.ip}</p>
                  )}
                </div>
                <time className="text-xs text-gray-400 shrink-0 pt-0.5" dateTime={activity.createdAt}>
                  {timeAgo(activity.createdAt)}
                </time>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
