import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Anime } from "@/lib/types/interfaces";

export async function GET() {
  // Check if user is logged in
  const session = await auth();
  if (!session) {
    return Response.json(
      { error: "You must be logged in to add an anime to your watchlist" },
      { status: 401 },
    );
  }

  // Get user from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  // Check if user exists
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  if (!user.watchlist) {
    return Response.json({ error: "Watchlist not found" }, { status: 404 });
  }

  // Return the watchlist directly since it's already stored as Anime objects
  return Response.json(user.watchlist, { status: 200 });
}
