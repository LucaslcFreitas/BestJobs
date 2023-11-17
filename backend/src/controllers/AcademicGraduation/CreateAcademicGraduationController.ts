import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

type CreateAcademicGraduation = {
    instituition: string;
    course_name: string;
    id_study_area: string;
    start_date: string;
    date_conclusion: string;
    conclued: boolean;
    description: string;
};

export class CreateAcademicGraduationController {
    async handle(request: Request, response: Response) {
        const {
            instituition,
            course_name,
            id_study_area,
            start_date,
            date_conclusion,
            conclued,
            description,
        }: CreateAcademicGraduation = request.body;
        const userId: string = request.auth_user_id!;

        if (
            !instituition ||
            !course_name ||
            !id_study_area ||
            !start_date ||
            !date_conclusion ||
            !conclued ||
            !description
        ) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const startDateParse = new Date(start_date);
        const dateConclusionParse = new Date(date_conclusion);

        const studyArea = await prismaClient.study_area.findUnique({
            where: {
                id: id_study_area,
            },
        });
        if (!studyArea) {
            return response.status(404).json({ error: 'Study area not found' });
        }

        const academicGraduation =
            await prismaClient.academic_graduation.create({
                data: {
                    instituition,
                    course_name,
                    id_study_area,
                    start_date: startDateParse,
                    date_conclusion: dateConclusionParse,
                    conclued,
                    description,
                    id_candidate: userId,
                },
            });

        if (!academicGraduation) {
            return response
                .status(400)
                .json({ error: 'Failed to create academic graduation' });
        }

        return response.json({
            id: academicGraduation.id,
            instituition: academicGraduation.instituition,
            study_area: studyArea,
            start_date: academicGraduation.start_date,
            date_conclusion: academicGraduation.date_conclusion,
            conclued: academicGraduation.conclued,
            description: academicGraduation.description,
        });
    }
}
