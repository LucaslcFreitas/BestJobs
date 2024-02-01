import './styles.sass';
import { useId } from 'react';

type InputSelectProps = {
    options: OptionSelect[];
    value: string;
    onChange: ({ id, name }: { id: string; name: string }) => void;
    label: string;
    light?: boolean;
    required?: boolean;
    disable?: boolean;
};

type OptionSelect = {
    value: string;
    label: string;
};

function InputSelect({
    options,
    value,
    onChange,
    label,
    light = false,
    required = true,
    disable = false,
}: InputSelectProps) {
    const id = useId();

    const handleOnChange = (selectedValue: string) => {
        let selected = options[0];
        for (let item of options) {
            if (item.value === selectedValue) selected = item;
        }
        console.log(selected);
        onChange({ id: selected.value, name: selected.label });
    };

    return (
        <div className={`input-select ${light && 'input-select-light'}`}>
            <label htmlFor={id}>{label}</label>
            <select
                required={required}
                id={id}
                name="inputselect"
                value={value}
                onChange={(e) => handleOnChange(e.target.value)}
                disabled={disable}
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
