import '../../../styles/components/candidate/profile/ProfileCandidateCardAcademic.sass';
import IconButton from '../../IconButton';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AcademicGraduationType } from '../../../shared/types/AcademicGraduationType';

type ProfileCandidateCardAcademicProps = {
    onClickEdit: (AcademicData: AcademicGraduationType) => void;
    onClickDelete: (id: string) => void;
} & AcademicGraduationType;

function ProfileCandidateCardAcademic({
    id,
    instituition,
    courseName,
    studyArea,
    startDate,
    endDate,
    conclued,
    description,
    onClickEdit,
    onClickDelete,
}: ProfileCandidateCardAcademicProps) {
    const dateStartFormated = new Date(startDate).toLocaleDateString('pt-br');
    const dateEndFormated = endDate
        ? new Date(endDate).toLocaleDateString('pt-br')
        : null;

    const handleClickEdit = () => {
        onClickEdit({
            id,
            instituition,
            courseName,
            studyArea,
            startDate,
            endDate,
            conclued,
            description,
        });
    };

    const handleClickDelete = () => {
        onClickDelete(id);
        console.log('delete');
    };

    return (
        <div className="profile-candidate-card-academic">
            <div className="profile-card-academic-data">
                <div>
                    <h4>{courseName}</h4>
                    <p className="profile-card-academic-paragraph">
                        {instituition}
                    </p>
                    <p className="profile-card-academic-paragraph">
                        {dateStartFormated} -{' '}
                        {!endDate ? 'Em progresso' : dateEndFormated} •{' '}
                        {endDate
                            ? conclued
                                ? 'Concluído'
                                : 'Não Concluído'
                            : ''}
                    </p>
                    <p className="profile-card-academic-paragraph">
                        Área: {studyArea.name}
                    </p>
                </div>
                <div className="profile-card-academic-buttons">
                    <IconButton
                        color="#fff"
                        backgroundColor="#1E90FF"
                        icon={<FaEdit />}
                        onClick={handleClickEdit}
                    />
                    <IconButton
                        color="#fff"
                        backgroundColor="#EB0303"
                        icon={<FaTrash />}
                        onClick={handleClickDelete}
                    />
                </div>
            </div>
            <p className="profile-card-academic-description">{description}</p>
        </div>
    );
}

export default ProfileCandidateCardAcademic;
