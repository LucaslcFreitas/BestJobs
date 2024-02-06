import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteVacancieController {
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

            const vacancie_skill = await prismaClient.vacancie_skill.findMany({
                where: {
                    id_vacancie: id,
                },
            });

            const candidacies = await prismaClient.candidacy.findMany({
                where: {
                    id_vacancie: id,
                },
            });

            //Deleta skills associadas
            if (vacancie_skill) {
                for (const vc of vacancie_skill) {
                    await prismaClient.vacancie_skill.delete({
                        where: {
                            id: vc.id,
                        },
                    });
                }
            }

            //Deleta candidatura associadas
            if (candidacies) {
                for (const candicacy of candidacies) {
                    await prismaClient.candidacy.delete({
                        where: {
                            id: candicacy.id,
                        },
                    });
                }
            }

            await prismaClient.vacancie.delete({
                where: {
                    id,
                },
            });

            return response.end();
        } catch (e) {
            return response
                .status(400)
                .json({ error: 'Failed to delete vacancie' });
        }
    }
}
