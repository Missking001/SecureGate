import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateToken, getTokenExpiry } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { z } from "zod";

const resendSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = resendSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = result.data;

    // Look up user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If not found or already verified, return generic success (don't reveal status)
    if (!user || user.emailVerified) {
      return NextResponse.json(
        { message: "Verification email sent" },
        { status: 200 }
      );
    }

    // Delete existing token if any
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // Generate new token
    const token = generateToken();
    const expires = getTokenExpiry();

    // Save new token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send email
    await sendVerificationEmail(email, token);

    return NextResponse.json(
      { message: "Verification email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
