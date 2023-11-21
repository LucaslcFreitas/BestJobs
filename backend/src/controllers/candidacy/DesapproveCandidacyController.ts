import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DisapproveCandidacyController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId = request.auth_user_id!;

        const company = await prismaClient.company.findUnique({
            where: {
                id: userId,
            },
        });

        if (!company) {
            return response.status(400).json({ error: 'Action not permited' });
        }

        try {
            await prismaClient.candidacy.update({
                where: {
                    id,
                    vacancie: {
                        id_company: userId,
                    },
                    finished: false,
                },
                data: {
                    finished: true,
                    approved: false,
                },
            });
        } catch (e) {
            return response
                .status(400)
                .json({ error: 'Failed to finish candidacy' });
        }

        return response.end();
    }
}
