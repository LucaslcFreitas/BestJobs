import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetAllTypeLocalitiesController {
    async handle(request: Request, response: Response) {
        const typeLocalities = await prismaClient.type_locality.findMany();

        return response.json(typeLocalities);
    }
}
