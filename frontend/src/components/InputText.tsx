import '../styles/components/InputText.sass';

type InputProps = {
    type: string;
    label: string;
    value: string;
    onChangeInput: (value: string) => void;
    error?: string;
    maxLength?: number | undefined;
};

function InputText({
    type,
    label,
    value,
    onChangeInput,
    error,
    maxLength,
}: InputProps) {
    return (
        <div className="input-group">
            <input
                required
                autoComplete="off"
                type={type}
                name="text"
                value={value}
                onChange={(e) => onChangeInput(e.target.value)}
                className="input"
                maxLength={maxLength}
            />
            <label className="user-label">{label}</label>
            {error && <p>{error}</p>}
        </div>
    );
}

export default InputText;
