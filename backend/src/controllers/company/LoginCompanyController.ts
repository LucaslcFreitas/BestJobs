import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../database/prismaClient';
import { sign } from 'jsonwebtoken';

type LoginCompany = {
    email: string;
    password: string;
};

export class LoginCompanyController {
    async handle(request: Request, response: Response) {
        const { email, password }: LoginCompany = request.body;

        if (!email || !password) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const company = await prismaClient.company.findFirst({
            where: {
                email,
            },
        });

        if (!company) {
            return response
                .status(401)
                .json({ error: 'Company already exists' });
        }

        const pwd_secrete = process.env.PWD_SECRET;

        const result = await bcrypt.compare(
            String(password + pwd_secrete),
            String(company.password)
        );

        if (!result) {
            return response.status(401).json({ error: 'Invalid credentials' });
        }

        const jwt_secrete = process.env.JWT_SECRET!;

        const token = sign({ id: company.id }, jwt_secrete, {
            expiresIn: 43200,
        });

        return response.json({
            auth: true,
            token,
        });
    }
}
