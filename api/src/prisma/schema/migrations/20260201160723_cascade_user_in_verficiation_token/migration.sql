-- DropForeignKey
ALTER TABLE "auth"."VerificationToken" DROP CONSTRAINT "VerificationToken_userId_fkey";

-- AddForeignKey
ALTER TABLE "auth"."VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
