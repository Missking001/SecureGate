import { Resend } from "resend";
import { renderVerificationEmailHtml } from "@/emails/VerificationEmail";
import { renderPasswordResetEmailHtml } from "@/emails/PasswordResetEmail";
import type { EmailProvider } from "./provider";

function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Resend: Missing RESEND_API_KEY");
  }
  return new Resend(apiKey);
}

function getFromAddress() {
  return process.env.EMAIL_FROM || "noreply@securegate.com";
}

export const resendProvider: EmailProvider = {
  async sendVerificationEmail(email, token) {
    const emailHtml = renderVerificationEmailHtml(token);
    const client = getClient();
    const { error } = await client.emails.send({
      from: getFromAddress(),
      to: email,
      subject: "Verify your SecureGate account",
      html: emailHtml,
    });
    if (error) throw error;
    console.log("Resend: verification email sent to", email);
  },

  async sendPasswordResetEmail(email, token) {
    const emailHtml = renderPasswordResetEmailHtml(token);
    const client = getClient();
    const { error } = await client.emails.send({
      from: getFromAddress(),
      to: email,
      subject: "Reset your SecureGate password",
      html: emailHtml,
    });
    if (error) throw error;
    console.log("Resend: password reset email sent to", email);
  },
};
