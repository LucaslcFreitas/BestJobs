import './styles.sass';
import { MdOutlineAdd } from 'react-icons/md';
import IconLink from '../../../components/IconLink';
import { VacancieWithCandidacyType } from '../../../shared/types/VacancieType';
import { useEffect, useState } from 'react';
import MyVacancieCard from '../../../components/company/myVacancie/MyVacancieCard';
import { useDispatch } from 'react-redux';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';
import {
    showAlertConfirm,
    hideAlertConfirm,
} from '../../../redux/alert/sliceAlertConfirm';
import { useNavigate } from 'react-router-dom';

const myVacancieData: VacancieWithCandidacyType[] = [
    {
        id: '78fb19ad-8de9-4534-a116-63704e7c31b5',
        name_position: 'Desenvolvedor Front-end',
        about: 'Desenvolver aplicações React',
        salary_expectation: 2000,
        publication_date: '2023-11-20T20:45:58.353Z',
        publisehd: true,
        locality: 'Juiz de Fora',
        sector: {
            id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
            name: 'Tecnologia da Informação',
        },
        job_type: {
            id: 'e538fddc-762a-448b-be71-28b3545cd12d',
            name: 'Tempo Integral',
        },
        type_locality: {
            id: '13e072dd-0248-43e2-9e93-1db8f4987250',
            name: 'Romoto',
        },
        Vacancie_skill: [
            {
                skill: {
                    id: '3e32adba-e2d9-4333-895d-2f6fde1883d2',
                    name: 'JavaScript',
                    id_sector: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                },
            },
            {
                skill: {
                    id: 'e9437aeb-312b-4c3f-bf14-3608f4c4504f',
                    name: 'React',
                    id_sector: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                },
            },
        ],
        company: {
            name: 'Empresa DEV',
            description: 'Fábrica de software',
            number_of_employees: '100 - 500 funcionários',
            slogan: 'A melhor empresa do mundo',
        },
        Candidacy: [
            {
                finished: true,
                approved: true,
                candidate: {
                    id: '5b7d9389-eec0-4efa-a659-e31c487dceda',
                    name: 'Lucas',
                    email: 'lucaslcfjf@hotmail.com',
                    cpf: '111.111.111-11',
                    about_me: 'Desenvolvedor web',
                    Academic_graduation: [
                        {
                            id: '79f4b4ea-570a-43ee-83f5-b591b638fe8e',
                            instituition: 'UFJF',
                            course_name: 'Sistemas de Informação',
                            study_area: {
                                id: 'd3b5b254-0e19-464c-9a33-33cc633b6312',
                                name: 'Engenharia/Tecnologia',
                            },
                            start_date: '2023-06-15T16:35:19.047Z',
                            date_conclusion: '2023-06-15T16:39:19.047Z',
                            conclued: true,
                            description: 'Curso Universitário',
                        },
                    ],
                    Experience: [
                        {
                            id: '1466d8e9-a3a8-411f-aa43-a685ca64e672',
                            description: 'Desenvolvimento de aplicações web',
                            sector: {
                                id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                                name: 'Tecnologia da Informação',
                            },
                            position: 'Desenvolvedor Fron-End',
                            company_name: 'UFJF',
                            locality: 'Juiz de Fora - MG',
                            type_locality: {
                                id: 'db113946-2467-4c27-aece-6a24f9631271',
                                name: 'Presencial',
                            },
                            job_type: {
                                id: 'e538fddc-762a-448b-be71-28b3545cd12d',
                                name: 'Tempo Integral',
                            },
                            start: '2023-06-15T16:35:19.047Z',
                            end: '2023-06-15T16:39:19.047Z',
                        },
                    ],
                },
            },
            {
                finished: true,
                approved: true,
                candidate: {
                    id: '5b7d9389-eec0-4efa-a659-e31c487dceda',
                    name: 'Lucas',
                    email: 'lucaslcfjf@hotmail.com',
                    cpf: '111.111.111-11',
                    about_me: 'Desenvolvedor web',
                    Academic_graduation: [
                        {
                            id: '79f4b4ea-570a-43ee-83f5-b591b638fe8e',
                            instituition: 'UFJF',
                            course_name: 'Sistemas de Informação',
                            study_area: {
                                id: 'd3b5b254-0e19-464c-9a33-33cc633b6312',
                                name: 'Engenharia/Tecnologia',
                            },
                            start_date: '2023-06-15T16:35:19.047Z',
                            date_conclusion: '2023-06-15T16:39:19.047Z',
                            conclued: true,
                            description: 'Curso Universitário',
                        },
                    ],
                    Experience: [
                        {
                            id: '1466d8e9-a3a8-411f-aa43-a685ca64e672',
                            description: 'Desenvolvimento de aplicações web',
                            sector: {
                                id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                                name: 'Tecnologia da Informação',
                            },
                            position: 'Desenvolvedor Fron-End',
                            company_name: 'UFJF',
                            locality: 'Juiz de Fora - MG',
                            type_locality: {
                                id: 'db113946-2467-4c27-aece-6a24f9631271',
                                name: 'Presencial',
                            },
                            job_type: {
                                id: 'e538fddc-762a-448b-be71-28b3545cd12d',
                                name: 'Tempo Integral',
                            },
                            start: '2023-06-15T16:35:19.047Z',
                            end: '2023-06-15T16:39:19.047Z',
                        },
                    ],
                },
            },
            {
                finished: true,
                approved: false,
                candidate: {
                    id: '5b7d9389-eec0-4efa-a659-e31c487dceda',
                    name: 'Lucas',
                    email: 'lucaslcfjf@hotmail.com',
                    cpf: '111.111.111-11',
                    about_me: 'Desenvolvedor web',
                    Academic_graduation: [
                        {
                            id: '79f4b4ea-570a-43ee-83f5-b591b638fe8e',
                            instituition: 'UFJF',
                            course_name: 'Sistemas de Informação',
                            study_area: {
                                id: 'd3b5b254-0e19-464c-9a33-33cc633b6312',
                                name: 'Engenharia/Tecnologia',
                            },
                            start_date: '2023-06-15T16:35:19.047Z',
                            date_conclusion: '2023-06-15T16:39:19.047Z',
                            conclued: true,
                            description: 'Curso Universitário',
                        },
                    ],
                    Experience: [
                        {
                            id: '1466d8e9-a3a8-411f-aa43-a685ca64e672',
                            description: 'Desenvolvimento de aplicações web',
                            sector: {
                                id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                                name: 'Tecnologia da Informação',
                            },
                            position: 'Desenvolvedor Fron-End',
                            company_name: 'UFJF',
                            locality: 'Juiz de Fora - MG',
                            type_locality: {
                                id: 'db113946-2467-4c27-aece-6a24f9631271',
                                name: 'Presencial',
                            },
                            job_type: {
                                id: 'e538fddc-762a-448b-be71-28b3545cd12d',
                                name: 'Tempo Integral',
                            },
                            start: '2023-06-15T16:35:19.047Z',
                            end: '2023-06-15T16:39:19.047Z',
                        },
                    ],
                },
            },
            {
                finished: true,
                approved: true,
                candidate: {
                    id: '5b7d9389-eec0-4efa-a659-e31c487dceda',
                    name: 'Lucas',
                    email: 'lucaslcfjf@hotmail.com',
                    cpf: '111.111.111-11',
                    about_me: 'Desenvolvedor web',
                    Academic_graduation: [
                        {
                            id: '79f4b4ea-570a-43ee-83f5-b591b638fe8e',
                            instituition: 'UFJF',
                            course_name: 'Sistemas de Informação',
                            study_area: {
                                id: 'd3b5b254-0e19-464c-9a33-33cc633b6312',
                                name: 'Engenharia/Tecnologia',
                            },
                            start_date: '2023-06-15T16:35:19.047Z',
                            date_conclusion: '2023-06-15T16:39:19.047Z',
                            conclued: true,
                            description: 'Curso Universitário',
                        },
                    ],
                    Experience: [
                        {
                            id: '1466d8e9-a3a8-411f-aa43-a685ca64e672',
                            description: 'Desenvolvimento de aplicações web',
                            sector: {
                                id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                                name: 'Tecnologia da Informação',
                            },
                            position: 'Desenvolvedor Fron-End',
                            company_name: 'UFJF',
                            locality: 'Juiz de Fora - MG',
                            type_locality: {
                                id: 'db113946-2467-4c27-aece-6a24f9631271',
                                name: 'Presencial',
                            },
                            job_type: {
                                id: 'e538fddc-762a-448b-be71-28b3545cd12d',
                                name: 'Tempo Integral',
                            },
                            start: '2023-06-15T16:35:19.047Z',
                            end: '2023-06-15T16:39:19.047Z',
                        },
                    ],
                },
            },
        ],
    },
];

function MyVacancies() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [myVacancies, setMyVacancies] = useState<VacancieWithCandidacyType[]>(
        []
    );

    useEffect(() => {
        dispatch(startLoad());
        const tmpTimeout = setTimeout(() => {
            setMyVacancies(myVacancieData);
        }, 3000);

        return () => {
            clearTimeout(tmpTimeout);
        };
    }, []);

    useEffect(() => {
        if (myVacancies.length) {
            setLoading(false);
            dispatch(stopLoad());
        }
    }, [myVacancies]);

    const handleDetail = (vacancie: VacancieWithCandidacyType) => {
        console.log(vacancie.name_position);
        navigate(`/vacancie/${vacancie.id}`);
    };

    const handleClose = (vacancie: VacancieWithCandidacyType) => {
        dispatch(
            showAlertConfirm({
                title: 'Encerrar Vaga',
                info: `Deseja realmente encerrar a vaga \"${vacancie.name_position}\"? Esta ação não pode ser revertida e todos os candidatos em análise serão marcados como Reprovado.`,
                show: true,
                textButtonCancel: 'Não',
                textButtonConfirm: 'Sim',
                onDismiss: () => dispatch(hideAlertConfirm()),
                onConfirm: () => closeVacancie(vacancie),
            })
        );
    };

    const closeVacancie = (vacancie: VacancieWithCandidacyType) => {
        dispatch(hideAlertConfirm());
        console.log(vacancie.name_position);
    };

    return (
        <section className="my-vacancies-container">
            <header>
                <h1>Minhas Vagas</h1>
                <IconLink
                    color="#fbfcff"
                    backgroundColor="#68AA88"
                    icon={<MdOutlineAdd />}
                    to="/vacancie/create"
                />
            </header>
            <div className="vacancies-list">
                {myVacancies.length
                    ? myVacancies.map((item) => (
                          <MyVacancieCard
                              key={item.id}
                              vacancie={item}
                              onDetail={handleDetail}
                              onClose={handleClose}
                          />
                      ))
                    : !loading && (
                          <div className="no-data">
                              <p>Nenhuma vaga encontrada.</p>
                          </div>
                      )}
            </div>
        </section>
    );
}

export default MyVacancies;
