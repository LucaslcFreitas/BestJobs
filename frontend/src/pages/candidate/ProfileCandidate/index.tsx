import './styles.sass';
import { useDispatch } from 'react-redux';
import {
    showAlertConfirm,
    hideAlertConfirm,
} from '../../../redux/alert/sliceAlertConfirm';
import {
    showAlertInfo,
    hideAlertInfo,
} from '../../../redux/alert/sliceAlertInfo';
import { startLoad, stopLoad } from '../../../redux/loader/sliceLoader';
import api from '../../../services/api';
import { useSelector } from 'react-redux';
import { useUser } from '../../../redux/user/sliceUser';
import ProfileCandidateCard from '../../../components/candidate/profile/ProfileCandidateCard';
import ProfileCandidateCardData from '../../../components/candidate/profile/ProfileCandidateCardData';
import { MdOutlineAdd } from 'react-icons/md';
import IconButton from '../../../components/IconButton';
import ProfileCandidateCardAcademic from '../../../components/candidate/profile/ProfileCandidateCardAcademic';
import FormProfileCandidateAddAcademic from '../../../components/candidate/profile/FormProfileCandidateAddAcademic';
import { useEffect, useState } from 'react';
import ProfileCandidateCardExperience from '../../../components/candidate/profile/ProfileCandidateCardExperience';
import FormProfileCandidateAddExperience from '../../../components/candidate/profile/FormProfileCandidateAddExperience';
import ContainerFormCandidateProfile from '../../../components/candidate/profile/ContainerFormCandidateProfile';

//types
import { AcademicGraduationType } from '../../../shared/types/AcademicGraduationType';
import { ExperienceType } from '../../../shared/types/ExperienceType';
import ModalEditProfile from '../../../components/candidate/profile/ModalEditProfile';
import { UserType } from '../../../shared/types/UserData';
import endpoints from '../../../services/endpoints';

const academicDataEmpty: AcademicGraduationType = {
    id: '',
    course_name: '',
    instituition: '',
    study_area: {
        id: '',
        name: '',
    },
    start_date: '',
    date_conclusion: '',
    conclued: false,
    description: '',
};

const experienceDataEmpty: ExperienceType = {
    id: '',
    position: '',
    company_name: '',
    locality: '',
    type_locality: {
        id: '',
        name: '',
    },
    job_type: {
        id: '',
        name: '',
    },
    sector: {
        id: '',
        name: '',
    },
    description: '',
    start: '',
    end: '',
};

function ProfileCandidate() {
    const user = useSelector(useUser);

    // const alertInfo = useSelector(useAlertInfo);
    const dispatch = useDispatch();

    //Datas
    const [userData, setUserData] = useState<UserType>({
        name: '',
        email: '',
        cpf: '',
        description: '',
    });
    const [academicGraduationsData, setAcademicGraduationData] = useState<
        AcademicGraduationType[]
    >([]);
    const [experiencesData, setExperiencesData] = useState<ExperienceType[]>(
        []
    );

    //Loaders
    const [userLoading, setUserLoading] = useState(true);
    const [academicLoading, setAcademicLoading] = useState(true);
    const [experienceLoading, setExperienceLoading] = useState(true);

    //FormsShows
    const [showAddFormAcademic, setShowAddFormAcademic] = useState(false);
    const [showAddFormExperience, setShowAddFormExperience] = useState(false);
    const [showEditFormAcademic, setShowEditFormAcademic] = useState(false);
    const [academicEditData, setAcademicEditData] =
        useState<AcademicGraduationType>(academicDataEmpty);
    const [showEditFormExperience, setShowEditFormExperience] = useState(false);
    const [experienceEditData, setExperienceEditData] =
        useState<ExperienceType>(experienceDataEmpty);

    useEffect(() => {
        //timeout para fins visuais
        const timeout = setTimeout(() => {
            api.get(endpoints.GET_MY_CANDIDATE, {
                headers: {
                    'Content-Type': 'text/plain',
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((response) => {
                    setUserData({
                        name: response.data.name,
                        email: response.data.email,
                        cpf: response.data.cpf,
                        description: response.data.about_me,
                    });
                    setUserLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setUserLoading(false);
                });

            api.get(endpoints.GET_MY_ACADEMIC_GRADUATION, {
                headers: {
                    'Content-Type': 'text/plain',
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((response) => {
                    setAcademicGraduationData(response.data);
                    setAcademicLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setAcademicLoading(false);
                });

            api.get(endpoints.GET_MY_EXPERIENCE, {
                headers: {
                    'Content-Type': 'text/plain',
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((response) => {
                    setExperiencesData(response.data);
                    setExperienceLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setExperienceLoading(false);
                });
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    //Academic Functions
    const handleSetEditAcademic = (academicData: AcademicGraduationType) => {
        setAcademicEditData(academicData);
        setShowEditFormAcademic(true);
    };

    const handleAddAcademicGraduation = (
        graduation: AcademicGraduationType
    ) => {
        dispatch(startLoad());
        api.post(
            endpoints.CREATE_ACADEMIC,
            {
                instituition: graduation.instituition,
                course_name: graduation.course_name,
                id_study_area: graduation.study_area.id,
                start_date: graduation.start_date,
                date_conclusion: graduation.date_conclusion,
                conclued: graduation.conclued,
                description: graduation.description,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then((response) => {
                const newGraduations = academicGraduationsData.concat([
                    response.data,
                ]);
                setAcademicGraduationData(newGraduations);
                setShowAddFormAcademic(false);
                dispatch(stopLoad());
            })
            .catch((error) => {
                dispatch(stopLoad());
                console.log(error);
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao adicionar nova formação acadêmica. Tente novamente mais tarde.',
                        onDismiss: () => {
                            dispatch(hideAlertInfo());
                        },
                        show: true,
                        textButton: 'OK',
                    })
                );
            });
    };

    const handleEditAcademicGraduation = (
        graduation: AcademicGraduationType
    ) => {
        dispatch(startLoad());
        api.put(
            endpoints.UPDATE_ACADEMIC + graduation.id,
            {
                instituition: graduation.instituition,
                course_name: graduation.course_name,
                id_study_area: graduation.study_area.id,
                start_date: graduation.start_date,
                date_conclusion: graduation.date_conclusion,
                conclued: graduation.conclued,
                description: graduation.description,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then((response) => {
                const newGraduations = academicGraduationsData.map((item) => {
                    if (item.id === graduation.id) return response.data;
                    return item;
                });
                setAcademicGraduationData(newGraduations);
                setShowAddFormAcademic(false);
                dispatch(stopLoad());
            })
            .catch((error) => {
                dispatch(stopLoad());
                console.log(error);
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao editar formação acadêmica. Tente novamente mais tarde.',
                        onDismiss: () => {
                            dispatch(hideAlertInfo());
                        },
                        show: true,
                        textButton: 'OK',
                    })
                );
            });
    };
    const handleDeleteAcademic = (id: string) => {
        dispatch(
            showAlertConfirm({
                title: 'Exclusão de Formação Acadêmica',
                info: 'Deseja realmente excluir este registro de formação?',
                textButtonCancel: 'Cancelar',
                textButtonConfirm: 'Excluir',
                show: true,
                onDismiss: () => dispatch(hideAlertConfirm()),
                onConfirm: () => {
                    dispatch(hideAlertConfirm());
                    dispatch(startLoad());
                    api.delete(endpoints.DELETE_ACADEMIC + id, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`,
                        },
                    })
                        .then((response) => {
                            const graduations = academicGraduationsData.filter(
                                (item) => item.id !== id
                            );
                            setAcademicGraduationData(graduations);
                            console.log(response);
                            dispatch(stopLoad());
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(stopLoad());
                            dispatch(
                                showAlertInfo({
                                    title: 'Error',
                                    info: 'Falha ao excluir formação acadêmica',
                                    show: true,
                                    textButton: 'OK',
                                    onDismiss: () => {
                                        dispatch(hideAlertInfo());
                                    },
                                })
                            );
                        });
                },
            })
        );
        console.log(id);
    };

    //Experience Functions
    const handleSetEditExperience = (experienceData: ExperienceType) => {
        setExperienceEditData(experienceData);
        setShowEditFormExperience(true);
        console.log(experienceData);
    };
    const handleAddExperience = (experience: ExperienceType) => {
        dispatch(startLoad());
        api.post(
            endpoints.CREATE_EXPERIENCE,
            {
                description: experience.description,
                id_sector: experience.sector.id,
                position: experience.position,
                company_name: experience.company_name,
                locality: experience.locality,
                id_type_locality: experience.type_locality.id,
                id_job_type: experience.job_type.id,
                start: experience.start,
                end: experience.end,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then((response) => {
                const newExperiences = experiencesData.concat([response.data]);
                setExperiencesData(newExperiences);
                setShowAddFormExperience(false);
                dispatch(stopLoad());
            })
            .catch((error) => {
                dispatch(stopLoad());
                console.log(error);
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao adicionar nova experiência. Tente novamente mais tarde.',
                        onDismiss: () => {
                            dispatch(hideAlertInfo());
                        },
                        show: true,
                        textButton: 'OK',
                    })
                );
            });
    };
    const handleEditExperience = (experience: ExperienceType) => {
        dispatch(startLoad());
        api.put(
            endpoints.UPDATE_EXPERIENCE + experience.id,
            {
                description: experience.description,
                id_sector: experience.sector.id,
                position: experience.position,
                company_name: experience.company_name,
                locality: experience.locality,
                id_type_locality: experience.type_locality.id,
                id_job_type: experience.job_type.id,
                start: experience.start,
                end: experience.end,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
            .then((response) => {
                const newExperiences = experiencesData.map((item) => {
                    if (item.id === experience.id) return response.data;
                    return item;
                });
                setExperiencesData(newExperiences);
                setShowAddFormExperience(false);
                dispatch(stopLoad());
            })
            .catch((error) => {
                dispatch(stopLoad());
                console.log(error);
                dispatch(
                    showAlertInfo({
                        title: 'Error',
                        info: 'Falha ao editar experiência. Tente novamente mais tarde.',
                        onDismiss: () => {
                            dispatch(hideAlertInfo());
                        },
                        show: true,
                        textButton: 'OK',
                    })
                );
            });
    };

    const handleDeleteExperience = (id: string) => {
        dispatch(
            showAlertConfirm({
                title: 'Exclusão de Experiência',
                info: 'Deseja realmente excluir este registro de experiência?',
                textButtonCancel: 'Cancelar',
                textButtonConfirm: 'Excluir',
                show: true,
                onDismiss: () => dispatch(hideAlertConfirm()),
                onConfirm: () => {
                    dispatch(hideAlertConfirm());
                    dispatch(startLoad());
                    api.delete(endpoints.DELETE_EXPERIENCE + id, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`,
                        },
                    })
                        .then((response) => {
                            const experiences = experiencesData.filter(
                                (item) => item.id !== id
                            );
                            setExperiencesData(experiences);
                            console.log(response);
                            dispatch(stopLoad());
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(stopLoad());
                            dispatch(
                                showAlertInfo({
                                    title: 'Error',
                                    info: 'Falha ao excluir experiência',
                                    show: true,
                                    textButton: 'OK',
                                    onDismiss: () => {
                                        dispatch(hideAlertInfo());
                                    },
                                })
                            );
                        });
                },
            })
        );
    };

    const handleShowFormAddAcademic = () => {
        setShowAddFormAcademic(true);
        // document.getElementById('formAddAcademic')?.scrollIntoView();
    };

    const handleShowFormAddExperience = () => {
        setShowAddFormExperience(true);
        // document.getElementById('formAddAcademic')?.scrollIntoView();
    };

    useEffect(() => {
        if (showAddFormAcademic) {
            const form = document.getElementById('formAddAcademic')!;
            const offSet = -100;
            const y =
                form.getBoundingClientRect().top + window.pageYOffset + offSet;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [showAddFormAcademic]);

    useEffect(() => {
        if (showAddFormExperience) {
            const form = document.getElementById('formAddExperience')!;
            const offSet = -100;
            const y =
                form.getBoundingClientRect().top + window.pageYOffset + offSet;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [showAddFormExperience]);

    return (
        <div className="profile-candidate">
            <h1>Meu currículo</h1>
            <p>
                Preencha cada parte com seus dados e mantenha seu cadastro
                atualizado para se candidatar às vagas. Caso realize alterações,
                estes ajustes serão replicados para todas as suas candidaturas.
            </p>
            <div className="cards">
                <ProfileCandidateCard
                    title="Dados Pessoais"
                    icons={[]}
                    loading={userLoading}
                >
                    <ProfileCandidateCardData {...userData} />
                </ProfileCandidateCard>
                <ProfileCandidateCard
                    title="Formação Acadêmica"
                    icons={[
                        <IconButton
                            key={1}
                            color="#fff"
                            backgroundColor="#2E8B57"
                            icon={<MdOutlineAdd />}
                            onClick={handleShowFormAddAcademic}
                            disable={academicLoading}
                        />,
                    ]}
                    loading={academicLoading}
                >
                    <>
                        <ModalEditProfile
                            show={showEditFormAcademic}
                            onDismiss={() => setShowEditFormAcademic(false)}
                        >
                            <FormProfileCandidateAddAcademic
                                changeVisible={setShowEditFormAcademic}
                                title="Editar formação"
                                onAddForm={handleEditAcademicGraduation}
                                addOperation={false}
                                closeOnAdd={true}
                                preId={academicEditData.id}
                                preCourseName={academicEditData.course_name}
                                preInstituition={academicEditData.instituition}
                                preStudyArea={academicEditData.study_area}
                                preStartDate={academicEditData.start_date}
                                preEndDate={academicEditData.date_conclusion}
                                preInProgress={
                                    academicEditData.date_conclusion
                                        ? false
                                        : true
                                }
                                preConclued={academicEditData.conclued}
                                preDescription={academicEditData.description}
                            />
                        </ModalEditProfile>
                        {academicGraduationsData &&
                            academicGraduationsData.map(
                                (graduation, index, academicArray) => (
                                    <ProfileCandidateCardAcademic
                                        key={graduation.id}
                                        {...graduation}
                                        onClickEdit={handleSetEditAcademic}
                                        onClickDelete={handleDeleteAcademic}
                                        separator={
                                            index < academicArray.length - 1
                                        }
                                    />
                                )
                            )}
                        <ContainerFormCandidateProfile
                            show={showAddFormAcademic}
                        >
                            <FormProfileCandidateAddAcademic
                                changeVisible={setShowAddFormAcademic}
                                title="Adicionar nova formação"
                                onAddForm={handleAddAcademicGraduation}
                            />
                        </ContainerFormCandidateProfile>
                    </>
                </ProfileCandidateCard>
                <ProfileCandidateCard
                    title="Experiências"
                    icons={[
                        <IconButton
                            key={1}
                            color="#fff"
                            backgroundColor="#2E8B57"
                            icon={<MdOutlineAdd />}
                            onClick={handleShowFormAddExperience}
                            disable={experienceLoading}
                        />,
                    ]}
                    loading={experienceLoading}
                >
                    <>
                        <ModalEditProfile
                            show={showEditFormExperience}
                            onDismiss={() => setShowEditFormExperience(false)}
                        >
                            <FormProfileCandidateAddExperience
                                changeVisible={setShowEditFormExperience}
                                title="Editar experiência"
                                onAddForm={handleEditExperience}
                                closeOnAdd={true}
                                addOperation={false}
                                preId={experienceEditData.id}
                                prePosition={experienceEditData.position}
                                preCompanyName={experienceEditData.company_name}
                                preLocality={experienceEditData.locality}
                                preJobType={experienceEditData.job_type}
                                preSector={experienceEditData.sector}
                                preDescription={experienceEditData.description}
                                preStart={experienceEditData.start}
                                preEnd={experienceEditData.end}
                            />
                        </ModalEditProfile>
                        {experiencesData &&
                            experiencesData.map(
                                (experience, index, experienceArray) => (
                                    <ProfileCandidateCardExperience
                                        key={experience.id}
                                        {...experience}
                                        onClickEdit={handleSetEditExperience}
                                        onClickDelete={handleDeleteExperience}
                                        separator={
                                            index < experienceArray.length - 1
                                        }
                                    />
                                )
                            )}
                        <ContainerFormCandidateProfile
                            show={showAddFormExperience}
                        >
                            <FormProfileCandidateAddExperience
                                changeVisible={setShowAddFormExperience}
                                title="Adicionar nova experiência"
                                onAddForm={handleAddExperience}
                            />
                        </ContainerFormCandidateProfile>
                    </>
                </ProfileCandidateCard>
            </div>
        </div>
    );
}

export default ProfileCandidate;
