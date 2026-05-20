import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/lib/validations/auth";
import { generateToken, getTokenExpiry } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Return a generic error to prevent email enumeration per security.md
      return NextResponse.json(
        { error: "Unable to create account" },
        { status: 400 }
      );
    }

    // Hash password with 12 salt rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with emailVerified = null
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // Generate token and expiry (15 mins)
    const token = generateToken();
    const expires = getTokenExpiry();

    // Save verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, token);

    // Log signup activity
    await prisma.activity.create({
      data: {
        userId: user.id,
        action: "signup",
        details: JSON.stringify({ email }),
      },
    });

    return NextResponse.json(
      { message: "User created successfully. Please verify your email." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
