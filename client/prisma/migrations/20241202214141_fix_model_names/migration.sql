/*
  Warnings:

  - You are about to drop the `Anime_Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Anime_Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Anime_Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Anime_User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Anime_VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anime_Account" DROP CONSTRAINT "Anime_Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Anime_Authenticator" DROP CONSTRAINT "Anime_Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Anime_Session" DROP CONSTRAINT "Anime_Session_userId_fkey";

-- DropTable
DROP TABLE "Anime_Account";

-- DropTable
DROP TABLE "Anime_Authenticator";

-- DropTable
DROP TABLE "Anime_Session";

-- DropTable
DROP TABLE "Anime_User";

-- DropTable
DROP TABLE "Anime_VerificationToken";

-- CreateTable
CREATE TABLE "AnimeUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "watchList" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnimeUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeAccount" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnimeAccount_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "AnimeSession" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AnimeVerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnimeVerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "AnimeAuthenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "AnimeAuthenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnimeUser_username_key" ON "AnimeUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeUser_email_key" ON "AnimeUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeSession_sessionToken_key" ON "AnimeSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeAuthenticator_credentialID_key" ON "AnimeAuthenticator"("credentialID");

-- AddForeignKey
ALTER TABLE "AnimeAccount" ADD CONSTRAINT "AnimeAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AnimeUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeSession" ADD CONSTRAINT "AnimeSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AnimeUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeAuthenticator" ADD CONSTRAINT "AnimeAuthenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AnimeUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
