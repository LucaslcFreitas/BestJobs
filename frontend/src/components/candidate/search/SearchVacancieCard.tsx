import '../../../styles/components/candidate/search/SearchVacancieCard.sass';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

type SearchVacancieCardProps = {
    title: string;
    subtitle: string;
    onClick: () => void;
    selected?: boolean;
    separator?: boolean;
};

function SearchVacancieCard({
    title,
    subtitle,
    onClick,
    selected = false,
    separator = false,
}: SearchVacancieCardProps) {
    return (
        <>
            <div
                className={`search-vacancie-card ${
                    selected && 'search-vacancie-card-selected'
                }`}
                onClick={onClick}
            >
                <div className="search-vacancie-card-labels">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </div>
                <MdOutlineKeyboardArrowRight />
            </div>
            {separator && <hr />}
        </>
    );
}

export default SearchVacancieCard;
