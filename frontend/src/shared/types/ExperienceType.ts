type ExperienceType = {
    id: string;
    position: string;
    company_name: string;
    locality: string;
    type_locality: LocalityType;
    job_type: JobType;
    sector: SectorType;
    description: string;
    start: string;
    end: string;
};

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

export type { ExperienceType, LocalityType, SectorType, JobType };
