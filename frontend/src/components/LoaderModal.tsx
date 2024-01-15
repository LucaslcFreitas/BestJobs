import '../styles/components/Loader.sass';

type LoaderType = {
    show: boolean;
};

function LoaderModal({ show }: LoaderType) {
    if (!show) {
        return <></>;
    }

    return (
        <div className="loader-modal">
            <div className="jimu-primary-loading"></div>
        </div>
    );
}

export default LoaderModal;
