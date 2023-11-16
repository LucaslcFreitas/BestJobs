import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetSkillController {
    async handle(request: Request, response: Response) {
        const { id_sector } = request.body;

        if (!id_sector) {
            return response.status(400).json({ error: 'Invalid parameter' });
        }

        const skills = await prismaClient.skill.findMany({
            where: {
                id_sector,
            },
        });

        if (skills.length === 0) {
            return response.status(404).json({ error: 'Skill not found' });
        }

        return response.json(skills);
    }
}
