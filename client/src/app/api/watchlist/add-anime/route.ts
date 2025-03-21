import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  // Check if user is logged in
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to add an anime to your watchlist" },
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

  // Check if anime is already in watchlist
  if (user.watchlist.some((item: any) => item.name === anime.name)) {
    return NextResponse.json(
      { error: "Anime already in watchlist" },
      { status: 400 },
    );
  }

  // Add anime to watchlist
  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        watchlist: {
          push: anime,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add anime to watchlist" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Anime added to watchlist" },
    { status: 200 },
  );
}
