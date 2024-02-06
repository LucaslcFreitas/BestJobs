type AcademicGraduationType = {
    id: string;
    course_name: string;
    instituition: string;
    study_area: StudyAreaType;
    start_date: string;
    date_conclusion: string;
    conclued: boolean;
    description: string;
}

type StudyAreaType = {
    id: string;
    name: string;
}

export type { AcademicGraduationType, StudyAreaType };
