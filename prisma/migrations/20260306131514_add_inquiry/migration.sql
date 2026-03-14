-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "parentName" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "childAge" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "course" TEXT,
    "preferredDates" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);
