import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

type CreateVacancie = {
    name_position: string;
    about: string;
    id_sector: string;
    salary_expectation: number;
    id_job_type: string;
    id_type_locality: string;
    locality: string;
    skills: string[];
};

export class CreateVacancieController {
    async handle(request: Request, response: Response) {
        const {
            name_position,
            about,
            id_sector,
            salary_expectation,
            id_job_type,
            id_type_locality,
            locality,
            skills,
        }: CreateVacancie = request.body;
        const userId = request.auth_user_id!;

        if (
            !name_position ||
            !about ||
            !id_sector ||
            !salary_expectation ||
            !id_job_type ||
            !id_type_locality ||
            !locality ||
            !skills
        ) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        //Verifica id's passados por parâmetros
        const sector = await prismaClient.sector.findUnique({
            where: {
                id: id_sector,
            },
        });
        if (!sector) {
            return response.status(404).json({ error: 'Sector not found' });
        }

        const jobType = await prismaClient.job_type.findUnique({
            where: {
                id: id_job_type,
            },
        });
        if (!jobType) {
            return response.status(404).json({ error: 'Job type not found' });
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

        const skillsDb = [];
        for (const skId of skills) {
            const skill = await prismaClient.skill.findUnique({
                where: {
                    id: skId,
                },
            });
            if (!skill) {
                return response.status(404).json({ error: 'Skill not found' });
            }
            skillsDb.push(skill);
        }

        const vacancie = await prismaClient.vacancie.create({
            data: {
                id_company: userId,
                name_position,
                about,
                id_sector,
                salary_expectation,
                id_job_type,
                id_type_locality,
                locality,
            },
        });
        if (!vacancie) {
            return response
                .status(400)
                .json({ error: 'Failed to create vacancie' });
        }

        for (const sk of skillsDb) {
            await prismaClient.vacancie_skill.create({
                data: {
                    id_vacancie: vacancie.id,
                    id_skill: sk.id,
                },
            });
        }

        return response.json({
            id: vacancie.id,
            name_position: vacancie.name_position,
            about: vacancie.about,
            sector: sector,
            salary_expectation: vacancie.salary_expectation,
            job_type: jobType,
            type_locality: typeLocality,
            locality: vacancie.locality,
            skills: skillsDb,
        });
    }
}
