import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteCandidacyController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId = request.auth_user_id!;

        try {
            const candidacy = await prismaClient.candidacy.delete({
                where: {
                    id,
                    id_candidate: userId,
                    finished: false,
                },
            });

            if (!candidacy) {
                return response
                    .status(400)
                    .json({ error: 'Failed to delete candidacy' });
            }
        } catch (e) {
            return response
                .status(400)
                .json({ error: 'Failed to delete candidacy' });
        }

        return response.end();
    }
}
