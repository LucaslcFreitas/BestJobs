import './styles.sass';

type TextInfoProps = {
    label: string;
    text: string;
};

function TextInfo({ label, text }: TextInfoProps) {
    return (
        <div className="textinfo-group">
            <span>{label}</span>
            <p>{text}</p>
        </div>
    );
}

export default TextInfo;
