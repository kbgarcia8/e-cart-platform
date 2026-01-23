-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "test";

-- CreateTable
CREATE TABLE "test"."Test" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_name_key" ON "test"."Test"("name");
