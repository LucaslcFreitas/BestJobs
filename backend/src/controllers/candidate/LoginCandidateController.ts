import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../database/prismaClient';
import { sign } from 'jsonwebtoken';

type LoginCandidate = {
    email: string;
    password: string;
};

export class LoginCandidateController {
    async handle(request: Request, response: Response) {
        const { email, password }: LoginCandidate = request.body;

        if (!email || !password) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        const candidate = await prismaClient.candidate.findFirst({
            where: {
                email,
            },
        });

        if (!candidate) {
            return response.status(401).json({ error: 'User already exists' });
        }

        const pwd_secrete = process.env.PWD_SECRET;

        const result = await bcrypt.compare(
            String(password + pwd_secrete),
            String(candidate.password)
        );

        if (!result) {
            return response.status(401).json({ error: 'Invalid credentials' });
        }

        const jwt_secrete = process.env.JWT_SECRET!;

        const token = sign({ id: candidate.id }, jwt_secrete, {
            expiresIn: 43200,
        });

        return response.json({
            auth: true,
            token,
        });
    }
}
