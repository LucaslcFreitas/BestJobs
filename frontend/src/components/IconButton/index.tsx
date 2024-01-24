import './styles.sass';
import React from 'react';

type IconButtonProps = {
    color: string;
    backgroundColor: string;
    icon: React.ReactNode;
    onClick: () => void;
    disable?: boolean;
};

function IconButton({
    color,
    backgroundColor,
    icon,
    onClick,
    disable = false,
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disable}
            style={{
                backgroundColor: disable ? '#707070' : backgroundColor,
                color: disable ? '#fff' : color,
            }}
            className="icon-button"
        >
            {icon}
        </button>
    );
}

export default IconButton;
