-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "inventory";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "orders";

-- CreateEnum
CREATE TYPE "inventory"."InventoryStatus" AS ENUM ('Available', 'Low_On_stock', 'Not_Available', 'For_Delivery');

-- CreateEnum
CREATE TYPE "orders"."OrderStatus" AS ENUM ('Confirming_Order', 'Preparing', 'Ready_For_Pickup', 'For_Delivery', 'Done', 'Cancelled');

-- CreateEnum
CREATE TYPE "auth"."Providers" AS ENUM ('Local', 'Facebook', 'Gmail');

-- CreateEnum
CREATE TYPE "orders"."PaymentMethod" AS ENUM ('Cash', 'E_Wallet', 'Debit_Or_Credit');

-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('Member', 'Guest', 'Admin');

-- CreateEnum
CREATE TYPE "inventory"."Sizes" AS ENUM ('Small', 'Medium', 'Large', 'Solo', 'For_Share');

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory"."Inventory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "inventory"."InventoryStatus" NOT NULL DEFAULT 'Available',
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders"."Orders" (
    "id" SERIAL NOT NULL,
    "payment" "orders"."PaymentMethod" NOT NULL DEFAULT 'Cash',
    "cartId" INTEGER NOT NULL,
    "checkoutTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "orders"."OrderStatus" NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "size" "inventory"."Sizes" NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "role" "auth"."Role" NOT NULL DEFAULT 'Member',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."UserCredentials" (
    "id" TEXT NOT NULL,
    "provider" "auth"."Providers" NOT NULL,
    "providerId" TEXT NOT NULL,
    "passwordHash" VARCHAR(72) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."UserProfile" (
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "username" VARCHAR(30),
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "inventory"."Inventory"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "auth"."Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "auth"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserCredentials_provider_providerId_key" ON "auth"."UserCredentials"("provider", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_username_key" ON "auth"."UserProfile"("username");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory"."Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders"."Orders" ADD CONSTRAINT "Orders_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."UserCredentials" ADD CONSTRAINT "UserCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
