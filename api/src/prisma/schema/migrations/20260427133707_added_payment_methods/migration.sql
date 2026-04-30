-- CreateEnum
CREATE TYPE "orders"."Methods" AS ENUM ('COD', 'GCash', 'PayMaya', 'Bank_Transfer', 'Credit_Card');

-- CreateTable
CREATE TABLE "orders"."PaymentMethods" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "orders"."Methods" NOT NULL DEFAULT 'COD',
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
ALTER TABLE "orders"."PaymentMethods" ADD CONSTRAINT "PaymentMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
