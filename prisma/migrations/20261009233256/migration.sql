-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_technicianId_fkey";

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technician_profiles"("technicianId") ON DELETE CASCADE ON UPDATE CASCADE;
