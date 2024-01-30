import './styles.sass';
import ButtonPrimary from '../../../ButtonPrimary';
import LinkAction from '../../../LinkAction';
import { MyCandidacyType } from '../../../../shared/types/VacancieType';
import moment from 'moment';

type MyCandidacyCardProps = {
    candidacy: MyCandidacyType;
    onDetail: (candidacy: MyCandidacyType) => void;
    onDesist: (candidacy: MyCandidacyType) => void;
};

function MyCandidacyCard({
    candidacy,
    onDetail,
    onDesist,
}: MyCandidacyCardProps) {
    const status = !candidacy.finished
        ? 'Em Análise'
        : candidacy.approved
        ? 'Aprovado'
        : 'Reprovado';

    return (
        <div className="my-candidacy-card">
            <div className="row">
                <div>
                    <h3>{candidacy.vacancie.name_position}</h3>
                    <p className="company">{candidacy.vacancie.company.name}</p>
                </div>
                <p
                    className={`status ${
                        status === 'Aprovado'
                            ? 'status-approved'
                            : status === 'Reprovado'
                            ? 'status-disapproved'
                            : ''
                    }`}
                >
                    {status}
                </p>
            </div>
            <div className="row card-flex-end">
                <p>
                    Candidatado em:{' '}
                    {moment(candidacy.create_at).format('DD-MM-YYYY')}
                </p>
                <div className="buttons">
                    {status === 'Em Análise' && (
                        <LinkAction
                            text="Desistir"
                            color="#DF0000"
                            colorHover="#AE0000"
                            onClick={() => onDesist(candidacy)}
                        />
                    )}
                    <div>
                        <ButtonPrimary
                            text="Detalhes"
                            onClickButton={() => onDetail(candidacy)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyCandidacyCard;
