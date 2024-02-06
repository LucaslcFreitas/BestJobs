import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteAcademicGraduationController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId: string = request.auth_user_id!;

        try {
            const academicGraduation =
                await prismaClient.academic_graduation.delete({
                    where: {
                        id,
                        id_candidate: userId,
                    },
                });

            if (!academicGraduation) {
                return response
                    .status(400)
                    .json({ error: 'Failed to delete academic graduation' });
            }
        } catch (e) {
            return response
                .status(400)
                .json({ error: 'Failed to delete academic graduation' });
        }

        return response.end();
    }
}
