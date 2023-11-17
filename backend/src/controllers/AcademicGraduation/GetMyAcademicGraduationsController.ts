import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

type AcademicGraduation = {
    id: string;
    instituition: string;
    course_name: string;
    study_area: StudyArea;
    start_date: Date;
    date_conclusion: Date;
    conclued: boolean;
    description: string;
};

type StudyArea = {
    id: string;
    name: string;
};

export class GetMyAcademicGraduationsController {
    async handle(request: Request, response: Response) {
        const userId = request.auth_user_id;
        const myAcademicGraduationsDB =
            await prismaClient.academic_graduation.findMany({
                where: {
                    id_candidate: userId,
                },
            });

        if (!myAcademicGraduationsDB) {
            return response
                .status(404)
                .json({ error: 'Academic graduations not found' });
        }

        const academicGraduation: AcademicGraduation[] = [];

        for (const item of myAcademicGraduationsDB) {
            const studyArea = await prismaClient.study_area.findUnique({
                where: {
                    id: item.id_study_area,
                },
            });

            if (studyArea) {
                academicGraduation.push({
                    id: item.id,
                    instituition: item.instituition,
                    course_name: item.course_name,
                    study_area: studyArea,
                    start_date: item.start_date,
                    date_conclusion: item.date_conclusion,
                    conclued: item.conclued,
                    description: item.description,
                });
            }
        }

        return response.json(academicGraduation);
    }
}
