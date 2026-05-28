/*
  Warnings:

  - You are about to drop the column `isDefault` on the `UserPaymentMethods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."UserPaymentMethods" DROP COLUMN "isDefault";
