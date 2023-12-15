import '../styles/components/IconLink.sass';
import React from 'react';
import { Link } from 'react-router-dom';

type IconLinkProps = {
    color: string;
    backgroundColor: string;
    icon: React.ReactNode;
    to: string;
};

function IconLink({ color, backgroundColor, icon, to }: IconLinkProps) {
    return (
        <Link to={to} style={{ backgroundColor, color }} className="icon-link">
            {icon}
        </Link>
    );
}

export default IconLink;
