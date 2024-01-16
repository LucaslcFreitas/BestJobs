import '../../../styles/components/candidate/profile/ContainerFormCandidateProfile.sass';
import { ReactElement } from 'react';

type ContainerFormCandidateProfileProps = {
    children: ReactElement;
    show: boolean;
};

function ContainerFormCandidateProfile({
    children,
    show,
}: ContainerFormCandidateProfileProps) {
    if (!show) {
        return <></>;
    }
    return <div className="container-form-candidate-profile">{children}</div>;
}

export default ContainerFormCandidateProfile;
