"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = forgotPasswordSchema.safeParse(data);

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
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      setSuccess(responseData.message);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mt-8 space-y-6">
        <AlertBanner type="success" message={success} />
        <div className="text-center text-sm">
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Return to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
      {error && <AlertBanner type="error" message={error} />}
      
      <div className="space-y-4">
        <FormField
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          required
          disabled={isLoading}
          error={errors.email}
        />
      </div>

      <div>
        <LoadingButton type="submit" isLoading={isLoading}>
          Send reset link
        </LoadingButton>
      </div>

      <div className="text-center text-sm">
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
