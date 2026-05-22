/*
  Warnings:

  - You are about to drop the column `payment` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethods` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userPaymentMethodsId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "orders"."PaymentMethods" AS ENUM ('COD', 'GCash', 'PayMaya', 'Bank_Transfer', 'Credit_Card');

-- DropForeignKey
ALTER TABLE "auth"."PaymentMethods" DROP CONSTRAINT "PaymentMethods_userId_fkey";

-- AlterTable
ALTER TABLE "orders"."Orders" DROP COLUMN "payment",
ADD COLUMN     "userPaymentMethodsId" TEXT NOT NULL;

-- DropTable
DROP TABLE "auth"."PaymentMethods";

-- DropEnum
DROP TYPE "orders"."Methods";

-- DropEnum
DROP TYPE "orders"."PaymentMethod";

-- CreateTable
CREATE TABLE "auth"."UserPaymentMethods" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "orders"."PaymentMethods" NOT NULL,
    "label" TEXT,
    "address" TEXT,
    "contactPerson" TEXT,
    "contactNumber" TEXT,
    "eWalletAccountName" TEXT,
    "eWalletAccountNumber" TEXT,
    "bankName" TEXT,
    "accountName" TEXT,
    "accountNumber" TEXT,
    "expiry" TEXT,
    "cvv" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPaymentMethods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders"."Orders" ADD CONSTRAINT "Orders_userPaymentMethodsId_fkey" FOREIGN KEY ("userPaymentMethodsId") REFERENCES "auth"."UserPaymentMethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."UserPaymentMethods" ADD CONSTRAINT "UserPaymentMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
