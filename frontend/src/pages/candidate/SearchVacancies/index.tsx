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
import IconButtonSmall from '../../../components/IconButtonSmall';
import { FaFilter } from 'react-icons/fa';
import { IoArrowBack, IoClose } from 'react-icons/io5';
import api from '../../../services/api';
import { useUser } from '../../../redux/user/sliceUser';
import { useSelector } from 'react-redux';
import endpoints from '../../../services/endpoints';

type OrderingType = {
    id: string;
    name: string;
};

function SearchVacancies() {
    //TODO: quando a parte da empresa estiver pronta, testar esta página com grande quantidade de vagas para testar a paginação
    const user = useSelector(useUser);

    const dispatch = useDispatch();
    const queryParameters = new URLSearchParams(window.location.search);
    //Header
    //sector
    const [sector, setSector] = useState<SectorType | undefined>();
    const [sectors, setSectors] = useState<SectorType[]>([]);
    //jobType
    const [jobType, setJobType] = useState<JobType | undefined>();
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);
    //localityType
    const [localityType, setLocalityType] = useState<
        LocalityType | undefined
    >();
    const [localityTypes, setLocalityTypes] = useState<LocalityType[]>([]);

    //Data
    const [vacancies, setVacancies] = useState<SearchVacancieType>();
    const [selectedVacancie, setSelectedVacancie] = useState<VacancieType>();
    const [numberPages, setNumberPages] = useState(1);
    const [numberVacancies, setNumberVacancies] = useState(0);
    const [page, setPage] = useState(Number(queryParameters.get('page')) || 1);

    //ToMediaQuery
    const [inViewVacancie, setInViewVacancie] = useState(false);
    const [inViewFilter, setInViewFilter] = useState(false);

    useEffect(() => {
        document.title = 'Pesquisar Vagas | Best Jobs';

        dispatch(startLoad());

        const tmpTimeout = setTimeout(() => {
            api.get(endpoints.GET_TYPE_LOCALITY)
                .then((response) => {
                    const localityAll: LocalityType = {
                        id: 'all',
                        name: 'Todos',
                    };
                    const auxLocalityTypes: LocalityType[] = [
                        localityAll,
                    ].concat(response.data);
                    setLocalityTypes(auxLocalityTypes);
                    setLocalityType(localityAll);
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(stopLoad());
                    dispatch(
                        showAlertInfo({
                            title: 'Error',
                            info: 'Falha ao carregar os dados',
                            show: true,
                            textButton: 'OK',
                            onDismiss: () => {
                                dispatch(hideAlertInfo());
                            },
                        })
                    );
                });
            api.get(endpoints.GET_JOB_TYPE)
                .then((response) => {
                    const jobAll: JobType = {
                        id: 'all',
                        name: 'Todos',
                    };
                    const auxJobTypes: JobType[] = [jobAll].concat(
                        response.data
                    );
                    setJobType(jobAll);
                    setJobTypes(auxJobTypes);
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(stopLoad());
                    dispatch(
                        showAlertInfo({
                            title: 'Error',
                            info: 'Falha ao carregar os dados',
                            show: true,
                            textButton: 'OK',
                            onDismiss: () => {
                                dispatch(hideAlertInfo());
                            },
                        })
                    );
                });
            api.get(endpoints.GET_SECTOR)
                .then((response) => {
                    const sectorAll: SectorType = {
                        id: 'all',
                        name: 'Todos',
                    };
                    const auxSectorTypes: SectorType[] = [sectorAll].concat(
                        response.data
                    );
                    setSector(sectorAll);
                    setSectors(auxSectorTypes);
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(stopLoad());
                    dispatch(
                        showAlertInfo({
                            title: 'Error',
                            info: 'Falha ao carregar os dados',
                            show: true,
                            textButton: 'OK',
                            onDismiss: () => {
                                dispatch(hideAlertInfo());
                            },
                        })
                    );
                });
        }, 2000);

        return () => {
            clearTimeout(tmpTimeout);
        };
    }, []);

    useEffect(() => {
        if (
            sector &&
            sectors.length &&
            jobType &&
            jobTypes.length &&
            localityType &&
            localityTypes.length &&
            page
        ) {
            setSelectedVacancie(undefined);
            fetchVacancies();
        }
    }, [sector, sectors, jobType, jobTypes, localityType, localityTypes, page]);

    const fetchVacancies = () => {
        dispatch(startLoad());
        api.get(
            `${endpoints.SEARCH_VACANCIE}${
                sector?.id !== 'all' ? `sector=${sector?.id}&` : ''
            }${jobType?.id !== 'all' ? `job_type=${jobType?.id}&` : ''}${
                localityType?.id !== 'all'
                    ? `type_locality=${localityType?.id}&`
                    : ''
            }${page != 1 ? `page=${page}` : ''}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then((response) => {
                setVacancies(response.data);
                setNumberPages(response.data.pages);
                setNumberVacancies(response.data.number_vacancies);
                dispatch(stopLoad());
            })
            .catch((error) => {
                console.log(error);
                dispatch(stopLoad());
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao carregar os dados',
                        show: true,
                        textButton: 'OK',
                        onDismiss: () => {
                            dispatch(hideAlertInfo());
                        },
                    })
                );
            });
    };

    useEffect(() => {
        console.log(selectedVacancie);
    }, [selectedVacancie]);

    const handleChangePage = (page: number) => {
        setPage(page);
    };

    const handleVacancieCandidate = (vacancie: VacancieType) => {
        api.post(
            endpoints.CREATE_CANDIDACY,
            {
                id_vacancie: vacancie.id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then(() => {
                const alterVacancies = vacancies?.vacancies.map((item) => {
                    if (item.id === vacancie.id) {
                        return {
                            ...item,
                            is_candidate: true,
                        };
                    }
                    return item;
                });
                setSelectedVacancie((state) => {
                    if (state) {
                        return {
                            ...state,
                            is_candidate: true,
                        };
                    }
                });
                setVacancies({
                    vacancies: alterVacancies ? alterVacancies : [],
                    number_vacancies: vacancies
                        ? vacancies.number_vacancies
                        : 0,
                    pages: vacancies ? vacancies?.pages : 1,
                });
                dispatch(
                    showAlertInfo({
                        title: 'Candidatura Realizada',
                        info: 'Candidatura realizada com sucesso. Boa Sorte!',
                        textButton: 'OK',
                        show: true,
                        onDismiss: () => dispatch(hideAlertInfo()),
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao realizar candidatura',
                        show: true,
                        textButton: 'OK',
                        onDismiss: () => {
                            dispatch(hideAlertInfo());
                        },
                    })
                );
            });
        console.log(vacancie.name_position);
    };

    let pages = [];
    if (vacancies) {
        for (let i = 0; i < numberPages; i++) {
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
                inView={inViewFilter}
                closeInView={setInViewFilter}
            />
            <section className="search-container">
                <div className="result">
                    <div>
                        <header>
                            <p>
                                <b>Vagas:</b>{' '}
                                <small>{numberVacancies} encontradas</small>
                            </p>
                            <div className="filter-button">
                                <IconButtonSmall
                                    backgroundColor="#f2f4fd"
                                    color="#3b3b3b"
                                    icon={<FaFilter />}
                                    onClick={() => {
                                        setInViewFilter(true);
                                    }}
                                />
                            </div>
                        </header>
                        <div className="vacancies-list">
                            {vacancies?.vacancies.map(
                                (item, index, arrayVacancies) => {
                                    return (
                                        <SearchVacancieCard
                                            key={item.id}
                                            title={item.name_position}
                                            subtitle={item.company.name}
                                            onClick={() => {
                                                setSelectedVacancie(item);
                                                setInViewVacancie(true);
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
                    <div className="pages">{...pages}</div>
                </div>
                <div
                    className={`content ${
                        inViewVacancie ? 'content-view' : ''
                    }`}
                >
                    {selectedVacancie ? (
                        <>
                            <div className="vacancie-close">
                                <IconButtonSmall
                                    backgroundColor="#f2f4fd"
                                    color="#3b3b3b"
                                    icon={<IoArrowBack />}
                                    onClick={() => {
                                        setInViewVacancie(false);
                                    }}
                                />
                            </div>
                            <div>
                                <div className="content-header">
                                    <div className="texts">
                                        <h2>
                                            {selectedVacancie.name_position}
                                        </h2>
                                        <p>{selectedVacancie.company.name}</p>
                                        <p className="publication-date">
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
                                <div className="infos">
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
                                <div className="descriptions">
                                    <hr />
                                    <h3>Descrição:</h3>
                                    <p className="about">
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
                            </div>
                            <div className="vacancie-footer">
                                <div className="button">
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
                        <div className="no-data">
                            <h4>Nenhuma vaga selecionada</h4>
                            <div className="vacancie-close">
                                <IconButtonSmall
                                    backgroundColor="#f2f4fd"
                                    color="#3b3b3b"
                                    icon={<IoClose />}
                                    onClick={() => {
                                        setInViewVacancie(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default SearchVacancies;
export type { OrderingType };
