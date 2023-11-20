import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetMyVacancieController {
    async handle(request: Request, response: Response) {
        const userId = request.auth_user_id;

        const myVacancies = await prismaClient.vacancie.findMany({
            where: {
                id_company: userId,
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
                Candidacy: true,
            },
        });

        return response.json(myVacancies);
    }
}
