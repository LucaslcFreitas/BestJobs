import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

type UpdateVacancie = {
    name_position: string;
    about: string;
    salary_expectation: number;
    id_job_type: string;
    id_type_locality: string;
    locality: string;
    skills: string[];
};

export class UpdateVacancieController {
    async handle(request: Request, response: Response) {
        const {
            name_position,
            about,
            salary_expectation,
            id_job_type,
            id_type_locality,
            locality,
            skills,
        }: UpdateVacancie = request.body;
        const { id } = request.params;
        const userId: string = request.auth_user_id!;

        if (
            !name_position ||
            !about ||
            !salary_expectation ||
            !id_job_type ||
            !id_type_locality ||
            !locality ||
            !skills
        ) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const vacancie_old = await prismaClient.vacancie.findUnique({
            where: {
                id,
                id_company: userId,
            },
        });

        if (!vacancie_old) {
            return response.status(404).json({ error: 'Vacancie not found' });
        }

        //Verifica id's passados por parâmetros
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

        //Deleta skills antigas
        const vacancie_skill_old = await prismaClient.vacancie_skill.findMany({
            where: {
                id_vacancie: id,
            },
        });

        if (vacancie_skill_old) {
            for (const vc of vacancie_skill_old) {
                await prismaClient.vacancie_skill.delete({
                    where: {
                        id: vc.id,
                    },
                });
            }
        }

        //Atualiza skills
        for (const sk of skillsDb) {
            await prismaClient.vacancie_skill.create({
                data: {
                    id_vacancie: vacancie_old.id,
                    id_skill: sk.id,
                },
            });
        }

        const vacancie = await prismaClient.vacancie.update({
            where: {
                id,
                id_company: userId,
            },
            data: {
                name_position,
                about,
                salary_expectation,
                id_job_type,
                id_type_locality,
                locality,
            },
        });

        if (!vacancie) {
            return response
                .status(400)
                .json({ error: 'Failed to update vacancie' });
        }

        return response.json({
            id: vacancie.id,
            name_position: vacancie.name_position,
            about: vacancie.about,
            salary_expectation: vacancie.salary_expectation,
            job_type: jobType,
            type_locality: typeLocality,
            locality: vacancie.locality,
            skills: skillsDb,
        });
    }
}
