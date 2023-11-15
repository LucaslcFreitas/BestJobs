-- CreateTable
CREATE TABLE "vacancie_skill" (
    "id" TEXT NOT NULL,
    "id_skill" TEXT NOT NULL,
    "id_vacancie" TEXT NOT NULL,

    CONSTRAINT "vacancie_skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vacancie_skill" ADD CONSTRAINT "vacancie_skill_id_skill_fkey" FOREIGN KEY ("id_skill") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancie_skill" ADD CONSTRAINT "vacancie_skill_id_vacancie_fkey" FOREIGN KEY ("id_vacancie") REFERENCES "vacancie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
