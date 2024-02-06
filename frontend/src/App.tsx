import Router from './router/Router';
import LoaderModal from './components/LoaderModal';
import AlertInfo from './components/AlertInfo';
import AlertConfirm from './components/AlertConfirm';
import { useSelector } from 'react-redux';
import { useLoader } from './redux/loader/sliceLoader';
import { useAlertInfo } from './redux/alert/sliceAlertInfo';
import { useAlertConfirm } from './redux/alert/sliceAlertConfirm';

function App() {
    const loader = useSelector(useLoader);
    const alertInfo = useSelector(useAlertInfo);
    const alertConfirm = useSelector(useAlertConfirm);

    return (
        <>
            <AlertConfirm {...alertConfirm} />
            <AlertInfo {...alertInfo} />
            <LoaderModal show={loader} />
            <Router />
        </>
    );
}

export default App;
