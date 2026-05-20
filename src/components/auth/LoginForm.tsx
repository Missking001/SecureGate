"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { loginSchema } from "@/lib/validations/auth";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "true";
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
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

    const result = loginSchema.safeParse(data);

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
      const response = await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }

      // Re-fetch session before redirect to ensure JWT is up-to-date
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
      {isVerified && (
        <AlertBanner
          type="success"
          message="Your email has been verified successfully. Please sign in."
        />
      )}
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
        <FormField
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          required
          disabled={isLoading}
          error={errors.password}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <LoadingButton type="submit" isLoading={isLoading}>
          Sign in
        </LoadingButton>
      </div>

      <div className="text-center text-sm">
        <span className="text-gray-600">Don&apos;t have an account? </span>
        <Link
          href="/signup"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
