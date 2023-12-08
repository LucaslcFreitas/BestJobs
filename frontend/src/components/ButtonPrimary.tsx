import '../styles/components/ButtonPrimary.sass';

type ButtonProps = {
    text?: string;
    onClickButton: () => void;
    disable?: boolean;
    isSubmit?: boolean;
};

function ButtonPrimary({
    text = 'Clicar',
    onClickButton,
    disable = false,
    isSubmit = false,
}: ButtonProps) {
    const handleClick = () => {
        if (!disable && !isSubmit) onClickButton();
    };

    return (
        <button
            className="button-primary"
            disabled={disable}
            type={isSubmit ? 'submit' : 'button'}
            onClick={handleClick}
        >
            <p>{text}</p>
        </button>
    );
}

export default ButtonPrimary;
