/*
  Warnings:

  - You are about to drop the column `account_name` on the `PaymentMethods` table. All the data in the column will be lost.
  - You are about to drop the column `account_number` on the `PaymentMethods` table. All the data in the column will be lost.
  - You are about to drop the column `bank_name` on the `PaymentMethods` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `PaymentMethods` table. All the data in the column will be lost.
  - You are about to drop the column `is_default` on the `PaymentMethods` table. All the data in the column will be lost.
  - You are about to drop the column `provider_method_id` on the `PaymentMethods` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_number` on the `PaymentMethods` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_provider` on the `PaymentMethods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."PaymentMethods" DROP COLUMN "account_name",
DROP COLUMN "account_number",
DROP COLUMN "bank_name",
DROP COLUMN "is_active",
DROP COLUMN "is_default",
DROP COLUMN "provider_method_id",
DROP COLUMN "wallet_number",
DROP COLUMN "wallet_provider",
ADD COLUMN     "accountName" TEXT,
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "providerMethodId" TEXT,
ADD COLUMN     "walletNumber" TEXT,
ADD COLUMN     "walletProvider" TEXT;
