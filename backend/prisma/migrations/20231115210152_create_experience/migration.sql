-- CreateTable
CREATE TABLE "experience" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_sector" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "locality" VARCHAR(128) NOT NULL,
    "id_type_locality" TEXT NOT NULL,
    "id_job_type" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_id_sector_fkey" FOREIGN KEY ("id_sector") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_id_type_locality_fkey" FOREIGN KEY ("id_type_locality") REFERENCES "type_locality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_id_job_type_fkey" FOREIGN KEY ("id_job_type") REFERENCES "job_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
