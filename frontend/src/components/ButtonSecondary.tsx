import '../styles/components/ButtonSecondary.sass';

type ButtonProps = {
    text?: string;
    onClickButton: () => void;
    disable?: boolean;
    backgroundColor?: string;
    color?: string;
};

function ButtonSecondary({
    text = 'Clicar',
    onClickButton,
    disable = false,
    backgroundColor = '#5850db',
    color = '#fff',
}: ButtonProps) {
    const handleClick = () => {
        if (!disable) onClickButton();
    };

    return (
        <button
            className="button-secondary"
            type={'button'}
            disabled={disable}
            onClick={handleClick}
            style={{ backgroundColor }}
        >
            <p style={{ color }}>{text}</p>
        </button>
    );
}

export default ButtonSecondary;
