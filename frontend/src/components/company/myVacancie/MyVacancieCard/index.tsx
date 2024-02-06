import './styles.sass';
import moment from 'moment';
import { VacancieWithCandidacyType } from '../../../../shared/types/VacancieType';
import LinkAction from '../../../LinkAction';
import ButtonPrimary from '../../../ButtonPrimary';

type MyVacancieCardProps = {
    vacancie: VacancieWithCandidacyType;
    onDetail: (vacancie: VacancieWithCandidacyType) => void;
    onClose: (vacancie: VacancieWithCandidacyType) => void;
};

function MyVacancieCard({ vacancie, onDetail, onClose }: MyVacancieCardProps) {
    return (
        <div className="my-vacancie-card">
            <div className="card-row">
                <div>
                    <h3>{vacancie.name_position}</h3>
                    <p className="my-vacancie-card-candidacy">
                        {vacancie.Candidacy.length} candidatos
                    </p>
                </div>
                <p>{vacancie.publisehd ? 'Aberta' : 'Encerrada'}</p>
            </div>
            <div className="card-row my-vacancie-card-flex-end">
                <p>
                    Criado em:{' '}
                    {moment(vacancie.publication_date).format('DD-MM-YYYY')}
                </p>
                <div className="card-buttons">
                    {vacancie.publisehd && (
                        <LinkAction
                            text="Encerrar"
                            color="#DF0000"
                            colorHover="#AE0000"
                            onClick={() => onClose(vacancie)}
                        />
                    )}
                    <div>
                        <ButtonPrimary
                            text="Detalhes"
                            onClickButton={() => onDetail(vacancie)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyVacancieCard;
