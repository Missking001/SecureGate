"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { PasswordStrength } from "@/components/ui/PasswordStrength";
import { signUpSchema } from "@/lib/validations/auth";
import Link from "next/link";

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = signUpSchema.safeParse(data);

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
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.error || "Unable to create account");
        setIsLoading(false);
        return;
      }

      router.push("/verify-email-notice");
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
          id="name"
          name="name"
          type="text"
          label="Full Name"
          autoComplete="name"
          required
          disabled={isLoading}
          error={errors.name}
        />
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
        <div>
          <FormField
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="new-password"
            required
            disabled={isLoading}
            error={errors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrength password={password} />
        </div>
      </div>

      <div>
        <LoadingButton type="submit" isLoading={isLoading}>
          Create account
        </LoadingButton>
      </div>

      <div className="text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
