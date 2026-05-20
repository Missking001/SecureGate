import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { isTokenExpired } from "@/lib/token";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const { password } = result.data;
    const token = body.token;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Look up token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: "This link is invalid" },
        { status: 400 }
      );
    }

    // Check expiry
    if (isTokenExpired(resetToken.expires)) {
      return NextResponse.json(
        { error: "This link has expired" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { hashedPassword },
    });

    // Delete token
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
