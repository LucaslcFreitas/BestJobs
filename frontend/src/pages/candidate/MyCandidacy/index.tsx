import './styles.sass';
import { useEffect, useState } from 'react';
import MyCandidacyCard from '../../../components/candidate/myCandidacy/MyCandidacyCard';
import { MyCandidacyType } from '../../../shared/types/VacancieType';
import { useDispatch } from 'react-redux';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';
import {
    showAlertConfirm,
    hideAlertConfirm,
} from '../../../redux/alert/sliceAlertConfirm';
import ModalDetailCandidacy from '../../../components/candidate/myCandidacy/ModalDetailCondidacy';

const myCandicacyData: MyCandidacyType[] = [
    {
        id: '46af5fa5-6278-491c-a522-ac6f5cec671e',
        create_at: '2023-11-20T23:44:10.708Z',
        approved: false,
        finished: false,
        vacancie: {
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
            Candidacy: 4,
        },
    },
    {
        id: '498cc65d-eb45-4eb3-b88f-9cec6061b316',
        create_at: '2023-11-20T23:56:29.094Z',
        approved: true,
        finished: true,
        vacancie: {
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
            Candidacy: 4,
        },
    },
    {
        id: '1b9cedc2-47a3-45c5-a5a4-7c94aa7bc1a0',
        create_at: '2023-11-20T23:59:22.018Z',
        approved: false,
        finished: true,
        vacancie: {
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
            Candidacy: 4,
        },
    },
    {
        id: 'feb1d198-ace0-40cf-aa73-4deed2578bef',
        create_at: '2023-11-21T00:10:17.239Z',
        approved: true,
        finished: true,
        vacancie: {
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
            Candidacy: 4,
        },
    },
];

const candidacyInitial: MyCandidacyType = {
    id: '',
    create_at: '',
    approved: false,
    finished: false,
    vacancie: {
        id: '',
        name_position: '',
        about: '',
        salary_expectation: 0,
        publication_date: '',
        publisehd: true,
        locality: '',
        sector: {
            id: '',
            name: '',
        },
        job_type: {
            id: '',
            name: '',
        },
        type_locality: {
            id: '',
            name: '',
        },
        Vacancie_skill: [],
        company: {
            name: '',
            description: '',
            number_of_employees: '',
            slogan: '',
        },
        Candidacy: 0,
    },
};

function MyCandidacy() {
    const dispatch = useDispatch();
    const [myCandidacy, setMyCandidacy] = useState<MyCandidacyType[]>();
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
    const [candidacyDetail, setCandidacyDetail] =
        useState<MyCandidacyType>(candidacyInitial);

    useEffect(() => {
        dispatch(startLoad());
        const tmpTimeout = setTimeout(() => {
            setMyCandidacy(myCandicacyData);
        }, 3000);

        return () => {
            clearTimeout(tmpTimeout);
        };
    }, []);

    useEffect(() => {
        if (myCandidacy) {
            setLoading(false);
            dispatch(stopLoad());
        }
    }, [myCandidacy]);

    const handleDesist = (candidacy: MyCandidacyType) => {
        dispatch(
            showAlertConfirm({
                title: 'Desistir da Vaga',
                info: 'Deseja realmente desistir desta vaga?',
                show: true,
                textButtonCancel: 'Não',
                textButtonConfirm: 'Sim',
                onConfirm: () => confirmDesist(candidacy),
                onDismiss: () => dispatch(hideAlertConfirm()),
            })
        );
    };

    const confirmDesist = (candidacy: MyCandidacyType) => {
        console.log(candidacy.vacancie.name_position);
        dispatch(hideAlertConfirm());
    };

    const handleDetail = (candidacy: MyCandidacyType) => {
        setCandidacyDetail(candidacy);
        setShowDetail(true);
    };

    return (
        <section className="my-candidacy-container">
            <ModalDetailCandidacy
                show={showDetail}
                onDismiss={() => setShowDetail(false)}
                candidacy={candidacyDetail}
            />
            <header>
                <h1>Minhas Candidaturas</h1>
            </header>
            <div className="my-candidacy-list">
                {myCandidacy
                    ? myCandidacy.map((item) => (
                          <MyCandidacyCard
                              key={item.id}
                              candidacy={item}
                              onDetail={handleDetail}
                              onDesist={handleDesist}
                          />
                      ))
                    : !loading && (
                          <div className="my-candidacy-no-data">
                              <p>Nenhuma candidatura encontrada.</p>
                          </div>
                      )}
            </div>
        </section>
    );
}

export default MyCandidacy;
