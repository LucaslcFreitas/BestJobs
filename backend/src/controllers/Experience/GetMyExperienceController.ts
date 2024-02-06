import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetMyExperienceController {
    async handle(request: Request, response: Response) {
        const userId = request.auth_user_id;

        const myExperience = await prismaClient.experience.findMany({
            where: {
                id_candidate: userId,
            },
            select: {
                id: true,
                description: true,
                sector: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                position: true,
                company_name: true,
                locality: true,
                type_locality: {
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
                start: true,
                end: true,
            },
        });

        return response.json(myExperience);
    }
}
