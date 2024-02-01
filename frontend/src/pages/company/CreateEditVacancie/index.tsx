import './styles.sass';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    SectorType,
    JobType,
    LocalityType,
    SkillType,
} from '../../../shared/types/VacancieType';
import InputText from '../../../components/InputText';
import InputTextArea from '../../../components/InputTextArea';
import InputSelect from '../../../components/InputSelect';
import ButtonPrimary from '../../../components/ButtonPrimary';
import SkillCard from '../../../components/company/createEditVacancie/SkillCard';
import { useSelector, useDispatch } from 'react-redux';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';
import {
    showAlertInfo,
    hideAlertInfo,
} from '../../../redux/alert/sliceAlertInfo';
import { useUser } from '../../../redux/user/sliceUser';
import api from '../../../services/api';
import endpoints from '../../../services/endpoints';

const emptySkill: SkillType = {
    id: '',
    name: '',
    id_sector: '',
};

function CreateEditVacancie() {
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(useUser);

    //States
    //Form
    const [namePosition, setNamePosition] = useState('');
    const [locality, setLocality] = useState('');
    const [salaryExpectation, setSalaryExpectation] = useState(0);
    const [about, setAbout] = useState('');
    const [jobType, setJobType] = useState<JobType>();
    const [typeLocality, setTypeLocality] = useState<LocalityType>();
    const [sector, setSector] = useState<SectorType>();
    const [auxSkill, setAuxSkill] = useState<SkillType>();
    const [mySkills, setMySkills] = useState<SkillType[]>([]);
    //PreLoads
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);
    const [typeLocalitys, setTypeLocalitys] = useState<LocalityType[]>([]);
    const [sectors, setSectors] = useState<SectorType[]>([]);
    const [skills, setSkills] = useState<SkillType[]>([]);

    //Carregar dados API
    useEffect(() => {
        dispatch(startLoad());

        //timeout para fins visuais
        const timeout = setTimeout(() => {
            api.get(endpoints.GET_TYPE_LOCALITY)
                .then((response) => {
                    setTypeLocalitys(response.data);
                    setTypeLocality(response.data[0]);
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
                    setJobTypes(response.data);
                    setJobType(response.data[0]);
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
                    setSectors(response.data);
                    setSector(response.data[0]);
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
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (typeLocalitys.length && jobTypes.length && sectors.length) {
            if (id) {
                api.get(`${endpoints.GET_COMPANY_VACANCIE}${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                    .then((response) => {
                        setNamePosition(response.data.name_position);
                        setLocality(response.data.locality);
                        setSalaryExpectation(
                            Number(response.data.salary_expectation)
                        );
                        setAbout(response.data.about);
                        setJobType(response.data.job_type);
                        setTypeLocality(response.data.type_locality);
                        setSector(response.data.sector);
                        setMySkills(
                            response.data.Vacancie_skill.map(
                                (item: { skill: SkillType }) => {
                                    return item.skill;
                                }
                            )
                        );
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
            } else {
                dispatch(stopLoad());
            }
        }
    }, [typeLocalitys, jobTypes, sectors]);

    //Reset
    useEffect(() => {
        if (sector) {
            dispatch(startLoad());
            setAuxSkill(undefined);
            // setMySkills([]);
            api.get(`${endpoints.GET_SKILL}sector=${sector.id}`)
                .then((response) => {
                    setSkills([emptySkill].concat(response.data));
                    setAuxSkill(emptySkill);
                    dispatch(stopLoad());
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(stopLoad());
                    dispatch(
                        showAlertInfo({
                            title: 'Error',
                            info: 'Falha ao carregar as skills',
                            show: true,
                            textButton: 'OK',
                            onDismiss: () => {
                                dispatch(hideAlertInfo());
                            },
                        })
                    );
                });
        }
    }, [sector]);

    useEffect(() => {
        if (auxSkill && auxSkill.id != '') {
            if (!verifyMySkillExistent(auxSkill)) {
                const newMySkills: SkillType[] = [auxSkill].concat(mySkills);
                setMySkills(newMySkills);
            }
            setAuxSkill(emptySkill);
        }
    }, [auxSkill]);

    const verifyMySkillExistent = (skill: SkillType) => {
        const located = mySkills.filter((item) => item.id === skill.id);
        return located.length === 1;
    };

    const handleSubmitForm = (e: React.FormEvent | null) => {
        if (e) {
            e.preventDefault();
        }

        if (id) handleEditVacancie();
        else handleCreateVacancie();
    };

    const handleCreateVacancie = () => {
        dispatch(startLoad());
        api.post(
            endpoints.CREATE_VACANCIE,
            {
                name_position: namePosition,
                about,
                id_sector: sector?.id,
                salary_expectation: salaryExpectation,
                id_job_type: jobType?.id,
                id_type_locality: typeLocality?.id,
                locality,
                skills: mySkills.map((item) => item.id),
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then(() => {
                dispatch(stopLoad());
                navigate('/company/myvacancies');
            })
            .catch((error) => {
                console.log(error);
                dispatch(stopLoad());
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao publicar vaga',
                        show: true,
                        textButton: 'OK',
                        onDismiss: () => {
                            dispatch(hideAlertInfo());
                        },
                    })
                );
            });
    };

    const handleEditVacancie = () => {
        dispatch(startLoad());
        api.put(
            `${endpoints.UPDATE_VACANCIE}${id}`,
            {
                name_position: namePosition,
                about,
                salary_expectation: salaryExpectation,
                id_job_type: jobType?.id,
                id_type_locality: typeLocality?.id,
                locality,
                skills: mySkills.map((item) => item.id),
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then(() => {
                dispatch(stopLoad());
                navigate('/company/myvacancies');
            })
            .catch((error) => {
                console.log(error);
                dispatch(stopLoad());
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao publicar vaga',
                        show: true,
                        textButton: 'OK',
                        onDismiss: () => {
                            dispatch(hideAlertInfo());
                        },
                    })
                );
            });
    };

    const handleDeleteSkill = (skill: SkillType) => {
        const skillsFilted = mySkills.filter((item) => item.id !== skill.id);
        setMySkills(skillsFilted);
    };

    return (
        <section className="create-vacancie-container">
            <header>
                <h1>{id ? 'Editar' : 'Criar'} Vaga</h1>
            </header>
            <form onSubmit={handleSubmitForm} className="vacancie-form">
                <div className="form-part">
                    <h3>Dados da Vaga</h3>
                    <div className="input-container">
                        <InputText
                            label="Nome da Vaga"
                            type="text"
                            value={namePosition}
                            onChangeInput={setNamePosition}
                        />
                    </div>
                    <div className="input-container">
                        <InputText
                            label="Local de Atuação"
                            type="text"
                            value={locality}
                            onChangeInput={setLocality}
                        />
                    </div>
                    <div className="input-container">
                        <InputText
                            label="Expectativa Salarial"
                            type="number"
                            value={`${salaryExpectation}`}
                            onChangeInput={(value) =>
                                setSalaryExpectation(Number(value))
                            }
                        />
                    </div>
                    <div className="input-container">
                        <InputTextArea
                            label="Descrição da Área"
                            value={about}
                            onChangeInput={setAbout}
                        />
                    </div>
                </div>
                <div className="form-part">
                    <h3>Características da Vaga</h3>
                    <div className="input-container">
                        <InputSelect
                            label="Tipo de Trabalho"
                            value={jobType?.id || ''}
                            options={jobTypes.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            onChange={setJobType}
                        />
                    </div>
                    <div className="input-container">
                        <InputSelect
                            label="Modelo"
                            value={typeLocality?.id || ''}
                            options={typeLocalitys.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            onChange={setTypeLocality}
                        />
                    </div>
                    <div className="input-container">
                        <InputSelect
                            label="Setor da Vaga"
                            value={sector?.id || ''}
                            options={sectors.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            disable={id ? true : false}
                            onChange={(sec: { id: string; name: string }) => {
                                setSector(sec);
                                setMySkills([]);
                            }}
                        />
                    </div>
                    <div className="input-container">
                        <InputSelect
                            required={false}
                            label="Habilidades"
                            value={auxSkill?.id || ''}
                            options={skills.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            onChange={({ id, name }) =>
                                setAuxSkill({
                                    id: id,
                                    name: name,
                                    id_sector: '',
                                })
                            }
                        />
                    </div>
                    <div className="skills">
                        {mySkills.map((item) => (
                            <SkillCard
                                skill={item}
                                onDelete={handleDeleteSkill}
                            />
                        ))}
                    </div>
                    <div className="button">
                        <div className="button-container">
                            <ButtonPrimary
                                text={id ? 'Salvar' : 'Publicar'}
                                isSubmit
                                onClickButton={() => handleSubmitForm(null)}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default CreateEditVacancie;
