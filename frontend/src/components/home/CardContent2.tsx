import '../../styles/components/home/CardContent2.sass';
import React from 'react';

type CardPropsContent2 = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

function CardContent2({ title, description, icon }: CardPropsContent2) {
    return (
        <div className="card-content2">
            <div>{icon}</div>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default CardContent2;
export type { CardPropsContent2 };
