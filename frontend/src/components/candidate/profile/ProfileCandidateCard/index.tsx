import './styles.sass';
import { JSX, ReactNode } from 'react';
import LoaderLocal from '../../../LoaderLocal';

type ProfileCandidateCardProps = {
    title: string;
    icons?: ReactNode[];
    children?: JSX.Element[] | JSX.Element;
    loading: boolean;
};

function ProfileCandidateCard({
    title,
    icons = [],
    children,
    loading,
}: ProfileCandidateCardProps) {
    return (
        <section className="profile-candidate-card">
            <header>
                <h2>{title}</h2>
                <div className="icons">{icons.map((icon) => icon)}</div>
            </header>
            {loading ? (
                <div className="loading">
                    <LoaderLocal show={true} />
                </div>
            ) : children ? (
                children
            ) : (
                <p className="no-data">Nenhuma informação encontrada</p>
            )}
        </section>
    );
}

export default ProfileCandidateCard;
