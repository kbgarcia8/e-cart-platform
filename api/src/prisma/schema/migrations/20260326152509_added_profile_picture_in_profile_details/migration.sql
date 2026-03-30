/*
  Warnings:

  - A unique constraint covering the columns `[profilePicture]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "auth"."UserProfile" ADD COLUMN     "profilePicture" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_profilePicture_key" ON "auth"."UserProfile"("profilePicture");
