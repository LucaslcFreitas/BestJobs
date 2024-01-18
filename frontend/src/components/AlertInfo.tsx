import '../styles/components/AlertInfo.sass';
import ButtonPrimary from './ButtonPrimary';

type AlertInfoProps = {
    title: string;
    info: string;
    textButton: string;
    show: boolean;
    onDismiss: () => void;
};

function AlertInfo({
    title,
    info,
    textButton,
    show,
    onDismiss,
}: AlertInfoProps) {
    if (!show) {
        return <></>;
    }

    return (
        <div className="alert-info">
            <div className="alert-info-content">
                <h3>{title}</h3>
                <p>{info}</p>
                <div className="alert-info-button">
                    <div className="alert-info-container">
                        <ButtonPrimary
                            text={textButton}
                            onClickButton={onDismiss}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertInfo;
