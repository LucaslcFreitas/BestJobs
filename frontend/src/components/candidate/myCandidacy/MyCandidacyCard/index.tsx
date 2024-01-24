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
            <div className="my-candidacy-card-row">
                <div>
                    <h3>{candidacy.vacancie.name_position}</h3>
                    <p className="my-candidacy-card-company">
                        {candidacy.vacancie.company.name}
                    </p>
                </div>
                <p
                    className={`${
                        status === 'Aprovado'
                            ? 'my-candidacy-card-approved'
                            : status === 'Reprovado'
                            ? 'my-candidacy-card-disapproved'
                            : ''
                    }`}
                >
                    {status}
                </p>
            </div>
            <div className="my-candidacy-card-row my-candidacy-card-flex-end">
                <p>
                    Candidatado em:{' '}
                    {moment(candidacy.create_at).format('DD-MM-YYYY')}
                </p>
                <div className="my-candidacy-card-buttons">
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
