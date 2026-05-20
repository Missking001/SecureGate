import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

import { headers } from "next/headers";
import { loginRateLimiter } from "@/lib/ratelimit";
import { authConfig } from "@/lib/auth.config";

async function logActivity(userId: string, action: string, details?: string) {
  try {
    await prisma.activity.create({
      data: { userId, action, details },
    });
  } catch (e) {
    console.error("Failed to log activity:", e);
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const reqHeaders = await headers();
        const ip = reqHeaders.get("x-forwarded-for") || "127.0.0.1";
        const { success } = await loginRateLimiter.limit(ip);

        if (!success) {
          throw new Error("Too many login attempts. Please try again later.");
        }

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          return null;
        }

        // Update lastLoginAt and log activity (fire-and-forget)
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
        await logActivity(user.id, "login", JSON.stringify({ ip }));

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
});
