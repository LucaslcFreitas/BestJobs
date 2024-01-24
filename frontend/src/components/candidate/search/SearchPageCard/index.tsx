import './styles.sass';

type SearchPageCard = {
    text: string;
    onClick: () => void;
    isCurrent: boolean;
};

function SearchPageCard({ text, onClick, isCurrent }: SearchPageCard) {
    const handleClick = () => {
        if (!isCurrent) {
            onClick();
        }
    };

    return (
        <div
            className={`search-page-card ${
                isCurrent && 'search-page-card-current'
            }`}
            onClick={handleClick}
        >
            <p>{text}</p>
        </div>
    );
}

export default SearchPageCard;
