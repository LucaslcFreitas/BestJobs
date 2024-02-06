-- AlterTable
ALTER TABLE "candidacy" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false;
