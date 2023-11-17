import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../database/prismaClient';

type UpdateCandidate = {
    name: string;
    password?: string;
    about_me: string;
};

export class UpdateCandidateController {
    async handle(request: Request, response: Response) {
        const { name, password, about_me }: UpdateCandidate = request.body;
        const userId = request.auth_user_id;

        if (!name || !about_me) {
            return response.status(400).json({ error: 'Missing parameters' });
        }

        let hashPassword;
        if (password) {
            const pwd_secrete = process.env.PWD_SECRET;
            hashPassword = await bcrypt.hash(password + pwd_secrete, 10);
        }

        let updateCandidate;

        if (hashPassword) {
            updateCandidate = await prismaClient.candidate.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    password: hashPassword,
                    about_me,
                },
            });
        } else {
            updateCandidate = await prismaClient.candidate.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    about_me,
                },
            });
        }
        return response.json({
            name: updateCandidate.name,
            email: updateCandidate.email,
            cpf: updateCandidate.cpf,
            about_me: updateCandidate.about_me,
        });
    }
}
