import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isTokenExpired } from "@/lib/token";
import { verifyEmailRateLimiter } from "@/lib/ratelimit";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const reqHeaders = await headers();
    const ip = reqHeaders.get("x-forwarded-for") || "127.0.0.1";
    const { success } = await verifyEmailRateLimiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Look up token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: "This link is invalid" },
        { status: 400 }
      );
    }

    // Check expiry
    if (isTokenExpired(verificationToken.expires)) {
      return NextResponse.json(
        { error: "This link has expired" },
        { status: 400 }
      );
    }

    // Mark user as verified
    const user = await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    // Delete token
    await prisma.verificationToken.delete({
      where: { token },
    });

    // Log verification activity
    await prisma.activity.create({
      data: {
        userId: user.id,
        action: "email_verified",
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
