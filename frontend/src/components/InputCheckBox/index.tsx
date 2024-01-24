import './styles.sass';
import { useId } from 'react';

type InputCheckBoxProps = {
    name: string;
    isChecked: boolean;
    setChangeChecked: (value: boolean) => void;
    disableb?: boolean;
};

function InputCheckBox({
    name,
    isChecked,
    setChangeChecked,
    disableb = false,
}: InputCheckBoxProps) {
    const handleChangeCheck = () => {
        setChangeChecked(!isChecked);
    };

    const id = useId();

    return (
        <div className="checkbox-group">
            <input
                disabled={disableb}
                name={name}
                id={id}
                type="checkbox"
                value={name}
                checked={isChecked}
                onChange={handleChangeCheck}
            />
            <label htmlFor={id}>{name}</label>
        </div>
    );
}

export default InputCheckBox;
