import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetAllStudyAreaController {
    async handle(request: Request, response: Response) {
        const studyAreas = await prismaClient.study_area.findMany();

        return response.json(studyAreas);
    }
}
