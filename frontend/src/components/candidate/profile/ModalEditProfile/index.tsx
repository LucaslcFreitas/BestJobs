import './styles.sass';
import { ReactElement } from 'react';

type ModalEditProfileProps = {
    show: boolean;
    onDismiss: () => void;
    children: ReactElement;
};

function ModalEditProfile({ show, children }: ModalEditProfileProps) {
    if (!show) {
        return <></>;
    }

    return (
        <div className="modal-edit-profile">
            <div className="modal-edit-profile-content">{children}</div>
        </div>
    );
}

export default ModalEditProfile;
