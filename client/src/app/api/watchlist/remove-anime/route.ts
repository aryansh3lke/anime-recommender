import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  // Check if user is logged in
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to remove an anime from your watchlist" },
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

  // Get anime from request body
  const { anime } = await request.json();

  // Remove anime from watchlist
  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        watchlist: {
          set: user.watchlist.filter(
            (item: any) => item.name !== anime.name,
          ) as any[],
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove anime from watchlist" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Anime removed from watchlist" },
    { status: 200 },
  );
}
