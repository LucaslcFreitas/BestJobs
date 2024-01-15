import '../styles/components/Loader.sass';

type LoaderType = {
    show: boolean;
};

function LoaderLocal({ show }: LoaderType) {
    if (!show) {
        return <></>;
    }

    return (
        <div className="loader-local">
            <div className="jimu-primary-loading"></div>
        </div>
    );
}

export default LoaderLocal;
