/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `UserPaymentMethods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."UserPaymentMethods" DROP COLUMN "deleted_at",
ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;
