/*
  Warnings:

  - You are about to drop the `AnimeAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeAuthenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeVerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimeAccount" DROP CONSTRAINT "AnimeAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeAuthenticator" DROP CONSTRAINT "AnimeAuthenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeSession" DROP CONSTRAINT "AnimeSession_userId_fkey";

-- DropTable
DROP TABLE "AnimeAccount";

-- DropTable
DROP TABLE "AnimeAuthenticator";

-- DropTable
DROP TABLE "AnimeSession";

-- DropTable
DROP TABLE "AnimeUser";

-- DropTable
DROP TABLE "AnimeVerificationToken";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "watchlist" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
