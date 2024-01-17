import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetMyCandidaciesController {
    async handle(request: Request, response: Response) {
        const userId = request.auth_user_id!;

        const candidacies = await prismaClient.candidacy.findMany({
            where: {
                id_candidate: userId,
            },
            select: {
                id: true,
                create_at: true,
                approved: true,
                finished: true,
                vacancie: {
                    select: {
                        id: true,
                        name_position: true,
                        about: true,
                        salary_expectation: true,
                        publication_date: true,
                        publisehd: true,
                        locality: true,
                        sector: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        job_type: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        type_locality: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        Vacancie_skill: {
                            select: {
                                skill: true,
                            },
                        },
                        company: {
                            select: {
                                name: true,
                                description: true,
                                number_of_employees: true,
                                slogan: true
                            }
                        },
                        Candidacy: {
                            select: {
                                id: true
                            }
                        }
                    },
                },
            },
        });

        const candidaciesResposnse = candidacies.map((item) => (
            {
                ...item,
                vacancie: {
                    ...item.vacancie,
                    Candidacy: item.vacancie.Candidacy.length
                },
            }
        ));

        return response.json(candidaciesResposnse);
    }
}
