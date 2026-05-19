import { Resend } from "resend";
import VerificationEmail from "@/emails/VerificationEmail";
import PasswordResetEmail from "@/emails/PasswordResetEmail";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.RESEND_API_KEY ? "onboarding@resend.dev" : "test@example.com";

export async function sendVerificationEmail(email: string, token: string) {
  const link = `${process.env.NEXTAUTH_URL}/verify-email/${token}`;
  console.log(`[DEV] Verification link for ${email}: ${link}`);

  if (!process.env.RESEND_API_KEY || !resend) {
    return;
  }

  try {
    await resend.emails.send({
      from: `SecureGate <${fromEmail}>`,
      to: email,
      subject: "Verify your SecureGate account",
      react: VerificationEmail({ token }),
    });
  } catch (error) {
    console.error("Failed to send verification email", error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const link = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  console.log(`[DEV] Password reset link for ${email}: ${link}`);

  if (!process.env.RESEND_API_KEY || !resend) {
    return;
  }

  try {
    await resend.emails.send({
      from: `SecureGate <${fromEmail}>`,
      to: email,
      subject: "Reset your SecureGate password",
      react: PasswordResetEmail({ token }),
    });
  } catch (error) {
    console.error("Failed to send password reset email", error);
  }
}
