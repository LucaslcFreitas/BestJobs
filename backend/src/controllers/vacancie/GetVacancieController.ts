import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetVacancieController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId = request.auth_user_id!;

        const vacancie = await prismaClient.vacancie.findUnique({
            where: {
                id,
            },
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
                },
            },
        });

        if (!vacancie) {
            return response.status(404).json({ error: 'Vacancie not found' });
        }

        let isCandidate = false;
        if (vacancie.Candidacy.some(item => item.id_candidate === userId)) {
            isCandidate = true;
        }

        const vacancieResposnse = {
            ...vacancie,
            Candidacy: vacancie.Candidacy.length,
            is_candidate: isCandidate
        };

        return response.json(vacancieResposnse);
    }
}
