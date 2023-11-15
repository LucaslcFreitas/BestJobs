-- CreateTable
CREATE TABLE "candidacy" (
    "id" TEXT NOT NULL,
    "id_candidate" TEXT NOT NULL,
    "id_vacancie" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidacy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "candidacy" ADD CONSTRAINT "candidacy_id_candidate_fkey" FOREIGN KEY ("id_candidate") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidacy" ADD CONSTRAINT "candidacy_id_vacancie_fkey" FOREIGN KEY ("id_vacancie") REFERENCES "vacancie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
