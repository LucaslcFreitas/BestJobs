import { CandidateType } from "./CandidateType";


type SearchVacancieType = {
    vacancies: VacancieType[];
    pages: number;
    number_vacancies: number;
}

type MyCandidacyType = {
    id: string;
    create_at: string;
    approved: boolean;
    finished: boolean;
    vacancie: VacancieType;
}

type VacancieWithCandidacyType = {
    id: string;
    name_position: string;
    about: string;
    salary_expectation: number;
    publication_date: string;
    publisehd: boolean;
    locality: string;
    sector: SectorType;
    job_type: JobType;
    type_locality: LocalityType;
    Vacancie_skill: { skill: SkillType }[];
    company: CompanyType;
    Candidacy: {
        finished: boolean;
        approved: boolean;
        candidate: CandidateType
    }[];
    is_candidate?: boolean;
}

type VacancieType = {
    id: string;
    name_position: string;
    about: string;
    salary_expectation: number;
    publication_date: string;
    publisehd: boolean;
    locality: string;
    sector: SectorType;
    job_type: JobType;
    type_locality: LocalityType;
    Vacancie_skill: { skill: SkillType }[];
    company: CompanyType;
    Candidacy: number;
    is_candidate?: boolean;
}

type LocalityType = {
    id: string;
    name: string;
};

type SectorType = {
    id: string;
    name: string;
};

type JobType = {
    id: string;
    name: string;
};

type SkillType = {
    id: string;
    name: string;
    id_sector: string;
}

type CompanyType = {
    name: string;
    description: string;
    number_of_employees: string;
    slogan: string;
}

export type { SearchVacancieType, MyCandidacyType, VacancieWithCandidacyType, VacancieType, LocalityType, SectorType, JobType, SkillType, CompanyType };
