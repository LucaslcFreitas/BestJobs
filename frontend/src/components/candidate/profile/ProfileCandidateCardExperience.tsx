import { FaEdit } from 'react-icons/fa';
import '../../../styles/components/candidate/profile/ProfileCandidateCardExperience.sass';
import TextInfo from '../../TextInfo';
import IconButton from '../../IconButton';

type ProfileCandidateCardExperienceProps = {
    id: string;
    position: string;
    company_name: string;
    locality: string;
    type_locality: TypeLocality;
    job_type: JobType;
    sector: Sector;
    description: string;
    start: string;
    end: string;
};

type TypeLocality = {
    id: string;
    name: string;
};

type Sector = {
    id: string;
    name: string;
};

type JobType = {
    id: string;
    name: string;
};

function ProfileCandidateCardExperience({
    position,
    company_name,
    locality,
    type_locality,
    job_type,
    sector,
    description,
    start,
    end,
}: ProfileCandidateCardExperienceProps) {
    const dateStartFormated = new Date(start).toLocaleDateString('pt-br');
    const dateEndFormated = new Date(end).toLocaleDateString('pt-br');

    const handleClickEdit = () => {
        console.log('edit');
    };

    return (
        <div className="profile-candidate-card-experience">
            <div className="profile-candidate-card-experience-multiple-data-flex">
                <TextInfo label="Nome do cargo:" text={position} />
                <IconButton
                    key={1}
                    color="#fff"
                    backgroundColor="#00f"
                    icon={<FaEdit />}
                    onClick={handleClickEdit}
                />
            </div>
            <div className="profile-candidate-card-experience-multiple-data-flex">
                <TextInfo label="Empresa:" text={company_name} />
                <TextInfo label="Local:" text={locality} />
                <TextInfo label="Modo:" text={type_locality.name} />
            </div>
            <div className="profile-candidate-card-experience-multiple-data-flex">
                <TextInfo label="Setor:" text={sector.name} />
                <TextInfo label="Tipo de trabalho:" text={job_type.name} />
            </div>
            <TextInfo label="Descrição:" text={description} />
            <div className="profile-candidate-card-experience-multiple-data-flex">
                <TextInfo label="Início:" text={dateStartFormated} />
                <TextInfo label="Término:" text={dateEndFormated} />
            </div>
        </div>
    );
}

export default ProfileCandidateCardExperience;
export type { ProfileCandidateCardExperienceProps };
