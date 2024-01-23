import { ExperienceType } from '../shared/types/ExperienceType';
import '../styles/components/ExperienceCard.sass';

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
            <p className="experience-card-paragraph">
                {experience.company_name} • {experience.locality}
            </p>
            <p className="experience-card-paragraph">
                {dateStartFormated} - {dateEndFormated} •{' '}
                {experience.type_locality.name} • {experience.job_type.name}
            </p>
            <p className="experience-card-paragraph">
                Setor: {experience.sector.name}
            </p>
            {separator && <hr />}
        </div>
    );
}

export default ExperienceCard;
