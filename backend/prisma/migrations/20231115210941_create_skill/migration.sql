-- CreateTable
CREATE TABLE "skill" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "id_sector" TEXT NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
