import Router from './router/Router';
import LoaderModal from './components/LoaderModal';
import { useSelector } from 'react-redux';
import { useLoader } from './redux/loader/sliceLoader';

function App() {
    const loader = useSelector(useLoader);

    return (
        <>
            <LoaderModal show={loader} />
            <Router />
        </>
    );
}

export default App;
