import './styles.sass';
import React from 'react';
import { Link } from 'react-router-dom';

type IconLinkProps = {
    color: string;
    backgroundColor: string;
    icon: React.ReactNode;
    to: string;
    disable?: boolean;
};

function IconLink({
    color,
    backgroundColor,
    icon,
    to,
    disable = false,
}: IconLinkProps) {
    return (
        <Link
            to={to}
            style={{
                backgroundColor: disable ? '#707070' : backgroundColor,
                color: disable ? '#fff' : color,
            }}
            className={`icon-link ${disable && 'icon-link-disable'}`}
        >
            {icon}
        </Link>
    );
}

export default IconLink;
