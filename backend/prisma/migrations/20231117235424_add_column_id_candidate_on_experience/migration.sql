/*
  Warnings:

  - Added the required column `id_candidate` to the `experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "experience" ADD COLUMN     "id_candidate" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_id_candidate_fkey" FOREIGN KEY ("id_candidate") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
