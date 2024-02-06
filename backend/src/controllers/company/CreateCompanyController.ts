import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../database/prismaClient';
import { sign } from 'jsonwebtoken';

type CreateCompany = {
    name: string;
    slogan: string;
    number_of_employees: string;
    email: string;
    password: string;
    description: string;
};

export class CreateCompanyController {
    async handle(request: Request, response: Response) {
        const {
            name,
            slogan,
            number_of_employees,
            email,
            password,
            description,
        }: CreateCompany = request.body;

        if (
            !name ||
            !slogan ||
            !number_of_employees ||
            !email ||
            !password ||
            !description
        ) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const pwd_secrete = process.env.PWD_SECRET;
        const hashPassword = await bcrypt.hash(password + pwd_secrete, 10);

        try {
            const company = await prismaClient.company.create({
                data: {
                    name,
                    slogan,
                    number_of_employees,
                    email,
                    password: hashPassword,
                    description,
                },
            });

            if (!company) {
                return response
                    .status(400)
                    .json({ error: 'Failed to create company' });
            }

            const jwt_secrete = process.env.JWT_SECRET;

            const token = sign({ id: company.id }, jwt_secrete!, {
                expiresIn: 43200,
            });

            return response.json({ auth: true, token, name: company.name, email: company.email, type: 'company' });
        } catch (e) {
            return response
                .status(400)
                .json({ error: 'Failed to create company' });
        }
    }
}
