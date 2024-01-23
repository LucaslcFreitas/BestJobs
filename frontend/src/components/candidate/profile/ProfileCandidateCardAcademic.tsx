import '../../../styles/components/candidate/profile/ProfileCandidateCardAcademic.sass';
import IconButton from '../../IconButton';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AcademicGraduationType } from '../../../shared/types/AcademicGraduationType';

type ProfileCandidateCardAcademicProps = {
    onClickEdit: (AcademicData: AcademicGraduationType) => void;
    onClickDelete: (id: string) => void;
    separator?: boolean;
} & AcademicGraduationType;

function ProfileCandidateCardAcademic({
    id,
    instituition,
    course_name,
    study_area,
    start_date,
    date_conclusion,
    conclued,
    description,
    onClickEdit,
    onClickDelete,
    separator = false,
}: ProfileCandidateCardAcademicProps) {
    const dateStartFormated = new Date(start_date).toLocaleDateString('pt-br');
    const dateEndFormated = date_conclusion
        ? new Date(date_conclusion).toLocaleDateString('pt-br')
        : null;

    const handleClickEdit = () => {
        onClickEdit({
            id,
            instituition,
            course_name,
            study_area,
            start_date,
            date_conclusion,
            conclued,
            description,
        });
    };

    const handleClickDelete = () => {
        onClickDelete(id);
        console.log('delete');
    };

    return (
        <>
            <div className="profile-candidate-card-academic">
                <div className="profile-card-academic-data">
                    <div>
                        <h4>{course_name}</h4>
                        <p className="profile-card-academic-paragraph">
                            {instituition}
                        </p>
                        <p className="profile-card-academic-paragraph">
                            {dateStartFormated} -{' '}
                            {!date_conclusion
                                ? 'Em progresso'
                                : dateEndFormated}{' '}
                            •{' '}
                            {date_conclusion
                                ? conclued
                                    ? 'Concluído'
                                    : 'Não Concluído'
                                : ''}
                        </p>
                        <p className="profile-card-academic-paragraph">
                            Área: {study_area.name}
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
                <p className="profile-card-academic-description">
                    {description}
                </p>
            </div>
            {separator && <hr />}
        </>
    );
}

export default ProfileCandidateCardAcademic;
