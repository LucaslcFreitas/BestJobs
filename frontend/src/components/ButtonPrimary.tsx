import '../styles/components/ButtonPrimary.sass';

type ButtonProps = {
    text?: string;
    onClickButton: () => void;
    disable?: boolean;
};

function ButtonPrimary({
    text = 'Clicar',
    onClickButton,
    disable = false,
}: ButtonProps) {
    const handleClick = () => {
        if (!disable) onClickButton();
    };

    return (
        <div
            className={`button-primary ${
                disable ? 'button-primary-disable' : ''
            }`}
            onClick={handleClick}
        >
            <p>{text}</p>
        </div>
    );
}

export default ButtonPrimary;
