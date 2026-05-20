import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const activities = await prisma.activity.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { lastLoginAt: true, createdAt: true, emailVerified: true },
    });

    return NextResponse.json({
      activities: activities.map((a) => ({
        id: a.id,
        action: a.action,
        details: a.details ? JSON.parse(a.details) : null,
        createdAt: a.createdAt.toISOString(),
      })),
      lastLoginAt: user?.lastLoginAt?.toISOString() ?? null,
      memberSince: user?.createdAt.toISOString(),
      emailVerified: user?.emailVerified,
    });
  } catch (error) {
    console.error("Activities fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
