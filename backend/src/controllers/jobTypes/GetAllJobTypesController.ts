import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetAllJobTypesController {
    async handle(request: Request, response: Response) {
        const jobTypes = await prismaClient.job_type.findMany();

        return response.json(jobTypes);
    }
}
