import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/auth"; // Make sure this import path matches your auth file location

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await auth();
  if (session) {
    res.status(200).json({ session: session, user: session.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
