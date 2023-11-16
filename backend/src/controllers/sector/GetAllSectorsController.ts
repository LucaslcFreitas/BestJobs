import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetAllSectorsController {
    async handle(request: Request, response: Response) {
        const sectors = await prismaClient.sector.findMany();

        return response.json(sectors);
    }
}
