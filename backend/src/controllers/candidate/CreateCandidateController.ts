import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../database/prismaClient';
import { sign } from 'jsonwebtoken';

type CreateCandidate = {
    name: string;
    email: string;
    cpf: string;
    password: string;
    about_me: string;
};

export class CreateCandidateController {
    async handle(request: Request, response: Response) {
        const { name, email, cpf, password, about_me }: CreateCandidate =
            request.body;

        if (!name || !email || !cpf || !password || !about_me) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const pwd_secrete = process.env.PWD_SECRET;
        const hashPassword = await bcrypt.hash(password + pwd_secrete, 10);

        try {
            const candidate = await prismaClient.candidate.create({
                data: {
                    name,
                    email,
                    cpf,
                    password: hashPassword,
                    about_me,
                },
            });

            if (!candidate) {
                return response
                    .status(400)
                    .json({ error: 'Failed to create user' });
            }

            const jwt_secrete = process.env.JWT_SECRET;

            const token = sign({ id: candidate.id }, jwt_secrete!, {
                expiresIn: 43200,
            });

            return response.json({ auth: true, token });
        } catch (e) {
            return response
                .status(400)
                .json({ error: 'Failed to create user' });
        }
    }
}
