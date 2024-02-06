import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function DefaultLayout() {
    return (
        <>
            <NavBar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default DefaultLayout;
