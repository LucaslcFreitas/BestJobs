import '../styles/components/IconButton.sass';
import React from 'react';

type IconButtonProps = {
    color: string;
    backgroundColor: string;
    icon: React.ReactNode;
    onClick: () => void;
};

function IconButton({
    color,
    backgroundColor,
    icon,
    onClick,
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor, color }}
            className="icon-button"
        >
            {icon}
        </button>
    );
}

export default IconButton;
