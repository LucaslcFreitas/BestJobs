import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

type CreateExperience = {
    description: string;
    id_sector: string;
    position: string;
    company_name: string;
    locality: string;
    id_type_locality: string;
    id_job_type: string;
    start: string;
    end: string;
};

export class CreateExperienceController {
    async handle(request: Request, response: Response) {
        const {
            description,
            id_sector,
            position,
            company_name,
            locality,
            id_type_locality,
            id_job_type,
            start,
            end,
        }: CreateExperience = request.body;
        const userId: string = request.auth_user_id!;

        if (
            !description ||
            !id_sector ||
            !position ||
            !company_name ||
            !locality ||
            !id_type_locality ||
            !id_job_type ||
            !start ||
            !end
        ) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const startDate = new Date(start);
        const endDate = new Date(end);

        const sector = await prismaClient.sector.findUnique({
            where: {
                id: id_sector,
            },
        });
        if (!sector) {
            return response.status(404).json({ error: 'Sector not found' });
        }

        const typeLocality = await prismaClient.type_locality.findUnique({
            where: {
                id: id_type_locality,
            },
        });
        if (!typeLocality) {
            return response
                .status(404)
                .json({ error: 'Type locality not found' });
        }

        const jobType = await prismaClient.job_type.findUnique({
            where: {
                id: id_job_type,
            },
        });
        if (!jobType) {
            return response.status(404).json({ error: 'Job type not found' });
        }

        const experience = await prismaClient.experience.create({
            data: {
                description,
                id_sector,
                position,
                company_name,
                locality,
                id_type_locality,
                id_job_type,
                start: startDate,
                end: endDate,
                id_candidate: userId,
            },
        });

        if (!experience) {
            return response
                .status(400)
                .json({ error: 'Failed to create experience' });
        }

        return response.json({
            id: experience.id,
            description: experience.description,
            sector: sector,
            position: experience.position,
            company_name: experience.company_name,
            locality: experience.locality,
            type_locality: typeLocality,
            job_type: jobType,
            start: experience.start,
            end: experience.end,
        });
    }
}
