import '../../../styles/components/candidate/profile/ProfileCandidateCardAcademic.sass';
import TextInfo from '../../TextInfo';
import IconButton from '../../IconButton';
import { FaEdit } from 'react-icons/fa';

type ProfileCandidateCardAcademicProps = {
    id: string;
    instituition: string;
    courseName: string;
    studyArea: StudyArea[];
    startDate: string;
    dateConclusion?: string | undefined;
    conclued: true;
    description: string;
    onClickEdit?: (id: string) => void;
};

type StudyArea = {
    id: string;
    name: string;
};

function ProfileCandidateCardAcademic({
    id,
    instituition,
    courseName,
    studyArea,
    startDate,
    dateConclusion,
    conclued,
    description,
    onClickEdit,
}: ProfileCandidateCardAcademicProps) {
    const studyAreas = studyArea.map((area) => area.name);
    const dateStartFormated = new Date(startDate).toLocaleDateString('pt-br');
    const dateEndFormated = dateConclusion
        ? new Date(dateConclusion).toLocaleDateString('pt-br')
        : null;

    const handleClickEdit = () => {
        if (onClickEdit !== undefined) onClickEdit(id);
    };

    return (
        <div className="profile-candidate-card-academic">
            <div className="profile-candidate-card-academic-multiple-data-flex">
                <TextInfo label="Nome do curso:" text={courseName} />
                <IconButton
                    key={1}
                    color="#fff"
                    backgroundColor="#00f"
                    icon={<FaEdit />}
                    onClick={handleClickEdit}
                />
            </div>
            <div className="profile-candidate-card-academic-multiple-data-flex">
                <TextInfo label="Instituição:" text={instituition} />
                <TextInfo
                    label="Área de estudo:"
                    text={studyAreas.toString()}
                />
            </div>
            <div className="profile-candidate-card-academic-multiple-data-flex">
                <TextInfo label="Data de início:" text={dateStartFormated} />
                <TextInfo
                    label="Data de termino: "
                    text={dateEndFormated ? dateEndFormated : 'Até o momento'}
                />
                <TextInfo label="Concluido: " text={conclued ? 'Sim' : 'Não'} />
            </div>
            <TextInfo label="Descrição:" text={description} />
        </div>
    );
}

export default ProfileCandidateCardAcademic;
export type { ProfileCandidateCardAcademicProps };
