import '../styles/components/InputText.sass';

type InputProps = {
    type: string;
    label: string;
    value: string;
    onChangeInput: (value: string) => void;
    error?: string;
};

function InputText({ type, label, value, onChangeInput, error }: InputProps) {
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
            />
            <label className="user-label">{label}</label>
            {error && <p>{error}</p>}
        </div>
    );
}

export default InputText;
