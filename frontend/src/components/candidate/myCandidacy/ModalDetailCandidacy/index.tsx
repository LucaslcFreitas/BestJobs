import './styles.sass';
import moment from 'moment';
import { MyCandidacyType } from '../../../../shared/types/VacancieType';
import ButtonPrimary from '../../../ButtonPrimary';

type ModalDetailCandidacyType = {
    show: boolean;
    onDismiss: () => void;
    candidacy: MyCandidacyType;
};

function ModalDetailCandidacy({
    show,
    onDismiss,
    candidacy,
}: ModalDetailCandidacyType) {
    if (!show) {
        return <></>;
    }

    return (
        <div className="modal-detail-candidacy">
            <div className="content">
                <div>
                    <div className="content-header">
                        <div className="texts">
                            <h2>{candidacy.vacancie.name_position}</h2>
                            <p>{candidacy.vacancie.company.name}</p>
                            <p className="publication-date">
                                Publicado em{' '}
                                {moment(
                                    candidacy.vacancie.publication_date
                                ).format('DD-MM-YYYY')}
                            </p>
                        </div>
                        <p className="candidacy">
                            {candidacy.vacancie.Candidacy} candidaturas
                        </p>
                    </div>
                    <hr />
                    <div className="infos">
                        <p>
                            <b>Tipos de Trabalho:</b>{' '}
                            {candidacy.vacancie.job_type.name}
                        </p>
                        <p>
                            <b>Setor:</b> {candidacy.vacancie.sector.name}
                        </p>
                        <p>
                            <b>Modelo:</b>{' '}
                            {candidacy.vacancie.type_locality.name}
                        </p>
                        <p>
                            <b>Número de Funcionários:</b>{' '}
                            {candidacy.vacancie.company.number_of_employees}
                        </p>
                        <p>
                            <b>Expectativa Salarial: </b>
                            {' R$ '}
                            {candidacy.vacancie.salary_expectation}
                        </p>
                        <p>
                            <b>Local de Atuação:</b>{' '}
                            {candidacy.vacancie.locality}
                        </p>
                    </div>
                    <hr />
                    <h3>Descrição:</h3>
                    <p className="about">{candidacy.vacancie.about}</p>
                    <h3>Habilidades Necessárias:</h3>
                    <ul>
                        {candidacy.vacancie.Vacancie_skill.map((item) => (
                            <li key={item.skill.id}>{item.skill.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="candidacy-footer">
                    <div className="button-container">
                        <ButtonPrimary
                            text="Fechar"
                            onClickButton={onDismiss}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDetailCandidacy;
