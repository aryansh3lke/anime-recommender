// add to package.json
/*
"prisma": {
    "seed": "tsx prisma/seed.ts"
}
*/

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const password = await hash("password", 10);
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "testuser@gmail.com",
    },
  });

  const users = await prisma.user.findMany();

  console.log("\nTest user:", user);
  console.log("\nCurrent database:", users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
