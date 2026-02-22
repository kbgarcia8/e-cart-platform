/*
  Warnings:

  - The values [Gmail] on the enum `Providers` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "auth"."Providers_new" AS ENUM ('Local', 'Facebook', 'Google');
ALTER TABLE "auth"."UserCredentials" ALTER COLUMN "provider" TYPE "auth"."Providers_new" USING ("provider"::text::"auth"."Providers_new");
ALTER TYPE "auth"."Providers" RENAME TO "Providers_old";
ALTER TYPE "auth"."Providers_new" RENAME TO "Providers";
DROP TYPE "auth"."Providers_old";
COMMIT;
