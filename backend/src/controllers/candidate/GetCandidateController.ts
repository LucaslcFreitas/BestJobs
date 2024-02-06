import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetCandidateController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId = request.auth_user_id!;

        const company = await prismaClient.company.findUnique({
            where: {
                id: userId,
            },
        });

        if (!company) {
            return response.status(400).json({ error: 'Company not found' });
        }

        const candidate = await prismaClient.candidate.findUnique({
            where: {
                id,
            },
            select: {
                name: true,
                email: true,
                cpf: true,
                about_me: true,
                Academic_graduation: {
                    select: {
                        id: true,
                        instituition: true,
                        course_name: true,
                        study_area: true,
                        start_date: true,
                        date_conclusion: true,
                        conclued: true,
                        description: true,
                    },
                },
                Experience: {
                    select: {
                        id: true,
                        description: true,
                        sector: true,
                        position: true,
                        company_name: true,
                        locality: true,
                        type_locality: true,
                        job_type: true,
                        start: true,
                        end: true,
                    },
                },
            },
        });

        if (!candidate) {
            return response.status(404).end();
        }

        return response.json(candidate);
    }
}
