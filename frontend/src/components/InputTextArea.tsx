import '../styles/components/InputText.sass';

type InputTextAreaProps = {
    label: string;
    value: string;
    onChangeInput: (value: string) => void;
    error?: string;
};

function InputTextArea({
    label,
    value,
    onChangeInput,
    error,
}: InputTextAreaProps) {
    return (
        <div className="input-group">
            <textarea
                required
                name="textarea"
                value={value}
                onChange={(e) => onChangeInput(e.target.value)}
                className="input"
            />
            <label className="user-label">{label}</label>
            {error && <p>{error}</p>}
        </div>
    );
}

export default InputTextArea;
