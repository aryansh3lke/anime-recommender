/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "AnimeUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "watchlist" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "AnimeUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnimeUser_username_key" ON "AnimeUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeUser_email_key" ON "AnimeUser"("email");
