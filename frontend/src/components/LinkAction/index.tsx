import './styles.sass';
import React from 'react';

type LinkActionProps = {
    text: string;
    color: string;
    colorHover: string;
    onClick: () => void;
    disable?: boolean;
};

function LinkAction({
    text,
    color,
    colorHover,
    onClick,
    disable = false,
}: LinkActionProps) {
    const handleClick = () => {
        if (!disable) {
            onClick();
        }
    };

    const mouseOver = (event: React.SyntheticEvent) => {
        if (!disable) {
            let target = event.target as HTMLInputElement;
            target.style.color = colorHover;
        }
    };

    const mouseOut = (event: React.SyntheticEvent) => {
        if (!disable) {
            let target = event.target as HTMLInputElement;
            target.style.color = color;
        }
    };

    return (
        <a
            className={`link-action ${disable && 'link-action-disabled'}`}
            style={{ color: !disable ? color : '#6e6e6e' }}
            onClick={handleClick}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
        >
            {text}
        </a>
    );
}

export default LinkAction;
