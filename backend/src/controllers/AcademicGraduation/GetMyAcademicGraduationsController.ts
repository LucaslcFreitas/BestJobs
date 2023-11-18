import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetMyAcademicGraduationsController {
    async handle(request: Request, response: Response) {
        const userId = request.auth_user_id;
        const myAcademicGraduations =
            await prismaClient.academic_graduation.findMany({
                where: {
                    id_candidate: userId,
                },
                select: {
                    id: true,
                    instituition: true,
                    course_name: true,
                    study_area: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    start_date: true,
                    date_conclusion: true,
                    conclued: true,
                    description: true,
                },
            });

        return response.json(myAcademicGraduations);
    }
}
