export type AcademicGraduationType = {
    id: string;
    course_name: string;
    instituition: string;
    study_area: {
        id: string,
        name: string
    };
    start_date: string;
    date_conclusion: string;
    conclued: boolean;
    description: string;
}
