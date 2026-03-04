/*
  Warnings:

  - A unique constraint covering the columns `[trialSlotId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "trialSlotId" INTEGER;

-- CreateTable
CREATE TABLE "TrialSlot" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "gasEventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrialSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_trialSlotId_key" ON "Booking"("trialSlotId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_trialSlotId_fkey" FOREIGN KEY ("trialSlotId") REFERENCES "TrialSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
