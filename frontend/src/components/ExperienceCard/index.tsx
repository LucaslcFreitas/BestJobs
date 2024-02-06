import './styles.sass';
import { ExperienceType } from '../../shared/types/ExperienceType';

type ExperienceCardProps = {
    experience: ExperienceType;
    separator?: boolean;
};

function ExperienceCard({
    experience,
    separator = false,
}: ExperienceCardProps) {
    const dateStartFormated = new Date(experience.start).toLocaleDateString(
        'pt-br'
    );
    const dateEndFormated = new Date(experience.end).toLocaleDateString(
        'pt-br'
    );

    return (
        <div className="experience-card">
            <h4>{experience.position}</h4>
            <p className="paragraph">
                {experience.company_name} • {experience.locality}
            </p>
            <p className="paragraph">
                {dateStartFormated} - {dateEndFormated} •{' '}
                {experience.type_locality.name} • {experience.job_type.name}
            </p>
            <p className="paragraph">Setor: {experience.sector.name}</p>
            {separator && <hr />}
        </div>
    );
}

export default ExperienceCard;
