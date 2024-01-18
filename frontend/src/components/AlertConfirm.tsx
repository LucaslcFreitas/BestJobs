import '../styles/components/AlertConfirm.sass';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';

type AlertConfirmProps = {
    title: string;
    info: string;
    textButtonCancel: string;
    textButtonConfirm: string;
    show: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
};

function AlertConfirm({
    title,
    info,
    textButtonCancel,
    textButtonConfirm,
    show,
    onDismiss,
    onConfirm,
}: AlertConfirmProps) {
    if (!show) {
        return <></>;
    }

    return (
        <div className="alert-confirm">
            <div className="alert-confirm-content">
                <h3>{title}</h3>
                <p>{info}</p>
                <div className="alert-confirm-button">
                    <div className="alert-confirm-container">
                        <ButtonSecondary
                            text={textButtonCancel}
                            onClickButton={onDismiss}
                            backgroundColor="#8B0000"
                        />
                        <ButtonPrimary
                            text={textButtonConfirm}
                            onClickButton={onConfirm}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertConfirm;
