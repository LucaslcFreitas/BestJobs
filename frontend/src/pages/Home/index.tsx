import './styles.sass';
import Content1 from '../../components/home/Content1';
import Content2 from '../../components/home/Content2';
import Content3 from '../../components/home/Content3';
import Content4 from '../../components/home/Content4';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = 'Best Jobs';
    }, []);

    return (
        <>
            <Content1 />
            <Content2 />
            <Content3 />
            <Content4 />
        </>
    );
}

export default Home;
