-- AlterTable
ALTER TABLE "User" ADD COLUMN     "watchlist" TEXT[] DEFAULT ARRAY[]::TEXT[];
