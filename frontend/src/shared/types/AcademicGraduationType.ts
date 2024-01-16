export type AcademicGraduationType = {
    id: string;
    courseName: string;
    instituition: string;
    studyArea: {
        id: string,
        name: string
    };
    startDate: string;
    endDate: string;
    conclued: boolean;
    description: string;
}
