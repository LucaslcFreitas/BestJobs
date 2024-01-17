import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetVacancieCompanyController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId: string = request.auth_user_id!;

        const vacancie = await prismaClient.vacancie.findUnique({
            where: {
                id,
                id_company: userId,
            },
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
                company: {
                    select: {
                        name: true,
                        description: true,
                        number_of_employees: true,
                        slogan: true
                    }
                },
                Vacancie_skill: {
                    select: {
                        skill: true,
                    },
                },
                Candidacy: {
                    select: {
                        finished: true,
                        approved: true,
                        candidate: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                cpf: true,
                                about_me: true,
                                Academic_graduation: {
                                    select: {
                                        id: true,
                                        instituition: true,
                                        course_name: true,
                                        study_area: true,
                                        start_date: true,
                                        date_conclusion: true,
                                        conclued: true,
                                        description: true,
                                    },
                                },
                                Experience: {
                                    select: {
                                        id: true,
                                        description: true,
                                        sector: true,
                                        position: true,
                                        company_name: true,
                                        locality: true,
                                        type_locality: true,
                                        job_type: true,
                                        start: true,
                                        end: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!vacancie) {
            return response.status(404).json({ error: 'Vacancie not found' });
        }

        return response.json(vacancie);
    }
}
