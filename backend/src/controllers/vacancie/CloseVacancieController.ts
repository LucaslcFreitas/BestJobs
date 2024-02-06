import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class CloseVacancieController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId: string = request.auth_user_id!;

        try {
            const vacancie = await prismaClient.vacancie.findUnique({
                where: {
                    id,
                    id_company: userId,
                },
            });

            if (!vacancie) {
                return response
                    .status(404)
                    .json({ error: 'Vacancie not found' });
            }

            if (!vacancie.publisehd) {
                return response
                    .status(400)
                    .json({ error: 'Vacancy already closed' });
            }

            await prismaClient.candidacy.updateMany({
                where: {
                    id_vacancie: id
                },
                data: {
                    finished: true
                }
            });

            await prismaClient.vacancie.update({
                where: {
                    id,
                    id_company: userId
                },
                data: {
                    publisehd: false
                }
            });

            return response.status(200).end();
        } catch (e) {
            return response
                .status(400)
                .json({ error: 'Failed to close vacancie' });
        }
    }
}