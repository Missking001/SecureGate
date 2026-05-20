import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import VerificationEmail from "@/emails/VerificationEmail";
import PasswordResetEmail from "@/emails/PasswordResetEmail";

const transporter =
  process.env.SMTP_HOST
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : null;

const fromEmail = process.env.EMAIL_FROM || "noreply@securegate.app";

export async function sendVerificationEmail(email: string, token: string) {
  const link = `${process.env.NEXTAUTH_URL}/verify-email/${token}`;
  console.log(`[DEV] Verification link for ${email}: ${link}`);

  if (!transporter) {
    return;
  }

  try {
    const html = await render(VerificationEmail({ token }));
    await transporter.sendMail({
      from: `SecureGate <${fromEmail}>`,
      to: email,
      subject: "Verify your SecureGate account",
      html,
    });
  } catch (error) {
    console.error("Failed to send verification email", error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const link = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  console.log(`[DEV] Password reset link for ${email}: ${link}`);

  if (!transporter) {
    return;
  }

  try {
    const html = await render(PasswordResetEmail({ token }));
    await transporter.sendMail({
      from: `SecureGate <${fromEmail}>`,
      to: email,
      subject: "Reset your SecureGate password",
      html,
    });
  } catch (error) {
    console.error("Failed to send password reset email", error);
  }
}
