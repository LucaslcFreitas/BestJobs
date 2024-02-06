import './styles.sass';
import ButtonPrimary from '../ButtonPrimary';

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
            <div className="content">
                <h3>{title}</h3>
                <p>{info}</p>
                <div className="button">
                    <div className="button-container">
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
