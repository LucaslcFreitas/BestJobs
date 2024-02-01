import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetSkillController {
    async handle(request: Request, response: Response) {
        const { sector } = request.query;

        if (!sector && typeof sector === 'string') {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const skills = await prismaClient.skill.findMany({
            where: {
                id_sector: sector as string,
            },
        });

        if (skills.length === 0) {
            return response.status(404).json({ error: 'Skill not found' });
        }

        return response.json(skills);
    }
}
