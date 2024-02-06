import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../database/prismaClient';

type UpdateCompany = {
    name: string;
    slogan: string;
    number_of_employees: string;
    password?: string;
    description: string;
};

export class UpdateCompanyController {
    async handle(request: Request, response: Response) {
        const {
            name,
            slogan,
            number_of_employees,
            password,
            description,
        }: UpdateCompany = request.body;
        const userId = request.auth_user_id;

        if (!name || !slogan || !number_of_employees || !description) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        let hashPassword;
        if (password) {
            const pwd_secrete = process.env.PWD_SECRET;
            hashPassword = await bcrypt.hash(password + pwd_secrete, 10);
        }

        let updateCompany;

        if (hashPassword) {
            updateCompany = await prismaClient.company.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    slogan,
                    number_of_employees,
                    password: hashPassword,
                    description,
                },
            });
        } else {
            updateCompany = await prismaClient.company.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    slogan,
                    number_of_employees,
                    description,
                },
            });
        }
        return response.json({
            name: updateCompany.name,
            slogan: updateCompany.slogan,
            number_of_employees: updateCompany.number_of_employees,
            email: updateCompany.email,
            description: updateCompany.description,
        });
    }
}
