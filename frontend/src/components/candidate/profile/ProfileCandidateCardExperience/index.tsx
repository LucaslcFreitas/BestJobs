import './styles.sass';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ExperienceType } from '../../../../shared/types/ExperienceType';
import IconButtonSmall from '../../../IconButtonSmall';

type ProfileCandidateCardAcademicProps = {
    onClickEdit: (ExperienceData: ExperienceType) => void;
    onClickDelete: (id: string) => void;
    separator?: boolean;
} & ExperienceType;

function ProfileCandidateCardExperience({
    id,
    position,
    company_name,
    locality,
    type_locality,
    job_type,
    sector,
    description,
    start,
    end,
    onClickEdit,
    onClickDelete,
    separator = false,
}: ProfileCandidateCardAcademicProps) {
    const dateStartFormated = new Date(start).toLocaleDateString('pt-br');
    const dateEndFormated = new Date(end).toLocaleDateString('pt-br');

    const handleClickEdit = () => {
        onClickEdit({
            id,
            position,
            company_name,
            locality,
            type_locality,
            job_type,
            sector,
            description,
            start,
            end,
        });
        console.log('edit');
    };

    const handleClickDelete = () => {
        onClickDelete(id);
        console.log('delete');
    };

    return (
        <>
            <div className="profile-candidate-card-experience">
                <div className="profile-card-experience-data">
                    <div>
                        <h4>{position}</h4>
                        <p className="profile-card-experience-paragraph">
                            {company_name} • {locality}
                        </p>
                        <p className="profile-card-experience-paragraph">
                            {dateStartFormated} - {dateEndFormated} •{' '}
                            {type_locality.name} • {job_type.name}
                        </p>
                        <p className="profile-card-experience-paragraph">
                            Setor: {sector.name}
                        </p>
                    </div>
                    <div className="profile-card-experience-buttons">
                        <IconButtonSmall
                            color="#1E90FF"
                            backgroundColor="#f2f4fd"
                            icon={<FaEdit />}
                            onClick={handleClickEdit}
                        />
                        <IconButtonSmall
                            color="#EB0303"
                            backgroundColor="#f2f4fd"
                            icon={<FaTrash />}
                            onClick={handleClickDelete}
                        />
                    </div>
                </div>
                <p className="profile-card-experience-description">
                    {description}
                </p>
            </div>
            {separator && <hr />}
        </>
    );
}

export default ProfileCandidateCardExperience;
