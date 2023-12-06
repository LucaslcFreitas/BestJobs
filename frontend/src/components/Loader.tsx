import '../styles/components/Loader.sass';

type LoaderType = {
    show: boolean;
};

function Loader({ show }: LoaderType) {
    if (!show) {
        return <></>;
    }

    return (
        <div className="loader">
            <div className="justify-content-center jimu-primary-loading"></div>
        </div>
    );
}

export default Loader;
