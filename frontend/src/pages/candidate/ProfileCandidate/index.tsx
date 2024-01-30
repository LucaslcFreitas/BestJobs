import './styles.sass';
import { useDispatch } from 'react-redux';
import {
    showAlertConfirm,
    hideAlertConfirm,
} from '../../../redux/alert/sliceAlertConfirm';
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

const userDataPre: UserType = {
    name: 'Lucas Freitas',
    email: 'lucaslcfjf@hotmail.com',
    cpf: '11111111111',
    description: 'Desenvolvedor Front-end',
};

const academicGraduationsDataPre: AcademicGraduationType[] = [
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
        description:
            'Curso Universitário da área de tecnologia realizado em uma das principáis universidade de Minas Gerais.',
    },
    {
        id: '79f4b4ea-570a-43ee-83f5-b591b638fe8f',
        instituition: 'Instituto Federal de Juiz de Fora',
        course_name: 'Informática para Internet',
        study_area: {
            id: 'd3b5b254-0e19-464c-9a33-33cc633b6312',
            name: 'Engenharia/Tecnologia',
        },
        start_date: '2023-06-15T16:35:19.047Z',
        date_conclusion: '2023-06-15T16:39:19.047Z',
        conclued: true,
        description:
            'Curso técnico voltado para desenvolvimento de sistemas web.',
    },
];

const experiencesDataPre: ExperienceType[] = [
    {
        id: '1466d8e9-a3a8-411f-aa43-a685ca64e672',
        position: 'Desenvolvedor Fron-end',
        company_name: 'UFJF',
        locality: 'Juiz de Fora',
        type_locality: {
            id: 'db113946-2467-4c27-aece-6a24f9631271',
            name: 'Presencial',
        },
        job_type: {
            id: 'e538fddc-762a-448b-be71-28b3545cd12d',
            name: 'Tempo Integral',
        },
        sector: {
            id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
            name: 'Tecnologia da Informação',
        },
        description: 'Desenvolvimento de aplicações web',
        start: '2023-06-15T16:35:19.047Z',
        end: '2023-06-15T16:39:19.047Z',
    },
    {
        id: '1466d8e9-a3a8-411f-aa43-a685ca64e673',
        position: 'Desenvolvedor Back-end',
        company_name: 'Microsoft',
        locality: 'Juiz de Fora',
        type_locality: {
            id: 'db113946-2467-4c27-aece-6a24f9631271',
            name: 'Remoto',
        },
        job_type: {
            id: 'e538fddc-762a-448b-be71-28b3545cd12d',
            name: 'Tempo Integral',
        },
        sector: {
            id: 'f839a454-90ed-4fdd-8b83-62b14196f72c',
            name: 'Tecnologia da Informação',
        },
        description: 'Desenvolvimento de apis node',
        start: '2023-06-15T16:35:19.047Z',
        end: '2023-06-15T16:39:19.047Z',
    },
];

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
        const userTimeout = setTimeout(() => {
            setUserData(userDataPre);
            setAcademicGraduationData(academicGraduationsDataPre);
            setExperiencesData(experiencesDataPre);

            setUserLoading(false);
            setAcademicLoading(false);
            setExperienceLoading(false);
        }, 3000);

        return () => {
            clearTimeout(userTimeout);
        };
    }, []);

    //Academic Functions
    const handleSetEditAcademic = (academicData: AcademicGraduationType) => {
        setAcademicEditData(academicData);
        setShowEditFormAcademic(true);
        console.log(academicData);
    };
    const handleAddAcademicGraduation = (
        graduation: AcademicGraduationType
    ) => {
        const newGraduations = academicGraduationsData.concat([graduation]);
        //Setar loadind para API
        setAcademicGraduationData(newGraduations);
        setShowAddFormAcademic(false);
    };
    const handleEditAcademicGraduation = (
        graduation: AcademicGraduationType
    ) => {
        console.log(graduation);
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
                    console.log('excluido!');
                    //Chamar API para exclusão de formação acadêmica
                    dispatch(hideAlertConfirm());
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
        const newExperiences = experiencesData.concat([experience]);
        //Setar loadind para API
        setExperiencesData(newExperiences);
        setShowAddFormExperience(false);
    };
    const handleEditExperience = (experience: ExperienceType) => {
        console.log(experience);
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
                    console.log('excluido!');
                    //Chamar API para exclusão de experiência
                    dispatch(hideAlertConfirm());
                },
            })
        );
        console.log(id);
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