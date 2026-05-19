"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { resetPasswordSchema } from "@/lib/validations/auth";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = resetPasswordSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, token }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.error || "Failed to reset password");
        setIsLoading(false);
        return;
      }

      router.push("/login?reset=success");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
      {error && <AlertBanner type="error" message={error} />}
      
      <div className="space-y-4">
        <FormField
          id="password"
          name="password"
          type="password"
          label="New Password"
          autoComplete="new-password"
          required
          disabled={isLoading}
          error={errors.password}
        />
        <FormField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          autoComplete="new-password"
          required
          disabled={isLoading}
          error={errors.confirmPassword}
        />
      </div>

      <div>
        <LoadingButton type="submit" isLoading={isLoading}>
          Reset password
        </LoadingButton>
      </div>
    </form>
  );
}
