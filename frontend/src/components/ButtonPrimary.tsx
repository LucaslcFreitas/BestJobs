import '../styles/components/ButtonPrimary.sass';

type Props = {
    text?: string;
    onClickButton: () => void;
};

function ButtonPrimary({ text = 'Clicar', onClickButton }: Props) {
    return (
        <div className="button-primary" onClick={() => onClickButton()}>
            <p>{text}</p>
        </div>
    );
}

export default ButtonPrimary;
