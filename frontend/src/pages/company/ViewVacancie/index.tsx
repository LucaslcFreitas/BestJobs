import './styles.sass';
import LinkAction from '../../../components/LinkAction';
import ViewVacancieCard from '../../../components/company/viewVacancie/ViewVacancieCard';
import { useEffect, useState } from 'react';
import { VacancieWithCandidacyType } from '../../../shared/types/VacancieType';
import { useDispatch } from 'react-redux';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';
import {
    showAlertConfirm,
    hideAlertConfirm,
} from '../../../redux/alert/sliceAlertConfirm';
import { CandidateType } from '../../../shared/types/CandidateType';
import AcademicGraduationCard from '../../../components/AcademicGraduationCard';
import ExperienceCard from '../../../components/ExperienceCard';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecondary from '../../../components/ButtonSecondary';
import { IoArrowBack, IoClose } from 'react-icons/io5';
import IconButtonSmall from '../../../components/IconButtonSmall';

const vacancieData: VacancieWithCandidacyType = {
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
    company: {
        name: 'Empresa DEV',
        description: 'Fábrica de software',
        number_of_employees: '100 - 500 funcionários',
        slogan: 'A melhor empresa do mundo',
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
    Candidacy: [
        {
            finished: false,
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
                        instituition: 'Universidade Federal de Juiz de Fora',
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
                        company_name: 'Universidade Federal de Juiz de Fora',
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
                id: '5b7d9389-eec0-4efa-a659-e31c487dcedb',
                name: 'Lucas',
                email: 'lucaslcfjf@hotmail.com',
                cpf: '111.111.111-11',
                about_me: 'Desenvolvedor web',
                Academic_graduation: [
                    {
                        id: '79f4b4ea-570a-43ee-83f5-b591b638fe8e',
                        instituition: 'Universidade Federal de Juiz de Fora',
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
                        company_name: 'Universidade Federal de Juiz de Fora',
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
                id: '5b7d9389-eec0-4efa-a659-e31c487dcedc',
                name: 'Lucas',
                email: 'lucaslcfjf@hotmail.com',
                cpf: '111.111.111-11',
                about_me: 'Desenvolvedor web',
                Academic_graduation: [],
                Experience: [
                    {
                        id: '1466d8e9-a3a8-411f-aa43-a685ca64e672',
                        description: 'Desenvolvimento de aplicações web',
                        sector: {
                            id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                            name: 'Tecnologia da Informação',
                        },
                        position: 'Desenvolvedor Fron-End',
                        company_name: 'Universidade Federal de Juiz de Fora',
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
                id: '5b7d9389-eec0-4efa-a659-e31c487dcedd',
                name: 'Lucas',
                email: 'lucaslcfjf@hotmail.com',
                cpf: '111.111.111-11',
                about_me: 'Desenvolvedor web',
                Academic_graduation: [
                    {
                        id: '79f4b4ea-570a-43ee-83f5-b591b638fe8e',
                        instituition: 'Universidade Federal de Juiz de Fora',
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
                    {
                        id: '79f4b4ea-570a-43ee-83f5-b591b638fe8f',
                        instituition: 'Universidade Federal de Juiz de Fora',
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
                        company_name: 'Universidade Federal de Juiz de Fora',
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
                    {
                        id: '1466d8e9-a3a8-411f-aa43-a685ca64e673',
                        description: 'Desenvolvimento de aplicações web',
                        sector: {
                            id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                            name: 'Tecnologia da Informação',
                        },
                        position: 'Desenvolvedor Fron-End',
                        company_name: 'Universidade Federal de Juiz de Fora',
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
};

type InfoCandidate = {
    finished: boolean;
    approved: boolean;
    candidate: CandidateType;
};

function ViewVacancie() {
    const dispatch = useDispatch();

    const [vacancie, setVacancie] = useState<VacancieWithCandidacyType>();
    const [selectedCandidate, setSelectedCandidate] = useState<InfoCandidate>();

    //ToMediaQuery
    const [inViewCandidate, setInViewCandidate] = useState(false);

    useEffect(() => {
        dispatch(startLoad());
        const tmpTimeout = setTimeout(() => {
            setVacancie(vacancieData);
            dispatch(stopLoad());
        }, 3000);

        return () => {
            clearTimeout(tmpTimeout);
        };
    }, []);

    const handleEditVacancie = () => {
        console.log('Edit');
    };

    const handleCloseVacancie = () => {
        dispatch(
            showAlertConfirm({
                title: 'Confirmar Fechamento de Vaga',
                info: 'Deseja encerrar esta vaga? Esta ação não poderá ser desfeita.',
                show: true,
                onDismiss: () => {
                    dispatch(hideAlertConfirm());
                },
                onConfirm: () => {
                    dispatch(hideAlertConfirm());
                },
                textButtonCancel: 'Não',
                textButtonConfirm: 'Sim',
            })
        );
        console.log('Edit');
    };

    const handleDeleteVacancie = () => {
        dispatch(
            showAlertConfirm({
                title: 'Confirmar Exclusão',
                info: 'Deseja realmente excluir esta vaga?',
                show: true,
                onDismiss: () => {
                    dispatch(hideAlertConfirm());
                },
                onConfirm: () => {
                    dispatch(hideAlertConfirm());
                },
                textButtonCancel: 'Não',
                textButtonConfirm: 'Sim',
            })
        );
        console.log('Delete');
    };

    const handleApproveCandidate = (candidate: InfoCandidate) => {
        console.log('Approve Candidate: ' + candidate);
    };

    const handleDisapproveCandidate = (candidate: InfoCandidate) => {
        console.log('Approve Candidate: ' + candidate);
    };

    return (
        <section className="view-vacancie-container">
            <div className="result">
                <header>
                    <h3 className="vacancie-name">{vacancie?.name_position}</h3>
                    <p className="vacancie-candidates">
                        {vacancie?.Candidacy.length} candidatos
                    </p>
                    <div className="vacancie-buttons">
                        <LinkAction
                            text="Editar"
                            color="#3b3b3b"
                            colorHover="#6e6e6e"
                            onClick={handleEditVacancie}
                        />
                        <LinkAction
                            text="Encerrar"
                            color="#3b3b3b"
                            colorHover="#6e6e6e"
                            onClick={handleCloseVacancie}
                        />
                        <LinkAction
                            text="Excluir"
                            color="#DF0000"
                            colorHover="#AE0000"
                            onClick={handleDeleteVacancie}
                        />
                    </div>
                </header>
                <div className="list-candidates">
                    {vacancie?.Candidacy.map((item, index) => (
                        <ViewVacancieCard
                            key={index}
                            title={item.candidate.name}
                            status={
                                !item.finished
                                    ? 'Em Análise'
                                    : item.approved
                                    ? 'Aprovado'
                                    : 'Reprovado'
                            }
                            onClick={() => {
                                setSelectedCandidate(item);
                                setInViewCandidate(true);
                            }}
                            separator
                            selected={
                                item.candidate.id ==
                                selectedCandidate?.candidate.id
                            }
                        />
                    ))}
                </div>
            </div>
            <div className={`content ${inViewCandidate ? 'content-view' : ''}`}>
                {selectedCandidate ? (
                    <>
                        <div className="vacancie-close">
                            <IconButtonSmall
                                backgroundColor="#f2f4fd"
                                color="#3b3b3b"
                                icon={<IoArrowBack />}
                                onClick={() => {
                                    setInViewCandidate(false);
                                }}
                            />
                        </div>
                        <div>
                            <div className="content-header">
                                <h2>{selectedCandidate.candidate.name}</h2>
                                <p>
                                    <b>Status:</b>{' '}
                                    {!selectedCandidate.finished
                                        ? 'Em Análise'
                                        : selectedCandidate.approved
                                        ? 'Aprovado'
                                        : 'Reprovado'}
                                </p>
                                <p>
                                    <b>CPF:</b>{' '}
                                    {selectedCandidate.candidate.cpf}
                                </p>
                                <p>
                                    <b>E-mail:</b>{' '}
                                    {selectedCandidate.candidate.email}
                                </p>
                            </div>
                            <hr />
                            <div>
                                <h3 className="section-titles">
                                    Sobre o Cadidato:
                                </h3>
                                <p className="about-vacancie">
                                    {selectedCandidate.candidate.about_me}
                                </p>
                            </div>
                            <hr />
                            <div>
                                <h3 className="section-titles">Experiência:</h3>
                                {selectedCandidate.candidate.Experience
                                    .length ? (
                                    selectedCandidate.candidate.Experience.map(
                                        (item, index, arrayExperience) => (
                                            <ExperienceCard
                                                key={item.id}
                                                experience={item}
                                                separator={
                                                    index + 1 <
                                                    arrayExperience.length
                                                }
                                            />
                                        )
                                    )
                                ) : (
                                    <p className="no-data">
                                        Nenhuma experiência registrada.
                                    </p>
                                )}
                            </div>
                            <hr />
                            <div>
                                <h3 className="section-titles">
                                    Formação Acadêmica:
                                </h3>
                                {selectedCandidate.candidate.Academic_graduation
                                    .length ? (
                                    selectedCandidate.candidate.Academic_graduation.map(
                                        (item, index, arrayGraduation) => (
                                            <AcademicGraduationCard
                                                key={item.id}
                                                academicGraduation={item}
                                                separator={
                                                    index + 1 <
                                                    arrayGraduation.length
                                                }
                                            />
                                        )
                                    )
                                ) : (
                                    <p className="no-data">
                                        Nenhuma formação acadêmica registrada.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="vacancie-footer">
                            <div className="footer-buttons">
                                <ButtonSecondary
                                    text="Reprovar"
                                    disable={selectedCandidate.finished}
                                    onClickButton={() => {
                                        handleDisapproveCandidate(
                                            selectedCandidate
                                        );
                                    }}
                                    backgroundColor="#EB0303"
                                    color="#fbfcff"
                                />
                            </div>
                            <div className="footer-buttons">
                                <ButtonPrimary
                                    text="Aprovar"
                                    disable={selectedCandidate.finished}
                                    onClickButton={() => {
                                        handleApproveCandidate(
                                            selectedCandidate
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="no-data-selected">
                        <h4>Nenhum candidato selecionado</h4>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ViewVacancie;
