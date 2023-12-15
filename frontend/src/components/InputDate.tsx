import { useId } from 'react';
import '../styles/components/InputDate.sass';

type InputDateProps = {
    label: string;
    value: string;
    onChangeInput: (value: string) => void;
    disabled?: boolean;
};

function InputDate({
    label,
    value,
    onChangeInput,
    disabled = false,
}: InputDateProps) {
    const id = useId();

    return (
        <div className="input-date">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                disabled={disabled}
                type="date"
                value={value}
                onChange={(e) => onChangeInput(e.target.value)}
            />
        </div>
    );
}

export default InputDate;
