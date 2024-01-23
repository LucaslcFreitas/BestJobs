import '../../../styles/components/company/viewVacancie/ViewVacancieCard.sass';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

type ViewVacancieCardProps = {
    title: string;
    status: 'Em Análise' | 'Aprovado' | 'Reprovado';
    onClick: () => void;
    selected?: boolean;
    separator?: boolean;
};

function ViewVacancieCard({
    title,
    status,
    onClick,
    selected = false,
    separator = false,
}: ViewVacancieCardProps) {
    return (
        <>
            <div
                className={`view-vacancie-card ${
                    selected && 'view-vacancie-card-selected'
                }`}
                onClick={onClick}
            >
                <div className="view-vacancie-card-labels">
                    <h3>{title}</h3>
                    <p>{status}</p>
                </div>
                <MdOutlineKeyboardArrowRight />
            </div>
            {separator && <hr />}
        </>
    );
}

export default ViewVacancieCard;
