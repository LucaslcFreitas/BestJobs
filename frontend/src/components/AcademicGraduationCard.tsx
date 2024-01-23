import { AcademicGraduationType } from '../shared/types/AcademicGraduationType';
import '../styles/components/AcademicGraduationCard.sass';

type AcademicGraduationCardProps = {
    academicGraduation: AcademicGraduationType;
    separator?: boolean;
};

function AcademicGraduationCard({
    academicGraduation,
    separator = false,
}: AcademicGraduationCardProps) {
    const dateStartFormated = new Date(
        academicGraduation.start_date
    ).toLocaleDateString('pt-br');
    const dateEndFormated = academicGraduation.date_conclusion
        ? new Date(academicGraduation.date_conclusion).toLocaleDateString(
              'pt-br'
          )
        : null;

    return (
        <div className="academic-graduation-card">
            <h4>{academicGraduation.course_name}</h4>
            <p className="academic-graduation-card-paragraph">
                {academicGraduation.instituition}
            </p>
            <p className="academic-graduation-card-paragraph">
                {dateStartFormated} -{' '}
                {academicGraduation.date_conclusion
                    ? 'Em progresso'
                    : dateEndFormated}{' '}
                •{' '}
                {academicGraduation.date_conclusion
                    ? academicGraduation.conclued
                        ? 'Concluído'
                        : 'Não Concluído'
                    : ''}
            </p>
            <p className="academic-graduation-card-paragraph">
                Área: {academicGraduation.study_area.name}
            </p>

            <p className="academic-graduation-card-description">
                {academicGraduation.description}
            </p>
            {separator && <hr />}
        </div>
    );
}

export default AcademicGraduationCard;