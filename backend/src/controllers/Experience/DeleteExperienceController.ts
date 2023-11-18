import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteExperienceController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId: string = request.auth_user_id!;

        try {
            const experience = await prismaClient.experience.delete({
                where: {
                    id,
                    id_candidate: userId,
                },
            });

            if (!experience) {
                return response
                    .status(400)
                    .json({ error: 'Failed to delete experience' });
            }
        } catch (e) {
            return response
                .status(400)
                .json({ error: 'Failed to delete experience' });
        }

        return response.end();
    }
}
