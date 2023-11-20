import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetVacancieController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

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
            },
        });

        if (!vacancie) {
            return response.status(404).json({ error: 'Vacancie not found' });
        }

        return response.json(vacancie);
    }
}
