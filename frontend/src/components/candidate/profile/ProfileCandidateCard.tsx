import '../../../styles/components/candidate/profile/ProfileCandidateCard.sass';
import { JSX, ReactNode } from 'react';

type ProfileCandidateCardProps = {
    title: string;
    icons?: ReactNode[];
    children?: JSX.Element[] | JSX.Element;
};

function ProfileCandidateCard({
    title,
    icons = [],
    children,
}: ProfileCandidateCardProps) {
    return (
        <section className="profile-candidate-card">
            <header>
                <h2>{title}</h2>
                <div className="profile-candidate-card-icons">
                    {icons.map((icon) => icon)}
                </div>
            </header>
            {children ? (
                children
            ) : (
                <p className="profile-candidate-card-no-data">
                    Nenhuma informação encontrada
                </p>
            )}
        </section>
    );
}

export default ProfileCandidateCard;
