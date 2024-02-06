import './styles.sass';
import { useId } from 'react';

type InputProps = {
    type: string;
    label: string;
    value: string;
    onChangeInput: (value: string) => void;
    error?: string;
    maxLength?: number | undefined;
    disable?: boolean;
};

function InputText({
    type,
    label,
    value,
    onChangeInput,
    error,
    maxLength,
    disable = false,
}: InputProps) {
    const id = useId();

    return (
        <div className="input-group">
            <input
                required
                id={id}
                autoComplete="off"
                type={type}
                name="text"
                value={value}
                onChange={(e) => onChangeInput(e.target.value)}
                className="input"
                maxLength={maxLength}
                disabled={disable}
            />
            <label htmlFor={id} className="user-label">
                {label}
            </label>
            {error && <p>{error}</p>}
        </div>
    );
}

export default InputText;
