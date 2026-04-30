/*
  Warnings:

  - You are about to drop the `PaymentMethods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders"."PaymentMethods" DROP CONSTRAINT "PaymentMethods_userId_fkey";

-- DropTable
DROP TABLE "orders"."PaymentMethods";

-- CreateTable
CREATE TABLE "auth"."PaymentMethods" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "orders"."Methods" NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_method_id" TEXT,
    "wallet_provider" TEXT,
    "wallet_number" TEXT,
    "bank_name" TEXT,
    "account_name" TEXT,
    "account_number" TEXT,
    "label" TEXT,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auth"."PaymentMethods" ADD CONSTRAINT "PaymentMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
