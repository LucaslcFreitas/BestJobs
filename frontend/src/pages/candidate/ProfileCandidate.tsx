import '../../styles/pages/candidate/ProfileCandidate.sass';
import ProfileCandidateCard from '../../components/candidate/profile/ProfileCandidateCard';
import ProfileCandidateCardData, {
    ProfileCandidateCardDataProps,
} from '../../components/candidate/profile/ProfileCandidateCardData';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineAdd } from 'react-icons/md';
import IconLink from '../../components/IconLink';
import IconButton from '../../components/IconButton';
import ProfileCandidateCardAcademic, {
    ProfileCandidateCardAcademicProps,
} from '../../components/candidate/profile/ProfileCandidateCardAcademic';
import FormProfileCandidateAddAcademic from '../../components/candidate/profile/FormProfileCandidateAddAcademic';
import { useEffect, useState } from 'react';
import ProfileCandidateCardExperience, {
    ProfileCandidateCardExperienceProps,
} from '../../components/candidate/profile/ProfileCandidateCardExperience';
import FormProfileCandidateAddExperience from '../../components/candidate/profile/FormProfileCandidateAddExperience';

const userDataPre: ProfileCandidateCardDataProps = {
    name: 'Lucas Freitas',
    email: 'lucaslcfjf@hotmail.com',
    cpf: '11111111111',
    description: 'Desenvolvedor Front-end',
};

const academicGraduationsDataPre: ProfileCandidateCardAcademicProps[] = [
    {
        id: '79f4b4ea-570a-43ee-83f5-b591b638fe8e',
        instituition: 'UFJF',
        courseName: 'Sistemas de Informação',
        studyArea: [
            {
                id: 'd3b5b254-0e19-464c-9a33-33cc633b6312',
                name: 'Engenharia/Tecnologia',
            },
        ],
        startDate: '2023-06-15T16:35:19.047Z',
        dateConclusion: '2023-06-15T16:39:19.047Z',
        conclued: true,
        description: 'Curso Universitário',
    },
    {
        id: '79f4b4ea-570a-43ee-83f5-b591b638fe8f',
        instituition: 'IFET',
        courseName: 'Informática para Internet',
        studyArea: [
            {
                id: 'd3b5b254-0e19-464c-9a33-33cc633b6312',
                name: 'Engenharia/Tecnologia',
            },
        ],
        startDate: '2023-06-15T16:35:19.047Z',
        dateConclusion: '2023-06-15T16:39:19.047Z',
        conclued: true,
        description: 'Curso Técnico',
    },
];

const experiencesDataPre: ProfileCandidateCardExperienceProps[] = [
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

function ProfileCandidate() {
    //Datas
    const [userData, setUserData] = useState<ProfileCandidateCardDataProps>({
        name: '',
        email: '',
        cpf: '',
        description: '',
    });
    const [academicGraduationsData, setAcademicGraduationData] = useState<
        ProfileCandidateCardAcademicProps[]
    >([]);
    const [experiencesData, setExperienceData] = useState<
        ProfileCandidateCardExperienceProps[]
    >([]);

    //Loaders
    const [userLoading, setUserLoading] = useState(true);
    const [academicLoading, setAcademicLoading] = useState(true);
    const [experienceLoading, setExperienceLoading] = useState(true);

    //FormsShows
    const [showAddFormAcademic, setShowAddFormAcademic] = useState(false);
    const [showAddFormExperience, setShowAddFormExperience] = useState(false);

    useEffect(() => {
        const userTimeout = setTimeout(() => {
            setUserData(userDataPre);
            setAcademicGraduationData(academicGraduationsDataPre);
            setExperienceData(experiencesDataPre);

            setUserLoading(false);
            setAcademicLoading(false);
            setExperienceLoading(false);
        }, 3000);

        return () => {
            clearTimeout(userTimeout);
        };
    }, []);

    //Academic Functions
    const handleEditAcademicPost = (id: string) => {
        console.log(id);
    };
    const handleAddAcademicGraduation = (
        courseName: string,
        instituition: string,
        studyAreaId: string,
        startDate: string,
        endDate: string,
        conclued: boolean,
        description: string
    ) => {
        console.log(
            courseName,
            instituition,
            studyAreaId,
            startDate,
            endDate,
            conclued,
            description
        );
    };

    const handleAddAcademicExperience = (
        position: string,
        company_name: string,
        locality: string,
        type_locality_id: string,
        job_type_id: string,
        sector_id: string,
        description: string,
        start: string,
        end: string
    ) => {
        console.log(
            position,
            company_name,
            locality,
            type_locality_id,
            job_type_id,
            sector_id,
            description,
            start,
            end
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
            <div className="profile-candidate-cards">
                <ProfileCandidateCard
                    title="Dados Pessoais"
                    icons={[
                        <IconLink
                            key={1}
                            color="#fff"
                            backgroundColor="#1E90FF"
                            icon={<FaEdit />}
                            to="/home"
                            disable={userLoading}
                        />,
                    ]}
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
                        {academicGraduationsData &&
                            academicGraduationsData.map((graduation) => (
                                <ProfileCandidateCardAcademic
                                    key={graduation.id}
                                    {...graduation}
                                    onClickEdit={handleEditAcademicPost}
                                />
                            ))}

                        <FormProfileCandidateAddAcademic
                            show={showAddFormAcademic}
                            changeVisible={setShowAddFormAcademic}
                            title="Adicionar nova formação"
                            onAddForm={handleAddAcademicGraduation}
                        />
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
                        {experiencesData &&
                            experiencesData.map((experience) => (
                                <ProfileCandidateCardExperience
                                    key={experience.id}
                                    {...experience}
                                />
                            ))}
                        <FormProfileCandidateAddExperience
                            show={showAddFormExperience}
                            changeVisible={setShowAddFormExperience}
                            title="Adicionar nova experiência"
                            onAddForm={handleAddAcademicExperience}
                        />
                    </>
                </ProfileCandidateCard>
            </div>
        </div>
    );
}

export default ProfileCandidate;
