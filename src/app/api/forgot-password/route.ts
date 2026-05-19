import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { generateToken, getTokenExpiry } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";
import { forgotPasswordRateLimiter } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    // 1. Rate limiting check (3 per IP per 15 minutes)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = await forgotPasswordRateLimiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Validate input
    const body = await req.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // 3. Look up user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 4. Generate token and send email if user exists
    if (user) {
      const token = generateToken();
      const expires = getTokenExpiry(); // 15 mins

      await prisma.passwordResetToken.create({
        data: {
          email,
          token,
          expires,
        },
      });

      await sendPasswordResetEmail(email, token);
    }

    // 5. Always return the same success message
    return NextResponse.json(
      { message: "If an account with that email exists, a reset link has been sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
