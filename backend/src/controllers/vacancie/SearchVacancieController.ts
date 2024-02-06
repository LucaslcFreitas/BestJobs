import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

type SearchVacancieQuery = {
    page?: number;
    sector?: string;
    job_type?: string;
    type_locality?: string;
};

export class SearchVacancieController {
    async handle(request: Request, response: Response) {
        const userId = request.auth_user_id!;
        const {
            page = 1,
            sector,
            job_type,
            type_locality,
        }: SearchVacancieQuery = request.query;

        const number_vacancies = await prismaClient.vacancie.count({
            where: {
                id_sector: sector,
                id_job_type: job_type,
                id_type_locality: type_locality,
                publisehd: true,
            },
        });

        const pages = Math.floor(number_vacancies / 10) + 1;

        if (page < 1 || page > pages) {
            return response.status(400).json({ error: 'Invalid page' });
        }

        const offset = (page - 1) * 10;

        const vacancies = await prismaClient.vacancie.findMany({
            orderBy: {
                publication_date: 'asc',
            },
            where: {
                id_sector: sector,
                id_job_type: job_type,
                id_type_locality: type_locality,
                publisehd: true,
            },
            skip: offset,
            take: 10,
            select: {
                id: true,
                name_position: true,
                about: true,
                salary_expectation: true,
                publication_date: true,
                publisehd: true,
                locality: true,
                sector: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                job_type: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                type_locality: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                Vacancie_skill: {
                    select: {
                        skill: true,
                    },
                },
                company: {
                    select: {
                        name: true,
                        description: true,
                        number_of_employees: true,
                        slogan: true
                    }
                },
                Candidacy: {
                    select: {
                        id: true,
                        id_candidate: true,
                    }
                }
            },
        });

        const vacanciesResposnse = vacancies.map((item) => {
            let isCandidate = false;

            if (item.Candidacy.some(e => e.id_candidate === userId)) {
                isCandidate = true;
            }

            return (
                {
                    ...item,
                    Candidacy: item.Candidacy.length,
                    is_candidate: isCandidate
                }
            );
        });

        return response.json({ vacancies: vacanciesResposnse, pages, number_vacancies });
    }
}
