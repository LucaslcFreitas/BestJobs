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
    return (
        <div className="input-select">
            <label>{label}</label>
            <select
                required
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
