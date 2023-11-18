import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetMyCompanyController {
    async handle(request: Request, response: Response) {
        const userId = request.auth_user_id;
        const myCompany = await prismaClient.company.findUnique({
            where: {
                id: userId,
            },
            select: {
                name: true,
                slogan: true,
                number_of_employees: true,
                email: true,
                description: true,
            },
        });

        return response.json(myCompany);
    }
}
