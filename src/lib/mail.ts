import { Resend } from "resend";
import VerificationEmail from "@/emails/VerificationEmail";
import PasswordResetEmail from "@/emails/PasswordResetEmail";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.RESEND_API_KEY ? "onboarding@resend.dev" : "test@example.com";

export async function sendVerificationEmail(email: string, token: string) {
  if (!process.env.RESEND_API_KEY || !resend) {
    console.warn(`Email disabled. Verification link for ${email}: ${process.env.NEXTAUTH_URL}/verify-email/${token}`);
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
  if (!process.env.RESEND_API_KEY || !resend) {
    console.warn(`Email disabled. Password reset link for ${email}: ${process.env.NEXTAUTH_URL}/reset-password/${token}`);
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
