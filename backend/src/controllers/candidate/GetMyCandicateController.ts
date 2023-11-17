import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetMyCandidateController {
    async handle(request: Request, response: Response) {
        const userId = request.auth_user_id;
        const myCandidate = await prismaClient.candidate.findUnique({
            where: {
                id: userId,
            },
            select: {
                name: true,
                email: true,
                cpf: true,
                about_me: true,
            },
        });

        return response.json(myCandidate);
    }
}
