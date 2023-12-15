import { useId } from 'react';
import '../styles/components/InputSelect.sass';

type InputSelectProps = {
    options: OptionSelect[];
    value: string;
    onChange: (value: string) => void;
    label: string;
};

type OptionSelect = {
    value: string;
    label: string;
};

function InputSelect({ options, value, onChange, label }: InputSelectProps) {
    const id = useId();

    return (
        <div className="input-select">
            <label htmlFor={id}>{label}</label>
            <select
                required
                id={id}
                name="inputselect"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputSelect;
export type { InputSelectProps, OptionSelect };
