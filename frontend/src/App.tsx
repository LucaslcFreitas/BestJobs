import Router from './router/Router';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import { useLoader } from './redux/loader/sliceLoader';

function App() {
    const loader = useSelector(useLoader);

    return (
        <>
            <Loader show={loader} />
            <Router />
        </>
    );
}

export default App;
