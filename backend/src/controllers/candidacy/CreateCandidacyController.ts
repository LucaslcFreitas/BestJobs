import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CreateCandidacyController {
    async handle(request: Request, response: Response) {
        const { id_vacancie } = request.body;
        const userId = request.auth_user_id!;

        if (!id_vacancie) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const candidate = await prismaClient.candidate.findUnique({
            where: {
                id: userId,
            },
        });

        if (!candidate) {
            return response.status(404).json({ error: 'Candidate not found' });
        }

        const vacancie = await prismaClient.vacancie.findUnique({
            where: {
                id: id_vacancie,
            },
        });

        if (!vacancie) {
            return response.status(404).json({ error: 'Vacancie not found' });
        }

        const candidacy = await prismaClient.candidacy.create({
            data: {
                id_candidate: userId,
                id_vacancie,
            },
        });

        if (!candidacy) {
            return response
                .status(400)
                .json({ error: 'Failed to create candidacy' });
        }
        return response.end();
    }
}
