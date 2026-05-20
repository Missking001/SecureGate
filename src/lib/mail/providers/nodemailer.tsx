import nodemailer from "nodemailer";
import { connection } from "next/server";
import { renderVerificationEmailHtml } from "@/emails/VerificationEmail";
import { renderPasswordResetEmailHtml } from "@/emails/PasswordResetEmail";
import type { EmailProvider } from "./provider";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error(
      "Nodemailer: Missing SMTP configuration",
      { host: !!host, user: !!user, pass: !!pass }
    );
    throw new Error("Nodemailer: Missing SMTP configuration");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user, pass },
  });
}

export const nodemailerProvider: EmailProvider = {
  async sendVerificationEmail(email, token) {
    await connection();

    const emailHtml = renderVerificationEmailHtml(token);
    const transporter = getTransporter();
    console.log("Nodemailer: sending verification email to", email);

    const info = await transporter.sendMail({
      from: `"SecureGate" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your SecureGate account",
      html: emailHtml,
    });
    console.log("Nodemailer: verification email sent", info.messageId);
  },

  async sendPasswordResetEmail(email, token) {
    await connection();

    const emailHtml = renderPasswordResetEmailHtml(token);
    const transporter = getTransporter();
    console.log("Nodemailer: sending password reset email to", email);

    const info = await transporter.sendMail({
      from: `"SecureGate" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset your SecureGate password",
      html: emailHtml,
    });
    console.log("Nodemailer: password reset email sent", info.messageId);
  },
};
