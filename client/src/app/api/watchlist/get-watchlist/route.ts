import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // Check if user is logged in
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to view your watchlist" },
      { status: 401 },
    );
  }

  // Get user from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!user.watchlist) {
    return NextResponse.json({ error: "Watchlist not found" }, { status: 404 });
  }

  // Return watchlist
  return NextResponse.json(user.watchlist, { status: 200 });
}
