import './styles.sass';
import { useId } from 'react';

type InputTextAreaProps = {
    label: string;
    value: string;
    onChangeInput: (value: string) => void;
    error?: string;
    disable?: boolean;
};

function InputTextArea({
    label,
    value,
    onChangeInput,
    error,
    disable = false,
}: InputTextAreaProps) {
    const id = useId();

    return (
        <div className="input-group">
            <textarea
                required
                id={id}
                name="textarea"
                value={value}
                onChange={(e) => onChangeInput(e.target.value)}
                className="input"
                disabled={disable}
            />
            <label id={id} className="user-label">
                {label}
            </label>
            {error && <p>{error}</p>}
        </div>
    );
}

export default InputTextArea;
