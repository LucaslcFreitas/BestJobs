-- CreateTable
CREATE TABLE "vacancie" (
    "id" TEXT NOT NULL,
    "name_position" VARCHAR(255) NOT NULL,
    "about" TEXT NOT NULL,
    "id_sector" TEXT NOT NULL,
    "salary_expectation" DOUBLE PRECISION,
    "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publisehd" BOOLEAN NOT NULL DEFAULT true,
    "id_job_type" TEXT NOT NULL,
    "id_type_locality" TEXT NOT NULL,
    "locality" VARCHAR(128) NOT NULL,

    CONSTRAINT "vacancie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vacancie" ADD CONSTRAINT "vacancie_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancie" ADD CONSTRAINT "vacancie_id_job_type_fkey" FOREIGN KEY ("id_job_type") REFERENCES "job_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancie" ADD CONSTRAINT "vacancie_id_type_locality_fkey" FOREIGN KEY ("id_type_locality") REFERENCES "type_locality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
