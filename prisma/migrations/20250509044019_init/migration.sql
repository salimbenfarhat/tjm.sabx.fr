-- CreateTable
CREATE TABLE "GuestUsage" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestUsage_pkey" PRIMARY KEY ("id")
);
