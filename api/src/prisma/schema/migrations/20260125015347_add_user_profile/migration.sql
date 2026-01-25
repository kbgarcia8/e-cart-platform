-- CreateTable
CREATE TABLE "auth"."UserProfile" (
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "username" VARCHAR(30),
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_username_key" ON "auth"."UserProfile"("username");

-- AddForeignKey
ALTER TABLE "auth"."UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
