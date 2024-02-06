/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sector` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sector_name_key" ON "sector"("name");
