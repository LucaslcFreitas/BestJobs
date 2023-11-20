/*
  Warnings:

  - Added the required column `id_company` to the `vacancie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vacancie" ADD COLUMN     "id_company" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vacancie" ADD CONSTRAINT "vacancie_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
