-- CreateTable
CREATE TABLE "password_reset_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_reset_requests_pkey" PRIMARY KEY ("id")
);
