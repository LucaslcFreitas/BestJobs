import { AcademicGraduationType } from "./AcademicGraduationType"
import { ExperienceType } from "./ExperienceType"

type CandidateType = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    about_me: string;
    Academic_graduation: AcademicGraduationType[];
    Experience: ExperienceType[];
}

export type { CandidateType };
