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
import { useState } from 'react';

const userData: ProfileCandidateCardDataProps = {
    name: 'Lucas Freitas',
    email: 'lucaslcfjf@hotmail.com',
    cpf: '11111111111',
    description: 'Desenvolvedor Front-end',
};

const academicGraduationsData: ProfileCandidateCardAcademicProps[] = [
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

function ProfileCandidate() {
    const [showAddFormAcademic, setShowAddFormAcademic] = useState(false);

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
                        />,
                    ]}
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
                            onClick={() => setShowAddFormAcademic(true)}
                        />,
                    ]}
                >
                    <>
                        {academicGraduationsData.map((graduation) => (
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
            </div>
        </div>
    );
}

export default ProfileCandidate;
