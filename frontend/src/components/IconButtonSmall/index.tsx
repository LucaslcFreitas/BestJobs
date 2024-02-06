import './styles.sass';
import React from 'react';

type IconButtonSmallProps = {
    color: string;
    backgroundColor: string;
    icon: React.ReactNode;
    onClick: () => void;
    disable?: boolean;
};

function IconButtonSmall({
    color,
    backgroundColor,
    icon,
    onClick,
    disable = false,
}: IconButtonSmallProps) {
    return (
        <button
            onClick={onClick}
            disabled={disable}
            style={{
                backgroundColor: disable ? '#707070' : backgroundColor,
                color: disable ? '#fff' : color,
            }}
            className="icon-button-small"
        >
            {icon}
        </button>
    );
}

export default IconButtonSmall;
