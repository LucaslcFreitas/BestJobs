-- CreateTable
CREATE TABLE "academic_graduation" (
    "id" TEXT NOT NULL,
    "instituition" VARCHAR(255) NOT NULL,
    "course_name" VARCHAR(255) NOT NULL,
    "id_study_area" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "date_conclusion" TIMESTAMP(3) NOT NULL,
    "conclued" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "id_candidate" TEXT NOT NULL,

    CONSTRAINT "academic_graduation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "academic_graduation" ADD CONSTRAINT "academic_graduation_id_study_area_fkey" FOREIGN KEY ("id_study_area") REFERENCES "study_area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_graduation" ADD CONSTRAINT "academic_graduation_id_candidate_fkey" FOREIGN KEY ("id_candidate") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
