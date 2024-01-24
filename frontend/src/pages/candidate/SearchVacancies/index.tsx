import './styles.sass';
import HeaderSearch from '../../../components/candidate/search/HeaderSearch';
import {
    SearchVacancieType,
    VacancieType,
    LocalityType,
    SectorType,
    JobType,
} from '../../../shared/types/VacancieType';
import { useEffect, useState } from 'react';
import moment from 'moment';
import SearchVacancieCard from '../../../components/candidate/search/SearchVacancieCard';
import SearchPageCard from '../../../components/candidate/search/SearchPageCard';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { useDispatch } from 'react-redux';
import {
    showAlertInfo,
    hideAlertInfo,
} from '../../../redux/alert/sliceAlertInfo';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';

const sectorsData: SectorType[] = [
    {
        id: 'all',
        name: 'Todos',
    },
    {
        id: 'd7e4d20f-4957-4486-b532-a6a3b5022f11',
        name: 'Administração',
    },
    {
        id: '0b76adb3-5bf9-487b-8104-1e7b55424268',
        name: 'Recursos Humanos',
    },
    {
        id: 'fa651483-b2ee-4665-9599-1758c6bf18f0',
        name: 'Financeiro',
    },
    {
        id: '3aaa7e2e-7826-4a25-825d-094be351ac49',
        name: 'Marketing e Vendas',
    },
    {
        id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
        name: 'Tecnologia da Informação',
    },
];

const jobTypeData: JobType[] = [
    {
        id: 'all',
        name: 'Todos',
    },
    {
        id: 'e538fddc-762a-448b-be71-28b3545cd12d',
        name: 'Tempo Integral',
    },
    {
        id: '74bafd17-09bf-4eb1-838e-8d1a200800c1',
        name: 'Estágio',
    },
    {
        id: 'b76bad37-b149-49d2-a01d-e2e47e98b802',
        name: 'Prestador de Serviços',
    },
];

const localityTypeData: LocalityType[] = [
    {
        id: 'all',
        name: 'Todos',
    },
    {
        id: '13e072dd-0248-43e2-9e93-1db8f4987250',
        name: 'Romoto',
    },
    {
        id: 'db113946-2467-4c27-aece-6a24f9631271',
        name: 'Presencial',
    },
    {
        id: '9be69eac-a6e4-4fd8-962b-b32bdcdbd671',
        name: 'Híbrido',
    },
];

const vacanciesData: SearchVacancieType = {
    vacancies: [
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
            Candidacy: 4,
            is_candidate: true,
        },
        {
            id: '78fb19ad-8de9-4534-a116-63704e7c31b6',
            name_position: 'Desenvolvedor Back-end',
            about: 'Desenvolver aplicações Node',
            salary_expectation: 3000,
            publication_date: '2023-11-20T20:45:58.353Z',
            publisehd: true,
            locality: 'São Paulo',
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
                name: 'Presencial',
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
                        id: 'e9437aeb-312b-4c3f-bf14-3608f4c4504g',
                        name: 'Node',
                        id_sector: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
                    },
                },
            ],
            company: {
                name: 'BackComp',
                description: 'Fábrica de software',
                number_of_employees: '100 - 500 funcionários',
                slogan: 'A melhor empresa de São Paulo',
            },
            Candidacy: 4,
            is_candidate: false,
        },
    ],
    pages: 5,
    number_vacancies: 2,
};

type OrderingType = {
    id: string;
    name: string;
};

function SearchVacancies() {
    const dispatch = useDispatch();
    const queryParameters = new URLSearchParams(window.location.search);
    //Header
    //sector
    const [sector, setSector] = useState(sectorsData[0]);
    const [sectors, setSectors] = useState<SectorType[]>([]);
    //jobType
    const [jobType, setJobType] = useState(jobTypeData[0]);
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);
    //localityType
    const [localityType, setLocalityType] = useState(localityTypeData[0]);
    const [localityTypes, setLocalityTypes] = useState<LocalityType[]>([]);

    //Data
    const [vacancies, setVacancies] = useState<SearchVacancieType>();
    const [selectedVacancie, setSelectedVacancie] = useState<VacancieType>();
    const page = Number(queryParameters.get('page')) || 1;

    useEffect(() => {
        dispatch(startLoad());

        const tmpTimeout = setTimeout(() => {
            setSectors(sectorsData);
            setJobTypes(jobTypeData);
            setLocalityTypes(localityTypeData);
            setVacancies(vacanciesData);
        }, 3000);

        return () => {
            clearTimeout(tmpTimeout);
        };
    }, []);

    useEffect(() => {
        if (
            sectors.length &&
            jobTypes.length &&
            localityTypes.length &&
            vacancies
        ) {
            console.log('foi');
            dispatch(stopLoad());
        }
    }, [sectors, jobTypes, localityTypes, vacancies]);

    useEffect(() => {
        console.log('foi2');
        setSelectedVacancie(undefined);
        dispatch(startLoad());

        const tmpTimeout = setTimeout(() => {
            dispatch(stopLoad());
        }, 3000);

        return () => {
            clearTimeout(tmpTimeout);
        };
    }, [sector, jobType, localityType]);

    useEffect(() => {
        console.log(selectedVacancie);
    }, [selectedVacancie]);

    const handleChangePage = (page: number) => {
        console.log(page);
    };

    const handleVacancieCandidate = (vacancie: VacancieType) => {
        dispatch(
            showAlertInfo({
                title: 'Candidatura Realizada',
                info: 'Candidatura realizada com sucesso. Boa Sorte!',
                textButton: 'OK',
                show: true,
                onDismiss: () => dispatch(hideAlertInfo()),
            })
        );
        console.log(vacancie.name_position);
    };

    let pages = [];
    if (vacancies) {
        for (let i = 0; i < vacancies.pages; i++) {
            pages.push(
                <SearchPageCard
                    key={i}
                    text={`${i + 1}`}
                    onClick={() => handleChangePage(i + 1)}
                    isCurrent={i + 1 == page}
                />
            );
        }
    }

    return (
        <div className="search-vacancies">
            <HeaderSearch
                sector={sector}
                sectors={sectors}
                onChangeSector={setSector}
                jobType={jobType}
                jobTypes={jobTypes}
                onChangeJobType={setJobType}
                localityType={localityType}
                localityTypes={localityTypes}
                onChangeLocalityType={setLocalityType}
            />
            <section className="search-container">
                <div className="search-vacancies-result">
                    <div>
                        <header>
                            <p>
                                <b>Vagas:</b> <small>32 encontradas</small>
                            </p>
                        </header>
                        <div className="search-vacancies-list">
                            {vacancies?.vacancies.map(
                                (item, index, arrayVacancies) => {
                                    return (
                                        <SearchVacancieCard
                                            key={item.id}
                                            title={item.name_position}
                                            subtitle={item.company.name}
                                            onClick={() => {
                                                setSelectedVacancie(item);
                                            }}
                                            selected={
                                                item.id == selectedVacancie?.id
                                            }
                                            separator={
                                                index <
                                                arrayVacancies.length - 1
                                            }
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div className="search-vacancies-pages">{...pages}</div>
                </div>
                <div className="search-vacancies-content">
                    {selectedVacancie ? (
                        <>
                            <div>
                                <div className="search-vacancies-content-header">
                                    <div className="search-vacancies-content-header-texts">
                                        <h2>
                                            {selectedVacancie.name_position}
                                        </h2>
                                        <p>{selectedVacancie.company.name}</p>
                                        <p className="search-vacancies-publication-date">
                                            Publicado em{' '}
                                            {moment(
                                                selectedVacancie.publication_date
                                            ).format('DD-MM-YYYY')}
                                        </p>
                                    </div>
                                    <p>
                                        {selectedVacancie.Candidacy}{' '}
                                        candidaturas
                                    </p>
                                </div>
                                <hr />
                                <div className="search-vacancies-infos">
                                    <p>
                                        <b>Tipos de Trabalho:</b>{' '}
                                        {selectedVacancie.job_type.name}
                                    </p>
                                    <p>
                                        <b>Setor:</b>{' '}
                                        {selectedVacancie.sector.name}
                                    </p>
                                    <p>
                                        <b>Modelo:</b>{' '}
                                        {selectedVacancie.type_locality.name}
                                    </p>
                                    <p>
                                        <b>Número de Funcionários:</b>{' '}
                                        {
                                            selectedVacancie.company
                                                .number_of_employees
                                        }
                                    </p>
                                    <p>
                                        <b>Expectativa Salarial: </b>
                                        {' R$ '}
                                        {selectedVacancie.salary_expectation}
                                    </p>
                                    <p>
                                        <b>Local de Atuação:</b>{' '}
                                        {selectedVacancie.locality}
                                    </p>
                                </div>
                                <hr />
                                <h3>Descrição:</h3>
                                <p className="search-vacancies-about">
                                    {selectedVacancie.about}
                                </p>
                                <h3>Habilidades Necessárias:</h3>
                                <ul>
                                    {selectedVacancie.Vacancie_skill.map(
                                        (item) => (
                                            <li key={item.skill.id}>
                                                {item.skill.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="search-vacancies-footer">
                                <div className="search-vacancies-footer-button">
                                    <ButtonPrimary
                                        text="Candidatar"
                                        disable={selectedVacancie.is_candidate}
                                        onClickButton={() => {
                                            handleVacancieCandidate(
                                                selectedVacancie
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="search-vacancies-no-data">
                            <h4>Nenhuma vaga selecionada</h4>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default SearchVacancies;
export type { OrderingType };
