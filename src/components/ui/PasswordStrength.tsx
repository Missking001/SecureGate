"use client";

import { useEffect, useState } from "react";

type StrengthState = "weak" | "fair" | "strong" | "empty";

export function PasswordStrength({ password }: { password?: string }) {
  const [strength, setStrength] = useState<StrengthState>("empty");

  useEffect(() => {
    if (!password) {
      setStrength("empty");
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score <= 2) {
      setStrength("weak");
    } else if (score === 3) {
      setStrength("fair");
    } else {
      setStrength("strong");
    }
  }, [password]);

  const getBarColor = (index: number) => {
    if (strength === "empty") return "bg-gray-200";
    if (strength === "weak") return index === 0 ? "bg-red-500" : "bg-gray-200";
    if (strength === "fair") return index <= 1 ? "bg-yellow-500" : "bg-gray-200";
    return "bg-green-500";
  };

  const getLabel = () => {
    if (strength === "empty") return "";
    if (strength === "weak") return "Weak";
    if (strength === "fair") return "Fair";
    return "Strong";
  };

  const getLabelColor = () => {
    if (strength === "empty") return "text-gray-500";
    if (strength === "weak") return "text-red-600";
    if (strength === "fair") return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 w-full rounded-full transition-colors ${getBarColor(i)}`}
          />
        ))}
      </div>
      {strength !== "empty" && (
        <p className={`text-xs font-medium text-right ${getLabelColor()}`}>
          {getLabel()}
        </p>
      )}
    </div>
  );
}
