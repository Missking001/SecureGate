import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connection } from "next/server";

export async function GET() {
  try {
    await connection();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results: Record<string, unknown> = {};

    // Check env vars
    results.smtp_host = !!process.env.SMTP_HOST;
    results.smtp_port = !!process.env.SMTP_PORT;
    results.smtp_user = !!process.env.SMTP_USER;
    results.smtp_pass = !!process.env.SMTP_PASS;
    results.email_from = !!process.env.EMAIL_FROM;
    results.nextauth_url = process.env.NEXTAUTH_URL || "NOT SET";

    // Try connecting to SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          requireTLS: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        await transporter.verify();
        results.smtp_connection = "OK";

        // Try rendering email HTML
        const { renderVerificationEmailHtml } = await import("@/emails/VerificationEmail");
        const html = renderVerificationEmailHtml("diagnostic-token");
        results.email_html_length = html.length;
        results.email_html_valid = html.includes("Verify My Email");
      } catch (err) {
        results.smtp_connection = "FAILED";
        results.smtp_error = err instanceof Error ? err.message : String(err);
      }
    } else {
      results.smtp_connection = "SKIPPED (missing config)";
    }

    return NextResponse.json({ status: "ok", ...results });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
